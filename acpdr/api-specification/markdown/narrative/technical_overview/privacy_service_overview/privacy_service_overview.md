# Privacy Service overview

> **Note**: All functionalities related to CCPA are currently in beta and will be publicly available in mid-November 2019.

Adobe Experience Platform Privacy Service provides a RESTful API and user interface to help companies manage customer data requests. With Privacy Service, you can submit requests to access and delete private or personal customer data, facilitating automated compliance with organizational and legal privacy regulations.

## Why Privacy Service?

Privacy Service was developed in response to a fundamental shift in how businesses are required to manage the personal data of their customers. The central purpose of Privacy Service is to automate compliance with data privacy regulations which, when violated, can result in major fines and disrupt data operations for your business.

### Privacy Service and GDPR

The [General Data Protection Regulation](https://eugdpr.org/) (GDPR) introduced several new data privacy rights for members of the European Union, including the **Right to Access** and the **Right to be Forgotten**. This means that any EU citizen whose personal data has been collected by your business can request to access or delete their data at any time. Failure to comply to these requests within 72 hours can result in multi-million dollar fines for your organization. 

For more information on how to set up your organization's data operations to be GDPR compliant in Platform and other Experience Cloud solutions, see the [GDPR documentation](https://www.adobe.io/apis/experiencecloud/gdpr/docs.html). For details on how GDPR applies to Experience Platform specifically, see the [GDPR in Experience Platform overview](../../gdpr/gdpr-on-platform-overview.md).

### Privacy Service and CCPA

The [California Consumer Privacy Act](https://www.caprivacy.org/about) (CCPA) enhances privacy rights and consumer protection for residents of California, United States, and is set to become effective on January 1, 2020.

The CCPA provides new data privacy rights to California residents such as the right to access and delete their personal data, to know whether their personal data is sold or disclosed (and to whom), and to refuse the sale of their personal data.

In anticipation of the CCPA, Privacy Service will support requests to opt out from the selling of personal data. 

## How to use Privacy Service to manage privacy job requests

Privacy Service provides a RESTful API and user interface that allow you to create and manage requests (jobs) for actions to take on private data, including accessing, deleting, and opting out of sale. The service also provides a central audit and logging mechanism that allows you to view the status and results of jobs involving Experience Cloud solutions.

### Using the API

The [Privacy Service API](../../../../../../acpdr/swagger-specs/privacy-service.yaml) allows you to create and manage privacy jobs using RESTful API calls, allowing you to programmatically approach privacy regulation compliance for your Experience Cloud solutions. For detailed steps on how to use the API, see the [Privacy Service API tutorial](../../tutorials/privacy_service_tutorial/privacy_service_api_tutorial.md).

### Using the UI

> **Note:** The UI currently only supports access and delete requests. Requests to opt out of sale must be made in the API.

The Privacy Service UI allows you to create and monitor privacy jobs using a graphical interface. The UI includes a **Status Report** widget that provides a visual representation of the status of all active requests, and allows you to create new requests by using the built-in **Request Builder** or by uploading JSON files. For more information on using the UI, see the [Privacy Service UI tutorial](../../tutorials/privacy_service_tutorial/privacy_service_ui_tutorial.md).