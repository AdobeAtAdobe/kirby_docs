# Streaming validation

Streaming Ingestion APIs support two modes of validation - synchronous and asynchronous.

In synchronous mode, Streaming Ingestion APIs will drop records which fail XDM validation and include reason for failure. These failed records will not be sent downstream. Requesting synchronous validation will provide immediate feedback to clients helping them maintain development velocity as they figure out how to work with XDM formatted JSON payloads. 

In asynchronous mode, where data loss must be prevented, Streaming Validation will detect and move bad data to data lake.

> Note: For more information about XDM's format, and why it's necessary, check out [the schema registry guide][xdminfo].

Streaming Validation Service covers validation in the following areas:
-  Range
-  Presence
-  Enum
-  Pattern
-  Type
-  Format

## Synchronous Validation

Synchronous validation should only be used during the development process. When doing synchronous validation, the callers will be informed of both the result of the XDM validation, and, if it failed, the reason for failure. By default, synchronous validation is not turned on - you'll need to request synchronous validation by passing in the optional query parameter `synchronousValidation=true`. In addition, synchronous validation is currently only available on the VA7 data center.

If a message fails during synchronous validation, the message will not be written to the output queue, which provides immediate feedback for users.

### Request

To request your data inlet to have synchronous validation, you'll need to submit the following request:

```shell
https://dcs.adobedc.net/collection/{INLET_ID}?synchronousValidation=true
```

Where:

`{INLET_ID}`: The data inlet which you wish to request synchronous validation for.

### Example Response

With synchronous validation enabled, an example of a returned response can be seen below:

```json
{
    "type": "http://ns.adobe.com/adobecloud/problem/data-collection-service/inlet",
    "status": 400,
    "title": "Invalid XDM Message Format",
    "report": {
        "message": "inletId: [6aca7aa2d87ebd6b2780ca5724d94324a14475f140a2b69373dd5c714430dfd4] imsOrgId: [7BF122A65C5B3FE40A494026@AdobeOrg] Message is invalid",
        "cause": {
            "_streamingValidation": [
                {
                    "schemaLocation": "#",
                    "pointerToViolation": "#",
                    "causingExceptions": [
                        {
                            "schemaLocation": "#",
                            "pointerToViolation": "#",
                            "causingExceptions": [],
                            "keyword": "additionalProperties",
                            "message": "extraneous key [workEmail] is not permitted"
                        },
                        {
                            "schemaLocation": "#",
                            "pointerToViolation": "#",
                            "causingExceptions": [],
                            "keyword": "additionalProperties",
                            "message": "extraneous key [person] is not permitted"
                        },
                        {
                            "schemaLocation": "#/properties/_id",
                            "pointerToViolation": "#/_id",
                            "causingExceptions": [],
                            "keyword": "type",
                            "message": "expected type: String, found: Long"
                        }
                    ],
                    "message": "3 schema violations found"
                }
            ]
        }
    }
}
```

The above response lists how many schema violations were found, and what the violations were. So, for example, this response states that the keys "workEmail" and "person" were not defined in the schema, and therefore are not allowed. It also flags the value for "_id" as incorrect, since the schema expected a String, but an Integer was inserted instead. Note that once five errors are encountered, validation service will **stop** processing that message - other messages will continue to be parsed, though.

## Asynchronous Validation

Asynchronous validation should be used in production. If a message fails during asynchronous validation, Streaming Validation service will detect and send malformed data to the data lake so it can be retrieved later for further analysis and replay. Unless otherwise requested, Streaming Ingestion operates in asynchronous validation mode.  

With asynchronous validation enabled, the response will be as follows:

```json
{
    "inletId": "f6ca9706d61de3b78be69e2673ad68ab9fb2cece0c1e1afc071718a0033e6877",
    "xactionId": "1555445493896:8600:8",
    "receivedTimeMs": 1555445493932,
    "synchronousValidation": {
        "skipped": true
    }
}
```

As noted above, the response will note that synchronous validation has been skipped if it hasn't been explicitly requested.

## Status Codes

Status Code | What it means
----------- | -------------
200 | Success. For synchronous validation, it means that it has passed the validation checks. For asynchronous validation, it means that it only has successfully received the message. Users can find out the eventual message status by observing the dataset.
400 | Error. There is something wrong with your request. An error message with further details is received from the Streaming Validation Services.
401 | Error. Your request is unauthorized - you'll need to request with a bearer token. For further information about how to request access, check out this [tutorial][1] or this [blog post][2].
500 | Error. There is an internal system error.
501 | Error. This means that synchronous validation is **not** supported for this location.
503 | Error. The service is currently unavailable. Clients should retry at least three times using an exponential back-off strategy.



[xdminfo]: ../schema_registry/schema_composition/schema_composition.md 
[1]: ../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md 
[2]: https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f