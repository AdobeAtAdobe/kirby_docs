---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes January 15, 2020
doc-type: release notes
last-update: January 15, 2020
author: crhoades, ens28527

---

# Adobe Experience Platform release notes 

## Release date: January 15, 2020

Updates to existing features:

* [Destinations](#destinations)
* [Experience Data Model (XDM) System](#experience-data-model-xdm-system)
* [Privacy Service](#privacy-service)

## Destinations (only available to customers provisioned for Real-time CDP)

In [Adobe Real-time CDP](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/overview.html), destinations are pre-built integrations with destination platforms that activate data to those partners in a seamless way. For more information, read the [Destinations overview](https://docs.adobe.com/content/help/en/experience-platform/rtcdp/destinations/destinations-overview.html) article.

### New features

The Destinations functionality in Real-time CDP works with [Adobe Experience Platform access control permissions](https://www.adobe.io/apis/experienceplatform/home/permissions-and-sandboxes/permissions-and-sandboxes.html#!api-specification/markdown/narrative/technical_overview/access-control/access-control-overview.md). Depending on your user's permission level, you can view, manage, and activate destinations. See the table below for information about each individual permission.

Category | Permission | Description
--- | --- | ---
Destinations | Manage Destinations | Access to read, create, edit, and disable destinations.
Destinations | View Destinations | Read-only access to available destinations in the _Catalog_ tab and authenticated destinations in the _Browse_ tab.
Destinations | Activate Destinations | Ability to activate data to destinations. This permission requires either "Manage Destinations" or "View Destinations" to be added to the product profile.

## Experience Data Model (XDM) System

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and use customer attributes for personalization purposes.

### New features

Feature | Description
--- | ---
Field-type restrictions for fields of equal hierarchy | After an XDM field has been defined as as a certain type, any other fields of the same name and hierarchy must use the same field type, regardless of the classes or mixins they are used in.<br><br>For example, if a mixin for the XDM Profile class contains a `profile.age` field of type "integer", a similar mixin for XDM ExperienceEvent cannot have a `profile.age` field of type "string". In order to utilize a different field type, the field must be of a different hierarchy than the previously defined field (for example, `profile.person.age`).<br><br>This feature is meant to prevent conflicts when schemas are brought together in a union. While the constraint does not retroactively affect existing schemas, it is strongly recommended that you review your schemas for field-type conflicts and edit them as necessary.
Case-sensitive field validation | Custom fields on the same level must have different names, regardless of capitalization. For example, if you add ad a custom field named "Email", you cannot add another custom field at the same level named "email".

### Known issues

* None

To learn more about working with XDM using the Schema Registry API and Schema Editor user interface, please read the [XDM System documentation](../../../api-specification/markdown/narrative/technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md).

## Privacy Service

New legal and organizational regulations are giving users the right to access or delete their personal data from your data stores upon request. Adobe Experience Platform Privacy Service provides a RESTful API and user interface to help you manage these data requests from your customers. With Privacy Service, you can submit requests to access and delete private or personal customer data from Adobe Experience Cloud applications, facilitating automated compliance with legal and organizational privacy regulations.

### New features

Feature | Description
--- | ---
Privacy Service rebranding | The formerly named "GDPR Service" has been rebranded to Privacy Service as the service has grown to support other regulations in addition to GDPR.
New API endpoints | Base path for the Privacy Service API has been updated from `/data/privacy/gdpr` to `/data/core/privacy/jobs`
New required `regulation` property | When creating new jobs in the Privacy Service API, a `regulation` property must be supplied in the request payload to indicate which regulation to track the job under. Accepted values are `gdpr` and `ccpa`. See the [Privacy Service API tutorial](../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md) for more information.
Support for Adobe Primetime Authentication | Privacy Service now accepts access/delete requests from Adobe Primetime Authentication, using `primetimeAuthentication` as its product value. See the [Primetime Authentication documentation](http://tve.helpdocsonline.com/how-to-make-a-privacy-request) for more information.
Privacy Service UI enhancements | <ul><li>Separate job tracking pages for GDPR and CCPA regulations.</li><li>New _Regulation Type_ dropdown to switch between tracking data for GDPR and CCPA.</li></ul>

### Known issues

* None

For more information about Privacy Service, please start by reading the [Privacy Service overview](https://www.adobe.io/apis/experiencecloud/gdpr/docs/alldocs.html#!api-specification/markdown/narrative/technical_overview/privacy_service_overview/privacy_service_overview.md).