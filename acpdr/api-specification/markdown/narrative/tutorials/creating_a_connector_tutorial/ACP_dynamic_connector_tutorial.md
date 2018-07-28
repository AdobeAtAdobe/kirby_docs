# Creating and Populating a Dataset using a Connector

## 1. Objective

This document is intended to provide a tutorial on creating and populating a customer dataset via a connector. The steps required to perform this operation are listed below:

* Create Catalog Account Entity  
* Create Catalog Connection Entity
* Create Catalog Dataset Entity

The tutorial to create and populate a dataset via a file can be found [here](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md)

### 1.1. Audience
This document is written for users who need to understand Adobe Cloud Platform and have to integrate the platform with customer-owned or third party systems. Users include data engineers, data architects, data scientists, and app developers within Adobe I/O who will need to perform Adobe Cloud Platform API calls.

### 1.2. Version Information
*Version* : Preview

### 1.3. License Information
Terms of service : https://www.adobe.com/legal/terms.html


### 1.4 URI Scheme
*Host* : __platform.adobe.io__  
*Schemes* : __HTTPS__

### 1.5. About the Docs

This document is kept up-to-date and can be updated without announcement.

---

## 2. Datasets from a Schema

There are two ways data can be ingested into a dataset. The first is [batch ingestion via file upload](./alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_dataset_tutorial/creating_a_dataset_tutorial.md) and the second is ingestion via setting up a connector. We will go over the steps to ingest via a connector in this section.

### 2.1. Prerequisites

Follow this [Tutorial](./alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for authorization to start making API calls.

From the tutorial you should now have the following values:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.


To set up the Salesforce CRM (Customer Relationship Management) connector, you will also need the following Salesforce CRM credentials:

* `{SALESFORCE_USER_NAME}`: Your Salesforce CRM user name
* `{SALESFORCE_PASSWORD}`: Your Salesforce CRM password
* `{SALESFORCE_SECURITY_TOKEN}`: Your Salesforce security token. This can be found with the following steps:  
  1. Go to https://developer.salesforce.com/
  2. Log in using your Salesforce CRM credentials
  3. Click on top right user avatar and select "Settings" link
  4. Now in the "Personal Information" view click on "Reset My Security Token"
  5. You will receive a new security token via email.

With the above values we can move on to the next section:

### 2.2. Ingesting Data from Salesforce Connector<a name="2_3_Header"></a>

Now we will go through the API request steps required to set up a Salesforce CRM connector which will trigger data ingestion daily. The Salesforce CRM object used will be the `Account` object.

#### 2.2.1. Create Catalog Account Entity

First we will create a Salesforce CRM catalog account entity. This request takes a Salesforce User Name, Salesforce Password, and Salesforce Security Token. The response contains the account ID.

#### Request
POST /connections

```SHELL
curl -X POST https://platform-int.adobe.io/data/foundation/catalog/accounts/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d '{
  "params": {
    "username": "{SALESFORCE_USER_NAME}",
    "password": {
      "value": "{SALESFORCE_PASSWORD}",
      "isSecret": true
    },
    "securityToken": {
      "value": "{SALESFORCE_SECURITY_TOKEN}",
      "isSecret": true
    },
    "serviceUrl": "login.salesforce.com"
  },
  "connector": "salesforce"
}'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{SALESFORCE_USER_NAME}`: Your username for Salesforce CRM.  
`{SALESFORCE_PASSWORD}`: Your password for Salesforce CRM.  
`{SALESFORCE_SECURITY_TOKEN}`: Your security token for Salesforce CRM.  

#### Response
```JSON
[
  "@/accounts/{ACCOUNT_ID}"
]
```

`{ACCOUNT_ID}`: Take down this account ID. We will use this value in future steps and referring to it as {ACCOUNT_ID}.

#### 2.2.2. Create Catalog Connection Entity

With our account ID we can now create a Salesforce catalog connection entity. In this request we will state when we want the ingestion to start (`"ingestStart"`) and what frequency we want the ingestion to occur (`"frequency"`). In the following request we will go with the default value of daily ingestion.

#### Request
POST /connections

```SHELL
curl -X POST https://platform.adobe.io/data/foundation/catalog/connections/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
  -d '{
      "name": "{CONNECTION_NAME}",
      "description": "",
      "ingestStart": "{INGEST_START}",
      "frequency": {
        "timezone": "UTC",
        "month": "*",
        "day": "*",
        "hour": "00",
        "minute": "00",
        "dayOfWeek": "*"
        },
      "connector": "salesforce",
      "accountId": "{ACCOUNT_ID}"
    }'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials  
`{CONNECTION_NAME}`: Name of the connection you are creating.  
`{INGEST_START}`: Date and time when ingestion is scheduled to start. If time is set to the past (relative to current time) ingestion will begin immediately. Format is `"yyyy-mm-ddThh:mm:ss.000Z"` (E.g. `"2018-03-22T23:59:59.000Z"`)  

#### Response
```JSON
[
    "@/connections/{CONNECTION_ID}"
]
```

`{CONNECTION_ID}`: ID of the connector you just created. We will refer to this as {CONNECTION_ID} in future steps.

#### 2.2.3. Get Salesforce CRM Selected Object

Our next step is to select what Salesforce CRM object to ingest. We can get the entire list of available objects from the Salesforce CRM connection using the following request.

#### Request
GET /connectors/connections/{CONNECTION_ID}/objects

```SHELL
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json' \
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.

#### Response

```JSON
[
    {
        "logicalName": "AcceptedEventRelation",
        "displayName": "Accepted Event Relations"
    },
    {
        "logicalName": "Account",
        "displayName": "Accounts"
    },
    {
        "logicalName": "Contact",
        "displayName": "Contacts"
    },
    {
        "logicalName": "User",
        "displayName": "Users"
    },
      "..."
    {
        "logicalName": "WebLink",
        "displayName": "Custom Buttons or Links"
    }
]
```

The above object is just a partial response of the actual list of available Salesforce CRM objects. We want to note that the `logicalName` of the objects we want to use . This will be used as the {OBJECT_ID}

The next step will be ingesting fields from the `Account` object; however first we need to determine which fields we want from it. We can make the following response to see all fields for a specific Salesforce CRM object.

#### Request
POST /connectors/connections/{CONNECTION_ID}/object/{OBJECT_ID}/fields

```SHELL
curl -X GET https://platform.adobe.io/data/foundation/connectors/connections/{CONNECTION_ID}/objects/{{OBJECT_ID}}/fields \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'Content-Type: application/json'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the Salesforce Object you want to ingest.  

#### Response  

```JSON
[
    {
        "logicalName": "Name",
        "displayName": "Account Name",
        "isPrimaryKey": false,
        "type": "string",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "string",
            "maxLength": 255,
            "options": null
        }
    },
    {
        "logicalName": "Site",
        "displayName": "Account Site",
        "isPrimaryKey": false,
        "type": "string",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "string",
            "maxLength": 80,
            "options": null
        }
    },
    {
        "logicalName": "SystemModstamp",
        "displayName": "System Modstamp",
        "isPrimaryKey": false,
        "type": "date",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "datetime",
            "options": null
        }
    },
      "..."
    {
        "logicalName": "UpsellOpportunity__c",
        "displayName": "Upsell Opportunity",
        "isPrimaryKey": false,
        "type": "string",
        "meta": {
            "inboundSupported": true,
            "outboundSupported": true,
            "originalType": "picklist",
            "maxLength": 255,
            "options": [
                {
                    "value": "Maybe",
                    "label": "Maybe"
                },
                {
                    "value": "No",
                    "label": "No"
                },
                {
                    "value": "Yes",
                    "label": "Yes"
                }
            ]
        }
    }
]
```

Note that the above request is only a segment of the actual response.  

Users can choose to have all the fields of an object ingested or select only fields they are interested in. We will reference the fields in this request in the following step.

#### 2.2.4. Create Dataset Catalog Entity

The last step is to create the Salesforce CRM dataset catalog entity. The dataset will define the structure of the data that will be ingested from the connection.

#### Request
POST /datasets

```SHELL
curl -X POST https://platform.adobe.io/data/foundation/catalog/datasets/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG' \
  -H 'Content-Type: application/json' \
  -d '{JSON_PAYLOAD}'
```

`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.  
`{IMG_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration.  
`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.   
`{ACCOUNT_ID}`: Account ID generated from your Salesforce credentials.  
`{CONNECTION_ID}`: ID of the connector you created from the previous steps.  
`{OBJECT_ID}`: Logical Name of the Salesforce Object you want to ingest.  

`{JSON_PAYLOAD}`: The dataset to be posted. The example we use in our tutorial is here:

```JSON
{
      "objectId": "{OBJECT_ID}",
      "name": "Accounts",
      "saveStrategy": "append",
      "connectionId": "{CONNECTION_ID}",
      "tags": {
        "connectors-objectName": [
          "{OBJECT_ID}"
        ],
        "connectors-saveStrategy": [
          "append"
        ]
      },
      "fields": [
        {
            "logicalName": "Name",
            "displayName": "Account Name",
            "isPrimaryKey": false,
            "type": "string",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "string",
                "maxLength": 255,
                "options": null
            }
        },
        {
            "logicalName": "Site",
            "displayName": "Account Site",
            "isPrimaryKey": false,
            "type": "string",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "string",
                "maxLength": 80,
                "options": null
            }
        },
        {
            "logicalName": "SystemModstamp",
            "displayName": "System Modstamp",
            "isPrimaryKey": false,
            "type": "date",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "datetime",
                "options": null,
                "delta": {}
            }
        },
        {
            "logicalName": "UpsellOpportunity__c",
            "displayName": "Upsell Opportunity",
            "isPrimaryKey": false,
            "type": "string",
            "meta": {
                "inboundSupported": true,
                "outboundSupported": true,
                "originalType": "picklist",
                "maxLength": 255,
                "options": [
                    {
                        "value": "Maybe",
                        "label": "Maybe"
                    },
                    {
                        "value": "No",
                        "label": "No"
                    },
                    {
                        "value": "Yes",
                        "label": "Yes"
                    }
                ]
            }
        }
      ],
      "connectorId": "salesforce",
      "requestStartDate": "2018-02-14 16:06:44",
      "status": "enabled",
      "aspect": "production"
    }
```

The `{JSON PAYLOAD}` we are using is the subset of object fields we selected from the previous response to get all fields for the `Account` Salesforce CRM object. This defines which fields that will be populated by the connector on a recurring frequency (E.g. Account Name, Account Site, System Modstamp...).


The field `"requestStartDate"` dictates how far in the past (relative to now) should the backfill go. `"requestStartDate"` is always a date in the past. If you want a backfill of 30 days then you have to calculate `now() - 30 days` and enter a valid date time value for this field.

The `"connectors-saveStrategy"` field refers to how the data will be ingested. In our tutorial we chose to Append data instead of Delta or Overwrite. For Append and Delta save strategies, since they are sorted by time, you will also need to decide on what value to use in the time-based-column if time-based-queries take place (E.g. System Modstamp, Created Date, Last Modified Date). Adding a `"delta": {}` in the `"meta"` field indicates which method is selected to be in the time-based-column. In our example we added the tag into the `"SystemModstamp"` object for the `"JSON_PAYLOAD"` we passed into the request.

```JSON
{
  "logicalName": "SystemModstamp",
  "displayName": "System Modstamp",
  "isPrimaryKey": false,
  "type": "date",
  "meta": {
      "inboundSupported": true,
      "outboundSupported": true,
      "originalType": "datetime",
      "options": null,
      "delta": {}
  }
}
```

#### Response

```JSON
[
    ["@/dataSets/{DATASET_ID}"]
]
```

`{DATASET_ID}`: The ID of the dataset that was created. This can be used in the future to make a request to Catalog to identify the DatasetView ID associated with this dataset.
