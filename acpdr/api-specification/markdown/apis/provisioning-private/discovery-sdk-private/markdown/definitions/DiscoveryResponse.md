
<a name="discoveryresponse"></a>
### DiscoveryResponse
Discovery Service Response Object


|Name|Description|Schema|
|---|---|---|
|**clientId**  <br>*required*|Client Id for the resource  <br>**Example** : `"string"`|string|
|**clientKey**  <br>*required*|Client Key for the resource  <br>**Example** : `"string"`|string|
|**errorMessage**  <br>*optional*|Error message, if any, when obtaining Client Id/Key  <br>**Example** : `"string"`|string|
|**id**  <br>*required*|Id associated with resource  <br>**Example** : `"string"`|string|
|**imsOrgId**  <br>*optional*|IMS Org ID for the resource  <br>**Example** : `"string"`|string|
|**location**  <br>*required*|Location of the resource  <br>**Example** : `"string"`|string|
|**name**  <br>*required*|Name of the resource  <br>**Example** : `"string"`|string|
|**properties**  <br>*optional*|Properties of the resource (Lookup by id only)  <br>**Example** : `{<br>  "string" : "object"<br>}`|< string, object > map|
|**resourceGroupName**  <br>*required*|resource group name of the resource  <br>**Example** : `"string"`|string|
|**sasToken**  <br>*optional*|SAS Token for the resource (Blob Storage resources only)  <br>**Example** : `"string"`|string|
|**subscriptionId**  <br>*required*|subscription Id associated with the resource  <br>**Example** : `"string"`|string|
|**tags**  <br>*required*|Tags associated with a resource  <br>**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**tenantId**  <br>*required*|Tenant Id for the resource  <br>**Example** : `"string"`|string|
|**type**  <br>*required*|Type of the resource  <br>**Example** : `"string"`|string|



