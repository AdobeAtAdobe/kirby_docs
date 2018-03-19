
<a name="dulelabelresonse"></a>
### duleLabelResonse
Structure of the DULE label response that includes all labels associated with a given dataset.


|Name|Description|Schema|
|---|---|---|
|**connection**  <br>*optional*|If the dataset has a parent connection, the connection labels are returned.  <br>**Example** : `"object"`|object|
|**dataset**  <br>*optional*|The DULE labels on the dataset itself.  <br>**Example** : `"object"`|object|
|**fields**  <br>*optional*|The DULE labels on the individual fields.  <br>**Example** : `[ "object" ]`|< object > array|



