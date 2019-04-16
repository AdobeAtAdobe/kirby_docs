
<a name="provisioningresponse"></a>
### ProvisioningResponse
Provisioning API Response Object


|Name|Description|Schema|
|---|---|---|
|**azureResponse**  <br>*optional*|Actual Azure Response  <br>**Example** : `"string"`|string|
|**connectionString**  <br>*optional*|Conection string for the resource that is created  <br>**Example** : `"string"`|string|
|**errors**  <br>*optional*|Error Info  <br>**Example** : `[ "string" ]`|< string > array|
|**message**  <br>*optional*|Message to be displayed  <br>**Example** : `"string"`|string|
|**pollRequired**  <br>*optional*|**Default** : `false`  <br>**Example** : `true`|boolean|
|**status**  <br>*optional*|Status for the request made  <br>**Example** : `0`|integer (int32)|



