# Authenticated Data Collection via Streaming Ingestion APIs

## Introduction

Authenticated Data Collection allows Adobe Experience Platform services, such as Unified Profile and Identity, to differentiate between records coming from trusted sources and un-trusted sources. Clients that want to send Personally Identifiable Information (PII) can do so by sending IMS Access Tokens as part of the POST request - if the IMS Token is valid, the records are marked as collected from valid sources.

### Authentication Process

The following steps are taken to enforce authentication for data collection.

First, the access token that is sent as part of the POST request is exchanged with [IMS][ims-auth] to retrieve that account's details. 

Afterwards, the system checks if the account belongs to the IMS Organization that the data is being written to, and then checks to see if that account has the appropriate Adobe Experience Platform entitlements to publish data to that streaming connection. 

### Creating a Data Inlet

Creating a new data inlet which enforces authorization has a very similar process to creating one which doesn't enforce authorization. 

#### Request

```SHELL
CURL -X POST "https://platform.adobe.io/data/core/edge/inlet" \
  -H "Cache-Control: no-cache" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "x-api-key: {API_KEY}" \
  -H "x-gw-ims-org-id: {IMS_ORG}" \
  -d '{JSON_PAYLOAD}'
```

> **Note**: To find your API Key and IMS org ID, go to <https://console.adobe.io/integrations>, click on the Overview for the integration you want to use, and copy the API Key and Organization ID listed.

Where:

- `{ACCESS_TOKEN}` : Your specific bearer token value provided after authentication.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  
- `{IMS_ORG}` :  Your IMS organization ID can be found under the integration details in the Adobe I/O Console.  
- `{JSON_PAYLOAD}` : An example JSON payload format can be seen below:

```JSON
{
    "name": "My Data Inlet",
    "description": "Collects streaming data from my website",
    "sourceId": "website",
    "dataType": "xdm",
    "authenticationRequired": true
}
```

Where:

- `name`: The name you want to use for your data inlet.   
- `description`: The description you want to use for your data inlet.  
- `sourceId`: A meaningful identifier or name of the source sending the streaming data.
- `dataType`: The type of data that is being streamed.
- `authenticationRequired`: Having this set to true requires that calls carry an Authorization token when sending data to the inlet.

#### Response

An example of a successful response can be seen below:

```JSON
{
    "dataInletId": "{DATA_INLET_ID}",
    "imsOrg": "{IMS_ORG}",
    "sourceId": "{SOURCE_ID}",
    "dataType": "xdm",
    "name": "{DATA_INLET_NAME}",
    "description": "{DATA_INLET_DESCRIPTION}",
    "authenticationRequired": true,    
    "createdBy": "{API_KEY}",
    "createdAt": "2018-07-10T22:07:56Z",
    "modifiedAt": "2018-07-10T22:07:56Z",
    "modifiedBy": "{API_KEY}",
    "dataInletUrl": "https://dcs.adobedc.net/collection/{DATA_INLET_ID}"
}
```

Where:

- `{DATA_INLET_ID}` : The ID of your newly created data inlet. 
- `{IMS_ORG}`:  The IMS organization ID that you used in your request.    
- `{SOURCE_ID}`: The meaningful identifier or name of the source you sent in your request.    
- `{DATA_INLET_NAME}`: The name of your newly created data inlet.   
- `{DATA_INLET_DESCRIPTION}`: The description of your newly created data inlet.   
- `{API_KEY}` : Your specific API key value found in your unique Adobe Experience Platform integration.  

### Streaming Ingestion APIs

If a data inlet is created with `authenticationRequired: true`, the client will be **required** to pass in the `Authorization` header. The value of the header should either be an **IMS generated Token** or **Bearer + IMS generated Token**.

If the Authorization header is not present, or the IMS Token is either invalid or expired, the client will get a response of `401 Unauthorized`, and the message will not be published.

#### Authenticated Data Inlets

If an inlet has `authenticationRequired: true` and the request has authorization issues, the following response will be sent:

```json
{
    "type": "https://ns.adobe.com/adobecloud/problem/data-collection-service-authorization",
    "status": "401",
    "title": "Authorization",
    "report": {
        "message": "[id] Ims service token is empty"
    }
}
```

If an endpoint has `authenticationRequired: true` and the request has no authorization issues, the following will occur:
- The field `authenticatedRequest` will be set to **true** in the `_dcsMeta` block of the payload
- The message will be published to downstream services

An example of a published message:

```json
{
    "header": {
        "schemaRef": {
            "id": "https://ns.adobe.com/{IMS_ORG}/schemas/{SCHEMA_ID}",
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
                "id": "https://ns.adobe.com/{IMS_ORG}/schemas/{SCHEMA_ID}",
                "contentType": "application/vnd.adobe.xed-full+json;version={SCHEMA_VERSION}"
            }
        },
        "xdmEntity": {
            "person": {
                "name": {
                    "firstName": "Jane",
                    "middleName": "F",
                    "lastName": "Doe"
                },
                "birthDate": "1967-01-03",
                "gender": "female"
            },
            "workEmail": {
                "primary": true,
                "address": "janedoe@example.com",
                "type": "work",
                "status": "active"
            }
        }
    }
}
```

Where:

- `{IMS_ORG}`:  Your IMS organization ID can be found under the integration details in the Adobe I/O Console.
- `{SCHEMA_ID}`: The ID of the previously created schema. 
- `{SCHEMA_VERSION}`: The version of the previously created schema.
- `{DATASET_ID}`: The ID of the previously created dataset you are ingesting data into.


#### Unauthenticated Data Inlets

If a data inlet is configured to not require authenticated access, clients can still choose to send the Authorization header to the Streaming Ingestion APIs. 

With this, there are two scenarios that can occur:

- If the IMS Token is either invalid or expired, the data **will** still be published, but the `authenticatedRequest` field will be set to `false`.
- Where the provided token is valid, the message will be published with the `authenticatedRequest` field set to `true`.

#### Summary
Following this guide, you should be able to do the following actions:
- Creating a Data Inlet
- Use Authenticated and Unauthenticated Data Inlets

With this knowledge, you should be able to use authenticated data inlets to securely send sensitive information to Adobe Experience Platform's Streaming Ingestion APIs.

[ims-auth]: https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md