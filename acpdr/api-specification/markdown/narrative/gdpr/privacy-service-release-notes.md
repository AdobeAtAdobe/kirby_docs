# Privacy Service release notes

This document contains information about new features for Adobe Experience Platform Privacy Service, as well as enhancements and significant bug fixes.

## 25 July, 2019

### New features

Feature | Description
--- | ---
Request Metrics Dashboard | The new metrics dashboard in the Privacy Service UI provides visibility into submitted, errored, and completed GDPR requests. 
Request Builder | To service organizations with both technical and non-technical users submitting GDPR requests, a “Create Request” functionality has been added to the UI. The JSON file submission capability is still available in the Privacy Service UI for those organizations who prefer to continue using it.
GDPR Job Event Notifications | Event notifications about GDPR job statuses are a critical element to many workflows. While notifications were previously served using individual email notices, GDPR event notifications are messages that leverage Adobe I/O events, which are sent to a configured webhook facilitating job request automation. Privacy Service UI users can subscribe to Adobe I/O GDPR events to receive updates when a product or the GDPR job has been completed.

### Enhancements

* None.

### Bug fixes

* None.

## 18 April, 2019

### Enhancements
* Default range for the status table in the Privacy Service UI modified to a 7-day span.
* Better internal exception handling.
* Improved performance by introducing caching for common internal calls with low data change rates.

### Bug fixes
* Added missing logging information for filtered queries for the `GET /` endpoint in the Privacy Service API.

## 11 April, 2019

### Enhancements
* Updated UI to support new functionality for beta customers
* New metrics API to support UI 2.0 features in beta

### Bug fixes
* None

## 09 April, 2019

### Enhancements
* Updated all lookup (GET) API calls to default to a 30-day lookback range
* Restricted API usage to have a maximum lookback range of 45 days

### Bug fixes
* None

## 14 February, 2019

### Enhancements
* Enforce the `include` field in every POST submission.
* Enforce the `include` field when uploading JSON.

### Bug fixes
* Fixed an issue where customers could not load the Privacy Service UI.