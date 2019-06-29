# Setting up GDPR Job Events on Adobe I/O Events

These instructions describe how to set up GDPR Job events using Adobe I/O Events. You can use Adobe I/O for notification of GDPR Job events. 

> **Note:** This document describes functionality that will be released with GDPR 2.0 in Q2 2019.

You can subscribe to the following event types:

|Type|Description|
|---|---|
|jobcomplete|All solutions have completed their work (if required), and the overall job status is set to COMPLETE.|
|joberror|At least one solution has reported an error and the overall job status is set to ERROR.|
|productcomplete|One of the solutions has completed its work and reported back to the central service.|
|producterror|One of the solutions has reported back with an error of some kind.|

## Create an integration

For the purposes of this example, you’ll be creating an individual integration using your personal Adobe ID.

To create an integration for GDPR Job events:

1. Log in to [Adobe I/O Console](https://console.adobe.io). You’ll see a list of any integrations you’ve created so far. If this is your first, you’ll see a button for creating an integration.

1. Select **New integration**. The “Create a new integration" screen appears. 

1. Select **Receive near real-time events** and continue.

1. Select an event provider: Because you’re using your personal account, the only provider you’ll see is GDPR Assets. **Choose GDPR Assets** and continue.

1. You’re offered one last chance to update an existing integration, if you have any; select **New integration** and continue.

1. Enter details for the integration. Console needs a name and a description; these can be whatever you want, subject only to length restrictions. Choose **Web** for the platform and provide a redirect URI and a redirect URI pattern.

> **Note:** Your integration needs to send a redirect URI to Adobe when it authenticates on behalf of a user, to send them to your integration once authentication is complete. The redirect URI you provide here is a default, to which Adobe I/O will fall back if the redirect URI in your authentication request fails. The redirect URI pattern is used by Adobe I/O to validate the redirect URI you provide with an authentication request. All redirect URIs must use HTTPS.

## Add a webhook

When you select “Add Event Registration”, the dialog expands to provide fields for you to define a webhook to receive Adobe Events. (For more on webhooks, see [Adobe I/O Events Webhooks](https://www.adobe.io/apis/experienceplatform/events/documentation.html#!adobedocs/adobeio-events/master/intro/webhook_docs_intro.md).) The webhook you ultimately use should be part of the app you develop as your integration. For now, however, it’s easy to set up a simple webhook to test your integration’s connection with Adobe Events.

Several tools exist on the web that can be used for this purpose: ngrok, Postman, and more. For this example, use ngrok. Ngrok is a utility for enabling secure introspectable tunnels to your localhost. With ngrok, you can securely expose a local web server to the internet and run your own personal web services from your own machine, safely encrypted behind your local NAT or firewall.

First, configure a local web server. There are a number of choices, depending on whether you're Windows, Mac, or Linux.
Next, you'll need a simple function to respond to the Adobe I/O challenge. Try this JavaScript:

```javascript
var express = require('express');
var Webtask = require('webtask-tools');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.get('/webhook', function (req, res) {
var result = "No challenge";
if (req.query["challenge"]){
    result = req.query["challenge"]
    console.log("got challenge: " + req.query["challenge"]);
} else {
    console.log("no challenge")
}
res.status(200).send(result)
});

app.post('/webhook', function (req, res) { 
console.log(req.body)
res.writeHead(200, { 'Content-Type': 'application/text' });
res.end("pong");
});

module.exports = Webtask.fromExpress(app);
```

This simple webhook is designed merely to do what Adobe Events requires: handle an HTTPS GET request containing a challenge parameter by returning the value of the challenge parameter itself.

Now you’re ready to configure ngrok to serve your webhook over the internet:

1. Go to https://ngrok.com/. Download and install the application. Add the ngrok folder to your PATH, so you can invoke it from any command prompt.

1. Open a command-line window and type ngrok http 80; or whichever port you wish to monitor.
    In the ngrok UI, you can see the URL for viewing the ngrok logs, labeled "Web Interface", plus the public-facing URLs ngrok generates to forward HTTP and HTTPS traffic to your localhost. You can use either of those public-facing URLs to register your Webhook with Adobe I/O, so long as your application is configured to respond on your localhost accordingly. Once your testing phase is complete, you can replace the ngrok URL in your Adobe I/O integration with the public URL for your deployed app.

1. Now you’re ready to complete the webhook registration process in Adobe I/O Console. Return to that window and enter the name, URL, and description for the webhook, pasting in the URL you got from ngrok with the path under localhost to your webhook file and the /webhook term added. Select all four events to receive:

1. Now you’re ready to complete the webhook registration process in Adobe I/O Console. Return to that window and enter the name, URL, and description for the webhook, pasting in the URL you got from ngrok with the path under localhost to your webhook file and the /webhook term added. Select all three events to receive:

    * GDPR Job Complete (jobcomplete)
    * GDPR Job Error (joberror)
    * GDPR Product Complete (productcomplete)
    * GDPR Product Error (producterror)
  
1. Save and complete the CAPTCHA. Select **Create integration**. At this point, Adobe Events sends a test event to your webhook’s destination URL. If your webhook responds correctly with the contents of the challenge parameter, your integration is successfully registered.

1. Select **Continue to Integration details** to view and manage your integration.

