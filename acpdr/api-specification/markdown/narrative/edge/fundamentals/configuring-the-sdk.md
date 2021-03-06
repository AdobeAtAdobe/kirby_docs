---
description: >-
  Learn how to configure the SDK.
---

# Configuring the SDK

Configuration for the SDK is done with the `configure` command. This should _always_ be the first command called.

```javascript
alloy("configure", {
  "configId": "ebebf826-a01f-4458-8cec-ef61de241c93",
  "orgId":"ADB3LETTERSANDNUMBERS@AdobeOrg"
});
```

There are many options that can be set during configuration. All options can be found below, grouped by category.

## General options

### `configId`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| String   | Yes          | none              |

Your assigned configuration ID, which links the SDK to the appropriate accounts and configuration.  When configuring multiple instances within a single page, you must configure a different `configId` for each instance.

### `debugEnabled`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| Boolean  | No           | `false`           |

Indicates whether debugging should be enabled. Setting this config to `true` enables the following features:

| **Feature**            |                    |                                                                                                                            |
| ---------------------- | ------------------ |
| Synchronous validation | Validates the data being collected against the schema and returns an error in the response under the following label: `collect:error OR success` |
| Console logging        | Enables debugging messages to be displayed in the browser's JavaScript console                                                                  |

### `edgeDomain`

| **Type** | **Required** | **Default Value**  |
| -------- | ------------ | ------------------ |
| String   | No           | `beta.adobedc.net` |

The domain used to interact with Adobe Services. This is only used if you have a first party domain (CNAME) that proxies requests to Adobe's edge infrastructure.

### `errorsEnabled`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| Boolean  | No           | `true`            |

Indicates whether errors should be suppressed. As described in [Executing Commands](executing-commands.md), _uncaught_ errors are logged to the developer console, regardless of whether debugging is enabled in Adobe Experience Platform Web SDK. By setting `errorsEnabled` to `false`, promises returned from Adobe Experience Platform Web SDK are never rejected, though errors are still logged to the console if logging is enabled in Adobe Experience Platform Web SDK.

### `orgId`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| String   | Yes          | none              |

Your assigned Experience Cloud organization ID.  When configuring multiple instances within a page, you must configure a different `orgId` for each instance.

## Data collection

### `context`

| **Type**         | **Required** | **Default Value**                                  |
| ---------------- | ------------ | -------------------------------------------------- |
| Array of Strings | No           | `["web", "device", "environment", "placeContext"]` |

Indicates which context categories to collect automatically as described in [Automatic Information](../reference/automatic-information.md).  If this configuration is not specified, all of the categories are used by default.

### `clickCollectionEnabled`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| Boolean  | No           | `true`            |

Indicates whether data associated with clicks on navigational links, download links, or personalized content should be automatically collected or not.  For clicks that qualify as link clicks, the following [Web Interaction](https://github.com/adobe/xdm/blob/master/docs/reference/context/webinteraction.schema.md) data is collected:

| **Property** |                                     |
| ------------ | ----------------------------------- |
| Link Name    | Name determined by the link context |
| Link URL     | Normalized URL                      |
| Link Type    | Set to download, exit, or other     |

### `onBeforeEventSend`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| Function | No           | () => undefined   |

Set this to configure a callback that is called for every event just before it is sent.  An object with the field `xdm` is sent in to the callback.  Modify the xdm object to change what is sent.  Inside the callback, the `xdm` object will already have the data passed in the event command, and the automatically collected information.  For more information on the timing of this callback and an example, see [Modifying Events Globally](../reference/tracking-events.md#modifying-events-globally).

## Privacy options

### `optInEnabled`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| Boolean  | No           | `false`           |

Enables the opt-in feature, which allows work to be queued until the user provides opt-in preferences. Once the user's preferences have been provided, work will either proceed or be aborted based on the user's preferences. See [Supporting Opt-In](supporting-opt-in.md) for more information.

## Personalization options

### `prehidingStyle`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| String   | No           | none              |

Used to create a CSS style definition that hides content areas of your web page while personalized content is loaded from the server. If this option is not provided, the SDK does not attempt to hide any content areas while personalized content is loaded, potentially resulting in "flicker."

For example, if you had an element on your web page with an ID of `container` whose default content you would like to hide while personalized content is being loaded from the server, an example of a prehiding style would be as follows:

```javascript
  prehidingStyle: "#container { opacity: 0 !important }"
```

## Identity options

### `thirdPartyCookiesEnabled`

| **Type** | **Required** | **Default Value** |
| -------- | ------------ | ----------------- |
| Boolean  | No           | true              |

Enables the setting of Adobe third-party cookies. The SDK has the ability to persist the visitor ID in a third-party context to enable the same visitor ID to be used across site. This is useful if you have multiple sites or you want to share data with partners; however, sometimes this is not desired for privacy reasons.
