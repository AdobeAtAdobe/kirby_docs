# Adobe Advertising Cloud Support for the General Data Protection Regulation

*For Adobe Advertising Cloud Search, Adobe Advertising Cloud Creative, Adobe Advertising Cloud DSP, and Legacy Adobe Media Optimizer DCO*

The [General Data Protection Regulation](https://gdpr-info.eu) (GDPR), a law in effect May 25, 2018, gives all individuals (data subjects) within the borders of the European Union (EU) control of their personal data and simplifies the regulatory environment for international business. This law applies to all businesses (data controllers) that offer goods or services to, monitor the behavior of, and collect personal data from individuals within the borders of the EU at the time their personal data is processed, regardless of the Data Controller's business location. For more information about what GDPR means for you, see [GDPR and Your Business](https://www.adobe.com/privacy/general-data-protection-regulation.html).
    

## Supported Data Request Types for Advertising Cloud

As a data controller, you will determine the personal data that Adobe Experience Cloud processes and stores on your behalf. Adobe Experience Cloud provides the ability for data controllers to complete the following tasks:

*   Access a data subject's cookie-level data or device ID-level data (for ads in mobile apps) within Advertising Cloud Search, Advertising Cloud Creative, Advertising Cloud DSP (Demand Side Platform), or legacy Media Optimizer DCO.
    
*   Delete cookie-level data stored within Search, Creative, DSP, or DCO for data subjects using a browser; or delete ID-level data stored within DSP for data subjects using apps on mobile devices.
    
*   Check the status of one or all existing requests.
    

> **Note:**  If your company has multiple Adobe Experience Cloud Identity Management Service Organization IDs (IMS Org IDs), then you must send separate API requests for each. You can, however make one API request to multiple Advertising Cloud sub-solutions (Search, Creative, DSP, and DCO), with one account per sub-solution.

## Required Setup to Send Requests for Advertising Cloud

To make automated requests to access and delete data for Advertising Cloud, you'll need to:

1.  Deploy a lightweight JavaScript library to retrieve and remove data subject cookies. The same library, AdobePrivacy.js, is used for all Adobe Experience Cloud solutions.
    
    **Important:**  Requests to some Adobe Experience Cloud solutions don't require the JavaScript library, but requests to Advertising Cloud require it.
    
    You should deploy the library on the web page from which data subjects can submit access and delete requests, such as your company's privacy portal. The library helps you retrieve Adobe cookies (namespace ID: gsurferID) so that you can submit these identities as part of access and delete requests via the Adobe Experience Platform Privacy Service API.
    
    When the data subject asks to delete personal data, the library also deletes the data subject's cookie from the data subject's browser.
    
    > **Note:**  Deleting personal data is different than Opt-Out, which stops the targeting of an end user with audience segments. However, when a data subject asks to delete personal data from Creative, DSP, or DCO, the library also sends a request to Advertising Cloud to opt out the data subject from segment targeting.  For advertisers with Search, we recommend that you provide your data subjects a link to [https://www.adobe.com/privacy/opt-out.html](https://www.adobe.com/privacy/opt-out.html), which explains how to opt out of audience segment targeting.
    
2.  Use either the Privacy Service API (for automated requests) or the Privacy Service UI (for ad-hoc requests) to submit access and delete requests to Advertising Cloud on behalf of your data subjects, and to check the status of existing requests.
    
    For advertisers who have a mobile app to interact with customers and launch campaigns with the DSP, you'll need to download the GDPR-ready Mobile SDKs for Experience Cloud. The Mobile SDKs allow data controllers to set opt-out status flags, retrieve the data subject's device ID (namespace ID: deviceID), and submit requests to the Privacy Service API. Your mobile app will require an SDK Version 4.15.0 or greater.
    
    When you submit an access request, the API returns a data subject's information based on the specified cookie or device ID, which you then must return to the data subject.
    
    When you submit a delete request, the cookie ID or device ID and all cost, click, and revenue data associated with the cookie are deleted from the server.


All of these steps are necessary for Advertising Cloud. For more information about these and other related tasks you need to perform, and
where to find the items you'll need, see [www.adobe.io/apis/cloudplatform/gdpr.html](www.adobe.io/apis/cloudplatform/gdpr.html).

## Required IDs to Send Requests for Advertising Cloud

Before you can prepare to submit requests, you will need the following IDs:

1.  Your IMS Org ID.
    
    This ID is a 24-character alphanumeric string appended with @AdobeOrg.
    
    Most Adobe Experience Cloud customers have been assigned an IMS Org ID. If your marketing team or internal Adobe system administrator doesn't know your organization's IMS Org ID, or isn't sure if it's been provisioned, contact Adobe Customer Care at gdprsupport@adobe.com.
    
    If your organization has more than one IMS Org ID, then you will need to submit separate GDPR API requests for each.
    
2.  One of the following legacy solution-specific IDs:
    
    Important:  Requests to most Adobe Experience Cloud solutions don't require a legacy ID, but requests to Advertising Cloud must include a legacy ID.
    
    *   (Search and DCO) Your user ID.
        
        For DCO accounts, contact the DCO services team (GRP-AdobeDCO@adobe.com) for your user ID.
        
        For Search accounts, contact your search marketing team and ask them to provide each of the unique user names they use to log in to the Search platform (https://enterprise.efrontier.com for US companies or https://enterprise-intl.efrontier.com for non-US companies). Then submit a request to Adobe Customer Care at gdprsupport@adobe.com with the following information:
        
        *Subject:* GDPR- Adobe Legacy Product ID Request
        
        *Message Body:*  Include the following information for each Advertising Cloud sub-solution for which you need IDs:  the sub-solution name (Search), the number of unique accounts, and each user name associated with each account.
        
    *   (DSP and Creative) Your Account ID.
        
        Contact your programmatic display or video marketing team and ask them to provide the number of unique DSP or Creative accounts on https://www.tubemogul.com/auth/login/ and an email address associated with each of those accounts. If your programmatic marketing team says that an external media agency is executing campaigns on their behalf, then collect both the agency's email address for the account and all of the advertiser names associated with your brand's campaigns. Once you have this information, submit a request to Adobe Customer Care at gdprsupport@adobe.com with the following information:
        
        *Subject:* GDPR- Adobe Legacy Product ID Request
        
       *Message Body:*  Include the following information for each Advertising Cloud sub-solution for which you need IDs:  the sub-solution name (Creative or DSP), the number of unique accounts, and each user name or email associated with each account. If your programmatic marketing team is working with a media agency, then include the advertiser names as well.


If you a data controller that uses more than one Advertising Cloud sub-solution, you can submit one request to Adobe Customer Care at with all required information, as long as you send the request for only one account per sub-solution.

## Example Responses from Adobe Customer Care

### Example 1:  The Data Controller is the end user for all Advertising Cloud solutions

| Solution | # of Unique Accounts | User Name or Email  | Advertiser Name | ID Value for API (namespace ID: AdCloud) |
| -------- | -------------------- | ------------------- | --------------- | ---------------------------------------- |
| DSP      | 2                    | mike_uk@brandx.com  | N/A             | acctId:A1G4BDSKW920                      |
|          |                      | erica_us@brandx.com | N/A             | acctId:JS2MSI5S6DFLJS                    |
| Search   | 1                    | brand_x             | N/A             | amoId:FMSIG5SIW5MB                       |

### Example 2:  The Data Controller is the end user for some Advertising Cloud solutions, but your media agency executes DSP campaigns

| Solution | # of Unique Accounts | User Name or Email  | Advertiser Name | ID Value for API (namespace ID: AdCloud) |
| -------- | -------------------- | ------------------- | --------------- | ---------------------------------------- |
| DSP      | 1                    | ana@agencyx.com     | Brand x         | advId:GD1BYRS2SB0df8S                    |
| Search   | 1                    | brand_y             | N/A             | amoId:WR169BSB961SDF                     |

## Example API Access Requests with Legacy Product IDS

In access requests, you'll use the required IDs as the values for the namespace "AdCloud."  The format of the value is determined by the sub-solution:

*   A prefix of "amoId:" indicates a User ID for a Search or DCO account owned by your company.
    
*   A prefix of "acctId:" indicates an Account ID for a DSP or Creative account owned by your company.
    
*   A prefix of "advId:" indicates an Advertiser ID for DSP or Creative campaigns executed by your media agency on your behalf.
    

See the API documentation for more information about where to add these fields.

### Example 1: User ID for Search or DCO

```
{

"companyContexts": \[{

"namespace": "imsOrgID",

"value": "123456789@AdobeOrg"

},

{

"namespace": "AdCloud",

"value": "**amoId:GDK2KOJBI28DS9**"

},
```

### Example 2: Account ID for DSP or Creative

```
{

"companyContexts": \[{

"namespace": "imsOrgID",

"value": "123456789@AdobeOrg"

},

{

"namespace": "AdCloud",

"value": "**acctId:GI1K2DSIBH83S**�

},
```

### Example 3: Advertiser ID for DSP or Creative when an agency is running campaigns on your behalf

```
{

"companyContexts": \[{

"namespace": "imsOrgID",

"value": "123456789@AdobeOrg"

},

{

"namespace": "AdCloud",

"value": "**advId:UB3B0SWEIB8SDB**"

},
```

### Example 4: Combined solution request with 1 account per sub-solution

> **Note:**  If you have multiple accounts per sub-solution, you will need to submit these requests separately.

```
{

"companyContexts": \[{

"namespace": "imsOrgID",

"value": "123456789@AdobeOrg"

},

{

"namespace": "AdCloud",

"value": "**acctId:GI1K2DSIBH83S**"

"value": "**advId:UB3B0SWEIB8SDB**"

"value": "**amoId:GDK2KOJBI28DS9**"

},

   "action":"access",

   "product":"adCloud",

   "status":"complete",

   "results":{

      "userIDs":\[

         {

            "namespace":"gsurferID",

            "userID":"32dfh45233h523ueys52"

         }

      \],

      "receiptData":{

         "impressionCount":"100",

         "clickCount":5,

         "geo":\[

            "United States of America",

            "San Francisco CA"

         \],

         "profile":\[

            {

               "pixelid":"111",

               "ut1":"abc",

               "ut2":"def",

               "ut3":"ghi",

               "ut4":"jkl",

               "ut5":"mno"

            },

            {

               "pixelid":"123",

               "ut1":"abc",

               "ut2":"def",

               "ut3":"ghi",

               "ut4":"jkl",

               "ut5":"mno"

            }

         \],

         "matchingSegments":\[

            {

               "segmentName":"AP4 - Art/Culture - In-Market",

               "segmentID":"kV1mPa2aqPNWKSNtf325",

               "serviceProvider":"Adobe"

            },

            {

               "segmentName":"EMEA - UK - Health Food Buyers",

               "segmentID":"eP2oJ2UPsfsDVDhvlGewx",

               "serviceProvider":"BlueKai"

            }

         \]

      }

   }

}
```

## Data Fields That Are Returned for Access Requests

The following is an example of an access response that includes all Advertising Cloud sub-solutions.

```
{

   "jobId":"12345AD43E",

   "action":"access",

   "product":"adCloud",

   "status":"complete",

   "results":{

      "userIDs":\[

         {

            "namespace":"gsurferID",

            "userID":"32dfh45233h523ueys52"

         }

      \],

      "receiptData":{

         "impressionCount":"100",

         "clickCount":5,

         "geo":\[

            "United States of America",

            "San Francisco CA"

         \],

         "profile":\[

            {

               "pixelid":"111",

               "ut1":"abc",

               "ut2":"def",

               "ut3":"ghi",

               "ut4":"jkl",

               "ut5":"mno"

            },

            {

               "pixelid":"123",

               "ut1":"abc",

               "ut2":"def",

               "ut3":"ghi",

               "ut4":"jkl",

               "ut5":"mno"

            }

         \],

         "matchingSegments":\[

            {

               "segmentName":"AP4 - Art/Culture - In-Market",

               "segmentID":"kV1mPa2aqPNWKSNtf325",

               "serviceProvider":"Adobe"

            },

            {

               "segmentName":"EMEA - UK - Health Food Buyers",

               "segmentID":"eP2oJ2UPsfsDVDhvlGewx",

               "serviceProvider":"BlueKai"

            }

         \]

      }

   }

}
```