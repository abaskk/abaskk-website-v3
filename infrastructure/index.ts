import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as website from "@pulumi/azure-native/web/staticSite";


// https://aminch18.medium.com/ci-cd-static-website-hosted-in-azure-storage-using-azure-cdn-9fd7e93fb306
// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("abaskk-website-rg");

