# Getting Started with Adobe Cloud Platform Streaming Ingestion APIs

## Overview

This documentation will help you quickly get started with the Adobe Cloud Platform Streaming APIs. Specifically, this documentation will help you:

1. [Create a Streaming Endpoint](#creating-a-streaming-endpoint)
2. [Stream a Profile Object to Adobe Cloud Platform](#streaming-a-profile-object-to-adobe-cloud-platform)
3. [Retrieve the newly created Profile](#retrieving-the-newly-created-profile)
4. [Stream an ExperienceEvent to Adobe Cloud Platform](#streaming-an-experienceevent-to-adobe-cloud-platform)
5. [Retrieve ExperienceEvents related to the Updated Profile](#retrieving-experienceevents-related-to-the-updated-profile)

## How do I get started?

Streaming Endpoint Registration is the first step for you to start streaming data to Adobe Cloud Platform. When registering a Streaming Endpoint, you need to provide some key details like the source of streaming data, and whether or not you intend to send records expressed in the [XDM Schema][xdminfo].

In response, you, as the data producer, are provided with a unique URL which can be used to stream data to ACP.

To complete this tutorial, you will first need to obtain your **developer credentials** and an **authorization token**. Follow this [tutorial][1] or this [blog post][2] for detailed information on how to go through this process.

### Creating a Streaming Endpoint

Let's start by creating a new Streaming Endpoint. Assuming you have an API Key and Access Token, you can insert them to the cURL command below, providing other details, like Streaming Endpoint Name and Description, which are meaningful to you.

#### Request

```SHELL
CURL -X POST https://platform.adobe.io/data/core/pipeline/endpoint/registration/ \
-H "Cache-Control: no-cache" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "x-api-key: {API_KEY}" \
-H "x-gw-ims-org-id: {IMS_ORG}" \
-d "{JSON_PAYLOAD}"
```

**Note**: To find your API Key and IMS org ID, go to https://console.adobe.io/integrations, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.


`{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
`{API_KEY}` : Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMS_ORG}` :  Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
`{JSON_PAYLOAD}` : An example JSON payload format can be seen below:

```JSON
{
    "name": "My Streaming Endpoint",
    "description": "Collects streaming data from my website",
    "sourceId": "website",
    "dataType": "xdm"
}
```
`name`: The name you want to use for your Streaming Endpoint.   
`description`: The description you want to use for your Streaming Endpoint.   
`sourceId`: A meaningful identifier or name of the source sending the streaming data.


#### Response

An example of a successful response can be seen below:

```JSON
{
  "streamingEndpointId": "{STREAMING_ENDPOINT_ID}",
  "imsOrg": "{IMS_ORG}",
  "sourceId": "website",
  "dataType": "xdm",
  "name": "My Streaming Endpoint",
  "description": "Collects streaming data from my website",
  "createdBy": "{API_KEY}",
  "authenticationRequired": false,
  "validationRequired": true,
  "createdDate": 1532624324022,
  "modifiedDate": 1532624324022,
  "streamingEndpointUrl": "https://dcs.data.adobe.net/collection/{STREAMING_ENDPOINT_ID}"
}
```

`{STREAMING_ENDPOINT_ID}` : The ID of your newly created Streaming Endpoint.   
`{IMS_ORG}`:  The IMS organization ID that you used in your request.    
`{SOURCE_ID}`: The meaningful identifier or name of the source you sent in your request.    
`{STREAMING_ENDPOINT_NAME}`: The name of your newly created Streaming Endpoint.   
`{STREAMING_ENDPOINT_DESCRIPTION}`: The description of your newly created Streaming Endpoint.   
`{API_KEY}` : Your specific API key value found in your unique Adobe Cloud Platform integration.  


<!For further information about this API, look at the [Streaming Endpoint Registration API Specifications][apispecs] page.>

### Streaming a Profile object to Adobe Cloud Platform

Once you've created a Streaming Endpoint, you can create use it to stream XDM records and create or update [Customer Profiles][customerprofiles].

#### Request

```SHELL
CURL -X POST {STREAMING_ENDPOINT_URL} \
-H "Cache-Control: no-cache" \
-H "Content-Type: application/json" \
-d "{JSON_PAYLOAD}
```

`{STREAMING_ENDPOINT_URL}`: The URL previously returned when creating your Streaming Endpoint.  
`{JSON_PAYLOAD}`: An example of the JSON payload is shown below: 

**Note:** You will have to replace the {IMS_ORG} with the one you used previously creating a Streaming Endpoint.

Where:
 
`xdmSchema`: The Experience Data Model (XDM) of the streamed record. For more information about XDM, check out [this article][xdminfo].    
`imsOrgId`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
`source`: The source of the streamed record - this should be the **same** as the one specified earlier, when you created the streaming endpoint.

**Note:** To find your IMS org ID, go to https://console.adobe.io/integrations, click on the Overview for the integration you want to use, and copy the Organization ID listed.

```JSON
{
    "header": {
        "msgType": "xdmEntityCreate",
        "msgVersion": "1.0",
        "xdmSchema": {
            "name": "_xdm.context.profile",
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
            "name": "GettingStarted"
        }
    },
    "body": {
        "xdmMeta": {
            "xdmSchema": {
                "name": "_xdm.context.profile",
            }
        },
        "xdmEntity": {
            "identities": [
                {
                    "id": "89149270342662559642753730269986316601",
                    "namespace": {
                        "code": "ecid"
                    },
                    "primary": "true"
                },
                {
                    "id": "janedoe@example.com",
                    "namespace": {
                        "code": "email"
                    }
                }
            ],
            "person": {
                "name": {
                    "givenName": "Jane",
                    "middleName": "F",
                    "surname": "Doe"
                },
                "birthMonth": 3,
                "birthDay": 14,
                "birthYear": 1969,
                "gender": "female"
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "label": "Jane Doe",
                "type": "work",
                "status": "active"
            },
            "mobilePhone": {
                "primary": true,
                "number": "1-408-555-2368",
                "status": "active"
            }
        }
    }
}
```



---
 ℹ️   ​ ​ ​**Identity Namespace Codes**

 Please ensure that the codes used for the Identity Namespace are valid - the ones used in the example above use "email" and "ECID" (Experience Cloud ID) which are standard identity namespaces. A list of other commonly used standard identity namespaces can be found [here][standardnamespace]. 

 If you need a custom namespace, click [here][customnamespace] to learn how.

---


#### Response

An example of a successful response can be seen below:

```JSON
{
  "streamingEndpointId": "d212ea1db6c896ef6c59c7443c717d05232e8f85bfffb0988000d68fe46dd373",
  "xactionId": "1532625558467:0001:13", 
  "receivedTimeMs": 1532625558467
}
```

`xactionId`: The xactionID is a unique identifier generated server-side for the XDM record you just sent. This ID helps Adobe trace this record's lifecycle through various systems and with debugging.    
`receivedTimeMs`: receivedTimeMs is a timestamp (epoch in milliseconds) that shows what time the request was received.

### Retrieving the newly created Profile

Now that you've created a new Consumer Profile record, let's use the [Profile Access API][profileapi] to read it back.

Let's look using the identities we used previously:

```JSON
"identities": [
    {
        "id": "89149270342662559642753730269986316601",
        "namespace": {
            "code": "ecid"
        },
        "primary": "true"
    },
    {
        "id": "janedoe@example.com",
        "namespace": {
            "code": "email"
        }
    }
],
```

You could query using either email address or by ECID.

To query using email address, your request would need to look something like this:

`{PROFILE_ACCESS_URL}?schema.name=_xdm.context.profile&entityId=janedoe@example.com&entityIdNS=email`

Where:
- `janedoe@example.com` is the provided entity ID
- `email` is the entity namespace code

Alternatively, if you wanted to query using Experience Cloud ID, your request should look similar to this:
`{PROFILE_ACCESS_URL}?schema.name=_xdm.context.profile&entityId=89149270342662559642753730269986316601&entityIdNS=ecid`

Where:
- `89149270342662559642753730269986316601` is the provided entity ID
- `ecid` (Experience Cloud ID) is the entity namespace code

`{PROFILE_ACCESS_URL}`: The URL that is used to access the Profile Access API.

#### Request

Now that you understand the multiple ways that you can query for your newly created Consumer Profile, here's an example request of how to read back the Consumer Profile created previously.

```SHELL
CURL -X GET "https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.profile&entityId=58832431024964181144308914570411162539&entityIdNS=ecid"\
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Cache-Control: no-cache" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}"
```

**Note:** 
To find your API Key and IMS org ID, go to https://console.adobe.io/integrations, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

`{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
`{API_KEY}` : Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMS_ORG}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.

For further information about this API call, check out the Profile Access API documentation [here][profileapi].

#### Response

An example of a successful response can be seen below. As you can see, this is the same record as the one previously submitted.

```JSON

{
    "A29cgveD5y64ezlhxjUXNzcm": {
        "recordId": "A29cgveD5y64ezlhxjUXNzcm",
        "record": {
            "identities": [
                {
                    "_id": "89149270342662559642753730269986316601",
                    "namespace": {
                        "code": "ecid"
                    },
                    "primary": "true"
                },
                {
                    "_id": "janedoe@example.com",
                    "namespace": {
                        "code": "email"
                    }
                }
            ],
            "person": {
                "name": {
                    "firstName": "Jane",
                    "middleName": "F",
                    "lastName": "Doe"
                },
                "birthMonth": 3,
                "birthDay": 14,
                "birthYear": 1969,
                "gender": "female"
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "label": "Jane Doe",
                "type": "work",
                "status": "active"
            },
            "mobilePhone": {
                "primary": true,
                "number": "1-408-555-2368",
                "status": "active"
            }
        }
    }
}

```

---

- Try changing values for **ecid** in the "identities" block in the payload above to submit an updated Profile record, and see if the values update.
- Also try changing other attributes like birthYear, mobilePhone, or workEmail, and retrieve their updated values.

---

### Streaming an ExperienceEvent to Adobe Cloud Platform

Once you've confirmed your Profile can be properly accessed, you can use Adobe's Streaming Ingestion APIs to stream ExperienceEvents as they happen. Streamed ExprienceEvents will be instantaneously available on Adobe Cloud Platform services, such as Unified Profile. 

The example below associates a new ExperienceEvent with the Consumer Profile you created above. It captures some details about the browser, the product items they viewed, the web page they viewed it on, as well as the approximate location of the device.

#### Request

```SHELL
curl -X POST "https://dcs.data.adobe.net/collection/{STREAMING_ENDPOINT_ID}" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d "{JSON_PAYLOAD}"
```

`{STREAMING_ENDPOINT_ID}`: The ID of the created Streaming Endpoint.  
`{JSON_PAYLOAD}`: An example of the JSON Payload can be seen below:

```JSON
{
    "header":{
        "datasetId":"5b60bb6052a78201e46b5ffb",
        "imsOrgId":"{IMS_ORG}",
        "xdmSchema":{
            "name":"_xdm.context.experienceevent",
        },
        "msgType:" "xdmEntityCreate",
        "msgId": "12345",
        "msgVersion": "1.0",
        "source": {
            "name": "GettingStarted"
        }
    },
    "body":{
        "xdmMeta":{
            "xdmSchema":{
                "name":"_xdm.context.experienceevent",
            }
        },
        "xdmEntity":{
            "_id":"c8d11988-6b56-4571-a123-b6ce74236036",
            "timestamp":"2018-07-10T22:07:56Z",
            "endUserIDs":{
                "_experience":{
                    "ecid":{
                        "id":"89149270342662559642753730269986316601",
                        "namespace":{
                            "code":"ecid"
                        }
                    }
                }
            },
            "environment":{
                "browserDetails":{
                    "userAgent":"Mozilla\/5.0 (Windows NT 5.1) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/29.0.1547.57 Safari\/537.36 OPR\/16.0.1196.62",
                    "acceptLanguage":"en-US",
                    "cookiesEnabled":true,
                    "javaScriptVersion":"1.6",
                    "javaEnabled":true
                },
                "colorDepth":32,
                "viewportHeight":799,
                "viewportWidth":414
            },
            "productListItems":[
                {
                    "SKU":"CC",
                    "name":"Fernie Snow",
                    "quantity":30,
                    "priceTotal":7.8
                }
            ],
            "commerce":{
                "productViews":{
                    "value":1
                }
            },
            "web":{
                "webPageDetails":{
                    "name":"Fernie Snow",
                    "pageViews":{
                        "value":1
                    }
                }
            },
            "placeContext":{
                "localTime":"2018-07-10T22:07:56Z",
                "geo":{
                    "_schema":{
                        "latitude":50.116322,
                        "longitude":-122.957359
                    },
                    "countryCode":"CA",
                    "stateProvince":"British Columbia",
                    "city":"Whistler",
                    "postalCode":"V0N"
                }
            },
            "channel":{
                "_type":"web"
            }
        }
    }
}
```

`{IMS_ORG}`:  Your IMS organization ID can be found under the integration details in the Adobe I/O Console.

#### Response

An example of a successful response can be seen below:

```JSON
{
  "streamingEndpointId": "d212ea1db6c896ef6c59c7443c717d05232e8f85bfffb0988000d68fe46dd373",
  "xactionId": "1532625558467:0001:13",
  "receivedTimeMs": 1533178977338
}
```
**Note:**

`xactionId`: The xactionID is a unique identifier generated server-side for the XDM record you just sent. This ID helps Adobe trace this record's lifecycle through various systems and with debugging.    
`receivedTimeMs`: receivedTimeMs is a timestamp (epoch in milliseconds) that shows what time the request was received.


### Retrieving ExperienceEvents related to the Updated Profile

Now, let's use the Profile Access APIs to read the ExperienceEvent you just sent back.

#### Request

```SHELL
curl -X GET \
  "https://platform.adobe.io/data/core/ups/access/entities?schema.name=_xdm.context.experienceEvent&relatedSchema.name=_xdm.context.profile&relatedEntityId=58832431024964181144308914570411162539&relatedEntityIdNS=ecid" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Cache-Control: no-cache" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}"

```

**Note:** To find your API Key and IMS org ID, go to https://console.adobe.io/integrations, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

`{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
`{API_KEY}` : Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMS_ORG}` : Your IMS organization ID can be found under the integration details in the Adobe I/O Console.

#### Response

An example of a successful response can be seen below. As you can see, this is the same event that you sent previously.

```JSON
{
    "_page":{
        "orderby":"timestamp",
        "start":"c8d11988-6b56-4571-a123-b6ce74236036",
        "count":1,
        "next":""
    },
    "records":[
        {
            "relatedRecordId":"A29C6ZBTbnqlUau73OD4Vsw7",
            "recordId":"c8d11988-6b56-4571-a123-b6ce74236036",
            "timestamp":1531260476000,
            "record":{
                "_id":"c8d11988-6b56-4571-a123-b6ce74236036",
                "timestamp":"2018-07-10T22:07:56Z",
                "endUserIDs":{
                    "_experience":{
                        "ecid":{
                            "id":"89149270342662559642753730269986316601",
                            "namespace":{
                                "code":"ecid"
                            }
                        }
                    }
                },
                "environment":{
                    "browserDetails":{
                        "userAgent":"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36 OPR/16.0.1196.62",
                        "acceptLanguage":"en-US",
                        "cookiesEnabled":true,
                        "javaScriptVersion":"1.6",
                        "javaEnabled":true
                    },
                    "colorDepth":32,
                    "viewportHeight":799,
                    "viewportWidth":414
                },
                "productListItems":[
                    {
                        "SKU":"CC",
                        "name":"Fernie Snow",
                        "quantity":30,
                        "priceTotal":7.8
                    }
                ],
                "commerce":{
                    "productViews":{
                        "value":1
                    }
                },
                "web":{
                    "webPageDetails":{
                        "name":"Fernie Snow",
                        "pageViews":{
                            "value":1
                        }
                    }
                },
                "placeContext":{
                    "localTime":"2018-07-10T22:07:56Z",
                    "geo":{
                        "_schema":{
                            "latitude":50.116322,
                            "longitude":-122.957359
                        },
                        "countryCode":"CA",
                        "stateProvince":"British Columbia",
                        "city":"Whistler",
                        "postalCode":"V0N"
                    }
                },
                "channel":{
                    "_type":"web"
                }
            },
            "lastModifiedAt":"2018-08-02T03:01:16Z"
        }
    ],
    "_links":{
        "next":{
            "href":""
        }
    }
}
```

--- 

- Try streaming new ExperienceEvents by changing the timestamp or record ID fields.
- Subsequent POST calls with different timestamps and event IDs will simulate subsequent user activity. Subsequent GET calls will return an increasing array of the ExperienceEvents that are associated with the consumer's Profile. 

---

Following this guide, you should be able to do the following actions:
- Request a Streaming Endpoint
- Stream and Retrieve Profile Events
- Stream and Retrieve ExperienceEvents from Adobe Cloud Platform

With this knowledge, you should be able to easily get your data to Adobe Cloud Platform. Now that you can stream and retrieve your own events, try repeating these steps with other data and see if you can replicate your results.

[1]: https://www.adobe.io/apis/cloudplatform/dataservices/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md

[2]: https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f

[3]: https://console.adobe.io/

[apispecs]: streaming_endpoint_registration/streaming_endpoint_registration.md
[standardnamespace]: https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_faq.md
[customnamespace]: https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/identity_namespace_overview/identity_namespace_overview.md

[identityapi]: https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md

[xdminfo]: https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/xdm_registry_architectural_overview/xdm_registry_architectural_overview.md
[profileapi]: https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md

[customerprofiles]: https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md