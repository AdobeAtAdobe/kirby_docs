# Tutorial: Authenticating and accessing Adobe Cloud Platform APIs

## 1. Objective

This tutorial will cover the steps on how to gain access to making Adobe Cloud Platform API calls starting with creating your access token used to authenticate API calls. The steps that will be explained in this tutorial are:

* (optional) Create an AdobeID
* Grant access to the Organization and Adobe Cloud Platform using Adobe Admin Console
* Creating the required public and private certificates
* Logging into Adobe I/O Console
* Creating a new Integration
* Authenticating
* Calling a platform API

### 1.1. Audience
This document is written for users who need to understand Adobe Cloud Platform and have to integrate the platform with customer-owned or third party systems. Users include data engineers, data architects, data scientists, and app developers within Adobe I/O who will need to perform Adobe Cloud Platform API calls.

### 1.2. Version Information
*Version* : Beta

### 1.3. License Information
*Terms of service* : https://www.adobe.com/legal/terms.html


### 1.4. URI Scheme
*Host* : __platform.adobe.io__  
*BasePath* : __/data/foundation/import/__  
*Schemes* : __HTTPS__  

### 1.5. About the Docs
The HTML rendition of this documentation is kept up-to-date on a per commit basis and can therefore change without announcement. If you require a persistent version of the documentation, it is recommended that you seek out the PDF rendition.

---

## 2. Authenticate to Make API Calls

To maintain the security of your applications and users, all requests to Adobe I/O APIs must be authenticated and authorized using standards such as OAuth and JSON Web Tokens (JWT). The JWT will then be used along with client specific information to generate your personal access token.

We will be going through the steps of authentication through the creation of an access token outlined in this flowchart:
![](how_to_authenticate_acp_for_api_flowchart.png)

### 2.1. Prerequisites
* A registered Adobe ID account
* the Adobe ID account must have been added to an Organization with access to "Adobe Cloud Platform"
* Administrative Rights (System Administrator) for an IMS Organization


#### 2.1.1 A registered Adobe ID account

If you don't have an Adobe ID yet, you can create one with the following steps:

1. Navigate to [Adobe Console](https://console.adobe.io)
2. Click on the *Get an Adobe ID* link
3. Complete the Sign up process

#### 2.1.2 Administrative Rights for a IMS Organization

 Administrative rights can be granted to you by another administrator using [Adobe Admin Console UI](https://adminconsole.adobe.com/). You will need administrative rights to add yourself as a user to an IMS Organization.  You will also need admin rights to create an integration for Adobe Cloud Platform -  Data Services.

 ![](add_user_as_admin.png)

#### 2.1.3 User of an IMS Organization

Once as an administrator, you (or another Administrator)can add yourself to the Organization as a user:

1. Navigate to [Adobe AdminConsole UI](https://adminconsole.adobe.com/)
2. Click on *Assign Users* for the IMS Organization you wish to join
![](assign_user.png)
3. Enter the email assigned to your Adobe ID
4. Select the profiles you want assigned to your account
5. Press *Save* Button to finish

### 2.2. One Time Setup

The following steps will only need to be done once:

* Create Certificate
* Log into adobe.io Dev Portal
* Create Integration
* Copy Down Access Values


Once your have your certificate, integration, and access values, you will be able to reuse them in future authentications. We will go over each step in detail below.

#### 2.2.1. Create Certificate

We will be creating a self-signed certificate and private key using terminal on MacOS with the built-in-command-line tool `openssl`. The same commands work also using Cygwin for Windows users and Linux.

```SHELL
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 \
-keyout private.key \
-out certificate_pub.crt
```

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
After entering the information two files will be generated: `certificate_put.crt` and `private.key`.

Note `certificate_put.crt` will expire in 365 days. You can make the period longer by changing the value of `days` in the `openssl` command above but rotating credentials periodically is a good security practice.

The `certificate_pub.crt` certificate will later be uploaded to the Adobe IO Console for when you create an API key for access to any Adobe I/O API.

Your private key file named `private.key` will be used later to sign your JWT token.

#### 2.2.2. Log into adobe.io Developer Portal: console.adobe.io

Navigate to the [Adobe I/O Console](https://console.adobe.io/) and sign in with your Adobe ID.  

#### 2.2.3. Create Integration

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

#### 2.2.4. Copy Down Access Values

After creating your integration, you will be able to view the details of your integration. After clicking on *Retrieve client Secret* your screen should look similar to this.

![](access_values.png)

Copy down the values for `{API KEY}`, `{IMS ORG}` which is the Organization ID, and `{CLIENT SECRET}` as these will be used in the next step.

### 2.3. Authentication For Each Session

The end goal is to generate your `{ACCESS_TOKEN}` which will be used to authenticate your API calls. The access token is added into the authorization header in every API call you make to Adobe Cloud Platform.  This action will need to be done every-time the access token expires which is every 24 hours.

#### 2.3.1. Create JWT

While in your integration's detail page, navigate to the *JWT* tab. Your page should look similar to this.

![](jwt_empty.png)

View the contents of your `private.key` file that we generated previously using a text editor or terminal

```
$ cat private.key
```

Your output will look something like this:

```
$ cat private.key
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

#### 2.3.2. Generate Access Token

Finally, the last piece of information you will need to start making API calls is generating an access token. Your access token is the key used to authorize your API calls.

We can use `curl` to generate your access token. If you do not have `curl` installed, you can install it using `npm install curl`. You can read more about curl [here](https://curl.haxx.se/)

Once `curl` is installed, you will need to swap the fields in the following command with your own {API_KEY}, {CLIENT_SECRET}, and {JWT_TOKEN}.

```SHELL
curl -X POST \ "https://ims-na1.adobelogin.com/ims/exchange/jwt/" \
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

You are now ready to make API requests in Adobe Cloud Platform!

#### 2.3.3. Testing Access Code

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
