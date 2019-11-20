---
description: >-
  Learn what Adobe Experience Platform Web SDK is and how it can be used.
---

# What is Adobe Experience Platform Web SDK

Adobe Experience Platform Web SDK is a client-side JavaScript library that allows customers of the Adobe Experience Cloud to interact with the various services in the Experience Cloud. 

## Documentation topics

This documentation collection includes the following articles:

### Overview

* [Overview](README.md)

### Getting started

* [Quick start with Launch](getting-started/quick-start-with-launch.md)
* [Deploying all products](getting-started/deploying-all-products.md)

### Fundamentals

* [Installing the SDK](fundamentals/installing-the-sdk.md)
* [Executing commands](fundamentals/executing-commands.md)
* [Configuring the SDK](fundamentals/configuring-the-sdk.md)
* [Tracking events](fundamentals/tracking-events.md)
* [Merging event data](fundamentals/merging-event-data.md)
* [Debugging](fundamentals/debugging.md)
* [Interacting with multiple properties](fundamentals/interacting-with-multiple-properties.md)
* [Rendering personalized content](fundamentals/rendering-personalization-content.md)
* [Supporting Opt-in](fundamentals/supporting-opt-in.md)
* [Supporting in-app browsers](fundamentals/supporting-in-app-browsers.md)

### What to Implement

* [Commerce](what-to-implement/commerce.md)

### Reference

* [Automatically Collected Information](reference/automatic-information.md)
* [Retrieving Library Information](reference/retrieving-library-information.md)

## SDKs replaced by Adobe Experience Platform Web SDK

Adobe Experience Platform Web SDK replaces the following SDKs:

* Visitor.js
* AppMeasurement.js
* AT.js
* DIL.js

This is not just a wrapper around existing libraries. It is a complete rewrite. Its purpose is to end challenges with tags firing in the right order, inconsistency with library versioning challenges, and better dependency management. It is a new way to implement the Experience Cloud.

In addition to a new library, there is a new endpoint that streamlines the HTTP requests to Adobe solutions. Before, Visitor.js sent a blocking call to the visitor ID service, then AT.js sent a call to Adobe Target, DIL.js sent a call to Adobe Audience Manager, and finally AppMeasurement.js sent a call to Adobe Analytics. This new library and endpoint can retrieve an ID, fetch a Target experience, send data to Audience Manager, and pass the data into the Adobe Experience Platform in a single call.