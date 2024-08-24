import { app, Timer } from "@azure/functions";

// keep backend warm
export async function warmUpTrigger(myTimer: Timer): Promise<void> {
    console.log("keep function awake!");
}

app.timer('warmUp', {
    // runs every 1 minute
    schedule: '0 */1 * * * *',  
    handler: warmUpTrigger
});
