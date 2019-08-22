---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes July 25, 2019
doc-type: release notes
last-update: July 31, 2019
author: ens28527

---

# Adobe Experience Platform release notes 
## Release date: July 25, 2019

New features in Adobe Experience Platform:
* [Privacy Service](#privacy-service)

Updates to existing features:
* [Experience Data Model (XDM) and XDM System](#experience-data-model-xdm-and-xdm-system)
* [Segmentation Service](#segmentation-service)

## Privacy Service

Adobe Experience Platform Privacy Service provides a RESTful API and user interface to help companies manage customer data requests. With Privacy Service, you can submit requests to access and delete private or personal customer data, facilitating automated compliance with organizational and legal privacy regulations such as the General Data Protection Regulation (GDPR) introduced in the European Union.

Privacy Service was developed in response to a fundamental shift in how businesses are required to manage the personal data of their customers. The central purpose of Privacy Service is to automate compliance with data privacy regulations which, when violated, can result in major fines and disrupt data operations for your business.

**Key features**

|Feature|Description|
|---|---|
| Privacy Service User Interface (UI) | The new GDPR request metrics dashboard provides visibility into GDPR requests that have been submitted, including whether they were completed or returned an error. |
| Create Request Builder | To service organizations with both non-technical and technical users submitting GDPR requests, “Create Request” functionality has been added to the UI. The JSON file submission capability is still available in the Privacy Service UI for those organizations who prefer to continue using it.|
| GDPR Job Event Notifications| Event notifications about GDPR job statuses are a critical element to many workflows. Notifications were previously served using individual email notices. With the move away from email, GDPR event notifications are messages that leverage Adobe I/O events, which are sent to a configured webhook facilitating job request automation. Users of the Privacy Service UI can subscribe to Adobe I/O GDPR events to receive updates when a product or the GDPR job has been completed. |

**Bug fixes**

* None.

For more information, visit the [Privacy Service overview](https://www.adobe.io/apis/experienceplatform/home/services/privacy-service.html#!api-specification/markdown/narrative/technical_overview/privacy_service_overview/privacy_service_overview.md) or refer to the [GDPR on Adobe Experience Platform overview](https://www.adobe.io/apis/experienceplatform/home/services/privacy-service.html#!api-specification/markdown/narrative/technical_overview/privacy_service_overview/gdpr-on-platform-overview.md).

## Experience Data Model (XDM) and XDM System

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and use customer attributes for personalization purposes.

XDM is the mechanism that allows Experience Cloud, powered by Adobe Experience Platform, to deliver the right message to the right person, on the right channel, at exactly the right moment.

The methodology on which Experience Platform is built, XDM System operationalizes Experience Data Model schemas for use by Experience Platform components.

**New features**

|Feature|Description|
|---|---|
| Improved icon system | The Schema Editor UI has updated icons that better align with the overall Platform design. |
| Support for JSON Schema properties and constraints for scalars | The Schema Editor UI now provides optional fields for defining [JSON Schema draft-6](https://tools.ietf.org/html/draft-wright-json-schema-01) constraints on scalar fields, such as `default` and `required`. |
| Support JSON Schema properties and constraints for arrays | The Schema Editor UI now provides optional fields for defining [JSON Schema draft-6](https://tools.ietf.org/html/draft-wright-json-schema-01) constraints on array fields such as `minItems`, `maxItems`, and `uniqueItems`. |

**Bug fixes**

* When extending Adobe mixins by adding a field, the mixin is now implicitly extended in the UI.
* Descriptors are now deleted when a mixin is removed from the schema composition.
* Overloaded `meta:intendedToExtend` values in mixins are now respected when saving in the UI.
* Fixed bug where the API could not properly handle URLs with plus (`+`) encoded spaces.
* Improved the error message when no version is supplied in API calls.

**Known issues**

* Unable to create an enum field with no labels.
* JSON that is captured by the "Copy JSON" button in the UI contains extraneous meta properties.

To learn more about working with XDM using the Schema Registry API and Schema Editor, please read the [XDM System documentation](https://www.adobe.io/apis/experienceplatform/home/xdm.html).

## Segmentation Service

Adobe Experience Platform Segmentation Service enables you to create rules that describe the attributes and behaviors for a marketable group of people, and then build actionable audiences based on those rules using profiles in your profile store.

**New features**

| Feature    | Description  |
| -----------| ---------- |
| Audiences as building blocks|In addition to copying the logic from other platform segments, you can now choose to reference segment membership (audiences) when building additional segments.|
|Contextual access to Dynamic Variables|You can now access dynamic variables in the context of the rule builder canvas rather than having to navigate to them via the left rail.|
|Multi-value operands for strings|You can now add multiple potential values on a single string rule (example: SKU contains “ABC” or “DEF” or “GHI”).|

**Bug fixes**

* Fixed an intermittent issue causing errors when “only show populated fields” was deselected.
* Fixed an error where attribute summaries were surfacing on hover – they now surface on click.
* Fixed a pagination error with segment search.
* Minor usability enhancements.

For more information, including how to use the Segment Builder user interface, see the [Segment Builder overview documentation](https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!end-user/markdown/segmentation_overview/segmentation.md). For instructions on building segments using the API, see the [creating segments via API tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md).