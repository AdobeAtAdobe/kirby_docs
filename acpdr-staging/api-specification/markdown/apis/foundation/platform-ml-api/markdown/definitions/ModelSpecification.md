
<a name="modelspecification"></a>
### ModelSpecification
*Polymorphism* : Composition


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#modelspecification-links)|
|**additionalDocumentation**  <br>*optional*|**Example** : `"string"`|string|
|**artifacts**  <br>*optional*|**Example** : `"object"`|[artifacts](#modelspecification-artifacts)|
|**config**  <br>*optional*|**Example** : `{<br>  "string" : "object"<br>}`|< string, object > map|
|**created**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|
|**createdBy**  <br>*optional*|**Example** : `"object"`|[createdBy](#modelspecification-createdby)|
|**description**  <br>*optional*|**Example** : `"string"`|string|
|**id**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (uuid)|
|**imageUrl**  <br>*optional*|Url of the thumbnail image  <br>**Example** : `"string"`|string|
|**modelType**  <br>*required*|**Example** : `"string"`|string|
|**name**  <br>*required*|**Example** : `"string"`|string|
|**tags**  <br>*optional*|**Example** : `{<br>  "string" : "string"<br>}`|< string, string > map|
|**type**  <br>*optional*|**Example** : `"string"`|string|
|**updated**  <br>*optional*  <br>*read-only*|**Example** : `"string"`|string (date-time)|

<a name="modelspecification-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**add-model-instance**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**delete-model-specification**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**get-model-specification**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**list-model-instances**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**self**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|
|**update-model-specification**  <br>*optional*|**Example** : `"[linkobject](#linkobject)"`|[LinkObject](LinkObject.md#linkobject)|

<a name="modelspecification-artifacts"></a>
**artifacts**

|Name|Description|Schema|
|---|---|---|
|**default**  <br>*optional*|**Example** : `"[modelspecificationartifact](#modelspecificationartifact)"`|[ModelSpecificationArtifact](ModelSpecificationArtifact.md#modelspecificationartifact)|
|**evaluation**  <br>*optional*|**Example** : `"[modelspecificationartifact](#modelspecificationartifact)"`|[ModelSpecificationArtifact](ModelSpecificationArtifact.md#modelspecificationartifact)|
|**prediction**  <br>*optional*|**Example** : `"[modelspecificationartifact](#modelspecificationartifact)"`|[ModelSpecificationArtifact](ModelSpecificationArtifact.md#modelspecificationartifact)|
|**preprocessing**  <br>*optional*|**Example** : `"[modelspecificationartifact](#modelspecificationartifact)"`|[ModelSpecificationArtifact](ModelSpecificationArtifact.md#modelspecificationartifact)|
|**scoring**  <br>*optional*|**Example** : `"[modelspecificationscoringartifact](#modelspecificationscoringartifact)"`|[ModelSpecificationScoringArtifact](ModelSpecificationScoringArtifact.md#modelspecificationscoringartifact)|
|**training**  <br>*optional*|**Example** : `"[modelspecificationtrainingartifact](#modelspecificationtrainingartifact)"`|[ModelSpecificationTrainingArtifact](ModelSpecificationTrainingArtifact.md#modelspecificationtrainingartifact)|
|**validation**  <br>*optional*|**Example** : `"[modelspecificationartifact](#modelspecificationartifact)"`|[ModelSpecificationArtifact](ModelSpecificationArtifact.md#modelspecificationartifact)|

<a name="modelspecification-createdby"></a>
**createdBy**

|Name|Description|Schema|
|---|---|---|
|**avatar**  <br>*optional*|**Example** : `"string"`|string|
|**displayName**  <br>*optional*|**Example** : `"string"`|string|
|**userId**  <br>*optional*|**Example** : `"string"`|string|



