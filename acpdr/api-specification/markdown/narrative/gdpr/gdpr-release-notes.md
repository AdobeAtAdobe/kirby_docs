# GDPR release notes

This document contains information about new GDPR features, as well as significant bug fixes and enhancements.

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
