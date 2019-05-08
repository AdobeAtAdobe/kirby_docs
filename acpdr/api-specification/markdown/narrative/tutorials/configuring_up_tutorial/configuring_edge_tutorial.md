# Configuring edge destinations and projections via API

## Overview

This tutorial walks you through configuration for Edge Service, which is discussed [here](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md#edge-service).

Configuration for Edge Service involves creating projection configurations and the destinations they should be routed to, as used by Projection Service. 

This tutorial demonstrates the following configuration workflow:

[List existing destinations](#step-1-list-destinations)  
[Create a destination](#step-2-create-a-destination)  
[List projection configurations](#step-3-list-projection-configurations)  
[Create a projection configuration](#step-4-create-a-projection-configuration)

> **Note:** Creating a projection configuration entails listing XDM field names indicating which data to replicate on the edges or pipeline. The [Appendix](#appendix) below includes details on this, `selector`, property.

### Projection Service components

#### Projection destination

A projection destination defines where to route projections when they are created or changed. Projection Service supports routing to one or more edge, or projections can routed to a local pipeline topic from which they can be consumed by solutions or partners.

#### Projection configurations

Projection configurations are information about what data, of a complete union view, should be replicated to the edges or pipeline. 

### Prerequisite topics

[Unified Profile](../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md) is a generic lookup entity store, and is used to manage any XDM Platform data. Unified Profile facilitates building customer personalization use cases by merging data across various enterprise data assets and providing access to that unified data. Unified Profile provides tools for looking up entities by ID, as well as robust segmentation tools.  
[Authenticating and Accessing Adobe Experience Platform APIs](../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) - This tutorial shows the initial steps to set up an integration in Adobe I/O Console and use an integration to access Adobe Experience Platform APIs. The steps in this tutorial describe how to gain access to the following values needed for required headers:
* IMS Organization ID
* API Key (Client ID)
* Access Token

### Requirements

All service calls in this document require the following headers. Some service calls may require additional headers which will be listed in context.

|Header|Description|Example Value|
|---|---|---|
|Authorization|The Access Token as described in [Prerequisite topics](#prerequisite-topics), prefixed with "Bearer "|Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ....|
|x-gw-ims-org-id|The IMS Organization ID as described in [Prerequisite topics](#prerequisite-topics)|17FA2AFD56CF35747F000101@AdobeOrg|
|x-api-key|The API Key (Client ID) as described in [Prerequisite topics](#prerequisite-topics)|25622d14d3894ea590628717f2cb7462|

---

## Step 1: List destinations 

Prior to creating a new destination, you should understand what edge projection destinations have already been configured.

#### Service endpoint

```
GET https://platform.adobe.io/data/core/ups/config/destinations
```

#### Example request

```
curl -X GET \
  https://platform.adobe.io/data/core/ups/config/destinations \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
  -H 'Accept: application/vnd.adobe.platform.projectionDestinationList+json; version=1' \
  -H 'cache-control: no-cache' 
```

#### Example response

```
{
    "_links": {
        "self": {
            "href": "/data/core/ups/config/destinations",
            "templated": false
        }
    },
    "_embedded": {
        "projectionDestinations": [
            {
                "_links": {
                    "self": {
                        "href": "/data/core/ups/config/destinations/9d66c06e-c745-480c-b64c-1d5234d25f4b",
                        "templated": false
                    }
                },
                "id": "9d66c06e-c745-480c-b64c-1d5234d25f4b",
                "type": "PIPELINE",
                "topic": "ups-edgeprofile-dev-va711-eciobanu",
                "version": 1
            }
        ]
    }
}
```

## Step 2: Create a destination

If the destination you require does not already exist, create a new one. Depending on the destination type, 

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/config/destinations
```

The request body depends on the destination type, each of which is demonstrated.

#### Request body - Edge destination type

```
{
  "type": "EDGE",
  "dataCenters": ["{DATA_CENTER}"],
  "ttl": 3600
}
```

Where `dataCenters` is a string array which could contain any of the following:

* "OR1" - Western United States
* "VA5" - Eastern United States

#### Request body - Pipeline destination type

```
{
  "type": "PIPELINE",
  "topic": "{TOPIC}"
}
```

Where `topic` names an existing pipeline topic to which to route projections.

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/preview \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
  -H 'Content-Type: application/json' \
  -H 'Accept: application/vnd.adobe.platform.projectionDestination+json; version=1' \
  -H 'cache-control: no-cache' \
  -d '{
  "type": "EDGE",
  "dataCenters": [
    "OR1"
  ],
  "ttl": 3600
}'
```

#### Example response

```
{
    "self": {
        "href": "/data/core/ups/config/destinations/cc5a3bd1-f2b9-4965-b9bd-4e7416a02cd4",
        "templated": false
    },
    "id": "cc5a3bd1-f2b9-4965-b9bd-4e7416a02cd4",
    "type": "EDGE",
    "dataCenters": [
       "OR1"
    ],
    "ttl": 3600,
    "version": 3
}
```

## Step 3: List projection configurations

Get a list of all projection configurations in existence.

#### Service endpoint

You can access projection configurations for a particular schema, schema and name, or use no filters to access all projection configurations.

```
GET https://platform.adobe.io/data/core/ups/config/projections

GET https://platform.adobe.io/data/core/ups/config/projections?schemaName={SCHEMA_NAME}

GET https://platform.adobe.io/data/core/ups/config/projections?schemaName={SCHEMA_NAME}&name={PROJECTION_NAME}
```

> **Note:** When using the `name` parameter, `schemaName` is required, as a projection configuration name is only unique in the context of the schema.

#### Example request

```
curl -X GET \
  https://platform.adobe.io/data/core/ups/config/projections?schemaName=_xdm.context.profile \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
  -H 'Accept: application/vnd.adobe.platform.projectionConfigList+json; version=1' \
  -H 'cache-control: no-cache' 
```

### Example response

```
{
    "_links": {
        "self": {
            "href": "/data/core/ups/config/projections",
            "templated": false
        }
    },
    "_embedded": {
        "projectionConfigs": [
            {
                "_links": {
                    "destination": {
                        "href": "/data/core/ups/config/destinations/a689248a-5d2b-44af-bb70-c8f17f97011b",
                        "templated": false
                    },
                    "self": {
                        "href": "/data/core/ups/config/projections/99aed0bc-c183-4997-ada7-7843642e08f6",
                        "templated": false
                    }
                },
                "_embedded": {
                    "destination": {
                        "self": {
                            "href": "/data/core/ups/config/destinations/a689248a-5d2b-44af-bb70-c8f17f97011b",
                            "templated": false
                        },
                        "id": "a689248a-5d2b-44af-bb70-c8f17f97011b",
                        "type": "EDGE",
                        "ttl": 1000,
                        "dataCenters": [
                            "OR1"
                        ],
                        "version": 1
                    }
                },
                "selector": "strategy",
                "version": 2,
                "id": "99aed0bc-c183-4997-ada7-7843642e08f6",
                "schemaName": "_xdm.context.profile",
                "name": "adcloud_rlsa",
                "destinationId": "a689248a-5d2b-44af-bb70-c8f17f97011b"
            },
        ]
    }
}
```

## Step 4: Create a projection configuration

Create a new projection configuration that will dictate which XDM fields are made available on the edges or pipeline as persisted or published by Projection Service.

#### Service endpoint

```
POST https://platform.adobe.io/data/core/ups/config/projections?schemaName={SCHEMA_NAME}
```

#### Request body

```
{
  "selector": "{SELECTOR_STATEMENT}",
  "name": "{NAME}",
  "destinationId": "{DESTINATION_ID}"
}
```

Where `selector` is a string containing a list of properties under the extended data model that are to be replicated to the edges, i.e. the mask to apply on top of the data in Unified Profile to generate the projection. For more on this property, see [Selector](#selector) in the appendix below.

#### Example request

```
curl -X POST \
  https://platform.adobe.io/data/core/ups/config/projections?schemaName=_xdm.context.profile \
  -H 'Authorization: Bearer eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LTEuY2VyIiwiYWxnIjoiUlMyNTYifQ...' \
  -H 'x-api-key: 25622d14d3894ea590628717f2cb7462' \
  -H 'x-gw-ims-org-id: 17FA2AFD56CF35747F000101@AdobeOrg'
  -H 'Content-Type: application/json' \
  -H 'Accept: application/vnd.adobe.platform.projectionConfig+json; version=1' \
  -H 'cache-control: no-cache' \
  -d '{
  "selector": "emails,person(firstName)",
  "name": "my_test_projection",
  "destinationId": "cc5a3bd1-f2b9-4965-b9bd-4e7416a02cd4"
}'
```

### Example response

```
{
    "_links": {
        "destination": {
            "href": "/data/core/ups/config/destinations/cc5a3bd1-f2b9-4965-b9bd-4e7416a02cd4",
            "templated": false
        },
        "self": {
            "href": "/data/core/ups/config/projections/87fcd0bc-c183-4997-daf9-7843642g95a1",
            "templated": false
        }
    },
    "_embedded": {
        "destination": {
            "self": {
                "href": "/data/core/ups/config/destinations/cc5a3bd1-f2b9-4965-b9bd-4e7416a02cd4",
                "templated": false
            },
            "id": "cc5a3bd1-f2b9-4965-b9bd-4e7416a02cd4",
            "type": "EDGE",
            "ttl": 1000,
            "dataCenters": [
                "OR1"
            ],
            "version": 1
        }
    },
    "selector": "strategy",
    "version": 2,
    "id": "87fcd0bc-c183-4997-daf9-7843642g95a1",
    "schemaName": "_xdm.context.profile",
    "name": "my_test_projection",
    "destinationId": "cc5a3bd1-f2b9-4965-b9bd-4e7416a02cd4"
}
```

---

## Conclusion

Adobe Experience Platform solutions like Adobe Target and Adobe Campaign use the Edge Service features driven by the configurations discussed in this tutorial, allowing you to provide real-time personalization.

This tutorial covers only some of the Edge Profile Projection Configuration API. For more details, see the [API Reference](../../../../../../acpdr/swagger-specs/edge-profile-projection-config.yaml).

## Appendix

### Selector

Along with the schema to which it applies and the destination to which it should be routed, a projection configuration names the properties to include in projections as a property referred to as the `selector`. A selector is a comma delimited list of XDM field names, where dot notation is used to drill down to a field within a parent entity. 

The format of the `selector` parameter value is loosely based on XPath syntax. The supported syntax is summarized below; additional examples are provided in the following section.

* Use a comma-separated list to select multiple fields.
* Use a.b to select a field b that is nested within field a; use a.b.c to select a field c nested within b, which in turn is nested under field a.
* Specify field sub-selectors to request only specific sub-fields by placing expressions in parentheses "( )" after any selected field. For example: addresses(type,city.country) returns only the item type and city's country, for each addresses array element.
* Expressions using sub-selectors are equivalent to their expanded form. For example: addresses(type,city.country) is equivalent to addresses.type,addresses.city.country. The former style of expression is preferred: it is more concise and a better illustration of the field hierarchy.

#### Examples of the `selector` parameter

The selector parameter value is a comma-separated list of fields, and each field is specified relative to the root of the response:

* if the data is a collection of resources, the projection will include an array of resources
* if the data is a single resource, the projection will include fields that are relative to that resource
* if the field you select is (or is part of) an array, the projection will include the selected portion of all elements in the array.

The following demonstrates some selectors.

__"person.lastName"__

Returns the `lastName` sub-field of the `person` object in the requested resource.

```
{
  "person": {
    "lastName": "Smith"
  }
}
```

__"addresses"__

Returns all elements in the `addresses` array, including all fields in each element, but no other fields.	

```
{
  "addresses": [
    {
      "type": "home",
      "street1": "100 Great Mall Parkway",
      "city": "San Jose"
    },
    {
      "type": "work",
      "street1": "1 Main Street",
      "city": "San Jose"
    }
  ]
}
```

__"person.lastName,addresses"__

Returns both the `person.lastName` field and all elements in the `addresses` array.	

```
{
  "person": {
    "lastName": "Smith"
  },
  "addresses": [
    {
      "type": "home",
      "street1": "100 Great Mall Parkway",
      "city": "San Jose"
    },
    {
      "type": "work",
      "street1": "1 Main Street",
      "city": "San Jose"
    }
  ]
}
```

__"addresses.city"__

Returns only the city field for all elements in the addresses array.

> **Note:** Whenever a nested field is returned, the projection includes the enclosing parent objects. The parent fields do not include any other child fields unless they are also selected explicitly.

```
{
  "addresses": [
    {
      "city": "San Jose"
    },
    {
      "city": "San Jose"
    }
  ]
}
```

By default, if a projection configuration specifies particular objects, the projection will contain the objects in their entirety. The customer can configure a projection that includes only certain sub-fields within the selected objects. The customer can do this using "( )" sub-selection syntax, as in the next example:

__"addresses(type,city)"__

Returns only the values of the `type` and `city` fields for each element in the `addresses` array.	

```
{
  "addresses": [
    {
      "type": "home",
      "city": "San Jose"
    },
    {
      "type": "work",
      "city": "San Jose"
    }
  ]
}
```