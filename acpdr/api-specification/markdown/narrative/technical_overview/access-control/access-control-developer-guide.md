# Access control developer guide

Access control for Experience Platform is administered through the [Adobe Admin Console](https://adminconsole.adobe.com). This functionality leverages product profiles in Admin Console, which link users with permissions and sandboxes. See the [access control overview](access-control-overview.md) for more information.

This document provides information on how to format your requests to the [Access Control API](../../../../../../acpdr/swagger-specs/access-control.yaml), and covers the following operations:

* [List names of permissions and resource types](#list-names-of-permissions-and-resource-types)
* [View effective policies for the current user](#view-effective-policies) 


## Getting started

The following sections provide additional information that you will need to know in order to successfully make calls to the Schema Registry API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

## List names of permissions and resource types

You can list the names of all permissions and resource types by making a GET request to the `/acl/reference` endpoint. These names can then be used in API calls to [view effective policies](#view-effective-policies) for the current user.

A **permission** is a policy that is managed through the Adobe Admin Console, and maps to zero or more resource-type policies. A **resource type** is a policy that enables read, write, and/or delete capabilities for a specific type of Platform resource (such as datasets or schemas).

#### API format

```http
GET /acl/reference
```

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/access-control/acl/reference \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

A successful response returns a `permissions` object and a `resource-types` object, each containing a full list of names for access permissions or resource types, respectively.

```json
{
  "permissions": {
    "export-audience-for-segment": {
      "segments": [
        "read"
      ]
    },
    "manage-datasets": {
      "connection": [
        "read",
        "write",
        "delete"
      ],
      "datasets": [
        "read",
        "write",
        "delete"
      ]
    }
    {"..."}
  },
  "resource-types": {
    "classes": [
      "read",
      "write",
      "delete"
    ],
    "connection": [
      "read",
      "write",
      "delete"
    ],
    "data-types": [
      "read",
      "write",
      "delete"
    ],
    "...": [
      "..."
    ]
  }
}
```

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