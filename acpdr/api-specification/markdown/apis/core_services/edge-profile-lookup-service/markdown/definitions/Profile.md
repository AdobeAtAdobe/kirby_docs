
<a name="profile"></a>
### Profile
The set of attributes of identified and partially identified persons. See the <a href="http://xdm.corp.adobe.com/master/types.html#model.Profile">XDM schema</a> for more details.


|Name|Description|Schema|
|---|---|---|
|**_links**  <br>*optional*|**Example** : `"object"`|[_links](#profile-links)|
|**addresses**  <br>*optional*|A list of postal addresses. A postal address. Address could relate to a persons home, work, preferred store location etc  <br>**Example** : `[ "[address](#address)" ]`|< [Address](Address.md#address) > array|
|**person**  <br>*optional*|An individual actor, contact, or owner.  <br>**Example** : `"[person](#person)"`|[Person](Person.md#person)|

<a name="profile-links"></a>
**_links**

|Name|Description|Schema|
|---|---|---|
|**self**  <br>*optional*|**Example** : `"[hallink](#hallink)"`|[HalLink](HalLink.md#hallink)|



