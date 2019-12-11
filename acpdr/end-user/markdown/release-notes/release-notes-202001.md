---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes January 2020
doc-type: release notes
last-update: December 11, 2019
author: ens71067

---

# Adobe Experience Platform release notes 
## Release date: January 2020

Updates to existing features:
* [Experience Data Model (XDM) System](#experience-data-model-xdm-system)

## Experience Data Model (XDM) System

Standardization and interoperability are key concepts behind Experience Platform. Experience Data Model (XDM), driven by Adobe, is an effort to standardize customer experience data and define schemas for customer experience management.

XDM is a publicly documented specification designed to improve the power of digital experiences. It provides common structures and definitions for any application to communicate with services on Adobe Experience Platform. By adhering to XDM standards, all customer experience data can be incorporated into a common representation delivering insights in a faster, more integrated way. You can gain valuable insights from customer actions, define customer audiences through segments, and use customer attributes for personalization purposes.

### New features

Feature | Description
--- | ---
Field-type restrictions for fields of equal hierarchy | After an XDM field has been defined as as a certain type, any other fields of the same name and hierarchy must use the same field type, regardless of the classes or mixins they are used in.<br><br>For example, if a mixin for the XDM Profile class contains a `profile.age` field of type "integer", a similar mixin for XDM ExperienceEvent cannot have a `profile.age` field of type "string". In order to utilize a different field type, the field must be of a different hierarchy than the previously defined field (for example, `profile.person.age`).<br><br>This feature is meant to prevent conflicts when schemas are brought together in a union. While the constraint does not retroactively affect existing schemas, it is strongly recommended that you review your schemas for field-type conflicts and edit them as necessary.

### Known issues

* None

To learn more about working with XDM using the Schema Registry API and Schema Editor user interface, please read the [XDM System documentation](../../../api-specification/markdown/narrative/technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md).