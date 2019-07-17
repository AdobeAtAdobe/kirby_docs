# Experience Data Model (XDM): Glossary
Array Values: An array is a container for zero or more items indexed by ordinal position. The form of the array items may be any core asset value form. All items in an array shall have the same data type.
The items in an ordered array are ordered by their indices. The items in an ordered array shall not be arbitrarily reordered. The meaning of the order may be defined by data type or by application.
An unordered array shall have no meaning or constraints on the order of items within it. The items in an unordered array may be reordered at any time.

Asset: An asset is a semi-structured piece of content, being created and edited by humans using hardware (such as cameras) or content editing software like Adobe Photoshop or Microsoft Word. It is an object which includes the following components: primary data, repository metadata, and repository renditions. The asset's primary data are the "bits" that we think of as the asset itself. In the case of a JPEG, it is a blob of binary data. For other asset types, the primary data may be XML, JSON, etc. The asset's repository metadata is the data about the asset that is stored in the repository, but it is not contained in the primary data itself. When there is no ambiguity, we can refer to the repository metadata as simply "metadata".  The asset's repository renditions are representations of the primary data, such as a thumbnail image, which are stored separately from the primary data itself. Repository renditions can always be discarded and later regenerated as necessary. When there is no ambiguity, we can refer to the repository renditions as simply "renditions". In addition, an asset may contain zero or more old versions of itself. Each version may include its own primary data, repository metadata, and repository renditions.

Bool: Boolean values shall be either True or False.

Choice: A value chosen from a vocabulary of values. Vocabularies provide a means of specifying a limited and possibly extensible set of values for a property.

Choice (Open or Closed): An open choice has one or more lists of preferred values, but other values can be used freely. A closed choice has one or more lists of allowed values, other values shall not be used.

Classes: A class is a specific definition of a resource consisting of one or more properties to structure the data to describe the resource. Each class has a unique namespace. Classes can have sub-classes; multiple inheritance or mix-ins are not supported.

Client: Software that accesses the content repository to read and write content. Typically, the client accesses the repository via a network.

Content Repository: A database of digital content with an associated set of data management, search and access methods allowing application-independent access to the content.

Core namespace: Core is a new namespace containing all the properties in this One Cloud Core Asset Data Model which are not currently defined in XMP Specifications. The namespace URI shall be http://ns.adobe.com/adobecloud/core/1.0/. The preferred namespace prefix is core.

Datatypes: Datatypes define the type of a given property value - typical examples are strings, numbers and dates. They can be of either simple, structure, or array form.

Dataset: A dataset is a named collection of data, comparable in a relational DB to a table. Unlike a Relational DB table, a dataset is usually highly de-normalized. A dataset consists of one or more dataset files that reflect the history of data ingestions. A dataset is related to a single schema, though over time that linked schema might evolve. When reading data from a dataset, the platform infrastructure standardizes all data read from the physical dataset files such that a single schema version view is presented. By default, the current version of the schema associated with the data set is used. An application may request a previous version, though.

Data Set File: A single file part of a dataset. A dataset file is typically linked to an exact version of a schema. Generally, the schema of a dataset file does not change over time. However, if the schema of a dataset evolves, new dataset files are created for that new schema version.

Entity: Any entity is a named collection of fields. Entities model reusable facts such as Address, EmailAddress, or GeoUnit.

Experience Data Model (XDM): This is the term used to describe the Adobe standard data model. As such, the XDM defines all the different data models modeling real-world objects. Examples of XDM data models are Profile and Touchpoint. 

Field: A field is the lowest level element of an entity. A field may be scalar, an array of items of the same type, or an entity.

Formats/Service Neutral Properties: Asset properties are intended to apply to simple assets, such as the media types that can be opened and edited in Creative Cloud applications.

GUID: A string representing a "globally unique identifier." A GUID shall be a normal (non-URI) simple value, even though it might appear like a URI string. This document does not require any particular methodology for creating a GUID, nor does it require any specific means of formatting the GUID as a simple value. The only valid operations on GUIDs are to create them, to assign one to another, and to compare two of them for equality. This comparison shall use the Unicode string value as-is, using a direct byte-for-byte check for equality.

Immutability: A property is considered immutable if its value can never change once it has been assigned, even if the asset is modified later. An example is the asset's creation date in the repository.

Integer: A signed or unsigned numeric string used as an integer number representation. The string consists of an arbitrary-length-decimal-numeric string with an optional leading "+" or "-" sign.

Linked Data: A link allows one to build relationships between structured data. In context of the RDF data model, URIs are being used to link various resources. 

Model: Models are abstract definitions of real-world objects. Examples of models are Profile and Touchpoint. A model is the highest-level element in the XDM and consists of fields of entities.

Namespaces: The data model supports namespaces for properties which allows for custom properties.

Properties: A property defined in the data model which has a specific semantic meaning and data type.

Schema: The schema is derived from the model and is applied to an actual dataset. Multiple versions of the same schema may be applied to the same dataset where the currently "active" schema can be queried from the dataset catalog.

Semantic (Model): The model consists of several distinct classes. Each class defines a set of properties that constitute the definition of the class. The model is independent from the serialization, but rather defines the semantics of properties. The model is leveraging concepts from RDF.

Serialization: To allow for machine readable manipulation, the data model needs to be serialized. For example, an API call returns asset properties to a caller. Another example is to store content metadata back into the file. The serialization should happen either in JSON or XML/RDF form. 

Simple Values: A simple value is a string of Unicode text as defined in The Unicode Standard. The string may be empty. There are two variants of simple values: normal and URI. The URI variant of a simple value should be used for values that represent URIs; the normal variant should be used for all other simple values. 

Spec: This specification defines a content model to represent content stored in a repository. Compliant repositories must provide serializations of the content to clients, those that match the semantics specified in this document. For producing the rendition of an asset model, a repository may choose to store properties or compute them on request. The underlying mechanism is not part of the specification.

Structure Values: A structure is a container for zero or more named fields. The order of fields in a structure shall not be significant. Fields may be optional or required. Each field in a structure shall have a unique name within that structure. Fields need not be in the same namespace as their parent structure nor in the same namespace as other fields in the structure. Each field in a structure may have any value form.

User Editing: Some mutable properties can only be modified by the repository itself; for example, the property containing the name of the user who last modified the asset. All other mutable properties are "user-editable". This definition includes either human users modifying a property within the asset itself or in the repository and contains user agents performing modifications on behalf of a human user.  
