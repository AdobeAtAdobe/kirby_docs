# Tutorial: Authenticating and accessing Adobe Experience Platform APIs

## Objective

This tutorial will cover the steps for gaining access to an Adobe Experience Platform developer account in order to make calls to Experience Platform APIs. The steps that will be explained in this tutorial are:

* [Create an Adobe ID](#a-registered-adobe-id-account)
* [Become a Developer and a User for an IMS Organization](#become-a-developer-and-a-user-for-an-ims-organization)
* [Login to Adobe IO Console](#login-to-adobe-io-console)
* [Creating a new Integration](#create-integration)
* [Authenticating](#authentication-for-each-session)
* [Calling a platform API](#testing-access-code)

---

## Authenticate to Make API Calls

To maintain the security of your applications and users, all requests to Adobe I/O APIs must be authenticated and authorized using standards such as OAuth and JSON Web Tokens (JWT). The JWT will then be used along with client specific information to generate your personal access token.

We will be going through the steps of authentication through the creation of an access token outlined in this flowchart:
![](how_to_authenticate_acp_for_api_flowchart.png)

## Prerequisites
* A registered Adobe ID account
* IMS Organization has access to Adobe Experience Platform
* Ask administrator to add you to be a **developer** and a **user** for a product.


### A registered Adobe ID account

If you don't have an Adobe ID yet, you can create one with the following steps:

1. Navigate to [Adobe Console](https://console.adobe.io)
2. Click on the *Get an Adobe ID* link
3. Complete the Sign up process


### Become a Developer and User for Experience Platform for an Organization

Detailed information about developer accounts on the Admin Console can be found in the [support document](https://helpx.adobe.com/enterprise/using/manage-developers.html) for managing developers.

Before creating integrations on Adobe I/O, your account must have developer permissions for a product in an IMS Organization. Contact an Admin Console administrator in your Organization to add you as a developer for one of your Organization's products via the [Admin Console](https://adminconsole.adobe.com/).

 ![](add_developer.png)

The administrator will have to assign you to at least one product profile to proceed.

 ![](add_developer2.png)

As a developer, you will be given access privileges to create integrations on [Adobe I/O](https://console.adobe.io/). These integrations are a pipeline from external apps and services to the Adobe API.

---

You will also need to ask your Admin Console administrator to add you to the product as a user. 

![](assign_user.png)

Similar to the process for adding a developer, the administrator will need to assign you to at least one product profile in order to proceed.

![](assign_user2.png)


## One Time Setup

The following steps will only need to be done once:

* Login to Adobe IO Console
* Create Integration
* Copy Down Access Values

Once your have your integration, and access values, you will be able to reuse them for authentication in the future. We will go over each step in detail below.

### Login to Adobe IO Console

Navigate to the [Adobe I/O Console](https://console.adobe.io/) and sign in with your Adobe ID.

You will be taken to the Integrations page. An *Integration* is a service account that is created for the selected IMS Organization (If you are associated with multiple Organizations, you can select the appropriate Organization from the drop-down). You will only be allowed to make calls for the IMS Organization in which the Integration is created.

### Create Integration

From the *Integrations* tab, we want to create a *New Integration*.

![](new_integration0.png)

You will then be prompted to *Access an API* or to *Receive near-real-time events*. We will be accessing APIs, so select *Access an API* and then *Continue*.

![](new_integration1.png)


If your account is associated with multiple organizations, the drop-down menu on the top right of the screen will allow you to easily switch between them. We are selecting *Workshop* and *Data Services* under *Experience Cloud* since we want to access the data services.

![](new_integration2.png)


After your Organization is selected there will be a new prompt at the top. We want a *New Integration*, so make sure that option is selected before clicking *Continue*


![](new_integration3.png)

Fill in your Integration Details. For the certificate section, you will need to generate a certificate:

---

**For MacOS & Linux platforms:**

Open terminal and execute below command:  

`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate_pub.crt`


**For Windows platforms:**

i) Download an openssl client to generate public certificates. For e.g. [Openssl windows client](https://bintray.com/vszakats/generic/download_file?file_path=openssl-1.1.1-win64-mingw.zip)

ii) Extract the folder and copy it to C:/libs/ location.

iii) Open Command Line Prompt and execute below commands.

`set OPENSSL_CONF=C:/libs/openssl-1.1.1-win64-mingw/openssl.cnf`

`cd C:/libs/openssl-1.1.1-win64-mingw/`

`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate_pub.crt`

---

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

> Note: `certificate_pub.crt` will expire in 365 days. You can make the period longer by changing the value of `days` in the `openssl` command above but rotating credentials periodically is a good security practice.

The `private.key` will be used to generate our JWT in the later section.

---

The `certificate_pub.crt` is used to create an API key. Go back to your Adobe IO Console and click on *Select a File* to upload your `certificate_pub.crt` file. Click *Create Integration* to finish up the process

![](new_integration4.png)


### Copy Down Access Values

After creating your integration, you will be able to view its details. Click on *Retrieve Client Secret* and your screen should look similar to this:

![](access_values.png)

Copy down the values for `{API KEY}`, `{IMS ORG}` which is the Organization ID, and `{CLIENT SECRET}` as these will be used in the next step.

---

## Authentication For Each Session

The end goal is to generate your `{ACCESS_TOKEN}` which will be used to authenticate your API calls. The access token is added into the Authorization header in every API call you make to Adobe Experience Platform.  This action will need to be done every-time the access token expires which is every 24 hours.

### Create JWT

While in your integration's detail page, navigate to the *JWT* tab. Your page should look similar to this:

![](jwt_empty.png)

We will now use the `private.key` we created in the previous section. View the contents of your `private.key` file:

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

### Generate Access Token

Finally, the last piece of information you will need to start making API calls is an access token. Your access token is the key used to authorize your API calls.

We can use `curl` to generate your access token. If you do not have `curl` installed, you can install it using `npm install curl`. You can read more about curl [here](https://curl.haxx.se/)

Once `curl` is installed, you will need to swap the fields in the following command with your own `{API_KEY}`, `{CLIENT_SECRET}`, and `{JWT_TOKEN}`.

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

Your access token is the value under the `access_token` key. Note this access token will expire in 86399947 milliseconds or 24 hours. You will have to generate a new access token by following the same steps above.

You are now ready to make API requests in Adobe Experience Platform!

### Testing Access Code

To test if your access token is valid, you can try to make the following API call. This call will list all resources (schemas, classes, mixins, or data types) within a container:

> **NOTE:** `{API_KEY}` and `{IMS_ORG}` refer to the values you generated above.

**Request**

```SHELL
curl -X GET https://platform.adobe.io/data/foundation/schemaregistry/global/classes \
  -H 'Accept: application/vnd.adobe.xed-id+json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```


If your response is similar to the one shown below, then your `access_token` is valid and working!

**Response**

```JSON
{
  "results": [
    {
        "title": "XDM ExperienceEvent",
        "$id": "https://ns.adobe.com/xdm/context/experienceevent",
        "meta:altId": "_xdm.context.experienceevent",
        "version": "1"
    },
    {
        "title": "XDM Profile",
        "$id": "https://ns.adobe.com/xdm/context/profile",
        "meta:altId": "_xdm.context.profile",
        "version": "1"
    }
  ]
}
```

### Using Postman for JWT Authentication and API calls

[Postman](https://www.getpostman.com/) is a popular tool to work with REST based APIs. This [Medium post](https://medium.com/adobetech/using-postman-for-jwt-authentication-on-adobe-i-o-7573428ffe7f) describes how you can setup postman to automatically perform JWT authentication and use it to consume Adobe Experience Platform APIs.
