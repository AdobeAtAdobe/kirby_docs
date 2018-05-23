
# GDPR on ACP Overview

## Introduction

Adobe Cloud Platform (ACP) supports GDPR `access` and `delete` requests. Customers who are using AEP to store and manage their data can integrate with the Adobe GDPR APIs to submit both `access` and `delete` requests.

There are few pre-requisites that first be in place in order to submit requests to ACP.

## GDPR Labeling in Platform using API

Customers should first look at their datasets in the platform and decide which of the dataset fields are applicable for GDPR requests. Then customers should add appropriate GDPR labels to the fields using the DatasetAPI.

For example, suppose there exists a dataset in ACP with the fields `id`, `address` and `product purchased`. If a customer deems that `address` should be available for GDPR requests, the customer should label the field with a unique label. These labels can then be specified when submitting `access` and `delete` requests to the GDPR APIs on ACP.

## Submitting GDPR Requests

All GDPR APIs are REST-based with JSON used as the payload for requests and responses. Documentation on each of the supported APIs can be found here: [GDPR API Specification](http://www.adobe.io/).

All requests are submitted to the following base URL:

`https://platform.adobe.io/data/privacy/gdpr/`

The following APIs are used to submit GDPR API requests and to check on the status of previously-submitted requests.

### Updating an Existing DataSet by ID

| Request endpoint | Request Payload |
| ---------------- | --------------- |
| `/dataSets/{id}` | `fields: [{`<br/>&emsp;`"name": "address",`<br/>&emsp;`"type": "object",`<br/>&emsp;`"gdpr": [{`<br/>&emsp;&emsp;`"namespace": "gdprAddress"`<br/>&emsp;`}]`<br/>`}]` |

### Accessing or Deleting Data

| Request endpoint | Request Payload |
| ---------------- | --------------- |
| `/data/privacy/gdpr` | `{`<br/>&emsp;`"companyContexts": [{`<br/>&emsp;&emsp;&emsp;`"namespace": "imsOrgID",`<br/>&emsp;&emsp;&emsp;`"value": "customerxyz@AdobeOrg"`<br/>&emsp;&emsp;`}`<br/>&emsp;`],`<br/>&emsp;`"users": [{`<br/>&emsp;&emsp;`"key": "David Smith",`<br/>&emsp;&emsp;`"action": ["<access or delete>"],`<br/>&emsp;&emsp;`"userIDs": [{`<br/>&emsp;&emsp;&emsp;`"namespace": "gdprAddress",`<br/>&emsp;&emsp;&emsp;`"value": "1212 rocket street",`<br/>&emsp;&emsp;&emsp;`"type": "custom"`<br/>&emsp;&emsp;`}]`<br/>&emsp;`}]`<br/>`}` |

### Retrieve Details of all Previously-Submitted Requests for a Specific Authenticated User

`/data/privacy/gdpr`
