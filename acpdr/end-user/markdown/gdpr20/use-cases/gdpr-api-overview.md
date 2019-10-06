# Adobe Experience Platform GDPR Service Overview

## Introduction

Adobe Experience Platform GDPR Service provides a simple set of calls, enabling Adobe Customers to manage (access and delete) the personal data of their consumers (Data Subjects) across Adobe Experience Cloud solutions. In addition to APIs for accessing and deleting data, Platform GDPR Service also provides a central audit and logging mechanism to surface job status and results from across the various solutions.

This document provides an overview of how to integrate with and consume Platform GDPR Service.

## Platform GDPR Service

Across Adobe Experience Cloud there are many products that support your digital marketing needs. Each solution handles data and user identities in unique ways, according to their business goals. However, they also must support to the overall Experience Cloud goals for security and compliance. Platform GDPR Service has been developed to do exactly this: coordinate privacy and compliance requests across various solutions in Experience Cloud, beginning with GDPR access and deletion requests.

All Platform GDPR Service requests are REST-based with JSON used as the payload for requests and responses. Documentation on each of the supported APIs can be found at [Platform GDPR Service Specification](https://www.adobe.io/apis/cloudplatform/gdpr/api-reference.html)

## Submitting your first GDPR request (POST)

Below are the required steps for creating your first call into Platform GDPR Service:

1. Gather your data: from a customer request, from the Adobe Privacy JS library, or from your own internal tools, assemble information about the data subject and provide context for the request ([data format](#gdprapipostrequestformat))
2. Create your Adobe IO integration to obtain authorization and service access for your organization ([integration](#creatingyourapiintegration))
3. Populate your HTTP headers for full authentication and routing through the Adobe IO Gateway and into Platform GDPR Service ([headers and authorization](#gdprheadersandauthorization))
4. Submit your request using all the data gathered above

## Platform GDPR Service POST request format

Platform GDPR Service communicates, as mentioned previously, using JSON data for both request and response payloads. As part of a POST request, you, as the data controller, need to collect information about the data subjects who are requesting to access their data or have it be deleted. Adobe has provided a few tools to assist in this complex effort, including the Adobe Privacy JS library to collect IDs for individual site visitors (cookie information, etc.) (see), as well as data labeling inside solutions such as Adobe Campaign and Adobe Analytics.

An example of this data is shown in listing 1 below.

```json
{
    "companyContexts": [
        {
            "namespace": "imsOrgID",
            "value": "123456789@AdobeOrg"
        },
        {
            "namespace": "Campaign",
            "value": "acme-stg-us1"
        }
    ],
    "users": [
        {
            "key": "DavidSmith",
            "action": ["access"],
            "userIDs": [
                {
                    "namespace": "email",
                    "value": "dsmith@acme.com",
                    "type": "standard"
                },
                {
                    "namespace": "ECID",
                    "type":"standard",
                    "value":"443636576799758681021090721276",
                    "isDeletedClientSide":false
                }
            ]
        },
        {
            "key": "user12345",
            "action": ["access","delete"],
            "userIDs": [
                {
                    "namespace": "email",
                    "value": "ajones@acme.com",
                    "type": "standard"
                },
                {
                    "namespace": "loyaltyAccount",
                    "value": "12AD45FE30R29",
                    "type": "integrationCode"
                }
            ]
        }
    ],
    "include":["Analytics","AudienceManager"],
    "expandIds":false,
    "priority":"normal",
    "analyticsDeleteMethod":"anonymize"
}
```
**Listing 1:** Adobe Platform GDPR Service POST request payload

Let's investigate the information contained in this payload
### Company Context

The “companyContexts” section of the JSON payload is a qualifier for your organization within Experience Cloud solutions. Repeated here:
```json
"companyContexts": [
    {
           "namespace": "imsOrgID",
           "value": "806543F451CC5FE60A490D34@AdobeOrg"
    }, 
    {
           "namespace": "AdCloud",
           "value": "My Advertiser ID"
    }
```
You can see that the company section is actually an array of contexts. There are two types of contexts supported:
* IMS organization ID (or Experience Cloud organization ID)
    * This is the organization ID that links your other solutions together in the Experience Cloud
* Product-specific company qualifier
    * These identifiers are used for solutions that may not be linked to an organization
    * Often considered “legacy”, they are the account names, such as login company, client code, partner, tenant ID or other similar solution identifiers

Platform GDPR Service interacts with the IMS organization ID to validate permissions of the user submitting the request. It then forwards this information on to the Experience Cloud solutions to process.

### Users

The “users” section of the JSON payload is a collection of users (one or many) being submitted by an Experience Cloud customer for GDPR request processing. It may contain more than one set of user IDs per user in the collection. Let’s examine it more closely. Here is a single user section from the example above:
```json
"users": [
    {
       "key": "user12345",
       "action": ["access", "delete"],
       "userIDs": [
           {
               "namespace": "email",
               "value": "ajones@acme.com",
               "type": "standard",
               "isDeletedClientSide": false
           }, 
           {
               "namespace": "loyaltyAccount",
               "value": "12AD45FE30R29",
               "type": "custom"
           }
       ]
           "include":["profile"]
   }
]
```
Some notes about the format:
* The **key** is a user identifier to wrap the various namespace entries and is used to qualify the separate job IDs in the response data, largely used by the data controller for reference and grouping and may be any string value.
* The **action** field is a collection of desired actions, one or both of ["access" | "delete"] depending on the user’s request, and may be different for each user in the submission.
* The combination of **key** and **action** dictate how many "jobs" are created in the service to track. A user key with a single action creates a single job, but a user with both an `access` and `delete` request generates two separate jobs against that user key. Multiple keys in a file (indicating multiple user ID collections) generates multiple jobs as well.
* As mentioned above, users may have 1 or many JSON sub-documents including namespace, value and type that represent their identity in the Experience Cloud
* The namespace and type fields are detailed in the table [Namespace Qualifiers](#namespacequalifiers) below
* The number of userIDs under each user while creating jobs for users is limited to 9. For example, the API supports accepting up to 9 userIDs under each user

One key not detailed in the example above:
* The key **isDeletedClientSide** is a Boolean (true/false) value that is handed in from the Adobe Privacy JS library, indicating the client-side cookie has been deleted. This flag resides at the userID level, as part of the `namespace`, `value` and `type` triumvirate, and should not be added to the request manually as it indicates additional processing work is not needed by some solutions


### <a id="include"></a>Include

*Note:* The former exclude key is no longer supported.

The include key supports an array of product strings to include in your processing. If you only support or integrate with Audience Manager, you could include only AudienceManager in your request, which has the effect of excluding all the other products. If no products are included, the request will be rejected by the API.

```json

"include":["Analytics","AudienceManager"],

```

See [Product Values](#product-values) for information about the values you can use in the include statement.

If the product you specify as part of an include does not match the list of product values, you will receive an error message and the request will fail.

### Additional flags and options

The following flags might be specified at the root level (equivalent to the *users* or *companyContexts* keys) and applied for the complete set of user data included.

* The **expandIds** key is an optional parameter and supports a boolean value of true|false. optional field that represents an optimization for processing the IDs in the solutions (currently only used by Analytics). If omitted, Analytics' default behavior is *false*
* The **priority** key is an optional parameter (*normal*|*low*) for optimizing requests based on customer need. This key is inactive at the moment. 
* The **analyticsDeleteMethod** is an optional parameter (*purge*|*anonymize*) for specifying how Analytics should handle the customer data. By default (if omitted), all data referenced by the given collection of user IDs is anonymized, thus maintaining data integrity for historical reporting and other functions. Purge removes the data completely.

## Creating your API Integration

Now that you have your data collection for submission, it's time to create your API integration. Any Experience Cloud API, such as Platform GDPR Service, that accesses a service or content on behalf of an end user, authenticates using the OAuth and JSON Web Token (JWT) standards.

An Experience Cloud API client integration must be registered through the [Adobe I/O Console](https://console.adobe.io/). The I/O Console is where you can generate an API Key, an important requirement to obtaining client credentials.

If your integration needs to access content or an API on behalf of an end user, that user must be authenticated as well. Your integration needs to pass an OAuth token granted by the Adobe [Identity Management System (IMS)](../gdpr-terminology.md#identitymanagementservicesims).

For service-to-service integrations, you also need a JSON Web Token (JWT) that encapsulates your client credentials and authenticates the identity of your integration. You exchange the JWT for the OAuth token that authorizes access. See [Adobe I/O Authentication Overview](http://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html) for detailed instructions.

## GDPR Headers and Authorization

Once the integration is setup properly, you have everything you need to make a request to Platform GDPR Service. In order to populate the full header authorization keys, continue to use the instructions referenced above to exchange your JWT token for a valid technical account bearer token. Using that token and the account information from your integration, you are ready to populate the HTTP header. 

The following table outlines what is required for a POST request in Platform GDPR Service:

| Key | Value | Description |
|-----|-------|-------------|
|Content-Type | application/json | The only type of content accepted through the API. The body of the request is well-formatted JSON |
| Authorization | Bearer <token> | A user access token from an authenticated organizational (system) admin – can be accessed with Adobe IO Console integrations through JWT exchange |
| x-gw-ims-org-id | Experience Cloud organization ID | This ID is used to authenticate and validate your access token through the Adobe IO gateway and should match the organization in the JSON payload |
| x-api-key | [string value] | A defined key to authorize your request, created by you through Adobe IO Console integration
| ticketId | Internal tracking ID | Optional - This ID allows you to link the jobs in this request to any internal tracking ID you may have in your systems |


## Submitting a Adobe Experience Platform GDPR Service request

Platform GDPR Service supports three basic REST-type operations, HTTP verbs that indicate what type of action to be taken. The abbreviated table below shows these operations and additional detailed information for each API can be found here [docs](http://www.adobe.io). All requests are submitted to the following base URL:
```
https://platform.adobe.io/data/privacy/gdpr/
```

| API Name (Method Type)| Path | Description |
| -------- | ---- | ----------- |
| Access/Delete (POST) | {baseURL} | Create one or many ACCESS/DELETE requests to retrieve or delete all data corresponding to the provided user id's |
| Status (GET) | {baseURL}/{jobId} | Retrieve the status of a job |
| Status (all) (GET) | {baseURL} | Retrieve all job statuses for the requesting user |

To begin, take your header information and make a request to the simple Status (ALL) GET request. As described above, this should return all jobs submitted by the user referred to by the access token. If this is your first time calling the APIs with your integration, you should see an empty response similar to Listing 2 below:

```json
{
    "jobs": [],
    "totalRecords": 0
}
```
**Listing 2:** An empty status check for all jobs

### Submitting an ACCESS or DELETE request

Now that you've gotten your feet wet, it's time to dive in. Take the JSON document you assembled from your customer's data and add it to a POST request in the POST body. Validate your user actions (`access` and/or `delete`), and make sure you populate your header correctly with the information from your integration. You are now ready to submit to Platform GDPR Service.

Listing 3 shows the JSON payload returned from a successful `access` request.

```json
{
    "jobs": [
        {
            "jobId": "6fc09b53-c24f-4a6c-9ca2-c6076b0842b6",
            "customer": {
                "user": {
                    "key": "DavidSmith",
                    "action": [
                        "access"
                    ]
                }
            }
        }
    ],
    "requestStatus": 1,
    "totalRecords": 1
}
```
**Listing 3:** Payload for a *success* response from a Platform GDPR Service `access` request

Note the `jobId` value in the response shown in Listing 3. This value is used for subsequent API requests to retrieve the status of the `access` request represented by the `jobId` value. The `jobId` is linked to the `key` specified in your request that groups this user's IDs together in a single job.

### Submitting a status check for a single job

Once a job ID is obtained, it can be used to retrieve details about the job started from a previous `access` or `delete` request. A `status` request containing a `jobId` value is shown in Listing 5.

Listing 4 illustrates how the GDPR `status` API request uses the same URI as an `access` or `delete` request with one exception - the ID of a specific job is appended to the URI. If the job ID is not specified, details about all jobs for the authenticated integration is returned.

Listing 4 shows a typical example of a response payload from a `status` request that specified a job ID.

```
{
    "jobs": [
        {
            "jobId": "6fc09b53-c24f-4a6c-9ca2-c6076b0842b6",
            "requestId": "979",
            "ticketNumber": "TechAcctTest 1",
            "customer": {
                "user": {
                    "key": "DavidSmith",
                    "action": [
                        "access"
                    ],
                    "userIDs": [
                        {
                            "namespace": "email",
                            "value": "dsmith@acme.com",
                            "type": "standard",
                            "namespaceId": 6,
                            "isDeletedClientSide": false
                        }
                    ]
                },
                "companyContexts": [
                    {
                        "namespace": "imsOrgID",
                        "value": "944DE8A35536CFxxxxxxxxx@AdobeOrg"
                    }
                ]
            },
            "emailId": "submitter@email.com",
            "productResponses": [
                {
                    "product": "Analytics",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": "No Message Received from Solutions"
                    }
                },
                {
                    "product": "Audience Manager",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": "No Message Received from Solutions"
                    }
                },
                {
                    "product": "AdCloud",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": "No Message Received from Solutions"
                    }
                },
                {
                    "product": "Target",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": "No Message Received from Solutions"
                    }
                },
                {
                    "product": "CRS",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": "No Message Received from Solutions"
                    }
                },
                {
                    "product": "DPSC",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": "No Message Received from Solutions"
                    }
                },
                {
                    "product": "campaign-xxxxxxxxx-stg",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": "No Message Received from Solutions"
                    }
                }
            ],
            "lastUpdatedBy": "GDPRCentralService",
            "timeRequested": "05/14/2018 8:39 PM",
            "submittedBy": "02b38adf-6573-401e-b4cc-xxxxxxxxx@techacct.adobe.com",
            "gdprStatusResponse": {
                "statusCode": 2,
                "statusMessage": "processing"
            }
        }
    ],
    "totalRecords": 1
}
```

**Listing 4:** Response payload from a `status` request with a job ID

As shown above, the response gives additional detail about each solution that is currently performing work on behalf of this job. The following table lists the corresponding status codes and their meaning:

| Status Code | Status Message | Comments |
| ----------- | -------------- | -------- |
| 1 | Complete | Job is complete and (if required) files are uploaded from every solution |
| 2 | Processing | Acknowledgement is received from the solution(s) |
| 3 | Submitted | Job is submitted to every applicable solution |
| 4 | Error | Something failed in the processing of the job - more specific information may be obtained by getting individual job details |
| 5 | Expired | Final response is not received from the solution(s) before the specified time |

A job might remain in a processing state if a dependent child job is still in process.

```
{
    "jobs": [
        {
            "jobId": "d685625c-1292-4f8c-8890-9925c23c43e0",
            "requestId": "1",
            "lastUpdatedOn": "09/04/2018 2:18 PM",
            "productResponses": [
                {
                    "product": "Analytics",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": null
                    },
                    "processedDate": "09/04/2018 2:18 PM"
                },
                {
                    "product": "Audience Manager",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": null
                    },
                    "processedDate": "09/04/2018 2:18 PM"
                },
                {
                    "product": "Profile Service",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": null
                    },
                    "processedDate": "09/04/2018 2:18 PM"
                },
                {
                    "product": "Target",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": null
                    },
                    "processedDate": "09/04/2018 2:18 PM"
                },
                {
                    "product": "CRS",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": null
                    },
                    "processedDate": "09/04/2018 2:18 PM"
                },
                {
                    "product": "DPSC",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 3,
                        "statusMessage": "submitted",
                        "solutionMessage": null
                    },
                    "processedDate": "09/04/2018 2:18 PM"
                }
            ],
            "lastUpdatedBy": "GDPRCentralService",
            "timeRequested": "09/04/2018 2:18 PM",
            "submittedBy": "acp_privacy_gdpr@adobe.com",
            "gdprStatusResponse": {
                "statusCode": 2,
                "statusMessage": "processing",
                "solutionMessage": null
            },
            "statusCode": 2,
            "childJobs": [
                {
                    "jobId": "415cbe6f-d258-472d-a350-b78d2d6916b3",
                    "requestId": "1",
                    "lastUpdatedOn": "09/05/2018 2:55 PM",
                    "productResponses": [
                        {
                            "product": "Analytics",
                            "retryCount": 0,
                            "productStatusResponse": {
                                "statusCode": 3,
                                "statusMessage": "submitted",
                                "solutionMessage": null
                            },
                            "processedDate": "09/05/2018 2:55 PM"
                        }
                    ],
                    "lastUpdatedBy": "GDPRCentralService",
                    "timeRequested": "09/05/2018 2:55 PM",
                    "submittedBy": "acp_privacy_gdpr@adobe.com",
                    "gdprStatusResponse": {
                        "statusCode": 2,
                        "statusMessage": "processing",
                        "solutionMessage": null
                    },
                    "statusCode": 2
                },
                {
                    "jobId": "d54e24f5-fc95-4f7c-ab80-eddae3e1a5b7",
                    "requestId": "1",
                    "lastUpdatedOn": "09/04/2018 3:32 PM",
                    "productResponses": [
                        {
                            "product": "Analytics",
                            "retryCount": 0,
                            "productStatusResponse": {
                                "statusCode": 3,
                                "statusMessage": "submitted",
                                "solutionMessage": null
                            },
                            "processedDate": "09/04/2018 3:32 PM"
                        }
                    ],
                    "lastUpdatedBy": "GDPRCentralService",
                    "timeRequested": "09/04/2018 3:32 PM",
                    "submittedBy": "acp_privacy_gdpr@adobe.com",
                    "gdprStatusResponse": {
                        "statusCode": 2,
                        "statusMessage": "processing",
                        "solutionMessage": null
                    },
                    "statusCode": 2
                }
            ]
        }
    ],
    "totalRecords": 1
}
```
**Listing 5:** Response to Get Job `status` with child

### GET All API with Pagination

You can use pagination when requesting results with the GET All API.

HTTP Method: GET

The default request looks like this:

`https://platform.adobe.io/data/privacy/gdpr?data=true`

By default, `page=1` and `size=25`. The maximum allowed size is 100.

If the size parameter exceeds the maximum limit, you'll receive HTTP status code 400 with the following response:

```javascript
{
    "errors": {
        "errorType": "uri=/data/privacy/gdpr",
        "errorCode": 400,
        "title": "Invalid Request",
        "detail": "Page size exceeded,Maximum page size supported is 100"
    },
    "totalRecords": 0
}
```
**Listing 6:** Response to Get Job when size exceeds the max limit

**Sample request 1**
You can change the page and size parameters. For example, to make a request where `page=1` and `size=50`:

`https://platform.adobe.io/data/privacy/gdpr?data=true&page=1&size=50`

This results in the following response:

```javascript
{
  "jobs": [
     ...list of 50 job details
  ],
  "totalRecords": 75
}
```
**Listing 7:** A sample status check for all jobs

To fetch the next set of remaining 25 job details, you would request:

`https://platform.adobe.io/data/privacy/gdpr?data=true&page=2&size=50`

**Sample request 2**

`https://platform.adobe.io/data/privacy/gdpr?data=true&page=1&size=50`

This results in this response:

```javascript
{
  "jobs": [
     ...list of 50 job details
  ],
  "totalRecords": 175
}

```
**Listing 8:** A sample status check for all jobs

The above request returns jobs from 1 to 50.
 
To fetch next four pages, you would request:

`https://platform.adobe.io/data/privacy/gdpr?data=true&page=2&size=50`

The above request returns jobs from 51 to 100. To request jobs 101 to 150, make the following request:

`https://platform.adobe.io/data/privacy/gdpr?data=true&page=3&size=50`

To request jobs 151 to 175:

`https://platform.adobe.io/data/privacy/gdpr?data=true&page=4&size=50`

### Namespace Qualifiers

| Qualifier | Definition |
| --------- | ---------- |
| standard | One of the standard namespaces defined globally, not tied to an individual organization data set (e.g. email, phone number, etc.). Namespace ID is provided. |
| custom | A unique namespace created in the context of an organization, not shared across the Experience Cloud. The value represents the friendly name ("name" field) to be searched for. Namespace ID is provided. |
| integrationCode | Integration code - similar to "custom", but specifically defined as the integration code of a datasource to be searched for. Namespace ID is provided. |
| namespaceId | Indicates the value is the actual ID of the namespace that was created or mapped through the namespace service. |
| unregistered | A freeform string that is not defined in the namespace service and is taken "as is". Any solution that handles these kinds of namespaces checks against them and handle if appropriate for the company context and data set. No namespace ID is provided. |
| analytics | A custom namespace that is mapped internally in Analytics, not in the namespace service. This is passed in directly as specified by the original request, without a namespace ID |
| dpsc | A custom field type for DPS mappings, which support a set of three standard namespaces. |
| target | A custom namespace understood internally by Target, not in the namespace service. This is passed in directly as specified by the original request, without a namespace ID |

### Product Values

```javascript
product {
    "Analytics",
    "AudienceManager",
    "AdCloud",
    "aepDataLake",
    "CRS",
    "DPSC",
    "Campaign",
    "ProfileService",
    "Target"
}
```

### Batching and Concurrency
Adobe allows customers to group multiple GDPR user IDs to process as a single batch request. A batch request has an upper limit of 1000 IDs to process. In the event that customers submit more than 1000 IDs, Adobe returns an error rejecting the batch request. Customers can send multiple concurrent requests.

## Summary

 Adobe Experience Platform GDPR Service provides a simple set of calls, enabling Adobe Customers to manage (access and delete) the personal data of their consumers (Data Subjects) across Adobe Experience Cloud solutions. In addition to APIs for accessing and deleting data, Platform GDPR Service also provides a central audit and logging mechanism to surface job status and results from across the various solutions.