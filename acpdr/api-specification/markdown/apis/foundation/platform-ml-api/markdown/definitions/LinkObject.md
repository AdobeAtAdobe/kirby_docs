
<a name="linkobject"></a>
### LinkObject

|Name|Description|Schema|
|---|---|---|
|**href**  <br>*required*|Either an URI (RFC3986) or an URI Template (RFC6570) in which case the linkObject SHOULD have a 'templated' attribute whose value is true  <br>**Example** : `"string"`|string|
|**hrefLang**  <br>*optional*|The language of the target resource (as defined by RFC5988)  <br>**Example** : `"string"`|string|
|**method**  <br>*optional*|The HTTP method to be applied when using this link. This should be a valid HTTP method name such as GET, PUT, POST, PATCH, DELETE where GET implies support for HEAD as well  <br>**Default** : `"GET"`  <br>**Example** : `"string"`|string|
|**templated**  <br>*optional*|True if the link href is templated, false otherwise which is also the default  <br>**Default** : `false`  <br>**Example** : `true`|boolean|
|**title**  <br>*optional*|A label with a human-readable identifier (as defined by RFC5988)  <br>**Example** : `"string"`|string|
|**type**  <br>*optional*|A hint to indicate the media type expected when dereferencing the target resource  <br>**Example** : `"string"`|string|



