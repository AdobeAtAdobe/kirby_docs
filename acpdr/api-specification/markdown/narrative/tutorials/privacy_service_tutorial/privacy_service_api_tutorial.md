# Privacy Service API tutorial

Adobe Experience Platform Privacy Service provides a RESTful API and user interface that allow you to manage (access and delete) the personal data of your customers (data subjects) across Adobe Experience Cloud applications. Privacy Service also provides a central audit and logging mechanism that allows you to access the status and results of jobs involving Experience Cloud applications.

This tutorial covers how to use the Privacy Service API. For details on how to use the UI, see the [Privacy Service UI tutorial](privacy_service_ui_tutorial.md). For a comprehensive list of all available endpoints in the Privacy Service API, please see the [API reference](../../../../../../acpdr/swagger-specs/privacy-service.yaml).

Steps for performing the following tasks are covered in this tutorial:

* [Create a job request](#create-a-job-request)
* [Check the status of a job](#check-the-status-of-a-job)
* [View all job requests](#view-all-job-requests) within your organization

The [appendix section](#appendix) provides additional information for working with the Privacy Service API, including:

* Accepted [namespace qualifiers](#namespace-qualifiers) for providing IDs
* [Product values](#product-values) for compatible Experience Cloud applications

## Getting started

This tutorial requires a working understanding the following Experience Platform features:

* [Privacy Service](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview): Provides a RESTful API and user interface that allow you to manage access and delete requests from your customers (data subjects) across Adobe Experience Cloud applications.

The following sections provide additional information that you will need to know in order to successfully make calls to the Privacy Service API.

### Reading sample API calls

This tutorial provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../../technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

## Create a job request

The first step in creating a new job request is to gather your customer data. As the data controller, you need to collect information about the data subjects whose data you want to access, delete, or opt out of sale. Once you have the required data, it must be provided in the payload of a POST request to the root endpoint (`/`) of the [Privacy Service API](../../../../../acpdr/swagger-specs/privacy-service.yaml).

The Privacy Service API supports two kinds of job requests for private customer data:

* [Access and/or delete](#create-an-access/delete-job): Access (read) or delete private customer data.
* [Opt out of sale](#create-an-opt-out-of-sale-job): Mark private customer data as not to be sold.

> **Important:** While access and delete requests can be combined as a single API call, opt-out requests must be made separately.

### Create an access/delete job

This section demonstrates how to make an access/delete job request using the API.

#### API format

```http
POST /
```

#### Request

The following request creates a new job request, configured by the attributes supplied in the payload as described below.

```shell
curl -X POST \
  https://platform.adobe.io/data/core/privacy/jobs \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
    "companyContexts": [
      {
        "namespace": "imsOrgID",
        "value": "{IMS_ORG}"
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
            "type": "standard",
            "value":  "443636576799758681021090721276",
            "isDeletedClientSide": false
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
    "include": ["Analytics", "AudienceManager"],
    "expandIds": false,
    "priority": "normal",
    "analyticsDeleteMethod": "anonymize",
    "regulation": "ccpa"
}'
```

* `companyContexts`: An array containing authentication information for your organization.
    * The following identifiers are accepted:
        * `imsOrgId`: **(Required)** The ID of your IMS Organization.
        * A product-specific company qualifier (for example, `Campaign`), which identifies an integration with an Adobe application belonging to your organization. Potential values include account names, client codes, tenant IDs, or other application identifiers.
    * Each listed identifier includes the following attributes:
        * `namespace`: The namespace of an identifier.
        * `value`: The value of the identifier.
* `users`: An array containing a collection of at least one user whose information you would like to access or delete. A maximum of 1000 user IDs can be provided in a single request. Each user object contains the following information:
    * `key`: An identifier that is used to qualify the separate job IDs in the response data. It is best practice to choose a unique, easily identifiable string for this value so it can easily be referenced or looked up later.
    * `action`: An array that lists desired actions to take on the data. Depending on the actions you want to take, this array must include `access`, `delete`, or both. 
        * When combining `access` and `delete` requests, the service creates separate job IDs for the associated `key`; one for each action.
    * `userIDs`: A collection of identifiers for a particular user. The number of identities a single user can have is limited to 9. Each identifier contains the following three values:
        * `namespace`: The namespace of the ID. For example, `email`.
        * `value`: The value of the identifier. For example, `1234@example.com`.
        * `type`: The qualifier for the ID namespace being used. A list of [accepted namespace qualifiers](#namespace-qualifiers) is provided later in this tutorial.
* `include`: An array of Adobe products to include in your processing. If this value is missing or otherwise empty, the request will be rejected. Only include products that your organization has an integration with. A list of [accepted product values](#product-values) is provided later in this tutorial.
* `expandIDs`: *(Optional)*: When set to `true`, this value represents an optimization for processing the IDs in the applications (currently only supported by Analytics). If omitted, this value defaults to `false`.
* `priority`: *(Optional)*: Sets the priority for processing requests based on customer need. Accepted values are `normal` and `low`.
* `analyticsDeleteMethod`: *(Optional)*: Specifies how Analytics should handle the customer data. Two possible values are accepted for this attribute:
    * `anonymize`: All data referenced by the given collection of user IDs is made anonymous. If `analyticsDeleteMethod` is omitted, this is the default behavior.
    * `purge`: All data is removed completely.
* `regulation`: **(Required)** The regulation for the request (must be either "gdpr" or "ccpa").

#### Response

A successful response returns the details of the newly created jobs.

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
        },
        {
            "jobId": "6fc09b53-c24f-4a6c-9ca2-c6076be029f3",
            "customer": {
                "user": {
                    "key": "user12345",
                    "action": [
                        "access"
                    ]
                }
            }
        },
        {
            "jobId": "6fc09b53-c24f-4a6c-9ca2-c6076bd023j1",
            "customer": {
                "user": {
                    "key": "user12345",
                    "action": [
                        "delete"
                    ]
                }
            }
        }
    ],
    "requestStatus": 1,
    "totalRecords": 3
}
```

* `jobId`: A read-only, unique system-generated ID for a job. This value is used to lookup a specific job in the next step.

Once you have successfully submitted the job request, you can proceed to the next step of [checking the job's status](#check-the-status-of-a-job).

### Create an opt-out-of-sale job

This section demonstrates how to make an opt-out-of-sale job request using the API.

#### API format

```http
POST /
```

#### Request

The following request creates a new job request, configured by the attributes supplied in the payload as described below.

```shell
curl -X POST \
  https://platform.adobe.io/data/privacy/gdpr/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
    "companyContexts": [
      {
        "namespace": "imsOrgID",
        "value": "{IMS_ORG}"
      }
    ],
    "users": [
      {
        "key": "DavidSmith",
        "action": ["opt-out-of-sale"],
        "userIDs": [
          {
            "namespace": "email",
            "value": "dsmith@acme.com",
            "type": "standard"
          },
          {
            "namespace": "ECID",
            "type": "standard",
            "value":  "443636576799758681021090721276",
            "isDeletedClientSide": false
          }
        ]
      },
      {
        "key": "user12345",
        "action": ["opt-out-of-sale"],
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
    "include": ["Analytics", "AudienceManager"],
    "expandIds": false,
    "priority": "normal",
    "analyticsDeleteMethod": "anonymize",
    "regulation": "ccpa"
}'
```

* `companyContexts`: An array containing authentication information for your organization.
    * The following identifiers are accepted:
        * `imsOrgId`: **(Required)** The ID of your IMS Organization.
        * A product-specific company qualifier (for example, `Campaign`), which identifies an integration with an Adobe application belonging to your organization. Potential values include account names, client codes, tenant IDs, or other application identifiers.
    * Each listed identifier includes the following attributes:
        * `namespace`: The namespace of an identifier.
        * `value`: The value of the identifier.
* `users`: An array containing a collection of at least one user whose information you would like to access or delete. A maximum of 1000 user IDs can be provided in a single request. Each user object contains the following information:
    * `key`: An identifier that is used to qualify the separate job IDs in the response data. It is best practice to choose a unique, easily identifiable string for this value so it can easily be referenced or looked up later.
    * `action`: An array that lists desired actions to take on the data. Since this is an opt out of sale request, the array must only contain "opt-out-of-sale".
    * `userIDs`: A collection of identifiers for a particular user. The number of identities a single user can have is limited to 9. Each identifier contains the following three values:
        * `namespace`: The namespace of the ID. For example, `email`.
        * `value`: The value of the identifier. For example, `1234@example.com`.
        * `type`: The qualifier for the ID namespace being used. A list of [accepted namespace qualifiers](#namespace-qualifiers) is provided later in this tutorial.
* `include`: An array of Adobe products to include in your processing. If this value is missing or otherwise empty, the request will be rejected. Only include products that your organization has an integration with. A list of [accepted product values](#product-values) is provided later in this tutorial.
* `expandIDs`: *(Optional)*: When set to `true`, this value represents an optimization for processing the IDs in the applications (currently only supported by Analytics). If omitted, this value defaults to `false`.
* `priority`: *(Optional)*: Sets the priority for processing requests based on customer need. Accepted values are `normal` and `low`.
* `analyticsDeleteMethod`: *(Optional)*: Specifies how Analytics should handle the customer data. Two possible values are accepted for this attribute:
    * `anonymize`: All data referenced by the given collection of user IDs is made anonymous. If `analyticsDeleteMethod` is omitted, this is the default behavior.
    * `purge`: All data is removed completely.
* `regulation`: **(Required)** The regulation for the request (must be either "gdpr" or "ccpa").

#### Response

A successful response returns the details of the newly created jobs.

```json
{
    "jobs": [
        {
            "jobId": "6fc09b53-c24f-4a6c-9ca2-c6076bd9vjs0",
            "customer": {
                "user": {
                    "key": "DavidSmith",
                    "action": [
                        "opt-out-of-sale"
                    ]
                }
            }
        },
        {
            "jobId": "6fc09b53-c24f-4a6c-9ca2-c6076bes0ewj2",
            "customer": {
                "user": {
                    "key": "user12345",
                    "action": [
                        "opt-out-of-sale"
                    ]
                }
            }
        }
    ],
    "requestStatus": 1,
    "totalRecords": 2
}
```

* `jobId`: A read-only, unique system-generated ID for a job. This value is used to lookup a specific job in the next step.

Once you have successfully submitted the job request, you can proceed to the next step of checking the job's status.

## Check the status of a job

Using one of the `jobId` values returned in the previous step, you can retrieve information about that job, such as its current processing status.

#### API format

```http
GET /{jobId}
```

* `{jobId}`: The ID of the job you want to lookup, returned under `jobId` in the response of the [previous step](#create-a-job-request).

#### Request

The following request retrieves the details of the job whose `jobId` is provided in the request path.

```shell
curl -X GET \
  https://platform.adobe.io/data/core/privacy/jobs/6fc09b53-c24f-4a6c-9ca2-c6076b0842b6 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

A successful response returns the details of the specified job.

```json
{
    "jobId": "527ef92d-6cd9-45cc-9bf1-477cfa1e2ca2",
    "requestId": "15700479082313109RX-899",
    "userKey": "David Smith",
    "action": "access",
    "status": "error",
    "submittedBy": "02b38adf-6573-401e-b4cc-6b08dbc0e61c@techacct.adobe.com",
    "createdDate": "10/02/2019 08:25 PM GMT",
    "lastModifiedDate": "10/02/2019 08:25 PM GMT",
    "userIds": [
        {
            "namespace": "email",
            "value": "dsmith@acme.com",
            "type": "standard",
            "namespaceId": 6,
            "isDeletedClientSide": false
        },
        {
            "namespace": "ECID",
            "value": "1123A4D5690B32A",
            "type": "standard",
            "namespaceId": 4,
            "isDeletedClientSide": false
        }
    ],
    "productResponses": [
        {
            "product": "Analytics",
            "retryCount": 0,
            "processedDate": "10/02/2019 08:25 PM GMT",
            "productStatusResponse": {
                "status": "submitted",
                "message": "processing"
            }
        },
        {
            "product": "AudienceManager",
            "retryCount": 0,
            "processedDate": "10/02/2019 08:25 PM GMT",
            "productStatusResponse": {
                "status": "submitted",
                "message": "processing"
            }
        }
    ],
    "downloadURL": "http://...",
    "regulation": "ccpa"
}
```

* `gdprStatusResponse`: The current status of the job. Details about each possible status are provided in the table below.
* `downloadURL`: If the status of the job is `complete`, this attribute provides a URL to download the job results as a ZIP file. This file is available to download for 60 days after the job completes.

### Job status responses

The following table lists the different possible job statuses and their corresponding meaning:

| Status Code | Status Message | Meaning |
| ----------- | -------------- | -------- |
| 1 | Complete | Job is complete and (if required) files are uploaded from every application. |
| 2 | Processing | Applications have acknowledged the job and are currently processing. |
| 3 | Submitted | Job is submitted to every applicable application. |
| 4 | Error | Something failed in the processing of the job - more specific information may be obtained by retrieving individual job details. |

> **Note:** A submitted job might remain in a processing state if it has a dependent child job that is still processing.

## View all job requests

You can view a list of all available job requests within your organization by making a GET request to the root (`/`) endpoint.

#### API format

This request format uses a `regulation` query parameter on the root (`/`) endpoint, therefore it begins with a question mark (`?`) as shown below. The response is paginated, allowing you to use other query parameters (`page` and `size`) to filter the response. You can separate multiple parameters using ampersands (`&`).

```http
GET ?regulation={REGULATION}
GET ?regulation={REGULATION}&page={PAGE}
GET ?regulation={REGULATION}&size={SIZE}
GET ?regulation={REGULATION}&page={PAGE}&size={SIZE}
```
* `{REGULATION}`: The regulation type to query for, includes choices ['gdpr','ccpa'].
* `{PAGE}`: The page of data to be displayed, using 0-based numbering. The default is `0`.
* `{SIZE}`: The number of results to display on each page. The default is `1` and the maximum is `100`. Exceeding the maximum causes the API to return a 400-code error.

#### Request

The following request retrieves a paginated list of all jobs within an IMS Organization, starting from the third page with a page size of 50.

```shell
curl -X GET \
  https://platform.adobe.io/data/core/privacy/jobs?regulation=gdpr&page=2&size=50 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

A successful response returns a list of jobs, with each job containing details such as its `jobId`. In this example, the response would contain a list of 50 jobs, starting on the third page of results. 

### Accessing subsequent pages

To fetch the next set of results in a paginated response, you must make another API call to the same endpoint while increasing the `page` query parameter by 1.

## Next steps

You now know how to create and monitor privacy job requests using the Privacy Service API. For information on how to perform the same tasks using the user interface, see the [Privacy Service UI tutorial](privacy_service_ui_tutorial.md).


## Appendix

The following sections provide additional reference information related to the Privacy Service API.

### Namespace qualifiers

When specifying a `namespace` value in the Privacy Service API, a **namespace qualifier** must be included in a corresponding `type` parameter. The following table outlines the different accepted namespace qualifiers.

| Qualifier | Definition |
| --------- | ---------- |
| standard | One of the standard namespaces defined globally, not tied to an individual organization data set (for example, email, phone number, etc.). Namespace ID is provided. |
| custom | A unique namespace created in the context of an organization, not shared across the Experience Cloud. The value represents the friendly name ("name" field) to be searched for. Namespace ID is provided. |
| integrationCode | Integration code - similar to "custom", but specifically defined as the integration code of a datasource to be searched for. Namespace ID is provided. |
| namespaceId | Indicates the value is the actual ID of the namespace that was created or mapped through the namespace service. |
| unregistered | A freeform string that is not defined in the namespace service and is taken "as is". Any application that handles these kinds of namespaces checks against them and handle if appropriate for the company context and data set. No namespace ID is provided. |
| analytics | A custom namespace that is mapped internally in Analytics, not in the namespace service. This is passed in directly as specified by the original request, without a namespace ID |
| target | A custom namespace understood internally by Target, not in the namespace service. This is passed in directly as specified by the original request, without a namespace ID |

### Product values

The following table outlines the accepted values for specifying an Adobe product in the `include` attribute of a job creation request.

Product | Value for use in the `include` attribute
--- | ---
Adobe Advertizing Cloud | "AdCloud"
Adobe Analytics | "Analytics"
Adobe Audience Manager | "AudienceManager"
Adobe Campaign | "Campaign"
Adobe Experience Platform | "aepDataLake"
Adobe Target | "Target"
Customer Record Service | "CRS"
Real-time Customer Profile | "ProfileService"