
<a name="accountresponse"></a>
### accountResponse

|Name|Description|Schema|
|---|---|---|
|**connector**  <br>*optional*|The ID for the Connector this Account params was created from.  <br>**Example** : `"string"`|string|
|**created**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) when this Account was persisted.  <br>**Example** : `0`|integer (int64)|
|**createdClient**  <br>*optional*  <br>*read-only*|The ID of the IMS client that created this Account.  <br>**Example** : `"string"`|string|
|**createdUser**  <br>*optional*  <br>*read-only*|The ID of the user who created this object.  <br>**Example** : `"string"`|string|
|**description**  <br>*optional*|The user-provided description of the account.  <br>**Example** : `"string"`|string|
|**imsOrg**  <br>*optional*|The owning IMS organization identifier.  <br>**Example** : `"string"`|string|
|**params**  <br>*optional*|Keyed list of parameters used in account. The validation for these parameters is done based on settings in accountParams.  <br>**Example** : `"object"`|object|
|**updated**  <br>*optional*  <br>*read-only*|The Unix timestamp (in milliseconds) for the time of last modification.  <br>**Example** : `0`|integer (int64)|
|**updatedUser**  <br>*optional*  <br>*read-only*|The ID of the user who last updated this object.  <br>**Example** : `"string"`|string|
|**version**  <br>*optional*  <br>*read-only*|The Semantic version of the account. Updated when the Account is modified.  <br>**Example** : `"string"`|string|



