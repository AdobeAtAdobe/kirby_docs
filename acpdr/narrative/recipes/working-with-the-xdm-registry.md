# Working with the XDM Registry
# Introduction,
This page documents a revised architecture for the XDM registry, based on various requirements that have evolved from discussions with product management.  This is also intended to allow us to align better with the current direction of the Adobe XDM Working Group, which is defining XDM for non-DMa purposes.

At this time, this is a proposal.  We will use this to understand the delta between the proposed behavior and the current implementation and plan next steps.

# Use Cases
The following use cases have been considered in the design described in this document.

## Batch data ingest, no standard XDM exists
A Data Engineer (the user) imports a dataset from a customer's point-of-sale (PoS) system.  There isn't a standard XDM for this data, so the data is ingested without a model associated with it.  The data catalog extracts the as-written schema, and makes it visible to the user.  The data engineer creates a new model in the registry, called "SalesData", using the original schema as the initial form.

## Batch data ingest with an XDM, but data does not match
A Data Engineer (the user) sets up a Connector feed from the customer's CRM system.  This feed is imported using the standard "Profile" XDM, which was configured in the Connector admin console.  As the data is imported, the Connector Service validates the data against the XDM, and notices that several fields are missing, and one field is of the wrong data type.  The data is imported, but the catalog entry for the data is flagged to note that the data is not correct XDM data.

## Extend a core model

## Create a new, custom model

## Multi-tenant Model Exchange (single customer)
A data engineer (the user) works for a customer that operates multiple digital marketing tenants, which span multiple regions.  While generally data is managed internally to each region, there are cases where data need to be exchanged across regions.  The data engineer wishes to create a model that can be modeled in one place, and shared both to the data source region and the data destination region.

## Multi-tenant Model Exchange (multiple customers)
A data engineer (the user) works for a customer that has recently partnered with a second customer to import a set of data from the second customer.  A data engineer at the second customer wishes to share the XDM model of the data in question with the data engineer at the first customer.

# XDM Architecture Assumptions
This proposal makes several assumptions about the overall architecture for XDM that make understanding the design rationale easier.

- All XDM models are treated uniformly.  While we may have user experience reasons to some models uniquely (like Profile, versus something primitive like Person), from the XDM model layer all models are treat the same.  They are all "models" that are described as JSON Schema, and follow the rules and idioms defined by XDM.
- The XDM modeling layer is self-contained.  The concept of "XDM model" lives at an independent layer of the system, and can be described in a self-contained way.  This layer of the system is made up of:
 - The XDM specification
 - XDM model descriptions, in JSON Schema format.
You can reason about XDM using only these things. The registry implementation, or other tooling we supply, are useful additions to the XDM ecosystem but are not required to make XDM complete or consistent.
- XDM models are stable, unless they have been specifically marked otherwise.  At most stages of their use, it is easier to reason about about XDM models assuming they never change.  For a particular version of the core models, this is true: they are published and never change.  Unfortunately, for models that are actively being developed or extended, this may not be true.  For this reason, we can mark a model as "dynamic", meaning that it may be changed.  Developing stable models is a key part of the XDM workflow, and as such "dynamic" models are a special, transitory case.
- From a model perspective, customer and vendor extensions are treated the same.  While the overall workflow for models differs between customer and vendor extensions, at the XDM model layer they are the same.  Unique namespaces allow us to mix extensions with no restrictions together to form new models.  Both customers and vendors may wish to share their extensions with others to power data exchange.

# Registry Method of Operation
## The "Virtual Extended Model Set".
The registry operates using a design that can be described as a "virtual extended model set".  By default, the registry exposes an extension for every model in the core set.  The user doesn't need to create these, and they are "virtual" in the sense that they are manufactured by the registry without requiring explicit state.  When the registry returns a virtually extended model, it replaces all references to other core models with the equivalent reference to the virtually extended model.  This creates a complete virtual set of models.

The advantage of this design is that customers can easily build out private model sets, without having to extend each core model separately.  The disadvantage is that the entire model set is dynamic and unstable.  The registry provides a method to "capture" a model as a specific version.  This creates a stable snapshot of all models, which can be referred to with unique and stable URLs.  In this way, the registry supports the transition from development time (where models are unstable) to deployment/use time (when models should be stable).

## Model Names and Namespacing
XDM models have unique names which include a namespace [TODO: make sure this ends up in the XDM spec!].  These names can be considered the path portion of a URI, without the scheme or authority portions.  In order to implement the virtual extended model set concept, the registry needs to expose suitable unique names for all models (including captured versions).

To achieve this, the registry uses the following URL form:

 `` /xdm/<imsOrgId>/current/<coreModelPath> ``

This form ensures a unique URL exists for every core model.  Note the "current" portion, which designates this is the virtual extended model.  When a version of the model is captured, this is replaced with the appropriate version:

`` /xdm/<imsOrgId>/<version>/<coreModelPath> ``

Note that the "xdm" designator, and the imsOrgId, and the version designator form a prefix section that can be unambigiously parsed from the core model path.  This means it is always clear which model this is an extension of.

Customers may also create brand new models that do not extend an existing model.  In this case, the customer may provide their own namespace, or none at all.  Since the core model namespaces are reserved, there is not conflict and again the prefix and the model name can be parsed unambigiously.

## Model Extension Workflow
Model extensions operate in the following way:
- When a new version of the core model is published, it is pushed to the registry and stored/indexed in a local datastore.
- Each tenant in the system is linked to a specific version of the core models.  By default, tenants are updated to the latest version of the core when they are published.
- Each tenant always defines a virtual "extended" version of every core model.  This extended version starts with no new fields, and just points back to the corresponding core model.
- When the registry returns one of these virtual extensions, it replaces all references to core models with references to the equivalent extended model.
- Users add fields to the extended model, and these fields are included in the response for the extension.
- Virtually extended models are always marked as "dynamic" to show they are unstable.

## Model Capture Workflow
Stable versions of models are captured in the following way:
- When a user is ready to import or export data with a stable schema, they select a model and ask to "capture" it.
- The capture operation will take a snapshot of the model, giving it a specific version.
- In addition to capturing the selected model, the registry will capture versions of all extended models the model references.  This ensures the entire model is stable.
- For all models being captured (including the selected one), the registry checks whether any new fields have been added since the last capture.  If not, the last stable version is returned, rather than creating a new one.  This prevents ambiguity that may occur if multiple captured versions refer to the exact same model.

## Content Types and Model Expansion
It is sometimes convenient for the server to handle denormalizing the model references into a single JSON Schema that can be used by clients for data validation.  The registry supports this via content type.

The registry uses the following content types to return model definitions:

`` application/vnd.adobe.xdm+json - for normalized schema (the default) ``
`` application/vnd.adobe.xdm-complete+json - denormalized schema ``

# Registry API
`` /xdm/<imsOrgId>/<version>/<modelPath> ``

| Operation | Description | &nbsp; |
| --------- | ----------- | ------ |
| GET | Retrieves a specific version of the model designated by &lt;modelPath&gt;, which may be a core model or a custom model. | - When &lt;version&gt; has value "current", return the current virtually extended model. <br/> - When requesting version "current", model will be marked "dynamic". |
| POST | Creates a new model, possibly extended from a core model. | - &lt;version&gt; must be "current", invalid to call this with a stable, captured version of the model. <br/> - If the &lt;modelPath&gt; describes a core model, this creates a new extension <br/> - If the &lt;modelPath&gt; does not describe a core model, this creates a new custom object. <br/> - Registry will not allow creation of custom objects in reserved namespaces (like core). |
| PUT | Updates a model, which may be a custom model or an extended core model. | - &lt;version&gt; must be "current", invalid to call this with a stable, captured version of the model. <br/> - Model must have been created, no "upsert". |
| DELETE | Deletes an extended or custom model. | &lt;version&gt; must be "current", invalid to call this with a stable, captured version of the model. <br/> - For custom objects, this removes the model entirely. <br/> - For virtually extended models, this simply removes all extended fields. Subsequent requests for the object will return an empty virtually extended model, just as it would if no fields had been added to the model in the first place. |

``/xdm/<imsOrgId>/capture/<modelPath> ``

| Operation | Description | &nbsp; |
| --------- | ----------- | ------ |
| POST | Create a capture of the model given by &lt;modelPath&gt;, which may be an extended core model or a custom object. <br/> - Captures a stable version of the model given by &lt;modelPath&gt; <br/> - Recursively captures all core models referenced by the model, to ensure they are all stable. <br/> - Care is taken to use an existing stable capture for any model if it is available. <br/> - URL to the new model is returned via the Location header. |

`` /xdm/<version>/<coreModelPath> ``

| Operation | Description | &nbsp; |
| --------- | ----------- | ------ |
| GET| Return a core model | - Returns a core model given by &lt;coreModelPath&gt; <br/> - When &lt;version&gt; is "current", returns the most recent release of the core model |

`` /xdm/vendor/<vendorModelPath> ``

| Operation | Description | &nbsp; |
| --------- | ----------- | ------ |
| GET | Return a vendor model. | - Returns a vendor model given my &lt;vendorModelPath&gt;, which includes the vendor's unique namespace to ensure unique model identity. |

__Note: method of registering vendor models not described in this spec.__

# API Examples
## Requesting a core model
Requests current version of core/Model

| Operation |
| --------- |
| GET /xdm/current/core/Person |

## Requesting an extended model for a customer
Requests current version of customer extended model for customer 12345678

| Operation |
| --------- |
| GET /xdm/imsOrg:12345678/current/core/Person |

## Creating an extended version of a model for a customer
Creates an extended version of the model core/Person for customer 12345678

| Operation |
| --------- |
| POST /xdm/imsOrg:12345678/current/core/Person<br/> &lt; body is JSON Schema fragment containing list of fields to add &gt;

## Creating a custom model for a customer
Creates a new custom model MyProduct for customer 12345678

| Operation |
| --------- |
| POST /xdm/imsOrg:12345678/current/MyProduct <br/>&lt; body is JSON Schema containing the new model &gt; |

## Capturing a stable version of an extended model for a customer
Captures a stable version of core/Person for customer 12345678

| Operation |
| --------- |
| GET /xdm/imsOrg:12345678/capture/core/Person |

Return header: Location: `` /xdm/imsOrg:12345678/1/core/Person ``
