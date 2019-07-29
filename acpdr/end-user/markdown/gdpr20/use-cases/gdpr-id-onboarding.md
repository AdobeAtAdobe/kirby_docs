# Adobe API Onboarding and Finding Your Organizational IDs

Adobe is committed to privacy and security. Nearly all Adobe APIs require your application to authenticate through the Adobe Identity Management System (IMS) to receive your client credentials. Your client credentials determine the access and permissions granted to your application.

## Enabling API Access

Any API that accesses a service or content on behalf of an end user, authenticates using the OAuth and JSON Web Token standards.

**Note:** *To manage certificates in [Adobe I/O Console](https://console.adobe.io/), make sure you have System administrator rights on the organization.*

[Adobe API](https://www.adobe.io/apis/experiencecloud.html) access is set up through the steps below. Each of these steps is detailed in Adobe IO documentation, in this section.

1. Check you have a digital certificate, or create one if necessary. The public and private keys provided with the certificate are needed in the following steps.
2. Create a new Integration to the Adobe solution in Adobe IO and configure it. Your credentials (API Key, Client secret, etc.) will then be generated.
3. Create a JSON Web Token (JWT) from the credentials previously generated and sign it with your private key. The JWT encodes all of the identity and security information that is needed by Adobe to verify your identity and grant you access to the API.
4. Exchange your JWT for an access token using a `POST` operation. This access token must be used in each header of your API requests.

To establish a secure Adobe API session, you must create a JSON Web Token (JWT) that encapsulates the identity of your Integration, and exchange it for an access token. Every request to an Adobe API must include the access token in the Authorization header, along with the API Key (Client ID) that was generated when you created the integration in the [Adobe I/O Console](https://console.adobe.io/)

Use the [Adobe I/O Console](https://console.adobe.io/) to obtain client credentials by creating a new **Integration**. When you create an Integration, you are assigned an **API Key** (client ID) and other access credentials. You can then obtain a secure access token from Adobe for each API session.

An integration can be subscribed to one or more APIs. In many cases, you will use the same client credentials to access multiple Adobe APIs. In addition to APIs, you may also subscribe your integration to I/O Events, so that your applications can access content and services in real-time.

## Creating an Integration
There are different options for Integrations, based on the type of application or service you are building and the API(s) you need to access. Many APIs and events are only available through a specific type of integration. See the specific API or product documentation to learn more.

* **OAuth Authentication**<br></br>If your application makes API requests on behalf of an end user, or if it needs to access end-user content, your users will first need to log in with their Adobe ID. Following a successful user log-in, your application will receive an access token, unique to that user and your application. Your application must pass this access token with each API request.<br></br>User-based services, such as the Creative SDK and Typekit, can only be added to an OAuth Integration. The Creative SDK provides a User Auth UI component for mobile and web that makes it easy to include the Adobe ID workflow in your application.<br></br>To create an Integration of this type, sign in to the [Adobe I/O Console](https://console.adobe.io/) with your Adobe ID, and choose the service with which you want to integrate your app. For more information, see [OAuth Authentication](https://www.adobe.io/apis/cloudplatform/console/authentication/oauth_workflow.html).

* **Service Account Authentication**<br></br>If your application makes API requests to a service on behalf of itself or an enterprise, you will need to configure a Service Account Integration. Service accounts are similar to user accounts, but they are unique to your application and have additional security requirements.<br></br>To obtain access tokens for your Service Account Integration, you must first create a JSON Web Token (JWT) that encapsulates your client credentials. For each API session, you will exchange your JWT for an access token from Adobe IMS. This token identifies your Integration and grants access to the services you have configured.<br></br>Application and organization-based services, such as Adobe Target, Adobe Launch, and Document Cloud PDF Services, can only be added to a Service Account Integration.<br></br>To create an Integration of this type, sign in to the [Adobe I/O Console](https://console.adobe.io/) with your Enterprise ID. Your Enterprise ID must have administrative privileges for your organization to be able to create a new Service Account Integration. If you do not have the required permissions, contact an IT Administrator at your company for help. This is typically the person who distributes Creative Cloud, Acrobat, or Marketing Cloud licenses within your company. For more information, see [Service Account Authentication](https://www.adobe.io/apis/cloudplatform/console/authentication/jwt_workflow.html).

* **API Key Integration**<br></br>Some services from Adobe do not require either user-based or application-based authentication. These APIs and events can be accessed by any application that simply specifies an API Key (Client ID). Additional client credentials, such as the Client Secret, are not required.<br></br>On its own, this integration type is the least secure and API requests are considered anonymous. In many cases, the service will use the passed API Key to enforce permissions outside of the Adobe IMS.<br></br>The [Adobe Stock Search API](https://www.adobe.io/apis/creativecloud/stock/docs/getting-started/01-getting-started_master/05-search-for-assets.html) can be accessed through any of the three types of Integration. When you access the API with just an API Key, the returned search results are generic, and do not take into account the user or application who made the request.<br></br>To create an integration of this type, sign in to the [Adobe I/O Console](https://console.adobe.io/) with your Adobe ID or Enterprise ID. Your Enterprise ID does not require additional permissions to create an [API Key Integration](https://www.adobe.io/apis/cloudplatform/console/authentication/api_key_workflow.html). For more information, see [API Key Integration](https://www.adobe.io/apis/cloudplatform/console/authentication/api_key_workflow.html).

**For each GDPR API call:**

* A customer must provide one [IMSOrg ID](../gdpr-terminology.md#imsorgid), which the Experience Cloud validates and authenticates
* The customer may provide zero or more legacy org IDs, which the Experience Cloud does not validate or authenticate. Experience Cloud relays these org IDs to each subscribed solution to determine whether or not the org ID is relevant to it. If relevant, the solution validates it and authenticates it.

The customer must supply a namespace and other details for each identifier submitted.

## Steps to Finding Your Org IDs

| Step  | Description |
| --- | --- |
| 1. | Adobe Experience Cloud, its solutions, and APIs provide documentation on how customers discover their IMSOrg IDs and legacy Org IDs |
| 2. | Customers gather their org IDs and, if help is needed, file a Customer Care ticket |
| 3. | If the customer doesn't have an IMSOrg ID, Customer Care escalates in order to provision the customer with a new IMSOrg ID |
| 4. | If a customer wants to find its org IDs for a specific solution, Customer Care will help |
| 5. | Customer Care returns all discovered org IDs to the customer and closes the customer's ticket |

See [Adobe I/O Authentication Overview](https://www.adobe.io/apis/cloudplatform/console/authentication/api_key_workflow.html) for more information.
