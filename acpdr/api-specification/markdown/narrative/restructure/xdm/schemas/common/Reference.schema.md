---
layout: default
---

# Reference

A reference to another model of the XDM.

> Note: This object is not a model in the XDM. It's just used by models to
  link them to another model.

## Properties

`object`


###  ref
`string` 

Value of the primary key value of the referenced entity. If the primary key
is a composite key each value within the key must be serialized into a single
value.



###  type
`string` 

Type of the referenced entity (e.g., Event, Activity, ...).
The `type` MUST be set when the reference is ambiguous. For instance
in an `Event`, the `context` property is a reference to different entities
depending on the type of the event.




