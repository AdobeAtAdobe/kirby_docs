
<a name="environment-model"></a>
### Environment Model

|Name|Description|Schema|
|---|---|---|
|**defaultTemplateFile**  <br>*required*|Default file from where resource parameters are read  <br>**Example** : `"string"`|string|
|**environmentName**  <br>*required*|Name of environment that needs to be created  <br>**Example** : `"string"`|string|
|**groups**  <br>*required*|Azure Resource Groups  <br>**Example** : `[ "[group-model](#group-model)" ]`|< [Group Model](Group_Model.md#group-model) > array|
|**location**  <br>*required*|Azure location. Values for these can be obtained from Azure documentation.  <br>**Example** : `"string"`|string|
|**octoPayloadContentVersion**  <br>*required*|Octo Json Payload Content Version  <br>**Example** : `0`|integer|
|**provider**  <br>*optional*|Azure only supported at this time  <br>**Example** : `"string"`|string|
|**region**  <br>*required*|Adobe defined regions  <br>**Example** : `"string"`|string|
|**schema**  <br>*optional*|Schema  <br>**Example** : `"string"`|string|
|**servicePrincipals**  <br>*optional*|Azure Service Principals  <br>**Example** : `[ "[service-principal-model](#service-principal-model)" ]`|< [Service Principal Model](Service_Principal_Model.md#service-principal-model) > array|
|**subscriptionId**  <br>*required*|Azure subscription ID where resources will be created.  <br>**Example** : `"string"`|string|



