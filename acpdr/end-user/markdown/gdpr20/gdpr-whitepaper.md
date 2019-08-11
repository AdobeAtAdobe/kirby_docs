# Adobe Experience Cloud and GDPR

Implementing Adobe Experience Platform GDPR Service for streamlined GDPR requests\*

**March 22, 2018**

## Content

- About GDPR and why it matters
- Adobe and data governance
- Roles and responsibilities: How Adobe supports brands&#39; GDPR compliance
- Key steps to GDPR readiness
- Adobe Experience Platform GDPR Service: How it works
  - Preparing to send a GDPR request to Adobe Experience Cloud
  - Submit data requests via Adobe Experience Platform GDPR Service
- Example workflow: Submitting GDPR requests to Adobe Experience Cloud

## Introduction

The way we look at it, data privacy is a key part of how brands create and sustain consumer trust. With GDPR becoming effective on May 25, 2018, consider it an opportunity to “lean in” to what Adobe Experience Cloud is all about – customer centricity and advancing the customer experience. Now is the time to reevaluate customer experience and customer journey best practices as they relate to data collection, transparency and consumer choice. In addition, preparing for GDPR and designing systems and policies with privacy in mind today is a smart investment in your brand’s future – a necessity for global brands as well as any organizations that engage in digital marketing, particularly in highly regulated industries.

Adobe Experience Cloud&#39;s role as one of your GDPR data processors is to assist you in managing consumer data from across Adobe Experience Cloud Solutions to meet GDPR obligations. Adobe Experience Cloud already has a strong foundation of certified security controls and privacy by design. In addition, Adobe Experience Cloud has made enhancements to its products to support GDPR readiness, including developing an API for submitting GDPR processing requests to Adobe Experience Cloud. A key benefit of this Platform GDPR Service is that it enables brands to scale their response by handling potential high volumes of consumer information requests.

* Disclaimer: This whitepaper is intended to provide general information and guidance and does not represent legal counsel. Seek the advice of your legal counsel for meeting the requirements in the regions where you operate.

This whitepaper will provide you with a brief overview of key GDPR principles important to data collection practices, suggest key steps to GDPR readiness, and set out the roles and responsibilities of brands that use Adobe Experience Cloud. In addition, you will find the technical documentation you need to implement the API in order to submit GDPR data requests to Adobe Experience Cloud.

 ![Shared Compliance Journey](images/shared-compliance-journey.png)

**Adobe Experience Cloud Solutions supported by Platform GDPR Service**

These are the Solutions that interface with Platform GDPR Service. For customers using other versions of Adobe Experience Cloud Solutions (see notes below), please consult product documentation for information on GDPR readiness.

- Analytics Cloud
  - Adobe Analytics
  - Adobe Audience Manager
- Advertising Cloud
  - Adobe Media Optimizer
- Marketing Cloud
  - Adobe Campaign\*
  - Adobe Experience Manager\*\*
  - Adobe Social
  - Adobe Target
- Platform Services

\* *Refer to product-specific documentation to ensure that your version of Campaign interfaces with Platform GDPR Service and to learn about tools or documentation for managing GDPR requests on those versions of Campaign that do not interface with Platform GDPR Service.*

\*\* *AEM instances and the applications that run on them are owned and operated by our customers; i.e., AEM customers function as both Data Processor and Data Controller. AEM will provide documentation and procedures for the customer privacy admin/customer AEM Admin to execute the GDPR requests manually or through APIs when available. Documentation will be provided for all impacted AEM Areas: AEM Sites, Forms, Communities, and Platform.*

## About GDPR and Why It Matters

The General Data Protection Regulation (GDPR) is the European Union&#39;s new privacy law that harmonizes and modernizes data protection requirements. The new rule has a broad definition of personal data and a wide reach, affecting any brand that markets products or services to individuals in the EU. GDPR goes into effect on May 25, 2018.

One of GDPR&#39;s key requirements is enabling consumers&#39; rights regarding personal data that a brand may have collected, including the rights to access and deletion.

There are four principles of GDPR that brands should consider as they review data collection practices related to Adobe Experience Cloud:

1. **Focus on collecting only the data you need:** To become GDPR ready, it&#39;s important for brands to take stock of the data being collected, and not collect more data than necessary.
2. **Obtain appropriate consent:** GDPR is a good opportunity for brands to re-consider consent management strategy and practices. Under GDPR (and the related ePrivacy requirements), consent must be unambiguous and there must be a clear affirmative action by the site or app visitor. Consent also must be presented separately, easily understood and distinguishable from other content.
3. **Remove personal identifiers where possible:** Brands should consider the role for privacy-enhancing techniques like data hashing, data obfuscation or data anonymization. Doing this will help minimize compliance obligations.
4. **Honor data access and delete requests:** Consumers have certain rights related to the personal data brands collect and maintain about them, including the rights to access or deletion. To prepare to respond to these requests, brands should set data retention policies with their Processors, such as Adobe Experience Cloud. Applying appropriate, secure, and timely retention policies is an important part of GDPR readiness. Not only will this help address requirements related to not keeping data longer than necessary, but it will also assist in reducing the processing times associated with individual rights requests (e.g., consumer rights to access and delete personal data).

**What is personal data?**

According to GDPR, &quot;personal data&quot; is any information relating to an identified or identifiable natural person (&quot;data subject&quot;). An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that person.

## Adobe and Data Governance

To back up a moment, before diving into Adobe Experience Platform GDPR Service, it is worth stating that a key step in GDPR readiness is having a robust data governance framework to help address data protection and privacy.

Adobe Experience Platform provides an integrated solution that connects a brand&#39;s data governance infrastructure with the tools it uses to create and manage consumer experiences. The data governance features of Adobe Experience Platform enable the direct linkage of data governance policy to data usage. Adobe Experience Platform, as a data and intelligence platform that enables all of Adobe&#39;s marketing and consumer experience solutions in Adobe Experience Cloud, centralizes the collection and storage of all consumer experience-related data and offers data governance actors (e.g., stewards, scientists, engineers, marketers) the features they need to help define and enforce data governance rules that activate that data for the Experience Business. For more information about ACP data governance features, see the Adobe Experience Platform Data Governance whitepaper.

**What is data governance?**

Data governance is having a system in place consisting of the people and digital tools required to exercise authority, control and shared decision-making. It means creating a team to control data governance and giving that team the tools they need to govern data effectively and efficiently in real time. It encompasses both the strategies and the technologies required to ensure data and its use complies with the regulations, restrictions, and policies governing that use: data catalogs, data lineage, data usage labeling, data access policies, and more.

## Roles and responsibilities: How Adobe Experience Cloud supports brands&#39; GDPR readiness

GDPR sets out the obligations for the various parties involved with GDPR readiness. The obligation to meet the GDPR principles regarding data collection (see p.2) falls upon brands, also known as Data Controllers. However, the journey to GDPR readiness is in part shared between Data Controllers (brands), and technology vendors or Data Processors like Adobe Experience Cloud. There are three parties to become familiar with. Each of these parties is defined below within the context of Adobe Experience Cloud.

| GDPR Term | Definition |
| --- | --- |
| Data Subjects | Adobe Experience Cloud&#39;s customers&#39; consumers |
| Data Controllers | Adobe Experience Cloud&#39;s customers |
| Data Processor | Adobe Experience Cloud |

Adobe Experience Cloud&#39;s role is to help our customers (Data Controllers) respond to requests from their consumers (Data Subjects) when it comes to individual rights requests (e.g., access or delete requests) related to data maintained in Adobe Experience Cloud.

![GDPR Responsibilities](images/gdpr-responsibilities.png)

**You are the Data Controller.** As the Controller, you determine the personal data Adobe Experience Cloud will process and store on your behalf. If you use Adobe Cloud Solutions, we may process personal data for you depending on the products and solutions you use and the information you choose to send to your Adobe account or service. As a Controller, you will provide privacy notices to individuals who engage with your brands detailing how you collect and use information, and obtain consents, if needed. If those individuals want to know what data you maintain about them or decide they want to discontinue their relationship with you, you will respond to those requests. You also are responsible for updating your brand&#39;s data governance, privacy and security policies and procedures.

**We are the Data Processor.** When Adobe Experience Cloud provides software and services to a brand, we&#39;re acting as a Processor for the personal data you ask us to process and store as part of providing the services to you. As a Processor, we only process personal data in accordance with your brand&#39;s permission and instructions — for example, as set out in your agreement with us. Where your data is in one of Adobe&#39;s Cloud Solutions and you need our assistance with any individual consumer requests, we will partner with you through processes, products, services, and tools to help you respond.

## Key Steps to GDPR Readiness

Although every brand will determine its own GDPR preparation strategy, we suggest that brands assess their GDPR readiness by thinking through five key steps. These include:

1. Inventory your digital properties, including mobile apps and websites, to assess which cookies, tags, or other data are necessary.
2. Map your customer journey and tell your privacy story through meaningful notices and choices.
3. Develop a consent management strategy with an eye toward customer experience.
4. Think about how you will authenticate user identity to address Data Subject access requests.
5. Identify or capitalize on existing processes to help respond to Data Subject access requests, including appointing a privacy point of contact.

GDPR puts increased emphasis on data collection best practices, transparency from Data Controllers, and consumer choice — all of which play a meaningful role in the customer journey. Some key considerations include:

| **Topic** | **Questions to Ask**   |
| --- | --- |
| Data minimization | What data do I need and not need to collect for my marketing efforts to be effective? |
| Consent/opt-in | How do I provide delightful customer experiences with consent and without unwanted surprises? Consider the value proposition for consumer privacy, which will drive conversion and loyalty. |
| Required levels of notice and/or consent | Is notice enough? Is there another legal basis for certain data processing activities (e.g., product development and enhancements), such as legitimate interest, where you wouldn&#39;t need consent?   |
| Anonymization and pseudonymization of data | How will we anonymize or pseudonymize personal data? Pseudonymizing data (i.e., replacing personal details with another unique identifier, typically generated through some kind of hashing, encryption or tokenization function) will minimize the risk of data and privacy breaches and claims. For example, &quot;John Smith bought product X&quot; could be pseudonymized to &quot;Visitor 15436 bought product X.&quot; |

_Tip: Operate from the presumption that under the wide definition personal data much of the data you have is not anonymous (unless you take special privacy-enhancing measures). Think about a sliding scale based on the sensitivity of the data, which guides a risk-based approach._

## Adobe Experience Platform GDPR Service: How it works

Adobe Experience Platform GDPR Service automates consumer GDPR `access` and `delete` requests across Adobe platform components. Overall, the process consists of three steps:

1. In advance of GDPR and as part of good data hygiene, the Controller should curate and label data in Adobe Experience Cloud Solutions
2. Upon request of a consumer/Data Subject and to learn what data the brand has or to delete their data, the Controller collects identities from the Data Subject, verifies that data and submits it via Adobe Experience Platform GDPR Service.
3. Adobe Experience Cloud responds to GDPR requests and returns data to the Controller

Using Platform GDPR Service involves some up-front preparation on the part of brands. The following section outlines the technical documentation for these preparatory steps, as well as how to submit requests to Adobe Experience Cloud through the API.

## Example Workflow: Submitting GDPR Requests using Adobe Experience Platform GDPR Service

Following is an example workflow for clarification purposes only; its purpose is to help brands understand how a GDPR data request workflow could be structured. This is not a specific recommendation of how a brand should structure its GDPR data request workflow.

1. Data Subject Laura submits access/delete request via Brand X&#39;s privacy portal, UI, or other mechanism set up to accept GDPR requests from the Data Subject
2. Brand X&#39;s privacy analyst Ann collects details from Laura that are necessary to execute a GDPR request to Adobe Experience Cloud (e.g., using Adobe Experience Cloud GDPR JavaScript), including obtaining IDs about Data Subject Laura
3. Ann submits Laura&#39;s request and Data Subject IDs via integration with Adobe Experience Platform GDPR Service
4. Adobe Experience Cloud processes Laura&#39;s request/finds relevant data in Adobe Experience Cloud Solutions, returns the data to Ann or deletes it and returns a receipt of deletion to Ann
5. Ann reviews the data returned by Adobe Experience Cloud, per a pre-determined internal process to ensure the request was processed correctly
6. Ann then returns the relevant requested data or confirmation of deletion to Data Subject Laura

![GDPR Workflow](images/whitepaper-figure-5.png)

## Preparing to send a GDPR request to Adobe Experience Cloud

### 1. Review Adobe Experience Cloud requirements

 Following are the basic requirements you must have in place to implement Platform GDPR Service:

| Requirement |
| --- |
| Identify your organizations&#39; Marketing Cloud Organization ID(s) (e.g., often called an IMS org ID such as _58303AC75434B69B0A4C98C6@AdobeOrg_)  |
| Create a new integration to Platform GDPR Service through Adobe&#39;s IO Console (console.adobe.io)  |
| Define your own API key (through the IO Console)  |
| Generate your own JWT tokens to exchange for an authorized access token according to the Adobe IO standards and documented process ( [https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html](https://www.adobe.io/apis/cloudplatform/console/authentication/gettingstarted.html))  |
| Leverage an HTTP protocol tool to send requests to the API (cURL, Postman, etc.)  |
| Inventory all Adobe Experience Cloud products you use and make sure you know if they are connected to your Marketing Cloud Organization ID(s), aka IMS Org ID. If any products are not connected with a Marketing Cloud Organization ID, then note the legacy organizational ID for that product. This is important because a GDPR request needs one or more Marketing Cloud Organization IDs followed by multiple legacy org IDs. You could have multiple Marketing Cloud Organization IDs and if you wish to address data stored under any of those IDs, you must submit a separate request for each Marketing Cloud Organization ID. If a brand only has legacy org IDs and no Marketing Cloud Organization IDs, then you will need to talk to your Customer Success Manager or to Adobe Customer Care to be provisioned with a new Marketing Cloud Organization ID, which will allow you to issue GDPR requests via the API.  |
| Curate your data in Adobe Application Manager (AAM) if relevant. Organize a process to obtain Data Subject identity mapping to Adobe identifiers when using onboarders or hashing mechanisms; e.g., hashed CRM ID in AAM.  |

### 2. Curate and label your data

Before sending GDPR requests to Adobe Experience Cloud, you must identify what personal data Adobe Experience Cloud should process and store on your behalf. This involves going into Adobe Experience Cloud products or services in which you house complex data types, e.g., Adobe Analytics, Platform, or Campaign, to identify and label the data types that should be referenced in a GDPR request. This is the Controller&#39;s responsibility because data schemas will vary by customer and Solution.

When you identify fields that contain any GDPR-relevant data, you should label the data or consider using the general data governance labels in Adobe Experience Platform&#39;s Data Usage Labeling &amp; Enforcement (DULE) framework when available. The DULE features enable data stewards to apply labels (metadata) to data, either as it&#39;s ingested or after, and categorize it according to what kind of data usage policies apply to it. For more information about the DULE framework, please see the Adobe Experience Platform Data Governance whitepaper.

**How to Label Data: An example**


Let&#39;s say the Controller plans to collect cookie IDs from Data Subjects to process their GDPR requests. These cookie IDs are stored in a Report Suite in Adobe Analytics. To create a label for cookie IDs, the Controller must supply a label of his/her own or use Adobe Experience Platform&#39;s Data Usage Labeling &amp; Enforcement (DULE) framework in Analytics (if available). The Controller then takes the label from this activity and codes it as an API parameter in Adobe Experience Cloud&#39;s GDPR API. When Adobe Analytics receives this GDPR request from the API call, it can identify that the supplied data refers to a cookie ID in a particular Report Suite, and return that data or process the deletion.

![GDPR Labels](images/gdpr-labels.png)

_Data curation in Adobe Analytics: Creating labels for columns in a fictitious Analytics Report Suite to activate it for GDPR-requests processing._

**Determining what is &quot;personal data&quot;**

Examples of personal data that can be sent to Adobe Experience Cloud include name, email address, certain persistent identifiers, and IP addresses. For a more detailed list of examples, see [https://www.adobe.com/privacy/marketing-cloud.html#collect](https://www.adobe.com/privacy/marketing-cloud.html#collect).

### 3. Set up your Data Subject user portal and deploy Adobe Experience Cloud AdobePrivacy.js Library

 Adobe Experience Cloud JavaScript library (AdobePrivacy.js) is a lightweight JavaScript library that helps you collect different types of Adobe cookies in a format compatible with how our Solutions identify data categories. Controllers can choose to deploy AdobePrivacy.js on the portals where they interact with Data Subjects. AdobePrivacy.js enables you to more easily collect relevant IDs so that you can submit these identities as part of `access` and `delete` requests via Platform GDPR Service. For certain workflows in solutions such as Adobe Advertising Cloud, the JavaScript library completes a GDPR `delete` request within the user&#39;s browser by deleting relevant Adobe cookies on the client side, i.e., from the same browsing session. For more information, see [documentation](https://www.adobe.io/apis/cloudplatform/gdpr/services/allservices.html#!api-specification/markdown/narrative/gdpr/use-cases/adobe-privacy-library.md) for the JavaScript library.

The AdobePrivacy.js enables two methods for the Controller to call:

1. **retrieveIdentities (callback)** - Use to collect IDs for access and delete requests
2. **removeIdentities (callback)** - Use to remove IDs from the browser for delete requests

It is important to note that AdobePrivacy.js is not consumer-facing; that is, website or app visitors will not submit requests directly to Adobe Experience Platform GDPR Service. Rather, the consumer IDs collected by the Controller need to be submitted by the Controller via Adobe Experience Platform GDPR Service. Also please note that AdobePrivacy.js only needs to be deployed on your privacy portal; it is not needed anywhere else on your website.

Following are steps to AdobePrivacy.js implementation, if you have decided to set up a privacy portal to interact with Data Subjects to receive GDPR requests:

1. Add AdobePrivacy.js to your Data Subject privacy portal
2. Implement callback for `retrieveIdentities` and store the result in your system until you are ready to submit to Adobe Experience Cloud
3. Also call `removeIdentities` for `delete` requests
4. Self-host AdobePrivacy.js if required
5. Start process of security approval, if needed, to implement AdobePrivacy.js. Engage the right stakeholders; e.g., conduct a security and privacy review, according to your organization&#39;s policies.

### 4. Determine how you will enable consumer data requests

If consumers/Data Subjects want to know what data you maintain about them or decide they want to discontinue their relationship with you, the Controller is responsible for responding to those requests. The Controller determines how the organization will interact with Data Subjects (e.g., through a Data Subject privacy portal) and manages interactions with the Data Subject. It also is your responsibility to close the loop with the Data Subject when the request is fulfilled. In other words, Adobe Experience Cloud, as the Data Processor, will not be receiving requests directly from Data Subjects; rather, only from Data Controllers.

You also may want to ensure your mobile apps and websites will provide relevant notices and supporting materials about consumers&#39; rights regarding their personal information.

**Consumer Consent Management**

You will need to provide privacy notices to individuals who engage with your brand detailing how you collect and use information, and obtain consents, if needed. Adobe Experience Cloud currently does not offer a consent management solution. A list of some of the emerging privacy vendors in this space, some of which offer consent products, can be found at: [https://iapp.org/media/pdf/resource\_center/2018-Privacy-Tech-Vendor-Report-V2.1e.pdf](https://iapp.org/media/pdf/resource_center/2018-Privacy-Tech-Vendor-Report-V2.1e.pdf)


## Submit Data Requests via Adobe Experience Platform GDPR Service

Integrating with Platform GDPR Service helps Data Controllers orchestrate data collection across the majority of Adobe Experience Cloud Solutions. In response to a query, we, as the Processor, help you find relevant data in our Solutions based on the identities you&#39;ve supplied to us. If it&#39;s an `access` request, we return an archive of the data that was found. If it&#39;s a request to *delete*, we delete it and return a receipt of deletion.

**Note:** Controllers can make a single API call to submit multiple identities across multiple Adobe Experience Cloud Solutions. However, each API call can only have a single Marketing Cloud Organization ID. If you have multiple Marketing Cloud Organization IDs, you must make multiple API calls. This is because the API identifies an organization using Marketing Cloud Organization IDs for security purposes.

**Regarding legacy org IDs:** If you have legacy organizational IDs, such as with Campaign and Advertising Cloud, you must enumerate these organizational IDs, with help from Adobe Customer Care if needed. When you make an API call, you should supply one Marketing Cloud Organization ID (aka IMS Org ID), followed by zero or more legacy org IDs.

**Important reminder:** It&#39;s a good idea to make it clear to consumers/Data Subjects that `access/delete` requests are treated on a per-device basis. Therefore, a Data Subject must make separate `access/delete` requests to your brand from each of his/her devices (e.g., mobile, laptop, desktop, tablet).

Following are steps to prepare for submitting GDPR requests using HTTP, as well as more detailed information about the GDPR API.

**To submit GDPR requests:**

- Obtain an IMS user access token

  - Follow instructions for exchanging your JWT token (from your IO Console integration) with an access token ( [https://www.adobe.io/apis/cloudplatform/console/authentication/jwt_workflow.html](https://www.adobe.io/apis/cloudplatform/console/authentication/jwt_workflow.html))

- Find your Marketing Cloud Organization ID
- Assemble request header:
  - x-gw-ims-org-id: &lt;org ID&gt;
  - x-api-key: &lt;obtained from Adobe IO Console integration&gt;
  - Authorization: Bearer &lt;token from first step&gt;
- Assemble request body
  - Mandatory fields
    - Company context
      - IMS org ID
      - Other legacy account identifiers if necessary
    - User ID collections
      - Contain a unique user identifier (key)
      - Action type per user (access/delete)
      - Collection of:
        - Qualifying namespaces (i.e. &quot;email&quot;)
        - Values
        - Types
  - Optional - any exclusions by product name
- Submit request and capture return data (job ID&#39;s per user)
  - Make an HTTP request to API programmatically or download/access an HTTP utility and submit a request

Following is more detailed information about Adobe Experience Platform GDPR Service. The resource path for all requests to the service is [here](https://www.adobe.io/apis/cloudplatform/gdpr/docs/alldocs.html#!api-specification/markdown/narrative/gdpr/use-cases/gdpr-api-overview.md). The Platform GDPR Service method types are listed below:

|   **API Name** | **Method Type** | **Path** | **Description** | **Input parameters** | **Response** |
| --- | --- | --- | --- | --- | --- |
| Access/Delete | POST | /data/privacy/gdpr | Create one or more **ACCESS** or **DELETE** requests to retrieve or delete all data corresponding to the provided user id&#39;s | _Header:_ x-gw-ims-org-id: &lt;org ID originating request&gt; x-api-key: &lt;application key for Adobe IO&gt; Authorization: Bearer &lt;token&gt; Content-Type: application/json Body: See JSON body below | 202 Accepted 400 - Bad request - if the JSON body fails to process properly 500 - Server error - unforeseen service issues |
| Status | GET | /data/privacy/gdpr/{jobId} | Retrieve the status of a job | _Header:_ x-gw-ims-org-id: &lt;org ID originating request&gt; x-api-key: &lt;application key for Adobe IO&gt; Authorization: Bearer &lt;token&gt; Content-Type: application/json _Path parameters:_ **jobId** - returned from an Access/Delete request   | 200 success - JSON body with data regarding the status of the job 404 Not Found 406 Not acceptable - format not supported 500 - Server error - unforeseen service issues |
| Status (all) | GET | /data/privacy/gdpr/ | Retrieve status of all jobs for the requesting user | _Header:_ x-gw-ims-org-id: &lt;org ID originating request&gt; x-api-key: &lt;application key for Adobe IO&gt; Authorization: Bearer &lt;token&gt; Content-Type: application/json _Query parameters (optional):_ **startdate** - day to begin job search **enddate** - day to end job search | 200 success - JSON body with records from audit table 404 Not Found - no jobs within the scope of the requesting user 406 Not acceptable - format not supported 500 - Server error - unforeseen service issues |

**Data submission format**

Data submission formats are detailed below.

```
{
    "companyContexts": [
        {
            "namespace": "imsOrgID",
            "value": "123456789@AdobeOrg"
        },
        {
            "namespace": "AdCloud",
            "value": "AdvId:12345"
        },
        {
            "namespace": "Campaign",
            "value": "acme-stg-us1"
        }
    ],
    "users": [
        {
            "key": "David Smith",
            "action": ("access"],
            "userIDs": [
                {
                    "namespace": "email",
                    "value": "dsmith@acme.com",
                    "type": "standard"
                },
                {
                    "namespace": "myCustomField",
                    "value": "myCustomId_1234",
                    "type": "unregistered"
                }
            ]
        },
        {
            "key": "Alicia Jones",
            "action": ["access", "delete"],
            "userIDs": [
                {
                    "namespace": "email",
                    "value": "ajones@acme_com",
                    "type": "standard"
                },
                {
                    "namespace": "411",
                    "value": "123ab4de32114bb001",
                    "type": "namespaceId"
                },
                {
                    "namespace": "loyaltyAccount",
                    "value": "222050656788",
                    "type": "custom"
                },
                {
                    "namespace": "reportId",
                    "value": "276AD",
                    "type": "integrationCode"
                }
            ]
        }
    ],
    "include":["Analytics","AudienceManager"]
}
```

Some notes about the format:

- The &quot;action&quot; field is a collection of desired actions, one or both of [&quot;access&quot; | &quot;delete&quot;], and may be different for each user in the request
- The &quot;key&quot; is a user identifier to wrap the various namespace entries
- Users may have 1-many namespaces, and this format allows for varying numbers of identifiers
- The &quot;include&quot; section is optional, but if a specific product should be included for GDPR processing, it should be included here

## Conclusion

GDPR compliance can be a brand-building opportunity to advance customer centricity and customer experience. It is also a way for brands engaged in digital marketing to future-proof data privacy systems and policies, particularly for global brands and organizations in highly regulated industries. Another way to look at it: consumer consent and opt-in can be a new KPI to measure customer engagement, loyalty, satisfaction and trust.Possibly music to a marketer&#39;s ears! Although GDPR readiness is a complex undertaking, Adobe Experience Cloud is ready to support our customers in streamlining GDPR data requests for Adobe Experience Cloud Solutions.



For additional information, see

[https://www.adobe.com/privacy/general-data-protection-regulation.html](https://www.adobe.com/privacy/general-data-protection-regulation.html)

For any additional questions contact askprivacy@adobe.com
