---
description: >-
  Learn how to merge event data.
---

# Merging Event Data

Sometimes, not all data is available when an event occurs. You may want to capture the data you _do_ have so it isn't lost if, for example, the user closes the browser. On the other hand, you may also want to include any data that will become available later.

In such cases, you may merge data with prior events by passing `eventMergeId` as an option to `event` commands as follows:

```javascript
alloy("event", {
  "xdm": {
    "commerce": {
      "order": {
        "purchaseID": "a8g784hjq1mnp3",
        "purchaseOrderNumber": "VAU3123",
        "currencyCode": "USD",
        "priceTotal": 999.98
      }
    }
  }
  "eventMergeId": "ABC123"
});

// Time passes and more data becomes available

alloy("event", {
  "xdm": {
    "commerce": {
      "order": {
        "payments": [
          {
            "transactionID": "TR426941",
            "paymentAmount": 999.98,
            "paymentType": "credit_card",
            "currencyCode": "USD"
          }
        ]
      }
    }
  }
  "eventMergeId": "ABC123"
});
```

By passing the same event merge ID value to both event commands in this example, the data in the second event command will be augmented to data previously sent on the first event command. A record for each event command will be created in the Experience Data Platform, but during reporting the records will be joined together using the event merge ID and appear as a single event.

If you are sending data about a particular event to third-party providers, you may also wish to include the same event merge ID with that data as well. Later, if you choose to import the third-party data into the Adobe Experience Platform, the event merge ID will be used to merge together all data that was collected as a result of the discrete event that occurred on your webpage.

## Generating an Event Merge ID

The event merge ID value can be any string you choose, but remember that all events sent using the same ID will be reported as a single event, so be cognizant of enforcing uniqueness when events should not be merged. If you would like the SDK to generate a unique event merge ID on your behalf (following the widely-adopted [UUID v4 specification](https://www.ietf.org/rfc/rfc4122.txt)), you may use the `createEventMergeId` command to do so.

As with all commands, a promise will be returned because you may be executing the command before the SDK has finished loading. The promise will be resolved with a unique event merge ID as soon as possible. You can wait for the promise to be resolved before sending data to the server as follows:

```javascript
var eventMergeIdPromise = alloy("createEventMergeId");

eventMergeIdPromise.then(function(eventMergeId) {
  alloy("event", {
    "xdm": {
      "commerce": {
        "order": {
          "purchaseID": "a8g784hjq1mnp3",
          "purchaseOrderNumber": "VAU3123",
          "currencyCode": "USD",
          "priceTotal": 999.98
        }
      }
    }
    "mergeId": eventMergeId
  });
});

// Time passes and more data becomes available

eventMergeIdPromise.then(function(eventMergeId) {
  alloy("event", {
    "xdm": {
      "commerce": {
        "order": {
          "payments": [
            {
              "transactionID": "TR426941",
              "paymentAmount": 999.98,
              "paymentType": "credit_card",
              "currencyCode": "USD"
            }
          ]
        }
      }
    }
    "mergeId": eventMergeId
  });
});
```

You can follow this same pattern if you would like access to the event merge ID for other reasons (for example, to send it to a third-party provider):

```javascript
var eventMergeIdPromise = alloy("createEventMergeId");

eventMergeIdPromise.then(function(eventMergeId) {
  // send event merge ID to a third-party provider
  console.log(eventMergeId);
});
```

## Note on XDM format

Inside the event command, the `mergeId` is actually added to the `xdm` payload.  If desired, the `mergeId` can be sent as part of the xdm option instead like this:

```javascript
alloy("event", {
  "xdm": {
    "commerce": {
      "order": {
        "purchaseID": "a8g784hjq1mnp3",
        "purchaseOrderNumber": "VAU3123",
        "currencyCode": "USD",
        "priceTotal": 999.98
      }
    },
    "eventMergeId": "ABC123"
  }
});
```