# Sandbox developer guide

Sandboxes in Adobe Experience Platform provide isolated development environments that allow you to test features, run experiments, and make custom configurations without impacting your production environment.

This developer guide provides steps to help you use the Sandbox API to manage sandboxes in Experience Platform, and includes sample API calls for performing the following actions:

* [List supported sandbox types](#list-supported-sandbox-types)
* [List all sandboxes belonging to your IMS Organization](#list-all-sandboxes-belonging-to-your-ims-organization)
* [List active sandboxes for the current user](#list-active-sandboxes-for-the-current-user)
* [Lookup a sandbox](#lookup-a-sandbox)
* [Create a sandbox](#create-a-sandbox)
* [Update a sandbox](#update-a-sandbox)
* [Reset a sandbox](#reset-a-sandbox)
* [Delete a sandbox](#delete-a-sandbox)

## Getting started with the Sandbox API

In order to manage sandboxes for your IMS Organization, you must have Sandbox Administration permissions. Users without access permissions can only use the endpoint for [listing active sandboxes for the current user](#list-active-sandboxes-for-the-current-user). See the [access control overview](../access-control/access-control-overview.md) for more information on how to assign sandbox permissions for Experience Platform. 

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in the documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

This guide requires you to have completed the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

In addition to the authentication headers, all requests require a header that specifies the name of the sandbox the operation will take place in:

* x-sandbox-name: `{SANDBOX_NAME}`

All requests that contain a payload (POST, PUT, and PATCH) require an additional header:

* Content-Type: application/json

## Sample API calls

The following sections provide important information regarding each endpoint and demonstrate example API calls for performing CRUD operations. Each call includes the general **API format**, a sample **request** showing required headers and properly formatted payloads, and a sample **response** for a successful call.

## List supported sandbox types

You can retrieve a list of supported sandbox types for your organization by making a GET request to the `/sandboxTypes` endpoint.

#### API format

```http
GET /sandboxTypes
```

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/sandbox-management/sandboxTypes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of sandbox types that are supported for your organization.

```json
{
    "sandboxTypes": [
        "production",
        "development"
    ]
}
```

## List all sandboxes belonging to your IMS Organization

To list all sandboxes belonging to your IMS Organization (active or otherwise), make a GET request to the `/sandboxes` endpoint.

#### API format

```http
GET /sandboxes
```

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/sandbox-management/sandboxes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of sandboxes belonging to your organization, including details such as `name`, `title`, `state`, and `type`.

```json
{
    "sandboxes": [
        {
            "name": "prod",
            "title": "Production",
            "state": "active",
            "type": "production",
            "region": "VA7",
            "isDefault": true,
            "eTag": 2,
            "createdDate": "2019-09-04 04:57:24",
            "lastModifiedDate": "2019-09-04 04:57:24",
            "createdBy": "{USER_ID}",
            "modifiedBy": "{USER_ID}"
        },
        {
            "name": "dev",
            "title": "Development",
            "state": "active",
            "type": "development",
            "region": "VA7",
            "isDefault": false,
            "eTag": 1,
            "createdDate": "2019-09-03 22:27:48",
            "lastModifiedDate": "2019-09-03 22:27:48",
            "createdBy": "{USER_ID}",
            "modifiedBy": "{USER_ID}"
        },
        {
            "name": "stage",
            "title": "Staging",
            "state": "active",
            "type": "development",
            "region": "VA7",
            "isDefault": false,
            "eTag": 1,
            "createdDate": "2019-09-03 22:27:48",
            "lastModifiedDate": "2019-09-03 22:27:48",
            "createdBy": "{USER_ID}",
            "modifiedBy": "{USER_ID}"
        },
        {
            "name": "dev-2",
            "title": "Development 2",
            "state": "creating",
            "type": "development",
            "region": "VA7",
            "isDefault": false,
            "eTag": 1,
            "createdDate": "2019-09-07 10:16:02",
            "lastModifiedDate": "2019-09-07 10:16:02",
            "createdBy": "{USER_ID}",
            "modifiedBy": "{USER_ID}"
        }
    ]
}
```
* `name`: The name of the sandbox. Used for lookup purposes in API calls.
* `title`: The display name for the sandbox.
* `state`: The current processing state of the sandbox. A sandbox's state can be any of the following:
    * "creating": The sandbox has been created, but is still being provisioned by the system.
    * "active": The sandbox is created and active.
    * "failed": Due to an error, the sandbox was not able to be provisioned by the system and is disabled.
    * "deleted": The sandbox has been manually disabled.
* `type`: The sandbox type, either "development" or "production".
* `isDefault`: A boolean property indicating whether this sandbox is the default sandbox for the organization. Typically this is the production sandbox.
* `eTag`: An identifier for a specific version of the sandbox. Used for version control and caching efficiency, this value is updated each time a change is made to the sandbox.

## List active sandboxes for the current user

> **Note:** Unlike other endpoints provided in the Sandbox API, this endpoint is available for all users, including those without Sandbox Administration access permissions.

You can list the sandboxes that are active for the current user by making a GET request to the root (`/`) endpoint.

#### API format

```http
GET /
```

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/sandbox-management \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of sandboxes that are active for the current user, including details such as `name`, `title`, `state`, and `type`.

```json
{
    "sandboxes": [
        {
            "name": "prod",
            "title": "Production",
            "state": "active",
            "type": "production",
            "region": "VA7",
            "isDefault": true,
            "eTag": 2,
            "createdDate": "2019-09-04 04:57:24",
            "lastModifiedDate": "2019-09-04 04:57:24",
            "createdBy": "{USER_ID}",
            "modifiedBy": "{USER_ID}"
        },
        {
            "name": "dev",
            "title": "Development",
            "state": "active",
            "type": "development",
            "region": "VA7",
            "isDefault": false,
            "eTag": 1,
            "createdDate": "2019-09-03 22:27:48",
            "lastModifiedDate": "2019-09-03 22:27:48",
            "createdBy": "{USER_ID}",
            "modifiedBy": "{USER_ID}"
        },
        {
            "name": "stage",
            "title": "Staging",
            "state": "active",
            "type": "development",
            "region": "VA7",
            "isDefault": false,
            "eTag": 1,
            "createdDate": "2019-09-03 22:27:48",
            "lastModifiedDate": "2019-09-03 22:27:48",
            "createdBy": "{USER_ID}",
            "modifiedBy": "{USER_ID}"
        }
    ]
}
```
* `name`: The name of the sandbox. Used for lookup purposes in API calls.
* `title`: The display name for the sandbox.
* `state`: The current processing state of the sandbox. A sandbox's state can be any of the following:
    * "creating": The sandbox has been created, but is still being provisioned by the system.
    * "active": The sandbox is created and active.
    * "failed": Due to an error, the sandbox was not able to be provisioned by the system and is disabled.
    * "deleted": The sandbox has been manually disabled.
* `type`: The sandbox type, either "development" or "production".
* `isDefault`: A boolean property indicating whether this sandbox is the default sandbox for the organization. Typically this is the production sandbox.
* `eTag`: An identifier for a specific version of the sandbox. Used for version control and caching efficiency, this value is updated each time a change is made to the sandbox.

## Lookup a sandbox

You can lookup an individual sandbox by making a GET request that includes the sandbox's `name` property in the request path.

#### API format

```http
GET /sandboxes/{SANDBOX_NAME}
```
* `{SANDBOX_NAME}`: The `name` property of the sandbox you want to lookup.

#### Request

The following request retrieves a sandbox named "dev-2".

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/sandbox-management/sandboxes/dev-2 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the details of the sandbox, including its `name`, `title`, `state`, and `type`.

```json
{
    "name": "dev-2",
    "title": "Development 2",
    "state": "creating",
    "type": "development",
    "region": "VA7",
    "isDefault": false,
    "eTag": 1,
    "createdDate": "2019-09-07 10:16:02",
    "lastModifiedDate": "2019-09-07 10:16:02",
    "createdBy": "{USER_ID}",
    "modifiedBy": "{USER_ID}"
}
```
* `name`: The name of the sandbox. Used for lookup purposes in API calls.
* `title`: The display name for the sandbox.
* `state`: The current processing state of the sandbox. A sandbox's state can be any of the following:
    * "creating": The sandbox has been created, but is still being provisioned by the system.
    * "active": The sandbox is created and active.
    * "failed": Due to an error, the sandbox was not able to be provisioned by the system and is disabled.
    * "deleted": The sandbox has been manually disabled.
* `type`: The sandbox type, either "development" or "production".
* `isDefault`: A boolean property indicating whether this sandbox is the default sandbox for the organization. Typically this is the production sandbox.
* `eTag`: An identifier for a specific version of the sandbox. Used for version control and caching efficiency, this value is updated each time a change is made to the sandbox.

## Create a sandbox

You can create a new sandbox by making a POST request to the `/sandboxes` endpoint.

#### API format

```http
POST /sandboxes
```

#### Request

The following request creates a new development sandbox named "dev-3".

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/sandbox-management/sandboxes \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "dev-3",
    "title": "Development 3",
    "type": "development"
  }'
```
* `name`: The identifier that will be used to access the sandbox in future requests. This value must be unique, and best practice is to make it as descriptive as possible. Cannot contain any spaces or capital letters.
* `title`: A human-readable name used for display purposes in the Platform user interface.
* `type`: The type of sandbox to be created. Currently only "development" type sandboxes can be created by an organization.

#### Response

A successful response returns the details of the newly created sandbox, showing that its `state` is "creating".

```json
{
    "name": "dev-3",
    "title": "Development 3",
    "state": "creating",
    "type": "development",
    "region": "VA7"
}
```

> **Note:** Sandboxes take roughly 15 minutes to be provisioned by the system, after which their `state` will become "active" or "failed".

## Update a sandbox

You can update one or more fields in a sandbox by making a PATCH request that includes the sandbox's `name` in the request path and the property to update in the request payload.

> **Note:** Currently only a sandbox's `title` property can be updated.

#### API format

```http
PATCH /sandboxes/{SANDBOX_NAME}
```
* `{SANDBOX_NAME}`: The `name` of the sandbox you want to update.

#### Request

The following request updates the `title` property of the sandbox named "dev-2".

```shell
curl -X PATCH \
  https://platform.adobe.io/data/foundation/sandbox-management/sandboxes/dev-2 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Development B"
  }'
```

#### Response

A successful response returns HTTP status 200 (OK) with the details of the newly updated sandbox.

```json
{
    "name": "dev-2",
    "title": "Development B",
    "state": "active",
    "type": "development",
    "region": "VA7"
}
```

## Reset a sandbox

Development sandboxes have a "factory reset" feature which deletes all non-default resources from a sandbox. You can reset a sandbox by making a PUT request that includes the sandbox's `name` in the request path.

#### API format

```http
PUT /sandboxes/{SANDBOX_NAME}
```
* `{SANDBOX_NAME}`: The `name` of the sandbox you want to reset.

#### Request

The following request resets a sandbox named "dev-2".

```shell
curl -X PUT \
  https://platform.adobe.io/data/foundation/sandbox-management/sandboxes/dev-2 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "reset"
  }'
```
* `action`: This parameter must be supplied in the request payload with a value of "reset" in order to reset the sandbox.

#### Response

A successful response returns the details of the updated sandbox, showing that its `state` is "resetting".

```json
{
    "id": "d8184350-dbf5-11e9-875f-6bf1873fec16",
    "name": "dev-2",
    "title": "Development 2",
    "state": "resetting",
    "type": "development",
    "region": "VA7"
}
```

> **Note:** Once a sandbox is reset, it takes roughly 15 minutes to be provisioned by the system. Once provisioned, the sandbox's `state` becomes "active" or "failed".

## Delete a sandbox

You can delete a sandbox by making a DELETE request that includes the sandbox's `name` in the request path.

> **Note:** Making this API call updates the sandbox's `status` property to "deleted" and deactivates it. GET requests can still retrieve sandbox's details after it has been deleted.

#### API format

```http
DELETE /sandboxes/{SANDBOX_NAME}
```
* `{SANDBOX_NAME}`: The `name` of the sandbox you want to delete.

#### Request

The following request deletes a sandbox named "dev-2".

```shell
curl -X DELETE \
  https://platform.adobe.io/data/foundation/sandbox-management/sandboxes/dev-2 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the sandbox's updated details, showing that its `state` is "deleted".

```json
{
    "name": "dev-2",
    "title": "Development 2",
    "state": "deleted",
    "type": "development",
    "region": "VA7"
}
```

## Next steps

By reviewing this guide, you have been introduced to the functionalities provided by the Sandbox API. For information on how to work with sandboxes using the Experience Platform UI, see the [sandbox user guide](sandbox-user-guide.md). 

<img src="https://i.imgur.com/aIgvaQu.png" alt="back-to-top" width="50" height="50" style="position: fixed; bottom: 30px; float: right; right: 10%; left: 90%; opacity: 0.4; padding-top: 0px; padding-bottom: 0px; border-style: hidden; border-radius: 50%;" onmouseover="this.style.opacity = 0.9;" onmouseout="this.style.opacity = 0.4;" onclick="document.documentElement.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight; document.body.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight;">