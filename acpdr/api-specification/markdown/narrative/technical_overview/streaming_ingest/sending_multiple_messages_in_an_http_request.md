# Sending multiple messages in an HTTP request
When streaming data to Adobe Experience Platform, making numerous HTTP calls can be expensive. For instance, instead of creating 200 HTTP requests with 1KB payloads, it is much more efficient to create 1 HTTP request with 200 messages of 1KB each, with a single payload of 200KB. When used correctly, grouping multiple messages within a single request is an excellent way to optimize data being sent to Experience Platform.

This document provides a tutorial for sending multiple messages to Experience Platform within a single HTTP request using streaming ingestion. Topics covered in this tutorial include:
  - [Register a data inlet](#register-a-data-inlet)
  - [Stream to a dataset](#stream-to-a-dataset)
  - [Identify failed messages](#identify-failed-messages)
    - [Send request payload with valid and invalid messages](#send-request-payload-with-valid-and-invalid-messages)
    - [Retrieve failed messages from Platform](#retrieve-failed-messages-from-platform)
  - [Confirm messages ingested](#confirm-successful-messages-ingested)
   
## Getting started
This tutorial requires a working understanding of Adobe Experience Platform Data Ingestion. Before beginning this tutorial, please review the following documentation:
* [Data Ingestion overview][data-ingestion-overview]: Covers the core concepts of Experience Platform Data Ingestion, including ingestion methods and data connectors.
* [Getting started with streaming ingestion][getting-started-stream-ingest]: The workflow and building blocks of streaming ingestion, such as data inlets, datasets, XDM Individual Profile, and XDM ExperienceEvent.
* [Streaming to datasets in Data Lake][stream-to-dataset]: How to send an HTTP request with a single message.

This tutorial also requires you to have completed the [Authentication to Adobe Experience Platform][authenticate-to-acp-tutorial] tutorial in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the value for the Authorization header required by all API calls in this tutorial. The header is shown in sample calls as follows:
* Authorization: Bearer `{ACCESS_TOKEN}`

All POST requests require an additional header:
* Content-Type: application/json

## Register a data inlet
You must first register a data inlet before you can start streaming data to Experience Platform. Read the [create a data inlet][create-a-data-inlet] section of the Getting Started with Streaming Ingestion guide to learn how to register a data inlet.

After registering a data inlet, you, as the data producer, will have a unique URL which can be used to stream data to Platform.

## Stream to a dataset

The following example shows how to send multiple messages to a specific dataset within a single HTTP request. Insert the dataset ID in the message header to have that message directly ingested into it.

You can get the ID for an existing dataset using the Platform UI or using a listing operation in the API. The dataset ID can be found on [Experience Platform][platform-ui] by going to the **Datasets** tab, clicking on the dataset you want the ID for, and copying the string from the **Dataset ID** field on the **Info** tab. See the [Catalog Service overview][catalog-service-listing-datasets] for information on how to retrieve datasets using the API.

Instead of using an existing dataset, you can create a new dataset. Please read the [Create a dataset using APIs][create-dataset] tutorial for more information on creating a dataset using APIs.

#### API Format
```http
POST /collection/batch/{DATA_INLET_ID}
```

#### Request

```shell
curl -location -request POST "https://dcs.adobedc.net/collection/batch/{DATA_INLET_ID}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d "{JSON_PAYLOAD}"
```

Where:
- `{DATA_INLET_ID}`: The ID of the created Data inlet
- `{ACCESS_TOKEN}`: Token provided after authentication.
- `{JSON_PAYLOAD}`: An example of the JSON payload can be seen below.

```JSON
{
  "messages": [
    {
      "header": {
        "schemaRef": {
          "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
          "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
          "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}",
        "createdAt": 1526283801869
      },
      "body": {
        "xdmMeta": {
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
          }
        },
        "xdmEntity": {
          "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
          "timestamp": "2019-02-23T22:07:01Z",
          "environment": {
            "browserDetails": {
              "userAgent": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36 OPR/16.0.1196.62",
              "acceptLanguage": "en-US",
              "cookiesEnabled": true,
              "javaScriptVersion": "1.6",
              "javaEnabled": true
            },
            "colorDepth": 32,
            "viewportHeight": 799,
            "viewportWidth": 414
          },
          "productListItems": [
            {
              "SKU": "CC",
              "name": "Fernie Snow",
              "quantity": 30,
              "priceTotal": 7.8
            }
          ],
          "commerce": {
            "productViews": {
              "value": 1
            }
          },
          "_experience": {
            "campaign": {
              "message": {
                "profileSnapshot": {
                  "workEmail": {
                    "address": "gregdorcey@example.com"
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "header": {
        "schemaRef": {
          "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
          "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
          "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}",
        "createdAt": 1526283801869
      },
      "body": {
        "xdmMeta": {
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
          }
        },
        "xdmEntity": {
          "_id": "7af6adcc-dc9e-4692-b826-55d2abe68c11",
          "timestamp": "2019-02-23T22:07:31Z",
          "environment": {
            "browserDetails": {
              "userAgent": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36 OPR/16.0.1196.62",
              "acceptLanguage": "en-US",
              "cookiesEnabled": true,
              "javaScriptVersion": "1.6",
              "javaEnabled": true
            },
            "colorDepth": 32,
            "viewportHeight": 799,
            "viewportWidth": 414
          },
          "productListItems": [
            {
              "SKU": "CC",
              "name": "Carmine Santiago",
              "quantity": 10,
              "priceTotal": 5.5
            }
          ],
          "commerce": {
            "productViews": {
              "value": 1
            }
          },
          "_experience": {
            "campaign": {
              "message": {
                "profileSnapshot": {
                  "workEmail": {
                    "address": "emilyong@example.com"
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

Where:
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org.
- `{SCHEMA_ID}`: The ID of the schema assigned to the target dataset.
- `{DATASET_ID}`: The ID of the dataset you will be ingesting data into.

#### Response

A successful response returns an HTTP status 207 (Multi-status). Reviewing the response body provides more details into the success or failure of each method executed in the request. A response is returned for each element of the request messages array. Below is an example of a successful response with no message failures:

```JSON
{
    "inletId": "9b0cb233972f3b0092992284c7353f5eead496218e8441a79b25e9421ea127f5",
    "batchId": "1565628583792:1485:153",
    "receivedTimeMs": 1565628583854,
    "responses": [
        {
            "xactionId": "1565628583792:1485:153:0"
        },
        {
            "xactionId": "1565628583792:1485:153:1"
        }
    ]
}
```

For more information on status codes, please see the [response codes](#response-codes) table in the Appendix of this tutorial.

## Identify failed messages 
Compared to sending a request with a single message, when sending an HTTP request with multiple messages, there are additional factors to consider, such as: how to identify when data has failed to send, which specific messages failed to send and how they can be retrieved, and what happens to data that succeeds when other messages in the same request fail.

Before proceeding with this tutorial, it is recommended to first review the [retrieving failed batches][retrieve-failed-batches] guide.

### Send request payload with valid and invalid messages
The following example shows what happens when the batch includes valid and invalid messages.

The request payload is an array of JSON objects representing the event in XDM schema. Note that the following conditions needs to be met for successful validation of the message:
* The `imsOrgId` field in the message header has to match the inlet definition. If the request payload does not include an `imsOrgId` field, the Data Collection Core Service (DCCS) will add the field automatically.
* The header of the message should reference an existing XDM schema created in the Platform UI
* The `dataSetId` field needs to reference an existing dataset in Platform, and its schema needs to match the schema provided in the `header` object within each message included in the request body.

#### API Format
```http
POST /collection/batch/{DATA_INLET_ID}
```

#### Request

```shell
curl -location -request POST "https://dcs.adobedc.net/collection/batch/{DATA_INLET_ID}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -d "{JSON_PAYLOAD}"
```

Where:
- `{DATA_INLET_ID}`: The ID of the created Data inlet
- `{ACCESS_TOKEN}`: Token provided after authentication.
- `{JSON_PAYLOAD}`: An example of the JSON payload can be seen below.

```JSON
{
  "messages": [
    {
      "header": {
        "schemaRef": {
          "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
          "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
          "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}",
        "createdAt": 1526283801869
      },
      "body": {
        "xdmMeta": {
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
          }
        },
        "xdmEntity": {
          "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
          "timestamp": "2019-02-23T22:07:01Z",
          "environment": {
            "browserDetails": {
              "userAgent": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36 OPR/16.0.1196.62",
              "acceptLanguage": "en-US",
              "cookiesEnabled": true,
              "javaScriptVersion": "1.6",
              "javaEnabled": true
            },
            "colorDepth": 32,
            "viewportHeight": 799,
            "viewportWidth": 414
          },
          "productListItems": [
            {
              "SKU": "CC",
              "name": "Tip Top Collection",
              "quantity": 15,
              "priceTotal": 9.5
            }
          ],
          "commerce": {
            "productViews": {
              "value": 1
            }
          },
          "_experience": {
            "campaign": {
              "message": {
                "profileSnapshot": {
                  "workEmail": {
                    "address": "rogerkanagawa@example.com"
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "header": {
        "schemaRef": {
          "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
          "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
          "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}",
        "createdAt": 1526283801869
      }
    },
    {
      "header": {
        "schemaRef": {
          "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
          "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
        },
        "imsOrgId": "invalidIMSOrg@AdobeOrg",
        "source": {
          "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}",
        "createdAt": 1526283801869
      },
      "body": {
        "xdmMeta": {
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
          }
        },
        "xdmEntity": {
          "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
          "timestamp": "2019-02-23T22:07:01Z",
          "environment": {
            "browserDetails": {
              "userAgent": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36 OPR/16.0.1196.62",
              "acceptLanguage": "en-US",
              "cookiesEnabled": true,
              "javaScriptVersion": "1.6",
              "javaEnabled": true
            },
            "colorDepth": 32,
            "viewportHeight": 799,
            "viewportWidth": 414
          },
          "productListItems": [
            {
              "SKU": "CC",
              "name": "Carmine Santiago",
              "quantity": 10,
              "priceTotal": 5.5
            }
          ],
          "commerce": {
            "productViews": {
              "value": 1
            }
          },
          "_experience": {
            "campaign": {
              "message": {
                "profileSnapshot": {
                  "workEmail": {
                    "address": "mohandeewar@example.com"
                  }
                }
              }
            }
          }
        }
      }
    },
   {
      "header": {
        "schemaRef": {
          "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
          "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
          "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}",
        "createdAt": 1526283801869
      },
      "body": {
        "xdmMeta": {
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
          }
        },
        "xdmEntity": {
          "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
          "timestamp": "2019-02-23T22:07:01Z",
          "environment": {
            "browserDetails": {
              "userAgent": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36 OPR/16.0.1196.62",
              "acceptLanguage": "en-US",
              "cookiesEnabled": true,
              "javaScriptVersion": "1.6",
              "javaEnabled": true
            },
            "colorDepth": 32,
            "viewportHeight": 799,
            "viewportWidth": 414
          },
          "productListItems": [
            {
              "SKU": "CC",
              "name": "Tip Top Collection",
              "quantity": 15,
              "priceTotal": 9.5
            }
          ],
          "commerce": {
            "productViews": {
              "value": 1
            }
          }
        }
      }
    },
    {
      "header": {
        "msgType": "xdmEntityCreate",
        "msgId": "79d2e715-f25f-4c36",
        "xdmSchema": {
          "name": "_xdm.context.experienceevent"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
          "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}",
        "createdAt": 1526283801869
      },
      "body": {
        "xdmMeta": {
          "xdmSchema": {
            "name": "_xdm.context.experienceevent"
          }
        },
        "xdmEntity": {
          "_id": "abc",
          "dataSource": {
            "_id": "http://abc.com/abc"
          },
          "timestamp": "2018-05-18T15:28:25Z",
          "endUserIDs": {
            "_vendor": {
              "adobe": {
                "experience": {
                  "mcId": {
                    "id": "http://abc.com/abc"
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```
Where:
- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org.
- `{SCHEMA_ID}`: The ID of the schema assigned to the target dataset.
- `{DATASET_ID}`: The ID of the dataset you will be ingesting data into.

#### Response 

The response payload includes a status for each message along with a GUID in the `xactionId` that can be used for tracing.

```JSON
{
    "inletId": "9b0cb233972f3b0092992284c7353f5eead496218e8441a79b25e9421ea127f5",
    "batchId": "1565638336649:1750:244",
    "receivedTimeMs": 1565638336705,
    "responses": [
        {
            "xactionId": "1565650704337:2124:92:3"
        },
        {
            "statusCode": 400,
            "message": "inletId: [9b0cb233972f3b0092992284c7353f5eead496218e8441a79b25e9421ea127f5] imsOrgId: [{IMS_ORG}] Message has unknown xdm format"
        },
        {
            "statusCode": 400,
            "message": "inletId: [9b0cb233972f3b0092992284c7353f5eead496218e8441a79b25e9421ea127f5] imsOrgId: [{IMS_ORG}] Message has an absent or wrong ims org in the header"
        },
        {
            "statusCode": 400,
            "message": "inletId: [9b0cb233972f3b0092992284c7353f5eead496218e8441a79b25e9421ea127f5] imsOrgId: [{IMS_ORG}] Message has unknown xdm format"
        }
    ]
}
```
The example response above shows error messages for the previous request. By comparing this response to the previous valid response, you can observe that the request resulted in a partial success, with one message being ingested successfully and three messages resulting in failure. Note that both responses return a '207' status code. For more information on status codes, please see the [response codes](#response-codes) table in the Appendix of this tutorial.

The first message was successfully sent to Platform and is not affected by the results of the other messages. As a result, when attempting to resend the failed messages, you do not need to re-include this message.

The second message failed because it lacked a message body. The collection request expects message elements to have valid header and body sections. Adding the following code after the header in the second message will fix the request, allowing the second message to pass validation:

```JSON
      "body": {
        "xdmMeta": {
          "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;{SCHEMA_VERSION}"
          }
        },
        "xdmEntity": {
          "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
          "timestamp": "2019-02-23T22:07:01Z",
        }
    },
```

The third message failed due to an invalid IMS organization ID being used in the header. The IMS organization must match with the {DATA_INLET_ID} that you are trying to post to. To determine which IMS organization ID matches the data inlet you are using, you can perform a `GET inlet` request using the [Data Ingestion API][data-ingestion-api-reference]. See [retrieving a data inlet][retrieve-a-data-inlet] for an example of how to retrieve previously created data inlets. 

The fourth message failed because it did not follow the expected XDM schema. The `xdmSchema` included in the header and body of the request do not match the XDM schema of the `{DATASET_ID}`. You can retrieve information on datasets, including their schema, using the Platform UI or the API. The instructions in [streaming to specific datasets](#streaming-to-specific-datasets) show how to retrieve dataset information. Correcting the schema in the message header and body allows it to pass DCCS validation and be successfully sent to Platform. The message body must also be updated to match the XDM schema of the `{DATASET_ID}` for it to pass streaming validation on Platform. For more information on what happens to messages that successfully stream to Platform, see the [confirm messages ingested](#confirm-messages-ingested) section of this tutorial.

### Retrieve failed messages from Platform

Failed messages are identified by an error status code in the response array. 
The invalid messages are collected and stored in an "error" batch within the dataset specified by `{DATASET_ID}`.

Read the [retrieving failed batches][retrieve-failed-batches] guide for more information on recovering failed batch messages.

## Confirm messages ingested

Messages that pass DCCS validation are streamed to Platform. On Platform, the batch messages are tested by streaming validation before being ingested into the data lake. The status of batches, whether successful or not, appear within the dataset specified by `{DATASET_ID}`.

You can view the status of batch messages that successfully stream to Platform using the [Experience Platform UI][platform-ui] by going to the **Datasets** tab, clicking on the dataset you are streaming to, and checking the **Dataset Activity** tab.

Batch messages that pass streaming validation on Platform are ingested into the data lake. The messages are then available for analysis or export.

## Next steps

Now that you know how to send multiple messages in a single request and verify when messages are successfully ingested into the target dataset, you can start streaming your own data to Platform. For an overview of how to query and retrieve ingested data from Platform, see the [Data Access][data-access-overview] guide.

Once you are comfortable streaming to Platform and have successfully ingested test data to work with, consider doing the [data access tutorial][data-access-tutorial] to learn how to use the API to query dataset data.

## Appendix

This section contains supplemental information for the tutorial.

### Response codes

The following table shows status codes returned by successful and failed response messages.

| Status code | Description |
| :---: | --- |
| 207 	| Although '207' is used as the overall response status code, the recipient needs to consult the contents of the multistatus response body for further information about the success or failure of the method execution. The response code is used in success, partial success, and also in failure situations. |
| 400 	| There was a problem with the request. See the response body for a more specific error message (For example, Message payload was missing required fields, or Message was unknown xdm format).	|
| 401 	| Unauthorized: request missing valid authorization header. This is only returned for inlets that have authentication enabled.	|
| 403 	| Unauthorized:  Provided authorization token is invalid or expired. This is only returned for inlets that have authentication enabled. |
| 413 	| Payload too large - thrown when the total payload request is greater than 1MB. |
| 429 	| Too many requests within specified time duration. |
| 500 	| Error in processing payload. See the response body for a more specific error message (For example, Message payload schema not specified, or did not match the XDM definition in Platform). |
| 503 	| Service is not currently available. Clients should retry at least 3 times using an exponential back-off strategy. |

[data-ingestion-overview]: https://adobe.io/apis/experienceplatform/home/data-ingestion.html
[data-ingestion-api-reference]: https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/ingest-api.yaml
[data-access-overview]: ../../technical_overview/data_access_architectural_overview/data_access_architectural_overview.md
[data-access-tutorial]: ../data_access_tutorial/data_access_tutorial.md
[getting-started-stream-ingest]: ../../technical_overview/streaming_ingest/creating_a_streaming_connection.md
[create-a-data-inlet]: ../../technical_overview/streaming_ingest/creating_a_streaming_connection.md#create-a-connection
[retrieve-a-data-inlet]: ../../technical_overview/streaming_ingest/creating_a_streaming_connection.md#get-data-collection-url
[stream-to-dataset]: ../../technical_overview/streaming_ingest/streaming_to_datasets_in_adobe_experience_platform.md
[authenticate-to-acp-tutorial]: ../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md
[catalog-service-listing-datasets]: ../../technical_overview/catalog_architectural_overview/catalog_architectural_overview.md#listing-objects
[retrieve-failed-batches]: ../../technical_overview/streaming_ingest/retrieving_failed_batches.md
[xdm-schema-composition]: ../../technical_overview/schema_registry/schema_composition/schema_composition.md
[platform-ui]: https://platform.adobe.com
[create-dataset]: ../creating_a_dataset_tutorial/creating_a_dataset_tutorial.md