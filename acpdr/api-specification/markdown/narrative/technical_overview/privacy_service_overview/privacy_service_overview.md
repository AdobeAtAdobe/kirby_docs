# Privacy Service overview

Adobe Experience Platform Privacy Service provides a RESTful API and user interface to help companies manage customer data requests. With Privacy Service, you can submit requests to access and delete private or personal customer data, facilitating automated compliance with organizational and legal privacy regulations.

## Why Privacy Service?

Privacy Service was developed in response to a fundamental shift in how businesses are required to manage the personal data of their customers. The central purpose of Privacy Service is to automate compliance with data privacy regulations which, when violated, can result in major fines and disrupt data operations for your business.

### Privacy Service and GDPR

The [General Data Protection Regulation](https://eugdpr.org/) (GDPR) introduced several new data privacy rights for members of the European Union, including the **Right to Access** and the **Right to be Forgotten**. This means that any EU citizen whose personal data has been collected by your business can request to access or delete their data at any time. Failure to comply to these requests within 72 hours can result in multi-million dollar fines for your organization. 

Since GDPR represents a major change in how businesses handle the personal data of their customers, both inside and outside the EU, Privacy Service was developed to automate access and delete requests for data used by Adobe Experience Cloud solutions. In addition to helping automate GDPR compliance, Privacy Service can also be configured to comply with other privacy regulations applicable to your business.

For more information on how to set up your organization's data operations to be GDPR compliant in Platform and other Experience Cloud solutions, see the [GDPR documentation](https://www.adobe.io/apis/experiencecloud/gdpr/docs.html). For details on how GDPR applies to Experience Platform specifically, see the [GDPR in Experience Platform overview](../../gdpr/gdpr-on-platform-overview.md).

## How to use Privacy Service to manage access/delete requests

Privacy Service provides a RESTful API and user interface that allow you to create and manage requests (jobs) for accessing or deleting private data. The service also provides a central audit and logging mechanism that allows you to view the status and results of jobs involving Experience Cloud solutions.

### Using the API

The [Privacy Service API](../../../../../../acpdr/swagger-specs/privacy-service.yaml) allows you to create and manage privacy jobs using RESTful API calls, allowing you to programmatically approach privacy regulation compliance for your Experience Cloud solutions. For detailed steps on how to use the API, see the [Privacy Service API tutorial](../../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md).

### Using the UI

The Privacy Service UI allows you to create and monitor privacy jobs using a graphical interface. The UI includes a **Status Report** widget that provides a visual representation of the status of all active requests, and allows you to create new requests by using the built-in **Request Builder** or by uploading JSON files. For more information on using the UI, see the [Privacy Service UI tutorial](../../tutorials/privacy_service_tutorial/privacy_service_ui_tutorial.md).