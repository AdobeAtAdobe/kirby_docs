
<a name="get"></a>
### Get Home Document
```
GET /
```


#### Description
Returns a home document as specified in the internet draft: https://tools.ietf.org/html/draft-nottingham-json-home-06


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**x-gw-ims-org-id**  <br>*required*|IMS org id of the caller|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Successful operation  <br>**Headers** :   <br>`ETag` (string) : An identifier for a specific version of the resource.  <br>`Last-Modified` (string) : The date and time at which the resource was last modified.  <br>`Cache-Control` (string) : Instructions to clients and web proxies indicating the preferred caching behavior.|No Content|
|**400**|Bad request|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**401**|Unauthorized|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**403**|Forbidden|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**406**|Unacceptable|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**500**|Internal Server Error|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**502**|Bad Gateway|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**503**|Service Unavailable|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|
|**504**|Gateway Timeout|[SenseiApiResponse](../definitions/SenseiApiResponse.md#senseiapiresponse)|


#### Produces

* `application/json-home`


#### Tags

* Home


#### Example HTTP request

##### Request path
```
/
```


##### Request header
```
json :
"string"
```


#### Example HTTP response

##### Response 200
```
json :
{
  "application/json-home" : {
    "api" : {
      "title" : "Adobe Cloud Platform - Sensei ML API",
      "links" : {
        "author" : "mailto:apis@platform.adobe.io",
        "describedBy" : "https://www.adobe.io/apis/cloudplatform.html"
      }
    },
    "resources" : {
      "https://sensei.adobe.io/engines" : {
        "hrefTemplate" : "/engines",
        "hints" : {
          "allow" : [ "GET", "POST" ],
          "formats" : {
            "application/vnd.adobe.platform.sensei+json;profile=engineListing.v1.json" : { }
          },
          "acceptPost" : [ "application/vnd.adobe.platform.sensei+json;profile=engine.v1.json" ]
        }
      },
      "https://sensei.adobe.io/mlInstances" : {
        "hrefTemplate" : "/mlInstances",
        "hints" : {
          "allow" : [ "GET", "POST" ],
          "formats" : {
            "application/vnd.adobe.platform.sensei+json;profile=mlInstanceListing.v1.json" : { }
          },
          "acceptPost" : [ "application/vnd.adobe.platform.sensei+json;profile=mlInstance.v1.json" ]
        }
      },
      "https://sensei.adobe.io/experiments" : {
        "hrefTemplate" : "/experiments",
        "hints" : {
          "allow" : [ "GET", "POST" ],
          "formats" : {
            "application/vnd.adobe.platform.sensei+json;profile=experimentListing.v1.json" : { }
          },
          "acceptPost" : [ "application/vnd.adobe.platform.sensei+json;profile=experiment.v1.json" ]
        }
      },
      "https://sensei.adobe.io/models" : {
        "hrefTemplate" : "/models",
        "hints" : {
          "allow" : [ "GET", "POST" ],
          "formats" : {
            "application/vnd.adobe.platform.sensei+json;profile=modelListing.v1.json" : { }
          },
          "acceptPost" : [ "application/vnd.adobe.platform.sensei+json;profile=model.v1.json" ]
        }
      },
      "https://sensei.adobe.io/services" : {
        "hrefTemplate" : "/services",
        "hints" : {
          "allow" : [ "GET", "POST" ],
          "formats" : {
            "application/vnd.adobe.platform.sensei+json;profile=serviceListing.v1.json" : { }
          },
          "acceptPost" : [ "application/vnd.adobe.platform.sensei+json;profile=service.v1.json" ]
        }
      }
    }
  }
}
```


##### Response 400
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 401
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 403
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 406
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 500
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 502
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 503
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```


##### Response 504
```
json :
{
  "type" : "https://platform.adobe.io/data/foundation/ml/problems/illegal-argument",
  "title" : "Illegal Argument",
  "status" : 400,
  "detail" : "Model specification name must not be empty",
  "additionalDetails" : {
    "string" : "string"
  }
}
```



