# Tutorial: Authenticating and accessing Adobe Experience Platform APIs

## Objective

This tutorial will cover the steps on how to gain access to making Adobe Experience Platform API calls starting with creating your access token used to authenticate API calls. The steps that will be explained in this tutorial are:

* (optional) Create an Adobe ID
* Grant access to the Organization and Adobe Experience Platform using Adobe Admin Console
* Creating the required public and private certificates
* Logging into Adobe I/O Console
* Creating a new Integration
* Authenticating
* Calling a platform API

---

## Authenticate to Make API Calls

To maintain the security of your applications and users, all requests to Adobe I/O APIs must be authenticated and authorized using standards such as OAuth and JSON Web Tokens (JWT). The JWT will then be used along with client specific information to generate your personal access token.

We will be going through the steps of authentication through the creation of an access token outlined in this flowchart:
![](how_to_authenticate_acp_for_api_flowchart.png)

### Prerequisites
* A registered Adobe ID account
* the Adobe ID account must have been added to an Organization with access to "Adobe Experience Platform"
* Administrative Rights (System Administrator) for an IMS Organization


#### A registered Adobe ID account

If you don't have an Adobe ID yet, you can create one with the following steps:

1. Navigate to [Adobe Console](https://console.adobe.io)
2. Click on the *Get an Adobe ID* link
3. Complete the Sign up process

#### Administrative Rights for a IMS Organization

 Administrative rights can be granted to you by another administrator using [Adobe Admin Console UI](https://adminconsole.adobe.com/). You will need administrative rights to add yourself as a user to an IMS Organization.  You will also need admin rights to create an integration for Adobe Experience Platform -  Data Services.

 ![](add_user_as_admin.png)

#### User of an IMS Organization

Once as an administrator, you (or another Administrator) can add yourself to the Organization as a user:

1. Navigate to [Adobe Admin Console UI](https://adminconsole.adobe.com/)
2. Click on *Assign Users* for the IMS Organization you wish to join
![](assign_user.png)
3. Enter the email assigned to your Adobe ID
4. Select the profiles you want assigned to your account
5. Press *Save* Button to finish

### One Time Setup

The following steps will only need to be done once:

* Create Certificate
* Log into adobe.io Dev Portal
* Create Integration
* Copy Down Access Values


Once your have your certificate, integration, and access values, you will be able to reuse them in future authentications. We will go over each step in detail below.

#### Create Certificate

**For MacOS & Linux platforms**

Open terminal and execute below command:  

`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate_pub.crt`


**For Windows platforms**

i) Download an openssl client to generate public certificates. For e.g. [Openssl windows client](https://bintray.com/vszakats/generic/download_file?file_path=openssl-1.1.1-win64-mingw.zip)

ii) Extract the folder and copy it to C:/libs/ location.

iii) Open Command Line Prompt and execute below commands.

`set OPENSSL_CONF=C:/libs/openssl-1.1.1-win64-mingw/openssl.cnf`

`cd C:/libs/openssl-1.1.1-win64-mingw/`

`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate_pub.crt`


You will get a response similar to the following which prompts you to enter some information about yourself:

```
Generating a 2048 bit RSA private key
.................+++
.......................................+++
writing new private key to 'private.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:
State or Province Name (full name) []:
Locality Name (eg, city) []:
Organization Name (eg, company) []:
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:
Email Address []:
```

After entering the information two files will be generated: `certificate_pub.crt` and `private.key`.

Note `certificate_pub.crt` will expire in 365 days. You can make the period longer by changing the value of `days` in the `openssl` command above but rotating credentials periodically is a good security practice.

The `certificate_pub.crt` certificate will later be uploaded to the Adobe IO Console for when you create an API key for access to any Adobe I/O API.

Your private key file named `private.key` will be used later to sign your JWT token.

#### Log into adobe.io Developer Portal: console.adobe.io

Navigate to the [Adobe I/O Console](https://console.adobe.io/) and sign in with your Adobe ID.

#### Create Integration

You will be taken to the Integrations page. An *Integration* is a service account that is created for the selected IMS Organization (If you are associated with multiple Organizations, you can select the appropriate Organization from the drop-down). You will only be allowed to make calls for the IMS Organization for which the Integration is created in.

From this page we want to create a *New Integration*.

![](new_integration.png)

You will then be prompted to *Access an API* or to *Receive near-real-time events*. We will be accessing APIs so select *Access an API* and then *Continue*.

![](new_integration1.png)


The drop-down menu on the top right of the screen is where you would switch your organization if your account is tied to multiple. We are selecting *Workshop* and *Data Services* under *Experience Cloud* since we want to access the data services.

![](new_integration2.png)


After your organization is selected there will be a new prompt at the top. We want a *New Integration* so make sure that option is selected before clicking *Continue*


![](new_integration3.png)

Fill in your Integration Details. Afterwards, click on *Select a File* to upload your `certificate_pub.crt` file we generated in the previous section. Click *Create Integration* to finish up the process

![](new_integration4.png)

#### Copy Down Access Values

After creating your integration, you will be able to view the details of your integration. After clicking on *Retrieve client Secret* your screen should look similar to this.

![](access_values.png)

Copy down the values for `{API KEY}`, `{IMS ORG}` which is the Organization ID, and `{CLIENT SECRET}` as these will be used in the next step.

### Authentication For Each Session

The end goal is to generate your `{ACCESS_TOKEN}` which will be used to authenticate your API calls. The access token is added into the authorization header in every API call you make to Adobe Experience Platform.  This action will need to be done every-time the access token expires which is every 24 hours.

#### Create JWT

While in your integration's detail page, navigate to the *JWT* tab. Your page should look similar to this.

![](jwt_empty.png)

View the contents of your `private.key` file that we generated previously using a text editor or terminal

```shell
cat private.key
```

Your output will look something like this:

```shell
cat private.key
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYjPj18NrVlmrc
H+YUTuwWrlHTiPfkBGM0P1HbIOdwrlSTCmPhmaNNG5+mEiULJLWlrhQpx/7uQVNW
......
xbWgBWatJ2hUhU5/K2iFlNJBVXyNy7rN0XzOagLRJ1uS2CM6Hn3vBOqLbHRG4Pen
J1LvEocGunT12UJekLdEaQR4AKodIyjv5opvewrzxUZhVvUIIgeU5vUpg9smCXai
wPW5MQjmygodzCh7+eGLrg==
-----END PRIVATE KEY-----
```

Copy the entire output into the text field and *Generate JWT*. Copy down your generated JWT for the next step.

![](generated_jwt.png)

#### Generate Access Token

Finally, the last piece of information you will need to start making API calls is generating an access token. Your access token is the key used to authorize your API calls.

We can use `curl` to generate your access token. If you do not have `curl` installed, you can install it using `npm install curl`. You can read more about curl [here](https://curl.haxx.se/)

Once `curl` is installed, you will need to swap the fields in the following command with your own {API_KEY}, {CLIENT_SECRET}, and {JWT_TOKEN}.

```SHELL
curl -X POST "https://ims-na1.adobelogin.com/ims/exchange/jwt/" \
  -F "client_id={API_KEY}" \
  -F "client_secret={CLIENT_SECRET}" \
  -F "jwt_token={JWT_TOKEN}"
```

It should return something like this.

```JSON
{
  "token_type":"bearer",
  "access_token":"eyJ4NXUiOiJpbXNfbmExLXN0ZzEta2V5LT2VyIiwiYWxnIjoiUlMyNTYifQ.eyJpZCI6IjE1MjAzMDU0ODY5MDhfYzMwM2JkODMtMWE1My00YmRiLThhNjctMWDhhNDJiNTE1X3VlMSIsImNsaWVudF9pZCI6ImYwNjY2Y2M4ZGVhNzQ1MWNiYzQ2ZmI2MTVkMzY1YzU0IiwidXNlcl9pZCI6IjA0ODUzMkMwNUE5ODg2QUQwQTQ5NDEzOUB0ZWNoYWNjdC5hZG9iZS5jb20iLCJzdGF0ZSI6IntcInNlc3Npb25cIjpcImh0dHBzOi8vaW1zLW5hMS1zdGcxLmFkb2JlbG9naW4uY29tL2ltcy9zZXNzaW9uL3YxL05UZzJZemM1TVdFdFlXWTNaUzAwT1RWaUxUZ3lPVFl0WkdWbU5EUTVOelprT0dFeUxTMHdORGcxTXpKRPVGc0TmtGRU1FRTBPVFF4TXpsQWRHVmphR0ZqWTNRdVlXUnZZbVV1WTI5dFwifSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJhcyI6Imltcy1uYTEtc3RnMSIsImZnIjoiU0hRUlJUQ0ZTWFJJTjdSQjVVQ09NQ0lBWVU9PT09PT0iLCJtb2kiOiJhNTYwOWQ5ZiIsImMiOiJMeksySTBuZ2F2M1BhWWIxV0J3d3FRPT0iLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJzY29wZSI6Im9wZW5pZCxzZXNzaW9uLEFkb2JlSUQscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCIsImNyZWF0ZWRfYXQiOiIxNTIwMzA1NDg2OTA4In0.EBgpw0JyKVzbjIBmH6fHDZUvJpvNG8xf8HUHNCK2l-dnVJqXxdi0seOk_kjVodkIa3evC54V560N60vi_mzt7gef-g954VH6l3gFh6XQ7yqRJD2LMW7G1lhQGhga4hrQCnJlfSQoztvIp9hkar9Zcu-MYgyEB5UlwK3KtB3elu7vJGk35F3T9OnqVL4PFj0Ix6zcuN_4gikgQgmtoUjuXULinbtu9Bkmdf7so9FvhapUd5ZTUTTMrAfJ36gEOQPqsuzlu9oUQaYTAn8v4B9TgoS0Paslo6WIksc4f_rSVWsbO6_TSUqIOi0e_RyL6GkMBA1ELA-Dkgbs-jUdkw",
  "expires_in":86399947
}
```

Your access token is the value under the `access_token` key. Note this access token will expire in 86399947 milliseconds or 24 hours.

You are now ready to make API requests in Adobe Experience Platform!

#### Testing Access Code

To test if your access token is valid, we can try to make the following API call. This call will list all the core XDM objects:

```SHELL
curl -X GET "https://platform.adobe.io/data/foundation/catalog/xdms/core/" \
  -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" \
  -H "x-api-key: {YOUR_API_KEY}" \
  -H "x-gw-ims-org-id: {YOUR_IMS_ORG}"
```

If no error is returned and a large JSON object is returned then your `access_token` is working!

```JSON
{
    "Address": {
        "created": 1520268294987,
        "updated": 1520268294987,
        "title": "Address",
        "type": "object",
        "description": "A postal address. Address could relate to a persons home, work, preferred store location etc.",
        "properties": {
            "primary": {
                "title": "Primary",
                "type": "boolean",
                "description": "Primary address indicator. A Profile can have only one `primary` address at a given point of time.\n"
            },
            "..."
          },
        "..."
      },
    "..."
  }
```

#### Using Postman for JWT Authentication and API calls

[Postman](https://www.getpostman.com/) is a popular tool to work with REST based APIs. This [Medium post](https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f) describes how you can setup postman to automatically perform JWT authentication and use it to consume Adobe Experience Platform APIs.

## Adobe Experience Platform Components

The services below are the primary components you will interact with when it comes to ingestion or reading of existing data.

### Data Discovery (Catalog)
Stores information about existing datasets that you may read or write to.

#### Sample fetch of available datasets
```shell
curl -X GET "https://platform.adobe.io/data/foundation/catalog/dataSets" \
    -H "accept:application/json" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization: Bearer ACCESS_TOKEN" \
    -H "x-api-key: API_KEY"
```

#### Sample response

```json
{
    "598d6e81b2745f000015edcb": {
        "version": "1.0.0",
        "imsOrg": "AdobeIMSOrganization@AdobeOrg",
        "connectorId": "azure-blob",
        "name": "CredentialsTest",
        "created": 1502441089391,
        "updated": 1502441089669,
        "dule": {},
        "aspect": "production",
        "status": "enabled",
        "fields": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "age",
                "type": "string"
            }
        ],
        "fileDescription": {
            "persisted": false,
            "format": "parquet",
        },
        "transforms":"@/dataSets/598d6e81b2745f000015edcb/views/598d6e81b2745f000015edcc/transforms",
        "files": "@/dataSets/598d6e81b2745f000015edcb/views/598d6e81b2745f000015edcc/files",
        "children": "@/dataSetViews/598d6e81b2745f000015edcc/children",
        "schema": "@/xdms/context/profile",
        "viewId": "598d6e81b2745f000015edcc",
        "observableSchema": {
            "type": "object",
            "meta:xdmType": "object",
            "properties": {
                "name": {
                    "type": "string",
                },
                "age": {
                    "type": "string",
                }
            }
        }
    }
}
```
##### Important attributes of a Dataset
-   **fileDescriptor** - Describes the serialization format required for ingestion
-   **schema** - The target or potential schema that is stored in the xdm registry. This is the schema you query and
    use if you are wanting to **write** to the dataset.
-   **observableSchema** - The schema of the data that was previously ingested. This is the schema you use when you want to **read** data from the dataset.
-   **fields** - Legacy target schema that should be used only if a 'schema' attribute is not set. Note that the format of the 'fields' schema
    is not traditional JSON schema, but an older proprietary format.
-   **files** - API end point used to access the files associated with this dataset

#### Sample fetch to get a specific dataset
```shell
curl -X GET
"https://platform.adobe.io/data/foundation/catalog/dataSets/598d6e81b2745f000015edcb" \
    -H "accept:application/json" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization: Bearer ACCESS_TOKEN" \
    -H "x-api-key: API_KEY"
```
### XDM Schema Registry
The registry stores the reusable schemas that may be associated with platform datasets.

##### Sample fetch of the "context/profile" schema from above dataset
```shell
curl -X GET
"https://platform.adobe.io/data/foundation/catalog/xdms/context/profile?expansion=true" \
    -H "accept:application/json" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization: Bearer ACCESS_TOKEN" \
    -H "x-api-key: API_KEY"
```

  Note: Parameter 'expansion=true' will expand all embedded $ref's if used

##### Sample response

```JSON
{
    "schema": "http://json-schema.org/draft-06/schema#",
    "xdmVersion": "0.9.9.2",
    "id": "context/profile",
    "meta:altId": "_xdm.context.profile",
    "$id": "https://ns.adobe.com/xdm/context/profile"
    "created": 1529354713137,
    "updated": 1529354713137,
    "title": "Profile",
    "type": "object",
    "description": "XDM Profiles are a singular representation of the attributes of identified and\npartially identified persons. Profiles that are highly identified maybe used for\npersonal communications or highly targeted engagements and can contain detailed\npersonal information such as names, gender, date of birth, locations, and contact\ninformation like phone numbers and email addresses. Profiles may range to the\nother end of the identification spectrum where only anonymous behavioral signals\nare being observed and the amount of identification is simple browser cookies.\nIn this latter case, the sparse Profile data is useful to build more knowledge\non the interests and preferences of the anonymous profile, and over time can\nbecome richer as the person interacting with brand becomes more engaged and\nultimately signs-on to notifications, subscriptions, purchases and other\nconnections with the brand that enrich and fill out the profile.\n\nXDM Profile can contain personal information, identification information, contact\ndetails and communication preferences. Over time XDM Profile will expand to cater\nfor other Profile data such as preference, propensities and other attributes.\n\n",
    "properties": {
        "repositoryCreatedBy": {
            "title": "Created by User Identifier",
            "type": "string",
            "description": "User id who has created the entity.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:repositoryCreatedBy"
        },
        "repositoryLastModifiedBy": {
            "title": "Modified by User Identifier",
            "type": "string",
            "description": "User id who last modified the entity.\nAt creation time, `modifiedByUser` is set as `createdByUser`.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:repositoryLastModifiedBy"
        },
        "createdByBatchID": {
            "title": "Created by Batch Identifier",
            "type": "string",
            "format": "uri",
            "description": "The Data Set Files in Catalog Services which has been originating the creation of the entity.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:createdByBatchID"
        },
        "modifiedByBatchID": {
            "title": "Modified by Batch Identifier",
            "type": "string",
            "format": "uri",
            "description": "The last Data Set Files in Catalog Services which has modified the entity.\nAt creation time, `modifiedByBatchID` is set as `createdByBatchID`.\n",
            "meta:xdmType": "string",
            "meta:xdmField": "xdm:modifiedByBatchID"
        },
        "_repo": {
            "type": "object",
            "properties": {
                "createDate": {
                    "type": "string",
                    "format": "date-time",
                    "examples": [
                        "2004-10-23T12:00:00-06:00"
                    ],
                    "description": "The server date and time when the resource was created in the repository, such as when an asset file is first uploaded or a directory is created by the server as the parent of a new asset. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                    "meta:xdmType": "date-time",
                    "meta:xdmField": "repo:createDate"
                },
                "lastModifiedDate": {
                    "type": "string",
                    "format": "date-time",
                    "examples": [
                        "2004-10-23T12:00:00-06:00"
                    ],
                    "description": "The server date and time when the resource was most recently modified in the repository, such as when a new version of an asset is uploaded or a directory's child resource is added or removed. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                    "meta:xdmType": "date-time",
                    "meta:xdmField": "repo:lastModifiedDate"
                }
            }
        },
        "identities": {
            "title": "All User Identities",
            "type": "array",
            "minItems": 1,
            "description": "Array of Identities. Condensed, normalized encapsulation of all end user identifiers.",
            "meta:xdmType": "array",
            "items": {
                "created": 1529354713067,
                "updated": 1529354713067,
                "type": "object",
                "properties": {
                    "_id": {
                        "title": "Identifier",
                        "type": "string",
                        "format": "uri",
                        "description": "Identity of the consumer in the related namespace.",
                        "meta:xdmType": "string",
                        "meta:xdmField": "@id"
                    },
                    "namespace": {
                        "title": "Namespace",
                        "description": "The namespace associated with the `xid` attribute and matched up with the AAM data source integration code.",
                        "meta:xdmField": "xdm:namespace",
                        "created": 1529354713078,
                        "updated": 1529354713078,
                        "type": "object",
                        "properties": {
                            "code": {
                                "title": "Code",
                                "type": "string",
                                "description": "The code is a human readable identifier for the namespace and can be used to request the technical namespace id which is used for identity graph processing.",
                                "meta:xdmType": "string",
                                "meta:xdmField": "xdm:code"
                            }
                        },
                        "required": [
                            "code"
                        ],
                        "schema": "http://json-schema.org/draft-06/schema#",
                        "xdmVersion": "0.9.9.2",
                        "_refId": "context/namespace"
                    },
                    "xid": {
                        "title": "Experience Identifier",
                        "type": "string",
                        "description": "When present, this value represents a cross-namespace identifier that is unique across all namespace-scoped identifiers in all namespaces.",
                        "meta:xdmType": "string",
                        "meta:xdmField": "xdm:xid"
                    },
                    "primary": {
                        "title": "Primary",
                        "type": "boolean",
                        "default": false,
                        "description": "Indicates this identity is the preferred identity. Is used as a hint to help systems better organize how identities are queried.",
                        "meta:xdmType": "boolean",
                        "meta:xdmField": "xdm:primary"
                    }
                },
                "_refId": "context/identity"
            },
            "meta:xdmField": "xdm:identities"
        },
        "person": {
            "title": "Person",
            "description": "An individual actor, contact, or owner.\n",
            "meta:xdmField": "xdm:person",
            "created": 1529354713112,
            "updated": 1529354713112,
            "type": "object",
            "properties": {
                "name": {
                    "title": "Full name",
                    "description": "The person's full name",
                    "meta:xdmField": "xdm:name",
                    "created": 1529354713101,
                    "updated": 1529354713101,
                    "type": "object",
                    "properties": {
                        "firstName": {
                            "title": "First name",
                            "type": "string",
                            "description": "The first segment of the name in the writing order most commonly accepted in the language of the name. In many cultures this is the preferred personal or given name.\n\nThe `firstName` and `lastName` properties have been introduced to maintain compatibility with existing systems that model names in a simplified, non-semantic, and non-internationalizable way. Using `xdm:fullName` is always preferable.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "xdm:firstName"
                        },
                        "lastName": {
                            "title": "Last name",
                            "type": "string",
                            "description": "The last segment of the name in the writing order most commonly accepted in the language of the name. In many cultures this is the inherited family name, surname, patronymic, or matronymic name.\n\nThe `firstName` and `lastName` properties have been introduced to maintain compatibility with existing systems that model names in a simplified, non-semantic, and non-internationalizable way. Using `xdm:fullName` is always preferable.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "xdm:lastName"
                        },
                        "middleName": {
                            "title": "Middle name",
                            "type": "string",
                            "description": "Middle, alternative, or additional names supplied between the first name and last name.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "xdm:middleName"
                        },
                        "courtesyTitle": {
                            "title": "Courtesy title",
                            "type": "string",
                            "description": "Normally an abbreviation of a persons *title*, *honorific*, or *salutation*.\nThe `courtesyTitle` is used in front of full or last name in opening texts.\ne.g Mr. Miss. or Dr J. Smith.\n",
                            "meta:xdmType": "string",
                            "meta:xdmField": "xdm:courtesyTitle"
                        },
                        "fullName": {
                            "title": "Full name",
                            "type": "string",
                            "description": "The full name of the person, in writing order most commonly accepted in the language of the name.",
                            "meta:xdmType": "string",
                            "meta:xdmField": "xdm:fullName"
                        }
                    },
                    "_refId": "context/person-name"
                },
                "birthDay": {
                    "title": "Birth day",
                    "type": "integer",
                    "description": "The day of the month a person was born (1-31).",
                    "minimum": 1,
                    "maximum": 31,
                    "meta:xdmType": "byte",
                    "meta:xdmField": "xdm:birthDay"
                },
                "birthMonth": {
                    "title": "Birth month",
                    "type": "integer",
                    "description": "The month of the year a person was born (1-12).",
                    "minimum": 1,
                    "maximum": 12,
                    "meta:xdmType": "byte",
                    "meta:xdmField": "xdm:birthMonth"
                },
                "birthYear": {
                    "title": "Birth year",
                    "type": "integer",
                    "description": "The year a person was born including the century (yyyy, e.g 1983).",
                    "minimum": 1,
                    "maximum": 32767,
                    "meta:xdmType": "short",
                    "meta:xdmField": "xdm:birthYear"
                },
                "gender": {
                    "title": "Gender",
                    "type": "string",
                    "enum": [
                        "male",
                        "female",
                        "not_specified",
                        "non_specific"
                    ],
                    "meta:enum": {
                        "male": "Male",
                        "female": "Female",
                        "not_specified": "Not Specified",
                        "non_specific": "Nonspecific"
                    },
                    "description": "Gender identity of the person.\n",
                    "default": "not_specified",
                    "meta:xdmType": "string",
                    "meta:xdmField": "xdm:gender"
                },
                "repositoryCreatedBy": {
                    "title": "Created by User Identifier",
                    "type": "string",
                    "description": "User id who has created the entity.\n",
                    "meta:xdmType": "string",
                    "meta:xdmField": "xdm:repositoryCreatedBy"
                },
                "repositoryLastModifiedBy": {
                    "title": "Modified by User Identifier",
                    "type": "string",
                    "description": "User id who last modified the entity.\nAt creation time, `modifiedByUser` is set as `createdByUser`.\n",
                    "meta:xdmType": "string",
                    "meta:xdmField": "xdm:repositoryLastModifiedBy"
                },
                "createdByBatchID": {
                    "title": "Created by Batch Identifier",
                    "type": "string",
                    "format": "uri",
                    "description": "The Data Set Files in Catalog Services which has been originating the creation of the entity.\n",
                    "meta:xdmType": "string",
                    "meta:xdmField": "xdm:createdByBatchID"
                },
                "modifiedByBatchID": {
                    "title": "Modified by Batch Identifier",
                    "type": "string",
                    "format": "uri",
                    "description": "The last Data Set Files in Catalog Services which has modified the entity.\nAt creation time, `modifiedByBatchID` is set as `createdByBatchID`.\n",
                    "meta:xdmType": "string",
                    "meta:xdmField": "xdm:modifiedByBatchID"
                },
                "_repo": {
                    "type": "object",
                    "properties": {
                        "createDate": {
                            "type": "string",
                            "format": "date-time",
                            "examples": [
                                "2004-10-23T12:00:00-06:00"
                            ],
                            "description": "The server date and time when the resource was created in the repository, such as when an asset file is first uploaded or a directory is created by the server as the parent of a new asset. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                            "meta:xdmType": "date-time",
                            "meta:xdmField": "repo:createDate"
                        },
                        "lastModifiedDate": {
                            "type": "string",
                            "format": "date-time",
                            "examples": [
                                "2004-10-23T12:00:00-06:00"
                            ],
                            "description": "The server date and time when the resource was most recently modified in the repository, such as when a new version of an asset is uploaded or a directory's child resource is added or removed. The Date Time property should conform to ISO 8601 standard. An example form is \"2004-10-23T12:00:00-06:00\".",
                            "meta:xdmType": "date-time",
                            "meta:xdmField": "repo:lastModifiedDate"
                        }
                    }
                }
            },
            "meta:extends": [
                "external/repo/commmon"
            ],
            "_refId": "context/person"
        }
    }
}
```

##### Important notes and attributes of the registry schema
The schema represents the full **potential target schema** of the dataset and in some cases may have thousands of potential nested fields. This is the schema that the ingestion process
will validate incoming data against. Each field has a "meta:xdmType" attribute which describes the the data type
that is intended for that field. Because the base schemas is defined using JSON schema, the field level "type", "format", "minimum", "maximum" attribute(s) describes what you would
use if sending JSON data. If using a serialization format other then JSON for ingestion, you should use data types that match the
meta:xdmType as described in **Section 4** of the [XDM Registry Overview Guide](https://www.adobe.io/apis/cloudplatform/dataservices/services/allservices.html#!api-specification/markdown/narrative/technical_overview/xdm_registry_architectural_overview/xdm_registry_architectural_overview.md).

### Data Access
Provides users the interface to access their data on the platform.

#### Access a single sample file from a a dataset

##### Sample request to list files associated with a dataset - refer to the 'files' attribute of a dataset

```shell
curl -X GET \
"https://platform.adobe.io/data/foundation/catalog/dataSets/59c93f3da7d0c00000798f68/views/59c93f3da7d0c00000798f69/files" \
    -H "accept: application/json" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization: Bearer ACCESS_TOKEN \
    -H "x-api-key : API_KEY"

```
##### Sample response
```json
{
    "74627653-6b6f-40a8-ad57-6bd1badfb9c6": {
        "version": "1.0.0",
        "batchId": "b026a233c9ad4ccd88f661efa63d4955",
        "created": 1509962578830,
        "updated": 1509962578830,
        "imsOrg": "AdobeIMSOrganization@AdobeOrg",
        "dataSetViewId": "5a0024512db5b501c6c3cd95",
        "createdClient": "CLIENT_ID",
        "createdUser": "CLIENT_USER_ID@AdobeID",
        "updatedUser": "CLIENT_USER_ID@AdobeID",
        "availableDates": {}
    },
}
```
-   The list of file ids will be used in **Data Access API** to fetch
    further file details. The file Key of JSON field will be used in
    this call:: "28146732-2af7-41c6-9d4a-95fb3334216b" in this case.

#### CURL to fetch file details
```shell
curl -X GET "https://platform.adobe.io/data/foundation/export/files/28146732-2af7-41c6-9d4a-95fb3334216b" \
    -H "accept: application/json" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization: Bearer ACCESS_TOKEN \
    -H "x-api-key : API_KEY"

```
##### Sample response
```json
[
    {
    "name": "webProfileSmall.csv",
    "length": 2576,
    "_links": {
        "self": {
            "href": "https://platform.adobe.io/data/foundation/export/files/28146732-2af7-41c6-9d4a-95fb3334216b?path=webProfileSmall.csv"
            }
        }
    }
]
```
-   "**href**" field from previous call will be used to fetch
        data from the **Data Access API**

```shell
curl -X GET \
"https://platform.adobe.io/data/foundation/export/files/28146732-2af7-41c6-9d4a-95fb3334216b?path=webProfileSmall.csv" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization: Bearer ACCESS_TOKEN" \
    -H "x-api-key : API_KEY"
```
##### Sample response
```
longitude,optin_email,optin_mobile,optin_address,username,created

1,Dan,Hutchinson,1971-08-14,female,dan12.hutchinson@hotmail.com,,85 Windsor Drive,CORVALLIS,OR,97331,USA,44.56,-123.27,true,false,false,dan.hutchinson,2017-03-31 02:16:22
2,Violat,Vaughan,1939-03-16,,violat.v901@yahoo.com,,,,,,,,,true,false,false,violat.vaughan,2017-03-31 19:47:00
3,Roberto,Savage,1996-08-15,female,roberto.savage82@yahoo.com,,,,,,,,,true,false,false,roberto.savage,2017-03-31 02:44:05
4,Orion,Weber,1990-04-17,male,orion.weber@planetone.tn,,192 Pine Street,STAPLETON,AL,36578,USA,30.74,-87.79,false,false,false,orion.weber,2017-03-31 06:51:54
5,Dorthary,Murphy,1950-03-27,female,dorthary0.murphy@outlook.com,122-742-4590,730 Hickory Lane,BROWNSTOWN,IN,47220,USA,38.88,-86.04,true,false,true,dorthary.murphy,2017-03-31 03:41:33
```

#### Access all the data from a given time period

##### CURL to fead data from a dataset
This will give you all batches between start time and end time, sorted by the order they were created.

```shell
curl -X GET \
"https://platform.adobe.io/data/foundation/catalog/batches?dataSet=<DATASETID>&createdAfter=START_TIMESTAMP&createdBefore=END_TIMESTAMP&sort=desc:created" \
    -H "accept: application/json" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization:Bearer ACCESS_TOKEN" \
    -H "x-api-key : API_KEY"
```

##### Sample response
```json
{
    "BATCHID1": {
        "imsOrg": "AdobeIMSOrganization@AdobeOrg",
        "created": 1519116010510,
        "createdClient": "xxxx",
        "createdUser": "xxxx",
        "updatedUser": "xxxx",
        "updated": 1519116010510,
        "status": "success",
        "version": "1.0.0",
        "availableDates": {},
        "relatedObjects": [
            {
                "type": "dataSet",
                "id": "DATASETID"
            }
        ]
    },
    "BATCHID2": {
        "..."
    }
}
```
Now take out dataset files belonging to these batches using below call

##### CURL request to get files out of a batch
```shell
curl -X GET https://platform.adobe.io/data/foundation/export/batches/BATCHID1/files \
    -H 'authorization: Bearer ACCESS_TOKEN' \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization:Bearer ACCESS_TOKEN" \
    -H "x-api-key : API_KEY"

```
##### Sample response
```json
{
    "data": [
        {
            "dataSetFileId": "DATASETFILEID1",
            "dataSetViewId": "DATASETVIEWID1",
            "version": "1.0.0",
            "created": "xxxx",
            "updated": "xxxx",
            "isValid": false,
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1"
                }
            }
        },
    {
            "dataSetFileId": "DATASETFILEID2",
            "dataSetViewId": "DATASETVIEWID1",
            "version": "1.0.0",
            "created": "xxxx",
            "updated": "xxxx",
            "isValid": false,
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/export/files/DATASETFILEID2"
                }
            }
        },
    :
    :
    ],
    "_page": {
        "limit": 100,
        "count": 1
    }
}
```
-   limit and count above helps in pagination on dataset files level.

Now we will iterate over individual file via _link.self.href

##### CURL to access file metadata
```shell
curl -X GET https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1 \
    -H 'authorization: Bearer ACCESS_TOKEN' \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization:Bearer ACCESS_TOKEN" \
    -H "x-api-key : API_KEY"
```
##### Sample response
```json
{
    "data": [
        {
            "name": "filename1.csv",
            "length": "93",
            "_links": {
                "self": {
                    "href": "https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1?path=filename1.csv"
                }
            }
        },
    :
    :
    ],
    "_page": {
        "limit": 100,
        "count": 1
    }
}
```
-   limit and count above helps in pagination on physical file level.

Now we will list content of file by using link under _links > self > href

#### CURL to access file content
```shell
curl -X GET https://platform.adobe.io/data/foundation/export/files/DATASETFILEID1?path=filename1.csv \
    -H 'authorization: Bearer ACCESS_TOKEN' \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization:Bearer ACCESS_TOKEN" \
    -H "x-api-key : API_KEY"
```
##### Sample Response
```shell
name,age,date,digit,gender,email,float,alpha
John Kumar,,,,male,johnk@email.com,,
Marry Gupta,,,,female,marryg@email.com,,
```


#### Data Ingestion
Pushes data to Adobe Experience Platform with Data Ingestion APIs.

#### Create a batch
```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches" \
    -H "accept: application/json" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization:Bearer ACCESS_TOKEN" \
    -H "x-api-key : API_KEY" \
    --data-binary '{"datasetId":"DATASETID"}'
```
##### Sample response
```json
{
    "BATCHID": {
        "id": "BATCHID",
        "status": "loading",
        "created": xxxx,
    "relatedObjects": [
            {
                "type": "dataSet",
                "id": "DATASETID"
            }
        ]
    }
}
```

#### Write to dataset
Multiple files can be posted in a batch until it is promoted.
```shell
curl -X PUT "https://platform.adobe.io/data/foundation/import/batches/BATCHID/datasets/DATASETID/files/filename.csv" \
    -H "accept: application/json" \
    -H "x-gw-ims-org-id:AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization:Bearer ACCESS_TOKEN" \
    -H "x-api-key: API_KEY" \
    -H "content-type: application/octet-stream" \
    -F file=@filename.parquet
```

Data in platform should be written in the form of parquet files.

##### Sample response
```json
{
   "BATCHID": {
      "name": "filename.parquet",
      "sizeInBytes": 281
   }
}
```

Data will first land on the Adobe Experience Platform staging location and then will be moved to final location after cataloging and validation. Batches will be marked as successful once all the data is moved to    permanent location.

#### CURL to mark batch upload complete
```shell
curl -X POST "https://platform.adobe.io/data/foundation/import/batches/BATCHID?action=COMPLETE" \
    -H "x-gw-ims-org-id: AdobeIMSOrganization@AdobeOrg" \
    -H "Authorization:Bearer ACCESS_TOKEN" \
    -H "x-api-key : API_KEY"
```

##### Sample response

```http
#Status 200 OK, with empty response
```
