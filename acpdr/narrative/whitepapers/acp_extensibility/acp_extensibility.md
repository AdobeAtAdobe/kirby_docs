
# Adobe Cloud Platform - Data Services - Overview



Adobe Cloud Platform is the most powerful, flexible, and open system on the market for building and managing complete solutions for customer experience. Adobe Cloud Platform enables organizations to centralize and standardize customer data and content from any system and apply data science and machine learning to dramatically improve the design and delivery of rich, personalized customer experiences. Beyond this, Adobe Cloud Platform is built on open APIs, exposing the full functionality of the system to developers using familiar tools so that customers can integrate their enterprise solutions with Adobe Cloud Platform and partners can build their own products and technologies on it any way they wish. 

This power and flexibility makes Adobe Cloud Platform unique in the market, and gives partners and customers an unparalleled foundation for the types of transformative innovations in customer experience that drive what we call The Experience Business: exceeding customers’ expectations with continually improved experiences, drawn from a 360-degree view of the customer and awareness of the user’s context and preferences, that surprise and delight the customer, cement customer loyalty, and drive business value. With Adobe Cloud Platform, you get an open system that supports the experience innovations you want to create with a data foundation, machine intelligence, and value-added services that are all open to be controlled, customized, and integrated with as you see fit.

[Image]

## API-first development
Adobe Cloud Platform has been designed and built from the ground up using the principles of API-first design.

1.	The API is the primary interface into the application.
2.	All Platform functions, including administrative functions, are available via API
3.	The Platform Services, Adobe solutions and 3rd party integrations use the same API

Guided by these principles, as we build Adobe Cloud Platform services and solutions, we start by looking first at the API and then architecting the platform from the ground up to support developer access to low-level CRUD operations. Only once the API itself is built do we build the user interface by making REST calls to the API. This means that the API, being built first, allows not only Adobe developers but ANY developer the same access to the core logic of Adobe Cloud Platform services and solutions by means of the same API calls. This principe does is not limited to REST based APIs. It also applies to other interfaces into the Adobe Cloud Platform like message driven interfaces. The message driven interfaces allow developers to build responsive, reactive applications.
 
Because the platform is built API-first, it opens up a lot of integration opportunities with partners:

1.	Partners who want to build their own data ingestion and egress capabilities, including 24-hour automated processes. Using the Catalog and Data Access services gives you full integration capabilities with ACP’s data store.
2.	Developers who want to build custom UIs to support specific task-driven use cases. 

The full choices offered by ACP’s open API lets you construct a solution that integrates with ACP or ACP solutions and offer almost any functionality you can conceive.

## ACP overview
Adobe Cloud Platform consists of multiple components. Adobe Cloud Platform’s multilayer model provides a complete infrastructure on which to build your own custom solutions: 

* Data Foundation
* Experience Data Warehouse
* Machine Learning
* Unified Profile, Identity, and Edge

Data Foundation
The Data Foundation layer gives developers the power to manage standard schemas, ingest data, manage datasets, apply DULE metadata, and access data. To make the best use of these capabilities, it’s vital that customer data be imported into Adobe Cloud Platform in a standardized format that enables ACP to interpret it and apply analysis to it. Adobe’s format for this purpose is the Experience Data Model (XDM), a format for representing the data for the Experience Business: customer data in standardized fields. Using XDM, you can create a Customer Data Model representing all your customer data, in however many datasets you have from whatever data sources you use. You can take advantage of a number of third-party Extract-Transform-Load (ETL) solutions to import into ACP’s Experience Data Lake. The data stored in the Data Lake can come from Adobe solutions like Adobe Analytics, Adobe Target, or Adobe Audience Manager, third-party connectors (Microsoft Dynamics, Salesforce, S3 and other), or be ingested through the available APIs.
Experience Data Warehouse
Using Experience Data Warehouse, you can query your data in the Experience Data Lake. Use any SQL-compliant reporting engine and connect it to Adobe Cloud Platform. Your queries are executed in a highly scalable compute environment that allows you to run complex queries across a large amount of data and multiple datasets. 
Machine Learning
The Machine Learning Framework offers predefined machine learning models you can leverage in your own solutions, as well as the capability to custom-develop your own models. Through feature development, transforming your data in predefined schemas for machine learning, you can extract valuable insights from customer behavior: understanding their interactions and intentions. In combination with other attributes of the consumer’s profile, it creates a 360-degree view of the customer.
Unified Profile, Identity and Edge
These services work together to enable you to build and activate audiences based on a complete profile of your customers’ attributes and behavior:
•	Unified Profile: Profile serves as a central data store for your customers’ attributes and interactions, deciphering the customer’s behavior across multiple touchpoints and enabling Adobe solutions and your integrations to leverage the complete picture of the customer, which  can be used to identify interests and preferences, predict behavior, and  deliver personalized experiences.
•	Unified Identity: stitches together the identity of the consumer across various touchpoints. It spans domains from unauthenticated to authenticated interactions with your brand across to build an identity graph that connects with the customer’s 360-degree profile that represents their behavior and interests.
•	Unified Edge: Edge takes the customer data you need to deliver custom experiences and serves it from a worldwide delivery network that enables you to access that data instantaneously for millisecond decisioning, perform computations on it, and use it immediately in providing your customers enhanced experiences in real time, as they interact with your brand.
These services work together to bring your insights and audiences to life. You can segment your audiences, inspect individual profiles, and either make them available inside of Adobe solutions or consume the Unified Profile from a third-party application through the open APIs.
Services in Adobe Cloud Platform
Adobe Cloud Platform’s integration capabilities are provided by a collection of services open to your integration through APIs. Some of the key services in Adobe Cloud Platform are:
Service name	Description
XDM Registry	Manages a library of the available XDM standard schemas as well as tenant-specific schemas and extensions
Catalog	Manages the metadata for the datasets created in the tenant, data lineage, and policies associated with them
Data Ingestion	APIs and connectors to bring data into platform, either in batch or streaming fashion
DULE	Manages data usage labels for registered datasets and enforces the usage labels as data travels through Adobe Cloud Platform
Data Access	Provides access to the content of registered datasets for data export
Unified Profile	Creates a single 360-degree view of the consumer. The profile is populated with information provided in Adobe Cloud Platform datasets and can be consumed by any service, either using point lookups or segmentation queries. 
Unified Identity	Every consumer can be identified in a number of different ways, ranging from anymous identities like a cooky, to an authenticated identity like a CRM ID. The Identity service provides identity stitching and identity resolution.

XDM Registry
Adobe is providing a standard data model for the experience business: Experience Data Model (XDM). The XDM Registry operationalizes XDM and  other industry-standard schemas and customer-extended schemas. Working with a standard data model brings direct value to customers because they don’t have to label, transform, and match their fields for every individual operation. The XDM Registry also gives an overview of available vendor extensions for the various standard schemas and industry-specific use cases and verticalized solutions. A customer can create their own unique data model (Customer Data Model) according to their business needs ; either by creating his own schemas or by extending the available standard schemas already available in the XDM Registry.
Catalog Service
The central Catalog Service tracs and organizes metadata for the data stored in Adobe Cloud Platform. As such, it contains references to all available datasets, connections to streaming sources, connectors to external systems and the states of all datasets in the platform. This central service updates the state of datasets and new batches of data as they come in: one of the first operations is to create a new dataset, based on a XDM Schema, before using the Ingestion Service to bring the actual data into the platform. The catalog service also takes care of the data lineage. 
Using the Catalog Service API, create new dataset, query ACP to discover what data is in the platform and what state it’s in, how much data has been processed, get its XDM schema, find out what systems or processes have acted on it, understand the state of individual datasets, and more.
Data Ingestion services
Adobe Cloud Platform provides two main modes of ingesting data: batch and streaming. Batch ingestion lets you import data in bulk, from any number of datasources and through any connection you define. You can import batch data by either uploading it through the API, or through available out-of-the-box connectors in Adobe Cloud platform. The ingestion service accepts Apache Parquet or CSV files. During ingestion, the data is validated against the schema of the target dataset. Multiple batches can be added to a single dataset.
Streaming data can be picked up from the data pipeline, which can be populated by Adobe Solutions or externally through the Data Collection Service API. 
Data Usage Labeling & Enforcement
Adobe Cloud Platform not only allows you to aggregate all data from associated Adobe Experience Cloud solutions, but allows you to ingest data from any other source: commercial databases, third-party solutions, and more. Managing this data requires the application of data governance: cataloguing the data by its source and type and tracking and enforcing any restrictions on its use. 
The Data Usage Labeling & Enforcement (DULE) Framework, built into ACP, enables data stewards to analyze internal Adobe Experiennce Cloud data and data coming from any external sources at the connection, dataset, or individual field level and apply labels to it that allow the DULE Policy Service to calculate whether any given data usage request is compliant with the laws, contractual restrictions, or corporate policies governing its use. This activates the data for use by marketers, who, through the seamless integration of DULE with Adobe’s marketing solutions, can get immediate feedback on any data usage request, comply with policy, and customize their marketing actions to use the data accordingly. The DULE Framework is also accessible through APIs that enable developers to apply DULE labels programmatically and query the DULE Policy Service for data governance decisions, thereby enabling third-party developers to integrate their applications with DULE governance.
Data Access
The platform is an open system. Datasets available in the platform can be read and exported. The Data Access Service provides a single point of access to the available datasets. The Data Access Service, in turn, depends on the Catalog Service to discover data sets and retrieve them from the ACP’s data store. Using the Data Access API in conjunction with the Catalog Service API, developers can access data on any level—connection, dataset, or individual records—to extract it, transform it, and/or store it in a third-party system for further use, reference, and analysis.
Unified Profile Service
The Unified Profile Service is the central service to activate the audiences that are developed within Adobe Cloud Platform. As multiple datasets come into the platform and are transformed, eventually they will be consumed by the Profile service. Based on the Customer Data Model (consisting of schemas in XDM and third-party schemas), the service creates an aggregated 360-degree view of the consumer and allows you to inspect individual consumer profile attributes. Using segment definitions, the profile can return an audience that meets the segment criteria by stitching together the multiple data points coming from multiple datasets. The Unified Profile Service also supports individual point lookups to understand the preferences of a consumer and deliver the right experience. The Unified Profile Service will be consumed by Adobe Solutions, but is also available for integration into third-party activation solutions.
An example use case – Interactive Voice Response system
For integrators, the ACP APIs provide all capabilities of the platform that are offered throught the user interface, but now with the ability to create customer workflows and automated data flows. As an integrator, you periodically check the status of datasets, set up new data ingestion procedures, and integrate your own audience activation solution with the Unified Profile.
To highlight a potential use case, consider the world of Interactive Voice Response (IVR) systems and Call Center management software. The supplier can use the ACP APIs to ingest historical information of the customer’s call center activity in the Experience Data Lake. If the data is ingested in the XDM ExperienceEvent Schema (a schema that expresses customer interactions), these interactions can be ingested without any friction into the Unified Profile Service. In this case, the callerId will be used as the customer’s identifier. The Identity service will take care of identity resolution and assist the Unified Profile Service to add any data points from recent interactions with the Call Center to the customer’s profile.
The next time a customer calls into the Call Center, he will first be answered by the IVR. To personalize the message and deliver an offer tailored to the caller, the IVR system needs to understand more about the caller. This is where API integration with the Unified Profile comes in. The IVR backend can contact the Unified Profile service for a point-lookup: consult either the profile attributes that apply to just the call-center interactions or the full customer profile, which also has attributes for interactions on other touchpoints. By combining data from multiple data sources, using identity resolution, and the Unified Profile, the call center and IVR provider can deliver a tailored customer experience, supported by Adobe Cloud Platform.
Development process
Use Adobe I/O to integrate with Adobe Cloud Platform
Developing with Adobe Cloud Platform is straightforward. Adobe I/O is the place for developers looking to integrate, extend, or create apps and experiences based on Adobe's products and technologies, including Adobe Cloud Platform.
Adobe I/O Service	Functionality
www.adobe.io	Adobe I/O is a single source for developer-focused product documentation, up-to-date information about Adobe Cloud Platform and access to Adobe I/O Console, which enables you to register API keys, connect applications to Adobe cloud services and inspect log entries and debug messages.
IO Gateway	All Adobe Cloud Platform APIs are exposed through the IO Gateway, located on platform.adobe.io. The gateway governs the access to the APIs.
IO Console	Adobe I/O Console gives you access to APIs, SDKs and developer tools to build on, integrate, and extend Adobe products. This is the central place to manage API keys and get API insights.
IO Events	With Adobe I/O Events, you can code event-driven experiences, applications, and custom workflows that leverage and combine Adobe Experience Cloud, Creative Cloud, and Document Cloud.
IO Runtime	Adobe I/O Runtime is a serverless platform that allows you to quickly deploy custom code to respond to events and execute functions right in the cloud, all with no server setup required.

Applications that access APIs for ACP or Adobe Solutions are called integrations. To create an integration, you can use any developer tool or language you like to build your application; to interact with Adobe, however, you have to register your application as an integration through Adobe I/O Console (https://console.adobe.io). Adobe I/O Console provides access to Adobe SDKs as well as registration for your integration. 
When you register your integration at Adobe I/O Console, the Adobe Identity Management Service (IMS) issues you an API key (a client ID) that determines the kind of access and permissions you have to Adobe APIs. To access APIs, the integration will authenticate itself using a JSON Web Token; your integration will need to get an access token from IMS and pass it along with any API requests. 
In addition to, or instead of, API access, you can choose to integrate with Adobe solutions by means of events. Adobe Events are notifications published by Adobe solutions whenever certain activities occur in the solution, such as a user uploading an image to Creative Cloud Assets. Using Adobe I/O Console, you can register your integration to receive Adobe Events from your chosen solution, for which you create a webhook to receive HTTP POSTs that send the substance of the event as a JSON object. This provides a one-way communication whereby your integration can be automatically notified of events in Adobe solutions. Alternatively, you can use the Journaling API to pull lists of events as you wish. You can combine event integration with API access as well.
Calling Experience Cloud solutions and Adobe Cloud Platform
So, once your integration has been registered with Adobe I/O Console, how do you actually call Adobe APIs from your integration? It’s as simple as HTTP: your integration issues an HTTP GET request, and the appropriate Adobe API responds via HTTP as well, usually with a JSON object containing the data you asked for. 
Here’s an example using the Data Access API to download a file. Suppose your integration first found the file using a request to the Catalog API to obtain the file ID, which in this case is f25a0dd3-rh6h-4ebe-b094. You could then issue a GET request as a curl command:
curl -X GET "https://platform.adobe.io/data/foundation/export/files/f25a0dd3-rh6h-4ebe-b094" -H "Authorization: Bearer <access_token>" -H "x-api-key: <api_key>" -H "x-gw-ims-org-id: <IMS_Org_for_caller>"
The API would respond with a JSON object, like this:
{
  "data": [
    {
      "name": "adobe_profiles.csv",
      "length": "2996",
      "_links": {
        "self": {
          "href": "https://platform.adobe.io:443/data/foundation/export/files/f25a0dd3-rh6h-4ebe-b094?path=adobe_profiles.csv"
        }
      }
    }
  ],
  "_page": {
    "limit": 100,
    "count": 1
  }
}

Here is another example of a call to the Catalog API to get a list of available datasets:
curl -X GET "https://platform.adobe.io/data/foundation/catalog/dataSets" -H "Authorization: Bearer <access_token>" -H "x-api-key: <api_key>" -H "x-gw-ims-org-id: <IMS_Org_for_caller>"
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
		"fields": [{
				"name": "name",
				"type": "string"
			},
			{
				"name": "age",
				"type": "string"
			}
		],
		"fileDescription": {
			"persisted": false
		},
		"transforms": "@/dataSets/598d6e81b2745f000015edcb/views/598d6e81b2745f000015edcc/transforms",
		"files": "@/dataSets/598d6e81b2745f000015edcb/views/598d6e81b2745f000015edcc/files",
		"children": "@/dataSetViews/598d6e81b2745f000015edcc/children",
		"schema": {},
		"viewId": "598d6e81b2745f000015edcc"
	},
: }

To do a point lookup on the Unified Profile Service:
curl -X GET "https://platform.adobe.io/ data/core/ups/models/endcustomers/<customerId>" -H "Authorization: Bearer <access_token>" -H "x-api-key: <api_key>" -H "x-gw-ims-org-id: <IMS_Org_for_caller>"
As you can see, the common procedure is to issue the GET request to the API endpoint with parameters that indicate what you’re requesting, plus other parameters that provide your authentication and your organization. In each case, the response will be a JSON object.
Conclusion
Adobe Cloud Platform provides a rich API surface to allow developers of customers, integration partners, and ISVs to build on and extend the platform’s capabilities. The number of services and capabilities we provide will be built out over time. The website www.adobe.io will provide an one-stop-shop to understand what new capabilities will be available for Adobe Cloud Platform. Use www.adobe.io to access SDKs for all Adobe Cloud solutions.
