---
description: >-
  Learn how to support opt-in.
---

# Supporting Opt-in

To respect your user's privacy, you might want to ask for the user's consent before allowing the SDK to use user-specific data for certain purposes. Currently, the SDK only allows users to opt into all purposes or no purposes, but in the future Adobe hopes to provide more granular control over specific purposes.

If the user opts into all purposes, the SDK is allowed to perform the following tasks:

* Send data to and from Adobe's servers.
* Read and write cookies or web storage items (except for persisting the user's opt-in preferences).

If the user does not opt into all purposes, the SDK does not perform any of these tasks.

## Configuring Opt-in

To prevent the SDK from performing these tasks until the user opts in, pass `"optInEnabled": true` during SDK configuration as follows:

```javascript
alloy("configure", {
  "configId": "ebebf826-a01f-4458-8cec-ef61de241c93",
  "imsOrgId": "ADB3LETTERSANDNUMBERS@AdobeOrg",
  "optInEnabled": true
});
```

When Opt-in is enabled, attempting to execute any commands that depend on user opt-in preferences (for example, the `event` command) results in the command being queued within the SDK. These commands are not processed until you have communicated the user's opt-in preferences to the SDK.

At this point, you might prefer to ask the user to opt in somewhere within your user interface. After the user's preferences have been collected, communicate these preferences to the SDK.

## Communicating user preferences

If the user opts into all purposes, execute the `optIn` command with the `purposes` option set to `all` as follows:

```javascript
alloy("optIn", {
  "purposes": "all"
});
```

Because the user has now opted into all purposes, the SDK executes all previously queued commands. Future commands that depend on the user opting in will _not_ be queued and instead be promptly executed.

If the user chooses _not_ to opt into any purpose, execute the `optIn` command with the `purposes` option set to `none` as follows:

```javascript
alloy("optIn", {
  "purposes": "none"
});
```  

Because the user chose to not opt into any purposes, promises that were returned from previously queued commands are rejected. Future commands that depend on the user opting in will return promises that are similarly rejected. For more information on handling or suppressing errors, please refer to [Executing Commands](executing-commands.md).

> **Note:** At the current time, the Alloy library supports `all` or `none` as a value for the purposes.  While we plan to build out a more robust and set of purposes or categories that will correspond to the different Adobe capabilities and product offerings, the current implementation is an all or nothing approach to opt-in.  This only applies to Alloy and NOT other Adobe JavaScript libraries. 

## Persistence of user preferences

After you have communicated user preferences to the SDK using the `optIn` command, the SDK persists the user's preferences to a cookie. The next time the user loads your website in the browser, the SDK will retrieve and use these persisted preferences. There is no need to execute the `optIn` command again, except to communicate a change in the user's preferences, which you may do at any time.
