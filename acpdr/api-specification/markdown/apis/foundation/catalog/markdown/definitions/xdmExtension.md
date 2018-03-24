
<a name="xdmextension"></a>
### xdmExtension

|Name|Description|Schema|
|---|---|---|
|**created**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) when this xdm extension was persisted.  <br>**Example** : `0`|integer|
|**createdClient**  <br>*optional*  <br>*read-only*|The ID of the IMS client that created this xdm extension.  <br>**Example** : `"string"`|string|
|**description**  <br>*required*|**Example** : `"string"`|string|
|**imsOrg**  <br>*optional*|The owning IMS organization identifier.  <br>**Example** : `"string"`|string|
|**key**  <br>*optional*|Primary keys for the custom XDM object  <br>**Example** : `[ "string" ]`|< string > array|
|**properties**  <br>*required*|**Example** : `"object"`|object|
|**schemaId**  <br>*optional*|**Example** : `"string"`|string|
|**title**  <br>*optional*|**Example** : `"string"`|string|
|**type**  <br>*required*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) for the time of last modification.  <br>**Example** : `0`|integer|
|**updatedUser**  <br>*optional*  <br>*read-only*|The ID of the user who changed this object.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*  <br>*read-only*|The version of the xdm extension. Updated when the xdm extension is modified.  <br>**Example** : `"string"`|string|
|**xdmType**  <br>*optional*|The type of this xdm object.  <br>**Example** : `"string"`|enum (model, entity)|



