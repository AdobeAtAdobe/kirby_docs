# Access control developer guide

Access control for Experience Platform is administered through the [Adobe Admin Console](https://adminconsole.adobe.com). This functionality leverages product profiles in Admin Console, which link users with permissions and sandboxes. See the [access control overview](access-control-overview.md) for more information.

This document provides information on how to format your requests to the [Access Control API](../../../../../../acpdr/swagger-specs/access-control.yaml) to retrieve the status of specific permissions for the current user.

## Getting started

This guide provides an example API call to demonstrate how to format your requests, including the path, required headers, and a properly formatted request payload. A sample JSON response returned by the API is also provided. For information on the conventions used in the documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

This guide requires you to have completed the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

All requests to Platform APIs require the following header which specifies the name of the sandbox the operation will take place in:

* x-sandbox-name: `{SANDBOX_NAME}`

All requests that contain a payload (POST, PUT, and PATCH) require an additional header:

* Content-Type: application/json

## View effective policies

To view effective policies for the current user, make a POST request to the `/acl/effective-policies` endpoint in the Access Control API. The permissions and resource types you want to retrieve must be provided in the request payload in the form of an array. This is demonstrated in the example API call below.

#### API format

```http
POST /acl/effective-policies
```

#### Request

The following requests retrieves information about the "Manage Datasets" permission and access to the "schemas" resource type for the current user.

```shell
curl -X POST \
  https://platform.adobe.io/data/foundation/access-control/acl/effective-policies \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -H 'Content-Type: application/json' \
  -d '[
    "/permissions/manage-datasets",
    "/resource-types/schemas"
  ]'
```

> **Note:** For a complete list of permissions and resource types that can be provided in the payload array, see the appendix section on [accepted permissions and resource types](#accepted-permissions-and-resource-types).

#### Response

A successful response returns information about the permissions and resource types provided in the request. The response includes the active permissions the current user has for the resource types specified in the request. If any permissions included in the request payload are active for the current user, the API returns returns the permission with an astrisk (`*`) to indicate the permission is active. Any permissions provided in the request that are not active for the user are omitted from the response payload.

```json
{
    "policies": {
        "/resource-types/schemas": [
            "read",
            "write",
            "delete"
        ],
        "/permissions/manage-datasets": [
            "*"
        ]
    }
}
```

## Next steps

This document covered how to make calls to the Access Control API to return information on active permissions and related policies for resource types. For more information about access control for Experience Platform, see the [access control overview](access-control-overview.md).

## Appendix

This section provides supplemental information for using the Access Control API.

### Accepted permissions and resource types

The following is a list of permissions and resource types you can include in the payload of a POST request to the `/acl/active-permissions` endpoint.

**Permissions**

```plaintext
"permissions/export-audience-for-segments"
"permissions/manage-datasets"
"permissions/manage-identity-namespaces"
"permissions/manage-profiles"
"permissions/manage-sandboxes"
"permissions/manage-schemas"
"permissions/reset-sandboxes"
"permissions/view-datasets"
"permissions/view-identity-namespaces"
"permissions/view-monitoring-dashboard"
"permissions/view-profiles"
"permissions/view-sandboxes"
"permissions/view-schemas"
```

**Resource types**

```plaintext
"resource-types/classes"
"resource-types/connections"
"resource-types/data-types"
"resource-types/dataset-data"
"resource-types/datasets"
"resource-types/dule-labels"
"resource-types/identity-descriptors"
"resource-types/identity-namespaces"
"resource-types/mixins"
"resource-types/monitoring"
"resource-types/profile-configs
"resource-types/profile-datasets"
"resource-types/profiles"
"resource-types/relationship-descriptors"
"resource-types/reset-sandboxes"
"resource-types/sandboxes"
"resource-types/schemas"
"resource-types/segment-jobs"
"resource-types/segments"
```