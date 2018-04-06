# Catalog Service RESTful API Resource.


<a name="overview"></a>
## Overview
Catalog service API for client registration. Administrative use only.
Notes:
* When trying out the APIs, get your tokens from IMS stage and prefix it with 'Bearer'.
* All requests with a payload in the request body (i.e., POST, PUT, and PATCH calls) must include the header 'Content-Type: application/json'.  This UI automatically supplies that header when using the 'Try it out' button, but calling clients must take care to supply it for themselves.
* Your browser will block the requests if you use 'Try it out' button, since it's a cross-origin request. You will need to modify your browsers settings or install, an extension that adds 'Allow-Control-Allow-Origin: *' to your request header. Please note this may compromise the security of your browser, and it is recommended that you turn off this setting once you've used swagger.


### Version information
*Version* : 1.0.0


### Contact information
*Contact* : Catalog Team.


### URI scheme
*Host* : platform-int.adobe.io  
*BasePath* : /data/foundation/catalog  
*Schemes* : HTTPS


### Consumes

* `application/json`


### Produces

* `application/json`



