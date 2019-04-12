
<a name="service-principal-delete-main-model"></a>
### Service Principal Delete Main Model

|Name|Description|Schema|
|---|---|---|
|**jobName**  <br>*required*|Name of this job  <br>**Example** : `"string"`|string|
|**location**  <br>*required*|Azure location. Values for these can be obtained from Azure documentation.  <br>**Example** : `"string"`|string|
|**octoPayloadContentVersion**  <br>*required*|Octo Payload Content Version  <br>**Example** : `0`|integer|
|**schema**  <br>*optional*|Schema  <br>**Example** : `"string"`|string|
|**servicePrincipals**  <br>*required*|Azure Service Principals  <br>**Example** : `[ "[service-principal-delete-sp-model](#service-principal-delete-sp-model)" ]`|< [Service Principal Delete SP Model](Service_Principal_Delete_SP_Model.md#service-principal-delete-sp-model) > array|
|**subscriptionId**  <br>*required*|Name of this job  <br>**Example** : `"string"`|string|



