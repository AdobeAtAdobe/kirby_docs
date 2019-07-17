# Experience Data Model (XDM): Extensibility
Normalization of data within a standard data model presents the inherent problem of incompatibility, whether from untranslated data unsuitable for the design schema of a specific data platform or from the platform itself (which may lack the architectural breadth to accommodate data representation requirements). Whatever the case, problems of standardization within SDMs do exist and can therefore prevent the sharing of data.

Fortunately, Adobe Experience Data Model (XDM) accounts for potential complications pertaining to data ingestion, specifically by means of extensibility, which allows for customizable data. More specifically, the extensible XDM schema scales with the diverse data representation requirements of enterprise customers via the Adobe XDM Registry, which includes extensions, namespacing and versioning. Ultimately, extensibility allows for the adaptation of personalized data so that ingestion into the Experience Data Model is uncomplicated and the sharing of data effortless.

## Basic Method to Extensions

Extensions are injected into the base types. Whenever you have an object of such a defined type you get visibility to the function of the base type as well as all the extensions that have been defined on that type.

In this case, the customer would add additional fields to core.Person, but no new entity or name is created. The customer continues to refer to this as core.Person, but extensions are now injected and added to the entity based on the customer using that object.

### Example:
Below is an example of a user wanting to add "age" and "hairColor" to the Adobe defined core.Person entity.

core.Person

```
{
    "firstName" : "John",
    "lastName" : "Doe",
    "gender" : "male",
    // ...etc.
    "_customer" { // (alias to the customer's IMS Org namespace)
        "mycrm" { // (customer defined namespace - to manage different business units, teams, categories, etc. - more on this below)
            "age" : 45, // (extension field)
            "hairColor" : "black"
        }
    }
}
```

## Extensions
In any real-world implementation there will be data that goes beyond the standard, and customers, implementers and vendors require the ability to customize, innovate and excel. The Extension set of features in XDM Schema enable this in a manageable way. Specifically, there is a definite set of extensibility mechanisms for Core Data and Standardized Algorithms that allow for use-cases not currently supported in XDM, which simultaneously allows for the standard parts of XDM to be utilized. In addition, it is acceptable to make available Application Specific Data Models. XDM defines how this is to occur to ensure predictable reuse in the system and support future upgrade.

## Rules of Extensibility

### Fundamental Rule of Extensions

Adobe continues to evolve the Core XDM models extremely carefully. The semantics are that extensions to core XDM Schemas are additive only. The recommended path for customers and vendors is also add only, but if necessary they can destructively remove extensions with great care. In these cases, the XDM Registry will provide controls to ensure that if the schema elements that are being deleted have been used to store data, the impact of those deletion changes are surfaced so that the user can make an informed decision before proceeding.

Modifying a schema can include any of the following:

Adding a new field/ entity
- This should be allowed if it follows the process of extension addition.

Deleting a field/entity
- This should not be allowed unless there is no impact on existing applications using the old schema. Since we plan to convert many XDM models into Protobuf objects on Pipeline we will not want to remove fields to keep everything backwards compatible and only ever add new fields.

Modifying a field/entity i.e. changing data types, default values, updating an enum set
- This should be evaluated case by case. For example, renaming should not be allowed unless there is no impact on existing applications using the old schema. Changing a data type from int to long or adding values to an enumeration should be no problem.
As mentioned, schema modification such as deletion or renaming etc. is not encouraged. Catalog can be used to check if the field/entity is used by any dataset for dependency analysis. There will be scenarios where changes may be incompatible and we need to able to throw appropriate clear errors for them.

### Types of Extensions

There are two types of extensions:

1. Extensions to Core definitions
2. Extensions that create entirely independent Models, Entities, Fields etc.

Extended and Core models are factored into reusable entities which are shared to enable customers to apply the same extension changes everywhere that an extended entity is used. This enables customers to ensure that the extension will apply to all models that use the extended entities and models do not need to be individually edited to use the new versions of the extended definitions. Physical datasets can be evolved to the latest version of all definitions (extended and Core) via schema evolution functionality of the XDM Registry.

### Example:

A data engineer that adds additional fields to core.Person does not create a new definition of core.Profile; the fields are added to the single schema instance of Profile that the organization uses. The customer continues to refer to it as core.Person. These new fields are now injected as a custom extension in the customer's private namespace, and added to the entity when the customer retrieves the entity from the XDM Registry. This also increments the version associated with the addition in the given namespaces.

Technically, third-party XDM extensions (custom models, entities, fields and enumerations) are stored under the _customer scope. Customer extensions are considered private and are visible only to the customer tenant that created it, which occurs through the XDM API and UX. The customer must provide an extension organization name that will be used to store the new data schema extensions when defining extensions. The customer's organization has the option to create any number of different extension names to group and manage extensions based on different business units or data sources.

Vendor extensions are located under the _vendor scope. These extensions are added by ISVs that are building repeatable solutions that have been built using the Adobe Cloud Platform. In this case, extensions to existing XDM models that need additional fields for new or expanded use cases will either go in custom vendor extensions (_vendor) or by working with the XDM Core specification process will go in the XDM Core scope where evidence shows the common utility of the additions. Extensions that are found under the _vendor namespace scope are automatically added to models and entities when a customer installs an ISV service or application. It is important to note that, unlike customer extensions, vendor extensions are considered public and the configured definitions and extensions are shared with all XDM customers that install the applications.

Customer and Vendor Namespaces have a version identifier with is a single monotonic incremented value and are managed and updated each time schema in that namespace change. This is managed by the XDM Registry and is available via a UI or API.

## XDM Extensions in Practice
The following shows the extension of the Core Person Entity (an entity used in core.Profile) with a new field:

```
{
    "id": "core/Person.schema.json",
    "$schema": "https://.../json-schema/schemas/schema.json",
    "label": {
        "en_us": "Person"
    },
    "version": "1.0",
   "type": "object",
    "description": "An individual actor, contact, or owner.",
    "properties": {
        "firstName": {
            "label": {
                "en_us": "First name"
            },
            "type": "string",
            "description": "The personal, or given name."
        },
        ...
    }
}
```

Extension by a cosmetics customer ACMEco to add a hair color field and a vendor (BigDataco) that provides third-party data on hair color.

```
{
    "id": "core/Person.schema.json",
    "$schema": "https://.../json-schema/schemas/schema.json",
    "label": {
        "en_us": "Person"
    },
    "version": "1.0",
    "type": "object",
    "description": "An individual actor, contact, or owner.",
    "properties": {
        "firstName": {
            "label": {
                "en_us": "First name"
            },
            "type": "string",
            "description": "The personal, or given name."
        },
        ...
    },
    "_customer": {
        "type": "object",
        "properties": {
            "ACMEco": {
                "title": "Person extension",
                "type": "object",
                "description": "Person extension.",
                "properties": {
                    "hairColor": {
                        "type": "string",
                        "description": "Hair Color"
                    }
                }
            }
        }
   },
    "_vendor": {
        "type": "object",
        "properties": {
            "BigDataco": {
                "title": "Person extension",
                "type": "object",
                "description": "Person extension.",
                "properties": {
                    "hairColor": {
                        "type": "string",
                        "description": "Color of Hair"
                    }
                }
            }
        }
    }
}
```

This example shows the mechanism of XDM namespacing to manage potentially conflicting schema definitions.

## Namespacing
Extensions are used to add non-standard data elements to XDM models and entities, as well as to create external entities that may act as the schema for a codified dataset or as independent extensions to other models and entities. With this level of flexibility there is always the possibility of data conflicting with an already existing definition. To mitigate this risk Namespacing is used to isolate teams, vendors and shared schemas, and therefore allowing isolation between distributed teams defining data models.

The XDM schema defines three scopes of Namespacing that have different usage semantics and enable the required set of diverse use cases. They are:

1. XDM Core - Core is the most standardized part of XDM Schema data definitions. Definitions here are heavily managed with industry subject-matter experts, those who evaluate all additions to ensure maximum interoperability between experience applications. All implementations or tenants of XDM see the same definition of the Core scope. Across all customers that use XDM, Core is used consistently so that a person who understands the XDM implementation in one context can readily comprehend other implementations, and applications that can work on the standardized experience data can automatically do so for many use cases with little configuration. This allows resource and implementation portability and efficiency.<br/><br/>
The XDM Core has a two numeric version identifiers (major.minor). The major denotes schematic compatibility and the minor the linear incrementing revision. Because of the semantics of the XDM rule on evolution (see Fundamental Rule of Extensions), all updates to Core are strictly additions within a major version, and therefore a consuming application can ascertain compatibility with a dataset by checking the major version is equal to, and that the minor version is equal to or larger than, what the applications was built to support.

2. Customer - The Customer namespace scope is tenant-specific (isolated), which means that multiple customers neither see the specific definition nor are impacted by other tenants using the Customer namespace scope. This scope is identified as _customer in the technical schema.

3. Vendor - The Vendor scope allows vendors (software, consulting, data etc.) to define custom extensions that can be deployed into a customer's tenant. This provision is managed by processes that review and approve vendor submissions in order to ensure correct usage of namespacing and extensions. At Adobe, this is the Adobe Exchange Program, which works with third-party technology vendors to build offerings that are marketed to joint customers. This scope is identified as _vendor in the technical schema.

## Versioning
Versioning allows the evolution of XDM Schema to occur in a controlled and auditable way. Versioning in XDM Schema extensions is associated with the namespace. Physical XDM datasets are created by referring to an XDM model version in the XDM Registry. This XDM Model definition, its versioning and the I.D. of the model in the XDM Registry are recorded for this dataset. This is the conversion of a Logical Schema of the model to a Physical Schema of the model. This XDM model in the XDM Registry can evolve (new Core, Customer and/or Vendor namespace additions). The XDM Registry subsequently provides schema evolution capabilities to update the schema of the data set to the newer versions when the administrators of the dataset decide to incorporate these changes.

Applications that consume XDM can ascertain their compatibility with a given dataset to ensure maximum compatibility by using the version compatibility semantics of XDM Core and the extensible namespaces.

The evolutionary rules (see Fundamental Rule of Extensions) of XDM Schema specification that are implemented by the XDM Registry limit the chance of altering changes in the customized XDM Schema. If a change breaks existing data usage patterns, the dependency evaluation of the XDM Registry identifies these conflicts and warns against accidental errors. It is up to the Data Engineers that are defining the extensions to make the informed decision of breaking changes and is further controlled by system permissions to enforce who can make such changes. The fundamental principle that is strongly recommended is that schemas must be additive in production in all cases.

## Basic API Workflow for Extensions
### Add Extension
Extend the core.Person entity with additional fields from my CRM system (SAP, Salesforce, etc.) You need to do the following:
* Decide on a extension/object name to hold these extensions (or use an existing name if previously defined). In the example above we used the name "mycrm".
* Execute the following registry API calls to extend Person - the body of these requests would define the age and hairColor fields along with data type, display name, etc. More details found at [XDM API](../xdm-api)

#### Sample Requests
```
PUT /xdms/core/Person/_customer/mycrm?imsOrg=1234@adobeOrg

{
    "title": "Person extension",
    "type": "object",
    "description": "Person extension.",
    "properties": {
        "age": {
            "type": "number",
            "description": "Age of the person"
        },
        "hairColor": {
            "type": "number",
            "description": "Age of the person"
        }
    }
}
```

After the above API request, any new GET requests for core.Person will include those extended fields. The API takes care of pulling in the current definition of the core object (or using the version specified) being requested, and then injects the extended fields as part of the response. See below:

```
GET /xdms/core/Person/?imsOrg=1234@adobeOrg
```

#### Sample Response
```
{
  "id": "1234@adobeOrg/core/Person.json",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Person",
  "type": "object",
  "version": "2.2"
  "description": "An individual actor, contact, or owner.",
  "properties": {
        "firstName": {
            "type": "string",
            "description": "The personal, or given name."
        },
        "lastName": {
            "type": "string",
            "description": "The inherited family name, surname, patronymic, or matronymic name."
        },
        "middleName": {
            "type": "string",
            "description": "Middle, alternative, or additional names supplied between the first and last names."
        },
        ...
        "_customer": {
            "type": "object"
            "properties": {
                "mycrm": {
                    "type": "object", //Treat the namespace as an object
                    "version": "1",
                    "properties": {
                        "age": {
                            "type": "string",
                            "displayName": "Age",
                        },
                        "hairColor": {
                            "type": "string",
                            "displayName": "Hair Color"
                        },
                    }
                }
            }
        }
    }
}
```
