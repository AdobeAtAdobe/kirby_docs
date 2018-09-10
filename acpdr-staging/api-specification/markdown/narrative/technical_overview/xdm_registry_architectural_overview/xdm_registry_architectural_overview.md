# XDM Registry Overview

## 1. Overview
This document provides a technical overview for using the XDM Registry in Adobe Cloud Platform outlining why and what Experience Data Model (XDM) is and how it is used in common workflows through the API.

---

## 2. Understanding XDM

The Experience Data Model (XDM) is the ecosystem where customer experience data is represented using a standard schemas. These standard schemas will enable easier integration of data from all our Adobe solutions and external sources. After the data is ingested and transformed to standard schemas, XDM allows the sharing of this data in an agile and normalized setting within the Adobe Cloud Platform and its services. XDM offers single-source data management focused on the creation, storage, retrieval and manipulation of data. The customer data model consists of standard schemas from the XDM, which can be extended by the customer and schemas created by the customer. These schema are called Customer Extended Schemas.


### 2.1. What is XDM used for

![](xdm_architectural.png)

The main purpose of gathering this data is understanding what that data means and then utilizing this data to understand customers and users. Some marketing actions may involving having to match products to consumers, manage promotional channels, manage distribution channels, conduct market research and understand consumer intend. Many existing marketing products are built to focus on solving a particular solution. Over time, these products all shared common concepts which were used and named similarly but data was not easily exported and shared between them since the definitions were all different in some way.

---

## 3. How to Use XDM
The full resource for API calls can be found in the [swagger documentation](https://www.adobe.io/apis/cloudplatform/dataservices/api-reference.html)

XDM uses a hierarchical structure to store data. Customers start with an Adobe released *core* schema definition or a customer extended schema as the parent. The core XDM schemas and sub-schemas (core.Address, Profile, ExperienceEvent etc.) are shared with all the tentants of the platform. All the root artifacts are inherited by all theOrganization containers (IMS Org). An IMS Organization represents the customer. For this example the IMS Org Acme Corp. As Adobe releases new XDM artifacts, all the IMS Orgs underneath the root container get the updates automatically.

IMS Organization **Acme Corp** inherits all the core XDM entities and models. (`_customer` is a variable that represents the IMS Org). Acme Corp has many branches in different countries so they would create an extension namespace under their IMS Org: `Acme Corp US` and `Acme Corp EU`. Both of these namespaces will have all extensions created in the IMS Org parent.

A **schema** is an abstract definition of real-world objects such as *Profile*, *ExperienceEvent*, or *Asset*. Schemas are the highest level element and can have sub-schemas are named collections of facts such as *Age*, *hairColor*, or *Address*. The data within the **sub-schemas** are called **fields** and they can be scalar or an array of items as defined by the general JSON-schema [documentation](https://www.w3schools.com/js/js_json_datatypes.asp).

### 3.1. XDM Profile

![](core_profile.png)

Let's look at one of the main Schemas in XDM. The XDM Profile schema is a collection of attributes describing a person (Address, Person, Phone Number). Profiles can be identified or partially-identified. Profiles that are highly identified may contain personal information such as name, gender, date of birth, location, and contact information. In contrast, a profile that is partially-identified will have anonymous behavior signals such as browser cookies. Over time, these profiles can become more identifiable as content regarding preferences and interests towards brands are gathered and stored in the profile.

Through the API we can get the `Profile` JSON object.

##### Request
```
GET /xdms/{namespace}/{objectName}
```
```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/profile/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

`{namespace}`: The base namespace. This will be `core` or `model`.
`{objectName}`: Name of the entity we want to extend.
`{extensionNS}`: Name of the extension namespace we want to put the extension in. An example of this is a company branch.
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration, provided in https://console.adobe.io.
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration
`{ACCESS_TOKEN}`: Token provided after authentication

##### Response

The `Profile` schema object is in the response below. The entities are listed under the `properties` key. In the next section, we will be extending the `Person` entity with new fields and also creating a new entity that can be added to the `Profile` schema.

```JSON
{
    "created": 1529354713137,
    "updated": 1529354713137,
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
                    "version": "1",
                    "created": 1516770457179,
                    "updated": 1516770457179,
                    "createdClient": "acp_ui_platform",
                    "updatedUser": "5818D82F54ECF25C0A4C86E9@AdobeID",
                    "imsOrg": "EDCE5A655A5E73FF0A494113@AdobeOrg",
                    "title": "Default extension",
                    "type": "object",
                    "description": "The default extension",
                    "properties": {
                        "username": {
                            "type": "string",
                            "id": "username",
                            "title": "Username",
                            "description": ""
                        },
                        "created": {
                            "type": "string",
                            "id": "created",
                            "title": "Created"
                        }
                    },
                    "extNamespace": "default"
                }
            }
        }
    },
    "$id": "context/profile",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "xdmVersion": "0.9.9.2",
    "meta:extends": [
        "external/repo/commmon"
    ],
    "id": "context/profile"
}

```

### 3.2. Extensions

One issue with normalization of data using a standard data model is incompatibility with data which can not be translated. This untranslated data may be unsuitable for the design schema of a specific data platform and will prevent sharing of the data.

Extensions solve this issue by allowing customizable data. Personalized data can be [ingested](allservices.html.html#!api-specification/markdown/narrative/technical_overview/ingest_architectural_overview/ingest_architectural_overview.md) into the XDM so that the data can then be shared.

There are ways the schemas can be extended:
* Extending an existing XDM schema with new custom fields
* Extending XDM through new sub-schemas.

There are three different levels to extend XDM

Level | Method
------ | ------
XDM Standard | The overall XDM standard schemas are available as Open Source on https://github.com/adobe/xdm. Every individual and organization is welcome to contribute. The Schemas and fields in the standard apply to all customers within Adobe Cloud Platform. Periodically the XDM Registry is refreshed with updated Schemas from this Open Source repository
Vendor extension | Independent Software Vendors can add their own extensions to the XDM Registry. These are extensions that do not apply to all customers, but only to a subset of customers that are using the specific vendor solution. Adobe Experience Cloud specific extensions are also expressed as as Vendor extension
Customer extension | Customer specific extension that only apply to the specific tenant. A customer extension is automatically created when a customer extends schemas in the XDM Registry

#### 3.2.1 Extending XDM Schemas With Custom Properties

The first type of extension is extending an existing base type with additional fields to represent the schema of data that will be ingested and the common use cases of the schema.

**Example**

The core `Person` has the following fields:

![](person.png)

A customer manages cosmetics products and would like to add a hair color field to the `Person` entity. The `Person` entity is under the `core.Profile`

##### Request

The following API call will add the *Hair Color* field.
```
POST /xdms/{namespace}/{objectName}/_customer/{extensionNS}
```

```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/CustomerCompany"
-H "accept: application/json" \
-H "x-api-key: {API_KEY}" \
-H "x-gw-ims-org-id: {IMG_ORG}" -H "Authorization: Bearer {ACCESS_TOKEN}" \
-H "content-type: application/json" \
-d "{
       \"title\": \"Hair Color\",
       \"type\": \"object\",
       \"description\": \"Hair Color of Person\",
       \"extNamespace\": \"CustomerCompany\",
       \"properties\": {
         \"hairColor\":{
           \"type\":\"string\",
           \"description\":\"Hair Color\"
          }
         }
     }"
```

`{namespace}`: The base namespace. This will be `core` or `model`.
`{objectName}`: Name of the entity we want to extend.
`{extensionNS}`: Name of the extension namespace we want to put the extension in. An example of this is a company branch.  (in this case `CustomerCompany`).
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration
`{ACCESS_TOKEN}`: Token provided after authentication


##### Response

```
Array[ @/xdms/context/person/_customer/CustomerCompany ]
```

This is what the `Person` entity will look like now.

![](extended_person.png)

You can use the following call to retrieve the specific HairColor extension under the `Person` entity under the `_customer` namespace and `CustomerCompany` extension namespace


##### Request
```
GET /xdms/{namespace}/{objectName}/_customer/{extensionNS}/
```
```SHELL
curl -X GET  https://platform.adobe.io/data/foundation/catalog/xdms/context/person/_customer/CustomerCompany/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

`{namespace}`: The base namespace. This will be `core` or `model`.
`{objectName}`: Name of the entity we want to extend.
`{extensionNS}`: Name of the extension namespace we want to put the extension in. An example of this is a company branch.
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration
`{ACCESS_TOKEN}`: Token provided after authentication


##### Response

This is how your extension payload is stored in `properties` of the `Person` entity

```JSON
{
    "version": "1",
    "created": "number",
    "updated": "number",
    "createdClient": "{API_KEY}",
    "updatedUser": "string",
    "imsOrg": "{IMS_ORG}",
    "title": "string",
    "type": "object",
    "description": "Hair Color of Person",
    "properties": {
        "hairColor": {
            "type": "string",
            "description": "Hair Color"
        }
    },
    "extNamespace": "{extensionNS}"
}
```

Now lets look at the bigger picture at the `Person` entity.

##### Request
```
GET /xdms/{namespace}/{objectName}
```
```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/person/ \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

`{namespace}`: The base namespace. This will be `core` or `model`.
`{objectName}`: Name of the entity we want to extend.
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration
`{ACCESS_TOKEN}`: Token provided after authentication

##### Response

The `Person` entity will now look like this.


```JSON
{
    "created": "number",
    "updated": "number",
    "title": "Person",
    "type": "object",
    "description": "An individual actor, contact, or owner.",
    "properties": {
        "firstName": {},
        "lastName": {},
        "middleName": {},
        "courtesyTitle": {},
        "birthDay": {},
        "birthMonth": {},
        "birthYear": {},
        "gender": {},
        "audit": {},
        "_customer": {
            "type": "object",
            "properties": {
                "default": {},
                "CustomerCompany": {
                    "version": "1",
                    "created": "number",
                    "updated": "number",
                    "createdClient": "{API_KEY}",
                    "updatedUser": "string",
                    "imsOrg": "{IMS_ORG}",
                    "title": "Hair Color",
                    "type": "object",
                    "description": "Hair Color of Person",
                    "properties": {
                        "hairColor": {
                            "type": "string",
                            "description": "Hair Color"
                        }
                    },
                    "extNamespace": "{extensionNS}"
                }
            }
        }
    },
    "id": "context/person",
    "xdmVersion": "0.9.7",
    "xdmType": "entity"
}
```

Note that the third-party XDM extension is added into the `_customer` namespace.  `_customer` is just a variable that refers to your `IMS_ORG` that your integration is created under. Customer extensions are private and are visible only to the customer tenant that created it either through the XDM API and UI. The IMS Organization has the option to create any number of different extensions names (we used `CustomerCompany`) to group and manage extensions based on different business units or data sources.

*Vendors* can can also extend schemas with custom properties. Their extensions are located under the `_vendor` namespace are are considered public. This is so the configured definitions and extensions created by independent software vendors are shared with all XDM customers that install the applications.

#### 3.2.2 Extending XDM Through New Schemas

The second type of extension is creating a new schema object. This is useful for when a user wants a new child object or entity under the parent schema.

**Example**
An airline company wants a schema to store data for their flights. There is no existing `Flights` schema so they will create a custom one. Within the schema they want to store information about flight ID, flight number and carrier name. These will be the fields for the schema `Flights`.

You can use the following API call in your terminal to create the `Flights` object. The response body will be where the schema is stored.

##### Request
```
POST /xdms/_customer/{extensionNS}/{objectName}
```
```SHELL
curl -X POST "https://platform.adobe.io/data/foundation/catalog/xdms/_customer/default/Flights" /
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
  -H "content-type: application/json" -d "{ \
      "imsOrg\": \"{IMS_ORG}\", \
      "title\": \"Flights\", \
      "type\": \"object\", \
      "description\": \"Flights data\", \
      "properties\": { \
        "flightId\": { \
          "type\": \"string\", \
          "id\": \"flightId\", \
          "title\": \"FlightId\"
        }, \
        "flightNumber\": { \
          "type\": \"string\", \
          "id\": \"flightNumber\", \
          "title\": \"Flight Number\"
        }, \
        "carrier\": { \
          "type\": \"string\", \
          "id\": \"carrier\", \
          "title\": \"Carrier\"
        }
      }, \
      "xdmType\": \"model\", \
      "extNamespace\": \"default\", \
      "id\": \"_customer/default/flights\"
    }"
```

`{objectName}`: Name of the entity we want to extend.
`{extensionNS}`: Name of the extension namespace we want to put the extension in.
`{API_KEY}`: Your specific API key value found in your unique Adobe Cloud Platform integration.
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Cloud Platform integration
`{ACCESS_TOKEN}`: Token provided after authentication

##### Response

```
@/xdms/_customer/default/Flights
```

We can use the response body `"@/xdms/_customer/default/Flights"` to find the custom object we created.

##### Request

```SHELL
curl -X GET
  https://platform.adobe.io/data/foundation/catalog/xdms/_customer/default/Flights
  -H 'Authorization: Bearer {ACCESS_TOKEN}'
  -H 'x-api-key: {API_KEY}'
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

```JSON
{
    "version": "1",
    "created": "number",
    "updated": "number",
    "createdClient": "{API_KEY}",
    "updatedUser": "string",
    "imsOrg": "IMS_ORG",
    "title": "Flights",
    "type": "object",
    "description": "Flights data",
    "properties": {
        "flightId": {
            "type": "string",
            "id": "flightId",
            "title": "FlightId"
        },
        "flightNumber": {
            "type": "string",
            "id": "flightNumber",
            "title": "Flight Number"
        },
        "carrier": {
            "type": "string",
            "id": "carrier",
            "title": "Carrier"
        }
    },
    "xdmType": "model",
    "extNamespace": "{extensionNS}",
    "id": "_customer/default/Flights"
}
```

### 3.3. ExperienceEvent

Another important schema in XDM is the ExperienceEvent schema.

The ExperienceEvent schema schema is used to capture events that are altering one or more fields or sub-schemas. Some examples of entities include physical address, email address, and geo. The main information being captured and stored is the information about the observation and when it occurs. Events are either implicit or explicit. Implicit events involve changes that occur without human interaction like scheduled email sending of newsletters, battery voltage reaching a certain threshold, or a person entering a proximity sensor. Explicit events involve direct observation of human action during the session.


```SHELL
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/xdms/context/experienceevent/ \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  -H 'x-api-key: <YOUR_CLIENT_ID>' \
  -H 'x-gw-ims-org-id: <YOUR_ORGANIZATION_ID>'
```


```JSON
{
    "created": 1529354713026,
    "updated": 1529354713026,
    "title": "ExperienceEvent",
    "type": "object",
    "description": "The core ExperienceEvent XDM is used to capture observations that are altering one or more related XDMs/entities. The ExperienceEvent captures information about the observation taking place and when it is occurring. It is critical for time domain analytics as it allows observation and analysis of changes that occur in windows of time and comparison with other windows of time to track trends. ExperienceEvent are either explicit or implicit. Explicit events are direct observations of a human action taking place during a session. Implicit events are events that are being raised without a direct human action. Examples of implicit events are scheduled email sending of newsletters, battery voltage reaching a certain threshold, a person entering into range of a proximity sensor. While not all events are easily categorized across all data sources, it is extremely valuable to harmonize similar events into similar types for processing where possible, and the XDM specifications does this by defining a set of enumerated **type** attribute values with specific semantic meanings. Where possible events must be constrained to these enumerated values to facilitate interoperability.",
    "properties": {
        "_id": {
            "title": "Identifier",
            "type": "string",
            "format": "uri",
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
            "description": "Condensed, normalized encapsulation of all end user identifiers.\n",
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
        }
    }
    "required": [
        "_id",
        "timestamp",
        "endUserIDs"
    ],
    "$id": "context/experienceevent",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "xdmVersion": "0.9.9.2"
}

```
## 4. XDM Data Types
As shown in the examples above, a formal schema is defined using the JSON schema standard that describes what the data should look
like when formatted as JSON. Because we have XDM data that may exist in other serialization formats, the schemas also exposes a field level 
attribute named "meta:xdmType" which describes the base data type being represented. This base data type is what should be used in other 
serialization formats as described by the table below.

|XDM Type<br>(meta:xdmType)|JSON<br>(JSON Schema)|Parquet<br>(type/annotation)|Spark SQL|Java|Scala|.NET|CosmosDB|MongoDB|Aerospike|Protobuf 2
|---|---|---|---|---|---|---|---|---|---|---|
|string|type:string|BYTE_ARRAY/UTF8|StringType|java.lang.String|String|Stystem.String|String|string|String|string
|number|type:number|DOUBLE|DoubleType|java.lang.Double|Double|System.Double|Number|double|Double|double
|long|type:integer<br>maiximum:2^53+1<br>minimum:-2^53+1|INT64|LongType|java.lang.Long|Long|System.Int64|Number|long|Integer|int64
|int|type:integer<br>maiximum:2^31<br>minimum:-2^31|INT32/INT_32|IntegerType|java.lang.Integer|Int|System.Int32|Number|int|Integer|int32
|short|type:integer<br>maiximum:2^15<br>minimum:-2^15|INT32/INT_16|ShortType|java.lang.Short|Short|System.Int16|Number|int|Integer|int32
|byte|type:integer<br>maiximum:2^7<br>minimum:-2^7|INT32/INT_8|ByteType|java.lang.Short|Byte|System.SByte|Number|int|Integer|int32
|boolean|type:boolean|BOOLEAN|BooleanType|java.lang.Boolean|Boolean|System.Boolean|Boolean|bool|Integer|Integer|bool
|date|type:string<br>format:date<br>(RFC 3339, section 5.6)|INT32/DATE|DateType|java.util.Date|java.util.Date|System.DateTime|String|date|Integer<br>(unix millis)|int64<br>(unix millis)
|date-time|type:string<br>format:date-time<br>(RFC 3339, section 5.6)|INT64/TIMESTAMP_MILLIS|TimestampType|java.util.Date|java.util.Date|System.DateTime|String|timestamp|Integer<br>(unix millis)|int64<br>(unix millis)