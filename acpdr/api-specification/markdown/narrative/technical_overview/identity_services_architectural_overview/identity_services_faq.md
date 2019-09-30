# Identity Service troubleshooting guide

This document provides answers to frequently asked questions about Adobe Experience Platform Identity Service, as well as a troubleshooting guide for common errors. For questions and troubleshooting regarding Platform APIs in general, see the [Adobe Experience Platform API troubleshooting guide](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md).

Data that identifies a single customer is often fragmented across the various devices and systems that they use to engage with your brand. **Identity Service** gathers these fragmented identities together, facilitating a complete understanding of customer behavior so you can deliver impactful digital experiences in real-time. For more information, see the [Identity Service overview](identity_services_architectural_overview.md).

### FAQ
- Identity data
    - [What is identity data?](#what-is-identity-data)
    - [What is the benefit of supplying identity data?](#what-is-the-benefit-of-supplying-identity-data)
    - [What are known and anonymous identities?](#what-are-known-and-anonymous-identities)
    - [What is a Private Identity Graph?](#what-is-a-private-identity-graph)
- Identity data fields
    - [How do I create multiple identity fields within an XDM schema?](#how-do-i-create-multiple-identity-fields-within-an-xdm-schema)
    - [Are there contexts where some fields should not be labeled as identities?](#are-there-contexts-where-some-fields-should-not-be-labeled-as-identities)
    - [Why are my identity fields not linking the way I expect?](#why-are-my-identity-fields-not-linking-the-way-i-expect)
- Identity namespaces
    - [What is an identity namespace?](#what-is-an-identity-namespace)
    - [How do I associate an identity with an identity namespace?](#how-do-i-associate-an-identity-with-an-identity-namespace)
    - [What are the standard identity namespaces provided by Experience Platform?](#what-are-the-standard-identity-namespaces-provided-by-experience-platform)
    - [Where can I find the list of identity namespaces available for my organization?](#where-can-i-find-the-list-of-identity-namespaces-available-for-my-organization)
    - [How do I create a custom namespace for my organization?](#how-do-i-create-a-custom-namespace-for-my-organization)
    - [What are composite identities and XIDs?](#what-are-composite-identities-and-xids)
- Personally identifiable information (PII)
    - [How does Identity Service handle personally identifiable information (PII)?](#how-does-identity-service-handle-personally-identifiable-information-pii)
    - [Should I encrypt all PII before sending to Platform?](#should-i-encrypt-all-pii-before-sending-to-platform)
    - [Are there any considerations when hashing PII-based identities?](#are-there-any-considerations-when-hashing-pii-based-identities)

### Troubleshooting
- Identity Service error messages
    - [Missing required query parameter](#missing-required-query-parameter)
    - [Timestamp should be within last 180 days](#timestamp-should-be-within-last-180-days)
    - [There is a limit of 1000 XIDs in a single call](#there-is-a-limit-of-1000-xids-in-a-single-call)
    - [There is a limit for 1000 compositeXids in a single call](#there-is-a-limit-for-1000-compositexids-in-a-single-call)
    - [The graph-type specified is invalid](#the-graph-type-specified-is-invalid)
    - [Service token does not have valid scope](#service-token-does-not-have-valid-scope)
    - [Gateway service token is not valid](#gateway-service-token-is-not-valid)
    - [Authorization service token is not valid](#authorization-service-token-is-not-valid)
    - [User token does not have valid product context](#user-token-does-not-have-valid-product-context)
    - [Internal error when getting native XID from identity and namespace code](#internal-error-when-getting-native-xid-from-identity-and-namespace-code)
    - [The IMS Org is not provisioned for Identity Service usage](#the-ims-org-is-not-provisioned-for-identity-service-usage)
    - [Internal Server Error](#internal-server-error)
- Batch Ingestion error codes
    - [Unknown XDM schema](#unknown-xdm-schema)
    - [There were 0 valid identities in the first 100 rows of the processed batch](#there-were-0-valid-identities-in-the-first-100-rows-of-the-processed-batch)
    - [Skipped records as they had only 1 identity per XDM record](#skipped-records-as-they-had-only-1-identity-per-xdm-record)
    - [Namespace Code is not registered for this IMS Org](#namespace-code-is-not-registered-for-this-ims-org)
    - [Skipping batch ingestion as IMS Org is not provisioned for Private Identity Graph](#skipping-batch-ingestion-as-ims-org-is-not-provisioned-for-private-identity-graph)
    - [Internal Error](#internal-error)

## FAQ

The following is a list of answers to frequently asked questions about Identity Service.

## What is identity data?

Identity data is any data that can be used to identify an individual person. Depending on the context of how the data is used within your organization, identity data can include usernames, email addresses, and IDs from CRM systems. Identity data is not limited to registered users of your website or service, as anonymous users can also be identified by their device or cookie ID.

## What is the benefit of labeling data fields as identities?

Labeling certain data fields as identities in your record and time series data allows you to map identity relationships within the natural structure of your data and reconcile duplicate data cross channels. See the [Identity Service overview](identity_services_architectural_overview.md) for more information.

## What are known and anonymous identities?

A **known identity** refers to an identity value that can be used on its own or with other information to identify, contact, or locate an individual person. Examples of known identities may include email addresses, phone numbers, and CRM IDs.

An **anonymous identity** refers to an identity value that cannot be used on its own or with other information to identify, contact, or locate an individual person (such as a cookie ID).

## What is a Private Identity Graph?

A Private Identity Graph is a private map of relationships between stitched and linked identities, visible only to your organization. 

When more than one identity is included in any data ingested from a streaming endpoint or sent to a dataset enabled for Identity Service, those identities are linked in the Private Identity Graph. Identity Service leverages this graph to glean identities for a given consumer or entity, allowing for identity stitching and profile merging.

## How do I create multiple identity fields within an XDM schema?

[Experience Data Model (XDM)](../schema_registry/xdm_system/xdm_system_in_experience_platform.md) schemas support multiple identity fields. Any data field of type `string` within a schema that implements the XDM Profile or XDM ExperienceEvent class can be labeled as an identity field. Once labeled, any data contained in these fields is added to the profile's identity map.

For steps on how to label an XDM field as an identity field using the user interface, see the [Identity section](../../tutorials/schema_editor_tutorial/schema_editor_tutorial.md#set-a-schema-field-as-an-identity-field) in the Schema Editor tutorial. If you are using the API, see the [Identity descriptor section](../../tutorials/schema_registry_api_tutorial/schema_registry_api_tutorial.md#define-identity-descriptor) in the Schema Registry API tutorial.

## Are there contexts where some fields should not be labeled as identities?

Identity fields should be reserved for values that are unique to each individual. For example, consider a dataset for a customer loyalty program. The "loyalty level" field (gold, silver, bronze) would not be a useful identity field, whereas the loyalty ID&mdash;a unique value&mdash;would be.

Fields like ZIP codes and IP addresses should not be labeled as identities for individuals, as these values can apply to more than one individual person. These types of fields should only be labeled as identities for household-level marketing strategies.

## Why are my identity fields not linking the way I expect?

Using the [`/cluster/members` endpoint](identity_services_api.md#get-all-identities-in-a-cluster) in the Identity Service API, you can view the associated identities for one or more identity fields. If the response does not return the linked identities you expect, ensure that you are providing the appropriate identity information in your XDM data. See the section on [providing XDM data to Identity Service](identity_services_architectural_overview.md#supplying-identity-data-to-identity-service) in the Identity Service overview for more information.

## What is an identity namespace?

An identity namespace gives context for how identity fields relate to a customer's identity. For example, identity fields under the "Email" namespace should conform to a standard email format (name<span>@emailprovider.com) whereas fields using the "Phone" namespace should conform to a standard phone number (such as 987-555-1234 in North America).

Namespaces distinguish similar identity values between different CRM systems. For example, consider a profile that contains a numerical Loyalty ID associated with your company's rewards program. A namespace of "Loyalty" would separate this value from a similar numeric ID for your eCommerce system that also appears in the same profile.

See the [identity namespace overview](../identity_namespace_overview/identity_namespace_overview.md) for more information.

## How do I associate an identity with an identity namespace?

Identity fields must be associated with an existing identity namespace when they are created. Any new namespaces must be [created using the API](#how-do-i-create-a-custom-namespace-for-my-organization) before associating them with identity fields.

For step-by-step instructions for defining a namespace when creating an identity descriptor using the API, please see the section on [creating a descriptor](../schema_registry/schema_registry_developer_guide.md#create-descriptor) in the Schema Registry developer guide. For marking a schema field as an identity in the UI, follow the steps in the [Schema Editor tutorial](../../tutorials/schema_registry_api_tutorial/schema_registry_api_tutorial.md).

## What are the standard identity namespaces provided by Experience Platform?

The following standard namespaces are provided for use by all organizations within Experience Platform:

|Display Name|ID|Code|Description|
|------------|---|---|-----------|
|CORE|0|CORE|legacy name: "Adobe AudienceManager"|
|ECID|4|ECID|alias: "Adobe Marketing Cloud ID", "Adobe Experience Cloud ID", "Adobe Experience Platform ID"|
|Email|6|Email||
|Email (SHA256, lowercased)|11|Emails|Standard namespace for pre-hashed email. Values provided in this namespace are converted to lowercase before hashing with SHA-256.|
|Phone|7|Phone||
|Windows AID|8|WAID||
|AdCloud|411|AdCloud|alias: Ad Cloud|
|Adobe Target|9|TNTID|Target ID|
|Google Ad ID|20914|GAID|GAID|
|Apple IDFA|20915|IDFA|ID for Advertisers|

## Where can I find the list of identity namespaces available for my organization?

Using the [Identity Service API](../../../../../../acpdr/swagger-specs/id-service-api.yaml), you can list all available identity namespaces for your organization by making a GET request to the `/idnamespace/identities` endpoint. See the section on [listing available namespaces](identity_services_api.md#listing-available-namespaces) in the Identity Service API overview for more information.

## How do I create a custom namespace for my organization?

Using the [Identity Service API](../../../../../../acpdr/swagger-specs/id-service-api.yaml), you can create a custom identity namespace for your organization by making a POST request to the `/idnamespace/identities` endpoint. See the section on [creating a custom namespace](identity_services_api.md#creating-a-custom-namespace) in the Identity Service API overview for more information.

## What are composite identities and XIDs?

Identities are referenced in API calls either by their composite identity or XID. A **composite identity** is a representation of an identity that contains an ID value and a namespace. An **XID** is a single-value identifier that represents the same construct as a composite identity (an ID and a namespace), and is automatically assigned to new identities when persisted by Identity Service. See the [Identity Service API overview](identity_services_api.md) for more information.

## How does Identity Service handle personally identifiable information (PII)?

Identity Service creates a strong, one-way cryptographic hash of PII prior to persisting values. Identity data in the "Phone" and "Email" namespaces are automatically hashed using SHA-256, with "Email" values automatically converted to lowercase prior to hashing.

## Should I encrypt all PII before sending to Platform?

You do not need to manually encrypt PII data before ingesting it into Platform. By applying the `I1` data usage label to all applicable data fields, Platform automatically converts these fields into hashed ID values upon ingestion.

For steps on how to apply and manage data usage labels, see the [data usage labels tutorial](../../tutorials/dule/dule_working_with_labels.md).

## Are there any considerations when hashing PII-based identities?

If you are sending hashed PII values to Identity Service, you must use the same encryption method across your datasets. This ensures that the same identity value across datasets generates the same hashed values and are able to be properly matched and linked in the identity graph.

<!-- Documentation does not show any methods of editing the identityMap directly, and this table never overtly recommends using identityMap anyway. This should probably be removed unless PM thinks otherwise. -->
<!-- ## When should I use the Identity map rather than labeling individual XDM schema fields?

The following table describes when the recommended approach for including identity data in your XDM would be identity map and when an identity field is the better method.

> **Note:** An advantage `identityMap` has is the ability to include multiple identity values for a single namespace.

Write|XDM identity field|`identityMap`
---|---|---
UI|Supported|Supported
Developer|Recommended|Supported
ETL|Recommended|Avoid - While this is supported, data should be formatted naturally when using an ETL, favoring identity fields over `identityMap`.
Internal solutions|Preferred|Common

--- -->

## Troubleshooting

The following section provides troubleshooting suggestions for specific error codes and unexpected behavior you may encounter while working with the Identity Service API.

## Identity Service error messages

The following is a list of error messages you may encounter when using the Identity Service API.

### Missing required query parameter

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "Missing required query parameter - namespace"
}
```

This error displays when a required query parameter was not included in the request path. The `detail` of the error message provides the name of the missing parameter. Variations of this error message include:
  * Missing required query parameter &ndash; nsId
  * Missing required query parameter &ndash; id
  * Missing required query parameter &ndash; xid or (nsid,id)
  * Missing required query parameter &ndash; targetNs
  * Missing required query parameter &ndash; xids or compositeXids

Check that you are properly including the indicated parameter in the request path before trying again.

### Timestamp should be within last 180 days

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "Timestamp should be within last 180 days"
}
```

Identity Service purges data older than 180 days. This error message displays when you attempt to access data older than this.

### There is a limit of 1000 XIDs in a single call

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "There is a limit of 1000 XIDs in a single call"
}
```

This error message displays when you attempt to retrieve identity information for more than the maximum number of [XIDs](#what-are-composite-identities-and-xids) permitted in a single API call. Reduce the number of XIDs in your request to below the displayed limit to resolve this issue.


### There is a limit for 1000 compositeXids in a single call

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "There is a limit for 1000 compositeXids in a single call"
}
```

This error message displays when you attempt to retrieve identity information for more than the maximum number of [composite identities](#what-are-composite-identities-and-xids) permitted in a single API call. Reduce the number of composite identities in your request to below the displayed limit to resolve this issue.

### The graph-type specified is invalid

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "The graph-type abc specified is invalid. Please provide a valid graph-type"
}
```

This error message displays when a `graph-type` query parameter is given an invalid value in the request path. See the section on [identity graphs](identity_services_architectural_overview.md#identity-graphs) in the Identity Service overview to learn which graph-types are supported.

### Service token does not have valid scope

```json
{
    "title": "UnauthorizedAccess",
    "status": 401,
    "detail": "Service token does not have valid scope. Either acp.core.identity or acp.foundation is required"
}
```
This error message displays when your IMS Organization has not been provisioned with the proper permissions for Identity Service. Contact your system administrator to resolve this issue.

### Gateway service token is not valid

```json
{
    "title": "UnauthorizedAccess",
    "status": 401,
    "detail": "Gateway service token is not valid"
}
```

In the case of this error, your access token is invalid. Access tokens expire every 24 hours and must be regenerated to continue using Platform APIs. See the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for instructions on generating new access tokens.

### Authorization service token is not valid

```json
{
    "title": "UnauthorizedAccess",
    "status": 401,
    "detail": "Authorization service token is not valid"
}
```

In the case of this error, your access token is invalid. Access tokens expire every 24 hours and must be regenerated to continue using Platform APIs. See the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for instructions on generating new access tokens.

### User token does not have valid product context

```json
{
    "title": "UnauthorizedAccess",
    "status": 401,
    "detail": "User token does not have valid product context"
}
```
This error message displays when your access token has not been generated from an Experience Platform integration. See the [authentication tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for instructions on generating new access tokens for an Experience Platform integration.

### Internal error when getting native XID from identity and namespace code

```json
{
    "title": "UnauthorizedAccess",
    "status": 401,
    "detail": "Invalid IMS Token/IMS Org | Internal error - when tried to get native XID from identity and namespace code"
}
```

When Identity Service persists an identity, the identity's ID and associated namespace ID are assigned a unique identifier called an XID. This message displays when an error occurs during the process of finding the XID for a given ID value and namespace.

### The IMS Org is not provisioned for Identity Service usage

```json
{
    "title": "AccountNotProvisioned",
    "status": 403,
    "detail": "The IMS Org. {IMS_ORG_NAME} is not provisioned for Identity Service usage"
}
```

This error message displays when your IMS Organization has not been provisioned with the proper permissions for Identity Service. Contact your system administrator to resolve this issue.

### Internal Server Error

```json
{
    "title": "InternalError",
    "status": 500,
    "detail": "Internal Server Error. There was a problem processing your request"
}
```

This error displays when an unexpected exception occurs in the execution of a Platform service call. Best practice is to program your automated calls to retry their requests a few times at a timed interval when receiving this error. If the problem persists, contact your system administrator.

## Batch Ingestion error codes

Identity Service ingests identity data from record and time series data that is uploaded to Platform using Batch Ingestion. As batch ingestion is an asynchronous process, you must view the details for a batch to view errors. Errors will accumulate as the batch progresses until the batch is complete.

The following is a list of error messages related to Identity Service you may encounter when using the [Data Ingestion API](../../../../../../acpdr/swagger-specs/ingest-api.yaml).

### Unknown XDM schema

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "Unknown XDM schema"
}
```

Identity Service only consumes identities for record or time series data that conforms to the Profile or ExperienceEvent classes, respectively. Attempting to ingest data for Identity Service that does not adhere to either class will trigger this error.

### There were 0 valid identities in the first 100 rows of the processed batch

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "There were 0 valid identities in the first 100 rows of the processed batch"
}
```
This error displays when the first 100 rows of a batch presented no identities. This error does not indicate conclusively that no identities were found in subsequent records, however.

### Skipped records as they had only 1 identity per XDM record

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "Skipped {NUMBER_OF_RECORDS} records as they had only 1 identity per XDM record"
}
```

Identity Service only links identities when single records present two or more identity values. This error message occurs once for each ingested batch, and displays the number of records where only one identity could be found and resulted in no change to the identity graph.

### Namespace Code is not registered for this IMS Org

```json
{
    "title": "InvalidInput",
    "status": 400,
    "detail": "Namespace Code {ERRONEOUS_CODE} is not registered for this IMS Org"
}
```

This error displays when an ingested record presents an identity whose associated namespace does not exist or is inaccessible by your IMS Organization.

### Skipping batch ingestion as IMS Org is not provisioned for Private Identity Graph

```json
{
    "title": "AccountNotProvisioned",
    "status": 403,
    "detail": "Skipping batch ingestion as IMS Org is not provisioned for Private Identity Graph"
}
```
When ingesting batch data, this error message displays when your IMS Organization has not been provisioned with the proper permissions for Identity Service. Contact your system administrator to resolve this issue.

### Internal Error

```json
{
    "title": "InternalError",
    "status": 500,
    "detail": "Internal Error. There was a problem during the ingestion"
}
```

This error displays when an unexpected exception occurs during a batch ingestion. Best practice is to program your automated calls to retry their requests a few times at a timed interval when receiving this error. If the problem persists, contact your system administrator.
