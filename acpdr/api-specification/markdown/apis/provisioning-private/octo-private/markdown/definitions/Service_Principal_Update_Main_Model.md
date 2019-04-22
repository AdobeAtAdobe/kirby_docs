
<a name="service-principal-update-main-model"></a>
### Service Principal Update Main Model

|Name|Description|Schema|
|---|---|---|
|**jobName**  <br>*required*|Name of this job  <br>**Example** : `"string"`|string|
|**location**  <br>*required*|Azure location. Values for these can be obtained from Azure documentation.  <br>**Example** : `"string"`|string|
|**octoPayloadContentVersion**  <br>*required*|Octo Payload Content Version  <br>**Example** : `0`|integer|
|**schema**  <br>*optional*|Schema  <br>**Example** : `"string"`|string|
|**servicePrincipals**  <br>*required*|Azure Service Principals  <br>**Example** : `[ "[service-principal-update-sp-model](#service-principal-update-sp-model)" ]`|< [Service Principal Update SP Model](Service_Principal_Update_SP_Model.md#service-principal-update-sp-model) > array|
|**subscriptionId**  <br>*required*|Name of this job  <br>**Example** : `"string"`|string|



