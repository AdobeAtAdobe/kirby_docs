
<a name="person"></a>
### Person
An individual actor, contact, or owner. More information can be found in the <a href="http://xdm.corp.adobe.com/master/types.html#core.Person">XDM schema.</a>


|Name|Description|Schema|
|---|---|---|
|**birthDay**  <br>*optional*|The day of the month a person was born (1-31). Default 0 means unknown.  <br>**Minimum value** : `0`  <br>**Maximum value** : `31`  <br>**Example** : `29`|integer (int32)|
|**birthMonth**  <br>*optional*|The month of the year a person was born (1-12). Default 0 means unknown.  <br>**Minimum value** : `0`  <br>**Maximum value** : `12`  <br>**Example** : `2`|integer (int32)|
|**birthYear**  <br>*optional*|The year a person was born including the century. Default 0 means unknown.  <br>**Minimum value** : `0`  <br>**Example** : `1998`|integer (int32)|
|**courtesyTitle**  <br>*optional*|Normally an abbreviation of a persons title, honorific, or salutation. The courtesyTitle is used in front of full or last name in opening texts.  <br>**Example** : `"Mr."`|string|
|**firstName**  <br>*optional*|The personal, or given name.  <br>**Example** : `"John"`|string|
|**gender**  <br>*optional*|Gender identity of the person.  <br>**Example** : `"male"`|string|
|**lastName**  <br>*optional*|The inherited family name, surname, patronymic, or matronymic name.  <br>**Example** : `"Doe"`|string|
|**middleName**  <br>*optional*|Middle, alternative, or additional names supplied between the first and last names.  <br>**Example** : `"Cameron"`|string|



