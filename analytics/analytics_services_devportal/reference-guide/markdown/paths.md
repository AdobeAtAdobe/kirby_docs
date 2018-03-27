
<a name="paths"></a>
## Resources

<a name="approvals_resource"></a>
### Approvals
Operations on approvals


<a name="save"></a>
#### Marks an item as approved
```
POST /approvals
```


##### Description
Takes an array of components and marks them all as "Approved"


##### Body parameter
Array containing a list of Component objects to be marked as "Approved"

*Name* : body  
*Flags* : optional  
*Type* : < [Approval](#approval) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Approval](#approval)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation; only admins can approve components|No Content|
|**500**|Internal Server Error; unable to create approvals for the specified components|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findallforcurrentuser"></a>
#### Returns a list of approval objects for the current user. Response is paged based on the provided paging criteria.
```
GET /approvals
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**userid**  <br>*optional*|The user ID to return details for. Only admins may use this query parameter.|integer (int32)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Approval](#approval) > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Internal Server Error; unable to retrieve approvals|No Content|


##### Produces

* `application/json`


<a name="deletebyitemids"></a>
#### Un-approve the specified components (delete approvals)
```
DELETE /approvals
```


##### Description
Only Admins can create and delete approvals.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentIds**  <br>*optional*|Comma-delimited list of componentIds for which to remove approvals|string|
|**Query**|**componentType**  <br>*required*|Type of component|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< < string, object > map > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation; only admins can un-approve a segment|No Content|
|**500**|Internal Server Error; unable to delete approvals for the specified components|No Content|


##### Produces

* `application/json`


<a name="findone"></a>
#### Retrieves an approval object by its id
```
GET /approvals/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The approval ID to be returned|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Approval](#approval)|
|**403**|Insufficient access to perform operation|No Content|
|**404**|The specified approvalId could not be found|No Content|
|**500**|Internal Server Error; unable to retrieve the specified approval|No Content|


##### Produces

* `application/json`


<a name="deletebyapprovalid"></a>
#### Deletes the approval with the given id
```
DELETE /approvals/{id}
```


##### Description
Only admins can create and delete approvals


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The approval ID to be deleted|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**403**|Insufficient access to perform operation; user does not have access to delete the approval.|No Content|
|**404**|The specified approval does not exist|No Content|
|**500**|Internal Server Error; unable to delete the specified approval|No Content|


##### Produces

* `application/json`


<a name="calculatedmetrics_resource"></a>
### Calculatedmetrics

<a name="calculatedmetrics_createcalculatedmetric"></a>
#### Create a new Calculated Metric
```
POST /calculatedmetrics
```


##### Description
Creates a new calculated metric. The following attributes are available when creating a calculated metric:

IMPORTANT: Required Fields: name, definition, rsid

Optional fields: description

Example definition for use in testing API below ("Page exists"):

```json

{"definition":{},"version":[1,0,0]}
```

A calculated metric response will always include these default items:* id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field as defined/documented in the GET endpoints (see GET "/calculatedmetrics" or GET "/calculatedmetrics/{id}" for more documentation).


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, legacyId, internal, dataGroup, reportTimeAttribution) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs for calculated metric creation.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsCalculatedMetric](#analyticscalculatedmetric)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsCalculatedMetric](#analyticscalculatedmetric)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric create or retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="calculatedmetrics_findcalculatedmetrics"></a>
#### Retrieve many calculated metrics
```
GET /calculatedmetrics
```


##### Description
A calculated metric response will always include these default items: *id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field:

* *modified*: Date that the metric was last modified (ISO 8601)
* *definition*: Calculated metric definition as JSON object
* *compatibility*: Products that the metric is compatible with
* *reportSuiteName*: Also return the friendly Report Suite name for the RSID
* *favorite*: True if calculated metric has been marked as a 'Favorite'
* *tags*: Gives all existing tags associated with the calculated metric
* *approved*: True if calculated metric has been marked as 'Approved'
* *shares*: Gives all existing shares for the calculated metric
* *sharesFullName*: Give 'shares', but also include the shared-to user's friendly login name as 'shareToDisplayName' in each share object
* *ownerFullName*: Add friendly full login name (string) to the 'owner' object


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**approved**  <br>*optional*|Filter list to only include calculated metrics that are approved|boolean||
|**Query**|**calculatedMetricFilter**  <br>*optional*|Filter list to only include calculated metrics in the specified list (comma-delimited list of IDs)|string||
|**Query**|**curatedRsid**  <br>*optional*|Add curatedItem and alternateVariableNames based on the Rsid|string||
|**Query**|**dataGroup**  <br>*optional*|Filter list to only include calculated metrics with the given dataGroup|string||
|**Query**|**dataType**  <br>*optional*|Filter list to only include calculated metrics compatible with the specified product|enum (oberon, frag, marketing_channel)||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, legacyId, internal, dataGroup, reportTimeAttribution) > array(multi)||
|**Query**|**favorite**  <br>*optional*|Filter list to only include calculated metrics that are favorites|boolean||
|**Query**|**filterByIds**  <br>*optional*|Filter list to only include calculated metrics in the specified list (comma-delimited list of IDs) (this is the same as calculatedMetricFilter, and is overwritten by calculatedMetricFilter|string||
|**Query**|**filterByModifiedAfter**  <br>*optional*|Filter list to only include calculated metrics modified since this date (ISO8601 format)|string||
|**Query**|**includeDeleted**  <br>*optional*|DEPRECATED use deleted includeType - include disabled calculated metrics in results|string||
|**Query**|**includeType**  <br>*optional*|Include additional calculated metrics not owned by user. The "all" option takes precedence over "shared"|< enum (all, shared, templates, unauthorized, deleted, internal, curatedItem) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**name**  <br>*optional*|Filter list to only include calculated metrics that contains the Name|string||
|**Query**|**ownerId**  <br>*optional*|Filter list to only include calculated metrics owned by the specified loginId|integer (int32)||
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**pagination**  <br>*optional*|return paginated results|enum (true, false)|`"false"`|
|**Query**|**rsids**  <br>*optional*|Filter list to only include calculated metrics tied to specified RSID list (comma-delimited)|string||
|**Query**|**tagNames**  <br>*optional*|Filter list to only include calculated metrics that contains one of the tags|string||
|**Query**|**toBeUsedInRsid**  <br>*optional*|The report suite where the calculated metric intended to be used.  This report suite will be used to determine things like compatibility and permissions.  If it is not specified then the permissions will be calculated based on the union of all metrics authorized in all groups the user belongs to.  If the compatibility expansion is specified and toBeUsedInRsid is not then the compatibility returned is based off the compatibility from the last time the calculated metric was saved.|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [AnalyticsCalculatedMetric](#analyticscalculatedmetric) > array|
|**400**|Unable to retrieve list of calculated metrics shared with user|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**401**|Owner filter error; user specified is not in the same company as the requesting user|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**403**|Requesting non-shared calculated metrics for other users is restricted to admin users|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="calculatedmetrics_getcalculatedmetricfunctions"></a>
#### Retrieve calculated metric functions
```
GET /calculatedmetrics/functions
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [CalcMetricFunction](#calcmetricfunction) > array|
|**500**|External API error; Calculated metric functions retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="calculatedmetrics_getcalculatedmetricfunction"></a>
#### Retrieve a calculated metric function by id
```
GET /calculatedmetrics/functions/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The function ID to retrieve|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[CalcMetricFunction](#calcmetricfunction)|
|**404**|Calculated metric function not found|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric function retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="calculatedmetrics_validatecalculatedmetric"></a>
#### Validate a calculated metric definition
```
POST /calculatedmetrics/validate
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**migrating**  <br>*optional*|Include migration functions in validation|boolean|`"false"`|


##### Body parameter
JSON-formatted Object containing key/value pairs for calculated metric validation.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsCalculatedMetric](#analyticscalculatedmetric)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsCalculatedMetric](#analyticscalculatedmetric)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric validation failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="calculatedmetrics_findonecalculatedmetric"></a>
#### Retrieve a single calculated metric by id
```
GET /calculatedmetrics/{id}
```


##### Description
A calculated metric response will always include these default items: *id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field:

* *modified*: Date that the metric was last modified (ISO 8601)
* *definition*: Calculated metric definition as JSON object
* *compatibility*: Products that the metric is compatible with
* *reportSuiteName*: Also return the friendly Report Suite name for the RSID
* *favorite*: True if calculated metric has been marked as a 'Favorite'
* *tags*: Gives all existing tags associated with the calculated metric
* *approved*: True if calculated metric has been marked as 'Approved'
* *shares*: Gives all existing shares for the calculated metric
* *sharesFullName*: Give 'shares', but also include the shared-to user's friendly login name as 'shareToDisplayName' in each share object
* *ownerFullName*: Add friendly full login name (string) to the 'owner' object


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The calculated metric ID to retrieve|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, legacyId, internal, dataGroup, reportTimeAttribution) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**toBeUsedInRsid**  <br>*optional*|The report suite where the calculated metric is intended to be used. This report suite will be used to determine things like compatibility and permissions.  If it is not specified then the permissions will be calculated based on the union of all metrics authorized in all groups the user belongs to.  If the compatibility expansion is specified and toBeUsedInRsid is not then the compatibility returned is based off the compatibility from the last time the calculated metric was saved.|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsCalculatedMetric](#analyticscalculatedmetric)|
|**403**|Requesting non-shared calculated metrics for other users is restricted to admin users|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; calculated metric retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="calculatedmetrics_updatecalculatedmetric"></a>
#### Update an existing calculated metric
```
PUT /calculatedmetrics/{id}
```


##### Description
The following fields can be modified through this endpoint: <br><b>name, description, definition, owner, rsid</b>Example "defintion" for use in testing API below ("Page exists"):<br>"definition":{},"version":[1,0,0]}<br><br>Response will be the newly modified calculated metric object after the update request completes.<br><br><b><span style="text-decoration: underline;">CalculatedMetricResponse</span></b><br>A calculated metric response will always include these default items:* id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field as defined/documented in the GET endpoints (see GET "/calculatedmetrics" or GET "/calculatedmetrics/{id}" for more documentation).


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|Calculated Metric ID to be updated|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, legacyId, internal, dataGroup, reportTimeAttribution) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsCalculatedMetric](#analyticscalculatedmetric)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsCalculatedMetric](#analyticscalculatedmetric)|
|**400**|Definition must be formatted as a JSON Object|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**401**|Company mismatch; calculated metric ownership can only be transferred within the same organization|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**403**|User does not have permission to update this calculated metric|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric update or retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="calculatedmetrics_deletecalculatedmetric"></a>
#### Deletion of Calculated Metrics by Id
```
DELETE /calculatedmetrics/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The calculated metric ID to be deleted|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[DeleteResponse](#deleteresponse)|
|**500**|External API error; Calculated metric delete failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="collections_resource"></a>
### Collections
Analytics Collections


<a name="findall"></a>
#### Retrieves report suites that match the given filters.
```
GET /collections/suites
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**cached**  <br>*optional*|return cached results|enum (true, false)|`"true"`|
|**Query**|**discoverUiEnabled**  <br>*optional*|Filter list to only include suites with Ad Hoc Analysis access.|boolean||
|**Query**|**enabledSolutions**  <br>*optional*|Filter list to only include suites whose enabled solutions includes|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional metadata fields to include on response.|< enum (name, parentRsid, numGroups, numericRsid, isBlocked, isDeleted, currency, calendarType, currentTimezoneOffset, axleConfig, timezoneZoneinfo, dataCurrentAsOf, discoverUiEnabled, enabledSolutions, taxonomist, dataSchema) > array(multi)||
|**Query**|**includeType**  <br>*optional*|Include report suites with the following parameters in the return list.  Including blocked requires a single companyId in the companyIds query param|< enum (deleted) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**permission**  <br>*optional*|Filter list to only include suites that have this permission.|string||
|**Query**|**relevantOnly**  <br>*optional*|Return only report suites that are considered recent.|enum (true, false)|`"false"`|
|**Query**|**rsidContains**  <br>*optional*|Filter list to only include suites whose rsid contains rsidContains.|string||
|**Query**|**rsids**  <br>*optional*|Filter list to only include suites in this RSID list (comma-delimited)|string||
|**Query**|**types**  <br>*optional*|Comma-delimited list of types of report suites to return.  No selection returns all types.|< enum (base, asi, rollup, vrs, advancedVrs) > array(multi)||
|**Query**|**userGroupId**  <br>*optional*|Filter list to only include suites that are in the given userGroupId|integer (int32)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SuiteCollectionItem](#suitecollectionitem)|
|**500**|Unexpected error; report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="resetcache"></a>
#### GET /collections/suites/cacheReset

##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|boolean|


##### Produces

* `application/json`


<a name="findone"></a>
#### Retrieves report suite by id
```
GET /collections/suites/{rsid}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to return|string|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional metadata fields to include on response.|< enum (name, parentRsid, numGroups, numericRsid, isBlocked, isDeleted, currency, calendarType, currentTimezoneOffset, axleConfig, timezoneZoneinfo, dataCurrentAsOf, discoverUiEnabled, enabledSolutions, taxonomist, dataSchema) > array(multi)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SuiteCollectionItem](#suitecollectionitem)|
|**500**|Unexpected error; report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="companies_resource"></a>
### Companies
Analytics Company Service


<a name="getusercompany"></a>
#### Retrieves a single company.
```
GET /companies/me
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of company expansions.|< enum (validEmails, allowAdobeEmails, companySecurity, eccId, imsUserMigration, featureAccessOverrides, taxonomistMigrationStart, taxonomistMigrationStatus, imsProductId) > array(multi)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Company](#company)|
|**500**|Unexpected error; company retrieval failed|No Content|


##### Produces

* `application/json`


<a name="gettrackingserver"></a>
#### Retrieves the tracking server for a company.
```
GET /companies/me/trackingserver
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**rsid**  <br>*required*|The rsid to use if this company does not require namespace use.|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsTrackingServer](#analyticstrackingserver)|
|**500**|Unexpected error; tracking server retrieval failed|No Content|


##### Produces

* `application/json`


<a name="dateranges_resource"></a>
### Dateranges
Retrieves a dateranges for the Given Report Suite


<a name="createdaterange"></a>
#### Creates a single date range.
```
POST /dateranges
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional date range metadata fields to include on response.|< enum (definition, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, isDeleted, internal) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**newDefinition**  <br>*optional*|Use the new JSON def|enum (true, false)|`"false"`|


##### Body parameter
JSON-formatted Object containing date range keys/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsDateRange](#analyticsdaterange)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDateRange](#analyticsdaterange)|


##### Produces

* `application/json`


<a name="getdateranges"></a>
#### Returns a list of dateranges for the user
```
GET /dateranges
```


##### Description
This API allows users to store commonly used date ranges so that they can be reused throughout the product.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**curatedRsid**  <br>*optional*|Include the curatedItem status for given Rsid|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional date range metadata fields to include on response.|< enum (definition, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, isDeleted, internal) > array(multi)||
|**Query**|**filterByIds**  <br>*optional*|Filter list to only include date ranges in the specified list (comma-delimited list of IDs)|string||
|**Query**|**filterByModifiedAfter**  <br>*optional*|Filter list to only include date ranges modified since this date (ISO8601 format)|string||
|**Query**|**includeDeleted**  <br>*optional*|DEPRECATED use deleted includeType - Include disabled/deleted date ranges in the response. Note: also forces the 'isDeleted' expansion|enum (true, false)|`"false"`|
|**Query**|**includeType**  <br>*optional*|Include additional dateranges not owned by user. The "all" option takes precedence over "shared"|< enum (all, shared, templates, deleted, internal, curatedItem) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**newDefinition**  <br>*optional*|Use the new JSON def|enum (true, false)|`"false"`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDateRange](#analyticsdaterange)|


##### Produces

* `application/json`


<a name="postdaterangeintervals"></a>
#### Retrieves static intervals for a list of ranges
```
POST /dateranges/intervals
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**anchor**  <br>*required*|Date to use to evaluate formula|string|`"2016-01-01T00:00:00"`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**rsid**  <br>*optional*|The rsid to lookup calendar type to use to calculate range|string||


##### Body parameter
List of date formulas to be evaluated

*Name* : body  
*Flags* : optional  
*Type* : < [AnalyticsDateRangeDefinition](#analyticsdaterangedefinition) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDateRangeInterval](#analyticsdaterangeinterval)|


##### Produces

* `application/json`


<a name="validatedaterangeintervals"></a>
#### Retrieves static intervals for a list of ranges
```
POST /dateranges/validation
```


##### Body parameter
List of date formulas to be evaluated

*Name* : body  
*Flags* : optional  
*Type* : < [AnalyticsDateRangeDefinition](#analyticsdaterangedefinition) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[DeleteResponse](#deleteresponse)|


##### Produces

* `application/json`


<a name="getdaterange"></a>
#### Retrieves configuration for a DateRange.
```
GET /dateranges/{dateRangeId}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**dateRangeId**  <br>*required*|The DateRange id for which to retrieve information|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional date range metadata fields to include on response.|< enum (definition, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, isDeleted, internal) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**newDefinition**  <br>*optional*|Use the new JSON def|enum (true, false)|`"false"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDateRange](#analyticsdaterange)|


##### Produces

* `application/json`


<a name="updatedaterange"></a>
#### Updates configuration for a date range.
```
PUT /dateranges/{dateRangeId}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**dateRangeId**  <br>*required*|The DateRange id for which to retrieve information|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional date range metadata fields to include on response.|< enum (definition, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, isDeleted, internal) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**newDefinition**  <br>*optional*|Use the new JSON def|enum (true, false)|`"false"`|


##### Body parameter
JSON-formatted Object containing date range keys/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsDateRange](#analyticsdaterange)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDateRange](#analyticsdaterange)|


##### Produces

* `application/json`


<a name="deletedaterange"></a>
#### deletes a date range.
```
DELETE /dateranges/{dateRangeId}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**dateRangeId**  <br>*required*|The DateRange id for which to retrieve information|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[DeleteResponse](#deleteresponse)|


##### Produces

* `application/json`


<a name="getdaterangebuckets"></a>
#### Divide a range into buckets based on granularity i.e. all weeks in a year
```
GET /dateranges/{dateRangeId}/buckets
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**dateRangeId**  <br>*required*|The DateRange to be evaluated|string||
|**Query**|**anchor**  <br>*required*|Date to use to evaluate formula|string|`"2016-01-01T00:00:00"`|
|**Query**|**granularity**  <br>*optional*|Size of buckets|enum (minute, hour, day, week, month, quarter, year)|`"week"`|
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**rsid**  <br>*optional*|The rsid to lookup calendar type to use to calculate range|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDateRangeInterval](#analyticsdaterangeinterval)|


##### Produces

* `application/json`


<a name="getdaterangeinterval"></a>
#### Retrieves static interval for a DateRange based on anchor.
```
GET /dateranges/{dateRangeId}/interval
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**dateRangeId**  <br>*required*|The DateRange id for which to retrieve information|string||
|**Query**|**anchor**  <br>*required*|Date to use to evaluate formula|string|`"2016-01-01T00:00:00"`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**rsid**  <br>*optional*|The rsid to lookup calendar type to use to calculate range|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDateRangeInterval](#analyticsdaterangeinterval)|


##### Produces

* `application/json`


<a name="dimensions_resource"></a>
### Dimensions
Dimensions service


<a name="getdimensions"></a>
#### Returns a list of dimensions for a given report suite.
```
GET /dimensions
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**classifiable**  <br>*optional*|Only include classifiable dimensions.|enum (true)||
|**Query**|**dataGovernanceLabels**  <br>*optional*|Filter the response based on data governance labels. Search for multiple lables using a comma-delimited string format. Any metric/dimension containing one or more of the provided labels will be returned.|< string > array(multi)||
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, usageSummaryWithRelevancyScore, hidden, noAccess, warning, curatedItems, isEntryOrExit, reportTimeAttribution, customerJourney, dataGovernance, aliasId) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**reportTimeAttribution**  <br>*optional*|Only include dimensions that support reportTimeAttribution.|enum (true)||
|**Query**|**reportable**  <br>*optional*|Only include dimensions that are valid within a report.|enum (true)||
|**Query**|**rsid**  <br>*required*|A Report Suite ID|string||
|**Query**|**segmentable**  <br>*optional*|Only include dimensions that are valid within a segment.|enum (true)||
|**Query**|**support**  <br>*optional*|Comma-delimited list of products to filter the dimension list by. Possible values are 'oberon' and 'dataWarehouse'.|< enum (oberon, dataWarehouse) > array(multi)||
|**Query**|**useCache**  <br>*optional*|Enable caching for faster requests.|boolean|`"true"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [AnalyticsDimension](#analyticsdimension) > array|
|**400**|Invalid JSON input|No Content|
|**401**|User does not have access to this report suite|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="batchupdatedatagovernancesettingsforrsid"></a>
#### Batch modification of data governance settings for given dimensions
```
PUT /dimensions/datagovernance/batch
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**rsid**  <br>*optional*|A Report suite ID|string|


##### Body parameter
List of Data Governance settings objects that describe the new settings for a report suite.

*Name* : body  
*Flags* : optional  
*Type* : < [BatchDataGovernanceSettings](#batchdatagovernancesettings) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success status; all updates successfully completed.|< [BatchDataGovernanceSettings](#batchdatagovernancesettings) > array|
|**207**|Multiple status; partial success, some batch settings produced errors, see individual batch setting status for details.|< [BatchDataGovernanceSettings](#batchdatagovernancesettings) > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="getdimensionvalues"></a>
#### Returns the names of the dimension items listed in the post body.
```
POST /dimensions/values
```


##### Description
Given a dimension name and an itemId, this endpoint returns the text value for that itemId


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**dateRange**  <br>*optional*|Optionally supply the date range for filtering dimension values (default is last 90 days). Example format: 2014-06-01/2014-06-30 (gives June 2014)|string||
|**Query**|**locale**  <br>*optional*|Locale to use when returning dimension information.|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|The report suite ID|string||


##### Body parameter
Array of dimensionItem objects where each element contains key-value pairs for "dimension" and "itemId"

*Name* : body  
*Flags* : required  
*Type* : < [DimensionItem](#dimensionitem) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [DimensionItem](#dimensionitem) > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="getdimension"></a>
#### Returns a dimension for the given report suite
```
GET /dimensions/{dimensionId}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**dimensionId**  <br>*required*|The dimension ID. For example a valid id is a value like 'evar1'|string||
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, usageSummaryWithRelevancyScore, hidden, noAccess, warning, curatedItems, isEntryOrExit, reportTimeAttribution, customerJourney, dataGovernance, aliasId) > array(multi)||
|**Query**|**includeHidden**  <br>*optional*|Include variables that are hidden in the UI or that the user doesn't have privileges to access.|boolean|`"false"`|
|**Query**|**locale**  <br>*optional*|The locale to use for returning system named dimensions.|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|The report suite ID.|string||
|**Query**|**useCache**  <br>*optional*|Enable caching for faster requests|boolean|`"true"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDimension](#analyticsdimension)|
|**401**|User Doesn't have sufficient privileges|No Content|


##### Produces

* `application/json`


<a name="updatedimensiondatausagesettings"></a>
#### Modification of dimension data governance settings
```
PUT /dimensions/{dimensionId}/datagovernance
```


##### Description
Updates a specific dimension data governance settings.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**dimensionId**  <br>*required*|The id of the dimension to modify.|string|
|**Query**|**rsid**  <br>*optional*|Report suite ID containing the dimension being modified.|string|


##### Body parameter
A DataGovernanceSettings object with the new settings

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="favorites_resource"></a>
### Favorites
Operations on managing favorites on components


<a name="save"></a>
#### Creates a favorite for a given component
```
POST /favorites
```


##### Description
Accepts an array of Favorites to allow creation of one or many favorites in a single call.


##### Body parameter
JSON-formatted ARRAY containing a list of favorite objects

*Name* : body  
*Flags* : required  
*Type* : < [Favorite](#favorite) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Favorite](#favorite)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findallforcurrentuser"></a>
#### Returns a list of favorite objects for the current user meeting the paging restriction
```
GET /favorites
```


##### Description
Returns an array of all of the favorites objects tied to the company. Setting a very large page size will return the list in a single request, but it may be more data than you expect and you may experience performance issues.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**componentIds**  <br>*optional*|Comma-delimited list of componentIds to filter on. Must also pass componentType.|string||
|**Query**|**componentType**  <br>*optional*|The component type to filter on. Required if also using componentIds filter.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**userid**  <br>*optional*|The user ID to return details for. Only admins may user this option.|integer (int32)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Favorite](#favorite) > array|


##### Produces

* `application/json`


<a name="deletebyitemids"></a>
#### Deletes favorites by componentId. Accepts a list of componentIds and deletes any "Favorites" associated with them
```
DELETE /favorites
```


##### Description
Deletes favorites based on componentIds.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentIds**  <br>*required*|A comma separated list of component Ids|string|
|**Query**|**componentType**  <br>*required*|The component type to operate on.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< < string, object > map > array|


##### Produces

* `application/json`


<a name="findone"></a>
#### Retrieve a favorite object by id
```
GET /favorites/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id of the "Favorite" object to return|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Favorite](#favorite)|


##### Produces

* `application/json`


<a name="deletebyfavoriteid"></a>
#### Deletes the "Favorite" with the given id
```
DELETE /favorites/{id}
```


##### Description
Deletes by favoriteId.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id of the favorite|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**400**|Attempting to remove a favorite by id that does not exist|No Content|
|**403**|Attempting to remove a favorite for a user other than the authenticated user|No Content|


##### Produces

* `application/json`


<a name="metrics_resource"></a>
### Metrics
Retrieves a List of Metrics for the Given Report Suite


<a name="getmetrics"></a>
#### Returns a list of metrics for the given report suite
```
GET /metrics
```


##### Description
This returns the metrics list primarily for the Analytics product. The platform identity API Returns a list of all possible metrics for the supported systems.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**dataGovernanceLabels**  <br>*optional*|Filters the response based on data governance labels.  This allows multiple labels to search for in a comma-delimited string format.  Returns any metric/dimension containing one or more of the labels passed in|< string > array(multi)||
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, usageSummaryWithRelevancyScore, hidden, noAccess, warning, curatedItems, isEntryOrExit, reportTimeAttribution, customerJourney, dataGovernance, aliasId) > array(multi)||
|**Query**|**includeType**  <br>*optional*|Include additional metrics. The "builderOnly" returns metrics which should be visible in builder (Calculated Metric builder and segment builder)|< enum (builderOnly) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale that system named metrics should be returned in|string|`"en_US"`|
|**Query**|**reportTimeAttribution**  <br>*optional*|Filter the metrics by if they support reportTimeAttribution.|boolean|`"false"`|
|**Query**|**rsid**  <br>*required*|ID of desired report suite ie. sistr2|string||
|**Query**|**segmentable**  <br>*optional*|Filter the metrics by if they are valid in a segment.|boolean|`"false"`|
|**Query**|**showMetricViews**  <br>*optional*|Whether to show metric views. Children metrics will be hidden.|boolean|`"false"`|
|**Query**|**stitched**  <br>*optional*|Apply visitor stitching rules to metrics|boolean|`"false"`|
|**Query**|**support**  <br>*optional*|Which platform that this metric can be used on.|< enum (oberon, dataWarehouse) > array(multi)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsMetric](#analyticsmetric)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="batchupdatedatagovernancesettingsforrsid"></a>
#### Batch modification of data governance settings for given metrics
```
PUT /metrics/datagovernance/batch
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**rsid**  <br>*optional*|rsid for metric.|string|


##### Body parameter
List of Data Governance settings objects to update.

*Name* : body  
*Flags* : optional  
*Type* : < [BatchDataGovernanceSettings](#batchdatagovernancesettings) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success status; all updates successfully completed.|< [BatchDataGovernanceSettings](#batchdatagovernancesettings) > array|
|**207**|Multiple status; partial success, some batch settings produced errors, see individual batch setting status for details.|< [BatchDataGovernanceSettings](#batchdatagovernancesettings) > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="getmetric"></a>
#### Returns a metric for the given report suite
```
GET /metrics/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The id of the metric for which to retrieve info. Note ids are values like pageviews, not metrics/pageviews|string||
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, usageSummaryWithRelevancyScore, hidden, noAccess, warning, curatedItems, isEntryOrExit, reportTimeAttribution, customerJourney, dataGovernance, aliasId) > array(multi)||
|**Query**|**includeHidden**  <br>*optional*|Whether to include variables that are hidden in the UI or that the user doesn't have permission to.|boolean|`"false"`|
|**Query**|**locale**  <br>*optional*|Locale that system named metrics should be returned in|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|ID of desired report suite ie. sistr2|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsMetric](#analyticsmetric)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="updatemetricdatagovernancesettings"></a>
#### Modification of metric data usage settings
```
PUT /metrics/{metricId}/datagovernance
```


##### Description
Updates a specific metric data governance settings.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**metricId**  <br>*required*|The id of the metric to modify its data governance settings.|string|
|**Query**|**rsid**  <br>*optional*|RSID to retrieve metric values for|string|


##### Body parameter
JSON containing a DataGovernanceSettings object

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="reports_resource"></a>
### Reports
Ranked reports service


<a name="runreport"></a>
#### Runs a report for the request in the post body
```
POST /reports
```


##### Description
See the [Reporting Interface wiki page](https://wiki.corp.adobe.com/display/scservices/Reporting+Interface) for details.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**includePlatformPredictiveObjects**  <br>*optional*|Controls if platform Predictive Objects should be returned in the response. Only available when using Anomaly Detection or Forecasting- DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**useCache**  <br>*optional*|Use caching for faster requests (Use cached dimensions to speed up permission checks - This does not do any report caching)|boolean|`"true"`|


##### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : [RankedRequest](#rankedrequest)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[RankedReportData](#rankedreportdata)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|[ReportErrorStatus](#reporterrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="runrankedreport"></a>
#### Runs a ranked report for the report in the post body
```
POST /reports/ranked
```


##### Description
See the [Reporting Interface wiki page](https://wiki.corp.adobe.com/display/scservices/Reporting+Interface) for details.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**includePlatformPredictiveObjects**  <br>*optional*|Controls if platform Predictive Objects should be returned in the response. Only available when using Anomaly Detection or Forecasting- DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**useCache**  <br>*optional*|Use caching for faster requests (Use cached dimensions to speed up permission checks - This does not do any report caching)|boolean|`"true"`|


##### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : [RankedRequest](#rankedrequest)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[RankedReportData](#rankedreportdata)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|[ReportErrorStatus](#reporterrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="runsegmentsummaryreport"></a>
#### Returns a segment summary report for the segment definition in the post body
```
POST /reports/segmentSummary
```


##### Description
Requires rsid and definition. Used to validate a segment definition and return basic reporting metrics for that definition. 


The response contains products that the definition is compatible with, as well as a series of totals that represent how many Page Views, Visits, and Visitors the segment includes.

Format for the order of Totals in response:


1) Number of Page Views that the segment includes for the given time period

2) Number of Visits that the segment includes for the given time period

3) Number of Unique Visitors that the segment includes for the given time period

4) Total number of Page Views for the time period (non-segmented)

5) Total number of Visits for the time period (non-segmented)

6) Total number of Unique Visitors for the time period (non-segmented)


The overall totals (3-6) can be used with the segment totals (1-3) to determine the percentage of the segment's audience for each metric.

Example definition for use in testing API below ("Page exists"):


```

{
	"func": "segment",
	"container": {
		"func": "container",
		"context": "hits",
		"pred": {
			"func": "exists",
			"description": "Page",
			"val": {
				"func": "attr",
				"name": "variables/page"
			}
		}
	},
	"version": [1, 0, 0]
}


```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**dateRange**  <br>*optional*|Format: YYYY-MM-DD/YYYY-MM-DD|string||
|**Query**|**endDate**  <br>*optional*|Format: YYYY-MM-DD|string||
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**includeVisitorsMcvisid**  <br>*optional*|Controls if Visitors with Marketing Cloud ID should be returned in the response|enum (true, false)|`"false"`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|RSID to run the report against|string||
|**Query**|**startDate**  <br>*optional*|Format: YYYY-MM-DD|string||


##### Body parameter
Segment definition

*Name* : body  
*Flags* : required  
*Type* : string


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SegmentSummaryResponse](#segmentsummaryresponse)|
|**400**|Bad JSON input; request not formatted correctly|No Content|
|**403**|User does not have access to run this report|No Content|
|**500**|Unexpected error; failed to run report|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="runtopitemsreport"></a>
#### Returns a top items report for the given dimension
```
GET /reports/topItems
```


##### Description
Get the top X items (based on paging restriction) for the specified dimension and rsid. Defaults to last 90 days.

Search Clause examples:
contains test: 'test'

 contains test or test1: 'test' OR 'test1'

contains test and test1: 'test' AND 'test1'

contains test and not (test1 or test2): 'test' AND NOT ('test1' OR 'test2')

does not contain test: NOT 'test'


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**dateRange**  <br>*optional*|Format: YYYY-MM-DD/YYYY-MM-DD|string||
|**Query**|**dimension**  <br>*required*|Dimension to run the report against. Example: "variables/page"|string||
|**Query**|**endDate**  <br>*optional*|Format: YYYY-MM-DD|string||
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**rsid**  <br>*required*|RSID to run the report against|string||
|**Query**|**search-clause**  <br>*optional*|General search string; wrap with single quotes. Example: 'PageABC'|string||
|**Query**|**searchAnd**  <br>*optional*|Search terms that will be AND-ed together. Space delimited.|string||
|**Query**|**searchNot**  <br>*optional*|Search terms that will be treated as NOT including. Space delimited.|string||
|**Query**|**searchOr**  <br>*optional*|Search terms that will be OR-ed together. Space delimited.|string||
|**Query**|**searchPhrase**  <br>*optional*|A full search phrase that will be searched for.|string||
|**Query**|**startDate**  <br>*optional*|Format: YYYY-MM-DD|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[UnhashReportData](#unhashreportdata)|
|**403**|User does not have access to run this report|No Content|
|**500**|Unexpected error; failed to run report|No Content|


##### Produces

* `application/json`


<a name="reportsuites_resource"></a>
### Reportsuites

<a name="findall"></a>
#### Retrieves report suites that match the given filters.
```
GET /reportsuites
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**cached**  <br>*optional*|return cached results|enum (true, false)|`"true"`|
|**Query**|**companyName**  <br>*optional*|Filter list to only include suites associated to the company with this companyName.  This parameter is only allowed with service tokens.|string||
|**Query**|**enabledSolutions**  <br>*optional*|Filter reportsuites by enabled solutions. Comma deliminated list of solution names|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional project metadata fields to include on response.|< enum (advancedSettings, tnt, calendarType, reportSuiteName, type, active, baseUrl, defaultPage, currency, calendarAnchorDate, timezone, axleConfig, currentTimezoneOffset, numGroups, isBlocked, discoverUiEnabled, mcAssociations, mcAudiences, mcEstimatedClusters, imsOrgIdsFromRelatedCompanies, relatedCompanies, timezoneZoneinfo, dataCurrentAsOf, enabledSolutions, billingCustomerId, timestampSupport, localizationSupported, globalSettings, taxonomist, adCloudConfiguration, stitchingEnabled, customFilterGroups, dataRetentionSettings) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**mcAssociatedImsOrgId**  <br>*optional*|Filter list to only include suites that are associated with the IMS Org ID specified in mcAssociatedImsOrgId|string||
|**Query**|**mcAssociations**  <br>*optional*|Filter list to include or exclude suites that have MC Associations.|enum (include, exclude)||
|**Query**|**mcAudiences**  <br>*optional*|Filter list to include or exclude suites that are configured for MC Audiences.|enum (include, exclude)||
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**permission**  <br>*optional*|Filter list to only include suites that have this permission.|string||
|**Query**|**relevantOnly**  <br>*optional*|Return only report suites that are considered recent.|enum (true, false)|`"false"`|
|**Query**|**rsidContains**  <br>*optional*|Filter list to only include suites whose rsid contains rsidContains.|string||
|**Query**|**rsidOrNameContains**  <br>*optional*|Filter list to only include suites whose rsid or report suite name contains rsidOrNameContains.|string||
|**Query**|**rsids**  <br>*optional*|Filter list to only include suites in this RSID list (comma-delimited)|string||
|**Query**|**types**  <br>*optional*|Comma-delimited list of types of report suites to return.  No selection returns all types.|< enum (base, asi, rollup) > array(multi)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsReportSuite](#analyticsreportsuite)|
|**500**|Unexpected error; report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="batchupdatereportsuitedatausagesettings"></a>
#### Modification in batch of report suite data usage settings.
```
PUT /reportsuites/datausagesettings/batch
```


##### Body parameter
JSON-formatted Object containing report suite data usage settings to be updated.

*Name* : body  
*Flags* : optional  
*Type* : < [BatchReportSuiteDataUsageSettings](#batchreportsuitedatausagesettings) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success status; all updates successfully completed.|< [BatchReportSuiteDataUsageSettings](#batchreportsuitedatausagesettings) > array|
|**207**|Multiple status; partial success, some batch settings produced errors, see indivual batch setting status for details.|< [BatchReportSuiteDataUsageSettings](#batchreportsuitedatausagesettings) > array|
|**500**|Unexpected error occurred while performing the batch update.|[ErrorStatus](#errorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findone"></a>
#### Retrieves report suite information for a single report suite.
```
GET /reportsuites/{rsid}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to return|string|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional attributes to include on response.|< enum (advancedSettings, tnt, calendarType, reportSuiteName, type, active, baseUrl, defaultPage, currency, calendarAnchorDate, timezone, axleConfig, currentTimezoneOffset, numGroups, isBlocked, discoverUiEnabled, mcAssociations, mcAudiences, mcEstimatedClusters, imsOrgIdsFromRelatedCompanies, relatedCompanies, timezoneZoneinfo, dataCurrentAsOf, enabledSolutions, billingCustomerId, timestampSupport, localizationSupported, globalSettings, taxonomist, adCloudConfiguration, stitchingEnabled, customFilterGroups, dataRetentionSettings) > array(multi)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsReportSuite](#analyticsreportsuite)|
|**500**|Unexpected error; report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="updatereportsuite"></a>
#### Updates report suite settings for the passed RSID.
```
PUT /reportsuites/{rsid}
```


##### Description
Only accepts pre-defined fields that are designated as editable; see sample JSON for field list


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid to be updated|string|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional attributes to include on response.|< enum (advancedSettings, tnt, calendarType, reportSuiteName, type, active, baseUrl, defaultPage, currency, calendarAnchorDate, timezone, axleConfig, currentTimezoneOffset, numGroups, isBlocked, discoverUiEnabled, mcAssociations, mcAudiences, mcEstimatedClusters, imsOrgIdsFromRelatedCompanies, relatedCompanies, timezoneZoneinfo, dataCurrentAsOf, enabledSolutions, billingCustomerId, timestampSupport, localizationSupported, globalSettings, taxonomist, adCloudConfiguration, stitchingEnabled, customFilterGroups, dataRetentionSettings) > array(multi)|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsReportSuite](#analyticsreportsuite)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsReportSuite](#analyticsreportsuite)|
|**500**|Unexpected error; update of reportsuite failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="resetcache"></a>
#### DEPRECATED - we will be removing this end point in the near future - use /collections/suites/cacheReset instead
```
GET /reportsuites/{rsid}/cacheReset
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|RSID to reset caches for|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|boolean|


##### Produces

* `application/json`


<a name="findcalendartype"></a>
#### Retrieves calendar type for a single report suite.
```
GET /reportsuites/{rsid}/calendartype
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|rsid|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[CalendarType](#calendartype)|
|**500**|Unexpected error; retrieval of segment publishing configuration failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="createreportsuitedatausagesettings"></a>
#### Creation of report suite data usage settings.
```
POST /reportsuites/{rsid}/datausagesettings
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to create the data usage settings for|string|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [ReportSuiteDataUsageSettings](#reportsuitedatausagesettings)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ReportSuiteDataUsageSettings](#reportsuitedatausagesettings)|
|**500**|Unexpected server error|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findreportsuitedatausagesettings"></a>
#### Retrival of report suite data usage settings.
```
GET /reportsuites/{rsid}/datausagesettings
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the report suite to retrieve the data usage settings for|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ReportSuiteDataUsageSettings](#reportsuitedatausagesettings)|
|**500**|Unexpected error while fetching the specified data usage settings|No Content|


##### Produces

* `application/json`


<a name="updatereportsuitedatausagesettings"></a>
#### Modification of report suite data usage settings.
```
PUT /reportsuites/{rsid}/datausagesettings
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to update the data usage settings for|string|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [ReportSuiteDataUsageSettings](#reportsuitedatausagesettings)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ReportSuiteDataUsageSettings](#reportsuitedatausagesettings)|
|**500**|Unexpected server error while updating the report suite data settings|[ErrorStatus](#errorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="removereportsuitedatausagesettings"></a>
#### Deletion of report suite data usage settings.
```
DELETE /reportsuites/{rsid}/datausagesettings
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to update the data usage settings for|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ReportSuiteDataUsageSettings](#reportsuitedatausagesettings)|
|**500**|Unexpected server error while removing the specified data usage settings|[ErrorStatus](#errorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="createsegmentpublishinginfo"></a>
#### Creates a report suite segment publishing configuration for the user's company.
```
POST /reportsuites/{rsid}/segmentpublishing
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid to create a segment publishing configuration for|string|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [SegmentPublishingConfig](#segmentpublishingconfig)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SegmentPublishingConfig](#segmentpublishingconfig)|
|**500**|Unexpected error; update of segment publishing configuration failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="findsegmentpublishingconfig"></a>
#### Retrieves the specified report suite's segment publishing configuration for the user's company.
```
GET /reportsuites/{rsid}/segmentpublishing
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid to retrieve segment publishing configuration for|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SegmentPublishingConfig](#segmentpublishingconfig)|
|**500**|Unexpected error; retrieval of segment publishing configuration failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="updatesegmentpublishinginfo"></a>
#### Updates a report suite's segment publishing configuration for the user's company.
```
PUT /reportsuites/{rsid}/segmentpublishing
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to update segment publishing configuration for|string|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [SegmentPublishingConfig](#segmentpublishingconfig)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SegmentPublishingConfig](#segmentpublishingconfig)|
|**500**|Unexpected error; update of segment publishing configuration failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="deletesegmentpublisingconfig"></a>
#### Deletes a report suite's segment publishing configuration for the user's company.
```
DELETE /reportsuites/{rsid}/segmentpublishing
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid or numericRsid of the suite to return|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SegmentPublishingConfig](#segmentpublishingconfig)|
|**500**|Unexpected error; delete of segment publishing configuration failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="gettntconfig"></a>
#### Retrieves the TNT configuration for a single report suite.
```
GET /reportsuites/{rsid}/tnt
```


##### Description
tntExpireType values:<br>&nbsp&nbsp&nbsp&nbsp&nbsp0  = Visit<br>&nbsp&nbsp&nbsp&nbsp&nbsp1  = Page View<br>&nbsp&nbsp&nbsp&nbsp&nbsp2  = Never<br>&nbsp&nbsp&nbsp&nbsp&nbsp3  = Minute<br>&nbsp&nbsp&nbsp&nbsp&nbsp4  = Hour<br>&nbsp&nbsp&nbsp&nbsp&nbsp5  = Day<br>&nbsp&nbsp&nbsp&nbsp&nbsp6  = Week<br>&nbsp&nbsp&nbsp&nbsp&nbsp7  = Month<br>&nbsp&nbsp&nbsp&nbsp&nbsp8  = Quarter<br>&nbsp&nbsp&nbsp&nbsp&nbsp9  = Year<br>&nbsp&nbsp&nbsp&nbsp&nbsp10 = Purchase<br>&nbsp&nbsp&nbsp&nbsp&nbsp11 = Product View<br>&nbsp&nbsp&nbsp&nbsp&nbsp12 = Cart Open<br>&nbsp&nbsp&nbsp&nbsp&nbsp13 = Cart Checkout<br>&nbsp&nbsp&nbsp&nbsp&nbsp14 = Cart Add<br>&nbsp&nbsp&nbsp&nbsp&nbsp15 = Cart Remove<br>&nbsp&nbsp&nbsp&nbsp&nbsp16 = Cart View<br>&nbsp&nbsp&nbsp&nbsp&nbsp17 = event1<br>&nbsp&nbsp&nbsp&nbsp&nbsp18 = event2<br>&nbsp&nbsp&nbsp&nbsp&nbsp19 = event3<br>&nbsp&nbsp&nbsp&nbsp&nbspetc...<br>&nbsp&nbsp&nbsp&nbsp&nbsp116 = event100<br>&nbsp&nbsp&nbsp&nbsp&nbsp<br>tntAllocationType values:<br>&nbsp&nbsp&nbsp&nbsp&nbsp0 = Full<br>&nbsp&nbsp&nbsp&nbsp&nbsp1 = Linear


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to retrieve TNT configuration for|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[TntConfig](#tntconfig)|
|**500**|Unexpected error; retrieving TNT configuration failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="updatetntconfig"></a>
#### Updates the tnt configuration for a single report suite.
```
PUT /reportsuites/{rsid}/tnt
```


##### Description
tntExpireType values:<br>&nbsp&nbsp&nbsp&nbsp&nbsp0  = Visit<br>&nbsp&nbsp&nbsp&nbsp&nbsp1  = Page View<br>&nbsp&nbsp&nbsp&nbsp&nbsp2  = Never<br>&nbsp&nbsp&nbsp&nbsp&nbsp3  = Minute<br>&nbsp&nbsp&nbsp&nbsp&nbsp4  = Hour<br>&nbsp&nbsp&nbsp&nbsp&nbsp5  = Day<br>&nbsp&nbsp&nbsp&nbsp&nbsp6  = Week<br>&nbsp&nbsp&nbsp&nbsp&nbsp7  = Month<br>&nbsp&nbsp&nbsp&nbsp&nbsp8  = Quarter<br>&nbsp&nbsp&nbsp&nbsp&nbsp9  = Year<br>&nbsp&nbsp&nbsp&nbsp&nbsp10 = Purchase<br>&nbsp&nbsp&nbsp&nbsp&nbsp11 = Product View<br>&nbsp&nbsp&nbsp&nbsp&nbsp12 = Cart Open<br>&nbsp&nbsp&nbsp&nbsp&nbsp13 = Cart Checkout<br>&nbsp&nbsp&nbsp&nbsp&nbsp14 = Cart Add<br>&nbsp&nbsp&nbsp&nbsp&nbsp15 = Cart Remove<br>&nbsp&nbsp&nbsp&nbsp&nbsp16 = Cart View<br>&nbsp&nbsp&nbsp&nbsp&nbsp17 = event1<br>&nbsp&nbsp&nbsp&nbsp&nbsp18 = event2<br>&nbsp&nbsp&nbsp&nbsp&nbsp19 = event3<br>&nbsp&nbsp&nbsp&nbsp&nbspetc...<br>&nbsp&nbsp&nbsp&nbsp&nbsp116 = event100<br>&nbsp&nbsp&nbsp&nbsp&nbsp<br>tntAllocationType values:<br>&nbsp&nbsp&nbsp&nbsp&nbsp0 = Full<br>&nbsp&nbsp&nbsp&nbsp&nbsp1 = Linear


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to update tnt configuration for|string|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [TntConfig](#tntconfig)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[TntConfig](#tntconfig)|
|**500**|Unexpected error; update of tnt configuration failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="segments_resource"></a>
### Segments
Operations on segments


<a name="createsegment"></a>
#### Creates a new segment
```
POST /segments
```


##### Description
Creates a new segment. The following attributes are available when creating a segment:<br><b>Required: name, definition, rsid</b><br>Optional: description, aamStatus<br><br>Note: "aamStatus" is used to "publish" a report suite segment to other products in the Marketing Cloud. Description is always required when publishing with aamStatus. The report suite must already be pre-configured for AAM for publishing to succeed (see the "/segments/aamStatus/" endpoint for more information). <br>Format for aamStatus object:<br>"aamStatus":{"published":["rsid1","rsid2"]}<br><br>Example definition for use in testing API below ("Page exists"):<br>"definition":{"func":"segment","container":{"func":"container","context":"hits","pred":{"func":"exists","description":"Page","val":{"func":"attr","name":"variables/page"}}},"version":[1,0,0]}<br><br><b><span style="text-decoration: underline;">SegmentResponse</span></b><br>A segment response will always include these default items:<br><b>id, name, description, rsid, owner</b><br>Other attributes can be optionally requested through the 'expansion' field as defined/documented in the GET endpoints (see GET "/segments" or GET "/segments/{id}" for more documentation).


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, dwInUse, asiInUse, aamStatus, legacyId, compatibility, definition, internal, dataGroup, reportTimeAttribution, customerJourney, virtualReportSuites) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs for segment creation.

*Name* : body  
*Flags* : optional  
*Type* : < string, object > map


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|No Content|
|**500**|External API error; Segment create or retrieval failed|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findall"></a>
#### Retrieves all segments, or paginated segments
```
GET /segments
```


##### Description
A segment response will always include these default items:<br><b>id,name,description,rsid,owner</b><br><br>Other attributes can be optionally requested through the 'expansion' field: <br><b>modified</b>: Date that the segment was last modified (ISO 8601)<br><b>definition</b>: Segment definition as JSON object<br><b>compatibility</b>: Products that the segment is compatible with<br><b>reportSuiteName</b>: Also return the friendly Report Suite name for the RSID<br><b>legacyId</b>: Legacy segment ID from old segment database (only exists if the segment was migrated from the old segment DB)<br><b>dwInUse</b>: True if the segment is currently in use in a DW request<br><b>asiInUse</b>: True if the segment is currently in use in an ASI slot<br><b>aamStatus</b>: Returns AAM/Raven publishing status (cross-product segment sharing)<br><b>favorite</b>: True if segment has been marked as a 'Favorite'<br><b>tags</b>: Gives all existing tags associated with the segment<br><b>approved</b>: True if segment has been marked as 'Approved'<br><b>shares</b>: Gives all existing shares for the segment<br><b>sharesFullName</b>: Give 'shares', but also include the shared-to user's friendly login name as 'shareToDisplayName' in each share object<br><b>ownerFullName</b>: Add friendly full login name (string) to the 'owner' object<br><b>isDeleted</b>: Returns whether or not the segment is 'Deleted' (note that deleted segments are only returned if requested by ID)


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**curatedRsid**  <br>*optional*|Include the curatedItem status for given Rsid|string||
|**Query**|**dataGroup**  <br>*optional*|Filter list to only include segments with the given data group|string||
|**Query**|**dataType**  <br>*optional*|Filter list to only include segments compatible with the specified product|enum (dw, oberon)||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, legacyId, compatibility, definition, internal, dataGroup, reportTimeAttribution, customerJourney) > array(multi)||
|**Query**|**filterByIds**  <br>*optional*|Filter list to only include segments in the specified list (comma-delimited list of IDs) (this is the same as segmentFilter, and is overwritten by segmentFilter|string||
|**Query**|**filterByModifiedAfter**  <br>*optional*|Filter list to only include segments modified since this date (ISO8601 format)|string||
|**Query**|**includeDeleted**  <br>*optional*|DEPRECATED use deleted includeType - Include disabled/deleted segments in the response. Note: also forces the 'isDeleted' expansion|enum (true, false)|`"false"`|
|**Query**|**includeType**  <br>*optional*|Include additional segments not owned by user. The "all" option takes precedence over "shared"|< enum (shared, all, templates, deleted, internal, curatedItem) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**name**  <br>*optional*|Filter list to only include segments that contains the Name|string||
|**Query**|**ownerId**  <br>*optional*|Filter list to only include segments owned by the specified loginId|integer (int32)||
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**pagination**  <br>*optional*|return paginated results|enum (true, false)|`"false"`|
|**Query**|**reportTimeAttribution**  <br>*optional*|Filter list to only include segments by reportTimeAttribution|boolean||
|**Query**|**rsids**  <br>*optional*|Filter list to only include segments tied to specified RSID list (comma-delimited)|string||
|**Query**|**segmentFilter**  <br>*optional*|Filter list to only include segments in the specified list (comma-delimited list of IDs)|string||
|**Query**|**tagNames**  <br>*optional*|Filter list to only include segments that contains one of the tags|string||
|**Query**|**toBeUsedInRsid**  <br>*optional*|Required when reportTimeAttribution != null or expansion=reportTimeAttribution|string||
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**400**|Unable to retrieve list of segments shared with user|No Content|
|**401**|Owner filter error; user specified is not in the same company as the requesting user|No Content|
|**403**|Requesting non-shared segments for other users is restricted to admin users|No Content|
|**500**|External API error; Segment retrieval failed|No Content|


##### Produces

* `application/json`


<a name="checkaamconfigured"></a>
#### Checks the passed report suite to see if it is configured to allow segment sharing
```
GET /segments/aamstatus
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**rsid**  <br>*required*|RSID to check status for|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|object|
|**500**|External API error; failed to check status for given RSID|No Content|


##### Produces

* `application/json`


<a name="migratesegment"></a>
#### Migrates a segment from account_segment to the new segment service
```
POST /segments/migrate
```


##### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : < string, object > map


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[JSONObject](#jsonobject)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="validatesegment"></a>
#### Returns a segment validation for the segment contained in the post body of the report.
```
POST /segments/validate
```


##### Description
Requires rsid and definition. Used to validate a segment definition. <br><br>The response contains products that the definition is compatible with.<br><br>Example definition for use in testing API below ("Page exists"):<br>{"func":"segment","container":{"func":"container","context":"hits","pred":{"func":"exists","description":"Page","val":{"func":"attr","name":"variables/page"}}},"version":[1,0,0]}


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**rsid**  <br>*required*|RSID to run the report against|string||
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Body parameter
Segment definition

*Name* : body  
*Flags* : required  
*Type* : string


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SegmentCompatibility](#segmentcompatibility)|
|**400**|Bad JSON input; request not formatted correctly|No Content|
|**500**|Unexpected error;|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findone"></a>
#### Retrieves a single segment by ID
```
GET /segments/{id}
```


##### Description
A segment response will always include these default items:<br><b>id,name,description,rsid,owner</b><br><br>Other attributes can be optionally requested through the 'expansion' field: <br><b>modified</b>: Date that the segment was last modified (ISO 8601)<br><b>definition</b>: Segment definition as JSON object<br><b>compatibility</b>: Products that the segment is compatible with<br><b>reportSuiteName</b>: Also return the friendly Report Suite name for the RSID<br><b>legacyId</b>: Legacy segment ID from old segment database (only exists if the segment was migrated from the old segment DB)<br><b>dwInUse</b>: True if the segment is currently in use in a DW request<br><b>asiInUse</b>: True if the segment is currently in use in an ASI slot<br><b>aamStatus</b>: Returns AAM/Raven publishing status (cross-product segment sharing)<br><b>favorite</b>: True if segment has been marked as a 'Favorite'<br><b>tags</b>: Gives all existing tags associated with the segment<br><b>approved</b>: True if segment has been marked as 'Approved'<br><b>shares</b>: Gives all existing shares for the segment<br><b>sharesFullName</b>: Give 'shares', but also include the shared-to user's friendly login name as 'shareToDisplayName' in each share object<br><b>ownerFullName</b>: Add friendly full login name (string) to the 'owner' object<br><b>isDeleted</b>: Returns whether or not the segment is 'Deleted' (note that deleted segments are only returned if requested by ID)


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The segment ID to retrieve|string|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, dwInUse, asiInUse, aamStatus, legacyId, compatibility, definition, internal, dataGroup, reportTimeAttribution, customerJourney, virtualReportSuites) > array(multi)|
|**Query**|**toBeUsedInRsid**  <br>*optional*|Evaluate the reportTimeAttribution/customerJourney compatibility for the passed report suite|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**403**|Requesting non-shared segments for other users is restricted to admin users|No Content|
|**500**|External API error; segment retrieval failed|No Content|


##### Produces

* `application/json`


<a name="updatesegment"></a>
#### Make changes or updates to an existing segment
```
PUT /segments/{id}
```


##### Description
The following fields can be modified through this endpoint: <br><b>name, description, definition, owner, rsid, aamStatus</b><br><br>Note: "aamStatus" is used to "publish" a report suite segment to other products in the Marketing Cloud. Description is always required when publishing with aamStatus. The report suite must already be pre-configured for AAM for publishing to succeed (see the "/segments/aamStatus/" endpoint for more information). <br>Format for aamStatus object:<br>"aamStatus":{"published":["rsid1","rsid2"]}<br><br>Example "defintion" for use in testing API below ("Page exists"):<br>"definition":{"func":"segment","container":{"func":"container","context":"hits","pred":{"func":"exists","description":"Page","val":{"func":"attr","name":"variables/page"}}},"version":[1,0,0]}<br><br>Response will be the newly modified segment object after the update request completes.<br><br><b><span style="text-decoration: underline;">SegmentResponse</span></b><br>A segment response will always include these default items:<br><b>id, name, description, rsid, owner</b><br>Other attributes can be optionally requested through the 'expansion' field as defined/documented in the GET endpoints (see GET "/segments" or GET "/segments/{id}" for more documentation).


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|Segment ID to be updated|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, migratedIds, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, dwInUse, asiInUse, aamStatus, legacyId, compatibility, definition, internal, dataGroup, reportTimeAttribution, customerJourney, virtualReportSuites) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : < string, object > map


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**400**|Definition must be formatted as a JSON Object|No Content|
|**401**|Company mismatch; segment ownership can only be transferred within the same organization|No Content|
|**403**|User does not have permission to update this segment|No Content|
|**500**|External API error; Segment update or retrieval failed|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="deletesegment"></a>
#### Delete a segment by ID
```
DELETE /segments/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The segment ID to be deleted|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|string|
|**500**|External API error; Segment delete failed|No Content|


##### Produces

* `application/json`


<a name="tags_resource"></a>
### Tags
Operations on tags


<a name="savetaglist"></a>
#### Saves the given tag(s) for the current user's company
```
POST /tags
```


##### Description
Allows creation of a new tag and applies that new tag to the passed component


##### Body parameter
JSON-formatted array of Tag objects containing key-value pairs

*Name* : body  
*Flags* : optional  
*Type* : < [Tag](#tag) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Tag](#tag) > array|
|**500**|Unable to save list of tags.|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findallforcompany"></a>
#### Returns a list of tags for the current user's company
```
GET /tags
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Tag](#tag) > array|
|**500**|Unable to retrieve list of tags for user.|No Content|


##### Produces

* `application/json`


<a name="deletetagitems"></a>
#### Disassociates all tags from the given components
```
DELETE /tags
```


##### Description
Removes all tags from the passed componentIds. Note that currently this is done in a single DB query, so there is a single combined response for the entire operation.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentIds**  <br>*required*|Comma-separated list of componentIds to operate on.|string|
|**Query**|**componentType**  <br>*required*|The component type to operate on.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**400**|Invalid component type.|No Content|
|**500**|Unable to remove tags for given components.|No Content|


##### Produces

* `application/json`


<a name="gettaglistbycomponentidandcomponenttype"></a>
#### Retrieves a tags for a given component by componentId and componentType
```
GET /tags/search
```


##### Description
Given a componentId, return all tags associated with that component


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentId**  <br>*required*|The componentId to operate on. Currently this is just the segmentId.|string|
|**Query**|**componentType**  <br>*required*|The component type to operate on.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Tag](#tag) > array|
|**400**|Invalid component type.|No Content|
|**500**|Unable to retrieve tags for given component.|No Content|


##### Produces

* `application/json`


<a name="savetagcomponentlist"></a>
#### Tag a component with one or many tags at once. WARNING: Authoritative; deletes/overwrites all pre-existing associations
```
PUT /tags/tagitems
```


##### Description
This endpoint allows many tags at once to be created/deleted. Any tags passed to this endpoint will become the *only* tags for that componentId (all other tags will be removed).


##### Body parameter
JSON-formatted object containing key-value pairs that conform to the schema

*Name* : body  
*Flags* : optional  
*Type* : < [TaggedComponent](#taggedcomponent) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [TaggedComponent](#taggedcomponent) > array|
|**500**|Unable to save tag list.|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="gettagbyid"></a>
#### Retrieves an tag by its id
```
GET /tags/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|Tag ID to be retrieved|integer (int32)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Tag](#tag)|
|**404**|Unable to find a tag with the given ID|No Content|
|**500**|Unexpected server error while trying to retrieve tag|No Content|


##### Produces

* `application/json`


<a name="deletetag"></a>
#### Removes the tagId and all associations from that tag to any components
```
DELETE /tags/{id}
```


##### Description
Delete by tagId. Will un-tag any/all components that were associated with the passed tagId.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The tagId to be deleted|integer (int32)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**404**|The given tagId does not exist|No Content|
|**500**|Unable to delete the given tagId.|No Content|


##### Produces

* `application/json`


<a name="timezones_resource"></a>
### Timezones
Timezone Operations


<a name="gettimezones"></a>
#### Retrieves timezones with ID.
```
GET /timezones
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< object > array|
|**500**|Unexpected error; timezone retrieval failed|No Content|


##### Produces

* `application/json`


<a name="virtualreportsuites_resource"></a>
### Virtualreportsuites
Operations on virtual report suites


<a name="createvirtualreportsuite"></a>
#### Creates a new virtual report suite
```
POST /virtualreportsuites
```


##### Description
Creates a virtual report suite. The following attributes are available when creating a virtual report suite:<br><b>Required: name, parentRsid, and segmentList</b><br>


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, numGroups, userGroups, dataCurrentAsOf, compatibility, dataSchema, darkSessionsEnabled, sessionDefinition, curatedComponents) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs for virtual report suite creation.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|
|**400**|Invalid input; name, parentRsid, segmentList, and timezone  are all required.|No Content|
|**500**|External API error; Virtual report suite create or retrieval failed|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="getvirtualreportsuites"></a>
#### Retrieves virtual report suites for the given company ID.
```
GET /virtualreportsuites
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**cached**  <br>*optional*|return cached results|enum (true, false)|`"true"`|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, numGroups, userGroups, dataCurrentAsOf, compatibility, dataSchema, darkSessionsEnabled, sessionDefinition, curatedComponents) > array(multi)||
|**Query**|**filterByModifiedAfter**  <br>*optional*|Filter list to only include virtual report suites modified since this date (ISO8601 format)|string||
|**Query**|**idContains**  <br>*optional*|Filter list to only include suites whose id contains idContains.|string||
|**Query**|**includeType**  <br>*optional*|Include report suites with the following parameters in the return list.  Including blocked requires a single companyId in the companyIds query param|< enum (deleted) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**relevantOnly**  <br>*optional*|Return only report suites that are considered recent.|enum (true, false)|`"false"`|
|**Query**|**rsids**  <br>*optional*|Filter list to only include suites in this RSID list (comma-delimited)|string||
|**Query**|**types**  <br>*optional*|Comma-delimited list of types of virtual report suites to return.  No selection returns all types.|< enum (vrs, advancedVrs) > array(multi)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|
|**500**|Unexpected error; virtual report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="validatevirtualreportsuite"></a>
#### Validates a virtual report suite
```
POST /virtualreportsuites/validate
```


##### Description
Validates a virtual report suite.


##### Body parameter
JSON-formatted Object containing key/value pairs for virtual report suite creation.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVRSCompatibility](#analyticsvrscompatibility)|
|**400**|Invalid input.|No Content|
|**500**|External API error; Virtual report suite validation failed|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="getvirtualreportsuite"></a>
#### Retrieves a single virtual report suite by ID.
```
GET /virtualreportsuites/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The vrsid to retrieve|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, numGroups, userGroups, dataCurrentAsOf, compatibility, dataSchema, darkSessionsEnabled, sessionDefinition, curatedComponents) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|
|**500**|Unexpected error; virtual report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="updatevirtualreportsuite"></a>
#### Updates configuration for a virtual report suite.
```
PUT /virtualreportsuites/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The vrsid to update|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, numGroups, userGroups, dataCurrentAsOf, compatibility, dataSchema, darkSessionsEnabled, sessionDefinition, curatedComponents) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing virtual report suite keys/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|


##### Produces

* `application/json`


<a name="deletevirtualreportsuite"></a>
#### Delete a virtual report suite by ID
```
DELETE /virtualreportsuites/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The virtual report suite ID to be deleted|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**permanent**  <br>*optional*|Permanently delete the virtual report suite (Not allowed in Beta or Production environments)|boolean|`"false"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[DeleteResponse](#deleteresponse)|
|**500**|External API error; Virtual report suite delete failed|No Content|


##### Produces

* `application/json`



