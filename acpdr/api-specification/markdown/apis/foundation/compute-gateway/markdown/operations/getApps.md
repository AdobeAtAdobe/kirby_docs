
<a name="getapps"></a>
### Fetches Apps satisfying the query criteria
```
GET /data/foundation/compute/apps
```


#### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**limit**  <br>*optional*|Number of records to fetch per page|integer (int32)|`10`|
|**Query**|**orderby**  <br>*optional*|Field to order results by.Can be multivalued, separated by comma.Supported fields: createdAt.Prepend property name with + for ASC,- for DESC order|string|`"-createdAt"`|
|**Query**|**property**  <br>*optional*|Comma separated property filters.Supported filters are on Date range filtering, status,id and tags(with OR support) e.g createdAt>=2017-04-05T13:30:00Z,tags.name==abc\|def,status==TASK_RUNNING|string||
|**Query**|**start**  <br>*optional*|Start value of property specified using orderby|string||


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Apps retrieved|< [ListResponse](../definitions/ListResponse.md#listresponse) > array|
|**401**|Unauthorized access|No Content|
|**406**|Non Acceptable Response Type.Only application/json allowed|No Content|
|**414**|Request URI is longer than allowed 2000 chars|No Content|
|**422**|Input validation failure|No Content|
|**503**|Request failed|No Content|


#### Produces

* `application/json`


#### Tags

* Describes operations performed on Spark applications


#### Example HTTP request

##### Request path
```
/data/foundation/compute/apps
```


##### Request query
```
json :
{
  "limit" : 0,
  "orderby" : "string",
  "property" : "string",
  "start" : "string"
}
```


#### Example HTTP response

##### Response 200
```
json :
[ {
  "result" : [ 0.0 ],
  "_page" : {
    "orderBy" : "-createdAt",
    "property" : "id==123",
    "start" : "2017-05-05T00:00:00Z",
    "next" : "2017-05-01T00:00:00Z",
    "count" : 3
  },
  "next" : "string"
} ]
```



