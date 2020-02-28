# Create email marketing destinations and activate data in Adobe's Real-time Customer Data Platform

This tutorial demonstrates how to use API calls to connect to your Adobe Experience Platform data, create an [email marketing destination](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-cat/email-destinations/email-marketing-destinations.html), create a dataflow to your new created destination, and activate data to your new created destination.

This tutorial uses the Adobe Campaign destination in all examples, but the steps are identical for all email marketing destinations. The tutorial includes the following steps:

*   [Get started](#get-started)
*   [Get the list of available destinations](#get-the-list-of-available-destinations)
*   [Connect to your Experience Platform data](#connect-to-your-experience-platform-data)
*   [Connect to email marketing destination](#connect-to-email-marketing-destination)
*   [Create a dataflow](#create-a-dataflow)
*   [Activate data to your new destination](#activate-data-to-your-new-destination)
*   [Validate that data is being activated](#validate-the-data-flow)

![Overview - the steps to create a destination and activate segments](images/flow-api-destinations-steps-overview.png)

If you prefer to use the user interface in Adobe's Real-time CDP to connect a destination and activate data, see the [Connect a destination](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/dest-tutorials/connect-destination.html) and [Activate profiles and segments to a destination](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/dest-tutorials/activate-destinations.html) tutorials.

## Get started

This guide requires a working understanding of the following components of Adobe Experience Platform:

*   [Experience Data Model (XDM) System](../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Experience Platform organizes customer experience data.
*   [Catalog Service](../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md): Catalog is the system of record for data location and lineage within Experience Platform.
*   [Sandboxes](../../technical_overview/sandboxes/sandboxes-overview.md): Experience Platform provides virtual sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

The following sections provide additional information that you will need to know in order to activate data to email marketing destinations in Adobe Real-time CDP.

### Gather required credentials

To complete the steps in this tutorial, you should have the following credentials ready, depending on the type of destinations that you are connecting and activating segments to.

* For Amazon S3 connections to email marketing platforms: `accessId`, `secretKey`
* For SFTP connections to email marketing platforms: `domain`, `port`, `username`, `password` or `ssh key` (depending on the connection method to the FTP location)

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required and optional headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

*   Authorization: Bearer `{ACCESS_TOKEN}`
*   x-api-key: `{API_KEY}`
*   x-gw-ims-org-id: `{IMS_ORG}`

Resources in Experience Platform can be isolated to specific virtual sandboxes. In requests to Platform APIs, you can specify the name and ID of the sandbox that the operation will take place in. These are optional parameters.

*   x-sandbox-name: `{SANDBOX_NAME}`
*   x-sandbox-id: `{SANDBOX_ID}`

All requests that contain a payload (POST, PUT, PATCH) require an additional media type header:

*   Content-Type: `application/json`

<!--

### Definitions

Before starting this tutorial, familiarize yourself with the following terms which we'll use throughout the tutorial:

**Flow**: 

**Base Connection**: 

**Target Connection**: 

**Source Connection**: 

-->

### Swagger documentation 

You can find accompanying reference documentation for all the API calls in this tutorial in Swagger. See https://platform.adobe.io/data/foundation/flowservice/swagger#/. We recommend that you use this tutorial and the Swagger documentation page in parallel.

## Get the list of available destinations

![Destination steps overview step 1](images/flow-api-destinations-step1.png)

As a first step, you should decide which email marketing destination to activate data to. To begin with, perform a call to request a list of available destinations that you can connect and activate segments to. Perform the following GET request to the `connectionSpecs` endpoint to return a list of available destinations:

### API Format

```http
GET /connectionSpecs
```

### Request 

<!--

```shell
curl -X GET \
    'http://platform.adobe.io/data/foundation/flowservice/connectionSpecs' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'x-sandbox-id: {SANDBOX_ID}' \    
    -H 'Content-Type: application/json' \
```

-->

```

curl --location --request GET 'https://platform.adobe.io/data/foundation/flowservice/connectionSpecs' \
--header 'accept: application/json' \
--header 'x-gw-ims-org-id: {IMS_ORG}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-sandbox-name: {SANDBOX_NAME}' \
--header 'x-sandbox-id: {SANDBOX_ID}' \
--header 'Authorization: Bearer {ACCESS_TOKEN}'

```


### Response

A successful response contains a list of available destinations and their unique identifiers (`id`). Store the value of the destination that you plan to use, as it will be required in further steps. For example, if you want to connect and deliver segments to Adobe Campaign, look for the following snippet in the response:

```json
{
    "id": "0b23e41a-cb4a-4321-a78f-3b654f5d7d97",
  "name": "Adobe Campaign",
  ...
  ...
}
```

## Connect to your Experience Platform data

![Destination steps overview step 2](images/flow-api-destinations-step2.png)

Next, you must connect to your Experience Platform data, so you can export profile data and activate it in your preferred destination. This consists of two substeps which are described below.

1. First, you must perform a call to authorize access to your data in Experience Platform, by setting up a base connection.
2. Then, using the base connection ID, you will make another call in which you create a source connection, which establishes the connection to your Experience Platform data.


### 1. Authorize access to your data in Experience Platform

#### API Format

```http
POST /connections
```

#### Request

<!--

```shell
curl -X POST \
    'http://platform.adobe.io/data/foundation/flowservice/connections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'x-sandbox-id: {SANDBOX_ID}' \ 
    -H 'Content-Type: application/json' \
    -d  '{
            
            "name": "Base connection to Experience Platform",
            "description": "This call establishes the connection to Experience Platform data",
            "connectionSpec": {
                "id": "{CONNECTION_SPEC}",
                "version": "1.0"
            }
           }'
```

-->

```

curl --location --request POST 'https://platform.adobe.io/data/foundation/flowservice/connections' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-gw-ims-org-id: {IMS_ORG}' \
--header 'x-sandbox-name: {SANDBOX_NAME} \
--header 'x-sandbox-id: {SANDBOX_ID}' \
--header 'Content-Type: application/json' \
--data-raw '{
            "name": "Base connection to Experience Platform",
            "description": "This call establishes the connection to Experience Platform data",
            "connectionSpec": {
                "id": "{CONNECTION_SPEC}",
                "version": "1.0"
            }
}'

```


*   `{CONNECTION_SPEC_ID}`: Use the connection spec ID for Unified Profile Service - `8a9c3494-9708-43d7-ae3f-cda01e5030e1`.

#### Response

A successful response contains the base connection's unique identifier (`id`). Store this value as it is required in the next step to create the source connection.

```json
{
    "id": "1ed86558-59b5-42f7-9865-5859b552f7f4"
}
```

### 2. Connect to your Experience Platform data

#### API Format


```http
POST /sourceConnections
```

#### Request

<!--

```shell
curl -X POST \
    'http://platform.adobe.io/data/foundation/flowservice/sourceConnections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-id: {SANDBOX_ID}' \ 
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'Content-Type: application/json' \
    -d  '{
  "name": "Connecting to Unified Profile Service",
  "description": "Optional",
  "baseConnectionId": "{BASE_CONNECTION_ID}",
  "connectionSpec": {
    "id": "{CONNECTION_SPEC}",
    "version": "1.0"
  },
  "data": {
    "format": "CSV",
    "schema": null
  }
  }
```

-->

```

curl --location --request POST 'https://platform.adobe.io/data/foundation/flowservice/sourceConnections' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-gw-ims-org-id: {IMS_ORG}' \
--header 'x-sandbox-name: {SANDBOX_NAME}' \
--header 'x-sandbox-id: {SANDBOX_ID}' \
--header 'Content-Type: application/json' \
--data-raw '{
            "name": "Connecting to Unified Profile Service",
            "description": "Optional",
            "connectionSpec": {
                "id": "{CONNECTION_SPEC}",
                "version": "1.0"
            },
            "baseConnectionId": "{BASE_CONNECTION_ID}",
            "data": {
                "format": "CSV",
                "schema": null
            },
            "params" : {}
}
'

```

*   `{BASE_CONNECTION_ID}`: Use the Id you have obtained in the previous step.
*   `{CONNECTION_SPEC_ID}`: Use the connection spec ID for Unified Profile Service - `8a9c3494-9708-43d7-ae3f-cda01e5030e1`.

### Response

A successful response returns the unique identifier (`id`) for the newly created source connection to Unified Profile Service. This confirms that you have successfully connected to your Experience Platform data. Store this value as it is required in a later step.

```json
{
    "id": "ed48ae9b-c774-4b6e-88ae-9bc7748b6e97"
}
```


## Connect to email marketing destination

![Destination steps overview step 3](images/flow-api-destinations-step3.png)

In this step, you are setting up a connection to your desired email marketing destination. This consists of two substeps which are described below. 

1. First, you must perform a call to authorize access to the email service provider, by setting up a base connection. 
2. Then, using the base connection ID, you will make another call in which you create a target connection, which specifies the location in your storage account where the exported data will be delivered, as well as the format of the data that will be exported.

### 1. Authorize access to the email marketing destination

#### API Format

```http
POST /connections
```

#### Request

<!--

```shell
curl -X POST \
    'http://platform.adobe.io/data/foundation/flowservice/connections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'x-sandbox-id: {SANDBOX_ID}' \ 
    -H 'Content-Type: application/json' \
    -d  '{
            
            "name": "S3 Connection for Adobe Campaign",
            "description": "ACME company holiday campaign",
            "connectionSpec": {
                "id": "{CONNECTION_SPEC}",
                "version": "1.0"
            },
            "auth": {
                "specName": "{S3 or SFTP}",
                "params": {
                    "accessId": "{ACCESS_ID}",
                    "secretKey": "{SECRET_KEY}"
                }
            }
           }'
```

-->

```

curl --location --request POST 'https://platform.adobe.io/data/foundation/flowservice/connections' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-gw-ims-org-id: {IMS_ORG}' \
--header 'x-sandbox-name: {SANDBOX_NAME}' \
--header 'x-sandbox-id: {SANDBOX_ID}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "S3 Connection for Adobe Campaign",
    "description": "your company's holiday campaign",
    "connectionSpec": {
        "id": "{CONNECTION_SPEC}",
        "version": "1.0"
    },
    "auth": {
        "specName": "{S3 or SFTP}",
        "params": {
            "accessId": "{ACCESS_ID}",
            "secretKey": "{SECRET_KEY}"
        }
    }
}'

```


*   `{CONNECTION_SPEC_ID}`: Use the connection spec ID you obtained in the step [Get the list of available destinations](#get-the-list-of-available-destinations).
*   `{S3 or SFTP}`: fill in the desired connection type for this destination. In the [destination catalog](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-cat/destinations-catalog.html), scroll to your preferred destination to see if S3 and/or SFTP connection types are supported. 
*   `{ACCESS_ID}`: Your access ID for your Amazon S3 storage location.
*   `{SECRET_KEY}`: Your secret key for your Amazon S3 storage location.

#### Response

A successful response contains the base connection's unique identifier (`id`). Store this value as it is required in the next step to create a target connection.

```json
{
    "id": "1ed86558-59b5-42f7-9865-5859b552f7f4"
}
```

### 2. Specify storage location and data format

#### API Format

```http
POST /targetConnections
```

#### Request

<!--

```shell
curl -X POST \
    'http://platform.adobe.io/data/foundation/flowservice/targetConnections' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \    
    -H 'x-sandbox-id: {SANDBOX_ID}' \ 
    -H 'Content-Type: application/json' \
    -d  '{
   "baseConnectionId": "{BASE_CONNECTION_ID}",
   "name": "TargetConnection for Adobe Campaign",
   "data": {
       "format": "CSV",
       "schema": {
           "id": "1.0",
           "version": "1.0"
       },
    "connectionSpec": {
    "id": "{CONNECTION_SPEC_ID}",
    "version": "1.0"
   },
   "params": {
       "mode": "S3",
       "bucketName": "{BUCKETNAME}",
       "path": "{FILEPATH}"
    }
    }
```

-->

```

curl --location --request POST 'https://platform.adobe.io/data/foundation/flowservice/targetConnections' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-gw-ims-org-id: {IMS_ORG}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "TargetConnection for Adobe Campaign",
    "description": "Connection to Adobe Campaign",
    "baseConnection": "{BASE_CONNECTION_ID}",
    "connectionSpec": {
        "id": "{CONNECTION_SPEC_ID}",
        "version": "1.0"
    },
    "data": {
        "format": "json",
        "schema": {
            "id": "1.0",
            "version": "1.0"
        }
    },
    "params": {
        "mode": "S3",
        "bucketName": "{BUCKETNAME}",
        "path": "{FILEPATH}",
        "format": "CSV"
    }
}'

```


*   `{BASE_CONNECTION_ID}`: Use the base connection ID you obtained in the step above.
*   `{CONNECTION_SPEC_ID}`: Use the connection spec you obtained in the step [Get the list of available destinations](#get-the-list-of-available-destinations).
*   `{BUCKETNAME}`: Your Amazon S3 bucket, where Real-time CDP will deposit the data export.
*   `{FILEPATH}`: The path in your Amazon S3 bucket directory where Real-time CDP will deposit the data export.

#### Response

A successful response returns the unique identifier (`id`) for the newly created target connection to your email marketing destination. Store this value as it is required in later steps.

```json
{
    "id": "12ab90c7-519c-4291-bd20-d64186b62da8"
}
```



## Create a dataflow

![Destination steps overview step 4](images/flow-api-destinations-step4.png)

Using the IDs you obtained in the previous steps, you can now create a dataflow between your Experience Platform data and the destination where you will activate data to. Think of this step as constructing the pipeline, through which data will later flow, between Experience Platform and your desired destination.

To create a dataflow, perform a POST request, as shown below, while providing the values mentioned below within the payload.

Perform the following POST request to create a dataflow.

#### API Format

```http
POST /flows
```

#### Request

```shell
curl -X POST \
'http://platform.adobe.io/data/foundation/flowservice/flows' \
-H 'Authorization: Bearer {ACCESS_TOKEN}' \
-H 'x-api-key: {API_KEY}' \
-H 'x-gw-ims-org-id: {IMS_ORG}' \
-H 'x-sandbox-name: {SANDBOX_NAME}' \
-H 'Content-Type: application/json' \
-d  '{
   
        "name": "Activate segments to Adobe Campaign",
        "description": "This operation creates a dataflow which we will later use to activate segments to Adobe Campaign",
        "flowSpec": {
            "id": "{FLOW_SPEC_ID}",
            "version": "1.0"
        },
        "sourceConnectionIds": [
            "{SOURCE_CONNECTION_ID}"
        ],
        "targetConnectionIds": [
            "{TARGET_CONNECTION_ID}"
        ],
        "transformations": [
            {
                "name": "GeneralTransform",
                "params": {
                    "segmentSelectors": {
                        "selectors": []
                    },
                    "profileSelectors": {
                        "selectors": []
                    }
                }
            }
        ]
    }
```

*   `{FLOW_SPEC_ID}`: Use the flow for the email marketing destination that you want to connect to. To get the flow spec, perform a GET operation on the `flowspecs` endpoint. See Swagger documentation here: https://platform.adobe.io/data/foundation/flowservice/swagger#/Flow%20Specs%20API/getFlowSpecs. In the response, look for `upsTo` and copy the corresponding ID of the email marketing destination that you want to connect to. For example, for Adobe Campaign, look for `upsToCampaign` and copy the `id` parameter.
*   `{SOURCE_CONNECTION_ID}`: Use the source connection ID you obtained in the step [Connect to your Experience Platform](#connect-to-your-experience-platform-data).
*   `{TARGET_CONNECTION_ID}`: Use the target connection ID you obtained in the step [Connect to email marketing destination](#connect-to-email-marketing-destination).

#### Response

A successful response returns the ID (`id`) of the newly created dataflow and an `etag`. Note down both values. as you will them in the next step, to activate segments.

```json
{
    "id": "8256cfb4-17e6-432c-a469-6aedafb16cd5",
    "etag": "8256cfb4-17e6-432c-a469-6aedafb16cd5"
}
```


## Activate data to your new destination

![Destination steps overview step 5](images/flow-api-destinations-step5.png)

Having created all the connections and the data flow, now you can activate your profile data to the email marketing platform. In this step, you select which segments and which profile attributes you are sending to the destination and you can schedule and send data to the destination.

To activate segments to your new destination, you must perform a JSON PATCH operation, similar to the example below. You can activate mutiple segments and profile attributes in one call. To learn more about JSON PATCH, see the [RFC specification](https://tools.ietf.org/html/rfc6902). 

### API Format

```http
PATCH /flows
```

### Request

```

curl --location --request PATCH 'http://platform.adobe.io/data/foundation/flowservice/flows/{DATAFLOW_ID}' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-gw-ims-org-id: {IMS_ORG}' \
--header 'Content-Type: application/json' \
--header 'x-sandbox-name: {SANDBOX_NAME}' \
--header 'x-sandbox-id: {SANDBOX_ID}' \
--header 'If-Match: "{ETAG}"' \
--data-raw '[
    {
        "op": "add",
        "path": "/transformations/0/params/segmentSelectors/selectors/-",
        "value": {
            "type": "PLATFORM_SEGMENT",
            "value": {
                "name": "Name of the segment that you are activating",
                "description": "Description of the segment that you are activating",
                "id": "{SEGMENT_ID}"
            }
        }
    },
        {
        "op": "add",
        "path": "/transformations/0/params/segmentSelectors/selectors/-",
        "value": {
            "type": "PLATFORM_SEGMENT",
            "value": {
                "name": "Name of the segment that you are activating",
                "description": "Description of the segment that you are activating",
                "id": "{SEGMENT_ID}"
            }
        }
    },
        {
        "op": "add",
        "path": "/transformations/0/params/profileSelectors/selectors/-",
        "value": {
            "type": "JSON_PATH",
            "value": {
                "operator": "EXISTS",
                "path": "{PROFILE_ATTRIBUTE}"
            }
        }
    }
]

```

*   `{DATAFLOW_ID}`: Use the data flow you obtained in the previous step.
*   `{ETAG}`: Use the etag that you obtained in the previous step.
*   `{SEGMENT_ID}`: Provide the segment ID that you want to export to this destination. To retrieve segment IDs for the segments that you want to activate, go to https://www.adobe.io/apis/experienceplatform/home/api-reference.html#/ and look for the `GET /segment/jobs` operation.
*   `{PROFILE_ATTRIBUTE}`: For example, `"person.lastName"`

### Response

Look for a 202 OK response. No response body is returned. To validate that the request was correct, see the next step, Validate the data flow. 



## Validate the data flow

![Destination steps overview step 6](images/flow-api-destinations-step6.png)

As a final step in the tutorial, you should validate that the segments and profile attributes have indeed been correctly mapped to the data flow. 

To validate this, perform the following GET request:

### API Format

```http
GET /flows
```

### Request

```

curl --location --request PATCH 'http://platform.adobe.io/data/foundation/flowservice/flows/{DATAFLOW_ID}' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--header 'x-api-key: {API_KEY}' \
--header 'x-gw-ims-org-id: {IMS_ORG}' \
--header 'Content-Type: application/json' \
--header 'x-sandbox-name: prod' \
--header 'If-Match: "{ETAG}"' 

```

*   `{DATAFLOW_ID}`: Use the data flow from the previous step.
*   `{ETAG}`: Use the etag from the previous step.

### Response

The returned response should include in the `transformations` parameter the segments and profile attributes that you submitted in the previous step. A sample `transformations` parameter in the response could look like below:

```

            "transformations": [
                {
                    "name": "GeneralTransform",
                    "params": {
                        "profileSelectors": {
                            "selectors": []
                        },
                        "segmentSelectors": {
                            "selectors": [
                                {
                                    "type": "PLATFORM_SEGMENT",
                                    "value": {
                                        "name": "Men over 50",
                                        "description": "",
                                        "id": "72ddd79b-6b0a-4e97-a8d2-112ccd81bd02"
                                    }
                                }
                            ]
                        }
                    }
                }
            ],

```

## Success! Next steps and further information

By following this tutorial, you have connected Real-time CDP to one of your preferred email marketing destinations and set up a dataflow to the respective destination. Outgoing data can now be used in the destination for email campaigns, targeted advertising, and many other use cases. See the following pages for more details:

*   [Destinations overview](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-overview.html)
*   [Destinations Catalog overview](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-cat/destinations-catalog.html)



<img src="https://i.imgur.com/aIgvaQu.png" alt="back-to-top" width="50" height="50" style="position: fixed; bottom: 30px; float: right; right: 10%; left: 90%; opacity: 0.4; padding-top: 0px; padding-bottom: 0px; border-style: hidden; border-radius: 50%;" onmouseover="this.style.opacity = 0.9;" onmouseout="this.style.opacity = 0.4;" onclick="document.documentElement.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight; document.body.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight;">