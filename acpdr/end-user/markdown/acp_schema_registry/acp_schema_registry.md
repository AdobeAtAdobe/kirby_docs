# Adobe Cloud Platform: Schema Registry Developer Guide

## Overview

This developer guide provides an introduction to the Schema Registry (aka XDM Registry) and outlines the steps necessary to perform the following actions via the Schema Registry API:

- View existing schemas
- View a specific schema
- Extend an existing schema
- Create a new schema

## Schema Registry

The Schema Registry is used to access the Schema Library within Adobe Cloud Platform (ACP), providing a User Interface and RESTful API from which all available schemas are discoverable.

## Using the Schema Registry API

Using the Schema Registry API, you are able to perform basic CRUD operations against the Schema Library in order to view, manage, and extend all schemas available to you within Adobe Cloud Platform. This includes those defined by Adobe, platform partners, and vendors whose applications you use. You can also use API calls to view and edit schemas that you have defined, as well as create new schemas for your organization.

### XDM Compatibility Mode

Adobe maintains XDM definitions in an open source project on [GitHub](https://github.com/adobe/xdm/). These definitions are written in XDM Standard Notation, using JSON-LD in addition to JSON Schema as the grammar that defines an XDM schema.

The Schema Registry API uses 'XDM Compatibility Mode', a simplified mapping that uses a nested JSON structure to display schemas in a tree-like format. 

The examples below use XDM Compatibility Mode.

### Identifying and Referencing Schemas

A schema identifier is represented by its `id` attribute. This attribute also represents the id of the schema within the Schema Registry. The GET request below for viewing all XDM Schemas returns a list of schemas and their paths.

For example, the `Person` schema is located in the namespace `context` so it has an `id` value of `context/person`. Understanding this path is important as this is how you will interact with the schemas via the API.


### Understanding the `_customer` Keyword

Some of the API calls include the `_customer` keyword. `_customer` is a short-hand representation of your IMS Organization. Instead of needing to enter your full IMS Org for every call, you will use `_customer` instead. `_customer` represents the unique `customer` section that every Adobe provided schema can have. Behind the scenes, the schema registry converts `_customer` and stores everything under your IMS Org. 

Within the registry, you have access to all of your `_customer` extensions and schemas. You do not see `_customer` extensions or schemas from other organizations, nor do they see yours.

## Sample API Calls

Below are examples of basic schema registry API calls to view (GET) all XDM schemas, view (GET) a specific schema, update (PUT) an existing schema, and create (PUT) a new schema.

### GET - View all XDM Schemas

As mentioned above, you can view a list of all defined XDM schemas through a single API call. This allows you to find the `id` for each schema, and includes any schemas that you have defined or extensions that you have made. 

**API Format**

```
GET /xdms
```

**Example Request**

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```
- `{ACCESS_TOKEN}`: Token provided after authentication
- `{API_KEY}`: Your specific API key for your unique ACP integration. Available via https://console.adobe.io
- `{IMS_ORG}`: The IMS Organization credentials for your unique ACP integration


**Example Response**
```JSON
[
    {
        "namespace": "adobe",
        "type": "standard",
        "paths": [
            "@/xdms/adobe/experience/adcloud/advertisement",
            "@/xdms/adobe/experience/adcloud/campaign",
            "@/xdms/adobe/experience/adcloud/experienceevent",
            "@/xdms/adobe/experience/adcloud/inventory",
            "@/xdms/adobe/experience/adcloud/segment",
            "@/xdms/adobe/experience/analytics/experienceevent",
            "@/xdms/adobe/experience/analytics/keyedlist",
            "@/xdms/adobe/experience/analytics/keyvalue",
            "@/xdms/adobe/experience/analytics/listdetails",
            "@/xdms/adobe/experience/campaign/address",
            "@/xdms/adobe/experience/campaign/experienceevent",
            "@/xdms/adobe/experience/campaign/mutationevent",
            "@/xdms/adobe/experience/campaign/orchestration/experienceevent",
            "@/xdms/adobe/experience/campaign/orchestration/orchestrationdetails",
            "@/xdms/adobe/experience/campaign/orchestration/reportingevent",
            "@/xdms/adobe/experience/campaign/orchestration/reportingeventmetrics",
            "@/xdms/adobe/experience/campaign/orchestration/reportingexternalevent",
            "@/xdms/adobe/experience/experienceevent",
            "@/xdms/adobe/experience/implementations",
            "@/xdms/adobe/experience/profile/experienceevent",
            "@/xdms/adobe/experience/target/activity",
            "@/xdms/adobe/experience/target/activity/activityevent",
            "@/xdms/adobe/experience/target/activity/activityevent/context",
            "@/xdms/adobe/experience/target/activity/activityevent/optionevent",
            "@/xdms/adobe/experience/target/activity/activityevent/segmentevent",
            "@/xdms/adobe/experience/target/activity/preview",
            "@/xdms/adobe/experience/target/experienceevent"
        ]
    },
    {
        "namespace": "channels",
        "type": "standard",
        "paths": [
            "@/xdms/channels/adm",
            "@/xdms/channels/agency",
            "@/xdms/channels/apns",
            "@/xdms/channels/application",
            "@/xdms/channels/baidu",
            "@/xdms/channels/channel",
            "@/xdms/channels/direct-mail",
            "@/xdms/channels/email",
            "@/xdms/channels/facebook-feed",
            "@/xdms/channels/fax",
            "@/xdms/channels/gcm",
            "@/xdms/channels/line",
            "@/xdms/channels/mobile-app",
            "@/xdms/channels/mpns",
            "@/xdms/channels/phone",
            "@/xdms/channels/sms",
            "@/xdms/channels/twitter-feed",
            "@/xdms/channels/web",
            "@/xdms/channels/wechat",
            "@/xdms/channels/wns"
        ]
    },
    {
        "namespace": "common",
        "type": "standard",
        "paths": [
            "@/xdms/common/address",
            "@/xdms/common/auditable",
            "@/xdms/common/geo",
            "@/xdms/common/geounit",
            "@/xdms/common/organization",
            "@/xdms/common/orgunit"
        ]
    },
    {
        "namespace": "content",
        "type": "standard",
        "paths": [
            "@/xdms/content/productlistitem"
        ]
    },
    {
        "namespace": "context",
        "type": "standard",
        "paths": [
            "@/xdms/context/advertising",
            "@/xdms/context/advertising-break",
            "@/xdms/context/advertising-timed-asset-reference",
            "@/xdms/context/advertising-timed-asset-view-details",
            "@/xdms/context/adviewability",
            "@/xdms/context/application",
            "@/xdms/context/beacon-interaction-details",
            "@/xdms/context/browserdetails",
            "@/xdms/context/commerce",
            "@/xdms/context/device",
            "@/xdms/context/direct-marketing",
            "@/xdms/context/emailaddress",
            "@/xdms/context/enduserids",
            "@/xdms/context/environment",
            "@/xdms/context/experienceevent",
            "@/xdms/context/geo-interaction-details",
            "@/xdms/context/identity",
            "@/xdms/context/implementationdetails",
            "@/xdms/context/marketing",
            "@/xdms/context/media",
            "@/xdms/context/media-timed",
            "@/xdms/context/media-timed-asset-reference",
            "@/xdms/context/media-timed-asset-view-details",
            "@/xdms/context/media-timed-chapter",
            "@/xdms/context/media-timed-chapter-asset-reference",
            "@/xdms/context/media-timed-chapter-view-details",
            "@/xdms/context/media-timed-qoe",
            "@/xdms/context/namespace",
            "@/xdms/context/optinout",
            "@/xdms/context/person",
            "@/xdms/context/person-name",
            "@/xdms/context/phonenumber",
            "@/xdms/context/place",
            "@/xdms/context/placecontext",
            "@/xdms/context/poi-detail",
            "@/xdms/context/poi-interaction",
            "@/xdms/context/product",
            "@/xdms/context/profile",
            "@/xdms/context/profilestitch",
            "@/xdms/context/profilestitchidentity",
            "@/xdms/context/pushnotificationtoken",
            "@/xdms/context/search",
            "@/xdms/context/segmentidentity",
            "@/xdms/context/segmentmembership",
            "@/xdms/context/segmentmembershipitem",
            "@/xdms/context/subscription",
            "@/xdms/context/webinfo",
            "@/xdms/context/webinteraction",
            "@/xdms/context/webpagedetails",
            "@/xdms/context/webreferrer"
        ]
    },
    {
        "namespace": "core",
        "type": "standard",
        "paths": [
            "@/xdms/core/Address",
            "@/xdms/core/AdvertisingMetrics",
            "@/xdms/core/Application",
            "@/xdms/core/AuditTrail",
            "@/xdms/core/BrowserDetails",
            "@/xdms/core/Commerce",
            "@/xdms/core/CommerceMetrics",
            "@/xdms/core/CommunicationChannel",
            "@/xdms/core/DataSource",
            "@/xdms/core/Device",
            "@/xdms/core/DirectMarketingMetrics",
            "@/xdms/core/Discount",
            "@/xdms/core/EmailAddress",
            "@/xdms/core/EndUserIds",
            "@/xdms/core/Environment",
            "@/xdms/core/Geo",
            "@/xdms/core/GeoCircle",
            "@/xdms/core/GeoCoordinates",
            "@/xdms/core/GeoShape",
            "@/xdms/core/Identity",
            "@/xdms/core/ListDetails",
            "@/xdms/core/LocationContext",
            "@/xdms/core/Marketing",
            "@/xdms/core/Metric",
            "@/xdms/core/Metrics",
            "@/xdms/core/Namespace",
            "@/xdms/core/OpeningHours",
            "@/xdms/core/OptInOut",
            "@/xdms/core/Order",
            "@/xdms/core/Organization",
            "@/xdms/core/PaymentItem",
            "@/xdms/core/Person",
            "@/xdms/core/PhoneNumber",
            "@/xdms/core/ProductListItem",
            "@/xdms/core/Propensity",
            "@/xdms/core/PushNotificationToken",
            "@/xdms/core/Reference",
            "@/xdms/core/Search",
            "@/xdms/core/Subscription",
            "@/xdms/core/Times",
            "@/xdms/core/Web",
            "@/xdms/core/WebLink",
            "@/xdms/core/WebMetrics",
            "@/xdms/core/WebPage"
        ]
    },
    {
        "namespace": "data",
        "type": "standard",
        "paths": [
            "@/xdms/data/application-closes",
            "@/xdms/data/bitrate-average",
            "@/xdms/data/bitrate-changes",
            "@/xdms/data/buffer-time",
            "@/xdms/data/buffers",
            "@/xdms/data/clicks",
            "@/xdms/data/completes",
            "@/xdms/data/conversions",
            "@/xdms/data/datasource",
            "@/xdms/data/discount",
            "@/xdms/data/drop-before-starts",
            "@/xdms/data/dropped-frames",
            "@/xdms/data/errors",
            "@/xdms/data/feature-usages",
            "@/xdms/data/federated",
            "@/xdms/data/first-launches",
            "@/xdms/data/firstquartiles",
            "@/xdms/data/installs",
            "@/xdms/data/launches",
            "@/xdms/data/measure",
            "@/xdms/data/measuredadnotvisible",
            "@/xdms/data/measuredmuted",
            "@/xdms/data/measuredwindowinactive",
            "@/xdms/data/media-segment-views",
            "@/xdms/data/metricdefinition",
            "@/xdms/data/metrics/advertising/impressions",
            "@/xdms/data/metrics/cart-abandons",
            "@/xdms/data/metrics/checkouts",
            "@/xdms/data/metrics/direct-marketing/bounces",
            "@/xdms/data/metrics/direct-marketing/mirror-pages",
            "@/xdms/data/metrics/direct-marketing/non-deliverables",
            "@/xdms/data/metrics/direct-marketing/notsent",
            "@/xdms/data/metrics/direct-marketing/opens",
            "@/xdms/data/metrics/direct-marketing/sends",
            "@/xdms/data/metrics/direct-marketing/unsubscriptions",
            "@/xdms/data/metrics/direct-marketing/user-complaints",
            "@/xdms/data/metrics/placecontext/poi-entries",
            "@/xdms/data/metrics/placecontext/poi-exits",
            "@/xdms/data/metrics/product-list-adds",
            "@/xdms/data/metrics/product-list-opens",
            "@/xdms/data/metrics/product-list-removals",
            "@/xdms/data/metrics/product-list-reopens",
            "@/xdms/data/metrics/product-list-views",
            "@/xdms/data/metrics/product-views",
            "@/xdms/data/metrics/purchases",
            "@/xdms/data/metrics/save-for-laters",
            "@/xdms/data/metrics/web/linkclicks",
            "@/xdms/data/metrics/web/pageviews",
            "@/xdms/data/midpoints",
            "@/xdms/data/order",
            "@/xdms/data/pause-time",
            "@/xdms/data/pauses",
            "@/xdms/data/paymentitem",
            "@/xdms/data/progress10",
            "@/xdms/data/progress95",
            "@/xdms/data/resumes",
            "@/xdms/data/stall-time",
            "@/xdms/data/stalls",
            "@/xdms/data/starts",
            "@/xdms/data/thirdquartiles",
            "@/xdms/data/time-played",
            "@/xdms/data/time-to-start",
            "@/xdms/data/total-time-played",
            "@/xdms/data/unmeasurableiframe",
            "@/xdms/data/unmeasurableother",
            "@/xdms/data/upgrades",
            "@/xdms/data/viewabilityeligibleimpressions",
            "@/xdms/data/viewablecompletes",
            "@/xdms/data/viewablefirstquartiles",
            "@/xdms/data/viewableimpressions",
            "@/xdms/data/viewablemidpoints",
            "@/xdms/data/viewablethirdquartiles"
        ]
    },
    {
        "namespace": "external",
        "type": "standard",
        "paths": [
            "@/xdms/external/iptc/creator",
            "@/xdms/external/iptc/episode",
            "@/xdms/external/iptc/rating",
            "@/xdms/external/iptc/season",
            "@/xdms/external/iptc/series",
            "@/xdms/external/schema/geocircle",
            "@/xdms/external/schema/geocoordinates",
            "@/xdms/external/schema/geoshape"
        ]
    },
    {
        "namespace": "model",
        "type": "standard",
        "paths": [
            "@/xdms/model/ExperienceEvent",
            "@/xdms/model/PhysicalLocation",
            "@/xdms/model/Product",
            "@/xdms/model/Profile",
            "@/xdms/model/Segment",
            "@/xdms/model/Store"
        ]
    },
    {
        "namespace": "_customer",
        "type": "non-standard",
        "paths": [
            "@/xdms/_customer/retail/loyaltyprogram",
            "@/xdms/_customer/web/customercompany"
        ]
    },
    {
        "namespace": "extension",
        "type": "non-standard",
        "paths": [
            "@/xdms/model/Profile/_customer/family"
        ]
    }
]
```

### GET - View a Specific Schema

Viewing a schema definition in its JSON Schema form requires a single GET request to the schema path.

**API Format**

```
GET /xdms?id={id}
```

**Example Request**

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms?id=context/person \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```


**Example Response**
```JSON
{
    "created": 1535749106112,
    "updated": 1535749106112,
    "title": "Person",
    "type": "object",
    "description": "An individual person. May represent a person acting in various roles, such as a customer, contact, or owner.",
    "properties": {
        "name": {
            "title": "Full name",
            "$ref": "context/person-name",
            "description": "The person's full name",
            "meta:xdmField": "xdm:name"
        },
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
        "birthDate": {
            "title": "Birth Date",
            "type": "string",
            "format": "date",
            "description": "The full date a person was born.",
            "meta:xdmType": "date",
            "meta:xdmField": "xdm:birthDate"
        },
        "birthDayAndMonth": {
            "title": "Birth Date",
            "type": "string",
            "pattern": "[0-1][0-9]-[0-9][0-9]",
            "description": "The day and month a person was born, in the format MM-DD. This field should be used when the day and month of a person's birth is known, but not the year.",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:birthDayAndMonth"
        },
        "birthYear": {
            "title": "Birth year",
            "type": "integer",
            "description": "The year a person was born including the century (yyyy, e.g 1983).  This field should be used when only the person's age is known, not the full birth date.",
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
        },
        "repositoryCreatedBy": {
            "title": "Created by User Identifier",
            "type": "string",
            "description": "User id who has created the entity.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:repositoryCreatedBy"
        },
        "repositoryLastModifiedBy": {
            "title": "Modified by User Identifier",
            "type": "string",
            "description": "User id who last modified the entity.\nAt creation time, `modifiedByUser` is set as `createdByUser`.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:repositoryLastModifiedBy"
        },
        "createdByBatchID": {
            "title": "Created by Batch Identifier",
            "type": "string",
            "format": "uri",
            "description": "The Data Set Files in Catalog Services which has been originating the creation of the entity.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:createdByBatchID"
        },
        "modifiedByBatchID": {
            "title": "Modified by Batch Identifier",
            "type": "string",
            "format": "uri",
            "description": "The last Data Set Files in Catalog Services which has modified the entity.\nAt creation time, `modifiedByBatchID` is set as `createdByBatchID`.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:modifiedByBatchID"
        },
        "_repo": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "createDate": {
                    "type": "string",
                    "format": "date-time",
                    "examples": [
                        "2004-10-23T12:00:00-06:00"
                    ],
                    "description": "The server date and time when the resource was created in the repository, such as when an asset file is first uploaded or a directory is created by the server as the parent of a new asset. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                    "meta:xdmType": "date-time",
                    "meta:xdmField": "repo:createDate"
                },
                "lastModifiedDate": {
                    "type": "string",
                    "format": "date-time",
                    "examples": [
                        "2004-10-23T12:00:00-06:00"
                    ],
                    "description": "The server date and time when the resource was most recently modified in the repository, such as when a new version of an asset is uploaded or a directory's child resource is added or removed. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                    "meta:xdmType": "date-time",
                    "meta:xdmField": "repo:lastModifiedDate"
                }
            }
        }
    },
    "id": "context/person",
    "xdmVersion": "0.9.9.5",
    "meta:extends": [
        "external/repo/commmon"
    ],
    "meta:altId": "_xdm.context.person",
    "meta:xdmType": "object",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "context/person"
}
}
```

### PUT - Extend an Existing Schema

When you want to add fields to an existing library schema, the `_customer` keyword will appear after the `id` of the schema you want to extend. This results in an extension of the existing schema with a new set of fields that appear under the extension name.

**API Format**

```
PUT /xdms/{id}/_customer/{new extension name}
```
- `{new extension name}`: The name you want to associate with the fields you are about to add or update. 

**Note:** Your organization can associate fields with different business units, teams, departments, etc. according to your preference. For example, you can have one team add and manage fields under the retail division (using extension name = retail) and another team manage the fields under the web division (using extension name = web).  

**Example Request**

```
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/retail \
  -H "accept: application/json" \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H "content-type: application/json" \
  -d "{
        "type": "object",
        "title": "Custom Retail Fields",
        "description": "My custom fields for my retail division",
        "properties": {
          "storeId": {
            "type": "string"
          },
          "storeAddress": {
            "$ref": "/common/address"
          }
        }
     }"
```

After making the above API request with the provided payload, you will now have a new `_customer.retail` hierarchy and fields added to the `context/person` schema. Anytime you use this `context/person` schema (as a list of fields in a dataset or embedded in another schema), those new fields will be automatically included.  

The code below shows the new response when issuing a GET on the `context/person` schema. Note how there is a new top level field named `_customer` which contains a `retail` section that then includes the new fields that were added. 

When this schema is used in a dataset those new fields are accessed using `_customer.retail.storeId` and `_customer.retail.storeAddress`

**Example Request**

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms?id=context/person \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

**Example Response**
```JSON
{
    "created": 1535749106112,
    "updated": 1535749106112,
    "title": "Person",
    "type": "object",
    "description": "An individual person. May represent a person acting in various roles, such as a customer, contact, or owner.",
    "properties": {
        "name": {
            "title": "Full name",
            "$ref": "context/person-name",
            "description": "The person's full name",
            "meta:xdmField": "xdm:name"
        },
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
        "birthDate": {
            "title": "Birth Date",
            "type": "string",
            "format": "date",
            "description": "The full date a person was born.",
            "meta:xdmType": "date",
            "meta:xdmField": "xdm:birthDate"
        },
        "birthDayAndMonth": {
            "title": "Birth Date",
            "type": "string",
            "pattern": "[0-1][0-9]-[0-9][0-9]",
            "description": "The day and month a person was born, in the format MM-DD. This field should be used when the day and month of a person's birth is known, but not the year.",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:birthDayAndMonth"
        },
        "birthYear": {
            "title": "Birth year",
            "type": "integer",
            "description": "The year a person was born including the century (yyyy, e.g 1983).  This field should be used when only the person's age is known, not the full birth date.",
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
        },
        "repositoryCreatedBy": {
            "title": "Created by User Identifier",
            "type": "string",
            "description": "User id who has created the entity.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:repositoryCreatedBy"
        },
        "repositoryLastModifiedBy": {
            "title": "Modified by User Identifier",
            "type": "string",
            "description": "User id who last modified the entity.\nAt creation time, `modifiedByUser` is set as `createdByUser`.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:repositoryLastModifiedBy"
        },
        "createdByBatchID": {
            "title": "Created by Batch Identifier",
            "type": "string",
            "format": "uri",
            "description": "The Data Set Files in Catalog Services which has been originating the creation of the entity.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:createdByBatchID"
        },
        "modifiedByBatchID": {
            "title": "Modified by Batch Identifier",
            "type": "string",
            "format": "uri",
            "description": "The last Data Set Files in Catalog Services which has modified the entity.\nAt creation time, `modifiedByBatchID` is set as `createdByBatchID`.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:modifiedByBatchID"
        },
        "_repo": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "createDate": {
                    "type": "string",
                    "format": "date-time",
                    "examples": [
                        "2004-10-23T12:00:00-06:00"
                    ],
                    "description": "The server date and time when the resource was created in the repository, such as when an asset file is first uploaded or a directory is created by the server as the parent of a new asset. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                    "meta:xdmType": "date-time",
                    "meta:xdmField": "repo:createDate"
                },
                "lastModifiedDate": {
                    "type": "string",
                    "format": "date-time",
                    "examples": [
                        "2004-10-23T12:00:00-06:00"
                    ],
                    "description": "The server date and time when the resource was most recently modified in the repository, such as when a new version of an asset is uploaded or a directory's child resource is added or removed. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                    "meta:xdmType": "date-time",
                    "meta:xdmField": "repo:lastModifiedDate"
                }
            }
        },
        "_customer": {
            "type": "object",
            "properties": {
                "retail": {
                    "version": "number",
                    "created": "number",
                    "updated": "number",
                    "createdClient": "{API_KEY}",
                    "updatedUser": "string",
                    "imsOrg": "{imsOrg}@AdobeOrg",
                    "extNamespace": "retail",
                    "title": "Custom Retail Fields",
                    "type": "object",
                    "description": "My custom fields for my retail division",
                    "properties": {
                        "storeId": {
                            "type":"string",
                            "meta:xdmType": "string"
                        },
                        "storeAddress": {
                            "$ref": "common/address",
                            "meta:xdmField": "xdm:address"
                        }
                    }
                }
            }
        }
    },
    "id": "context/person",
    "xdmVersion": "0.9.9.5",
    "meta:extends": [
        "external/repo/commmon"
    ],
    "meta:altId": "_xdm.context.person",
    "meta:xdmType": "object",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "context/person"
}
```

### PUT - Create a New Schema

If an existing schema is not available to start from, you can always create a new schema. This is similar to extending a schema, but in this case the fields you are adding are part of a completely new schema. 

In this scenario, `_customer` follows immediately after `/xdms/` because you are no longer starting with an existing schema; you are defining something completely new. 

**API Format**

```
PUT /xdms/_customer/{id}
```

- `{id}`: In the examples above, schema identifiers were referenced above using an `id` consisting of a directory and name (`context/person`). When creating a new schema, you can create a directory of your own. This is similar to the `<new extension name>` used in the example above, which you would then combine with the new schema name that you are defining (eg. `retail/store`).

The payload for this request is a JSON Schema object that represents your new schema and is able to use simple scalar field types (string, number, etc.) or fields that act as an entry point into a more complex embedded schema that you reference (using `$ref`).  

**Example Request**

```
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/retail/store \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
  -d "{
        "type": "object",
        "description": "My custom fields for my retail division",
        "title": "Custom Retail Fields",
        "properties": {
          "storeId": {
            "type": "string"
          },
          "storeAddress": {
            "$ref": "/common/address"
          }
        }
      }
```

Once the schema is created, you can use it like any other schema. You can create datasets based on that schema, or reference it within other schemas. In either case, this new schema will have a path just like the one used to create it.

In the above example, the request to view your newly created schema would be:

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/retail/store \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

In order to embed that schema in another schema, the reference would be:

```
"$ref": "/_customer/retail/store"
```

## Appendix: Defining XDM Field Types in the API

As shown in the examples above, schemas are defined using JSON Schema standards and basic field types. XDM allows you to define additional field types through the use of formats and optional constraints. The XDM field types are exposed by the field-level attribute, "meta:xdmType".

The following table outlines the appropriate formatting to define scalar field types and more specific field types using optional properties. More information regarding optional properties and type-specific keywords is available through the [JSON Schema Documentation](https://json-schema.org/understanding-json-schema/reference/type.html).

To begin, find the desired field type and use the sample code provided to build your API request. 

<table>
<tr>
<th width="100px">Desired Type<br/>(meta:xdmType)</th>
<th width="100px">JSON Schema Field Type</th>
<th width="150px">Range</th>
<th width="150px">Optional Properties</th>
<th width="350px">Code Sample</th>
</tr>
<tr>
<td>string</td>
<td>string</td>
<td>unlimited</td>
<td>
<ul>
<li>pattern</li>
<li>minLength</li>
<li>maxLength</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "string",
    "pattern": "^[A-Z]{2}$",
    "maxLength": 2
}
</pre>
</tr>
<tr>
<td>uri<br/>
(meta:xdmType: string)</td>
<td>string</td>
<td>unlimited</td>
<td>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "string",
    "format": "uri"
}
</pre>
</tr>
<tr>
<td>enum<br/>
(meta:xdmType: string)</td>
<td>string</td>
<td>unlimited</td>
<td>
<ul>
<li>default</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "string",
    "enum": [
        "value1",
        "value2",
        "value3"
    ],
    "meta:enum": {
        "value1": "Value 1",
        "value2": "Value 2",
        "value3": "Value 3"
    },
    "default": "value1"
}
</pre>
 Specify customer-facing option labels using "meta:enum".
</tr>
<tr>
<td>number</td>
<td>number</td>
<td>±2.23×10^308<br/>±1.80×10^308</td>
<td>
<ul>
<li>minimum</li>
<li>maximum</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "number"
}
</pre>
</tr>  
<tr>
<td>long</td>
<td>integer</td>
<td>min: -2^53 + 1<br/>max: 2^53 + 1</td>
<td>
<ul>
<li>minimum</li>
<li>maximum</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "integer",
    "minimum": -9007199254740992,
    "maximum": 9007199254740992
}
</pre>
</tr> 
<tr>
<td>int</td>
<td>integer</td>
<td>min: -2^31 <br/>max: 2^31</td>
<td>
<ul>
<li>minimum</li>
<li>maximum</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "integer",
    "minimum": -2147483648,
    "maximum": 2147483648
}
</pre>
</tr> 
<tr>
<td>short</td>
<td>integer</td>
<td>min: -2^15 <br/>max: 2^15</td>
<td>
<ul>
<li>minimum</li>
<li>maximum</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "integer",
    "minimum": -32768,
    "maximum": 32768
}
</pre>
</tr> 
<tr>
<td>byte</td>
<td>integer</td>
<td>min: -2^7 <br/>max: 2^7</td>
<td>
<ul>
<li>minimum</li>
<li>maximum</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "integer",
    "minimum": -128,
    "maximum": 128
}
</pre>
</tr> 
<tr>
<td>boolean</td>
<td>boolean</td>
<td>{true, false}</td>
<td>
<ul>
<li>default</li>
</ul>
</td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "boolean",
    "default": false
}
</pre>
</tr> 
<tr>
<td>date</td>
<td>string</td>
<td>unlimited</td>
<td></td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "string",
    "format": "date",
    "examples": [
        "2004-10-23"
    ],
}
</pre>
Date as defined by <a href="https://tools.ietf.org/html/rfc3339#section-5.6" target="_blank">RFC 3339, section 5.6</a>, where "full-date" = date-fullyear "-" date-month "-" date-mday (YYYY-MM-DD)
</tr>
</tr> 
<tr>
<td>date-time</td>
<td>string</td>
<td>unlimited</td>
<td></td>
<td>
<pre lang="JSON">
"sampleField": {
    "type": "string",
    "format": "date-time",
    "examples": [
      "2004-10-23T12:00:00-06:00"
    ],
}
</pre>
Date-Time as defined by <a href="https://tools.ietf.org/html/rfc3339#section-5.6" target="_blank">RFC 3339, section 5.6</a>, where "date-time" = full-date "T" full-time 
</tr>
<tr>
<td>array</td>
<td>array</td>
<td></td>
<td></td>
<td>
<pre lang="JSON">
"sampleField": {
  "type": "array",
  "items": {
    "type": "string"
  }
}
</pre>
items.type can be defined using any scalar type.
</tr>
<tr>
<td>array</td>
<td>array</td>
<td></td>
<td></td>
<td>Array of objects defined by another schema:<br/>
<pre lang="JSON">
"sampleField": {
  "type": "array",
  "items": {
    "$ref": "id"
  }
}
</pre>
Where "id" is the {id} of the reference schema.
</tr>
<tr>
<td>object</td>
<td>object</td>
<td></td>
<td></td>
<td>
<pre lang="JSON">
"sampleField": {
  "type": "object",
  "properties": {
    "field1": {
      "type": "string"
    },
    "field2": {
      "type": "number"
    } 
  }
}
</pre>
properties.{field}.type can be defined using any scalar type.
</tr>
<tr>
<td>object</td>
<td>object</td>
<td></td>
<td></td>
<td>Field of type "object" that is defined by a reference schema:
<pre lang="JSON">
"sampleField": {
  "type": "object",
  "$ref": "id"
  }
}
</pre>
Where "id" is the {id} of the reference schema.
</tr>
</table>
