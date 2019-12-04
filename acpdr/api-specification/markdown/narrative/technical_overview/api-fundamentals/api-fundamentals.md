# API fundamentals for Adobe Experience Platform

Adobe Experience Platform APIs employ several underlying technologies and syntaxes that are important to understand in order to effectively manage JSON-based Platform resources. This document provides a brief overview of these technologies, as well as links to external documentation for more information.

The following technologies are covered:

* [JSON Pointer](#json-pointer)
* [JSON Patch](#json-patch)
* [JSON Schema](#json-schema)

## JSON Pointer

JSON Pointer is a standardized string syntax ([RFC 6901](https://tools.ietf.org/html/rfc6901)) for identifying specific values within JSON documents. A JSON Pointer is a string of tokens separated by `/` characters, which specify either object keys or array indexes. A token can be a string or a number.

For example, consider the following JSON for an Experience Data Model (XDM) schema:

```json
{
    "type": "object",
    "title": "Loyalty Member Details",
    "meta:intendedToExtend": [
        "https://ns.adobe.com/xdm/context/profile"
    ],
    "description": "Loyalty Program Mixin.",
    "definitions": {
        "loyalty": {
            "properties": {
                "_{TENANT_ID}": {
                    "type": "object",
                    "properties": {
                        "loyaltyId": {
                            "title": "Loyalty Identifier",
                            "type": "string",
                            "description": "Loyalty Identifier.",
                            "meta:xdmType": "string"
                        },
                        "loyaltyLevel": {
                            "title": "Loyalty Level",
                            "description": "The current loyalty program level to which the individual member belongs.",
                            "type": "string",
                            "enum": [
                                "platinum",
                                "gold",
                                "silver",
                                "bronze"
                            ],
                            "meta:enum": {
                                "platinum": "Platinum",
                                "gold": "Gold",
                                "silver": "Silver",
                                "bronze": "Bronze"
                            },
                            "meta:xdmType": "string"
                        }
                    },
                    "meta:xdmType": "object"
                }
            },
            "type": "object",
            "meta:xdmType": "object"
        }
    }
}
```

The following table outlines what different JSON Pointer strings would resolve to:

JSON Pointer | Resolves to
--- | ---
`"/title"` | "Loyalty Member Details"
`"/definitions/loyalty"` | (Returns the contents of the `loyalty` object)
`"/definitions/loyalty/properties/_{TENANT_ID}/properties/loyaltyLevel/enum"` | `["platinum", "gold", "silver", "bronze"]`
`"/definitions/loyalty/properties/_{TENANT_ID}/properties/loyaltyLevel/enum/0"` | `"platinum"`

> **Note:** When dealing with the `xdm:sourceProperty` and `xdm:destinationProperty` attributes of Experience Data Model (XDM) descriptors, any `properties` keys must be **excluded** from the JSON Pointer string. See the section on [descriptors](../schema_registry/schema_registry_developer_guide.md#defining-descriptors-in-the-api) in the Schema Registry developer guide for more information.

JSON Pointer strings are used in many PATCH operations for Platform APIs, as described in the next section. For more information on JSON Pointer, please refer to the following [overview documentation](https://rapidjson.org/md_doc_pointer.html).

## JSON Patch

There are many PATCH operations for Platform APIs that accept JSON Patch objects for their request payloads. JSON Patch is a standardized format ([RFC 6902](https://tools.ietf.org/html/rfc6902)) for describing changes to a JSON document. It allows you to define partial updates to JSON without needing to send the entire document in a request body.

An example JSON Patch object looks like the following:

```json
{
  "op": "remove",
  "path": "/foo"
}
```
* `op`: The type of patch operation. While JSON Patch supports several different operation types, not all PATCH operations in Platform APIs are compatible with every operation type. Available operation types are:
    * `add`
    * `remove`
    * `replace`
    * `copy`
    * `move`
    * `test`
* `path`: The part of the JSON structure to be updated, identified using [JSON Pointer](#json-pointer) notation.

Depending on the operation type indicated in `op`, the JSON Patch object may require additional properties. For more information on the different JSON Patch operations and their required syntax, please refer to the [JSON Patch documentation](http://jsonpatch.com/).

## JSON Schema

JSON Schema is a format used to describe and validate the structure of JSON data. [Experience Data Model (XDM)](../schema_registry/xdm_system/xdm_system_in_experience_platform.md) leverages JSON Schema capabilities to enforce constraints on the structure and format of ingested customer experience data.

For more information on JSON Schema, please refer to the [official documentation](https://json-schema.org/).

## Next steps

This document introduced some of the technologies and syntaxes involved with managing JSON-based resources for Experience Platform. For more information on working with Platform APIs, including best practices and answers to frequently asked questions, please see the [API troubleshooting guide](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md).