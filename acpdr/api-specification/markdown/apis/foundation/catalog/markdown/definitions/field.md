
<a name="field"></a>
### field

|Name|Description|Schema|
|---|---|---|
|**dataType**  <br>*optional*|**Example** : `"[datatype](#datatype)"`|[dataType](dataType.md#datatype)|
|**definition**  <br>*optional*|Deprecated - this field is currently a hack to support non-csv data.  We need to natively support this type of data  <br>**Example** : `"object"`|object|
|**dule**  <br>*optional*|DULE labels.  <br>**Example** : `"object"`|[dule](#field-dule)|
|**meta**  <br>*optional*|Metadata descriptions for each field.  <br>**Example** : `"object"`|[meta](#field-meta)|
|**name**  <br>*optional*|Field name.  <br>**Example** : `"string"`|string|

<a name="field-dule"></a>
**dule**

|Name|Description|Schema|
|---|---|---|
|**contracts**  <br>*optional*|What Contractual Considerations, if any, apply to this data?  <br>**Example** : `[ "string" ]`|< enum (C1, C2, C3, C4, C5, C6, C7, C8, C9, None) > array|
|**identifiability**  <br>*optional*|Should this data be treated as Indirectly Identifiable Data or Directly Identifiable Data? (What is the level of Identifiability?)  <br>**Example** : `[ "string" ]`|< enum (I1, I2) > array|
|**loginState**  <br>*optional*|What is the Log-in State?  <br>**Example** : `[ "string" ]`|< enum (Identified, Incognito, Ambiguous, Not Provided) > array|
|**other**  <br>*optional*|Other information that may govern the use of this data.  <br>**Example** : `"string"`|string|
|**specialTypes**  <br>*optional*|Is this a special data type? (Relative to a regulated industry, or distinct regulatory rules, e.g. GDPR Special data, health data, or Financial data)  <br>**Example** : `[ "string" ]`|< enum (S1, S2) > array|

<a name="field-meta"></a>
**meta**

|Name|Description|Schema|
|---|---|---|
|**delta**  <br>*optional*|The presence of this attribute on a field indicates that it is used in the origin system for retrieveing 'deltas' of data  <br>**Example** : `"object"`|[delta](#field-delta)|
|**isPrimary**  <br>*optional*|Marks this field as a join key into other datasets.  <br>**Example** : `true`|boolean|

<a name="field-delta"></a>
**delta**

|Name|Description|Schema|
|---|---|---|
|**format**  <br>*optional*|If the origin field is a date field this describes the format of that field in the style of Java SimpleDateFormat  <br>**Example** : `"string"`|string|
|**timezone**  <br>*optional*|The timezone that the data uses in the origin system, uses the format from IANA in the tz_database  <br>**Example** : `"string"`|string|



