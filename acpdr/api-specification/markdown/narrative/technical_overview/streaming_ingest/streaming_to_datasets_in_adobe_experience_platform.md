# Streaming to datasets in data lake

## Streaming to specific datasets

Now, what if you wanted to send data to a specific dataset?

You can insert the dataset ID in the message header to have that message be directly ingested into it. The dataset ID can be found on [Adobe Experience Platform][aep] by going to the "Datasets" tab, clicking on the dataset you want the ID for, and copying it from the details.

> **Note:** For more information on how to create a dataset, check out [this tutorial][dataset-tutorial].

The below example will show the request and response **if** you have a dataset ID.

### Request

```SHELL
curl -X POST "https://dcs.adobedc.net/collection/{DATA_INLET_ID}" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

- `{DATA_INLET_ID}`: The ID of the created Data Inlet.  
- `{JSON_PAYLOAD}`: An example of the JSON Payload can be seen below:

```json
{
    "header": {
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
            "name": "GettingStarted"
        },
        "datasetId": "{DATASET_ID}"
    },
    "body": {
        "xdmMeta": {
            "schemaRef": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
                "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
            }
        },
        "xdmEntity":{
            "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
            "timestamp": "2019-02-23T22:07:01Z",
            "environment": {
                "browserDetails": {
                    "userAgent": "Mozilla\/5.0 (Windows NT 5.1) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/29.0.1547.57 Safari\/537.36 OPR\/16.0.1196.62",
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
                            "workEmail":{
                                "address": "janedoe@example.com"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org.
- `{DATASET_ID}`: The ID of the dataset you will be ingesting the data into.

### Response

An example of a successful response can be seen below:

```JSON
{
  "inletId": "d212ea1db6c896ef6c59c7443c717d05232e8f85bfffb0988000d68fe46dd373",
  "xactionId": "1532625558467:0001:13",
  "receivedTimeMs": 1533178977338
}
```

## Streaming to an auto-created dataset

Now, what if you don't have a dataset or dataset ID to stream to? That isn't an issue at all - a dataset will automatically be created and be streamed to, even without the ID. In order for the dataset to be automatically created, the header must have the following fields:

- IMS Org ID
- Source Name
- Schema Ref

The below example will show the request and response **if** you do not have a dataset ID.

### Request

```shell
curl -X POST "https://dcs.adobedc.net/collection/{DATA_INLET_ID}" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -d '{JSON_PAYLOAD}'
```

- `{DATA_INLET_ID}`: The ID of the created Data Inlet.  
- `{JSON_PAYLOAD}`: An example of the JSON Payload can be seen below:

```json
{
    "header": {
        "schemaRef": {
            "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
            "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
        },
        "imsOrgId": "{IMS_ORG}",
        "source": {
            "name": "GettingStarted"
        }
    },
    "body": {
        "xdmMeta": {
            "schemaRef": {
                "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
                "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
            }
        },
        "xdmEntity":{
            "_id": "9af5adcc-db9c-4692-b826-65d3abe68c22",
            "timestamp": "2019-02-23T22:07:01Z",
            "environment": {
                "browserDetails": {
                    "userAgent": "Mozilla\/5.0 (Windows NT 5.1) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/29.0.1547.57 Safari\/537.36 OPR\/16.0.1196.62",
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
                            "workEmail":{
                                "address": "janedoe@example.com"
                            }
                        }
                    }
                }
            }
        }
    }
}
```


- `{IMS_ORG}`: Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{TENANT_ID}`: This ID is used to ensure that resources you create are namespaced properly and contained within your IMS Org.

### Response

```json
{
    "inletId": "d212ea1db6c896ef6c59c7443c717d05232e8f85bfffb0988000d68fe46dd373",
    "xactionId": "1532625558467:0001:13",
    "receivedTimeMs": 1533178977338
}
```

With this, the dataset will be created with the name "Automatically generated dataset for {SOURCE_NAME}". Subsequent data that is streamed with the same IMS Org, source, and schema will also be streamed to this dataset.

[dataset-tutorial]: ../../tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md

[aep]: https://platform.adobe.com/home