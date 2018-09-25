# Adobe Cloud Platform: Schema Registry Developer Guide

## Overview

This developer guide provides an introduction to the Schema Registry (aka XDM Registry) and outlines the steps necessary to perform the following actions via the Schema Registry API:

- View a list of existing schemas
- View a specific schema
- Extend an existing schema
- Add fields to an extension
- Create and update a new schema
- View schema descriptors
- Create, update, and delete schema descriptors

## Schema Registry

The Schema Registry is used to access the Schema Library within Adobe Cloud Platform (ACP), providing a User Interface and RESTful API from which all available schemas are discoverable.

### Using the Schema Registry API

Using the Schema Registry API, you are able to perform basic CRUD operations against the Schema Library in order to view, manage, and extend all schemas available to you within Adobe Cloud Platform. This includes those defined by Adobe, platform partners, and vendors whose applications you use. You can also use API calls to view and edit schemas that you have defined, as well as create new schemas for your organization.

### XDM Compatibility Mode

[Experience Data Model](https://www.adobe.io/open/standards/xdm.html) (XDM) is a publicly documented specification, driven by Adobe to improve the interoperability, expressiveness, and power of digital experiences. Adobe maintains the source code and formal XDM definitions in an open source project on [GitHub](https://github.com/adobe/xdm/). These definitions are written in XDM Standard Notation, using JSON-LD in addition to JSON Schema as the grammar for defining XDM schemas. 

When looking at formal XDM definitions in the public repository, you can see that standard XDM differs from what you see in Adobe Cloud Platform. What you are seeing in ACP is called Compatibility Mode, and it provides a simple mapping between standard XDM and the way it is used within platform.

#### How Compatibility Mode Works

Compatibility Mode allows the XDM JSON-LD model to work with existing data infrastructure by altering values within standard XDM while keeping the semantics the same. It uses a nested JSON structure, displaying schemas in a tree-like format.

The main difference you will notice between standard XDM and Compatibility Mode is that IDs (`id`) and references to schemas (`$ref`) are shorter, primarily due to the difficulties that some systems have with handling periods (".") and URIs. (Details regarding `id` and `$ref` are outlined below.)

For example, the following is a side-by-side comparison of a snippet from the "Person" schema, showing the XDM field "name" in both standard XDM and Compatibility Mode:

<table>
<th>Standard XDM</th>
<th>Compatibility Mode</th>
<tr>
<td>
<pre class="JSON language-JSON hljs">
"xdm:name": {
  "title": "Full name",
  "$ref": 
    "https://ns.adobe.com/xdm/context/person-name",
  "description": "The person's full name"
}
</pre>
</td>
<td>
<pre class="JSON language-JSON hljs">
"name": {
  "title": "Full name",
  "$ref": "context/person-name",
  "description": "The person's full name",
  "meta:xdmField": "xdm:name"
}
</pre>
</td>
</tr>
</table>

#### Why Do We Need Compatibility Mode?

Adobe Cloud Platform is designed to work with multiple solutions and services, each with their own technical challenges and limitations (such as how certain technologies handle special characters). In order to overcome these limitations, Compatibility Mode was developed.

Most platform services including Catalog, Data Lake, and Unified Profile Service use Compatibility Mode in lieu of standard XDM. The Schema Registry API also uses Compatibility Mode, and the examples in this document are all shown using Compatibility Mode.

It is worthwhile to know that a mapping takes place between standard XDM and the way it is operationalized in ACP, but it should not affect your use of platform services. 

The open source project is available to you as a resource, but when it comes to interacting with standard schemas through the Schema Registry, the API examples below and the UI steps outlined in the [Using Standard Schemas with Adobe Cloud Platform](acp_standard_schemas.md) document provide the best practices that you will need to know and follow.

### Identifying and Referencing Schemas

A schema identifier is represented by its `id` attribute. This attribute also represents the id of the schema within the Schema Registry. The GET request below for viewing all XDM Schemas returns a list of schemas and their paths.

For example, the `Person` schema is located in the namespace `context` so it has an `id` value of `context/person`. Understanding this path is important as this is how you will interact with the schemas via the API.

### Understanding the `_customer` Keyword

Some of the API calls include the `_customer` keyword. `_customer` is a short-hand representation of your IMS Organization. Instead of needing to enter your full IMS Org for every call, you will use `_customer` instead. `_customer` represents the unique `customer` section that every Adobe provided schema can have. Behind the scenes, the schema registry converts `_customer` and stores everything under your IMS Org. 

Within the registry, you have access to all of your `_customer` extensions and schemas. You do not see `_customer` extensions or schemas from other organizations, nor do they see yours.

## Sample API Calls

Below are examples of basic schema registry API calls to view (GET) all XDM schemas, view (GET) a specific schema, update (PUT) an existing schema, create (PUT) a new schema, and update (PUT) that new schema.

A full list of available API calls can be found in the [RESTful API Resource](https://www.adobe.io/apis/cloudplatform/dataservices/api-reference.html) documentation.

### GET - View all XDM Schemas

As mentioned above, you can view a list of all defined XDM schemas through a single API call. This allows you to find the `id` for each schema, and includes any schemas that you have defined or extensions that you have made. 

##### API Format

```
GET /xdms
```

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

- `{ACCESS_TOKEN}`: Token provided after authentication  
- `{API_KEY}`: Your specific API key for your unique ACP integration (available via [Adobe Console](https://console.adobe.io))
- `{IMS_ORG}`: The IMS Organization credentials for your unique ACP integration


##### Response

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
            "@/xdms/_customer/example/exampleschema",
            "@/xdms/_customer/example/exampleschema2"
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

Viewing a specific schema definition in its JSON Schema form requires a single GET request to the schema path. The following example shows how to perform a GET request for a specific schema. 

Sample requests and responses for two of the most commonly used schema, [Profile](#profileschema) and [ExperienceEvent](#experienceeventschema), are included at the end of this document.

##### API Format

```
GET /xdms?id={id}
```

##### Request

The following request will return the `Person` schema in JSON format, with all attributes of the schema located under `properties`.

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms?id=context/person \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```


##### Response

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

### Defining a Field

In the `Person` schema above, the fields of the schema are listed within the `properties` object. Each field is itself an object, containing additional fields to describe and constrain the data that the field can contain. Below is a sample field outlining some best practices for field definitions.

```JSON
"fieldName": {
    "title": "Field Name",
    "type": "string",
    "format": "date-time",
    "examples": [
        "2004-10-23T12:00:00-06:00"
    ],
    "description": "Full sentence describing the field, using proper grammar and punctuation.",
}
```

1. The name for the field object is written in camelCase. Example: `"fieldName"`
1. The field should include a `"title"`, written in Title Case. Example: `"Field Name"`
1. The field requires a `"type"`.  
a. Defining certain types may require an optional `"format"`.   
b. Where a specific formatting of data is required, `"examples"` can be added as an array.
1. The `"description"` explains the field and pertinent information regarding field data. It should be written in full sentences with clear language so that anyone accessing the schema can understand the intention of the field.

More information about [defining field types in the API](#definingxdmfieldtypesintheapi) can be found later in this document, including code samples and optional constraints for the most commonly used field types.

### PUT - Extend an Existing Schema

Adobe Cloud Platform provides a wide assortment of standard schemas, but there will be times when you need to express non-standard data unique to your organization. This can be done by extending an existing schema, meaning that you can add custom fields for personalized data.

When you want to add fields to an existing library schema, the `_customer` keyword will appear after the `id` of the schema you want to extend. This results in an extension of the existing schema with a new set of fields that appear under the extension name that you specify.

##### API Format

```
PUT /xdms/{id}/_customer/{new extension name}
```

- `{new extension name}`: The name you want to associate with the fields you are about to add or update.<br/>
**Note:** Your organization can associate fields with different business units, teams, departments, etc. according to your preference. For example, you can have one team add and manage fields under the retail division (using extension name = retail) and another team manage the fields under the web division (using extension name = web).  

##### Request

After making the API request below with the provided payload, a new `_customer.retail` hierarchy and fields will be added to the `context/person` schema. Anytime you use this `context/person` schema (as a list of fields in a dataset or embedded in another schema), those new fields will be automatically included.  

```
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/retail \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'content-type: application/json' \
  -d '{
        "type": "object",
        "title": "Retail Fields",
        "description": "Custom fields for retail division",
        "properties": {
          "homeStoreId": {
            "title": "Home Store ID",
            "type": "string",
            "description": "Unique ID of the individual's home store."
          },
          "loyaltyMember": {
            "title": "Loyalty Program Member",
            "type": "boolean",
            "default": false,
            "description": "Is this individual a member of the Loyalty Program?"
          }
        }
     }'
```

**Note:** All requests with a payload in the request body, must include the header `Content-Type: application/json` as shown above.

#### Response

The response to the above request shows the path for the schema extension:

```
[
    "@/xdms/context/person/_customer/retail"
]
```

### GET - View Updated Schema

The code below shows the new response when issuing a GET request for the `context/person` schema. You'll notice that there is a new top level field named `_customer` which contains a `retail` section that then includes the new fields that were added. 

When this schema is used in a dataset those new fields are accessed using `_customer.retail.homeStoreId` and `_customer.retail.loyaltyMember`.

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms?id=context/person \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

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
                    "version": 1,
                    "created": 1536339393556,
                    "updated": 1536692324963,
                    "createdClient": "{API_KEY}",
                    "updatedUser": "{API_KEY}@AdobeID",
                    "imsOrg": "{imsOrg}",
                    "extNamespace": "retail",
                    "title": "Retail Fields",
                    "type": "object",
                    "description": "Custom fields for retail division",
                    "properties": {
                        "homeStoreId": {
                            "title": "Home Store ID",
                            "type": "string",
                            "description": "Unique ID of the individual's home store.",
                            "meta:xdmType": "string"
                        },
                        "loyaltyMember": {
                            "title": "Loyalty Program Member",
                            "type": "boolean",
                            "default": false,
                            "description": "Is this individual a member of the Loyalty Program?",
                            "meta:xdmType": "boolean"
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

### Add Fields to an Extension

After an extension has been defined, you may wish to add additional fields to that same extension at a later date. This can be done via the API.

In order to add fields to an extension, you will need to issue two requests to the API. First, you will issue a GET request for the existing extension, then you will issue a PUT request with the extension fields (existing + new) as the payload.

The example below outlines the two-step process for adding fields to the `_customer.retail` extension that we made above to the `Person` standard schema.

#### GET - View the Extension

The first step is to issue a GET request to view the extension as it exists currently.

##### API Format

```
GET /xdms/{id}/_customer/{extension name}
```

- `{extension name}`: The name of the extension you want to add fields to.<br/>
**Note:** Your organization may have multiple extensions within the `_customer` section of a standard schema. It is important to perform a GET on the specific extension that you wish to add fields to. 

##### Request

The following request returns `_customer.retail` in JSON format, with all attributes of the extension located under `properties`.

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/retail \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

```JSON
{
    "version": "1",
    "created": 1536339393556,
    "updated": 1536339393556,
    "createdClient": "{string}",
    "updatedUser": "{string}@AdobeID",
    "imsOrg": "{IMS_ORG}",
    "extNamespace": "retail",
    "type": "object",
    "title": "Retail Fields",
    "description": "Custom fields for retail division",
    "properties": {
        "homeStoreId": {
            "title": "Home Store ID",
            "type": "string",
            "description": "Unique ID of the individual's home store.",
            "meta:xdmType": "string"
        },
        "loyaltyMember": {
            "title": "Loyalty Program Member",
            "type": "boolean",
            "default": false,
            "description": "Is this individual a member of the Loyalty Program?",
            "meta:xdmType": "boolean"
        }
    }
}
```

#### PUT - Add Fields to the Extension

After confirming that the response from the GET request is the correct extension, you can now add fields to the extension and issue a PUT request.

**Note:** This PUT request is essentially _re-writing_ the existing extension, so it is important that the payload of your PUT request include **ALL** of the fields (old and new) that you wish to have included in the extension.

##### API Format

```
PUT /xdms/{id}/_customer/{extension name}
```

##### Request

The request includes the fields that were previously defined (`"homeStoreId"` and `"loyaltyMember"`), as well as two new fields (`"loyaltyLevel"` and `"loyaltyJoinDate"`) to be added to the extension.

```
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/retail \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'content-type: application/json' \
  -d '{
        "type": "object",
        "title": "Retail Fields",
        "description": "Custom fields for retail division",
        "properties": {
          "homeStoreId": {
            "title": "Home Store ID",
            "type": "string",
            "description": "Unique ID of the individual's home store."
          },
          "loyaltyMember": {
            "title": "Loyalty Program Member",
            "type": "boolean",
            "default": false,
            "description": "Is this individual a member of the Loyalty Program?"
          },
          "loyaltyLevel": {
              "title": "Loyalty Program Membership Level",
              "type": "string",
              "description": "Current membership level within the Loyalty Program."
          },
          "loyaltyJoinDate": {
              "title": "Loyalty Program Join Date",
              "type": "string",
              "format": "date",
              "description": "Date individual joined the Loyalty Program."
          }
        }
     }'
```

##### Response

The response to the above request shows the path for the schema extension:

```
[
    "@/xdms/context/person/_customer/retail"
]
```

#### GET - View the Updated Extension

Now that the fields have been added, performing a GET request on the `Person` schema will show the updated `_customer.retail` extension. You can also issue a GET request directly on the extension to see the updated fields, as shown below.

##### API Format

```
GET /xdms/{id}/_customer/{extension name}
```

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/retail \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

```JSON
{
    "type": "object",
    "title": "Retail Fields",
    "description": "Custom fields for retail division",
    "properties": {
        "homeStoreId": {
            "title": "Home Store ID",
            "type": "string",
            "description": "Unique ID of the individual's home store.",
            "meta:xdmType": "string"
        },
        "loyaltyMember": {
            "title": "Loyalty Program Member",
            "type": "boolean",
            "default": false,
            "description": "Is this individual a member of the Loyalty Program?",
            "meta:xdmType": "boolean"
        },
        "loyaltyLevel": {
            "title": "Loyalty Program Membership Level",
            "type": "string",
            "description": "Current membership level within the Loyalty Program.",
            "meta:xdmType": "string"
        },
        "loyaltyJoinDate": {
            "title": "Loyalty Program Join Date",
            "type": "string",
            "format": "date",
            "description": "Date individual joined the Loyalty Program.",
            "meta:xdmType": "string"
        }
    },
    "extNamespace": "retail",
    "version": "2",
    "created": 1536339393556,
    "updated": 1536692324963,
    "createdClient": "{string}",
    "updatedUser": "{string}@AdobeID",
    "imsOrg": "{IMS_ORG}"
}
```

### PUT - Create a New Schema

If an existing schema is not available to start from, you can always create a new schema. This is similar to extending a schema, but in this case the fields you are adding are part of a completely new schema. 

An example of this would be if a travel company wanted a schema to store data for flights. Since there is no existing `Flights` schema, it would make sense to create a new one. Within the schema, information such as Flight ID, Flight Number, and Carrier will be stored.

The API call below shows how to define this new schema and its fields.

##### API Format

In this scenario, `_customer` follows immediately after `/xdms/` because you are no longer starting with an existing schema; you are defining something completely new.

```
PUT /xdms/_customer/{id}
```

- `{id}`: In the earlier examples, schema identifiers were referenced above using an `id` consisting of a path (`context/person`). When creating a new schema, you can create a directory of your own (similar to the `<new extension name>` used in the example above), which you would then combine with the new schema name that you are defining. For example, the new `Flights` schema will be maintained by the travel company's web team, so the path will be `web/flights`.  
  
**API vs UI:** The API allows you to define your own extension names as noted above. These schema will appear alongside all other schemas in the UI, with no discernible difference between them. When defining a schema in the UI, you will be directed to create your schema within the `default` extension, making it part of the `_customer.default` hierarchy. For better control over extension names (such as defining schema for "retail" and "web" teams), we recommend using the API when defining schemas.

##### Request

```
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/web/flights \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'content-type: application/json' \
  -d '{ 
        "title": "Flights", 
        "type": "object", 
        "description": "Data for all available flights.", 
        "properties": { 
          "flightId": { 
            "title": "Flight ID",
            "type": "string", 
            "description": "The unique ID of the flight."
          }, 
          "flightNumber": { 
            "title": "Flight Number",
            "type": "string", 
            "description": "Flight Number provided by the carrier." 
          }, 
          "carrier": { 
            "title": "Carrier",
            "type": "string", 
            "description": "Name of the flight carrier." 
          },
          "carrierAddress": {
            "title": "Carrier Address",
            "description": "Address of the flight carrier.",
            "$ref": "/common/address"
          }
        }
      }'
```

The payload for this request is a JSON Schema object that represents your new schema and is able to use simple scalar field types (string, number, etc.) or fields that act as an entry point into a more complex embedded schema that you reference (using `$ref`). 

##### Response

The response to the above request shows the path to the newly created schema

```
[
    "@/xdms/_customer/web/flights"
]
```

### Using the New Schema

Once the schema is created, you can use it like any other schema. You can create datasets based on that schema, or reference it within other schemas. 

In either case, this new schema can be accessed by the path provided in the response above.

##### Request

The GET request to view your newly created schema would be:

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/web/flights \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Reference

In order to embed that schema in another schema, the reference would be:

```
"$ref": "/_customer/web/flights"
```

### Add Fields to the New Schema

After defining a new schema, you may find that you need to add additional fields to it. This can be done through the API following steps similar to those required for adding fields to an extension.

Adding fields to a new schema requires two requests to the API. The first request is to GET the schema in JSON format, the second request is a PUT with all of the schema fields (existing + new) as the payload.

The example below outlines the two-step process for adding new fields to the `Flights` schema we defined above.

#### GET - View the Schema

The first step is to issue a GET request to view the schema as it exists currently.

##### API Format

```
GET /xdms/_customer/{id}
```

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/web/flights \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

```JSON
{
    "title": "Flights",
    "type": "object",
    "description": "Data for all available flights.",
    "properties": {
        "flightId": {
            "title": "Flight ID",
            "type": "string",
            "description": "The unique ID of the flight.",
            "meta:xdmType": "string"
        },
        "flightNumber": {
            "title": "Flight Number",
            "type": "string",
            "description": "Flight Number provided by the carrier.",
            "meta:xdmType": "string"
        },
        "carrier": {
            "title": "Carrier",
            "type": "string",
            "description": "Name of the flight carrier.",
            "meta:xdmType": "string"
        },
        "carrierAddress": {
            "title": "Carrier Address",
            "description": "Address of the flight carrier.",
            "$ref": "common/address"
        }
    },
    "extNamespace": "web",
    "imsOrg": "{IMS_ORG}",
    "createdClient": "{string}",
    "updatedUser": "{string}@AdobeID",
    "version": "1",
    "created": 1536692957370,
    "updated": 1536692957370,
    "id": "_customer/web/flights",
    "meta:altId": "_customer.web.flights",
    "$id": "_customer/web/flights"
}
```

#### PUT - Add Fields to the Schema

After confirming that the response from the GET request is the correct schema, you can now add fields to the schema and issue a PUT request.

**Note:** This PUT request is essentially _re-writing_ the schema, so it is important that the payload of your PUT request include **ALL** of the fields (old and new) that you wish to have included in the schema.

##### API Format

```
PUT /xdms/_customer/{id}
```

##### Request

The request includes the fields that were previously defined (`flightId`, `flightNumber`, `carrier`, and `carrierAddress`), as well as two new fields (`carrierPhone` and `carrierEmail`) to be added to the schema.

```
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/web/flights \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'content-type: application/json' \
  -d '{ 
        "title": "Flights", 
        "type": "object", 
        "description": "Data for all available flights.", 
        "properties": { 
          "flightId": { 
            "title": "Flight ID",
            "type": "string", 
            "description": "The unique ID of the flight."
          }, 
          "flightNumber": { 
            "title": "Flight Number",
            "type": "string", 
            "description": "Flight Number provided by the carrier." 
          }, 
          "carrier": { 
            "title": "Carrier",
            "type": "string", 
            "description": "Name of the flight carrier." 
          },
          "carrierAddress": {
            "title": "Carrier Address",
            "description": "Address of the flight carrier.",
            "$ref": "/common/address"
          },
          "carrierPhone": {
            "title": "Carrier Phone Number",
            "description": "Phone Number of the carrier.",
            "$ref": "/context/phonenumber"
          },
          "carrierEmail": {
            "title": "Carrier Email Address",
            "description": "Email address of the carrier.",
            "$ref": "/context/emailaddress"
          }
        }
      }'
```

##### Response

The response to the above request shows the path for the schema:

```
[
    "@/xdms/context/person/_customer/web/fights"
]
```

#### GET - View the Updated Schema

Now that the fields have been added, you can view the updated schema by issuing a GET request on the `Flights` schema. 

##### API Format

```
GET /xdms/_customer/{id}
```

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/web/flights \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

```JSON
{
    "title": "Flights",
    "type": "object",
    "description": "Data for all available flights.",
    "properties": {
        "flightId": {
            "title": "Flight ID",
            "type": "string",
            "description": "The unique ID of the flight.",
            "meta:xdmType": "string"
        },
        "flightNumber": {
            "title": "Flight Number",
            "type": "string",
            "description": "Flight Number provided by the carrier.",
            "meta:xdmType": "string"
        },
        "carrier": {
            "title": "Carrier",
            "type": "string",
            "description": "Name of the flight carrier.",
            "meta:xdmType": "string"
        },
        "carrierAddress": {
            "title": "Carrier Address",
            "description": "Address of the flight carrier.",
            "$ref": "common/address"
        },
        "carrierPhone": {
            "title": "Carrier Phone Number",
            "description": "Phone Number of the carrier.",
            "$ref": "context/phonenumber"
        },
        "carrierEmail": {
            "title": "Carrier Email Address",
            "description": "Email address of the carrier.",
            "$ref": "context/emailaddress"
        }
    },
    "extNamespace": "web",
    "version": "2",
    "created": 1536692957370,
    "updated": 1536693460042,
    "createdClient": "{string}",
    "updatedUser": "{string}@AdobeID",
    "imsOrg": "{IMS_ORG}",
    "id": "_customer/web/flights",
    "meta:altId": "_customer.web.flights",
    "$id": "_customer/web/flights"
}
```

## Schema Descriptors

Schemas define a static view of data entities, but do not provide specific details on how data based on these schemas (datasets, etc) may relate to one another. Adobe Cloud Platform allows you to describe these relationships and other interpretive metadata about a schema using descriptors. Schema descriptors are unique to your IMS Organization, meaning that other organizations will not see the descriptors that you define, nor will you see theirs.

Each schema can have one or more schema descriptor entities applied to it. Each schema descriptor entity includes a descriptor type and the `sourceSchema` to which it applies. Once applied, these descriptors will apply to all datasets that are described by the related schemas.

### Descriptor Types

All descriptors are described using the base SchemaDescriptor schema. The base can be extended by the RelationshipDescriptor or UpdatePolicyDescriptor schemas to add additional properties needed when defining certain types of descriptors.

The following table provides an overview of available descriptors, and details regarding proper API usage are outlined in subsequent sections below.

<table>
<tr>
<th>@type</th>
<th width="200px">Description</th>
<th>Fields</th>
<th width="650px">Code Sample</th>
</tr>

<tr>
<td colspan=4><strong>SchemaDescriptor</strong></td>
</tr>

<tr>
<td>xdm:descriptorPrimaryKey</td>
<td>Signals that the sourceProperty of the sourceSchema may be used as a primary key for data based on the schema.</td>
<td><strong>Required:</strong>
<ul>
<li>xdm:sourceSchema</li>
<li>xdm:sourceProperty</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
{<br/>
"@type":"xdm:descriptorPrimaryKey",
"xdm:sourceSchema":"_customer/retail/geography",
"xdm:sourceProperty":"/geographyId"<br/>
}
</pre>
</td>
</tr>

<!-- <tr>
<td>xdm:descriptorInstantiable</td>
<td>Signals that a schema may be instantiated as a dataset. (Some schemas are intended mainly to be composed in other, instantiable schemas.)</td>
<td><strong>Required:</strong>
<ul>
<li>xdm:sourceSchema</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
{<br/>
"@type":"xdm:descriptorInstantiable",
"xdm:sourceSchema":"model/Profile"<br/>
}
</pre>
</td>
</tr> -->

<tr>
<td colspan=4><strong>RelationshipDescriptor</strong></td>
</tr>

<tr>
<td>xdm:descriptorOneToOne</td>
<td>Describes a one to one relationship between two schemas, keyed on the properties described in "sourceProperty" and "destProperty".</td>
<td><strong>Required:</strong>
<ul>
<li>xdm:sourceSchema</li>
<li>xdm:sourceProperty</li>
<li>xdm:destSchema</li>
<li>xdm:destProperty</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
{<br/>
"@type":"xdm:descriptorOneToOne",
"xdm:sourceSchema":"_customer/retail/geography",
"xdm:sourceProperty":"/geographyId",
"xdm:destSchema":"core/Organization",
"xdm:destProperty":"/id"<br/>
}
</pre>
</td>
</tr>

<tr>
<td>xdm:descriptorOneToMany</td>
<td>Describes a one to many relationship between two schemas, keyed on the properties described in "sourceProperty" and "destProperty".</td>
<td><strong>Required:</strong>
<ul>
<li>xdm:sourceSchema</li>
<li>xdm:sourceProperty</li>
<li>xdm:destSchema</li>
<li>xdm:destProperty</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
{<br/>
"@type":"xdm:descriptorOneToMany",
"xdm:sourceSchema":"_customer/loyalty",
"xdm:sourceProperty":"/programLevel",
"xdm:destSchema":"_customer/retail",
"xdm:destProperty":"/loyaltyLevel"<br/>
}
</pre>
</td>
</tr>

<tr>
<td>xdm:descriptorManyToMany</td>
<td>Describes a many to many relationship between two schemas, keyed on the properties described in "sourceProperty" and "destProperty".</td>
<td><strong>Required:</strong>
<ul>
<li>xdm:sourceSchema</li>
<li>xdm:sourceProperty</li>
<li>xdm:destSchema</li>
<li>xdm:destProperty</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
{<br/>
"@type":"xdm:descriptorManyToMany",
"xdm:sourceSchema":"_customer/web/flights",
"xdm:sourceProperty":"/flightId",
"xdm:destSchema":"context/person",
"xdm:destProperty":"/_customer/properties/flights/properties/bookedFlights"<br/>
}
</pre>
</td>
</tr>

<tr>
<td colspan=4><strong>UpdatePolicyDescriptor</strong></td>
</tr>

<tr>
<td>xdm:updatePolicy</td>
<td>Describes how data of this schema type should be updated/merged when new data arrives.</td>
<td><strong>Required:</strong>
<ul>
<li>xdm:sourceSchema</li>
<li>xdm:updatePolicy</li>
</ul>
<strong>Values for xdm:updatePolicy:</strong>
<ul>
<li>"xdm:updateMerge" - Merge rules should be applied to rollup the new data with any existing data.</li>
<li>"xdm:updateReplace" - This data should always replace existing data if it exists.</li>
<li>"xdm:updateTimeSeries" - This is time series data, and should be stored incrementally, not updated or rolled up.</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
{<br/>
"@type":"xdm:updatePolicy",
"xdm:sourceSchema":"_customer/web/sitevisits",
"xdm:updatePolicy":"xdm:updateTimeSeries"<br/>
}
</pre>
<p>In the case of "xdm:updateMerge" and "xdm:updateReplace", existing data is identified via the primary key. Specifying a primary key and declaring an update policy must occur in two separate API calls as shown here:</p>

<strong>Call 1:</strong>
<pre class="JSON language-JSON hljs">
{

"@type":"xdm:descriptorPrimaryKey",
"xdm:sourceSchema":"_customer/retail/geography",
"xdm:sourceProperty":"/geographyId"

}
</pre>

<strong>Call 2:</strong>
<pre class="JSON language-JSON hljs">
{ 

"@type":"xdm:updatePolicy",
"xdm:sourceSchema":"_customer/retail/geography",
"xdm:updatePolicy":"xdm:updateReplace"

}
</pre>
</td>
</tr>

</table>



### GET - View all Descriptors

A single API call will allow you to view all existing descriptors within your organization.

##### API Format

```
GET /descriptors 
```

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/descriptors/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

If descriptors exist, the response is an array of objects, with one object for each `descriptorType` that exists within your organization (in other words, if you have not declared any `schema` descriptors, you would not see a `"descriptorType": "schema"` object). 

The `descriptors` array inside each object lists the paths to each individual descriptor of that type. The descriptors are shown in the format `@/descriptors/{id}`. There is more information about accessing individual descriptors by their `{id}` below.

```JSON
[
    {
        "descriptorType": "relationship",
        "descriptors": [
            "@/descriptors/0e409ec2e96e44e9bbca5732148915338d3c0d91"
        ]
    },
    {
        "descriptorType": "schema",
        "descriptors": [
            "@/descriptors/9801b0d39c2760ef4916a957f4b902a812a13262",
            "@/descriptors/b257fb10f5453b018cace7f590060d443e8a3634",
            "@/descriptors/cad834fda456c83af814f2b598213ac6ba838d78"
        ]
    },
    {
        "descriptorType": "updatePolicy",
        "descriptors": [
            "@/descriptors/3875cc1927e746e496cc2206f24e1567f46d7fb5"
        ]
    }
]
```

#### Query Parameters

To further refine your GET request, you can include one or more query parameter filters. Current supported filters include: type, sourceSchema, destSchema.

##### API Examples

```
GET /descriptors?type=string&sourceSchema=directory/schema&destSchema=directory/schema2
```
##### Additional examples and possible query parameter combinations:
```
GET /descriptors?descriptorType=relationship
GET /descriptors?sourceSchema=_customer/web/flights
GET /descriptors?destSchema=context/person
GET /descriptors?type=relationship&sourceSchema=_customer/web/flights&destSchema=context/person
```

##### Request

```
curl -X GET \
  'https://platform.adobe.io/data/foundation/catalog/descriptors?descriptorType=schema' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

The response to the above request will limit the results to only those descriptors with a `descriptorType` of `schema`. The descriptors are still shown as items in an array, using the format `@/descriptors/{id}`.

```JSON
[
    {
        "descriptorType": "schema",
        "descriptors": [
            "@/descriptors/9801b0d39c2760ef4916a957f4b902a812a13262",
            "@/descriptors/b257fb10f5453b018cace7f590060d443e8a3634",
            "@/descriptors/cad834fda456c83af814f2b598213ac6ba838d78"
        ]
    }
]
```

### GET - View Individual Descriptor

If you wish to view the details of an individual descriptor, and know its `{id}`, you can issue a GET request to return the individual descriptor in JSON format.

##### API Format

```
GET /descriptors/{id}
```

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/descriptors/b257fb10f5453b018cace7f590060d443e8a3634 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

```JSON
{
    "@type": "xdm:descriptorPrimaryKey",
    "xdm:sourceSchema": "_customer/web/flights",
    "xdm:sourceProperty": "/flightId",
    "descriptorType": "schema",
    "descriptorId": "b257fb10f5453b018cace7f590060d443e8a3634",
    "imsOrg": "{IMS_ORG}",
    "createdClient": "{API_KEY}",
    "updatedUser": "{string}@AdobeID",
    "version": "1",
    "created": 1536969498700,
    "updated": 1536969498700
}

```

### POST - Create New Descriptor

To create a new descriptor, issue a POST request to `/descriptors` that includes all of the necessary fields (as indicated by the [Descriptor Types table](#descriptortypes)) in the payload.

##### API Format

```
POST /descriptors
```

##### Request

In the example below, we are defining a descriptor for our `_customer/web/flights` schema that indicates `flightId` as a primary key.

```
curl -X POST \
  https://platform.adobe.io/data/foundation/catalog/descriptors \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: 6{IMS_ORG}' \
  -d '{
    "@type":"xdm:descriptorPrimaryKey",
    "xdm:sourceSchema":"_customer/web/flights",
    "xdm:sourceProperty":"/flightId"
}'
```

##### Response

The response to this request is an object containing the `{id}` of our new descriptor.

```JSON
{
    "@id": "061fc9ac5e2ac791bb664eb1ad1503bd50e96ad6"
}
```

You can view the details for the descriptor you just created by using the `{id}` provided in the response and following the steps to [view an individual descriptor](#get-viewindividualdescriptor) as outlined above.

### PUT - Update a Descriptor

You may determine in the future that you need to update a descriptor. This can be done through the API using a PUT request to the individual descriptor `{id}`.

##### API Format

```
PUT /descriptors/{id}
```

##### Request

In this example, we will update the descriptor we just created to indicate a different field as the primary key for `_customer/web/flights` schema.

```
curl -X PUT \
  https://platform.adobe.io/data/foundation/catalog/descriptors/061fc9ac5e2ac791bb664eb1ad1503bd50e96ad6 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -d '{
    "@type":"xdm:descriptorPrimaryKey",
    "xdm:sourceSchema":"_customer/web/flights",
    "xdm:sourceProperty":"/flightNumber"
}'
```

**Note:** Similar to other update instructions in this document, the PUT request is _re-writing_ the existing descriptor, so you must include all necessary fields in the payload to ensure the descriptor is updated correctly.

##### Response

The response shows the descriptor `{id}`, which should be the same as when you first defined it.

```JSON
{
    "@id": "061fc9ac5e2ac791bb664eb1ad1503bd50e96ad6"
}
```

### DELETE - Remove a Descriptor

You can remove a descriptor by performing a DELETE request using the `{id}` for the descriptor.

##### API Format

```
DELETE /descriptors/{id}
```

##### Request

```
curl -X DELETE \
https://platform.adobe.io/data/foundation/catalog/descriptors/9801b0d39c2760ef4916a957f4b902a812a13262 \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
```

##### Response

There is no response body for a DELETE request, but a successful deletion will return with HTTP Status Code 204 (No-content).

```HTTP
Status: 204 (No-content)
```

## Defining XDM Field Types in the API

As shown in the examples above, schemas are defined using JSON Schema standards and basic field types. XDM allows you to define additional field types through the use of formats and optional constraints. The XDM field types are exposed by the field-level attribute, "meta:xdmType".

The following table outlines the appropriate formatting to define scalar field types and more specific field types using optional properties. More information regarding optional properties and type-specific keywords is available through the [JSON Schema Documentation](https://json-schema.org/understanding-json-schema/reference/type.html).

To begin, find the desired field type and use the sample code provided to build your API request. 

<table>
<tr>
<th width="200px">Desired Type<br/>(meta:xdmType)</th>
<th width="250px">JSON<br/>(JSON Schema)</th>
<th width="400px">Code Sample</th>
</tr>

<tr>
<td>string</td>
<td><br/>type: string<br/><br/>
<strong>Optional properties:</strong><br/>
<ul>
<li>pattern</li>
<li>minLength</li>
<li>maxLength</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "pattern": "^[A-Z]{2}$",
    "maxLength": 2
}
</pre>
</tr>

<tr>
<td>uri<br/>
(xdmType:string)</td>
<td>type: string<br/>format: uri</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "format": "uri"
}
</pre>
</tr>

<tr>
<td>enum<br/>
(xdmType: string)</td>
<td>type: string<br/><br/>
<strong>Optional property:</strong><br/>
<ul>
<li>default</li>
</ul>
</td>
<td>Specify customer-facing option labels using "meta:enum":
<pre class="JSON language-JSON hljs">
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
</tr>

<tr>
<td>number</td>
<td>type: number<br/>
minimum: ±2.23×10^308<br/>
maximum: ±1.80×10^308

</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "number"
}
</pre>
</tr>  

<tr>
<td>long</td>
<td>type: integer<br/>
maximum:2^53+1<br>minimum:-2^53+1</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -9007199254740992,
    "maximum": 9007199254740992
}
</pre>
</tr>

<tr>
<td>int</td>
<td>type: integer<br/>maximum:2^31<br>minimum:-2^31</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -2147483648,
    "maximum": 2147483648
}
</pre>
</tr> 

<tr>
<td>short</td>
<td>type: integer<br/>maximum:2^15<br>minimum:-2^15</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -32768,
    "maximum": 32768
}
</pre>
</tr> 
<tr>
<td>byte</td>
<td>type: integer<br/>maximum:2^7<br>minimum:-2^7</td>

<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "integer",
    "minimum": -128,
    "maximum": 128
}
</pre>
</tr> 

<tr>
<td>boolean</td>
<td><br/>type: boolean<br/>{true, false}<br/><br/>
<strong>Optional property:</strong><br/>
<ul>
<li>default</li>
</ul>
</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "boolean",
    "default": false
}
</pre>
</tr> 

<tr>
<td>date</td>
<td>type: string<br/>format: date</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "format": "date",
    "examples": [
        "2004-10-23"
    ],
}
</pre>
Date as defined by <a href="https://tools.ietf.org/html/rfc3339#section-5.6" target="_blank">RFC 3339, section 5.6</a>, where "full-date" = date-fullyear "-" date-month "-" date-mday (YYYY-MM-DD)
</td>
</tr>

<tr>
<td>date-time</td>
<td>type: string<br/>format: date-time</td>
<td>
<pre class="JSON language-JSON hljs">
"sampleField": {
    "type": "string",
    "format": "date-time",
    "examples": [
      "2004-10-23T12:00:00-06:00"
    ],
}
</pre>
Date-Time as defined by <a href="https://tools.ietf.org/html/rfc3339#section-5.6" target="_blank">RFC 3339, section 5.6</a>, where "date-time" = full-date "T" full-time:<br/>
(YYYY-MM-DD'T'HH:MM:SS.SSSSX)
</tr>

<tr>
<td>array</td>
<td>type: array</td>
<td>items.type can be defined using any scalar type:
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "array",
  "items": {
    "type": "string"
  }
}
</pre>
Array of objects defined by another schema:<br/>
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "array",
  "items": {
    "$ref": "id"
  }
}
</pre>
Where "id" is the {id} of the reference schema.
</td>

<tr>
<td>object</td>
<td>type: object</td>
<td>properties.{field}.type can be defined using any scalar type:
<pre class="JSON language-JSON hljs">
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
Field of type "object" that is defined by a reference schema:
<pre class="JSON language-JSON hljs">
"sampleField": {
  "type": "object",
  "$ref": "id"
}
</pre>
Where "id" is the {id} of the reference schema.
</td>
</tr>
</table>

## Mapping XDM Types to Other Formats

The table below describes the mapping between "meta:xdmType" and other
serialization formats.

|XDM Type<br>(meta:xdmType)|JSON<br>(JSON Schema)|Parquet<br>(type/annotation)|Spark SQL|Java|Scala|.NET|CosmosDB|MongoDB|Aerospike|Protobuf 2
|---|---|---|---|---|---|---|---|---|---|---|
|string|type:string|BYTE_ARRAY/UTF8|StringType|java.lang.String|String|System.String|String|string|String|string
|number|type:number|DOUBLE|DoubleType|java.lang.Double|Double|System.Double|Number|double|Double|double
|long|type:integer<br>maximum:2^53+1<br>minimum:-2^53+1|INT64|LongType|java.lang.Long|Long|System.Int64|Number|long|Integer|int64
|int|type:integer<br>maximum:2^31<br>minimum:-2^31|INT32/INT_32|IntegerType|java.lang.Integer|Int|System.Int32|Number|int|Integer|int32
|short|type:integer<br>maximum:2^15<br>minimum:-2^15|INT32/INT_16|ShortType|java.lang.Short|Short|System.Int16|Number|int|Integer|int32
|byte|type:integer<br>maximum:2^7<br>minimum:-2^7|INT32/INT_8|ByteType|java.lang.Short|Byte|System.SByte|Number|int|Integer|int32
|boolean|type:boolean|BOOLEAN|BooleanType|java.lang.Boolean|Boolean|System.Boolean|Boolean|bool|Integer|Integer|bool
|date|type:string<br>format:date<br>(RFC 3339, section 5.6)|INT32/DATE|DateType|java.util.Date|java.util.Date|System.DateTime|String|date|Integer<br>(unix millis)|int64<br>(unix millis)
|date-time|type:string<br>format:date-time<br>(RFC 3339, section 5.6)|INT64/TIMESTAMP_MILLIS|TimestampType|java.util.Date|java.util.Date|System.DateTime|String|timestamp|Integer<br>(unix millis)|int64<br>(unix millis)

## Profile Schema

The Profile schema is a single representation of the attributes of both identified and partially-identified subjects. Profiles that are highly identified may be used for personal communications or highly targeted engagements, and can contain detailed personal information such as name, gender, date of birth, location, and contact information like phone number and email address.

Less-identified profiles may consist of only anonymous behavioral signals, such as browser cookies. In that case, the sparse profile data is used to build an information base into which the interests and preferences of the anonymous profile are collated and stored (by the Unified Profile Service). These identifiers may become more detailed over time as the subject signs up for notifications, subscriptions, purchases, etc. This increase in profile attributes may eventually result in an identified subject which allows for a higher degree of targeted engagement.

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/profile \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

```JSON
{
    "created": 1535749106139,
    "updated": 1535749106139,
    "title": "Profile",
    "type": "object",
    "description": "XDM Profiles are a singular representation of the attributes of identified and\npartially identified persons. Profiles that are highly identified maybe used for\npersonal communications or highly targeted engagements and can contain detailed\npersonal information such as names, gender, date of birth, locations, and contact\ninformation like phone numbers and email addresses. Profiles may range to the\nother end of the identification spectrum where only anonymous behavioral signals\nare being observed and the amount of identification is simple browser cookies.\nIn this latter case, the sparse Profile data is useful to build more knowledge\non the interests and preferences of the anonymous profile, and over time can\nbecome richer as the person interacting with brand becomes more engaged and\nultimately signs-on to notifications, subscriptions, purchases and other\nconnections with the brand that enrich and fill out the profile.\n\nXDM Profile can contain personal information, identification information, contact\ndetails and communication preferences. Over time XDM Profile will expand to cater\nfor other Profile data such as preference, propensities and other attributes.\n\n",
    "properties": {
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
        "identities": {
            "title": "All User Identities",
            "type": "array",
            "minItems": 1,
            "description": "Array of Identities. Condensed, normalized encapsulation of all end user identifiers.",
            "meta:xdmType": "array",
            "items": {
                "$ref": "context/identity"
            },
            "meta:xdmField": "xdm:identities"
        },
        "person": {
            "title": "Person",
            "$ref": "context/person",
            "description": "An individual actor, contact, or owner.\n",
            "meta:xdmField": "xdm:person"
        },
        "homeAddress": {
            "title": "Home Address",
            "$ref": "common/address",
            "description": "A home postal address.\n",
            "meta:xdmField": "xdm:homeAddress"
        },
        "workAddress": {
            "title": "Work Address",
            "$ref": "common/address",
            "description": "A work postal address.\n",
            "meta:xdmField": "xdm:workAddress"
        },
        "personalEmail": {
            "title": "Personal Email",
            "$ref": "context/emailaddress",
            "description": "A personal email address.\n",
            "meta:xdmField": "xdm:personalEmail"
        },
        "workEmail": {
            "title": "Work Email",
            "$ref": "context/emailaddress",
            "description": "A work email address.\n",
            "meta:xdmField": "xdm:workEmail"
        },
        "homePhone": {
            "title": "Home Phone",
            "$ref": "context/phonenumber",
            "description": "Home phone number.\n",
            "meta:xdmField": "xdm:homePhone"
        },
        "workPhone": {
            "title": "Work Phone",
            "$ref": "context/phonenumber",
            "description": "Work phone number.\n",
            "meta:xdmField": "xdm:workPhone"
        },
        "mobilePhone": {
            "title": "Mobile Phone",
            "$ref": "context/phonenumber",
            "description": "Mobile phone number.\n",
            "meta:xdmField": "xdm:mobilePhone"
        },
        "faxPhone": {
            "title": "Fax Phone",
            "$ref": "context/phonenumber",
            "description": "Fax phone number.\n",
            "meta:xdmField": "xdm:faxPhone"
        },
        "optInOut": {
            "title": "OptInOut",
            "$ref": "context/optinout",
            "description": "Describes a users opting in and out preferences for communication by medium\nand communication type.\n",
            "meta:xdmField": "xdm:optInOut"
        },
        "pushNotificationTokens": {
            "title": "Push Notification Tokens",
            "type": "array",
            "description": "Push notification tokens are used to communicate with applications that\nare installed on devices or SaaS application accounts.\n",
            "meta:xdmType": "array",
            "items": {
                "$ref": "context/pushnotificationtoken"
            },
            "meta:xdmField": "xdm:pushNotificationTokens"
        },
        "orgUnit": {
            "title": "Organizational Unit",
            "$ref": "common/orgunit",
            "description": "The unit within the organization owning the profile. This can be used to reference the organization details maintained in another dataset.",
            "meta:xdmField": "xdm:orgUnit"
        },
        "geoUnit": {
            "title": "Geographical Unit",
            "$ref": "common/geounit",
            "description": "The geographical unit within the organization owning the profile. This can be used to reference the geographical information maintained in another dataset.",
            "meta:xdmField": "xdm:geoUnit"
        },
        "preferredLanguage": {
            "title": "Preferred Language",
            "type": "string",
            "pattern": "^(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)|((en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)))$",
            "examples": [
                "en-GB",
                "de-DE",
                "yue-HK"
            ],
            "description": "Describes the preferred system of communication used by the profile. Language codes are expressed in BCP 47 format.",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:preferredLanguage"
        },
        "timeZone": {
            "title": "Time Zone",
            "type": "string",
            "examples": [
                "America/Barbados",
                "Antarctica/Davis",
                "Asia/Calcutta"
            ],
            "description": "Describes which time zone the profile is present in, most frequently/the time zone preferred by the profile. Time zones are expressed according to the IETF tz database: https://www.ietf.org/timezones/tzdb-2016i/tz-link.htm",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:timeZone"
        },
        "profilePictureLink": {
            "title": "Profile Picture Link",
            "type": "string",
            "description": "Link to profile's picture",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:profilePictureLink"
        },
        "emailFormat": {
            "title": "Email Format",
            "type": "string",
            "description": "Email format preferred by the profile. This can be rich text/plain text",
            "meta:enum": {
                "html": "Rich text",
                "plaintext": "Plain text"
            },
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:emailFormat"
        },
        "organizations": {
            "title": "Organizations",
            "type": "array",
            "meta:xdmType": "array",
            "items": {
                "type": "string",
                "meta:xdmType": "string"
            },
            "meta:xdmField": "xdm:organizations"
        },
        "subscriptions": {
            "title": "Subscriptions",
            "type": "array",
            "description": "Subscriptions that this profile is entitled to including terminated, expired or exhausted subscriptions.",
            "meta:xdmType": "array",
            "items": {
                "$ref": "context/subscription"
            },
            "meta:xdmField": "xdm:subscriptions"
        },
        "testProfile": {
            "title": "Test Profile",
            "type": "boolean",
            "description": "Indicates the `profile` record is for use in testing/verification purposes and should not be automatically included in normal operation(s).",
            "default": false,
            "meta:xdmType": "boolean",
            "meta:xdmField": "xdm:testProfile"
        },
        "segments": {
            "title": "Segment Membership",
            "type": "array",
            "meta:xdmType": "array",
            "items": {
                "$ref": "context/segmentmembership"
            },
            "meta:xdmField": "xdm:segments"
        },
        "_customer": {
            "type": "object",
            "properties": {
                "default": {
                    "version": "string",
                    "created": "number",
                    "updated": "number",
                    "createdClient": "{API_KEY}",
                    "updatedUser": "string@AdobeID",
                    "imsOrg": "{IMS_ORG}",
                    "extNamespace": "default",
                    "title": "Default extension",
                    "type": "object",
                    "description": "The default extension",
                    "properties": {}
                }
            }
        }
    },
    "id": "context/profile",
    "xdmVersion": "0.9.9.5",
    "meta:extends": [
        "external/repo/commmon"
    ],
    "meta:altId": "_xdm.context.profile",
    "meta:xdmType": "object",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "context/profile"
}
```

## ExperienceEvent Schema

The ExperienceEvent Standard Schema is used to capture the state when a set of events occurred, including the point in time and identities of the subject. Experience Events are fact records of what occurred, thus they are immutable and represent what happened without aggregation or interpretation. They are critical for time-domain analytics as they allow for observation and analysis of changes that occur in a given window of time and allow for comparison with other windows of time to track trends.

Experience Events can be either either explicit or implicit. Explicit events are directly observable human actions taking place during a point in a journey. Implicit events are events that are being raised without a direct human action, but still relate to a person. Examples of implicit events are the scheduled sending of email newsletters, battery voltage reaching a certain threshold, or a credit card settling.

##### Request

```
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/experienceevent \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

##### Response

```JSON
{
    "created": 1535749106007,
    "updated": 1535749106007,
    "title": "ExperienceEvent",
    "type": "object",
    "description": "The core ExperienceEvent XDM is used to capture observations that are altering one or more related XDMs/entities. The ExperienceEvent captures information about the observation taking place and when it is occurring. It is critical for time domain analytics as it allows observation and analysis of changes that occur in windows of time and comparison with other windows of time to track trends. ExperienceEvent are either explicit or implicit. Explicit events are direct observations of a human action taking place during a session. Implicit events are events that are being raised without a direct human action. Examples of implicit events are scheduled email sending of newsletters, battery voltage reaching a certain threshold, a person entering into range of a proximity sensor. While not all events are easily categorized across all data sources, it is extremely valuable to harmonize similar events into similar types for processing where possible, and the XDM specifications does this by defining a set of enumerated **type** attribute values with specific semantic meanings. Where possible events must be constrained to these enumerated values to facilitate interoperability.",
    "properties": {
        "_id": {
            "title": "Identifier",
            "type": "string",
            "format": "uri-reference",
            "description": "The unique identifier for the ExperienceEvent.",
            "meta:xdmType": "string",
            "meta:xdmField": "@id"
        },
        "dataSource": {
            "title": "Data Source",
            "$ref": "data/datasource",
            "description": "Globally unique identification of a data source.",
            "meta:xdmField": "xdm:dataSource"
        },
        "timestamp": {
            "title": "Timestamp",
            "type": "string",
            "format": "date-time",
            "description": "The time when the first event of the interaction occurred.",
            "meta:xdmType": "date-time",
            "meta:xdmField": "xdm:timestamp"
        },
        "receivedTimestamp": {
            "title": "Received Timestamp",
            "type": "string",
            "format": "date-time",
            "description": "The time at which this interaction was received by a server.",
            "meta:xdmType": "date-time",
            "meta:xdmField": "xdm:receivedTimestamp"
        },
        "endUserIDs": {
            "title": "End User IDs",
            "$ref": "context/enduserids",
            "description": "Condensed, normalized encapsulation of all end user identifiers.",
            "meta:xdmField": "xdm:endUserIDs"
        },
        "environment": {
            "title": "Environment",
            "$ref": "context/environment",
            "description": "Information about the surrounding situation the event observation occurred in, specifically detailing transitory information such as the network or software versions.",
            "meta:xdmField": "xdm:environment"
        },
        "productListItems": {
            "title": "Product List Items",
            "type": "array",
            "description": "A list of items representing a product selected by a customer with specific options and pricing that are for that usage context at a specific point of time and may differ from the product record.",
            "meta:xdmType": "array",
            "items": {
                "$ref": "content/productlistitem"
            },
            "meta:xdmField": "xdm:productListItems"
        },
        "device": {
            "title": "Device",
            "$ref": "context/device",
            "description": "An identified Device/Application or Device/Browser instance that is trackable across sessions, normally by cookies.",
            "meta:xdmField": "xdm:device"
        },
        "commerce": {
            "title": "Commerce",
            "$ref": "context/commerce",
            "description": "The commerce specific data related to this interaction.",
            "meta:xdmField": "xdm:commerce"
        },
        "application": {
            "title": "Application",
            "$ref": "context/application",
            "description": "The application related to the event observation. It could be either the application targeted by the event like the send of a push notification or the application originating the event such as a click, or a login.",
            "meta:xdmField": "xdm:application"
        },
        "search": {
            "title": "Search",
            "$ref": "context/search",
            "description": "The information related to web or mobile search.",
            "meta:xdmField": "xdm:search"
        },
        "web": {
            "title": "Web",
            "$ref": "context/webinfo",
            "description": "The information related to web page and link of the ExperienceEvent.",
            "meta:xdmField": "xdm:web"
        },
        "directMarketing": {
            "title": "Direct Marketing",
            "$ref": "context/direct-marketing",
            "description": "The events and properties related to direct/outbound marketing such as email, direct mail, texts and in-app notifications.",
            "meta:xdmField": "xdm:directMarketing"
        },
        "marketing": {
            "title": "Marketing",
            "$ref": "context/marketing",
            "description": "The information related to marketing activities that are active with the touchpoint.",
            "meta:xdmField": "xdm:marketing"
        },
        "placeContext": {
            "title": "Place Context",
            "$ref": "context/placecontext",
            "description": "The transient circumstances related to the observation. Examples include locale specific information such as weather, local time, traffic, day of the week, workday vs. holiday, working hours.",
            "meta:xdmField": "xdm:placeContext"
        },
        "channel": {
            "title": "Experience Channel",
            "description": "The experience channel related to this ExperienceEvent.",
            "$ref": "channels/channel",
            "meta:xdmField": "xdm:channel"
        },
        "advertising": {
            "title": "Advertising",
            "$ref": "context/advertising",
            "description": "The information related to advertising activity related to the experience event",
            "meta:xdmField": "xdm:advertising"
        },
        "media": {
            "title": "Media",
            "$ref": "context/media",
            "description": "The media activity information related to the experience event",
            "meta:xdmField": "xdm:media"
        },
        "profileStitching": {
            "title": "Profile Stitching",
            "description": "Details about the ids that were joined by profile stitching.",
            "$ref": "context/profilestitch",
            "meta:xdmField": "xdm:profileStitching"
        },
        "segmentMemberships": {
            "title": "Segment Memberships",
            "description": "The segments associated with this experience event",
            "type": "array",
            "meta:xdmType": "array",
            "items": {
                "$ref": "context/segmentmembershipitem"
            },
            "meta:xdmField": "xdm:segmentMemberships"
        },
        "_experience": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "adcloud": {
                    "type": "object",
                    "meta:xdmType": "object",
                    "properties": {
                        "eventType": {
                            "title": "Event Type",
                            "type": "string",
                            "description": "Adobe AdCloud event type.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/adcloud/eventType"
                        },
                        "campaign": {
                            "title": "Ad Campaign Details",
                            "$ref": "adobe/experience/adcloud/campaign",
                            "description": "Adobe AdCloud ad campaign hierarchy details.",
                            "meta:xdmField": "https://ns.adobe.com/experience/adcloud/campaign"
                        },
                        "inventory": {
                            "title": "Ad Inventory Details",
                            "$ref": "adobe/experience/adcloud/inventory",
                            "description": "Adobe AdCloud inventory details.",
                            "meta:xdmField": "https://ns.adobe.com/experience/adcloud/inventory"
                        },
                        "advertisement": {
                            "title": "Ad Asset Details",
                            "$ref": "adobe/experience/adcloud/advertisement",
                            "description": "Digital advertisement details",
                            "meta:xdmField": "https://ns.adobe.com/experience/adcloud/advertisement"
                        },
                        "implementation": {
                            "title": "Client Implementation for Adobe AdCloud",
                            "$ref": "context/implementationdetails",
                            "description": "Client details interacting with Adobe AdCloud.",
                            "meta:xdmField": "https://ns.adobe.com/experience/adcloud/implementation"
                        }
                    }
                },
                "analytics": {
                    "type": "object",
                    "meta:xdmType": "object",
                    "properties": {
                        "session": {
                            "type": "object",
                            "title": "Session",
                            "meta:xdmType": "object",
                            "properties": {
                                "num": {
                                    "title": "Session Number",
                                    "type": "integer",
                                    "description": "Current session number for the end-user.",
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:num"
                                },
                                "depth": {
                                    "title": "Session Depth",
                                    "type": "integer",
                                    "description": "Current session depth (eg page number) for the end-user.",
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:depth"
                                },
                                "timestamp": {
                                    "title": "Session Entry Timestamp",
                                    "type": "integer",
                                    "description": "The timestamp at the entry into this session. Milliseconds since midnight of January 1, 1970.",
                                    "minimum": 1,
                                    "maximum": 9223372036854770000,
                                    "meta:xdmType": "long",
                                    "meta:xdmField": "xdm:timestamp"
                                },
                                "search": {
                                    "title": "Session Entry Search",
                                    "$ref": "context/search",
                                    "description": "The information related to web or mobile search at the entry of this session.",
                                    "meta:xdmField": "xdm:search"
                                },
                                "web": {
                                    "title": "Session Entry Web",
                                    "$ref": "context/webinfo",
                                    "description": "The information related to web page, link, and referrer at the entry of this session.",
                                    "meta:xdmField": "xdm:web"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/session"
                        },
                        "endUser": {
                            "type": "object",
                            "title": "End User",
                            "meta:xdmType": "object",
                            "properties": {
                                "firstTimestamp": {
                                    "title": "End User First Timestamp",
                                    "type": "integer",
                                    "description": "The timestamp for the first ExperienceEvent for this end-user. Milliseconds since midnight of January 1, 1970.",
                                    "minimum": 1,
                                    "maximum": 9223372036854770000,
                                    "meta:xdmType": "long",
                                    "meta:xdmField": "xdm:firstTimestamp"
                                },
                                "firstWeb": {
                                    "title": "End User First Web Details",
                                    "$ref": "context/webinfo",
                                    "description": "The information related to web page, link, and referrer from the first ExperienceEvent for this end-user.",
                                    "meta:xdmField": "xdm:firstWeb"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/endUser"
                        },
                        "customDimensions": {
                            "type": "object",
                            "title": "Custom Dimensions",
                            "meta:xdmType": "object",
                            "properties": {
                                "eVars": {
                                    "type": "object",
                                    "title": "eVars",
                                    "meta:xdmType": "object",
                                    "properties": {
                                        "eVar1": {
                                            "title": "eVar1",
                                            "type": "string",
                                            "description": "Custom conversion variable 1.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:eVar1"
                                        },
                                        "eVar2": {
                                            "title": "eVar2",
                                            "type": "string",
                                            "description": "Custom conversion variable 2.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:eVar2"
                                        },
                                        "eVar3": {
                                            "title": "eVar3",
                                            "type": "string",
                                            "description": "Custom conversion variable 3.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:eVar3"
                                        },
                                        "eVar250": {
                                            "title": "eVar250",
                                            "type": "string",
                                            "description": "Custom conversion variable 250.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:eVar250"
                                        }
                                    },
                                    "meta:xdmField": "xdm:eVars"
                                },
                                "props": {
                                    "type": "object",
                                    "title": "Props",
                                    "meta:xdmType": "object",
                                    "properties": {
                                        "prop1": {
                                            "title": "prop1",
                                            "type": "string",
                                            "description": "Custom property variable 1.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:prop1"
                                        },
                                        "prop2": {
                                            "title": "prop2",
                                            "type": "string",
                                            "description": "Custom property variable 2.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:prop2"
                                        },
                                        "prop3": {
                                            "title": "prop3",
                                            "type": "string",
                                            "description": "Custom property variable 3.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:prop3"
                                        },
                                        "prop75": {
                                            "title": "prop75",
                                            "type": "string",
                                            "description": "Custom property variable 75.",
                                            "meta:xdmType": "string",
                                            "meta:xdmField": "xdm:prop75"
                                        }
                                    },
                                    "meta:xdmField": "xdm:props"
                                },
                                "listProps": {
                                    "type": "object",
                                    "title": "List Props",
                                    "meta:xdmType": "object",
                                    "properties": {
                                        "prop1": {
                                            "title": "prop1",
                                            "description": "Custom property variable1",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:prop1"
                                        },
                                        "prop2": {
                                            "title": "prop2",
                                            "description": "Custom property variable2",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:prop2"
                                        },
                                        "prop3": {
                                            "title": "prop3",
                                            "description": "Custom property variable3",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:prop3"
                                        },
                                        "prop75": {
                                            "title": "prop75",
                                            "description": "Custom property variable75",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:prop75"
                                        }
                                    },
                                    "meta:xdmField": "xdm:listProps"
                                },
                                "hierarchies": {
                                    "type": "object",
                                    "title": "Hierarchies",
                                    "meta:xdmType": "object",
                                    "properties": {
                                        "hier1": {
                                            "title": "hier1",
                                            "description": "Custom hierarchy variable 1.",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:hier1"
                                        },
                                        "hier2": {
                                            "title": "hier2",
                                            "description": "Custom hierarchy variable 2.",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:hier2"
                                        },
                                        "hier3": {
                                            "title": "hier3",
                                            "description": "Custom hierarchy variable 3.",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:hier3"
                                        },
                                        "hier4": {
                                            "title": "hier4",
                                            "description": "Custom hierarchy variable 4.",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:hier4"
                                        },
                                        "hier5": {
                                            "title": "hier5",
                                            "description": "Custom hierarchy variable 5.",
                                            "$ref": "adobe/experience/analytics/listdetails",
                                            "meta:xdmField": "xdm:hier5"
                                        }
                                    },
                                    "meta:xdmField": "xdm:hierarchies"
                                },
                                "lists": {
                                    "type": "object",
                                    "title": "Custom List Variables",
                                    "meta:xdmType": "object",
                                    "properties": {
                                        "list1": {
                                            "title": "List 1",
                                            "description": "Custom list variable 1.",
                                            "$ref": "adobe/experience/analytics/keyedlist",
                                            "meta:xdmField": "xdm:list1"
                                        },
                                        "list2": {
                                            "title": "List 2",
                                            "description": "Custom list variable 2.",
                                            "$ref": "adobe/experience/analytics/keyedlist",
                                            "meta:xdmField": "xdm:list2"
                                        },
                                        "list3": {
                                            "title": "List 3",
                                            "description": "Custom list variable 3.",
                                            "$ref": "adobe/experience/analytics/keyedlist",
                                            "meta:xdmField": "xdm:list3"
                                        }
                                    },
                                    "meta:xdmField": "xdm:lists"
                                },
                                "stateProvince": {
                                    "title": "state",
                                    "type": "string",
                                    "description": "Client supplied state or province location.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:stateProvince"
                                },
                                "postalCode": {
                                    "title": "zip",
                                    "type": "string",
                                    "description": "Client supplied zip code/postal code.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:postalCode"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/customDimensions"
                        },
                        "event1to100": {
                            "type": "object",
                            "title": "Event 1 to 100",
                            "meta:xdmType": "object",
                            "properties": {
                                "event1": {
                                    "title": "event1",
                                    "$ref": "data/measure",
                                    "description": "Custom event 1.",
                                    "meta:xdmField": "xdm:event1"
                                },
                                "event2": {
                                    "title": "event2",
                                    "$ref": "data/measure",
                                    "description": "Custom event 2.",
                                    "meta:xdmField": "xdm:event2"
                                },
                                "event3": {
                                    "title": "event3",
                                    "$ref": "data/measure",
                                    "description": "Custom event 3.",
                                    "meta:xdmField": "xdm:event3"
                                },
                                "event100": {
                                    "title": "event100",
                                    "$ref": "data/measure",
                                    "description": "Custom event 100.",
                                    "meta:xdmField": "xdm:event100"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event1to100"
                        },
                        "event101to200": {
                            "type": "object",
                            "title": "Event 101 to 200",
                            "meta:xdmType": "object",
                            "properties": {
                                "event101": {
                                    "title": "event101",
                                    "$ref": "data/measure",
                                    "description": "Custom event 101.",
                                    "meta:xdmField": "xdm:event101"
                                },
                                "event102": {
                                    "title": "event102",
                                    "$ref": "data/measure",
                                    "description": "Custom event 102.",
                                    "meta:xdmField": "xdm:event102"
                                },
                                "event103": {
                                    "title": "event103",
                                    "$ref": "data/measure",
                                    "description": "Custom event 103.",
                                    "meta:xdmField": "xdm:event103"
                                },
                                "event200": {
                                    "title": "event200",
                                    "$ref": "data/measure",
                                    "description": "Custom event 200.",
                                    "meta:xdmField": "xdm:event200"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event101to200"
                        },
                        "event201to300": {
                            "type": "object",
                            "title": "Event 201 to 300",
                            "meta:xdmType": "object",
                            "properties": {
                                "event201": {
                                    "title": "event201",
                                    "$ref": "data/measure",
                                    "description": "Custom event 201.",
                                    "meta:xdmField": "xdm:event201"
                                },
                                "event202": {
                                    "title": "event202",
                                    "$ref": "data/measure",
                                    "description": "Custom event 202.",
                                    "meta:xdmField": "xdm:event202"
                                },
                                "event203": {
                                    "title": "event203",
                                    "$ref": "data/measure",
                                    "description": "Custom event 203.",
                                    "meta:xdmField": "xdm:event203"
                                },
                                "event300": {
                                    "title": "event300",
                                    "$ref": "data/measure",
                                    "description": "Custom event 300.",
                                    "meta:xdmField": "xdm:event300"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event201to300"
                        },
                        "event301to400": {
                            "type": "object",
                            "title": "Event 301 to 400",
                            "meta:xdmType": "object",
                            "properties": {
                                "event301": {
                                    "title": "event301",
                                    "$ref": "data/measure",
                                    "description": "Custom event 301.",
                                    "meta:xdmField": "xdm:event301"
                                },
                                "event302": {
                                    "title": "event302",
                                    "$ref": "data/measure",
                                    "description": "Custom event 302.",
                                    "meta:xdmField": "xdm:event302"
                                },
                                "event303": {
                                    "title": "event303",
                                    "$ref": "data/measure",
                                    "description": "Custom event 303.",
                                    "meta:xdmField": "xdm:event303"
                                },
                                "event400": {
                                    "title": "event400",
                                    "$ref": "data/measure",
                                    "description": "Custom event 400.",
                                    "meta:xdmField": "xdm:event400"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event301to400"
                        },
                        "event401to500": {
                            "type": "object",
                            "title": "Event 401 to 500",
                            "meta:xdmType": "object",
                            "properties": {
                                "event401": {
                                    "title": "event401",
                                    "$ref": "data/measure",
                                    "description": "Custom event 401.",
                                    "meta:xdmField": "xdm:event401"
                                },
                                "event402": {
                                    "title": "event402",
                                    "$ref": "data/measure",
                                    "description": "Custom event 402.",
                                    "meta:xdmField": "xdm:event402"
                                },
                                "event403": {
                                    "title": "event403",
                                    "$ref": "data/measure",
                                    "description": "Custom event 403.",
                                    "meta:xdmField": "xdm:event403"
                                },
                                "event500": {
                                    "title": "event500",
                                    "$ref": "data/measure",
                                    "description": "Custom event 500.",
                                    "meta:xdmField": "xdm:event500"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event401to500"
                        },
                        "event501to600": {
                            "type": "object",
                            "title": "Event 501 to 600",
                            "meta:xdmType": "object",
                            "properties": {
                                "event501": {
                                    "title": "event501",
                                    "$ref": "data/measure",
                                    "description": "Custom event 501.",
                                    "meta:xdmField": "xdm:event501"
                                },
                                "event502": {
                                    "title": "event502",
                                    "$ref": "data/measure",
                                    "description": "Custom event 502.",
                                    "meta:xdmField": "xdm:event502"
                                },
                                "event503": {
                                    "title": "event503",
                                    "$ref": "data/measure",
                                    "description": "Custom event 503.",
                                    "meta:xdmField": "xdm:event503"
                                },
                                "event600": {
                                    "title": "event600",
                                    "$ref": "data/measure",
                                    "description": "Custom event 600.",
                                    "meta:xdmField": "xdm:event600"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event501to600"
                        },
                        "event601to700": {
                            "type": "object",
                            "title": "Event 601 to 700",
                            "meta:xdmType": "object",
                            "properties": {
                                "event601": {
                                    "title": "event601",
                                    "$ref": "data/measure",
                                    "description": "Custom event 601.",
                                    "meta:xdmField": "xdm:event601"
                                },
                                "event602": {
                                    "title": "event602",
                                    "$ref": "data/measure",
                                    "description": "Custom event 602.",
                                    "meta:xdmField": "xdm:event602"
                                },
                                "event603": {
                                    "title": "event603",
                                    "$ref": "data/measure",
                                    "description": "Custom event 603.",
                                    "meta:xdmField": "xdm:event603"
                                },
                                "event700": {
                                    "title": "event700",
                                    "$ref": "data/measure",
                                    "description": "Custom event 700.",
                                    "meta:xdmField": "xdm:event700"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event601to700"
                        },
                        "event701to800": {
                            "type": "object",
                            "title": "Event 701 to 800",
                            "meta:xdmType": "object",
                            "properties": {
                                "event701": {
                                    "title": "event701",
                                    "$ref": "data/measure",
                                    "description": "Custom event 701.",
                                    "meta:xdmField": "xdm:event701"
                                },
                                "event702": {
                                    "title": "event702",
                                    "$ref": "data/measure",
                                    "description": "Custom event 702.",
                                    "meta:xdmField": "xdm:event702"
                                },
                                "event703": {
                                    "title": "event703",
                                    "$ref": "data/measure",
                                    "description": "Custom event 703.",
                                    "meta:xdmField": "xdm:event703"
                                },
                                "event800": {
                                    "title": "event800",
                                    "$ref": "data/measure",
                                    "description": "Custom event 800.",
                                    "meta:xdmField": "xdm:event800"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event701to800"
                        },
                        "event801to900": {
                            "type": "object",
                            "title": "Event 801 to 900",
                            "meta:xdmType": "object",
                            "properties": {
                                "event801": {
                                    "title": "event801",
                                    "$ref": "data/measure",
                                    "description": "Custom event 801.",
                                    "meta:xdmField": "xdm:event801"
                                },
                                "event802": {
                                    "title": "event802",
                                    "$ref": "data/measure",
                                    "description": "Custom event 802.",
                                    "meta:xdmField": "xdm:event802"
                                },
                                "event803": {
                                    "title": "event803",
                                    "$ref": "data/measure",
                                    "description": "Custom event 803.",
                                    "meta:xdmField": "xdm:event803"
                                },
                                "event900": {
                                    "title": "event900",
                                    "$ref": "data/measure",
                                    "description": "Custom event 900.",
                                    "meta:xdmField": "xdm:event900"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event801to900"
                        },
                        "event901to1000": {
                            "type": "object",
                            "title": "Event 901 to 1000",
                            "meta:xdmType": "object",
                            "properties": {
                                "event901": {
                                    "title": "event901",
                                    "$ref": "data/measure",
                                    "description": "Custom event 901.",
                                    "meta:xdmField": "xdm:event901"
                                },
                                "event902": {
                                    "title": "event902",
                                    "$ref": "data/measure",
                                    "description": "Custom event 902.",
                                    "meta:xdmField": "xdm:event902"
                                },
                                "event903": {
                                    "title": "event903",
                                    "$ref": "data/measure",
                                    "description": "Custom event 903.",
                                    "meta:xdmField": "xdm:event903"
                                },
                                "event1000": {
                                    "title": "event1000",
                                    "$ref": "data/measure",
                                    "description": "Custom event 1000.",
                                    "meta:xdmField": "xdm:event1000"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/event901to1000"
                        },
                        "environment": {
                            "type": "object",
                            "title": "Environment",
                            "meta:xdmType": "object",
                            "properties": {
                                "browserID": {
                                    "title": "Browser ID",
                                    "type": "integer",
                                    "description": "The Adobe Analytics Identifier for the browser used.",
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:browserID"
                                },
                                "operatingSystemID": {
                                    "title": "Operating System ID",
                                    "type": "integer",
                                    "description": "The Adobe Analytics Identifier of the operating system used.",
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:operatingSystemID"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/environment"
                        },
                        "implementation": {
                            "title": "Client Implementation for Adobe Analytics",
                            "$ref": "context/implementationdetails",
                            "description": "Client details interacting with Adobe Analytics.",
                            "meta:xdmField": "https://ns.adobe.com/experience/analytics/implementation"
                        }
                    }
                },
                "campaign": {
                    "type": "object",
                    "meta:xdmType": "object",
                    "properties": {
                        "message": {
                            "title": "A single message sent to a recipient.",
                            "type": "object",
                            "meta:xdmType": "object",
                            "properties": {
                                "id": {
                                    "title": "Message Identifier",
                                    "type": "number",
                                    "description": "Identifier of the message.",
                                    "meta:xdmType": "number",
                                    "meta:xdmField": "xdm:id"
                                },
                                "profile": {
                                    "title": "Profile",
                                    "$ref": "context/profile",
                                    "description": "The recipient of the message. This property is primarily used to link the message to a Profile using the `EndCustomerID` but it can also be used to freeze some properties of the profile at the time the message was sent.",
                                    "meta:xdmField": "xdm:profile"
                                },
                                "variant": {
                                    "title": "Content Variant",
                                    "type": "string",
                                    "description": "A campaign activity can have multiple variants e.g. Multilingual (translated variants for the same content) or A/B testing (different content to test what works better) but a message delivered to a recipient always contains one of them.\n> IMPORTANT: In case of multilingual, the mirror page, the recipient can switch from one variant to another (ex: switch of the language).",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:variant"
                                },
                                "seedMember": {
                                    "title": "Seed Member",
                                    "type": "boolean",
                                    "default": false,
                                    "description": "The recipient of this message is a member of a seed list for this campaign activity. Seed addresses are used to include recipients who do not match the defined target criteria. Seed members could be your marketing team or other stakeholders who are interested in tracking/measuring the quality of the campaign. SeedMembers get the actual message, at the same time with regular recipients, even when the seedMember does not qualify to be a regular recipient.",
                                    "meta:xdmType": "boolean",
                                    "meta:xdmField": "xdm:seedMember"
                                },
                                "quarantine": {
                                    "title": "Quarantine",
                                    "type": "boolean",
                                    "default": false,
                                    "description": "Address moved to quarantine. The quarantine is set to `true` when the message failed to deliver in a way that indicates that no future messages will be deliverable either to this address.",
                                    "meta:xdmType": "boolean",
                                    "meta:xdmField": "xdm:quarantine"
                                },
                                "proofMember": {
                                    "title": "Proof Member",
                                    "type": "boolean",
                                    "description": "The recipient of this message is a member of the proof group for this campaign activity. The proof is a special message that lets you test a delivery before sending to the main target. Proof recipients are responsible for approving both the form and content of the message. It is a pre-delivery target.",
                                    "default": false,
                                    "meta:xdmType": "boolean",
                                    "meta:xdmField": "xdm:proofMember"
                                },
                                "controlGroupMember": {
                                    "title": "Control Group Member",
                                    "type": "boolean",
                                    "description": "The recipient of this message is a member of a control group for this campaign activity. A control group is a population which will not receive the delivery; it is used to track post-delivery behavior and campaign impact by making a comparison between the control group (or hold out group) with the behavior of target population, which has received the delivery.",
                                    "default": false,
                                    "meta:xdmType": "boolean",
                                    "meta:xdmField": "xdm:controlGroupMember"
                                },
                                "testMember": {
                                    "title": "A/B Test Member",
                                    "type": "boolean",
                                    "description": "The recipient of this message is a member of a test group for this campaign activity. This is primarily used for identifying the initial population of an A/B Test. After sending different variants to the testMembers, the winner Variant is decided to be sent to the remaining population based on behavioural changes in testMembers.",
                                    "default": false,
                                    "meta:xdmType": "boolean",
                                    "meta:xdmField": "xdm:testMember"
                                },
                                "size": {
                                    "title": "Size (Bytes)",
                                    "type": "integer",
                                    "description": "Size in bytes of the message.\n* For email, the `size` reflects the all MIME envelope of the message, including the encoded attachments if any.\n* For SMS, the `size` reflects the number of bytes necessary to deliver the message.\nIf that number is over 160 the message will be delivered over more than one SMS.",
                                    "minimum": 0,
                                    "maximum": 2147483647,
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:size"
                                },
                                "reason": {
                                    "title": "Reason",
                                    "type": "string",
                                    "meta:enum": {
                                        "undefined": "Not defined",
                                        "unknown_user": "The address does not exist. There is no use sending deliveries to this address.",
                                        "invalid_domain": "The domain of the email address is incorrect or no longer exists.",
                                        "unreachable": "An error has occurred in the message delivery chain.These addresses can be removed from the quarantine list to make another attempt.",
                                        "disabled": "The user uses a messaging service which is accessible from the web. When the Internet Access Provider (IAP) detects a lengthy period of inactivity, it can close the user's account. Deliveries to the user's address will then be impossible.",
                                        "mailbox_full": "The recipient's mailbox contains too many messages. This address can be removed from the quarantine list to make another attempt.",
                                        "not_connected": "The recipient's mobile phone is switched off or not connected to the network when the message is sent.",
                                        "refused": "The address was rejected following the application of a security rule (e.g. by an anti-spam program)",
                                        "error_ignored": "The address is whitelisted and the message ignored.",
                                        "address_undefined": "No address is given for the recipient.",
                                        "blacklisted": "The address was blacklisted at the time of sending.",
                                        "quarantine": "The address was in quarantine at the time of sending.",
                                        "duplicate": "The address of the recipient was already in this campaign activity.",
                                        "typology_rule": "The recipient was excluded by a 'SQL' type campaign typology rule.",
                                        "business_ranking": "The recipient was excluded by an 'arbitration' type campaign typology rule",
                                        "cancelled": "Delivery cancelled",
                                        "quality": "The quality rating for this address is too low",
                                        "unchecked": "Unqualified address",
                                        "offer_missing": "Not eligible for the offers",
                                        "over_delivery_limit": "The campaign activity had more than allowed number of target profiles.",
                                        "expired": "The campaign activity exceeded the time duration to complete.",
                                        "too_long": "Text too long",
                                        "untranslatable": "Character not supported by encoding",
                                        "control_group": "Control address"
                                    },
                                    "description": "The reason why the message could/would not be delivered.",
                                    "default": "undefined",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:reason"
                                },
                                "reasonMessage": {
                                    "title": "Reason Message",
                                    "type": "string",
                                    "description": "Reason of message delivery failure.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:reasonMessage"
                                },
                                "outboundIP": {
                                    "title": "IP Address",
                                    "type": "string",
                                    "description": "Outbound IP address used to deliver the message.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:outboundIP"
                                },
                                "externalID": {
                                    "title": "External ID",
                                    "type": "string",
                                    "description": "An ID generated by the parent activity invoking service to check later if the incoming experienceEvent was generated using this ID.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:externalID"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/campaign/message"
                        },
                        "delivery": {
                            "title": "The campaign activity originating a message to a recipient.",
                            "type": "object",
                            "meta:xdmType": "object",
                            "properties": {
                                "id": {
                                    "title": "Delivery ID",
                                    "type": "integer",
                                    "description": "The campaign activity originating this message.",
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:id"
                                },
                                "from": {
                                    "title": "From",
                                    "type": "string",
                                    "description": "Address used as a from/sender/caller address. Depending on the communication channel, the `address` has a different format.\n\n  * `email`: an email address.\n  * `textMessage` or `phone`: a shortcode or phone number.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:from"
                                },
                                "testEnabled": {
                                    "title": "Test Enabled",
                                    "type": "boolean",
                                    "description": "Specify whether campaign activity is of type A/B testing.",
                                    "default": false,
                                    "meta:xdmType": "boolean",
                                    "meta:xdmField": "xdm:testEnabled"
                                },
                                "messageClass": {
                                    "title": "Message Class",
                                    "type": "string",
                                    "meta:enum": {
                                        "one_time": "Marketing (One Time)",
                                        "continuous": "Recurring",
                                        "event_based": "Transactional (Event-based)"
                                    },
                                    "description": "Mode of delivery for the messages sent.\n",
                                    "default": "one_time",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:messageClass"
                                },
                                "templateID": {
                                    "title": "Identifier of the Template",
                                    "type": "integer",
                                    "description": "The delivery template's ID used to initialize this delivery.\n\nThe type the template used in Adobe Campaign can be identified using the `messageClass`.\n\n* `messageClass` = `oneTime`: the template is standard delivery template.\n* `messageClass` = `continuous`: the template is a recurring delivery.\n* `messageClass` = `transactional`: the template is a transactionnal message template.\n",
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:templateID"
                                },
                                "deliveryLabel": {
                                    "title": "Delivery Label",
                                    "type": "string",
                                    "description": "A human-friendly name of the campaign activity which is originating this message.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:deliveryLabel"
                                },
                                "deliveryName": {
                                    "title": "Delivery Internal name",
                                    "type": "string",
                                    "description": "A human-friendly identifier of the campaign activity which is originating this message.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:deliveryName"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/campaign/delivery"
                        },
                        "marketingCampaign": {
                            "title": "The campaign activity originating a message to a recipient.",
                            "type": "object",
                            "meta:xdmType": "object",
                            "properties": {
                                "id": {
                                    "title": "Campaign ID",
                                    "type": "integer",
                                    "description": "Identifier of the marketing campaign to which activity originating this message belongs to.",
                                    "meta:xdmType": "int",
                                    "meta:xdmField": "xdm:id"
                                },
                                "campaignName": {
                                    "title": "Campaign Internal name",
                                    "type": "string",
                                    "description": "A human-friendly identifier of the marketing campaign which is originating this message.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:campaignName"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/campaign/marketingCampaign"
                        },
                        "link": {
                            "title": "The campaign activity originating a message to a recipient.",
                            "type": "object",
                            "meta:xdmType": "object",
                            "properties": {
                                "id": {
                                    "title": "Tracking URL ID",
                                    "type": "string",
                                    "description": "Unique Identifier of the Link",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:id"
                                },
                                "description": {
                                    "title": "Tracking URL Description",
                                    "type": "string",
                                    "description": "A human-friendly description of the Link.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:description"
                                },
                                "url": {
                                    "title": "URL",
                                    "format": "uri",
                                    "type": "string",
                                    "description": "URL of the Link.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:url"
                                },
                                "occurrence": {
                                    "title": "Occurrence",
                                    "type": "integer",
                                    "description": "URL occurrence index in the content (first is 1). When the same URL is available several times in the same content, its is necessary to track which occurrence of the URL has been clicked on.",
                                    "default": 1,
                                    "minimum": 1,
                                    "maximum": 32767,
                                    "meta:xdmType": "short",
                                    "meta:xdmField": "xdm:occurrence"
                                },
                                "label": {
                                    "title": "URL Label",
                                    "type": "string",
                                    "description": "The user-friendly label clicking on which the link opens.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:label"
                                },
                                "category": {
                                    "title": "URL Category",
                                    "type": "string",
                                    "description": "The category of the link. It may be `subscription`, or a user-defined category.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:category"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/campaign/link"
                        },
                        "orchestration": {
                            "title": "Campaign Orchestration for creating user journey.",
                            "type": "object",
                            "meta:xdmType": "object",
                            "properties": {
                                "businessReason": {
                                    "title": "Business Reason",
                                    "type": "string",
                                    "description": "Business qualifier that identifies the event sent by the data source. It informs on the business reason for sending the event. It is unique per organization. This is used by Campaign orchestration to identify the event without inspecting its payload to determine which action should be triggered when the event is received. The value of this field is a contract between Campaign orchestration and the data source.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "xdm:businessReason"
                                },
                                "orchestrationDetails": {
                                    "title": "Orchestration Details",
                                    "description": "Set of attributes that are associated with every orchestration.",
                                    "$ref": "adobe/experience/campaign/orchestration/orchestrationdetails",
                                    "meta:xdmField": "xdm:orchestrationDetails"
                                }
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/campaign/orchestration"
                        },
                        "containerID": {
                            "title": "Container identifier",
                            "type": "string",
                            "description": "The identifier denoting the container with which campaign experience event is associated.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/campaign/containerID"
                        },
                        "mutation": {
                            "title": "Mutated fields from the previous experienceEvent.",
                            "description": "Information of the fields that have changed since the previous experienceevent to keep track of the state changes across events. For e.g. if when an email gets sent, an experienceEvent with metric `sends` will be sent. This may get bounced and an experienceEvent with metric `bounces` will be sent then. It may be important for a downstream application to know that the previous experienceEvent with metric `sends` is now to be invalidated. This field will contain the values from the previous experienceEvent that have a different value in the current experienceEvent.",
                            "$ref": "adobe/experience/campaign/mutationevent",
                            "meta:xdmField": "https://ns.adobe.com/experience/campaign/mutation"
                        }
                    }
                },
                "target": {
                    "type": "object",
                    "meta:xdmType": "object",
                    "properties": {
                        "implementation": {
                            "title": "Client Implementation for Adobe Target",
                            "$ref": "context/implementationdetails",
                            "description": "Client details interacting with Adobe Target.",
                            "meta:xdmField": "https://ns.adobe.com/xdm/experience/target/implementation"
                        },
                        "clientcode": {
                            "title": "Adobe Target client code",
                            "type": "string",
                            "description": "Adobe Target client code.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/target/clientcode"
                        },
                        "mboxname": {
                            "title": "Adobe Target Mbox Name",
                            "type": "string",
                            "description": "Adobe Target mbox name.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/target/mboxname"
                        },
                        "mboxversion": {
                            "title": "Adobe Target Mbox version",
                            "type": "string",
                            "description": "Adobe Target mbox version.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/target/mboxversion"
                        },
                        "sessionid": {
                            "title": "Adobe Target Session Identifier",
                            "type": "string",
                            "description": "Adobe Target session identifier.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/target/sessionid"
                        },
                        "pagedetail": {
                            "type": "object",
                            "meta:xdmType": "object",
                            "properties": {
                                "pageid": {
                                    "title": "Target Unique Page identifier",
                                    "type": "string",
                                    "format": "uri",
                                    "description": "Target generated page identifier for current event.",
                                    "meta:xdmType": "string",
                                    "meta:xdmField": "https://ns.adobe.com/experience/target/pagedetail/pageid"
                                },
                                "pagescore": {
                                    "title": "Page Score",
                                    "type": "number",
                                    "description": "Customer assigned score to visited page.",
                                    "meta:xdmType": "number",
                                    "meta:xdmField": "https://ns.adobe.com/experience/target/pagedetail/pagescore"
                                }
                            }
                        },
                        "environmentID": {
                            "title": "Environment Identifier",
                            "type": "string",
                            "description": "Identifier of the environment on which the event was processed.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/target/environmentID"
                        },
                        "activities": {
                            "title": "Activities",
                            "type": "array",
                            "description": "A list of items representing executed activities.",
                            "meta:xdmType": "array",
                            "items": {
                                "$ref": "adobe/experience/target/activity"
                            },
                            "meta:xdmField": "https://ns.adobe.com/experience/target/activities"
                        }
                    }
                },
                "idservice": {
                    "type": "object",
                    "meta:xdmType": "object",
                    "properties": {
                        "implementation": {
                            "title": "Client Implementation for Adobe Visitor Service",
                            "$ref": "context/implementationdetails",
                            "description": "Client details interacting with Adobe Experience Cloud ID Service.",
                            "meta:xdmField": "https://ns.adobe.com/experience/idservice/implementation"
                        }
                    }
                },
                "profile": {
                    "type": "object",
                    "meta:xdmType": "object",
                    "properties": {
                        "originDatasetID": {
                            "title": "Origin Dataset ID",
                            "type": "string",
                            "description": "Identity of the Dataset that the Profile Service ingested the data from. Usage is reserved for the Profile Service.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "https://ns.adobe.com/experience/profile/originDatasetID"
                        }
                    }
                }
            }
        },
        "eventType": {
            "title": "Type of the event received",
            "type": "string",
            "description": "The type for the external event received",
            "meta:enum": {
                "http": "The external event recieved on http endpoint"
            },
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:eventType"
        }
    },
    "required": [
        "_id",
        "timestamp",
        "endUserIDs"
    ],
    "id": "context/experienceevent",
    "xdmVersion": "0.9.9.5",
    "meta:altId": "_xdm.context.experienceevent",
    "meta:xdmType": "object",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "context/experienceevent"
}
```