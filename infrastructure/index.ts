import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as website from "@pulumi/azure-native/web/staticSite";
import * as storage from "@pulumi/azure-native/storage";


// https://github.com/vitejs/vite/discussions/13443 -> useful for storing secrets
// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("abaskk-website-rg");

const config = new pulumi.Config();
const repositoryToken = config.requireSecret("repositoryToken");

const staticSite = new website.StaticSite("abaskk-frontend", {
    branch: "master",
    buildProperties: {
        apiLocation: "api",
        appArtifactLocation: "dist",
        appLocation: "frontend"
    },
    name: "abaskk-website",
    repositoryToken: repositoryToken,
    repositoryUrl: "https://github.com/abaskk/abaskk-website-v3",
    resourceGroupName: resourceGroup.name,
    sku: {
        name: "Free",
        tier: "Free",
    },
    
});


// create azure resource group to add blob storage
// Create a Storage Account
const storageAccount = new storage.StorageAccount("abaskkWebsiteSa", {
    resourceGroupName: resourceGroup.name,
    accountName: "abaskkwebsitesa",
    location: resourceGroup.location,
    sku: {
        name: "Standard_LRS",
    },
    accessTier: "Hot",
    kind: "StorageV2",
    enableHttpsTrafficOnly: true,
    allowBlobPublicAccess: true,
});

// Create a container for images
const imagesContainer = new storage.BlobContainer("company-images", {
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
    containerName: "company-images",
    publicAccess: "Blob",
});

// Create a container for JSON files
const dataContainer = new storage.BlobContainer("data", {
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
    containerName: "data",
    publicAccess: "Blob"
});






