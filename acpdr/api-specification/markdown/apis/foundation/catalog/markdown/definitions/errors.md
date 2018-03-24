
<a name="errors"></a>
### errors

|Name|Description|Schema|
|---|---|---|
|**code**  <br>*optional*|An enumerated code that details the type of error encountered. This value should be understandable by the reader and writer and eventually allow for localized error message (and solution) descriptions.  <br>**Example** : `"string"`|string|
|**description**  <br>*optional*|A human-readable description of the error. This message may be transmitted to clients, but isn't meant for customer-facing UIS.  <br>**Example** : `"string"`|string|
|**rows**  <br>*optional*|Indicates which rows exhibit this error. Could be a single number, or a hyphen-delimited range.  <br>**Example** : `[ "string" ]`|< string > array|



