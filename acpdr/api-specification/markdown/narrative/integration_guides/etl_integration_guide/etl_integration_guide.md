# Data integration patterns for ETL tools (ISVs) 

Partners are key to the success of the Adobe Experience Platform, and the
[Adobe Exchange program](https://partners.adobe.com/exchangeprogram/experiencecloud.html) assists with varying levels of partner integration through multiple benefit packages, including Platform with the ETL Ecosystem. To support Adobe Exchange partners participating in the ETL Ecosystem program, Adobe and their partners can create premium ETL connectors to integrate with the Adobe Experience Platform.

In this guide, experts will direct you in creating high-performance, secure connectors for
Adobe/Partner integration, including implementation of Platform functions. Building secure connectors allows Adobe and partners to effectively implement both Adobe Experience Platform and Partner ETL capabilities.

# Developing ETL integrations for Adobe Experience Platform

This guide shows the general steps to ingest data into Adobe Experience Platform.

The ETL Connector for Adobe Experience Platform is located, installed, and operated entirely within the ETL Ecosystem. Platform provides data storage, administration, access, usage controls, and other domain-specific data services. Platform also exposes common REST-based APIs including:

-   Data Catalog API
-   Data Access API
-   Data Ingest API
-   Authentication and Authorization APIs.

**For ETL partners**. This guide includes sample Platform API calls for the ETL partner when designing a connector. A sample reference integration is available as Apache 2.0 license on [Github](https://github.com/adobe/acp-data-services-etl-reference)

<span id="_Toc497952512" class="anchor"><span id="Adobe-ETL.svg"
class="anchor"><span id="_ETL_Workflow_Examples"
class="anchor"></span></span></span>

# ETL Workflow

ETL products differ in exposing similar functionality to combine data sources. The following example walks you through a general ETL user experience.

**Note**: The following mock diagrams are based on common UI interaction patterns, but can be adapted for a specific ETL user experience.

<img src="media/image2.png"/>

Figure 1 - Generic ETL Connection Management UI

<img src="media/image3.png"/>

Figure 2 - New Connector UI, Configuring Adobe Experience Platform
Connector

<img src="media/image4.png"/>

Figure 3 - Adobe Experience Platform Connector activated

<img src="media/image5.png"/>

Figure 4 - ETL Transformation Management UI

<img src="media/image6.png"/>

Figure 5 - New Transformation UI, selecting Adobe Experience Platform
Connection

<img src="media/image7.png"/>

Figure 6 - Browsing for source Adobe Experience Platform Datasets

<img src="media/image8.png" />

Figure 7 – Metadata and sample data from the Dataset in the ETL UI

<img src="media/image7.png"/>

Figure 8 - Viewing field schema information from Datasets

<img src="media/image10.png" />

Figure 9 - Previewing data from Datasets

<img src="media/image11.png"/>

Figure 10 – Defining data sync parameters for the operation of the
transformation

<img src="media/image12.png" />

Figure 11 - Defining the XDM target Dataset

<img src="media/image13.png"  />

Figure 12 - Viewing the XDM hierarchical schemas and metadata to support
mapping/transformations

<img src="media/image12.png"  />

Figure 13 - Save and run/scheduling the Transforms

Steps in the subsequent technical sections will have “Figure” numbers annotated to refer to the flow showcased above the wireframes.

# Adobe Platform Components

## Adobe Experience Platform Components 
This section identifies components and their relevance as required for ETL partner integration.

-   **Data Discovery** - Records the metadata of ingested and transformed data in the platform.
-   **Data Access** - Provides users the interface to access their data on the platform.
-   **Data Ingestion** – Pushes data to Platform with Data Ingestion APIs.
-   **Adobe Identity Management System (IMS)** - Provides framework for authentication for Adobe wide services
-   **IMS Organization** - Any corporate entity that can own or license products and services and allow access to its members.
-   **IMS User** - Members of IMS Organization. Organization to User relationship is many to many.

Each of Platform services need an IMS organization to be passed with the request. The authentication token should have access to passed IMS organization. More details in Authenticating to Adobe Platform section.

# Authenticating to Adobe Platform

Adobe is committed to privacy and security. Nearly all Adobe services require your application to authenticate through the Adobe Identity Management System (IMS) to receive client credentials. The client credentials determine the access and permissions granted to your application.

Any API that accesses a service or content on behalf of an end-user authenticates using the OAuth and JSON Web Token standards.

-   Your application must be registered through the Adobe I/O Console. The I/O Console is where you can generate an API Key, an important requirement to obtain client credentials.
-   If your integration needs to access content or a service for an end user, that user must be authenticated as well. Your integration will need to pass the OAuth token granted by the Adobe IMS.
-   For service-to-service integrations, you will also need a JSON Web Token (JWT) that encapsulates your client credentials and authenticates the identity of your integration. You can exchange the JWT for the OAuth token that authorizes access. More documentation related to this can be found at: <https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html>.

Detailed information on the usage of the Adobe API Gateway (adobe.io) can be found at: <https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html>.

# Workflow diagram

The workflow diagram below provides the high-level overview of integration of Adobe Experience Platform components and the ETL application and connector:

<img src="media/etl.png" />



# Design Phase

1.  Partner logs in to Adobe Platform UI and creates datasets for ingestion using a standard connector or push-service connector.

2.  In the Platform user interface, the partner creates the output dataset by either selecting the Profile, Experience Event or other schemas in the XDM Registry.

3.  In the ETL tool, the partner will start designing their mapping transforms after configuring the appropriate connection (using their credentials). The ETL tool is assumed to already have the Platform connector installed via a process (and not defined in this Integration Guide).

4.  Using the source of data for mapping, a list of all available datasets can be fetched using **Data Discovery APIs** (Figure 6).

> **Note**: Partners will also have to specify a time stamp filter marking the date to ingest data and offset - what should be the window for which data is to be read. ETL tool should support taking these two parameters in this or another relevant UX. On the Adobe Experience Platform side these parameters will be mapped to either available dates (if present) or captured date present in batch object of dataset.

#### curl to fetch datasets
Datasets can be pulled using pagination APIs with the help of query parameters like 'start' and 'limit'. Please refer [Catalog Datasets API ](https://www.adobe.io/apis/cloudplatform/dataservices/api-reference.html#/default/get_data_sets) for detailed information.
```http
$ curl -X GET
"https://platform.adobe.io/data/foundation/catalog/dataSets" \
  -H "accept:application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "x-api-key: API_KEY"
```

##### Sample response
```json
{
    "598d6e81b2745f000015edcb": {
        "version": "1.0.0",
        "imsOrg": "AdobeIMSOrganization@AdobeOrg",
        "connectorId": "azure-blob",
        "name": "CredentialsTest",
        "created": 1502441089391,
        "updated": 1502441089669,
        "dule": {},
        "aspect": "production",
        "status": "enabled",
        "fields": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "age",
                "type": "string"
            }
        ],
        "fileDescription": {
            "persisted": false,
            "format": "parquet",
        },
        "transforms":"@/dataSets/598d6e81b2745f000015edcb/views/598d6e81b2745f000015edcc/transforms",
        "files": "@/dataSets/598d6e81b2745f000015edcb/views/598d6e81b2745f000015edcc/files",
        "children": "@/dataSetViews/598d6e81b2745f000015edcc/children",
        "schema": "@/xdms/context/profile",
        "viewId": "598d6e81b2745f000015edcc",
        "observableSchema": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "name": {
                    "type": "string",
                },
                "age": {
                    "type": "string",
                }
            }
        }
    }
}
```
Please note "fields" in the above Datasets response is in process of deprecation.

5.  The *Schema of a dataset* can be found at following places
##### i. schema
```json
{
    "598d6e81b2745f000015edcb": {
        "schema": "@/xdms/context/person",
    }
}
```
    
This property of a Dataset contains an API link pointing to an external definition in the schema registry. The registry schema represents the list of all **potential fields** that could be used and not the fields that are used (see observableSchema below). This is the schema you use when you need to present the user with a list of available fields that can be written to.

The schema value is a link to the /xdms route under the /catalog API. Retrieving the actual schema requires a second API request as follows:

```http
curl -X GET "https://platform.adobe.io/data/foundation/catalog/xdms/context/person?expansion=xdm" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "x-api-key: API_KEY"
``` 

Note - the "expansion=xdm" is an optional parameter that tells the API to fully expand and in-line any referenced schemas. You will likely always do this when presenting a list of all potential fields.
    
Sample /xdms response:
```JSON
{
    "$id": "https://ns.adobe.com/xdm/context/person"
    "title": "Person",
    "type": "object",
    "description": "An individual person. May represent a person acting in various roles, such as a customer, contact, or owner.",
    "properties": {
        "birthDay": {
            "title": "Birth day",
            "type": "integer",
            "description": "The day of the month a person was born (1-31).",
            "minimum": 1,
            "maximum": 31,
            "meta:xdmType": "byte",
            "meta:xdmField": "xdm:birthDay"
        },
        "birthMonth": {
            "title": "Birth month",
            "type": "integer",
            "description": "The month of the year a person was born (1-12).",
            "minimum": 1,
            "maximum": 12,
            "meta:xdmType": "byte",
            "meta:xdmField": "xdm:birthMonth"
        },
        "birthYear": {
            "title": "Birth year",
            "type": "integer",
            "description": "The year a person was born including the century (yyyy, e.g 1983).",
            "minimum": 1,
            "maximum": 32767,
            "meta:xdmType": "short",
            "meta:xdmField": "xdm:birthYear"
        },
        "gender": {
            "title": "Gender",
            "type": "string",
            "enum": [
                "male",
                "female",
                "not_specified",
                "non_specific"
            ],
            "meta:enum": {
                "male": "Male",
                "female": "Female",
                "not_specified": "Not Specified",
                "non_specific": "Nonspecific"
            },
            "description": "Gender identity of the person.\n",
            "default": "not_specified",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:gender"
        }
    }
}
```
Important - The JSON schema that is returned describes the structure and field level "type", "format", "minimum", "maximum" the represents data serialized as JSON. If using a serialization format other then JSON for ingestion, you should use data types that match the meta:xdmType as described in **Section 4** of the [XDM Registry Overview Guide](https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/xdm_registry_architectural_overview/xdm_registry_architectural_overview.md).

##### iii. observableSchema
```json
{
    "598d6e81b2745f000015edcb": {
        "observableSchema": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "name": {
                    "type": "string",
                },
                "age": {
                    "type": "string",
                }
            }
        }
    }
}
```

This property of a Dataset has a json structure (matching the XDM schema json) which contains the fields that where present in the incoming input files. When writing data to the platform, a user is not required to use every field from the target schema. Instead they should supply only those fields that are used. This is the schema you would use if reading the data or presenting a list of fields that are available to read/map from.

Note - The observedSchema is currently populated only when the schema attribute above is used. 

##### ii. fields (deprecated)
```json
{
    "598d6e81b2745f000015edcb": {
        "fields": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "age",
                "type": "string"
            }
        ],
    }
}
```

The fields property is deprecated and temporarily available for backwards compatibility. It should only be used if the schema property from above is NOT populated. If used, the fields property represents the schema for both reading and writing.   

Note - The JSON structure of the fields attribute is different from the standard JSON schema format used by the registry and the observedSchema values.

1.  The ETL application may provide a capability to *preview data* to the ETL Data Engineer. The **Data Access APIs** will be used to with the specified "limit" on the data (Figure 9). There are various API options to preview data:

- Get dataset details as done in step 5 above. Refer to the "files" attribute, it will appear as follows :

#### Preview data
```http
    "files":
"@/dataSets/59c93f3da7d0c00000798f68/views/59c93f3da7d0c00000798f69/files",
```
- **Data Discovery API** call to fetch the files details with the help of "files" attribute from the previous step.

#### Curl command to list Dataset files
```http
$ curl -X GET \
"https://platform.adobe.io/data/foundation/catalog/dataSets/59c93f3da7d0c00000798f68/views/59c93f3da7d0c00000798f69/files" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization: Bearer ACCESS_TOKEN \
  -H "x-api-key : API_KEY"
```

##### Sample response
```json
{
    "74627653-6b6f-40a8-ad57-6bd1badfb9c6": {
        "version": "1.0.0",
        "batchId": "b026a233c9ad4ccd88f661efa63d4955",
        "created": 1509962578830,
        "updated": 1509962578830,
        "imsOrg": "AdobeIMSOrganization@AdobeOrg",
        "dataSetViewId": "5a0024512db5b501c6c3cd95",
        "createdClient": "CLIENT_ID",
        "createdUser": "CLIENT_USER_ID@AdobeID",
        "updatedUser": "CLIENT_USER_ID@AdobeID",
        "availableDates": {}
    },
}
```
- The list of file ids will be used in **Data Access API** to fetch further file details. The file Key of JSON field will be used in this call: "28146732-2af7-41c6-9d4a-95fb3334216b" in this case.

#### Curl to Fetch file details
```http
$ curl -X GET "https://platform.adobe.io/data/foundation/export/files/28146732-2af7-41c6-9d4a-95fb3334216b" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization: Bearer ACCESS_TOKEN \
  -H "x-api-key : API_KEY"
```

##### Sample response
```json
[
    {
    "name": "webProfileSmall.csv",
    "length": 2576,
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/export/files/28146732-2af7-41c6-9d4a-95fb3334216b?path=webProfileSmall.csv"
            }
        }
    }
]
```

- "**href**" field from previous call will be used to fetch preview data from the **Data Access API**

```http
$ curl -X GET \
"https://platform.adobe.io/data/foundation/export/files/28146732-2af7-41c6-9d4a-95fb3334216b?path=webProfileSmall.csv" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "x-api-key : API_KEY"
```

##### Sample response

```
longitude,optin_email,optin_mobile,optin_address,username,created

1,Dan,Hutchinson,1971-08-14,female,dan12.hutchinson@hotmail.com,,85 Windsor Drive,CORVALLIS,OR,97331,USA,44.56,-123.27,true,false,false,dan.hutchinson,2017-03-31 02:16:22
2,Violat,Vaughan,1939-03-16,,violat.v901@yahoo.com,,,,,,,,,true,false,false,violat.vaughan,2017-03-31 19:47:00
3,Roberto,Savage,1996-08-15,female,roberto.savage82@yahoo.com,,,,,,,,,true,false,false,roberto.savage,2017-03-31 02:44:05
4,Orion,Weber,1990-04-17,male,orion.weber@planetone.tn,,192 Pine Street,STAPLETON,AL,36578,USA,30.74,-87.79,false,false,false,orion.weber,2017-03-31 06:51:54
5,Dorthary,Murphy,1950-03-27,female,dorthary0.murphy@outlook.com,122-742-4590,730 Hickory Lane,BROWNSTOWN,IN,47220,USA,38.88,-86.04,true,false,true,dorthary.murphy,2017-03-31 03:41:33
```

5.  The destination component as output of transformed data, the Data Engineer will choose an Output Dataset (Figure 12). The XDM schema is associated with the output Dataset. The data to be written will be identified by the file description part of dataset entity from the **Data Discovery APIs**. This information will be fetched with the dataSets call using datasetId. The "fileDescription" property in the JSON response will provide the required information.

#### File description from data set
```http
$ curl -X GET "https://platform.adobe.io/data/foundation/catalog/dataSets/<dataset id>" \
-H "accept: application/json" \
-H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
-H "Authorization: Bearer ACCESS\_TOKEN \
-H "x-api-key : API_KEY"
```

##### Sample response
```json
{
"59c93f3da7d0c00000798f68": {
    "version": "1.0.4",
    "fileDescription": {
        "persisted": false,
        "format": "parquet"
    }
}
```
6.  Data will be written to the platform using the **Data Ingestion APIs**.  Writing of data is an asynchronous process. When data is written to Adobe Experience Platform, a batch is created and marked as a success only after data is fully written.

Data in platform should be written in the form of parquet files.

# Execution phase

1.  As the execution starts, the Adobe Experience Platform connector as defined in the source component will read the data from the platform using the **Data Access APIs**. The transformation process will read the data for a certain time range. Internally, it will query batches of source datasets. While querying it will use a parameterized (rolling for time series data, or incremental data) start date and list dataset files for those batches. And start making requests for data for those dataset files.

#### Curl to Read data from platform
This will give you all batches between start time and end time, sorted by the order they were created.
```http
$ curl -X GET \
"https://platform.adobe.io/data/foundation/catalog/batches?    dataSet=DATASETID&createdAfter=START_TIMESTAMP&createdBefore=END_TIMESTAMP&sort=desc:created" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : API_KEY"
```

##### Sample response
```json
{
    "BATCHID1": {
        "imsOrg": "AdobeIMSOrganization@AdobeOrg",
        "created": 1519116010510,
        "createdClient": "xxxx",
        "createdUser": "xxxx",
        "updatedUser": "xxxx",
        "updated": 1519116010510,
        "status": "success",
        "version": "1.0.0",
        "availableDates": {},
        "relatedObjects": [
            {
                "type": "dataSet",
                "id": "DATASETID"
            }
        ]
    },
}
```
Now take out dataset files belonging to these batches using the below call:

#### Curl request to get files out of a batch
```http
curl -X GET https://platform.adobe.io/data/foundation/export/batches/BATCHID1/files \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : API_KEY"
```
##### Sample response
```json
{
    "data": [
        {
            "dataSetFileId": "DATASETFILEID1",
            "dataSetViewId": "DATASETVIEWID1",
            "version": "1.0.0",
            "created": "xxxx",
            "updated": "xxxx",
            "isValid": false,
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1"
                }
            }
        },
    {
            "dataSetFileId": "DATASETFILEID2",
            "dataSetViewId": "DATASETVIEWID1",
            "version": "1.0.0",
            "created": "xxxx",
            "updated": "xxxx",
            "isValid": false,
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/export/files/DATASETFILEID2"
                }
            }
        },
    ],
    "_page": {
        "limit": 100,
        "count": 1
    }
}
```
-   limit and count above helps in pagination on dataset files level.

Now we will iterate over individual file via _link > self > href

#### Curl to access file metadata
```http
curl -X GET https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1 \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : API_KEY"
```

##### Sample response
```json
{
    "data": [
        {
            "name": "filename1.csv",
            "length": "93",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1?path=filename1.csv"
                }
            }
        },
    ],
    "_page": {
        "limit": 100,
        "count": 1
    }
}
```
-   limit and count above helps in pagination on physical file level.

Now we will list content of file by using link under _links > self > href

#### Curl to access file content
```http
curl -X GET https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1?path=filename1.csv \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : API_KEY"
```

##### Sample Response
```
name,age,date,digit,gender,email,float,alpha
John Kumar,,,,male,johnk@email.com,,
Marry Gupta,,,,female,marryg@email.com,,

```

2.  Once the data is processed, the ETL tool will write the data back to platform using the **Data ingestion APIs**. Internally, it will first create a batch with Data Ingestion API and then start writing on that location

#### Create a batch
```http
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : API_KEY" \
  --data-binary '{"datasetId":"DATASETID"}'
```

##### Sample response
```json
{
    "BATCHID": {
        "id": "BATCHID",
        "status": "loading",
        "created": xxxx,
        "relatedObjects": [
            {
                "type": "dataSet",
                "id": "DATASETID"
            }
        ]
    }
}
```

#### Write to dataset
Multiple files can be posted in a batch until it is promoted.
```http
$ curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/BATCHID/datasets/DATASETID/files/filename.parquet" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id:AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key: API_KEY" \
  -H "content-type: application/octet-stream" \
  -F file=@filename.parquet
```

Data in platform should be written in the form of parquet files.

##### Sample response
```json
{
    "BATCHID": {
        "name": "filename.parquet",
        "sizeInBytes": 281
    }
}
```

3.  Once completed, it will mark the batch complete. Data will first land on the Adobe Experience Platform staging location and then will be moved to final location after cataloging and validation. Batches will be marked as successful once all the data is moved to permanent location.

#### Curl to mark batch upload complete
```http
$ curl -X POST "https://platform.adobe.io/data/foundation/import/batches/BATCHID?action=COMPLETE" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : API_KEY"
```

##### Sample response
```http
#Status 200 OK, with empty response
```

4.  The ETL tool will make sure to note the timestamp of source dataset(s) as the data is read.

5.  In next transformation execution (likely by schedule or event invocation), the ETL will start requesting the data from the previously-saved timestamp and all data going forward.

Before running new tasks the ETL tool, you must ensure that the last batch was successfully completed. The **Data Discovery API** provides a batch-specific option which provides the details of the relevant batches.

#### Curl to get Last batch status
```http
curl -X GET "https://platform.adobe.io/data/foundation/catalog/batches?limit=1&sort=desc:created" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : X-API-KEY"
```

##### Sample response
```json
"BATCHID": {
    "imsOrg": "AdobeIMSOrganization@AdobeOrg",
    "created": xxxx,
    "createdClient": "CLIENT_ID",
    "createdUser": "CLIENT_USER_ID@AdobeID",
    "updatedUser": "CLIENT_USER_ID@AdobeID",
    "updated": xxxx,
    "status": "success",
    "errors": [],
    "version": "1.0.1",
    "availableDates": {}
}
```

New tasks can be schedule if the previous batch (2 above) was success. Individual batch status can be retrieved from **Data Discovery API**. The **BATCHID** used is the same that was returned while creation of batch (2 above).

#### Curl to get Last batch status by Id
```http
curl -X GET "https://platform.adobe.io/data/foundation/catalog/batches/BATCHID" \
  -H "accept: application/json" \
  -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
  -H "Authorization:Bearer ACCESS_TOKEN" \
  -H "x-api-key : X-API-KEY"
```

##### Sample response For Success
```json
"BATCHID": {
    "imsOrg": "AdobeIMSOrganization@AdobeOrg",
    "created": xxxx,
    "createdClient": "CLIENT_ID",
    "createdUser": "CLIENT_USER_ID@AdobeID",
    "updatedUser": "CLIENT_USER_ID@AdobeID",
    "updated": xxxx,
    "status": "success",
    "errors": [],
    "version": "1.0.1",
    "availableDates": {}
}
``` 

In case of failure the **errors** can be extracted from the response and surfaced on the ETL
tool as error message.
    
##### Sample response For Failure
```json
"BATCHID": {
    "imsOrg": "AdobeIMSOrganization@AdobeOrg",
    "created": xxxx,
    "createdClient": "CLIENT_ID",
    "createdUser": "CLIENT_USER_ID@AdobeID",
    "updatedUser": "CLIENT_USER_ID@AdobeID",
    "updated": xxxx,
    "status": "failure",
    "errors": [
        {
            "code": "200",
            "description": "Error in validating schema for file: 'adl://dataLake.azuredatalakestore.net/connectors-dev/stage/BATCHID/dataSetId/contact.csv' with errorMessage=adl://dataLake.azuredatalakestore.net/connectors-dev/stage/BATCHID/dataSetId/contact.csv is not a Parquet file. expected magic number at tail [80, 65, 82, 49] but found [57, 98, 55, 10] and errorType=java.lang.RuntimeException",
            "rows": []
        }
    ],
    "version": "1.0.1",
    "availableDates": {}
}
```    



# Incremental vs Snapshot Data, and Events vs Profiles

Data can be represented in a two by two metrics like below:

| Incremental Events            | Incremental Profiles |
|-------------------------------|----------------------|
| Snapshot Events (less likely) | Snapshot Profiles    |

Event data is typically when there are indexed time stamps columns in each row.

Profile data is typically when there is not a time stamps in data and each row can be identified by primary/composite key.

Incremental data is where only new/updated data comes into the system and appends to current data in the Datasets.

Snapshot data is when all data comes into the system and replaces some or all previous data in a Dataset.

In the case of incremental events, the ETL tool should use the available dates/create date of batch entity. In case of push service, available dates will not be present, so tool will use batch created/updated date for marking increments. Every batch of incremental events is required to be processed.

For incremental profiles, ETL tool will use created/updated dates of batch entity. Commonly every batch of incremental profile data is required to be processed.

Snapshot events are very less likely due to sheer size of the data. But if this were to be required, the ETL tool must pick only the last batch for processing.

When snapshot profiles are used, the ETL tool will have to pick the last batch of the data that arrived in the system. But if requirement is to keep track of the versions of changes, then all batches will be required to be processed. De-duplication processing within the ETL process will help in controlling storage costs.

# Batch Replay and Data Reprocessing

This will be required in cases where a client discovers that for the past n days, data being ETL processed has not occurred as expected or source data itself may not have been correct. To do so, the clients data administrators use the Adobe Experience Platform UI and remove the batches of corrupt data. Likely then the ETL needs to be re-run, thus repopulating the corrected data. If source itself had corrupt data, the Data Engineer/Administrator will need to correct the source batches and re-ingest the data (either into the Adobe Experience Platform, or via ETL connectors).

Based upon the type of data being generated, it will be Data Engineers choice to remove single batch or all batches from certain Datasets. Data will be removed/archived as per platform guidelines TBD.

It is likely an ecosystem scenario the ETL functionality to **Data Purge** may be important.

Once purging is complete, the client Admins will have to reconfigure Adobe Experience Platform to restart processing for core services from the time from which the batches are deleted.

```json
{
    "id": "core/Person.schema.json",
    "$schema": "https://.../json-schema/schemas/schema.json",
    "label": {
        "en_us": "Person"
    },
    "version": "1.0",
    "type": "object",
    "description": "An individual actor, contact, or owner.",
    "properties": {
        "firstName": {
            "label": {
                "en_us": "First name"
            },
            "type": "string",
            "description": "The personal, or given name."
        },
    }
}
```
# Concurrent Batch Processing

Data Admins/Engineers at the clients discretion may decide to ETL data in sequential manner or concurrent manner depending of the characteristics of a particular Dataset. This will also be based upon use cases the client is targeting with the transformed data.

For example if the client is persisting to updatable persistence store and the sequence of order of events is important, the client may need to strictly sequentially process jobs with the ETL transformations.

In other cases, out of order data can be processed by downstream applications/processes that internally sort first on some time stamp, in those cases, parallelization of the transform by the ETL process can be viable to improve processing times.

For source batches, it will again be dependent upon client preferences and consumer constraints. If the source data can be picked up in parallel without regard to the regency/ordering of a row, then the transformation process can create process batches with a higher degree of parallelism (optimization based of out of order processing). But if the transform has to honor time stamps or change precedence ordering, the Data Access API or ETL tool scheduler/invocation will have to ensure that out of order batches are not processed out of order where possible.

# Deferral

Deferral is a process in which input data after enrichment is not complete enough to be sent out to downstream process currently, but maybe in future. Client tolerances for data windowing for future matching vs cost of processing will inform individual clients decision making to put aside the data and reprocess it in the next transformation execution hoping it can be enriched and reconciled/stitched at some future time  inside the retention window. This cycle will keep on going until the row is processed sufficiently or it is deemed too stale to continue investing in. Every iteration will generate deferred data which is superset of all deferred data in previous iterations.

Adobe Experience Platform does not identify deferred data currently, so client implementations must rely on the ETL and Dataset manual configurations to create another dataset in platform mirroring the source dataset which can be used to keep deferred data. In this case deferred data will be similar to snapshot data. In every execution of the ETL transform, the source data will be union with deferred data and sent for processing.


# Contact and Legal Information

Check here for information to help contact Adobe to understand the legal issues concerning your use of this product and documentation. See the Code Licensing section for details about third-party licenses.

**Account Support**

The Adobe support team is here to:
-   Answer specific product questions
-   Ensure that you can use the product to its maximum capacity
-   Help resolve any technical difficulties you might have

**Service and Billing Information**

Depending on your service level, some options described in this document might not be available to you. Because each account is unique, refer to your contract for pricing, due dates, terms, and conditions. If you would like to add to or otherwise change your service level, or if you have questions regarding your current service, please contact your Account Support Manager.

**Feedback**

We welcome any suggestions or feedback. Please send comments about the product to your Account Support Manager.
