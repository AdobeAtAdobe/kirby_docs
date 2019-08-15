# GDPR release notes

This document contains information about new GDPR features, as well as significant bug fixes and enhancements.

## 25 July, 2019

### API/UI Modifications

* **GDPR Request Metrics Dashboard:** The new metrics dashboard provides visibility into submitted, errored, and completed GDPR requests. 

* **Create Request Builder:** To service organizations with both non-technical and technical users submitting GDPR requests, “Create Request” functionality has been added to the UI. The JSON file submission capability is still available in the GDPR UI for those organizations who prefer to continue using it.

* **GDPR Job Event Notifications:** Event notifications about GDPR job statuses are a critical element to many workflows. Notifications were previously served using individual email notices. With the move away from emails, GDPR event notifications are messages that leverage Adobe I/O events, which are sent to a configured webhook facilitating job request automation. Users of the GDPR UI can subscribe to Adobe I/O GDPR events to receive updates when a product or the GDPR job has been completed.


## 18 April, 2019

### API/UI Modifications
* Default range for status table modified to 7 day lookback
* Better internal exception handling
* Improved performance by introducing caching for common internal calls with low data change rates

### Bug fixes
* Added missing logging information for filtered queries in the GET (all) API


## 11 April, 2019

### API/UI Modifications
* Updated UI to support new functionality for beta customers
* New metrics API to support UI 2.0 features in beta


### 09 April, 2019

### API/UI Modifications
* Updated all GET API calls to default to 30 day lookback
* Restricting API usage to have a maximum age lookback of 45 days


## 14 February, 2019

### Enhancements
* Enforce the `include` field in every POST submission
* Enforce the `include` field in the JSON when you upload

See [Adobe Experience Platform Privacy Service API](https://www.adobe.io/apis/experienceplatform/gdpr/api-reference.html).

### Bug fixes
* Fixed an issue where customers could not load the Privacy Service UI.
