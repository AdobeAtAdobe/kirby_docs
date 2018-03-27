
<a name="definitions"></a>
## Definitions

<a name="adcloudconfiguration"></a>
### AdCloudConfiguration

|Name|Schema|
|---|---|
|**dataSourcesId**  <br>*optional*|integer (int32)|


<a name="alternatevariablenames"></a>
### AlternateVariableNames

|Name|Schema|
|---|---|
|**baseName**  <br>*optional*|string|
|**curatedName**  <br>*optional*|string|
|**name**  <br>*optional*|string|


<a name="analyticscalculatedmetric"></a>
### AnalyticsCalculatedMetric

|Name|Description|Schema|
|---|---|---|
|**alternateVariableNames**  <br>*optional*||[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*||boolean|
|**authorization**  <br>*optional*||[CalculatedMetricAuthorization](#calculatedmetricauthorization)|
|**compatibility**  <br>*optional*||[CalcMetricCompatibility](#calcmetriccompatibility)|
|**created**  <br>*optional*  <br>*read-only*|Calculated metric creation date|string (date-time)|
|**curatedItem**  <br>*optional*||boolean|
|**dataGroup**  <br>*optional*||string|
|**definition**  <br>*required*|Calculated metric definition object|[CalculatedMetricDef](#calculatedmetricdef)|
|**description**  <br>*optional*||string|
|**favorite**  <br>*optional*||boolean|
|**id**  <br>*optional*  <br>*read-only*|System generated id|string|
|**internal**  <br>*optional*||boolean|
|**isDeleted**  <br>*optional*||boolean|
|**legacyId**  <br>*optional*||string|
|**migratedIds**  <br>*optional*||< string > array|
|**modified**  <br>*optional*||string (date-time)|
|**name**  <br>*optional*||string|
|**owner**  <br>*optional*||[Owner](#owner)|
|**polarity**  <br>*optional*|Set metric polarity, which indicates whether it's good or bad if a given metric goes up. Default=positive|enum (positive, negative)|
|**precision**  <br>*optional*|Number of decimal places to include in calculated metric result|integer (int32)|
|**reportSuiteName**  <br>*optional*  <br>*read-only*|The report suite name for which the component was created/updated|string|
|**reportTimeAttribution**  <br>*optional*||boolean|
|**rsid**  <br>*optional*|The report suite id for which the component was created/updated|string|
|**shares**  <br>*optional*||< [Share](#share) > array|
|**siteTitle**  <br>*optional*||string|
|**solution**  <br>*optional*||boolean|
|**tags**  <br>*optional*||< [Tag](#tag) > array|
|**template**  <br>*optional*||boolean|
|**type**  <br>*optional*||enum (CURRENCY, TIME, DECIMAL, PERCENT)|
|**usageSummary**  <br>*optional*||[SummarizedUsageItem](#summarizedusageitem)|


<a name="analyticscuratedcomponent"></a>
### AnalyticsCuratedComponent

|Name|Schema|
|---|---|
|**componentId**  <br>*required*|string|
|**componentType**  <br>*optional*|string|
|**curatedName**  <br>*optional*|string|


<a name="analyticsdatagovernancelabels"></a>
### AnalyticsDataGovernanceLabels

|Name|Schema|
|---|---|
|**defaultLabels**  <br>*optional*|< string > array|
|**editable**  <br>*optional*|boolean|
|**labels**  <br>*optional*|< string > array|
|**useDefault**  <br>*optional*|boolean|


<a name="analyticsdatagovernancesettings"></a>
### AnalyticsDataGovernanceSettings

|Name|Schema|
|---|---|
|**auth**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**gdpr**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**identifiability**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**sensitivity**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|


<a name="analyticsdaterange"></a>
### AnalyticsDateRange

|Name|Description|Schema|
|---|---|---|
|**alternateVariableNames**  <br>*optional*||[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*||boolean|
|**created**  <br>*optional*||string (date-time)|
|**curatedItem**  <br>*optional*||boolean|
|**definition**  <br>*optional*||object|
|**description**  <br>*optional*||string|
|**favorite**  <br>*optional*||boolean|
|**id**  <br>*optional*  <br>*read-only*|System generated id|string|
|**internal**  <br>*optional*||boolean|
|**isDeleted**  <br>*optional*||boolean|
|**migratedIds**  <br>*optional*||< string > array|
|**modified**  <br>*optional*||string (date-time)|
|**name**  <br>*optional*||string|
|**owner**  <br>*optional*||[Owner](#owner)|
|**reportSuiteName**  <br>*optional*  <br>*read-only*|The report suite name for which the component was created/updated|string|
|**rsid**  <br>*optional*|The report suite id for which the component was created/updated|string|
|**shares**  <br>*optional*||< [Share](#share) > array|
|**siteTitle**  <br>*optional*||string|
|**tags**  <br>*optional*||< [Tag](#tag) > array|
|**template**  <br>*optional*||boolean|
|**usageSummary**  <br>*optional*||[SummarizedUsageItem](#summarizedusageitem)|


<a name="analyticsdaterangedefinition"></a>
### AnalyticsDateRangeDefinition

|Name|Schema|
|---|---|
|**calendarType**  <br>*optional*|[CalendarType](#calendartype)|
|**end**  <br>*optional*|< [RollingDateFunction](#rollingdatefunction) > array|
|**start**  <br>*optional*|< [RollingDateFunction](#rollingdatefunction) > array|
|**version**  <br>*optional*|string|


<a name="analyticsdaterangeinterval"></a>
### AnalyticsDateRangeInterval

|Name|Schema|
|---|---|
|**end**  <br>*optional*|string|
|**name**  <br>*optional*|string|
|**start**  <br>*optional*|string|


<a name="analyticsdimension"></a>
### AnalyticsDimension

|Name|Schema|
|---|---|
|**aliasId**  <br>*optional*|string|
|**alternateVariableNames**  <br>*optional*|[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*|boolean|
|**category**  <br>*optional*|string|
|**curatedItem**  <br>*optional*|boolean|
|**customerJourney**  <br>*optional*|boolean|
|**dataGovernance**  <br>*optional*|[AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)|
|**dataGroup**  <br>*optional*|string|
|**description**  <br>*optional*|string|
|**extraTitleInfo**  <br>*optional*|string|
|**favorite**  <br>*optional*|boolean|
|**fragRelId**  <br>*optional*|string|
|**hidden**  <br>*optional*|boolean|
|**id**  <br>*optional*|string|
|**isEntryOrExit**  <br>*optional*|boolean|
|**name**  <br>*optional*|string|
|**noAccess**  <br>*optional*|boolean|
|**parent**  <br>*optional*|string|
|**pathable**  <br>*optional*|boolean|
|**reportTimeAttribution**  <br>*optional*|boolean|
|**reportable**  <br>*optional*|< string > array|
|**segmentable**  <br>*optional*|boolean|
|**shares**  <br>*optional*|< [Share](#share) > array|
|**support**  <br>*optional*|< string > array|
|**tags**  <br>*optional*|< [Tag](#tag) > array|
|**title**  <br>*optional*|string|
|**type**  <br>*optional*|enum (STRING, INT, DECIMAL, CURRENCY, PERCENT, TIME, ENUM, ORDERED_ENUM)|
|**usageSummary**  <br>*optional*|[SummarizedUsageItem](#summarizedusageitem)|


<a name="analyticsmcassociation"></a>
### AnalyticsMcAssociation

|Name|Schema|
|---|---|
|**createTimestamp**  <br>*optional*|string (date-time)|
|**createUser**  <br>*optional*|string|
|**createdBySystem**  <br>*optional*|boolean|
|**dataCenter**  <br>*optional*|string|
|**dataSourceId**  <br>*optional*|integer (int32)|
|**imsOrgId**  <br>*optional*|string|
|**partnerId**  <br>*optional*|integer (int32)|
|**rsid**  <br>*optional*|string|
|**updateTimestamp**  <br>*optional*|string (date-time)|


<a name="analyticsmcaudiences"></a>
### AnalyticsMcAudiences

|Name|Schema|
|---|---|
|**enabled**  <br>*optional*|boolean|


<a name="analyticsmcclusterconfiguration"></a>
### AnalyticsMcClusterConfiguration

|Name|Description|Schema|
|---|---|---|
|**dataSourceId**  <br>*optional*|the dpid|string|


<a name="analyticsmcestimatedclusters"></a>
### AnalyticsMcEstimatedClusters

|Name|Schema|
|---|---|
|**coopEnabled**  <br>*optional*|boolean|
|**estimatedPeople**  <br>*optional*|[AnalyticsMcClusterConfiguration](#analyticsmcclusterconfiguration)|
|**mcAssociation**  <br>*optional*|[AnalyticsMcAssociation](#analyticsmcassociation)|
|**rsid**  <br>*optional*|string|


<a name="analyticsmetric"></a>
### AnalyticsMetric

|Name|Schema|
|---|---|
|**aliasId**  <br>*optional*|string|
|**allocation**  <br>*optional*|boolean|
|**alternateVariableNames**  <br>*optional*|[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*|boolean|
|**calculated**  <br>*optional*|boolean|
|**category**  <br>*optional*|string|
|**curatedItem**  <br>*optional*|boolean|
|**customerJourney**  <br>*optional*|boolean|
|**dataGovernance**  <br>*optional*|[AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)|
|**dataGroup**  <br>*optional*|string|
|**description**  <br>*optional*|string|
|**extraTitleInfo**  <br>*optional*|string|
|**favorite**  <br>*optional*|boolean|
|**helpLink**  <br>*optional*|string|
|**hidden**  <br>*optional*|boolean|
|**id**  <br>*optional*|string|
|**metricViews**  <br>*optional*|< [AnalyticsMetricView](#analyticsmetricview) > array|
|**name**  <br>*optional*|string|
|**noAccess**  <br>*optional*|boolean|
|**polarity**  <br>*optional*|enum (positive, negative)|
|**precision**  <br>*optional*|integer (int32)|
|**reportTimeAttribution**  <br>*optional*|boolean|
|**segmentable**  <br>*optional*|boolean|
|**shares**  <br>*optional*|< [Share](#share) > array|
|**support**  <br>*optional*|< string > array|
|**tags**  <br>*optional*|< [Tag](#tag) > array|
|**title**  <br>*optional*|string|
|**type**  <br>*optional*|enum (STRING, INT, DECIMAL, CURRENCY, PERCENT, TIME, ENUM, ORDERED_ENUM)|
|**usageSummary**  <br>*optional*|[SummarizedUsageItem](#summarizedusageitem)|
|**visibility**  <br>*optional*|enum (visibleEverywhere, builderOnly, hiddenEverywhere)|
|**warning**  <br>*optional*|[MetricsWarning](#metricswarning)|


<a name="analyticsmetricview"></a>
### AnalyticsMetricView

|Name|Schema|
|---|---|
|**description**  <br>*optional*|string|
|**id**  <br>*optional*|string|
|**name**  <br>*optional*|string|


<a name="analyticsreportsuite"></a>
### AnalyticsReportSuite

|Name|Schema|
|---|---|
|**aamServerSideForwarding**  <br>*optional*|boolean|
|**active**  <br>*optional*|boolean|
|**activeDpc**  <br>*optional*|string|
|**adCloudConfiguration**  <br>*optional*|[AdCloudConfiguration](#adcloudconfiguration)|
|**axleConfig**  <br>*optional*|[ReportSuiteAxleConfig](#reportsuiteaxleconfig)|
|**baseUrl**  <br>*optional*|string|
|**billingCustomerId**  <br>*optional*|integer (int32)|
|**calendarAnchorDate**  <br>*optional*|string (date-time)|
|**calendarType**  <br>*optional*|[CalendarType](#calendartype)|
|**companyId**  <br>*optional*|integer (int32)|
|**currency**  <br>*optional*|string|
|**currentTimezoneOffset**  <br>*optional*|number (float)|
|**customFilterGroups**  <br>*optional*|< [CustomReportSuiteFilterGroup](#customreportsuitefiltergroup) > array|
|**dataCurrentAsOf**  <br>*optional*|string (date-time)|
|**dataRetentionSettings**  <br>*optional*|[AnalyticsReportSuiteDataRetentionSettings](#analyticsreportsuitedataretentionsettings)|
|**dataSchema**  <br>*optional*|string|
|**defaultPage**  <br>*optional*|string|
|**discoverUiEnabled**  <br>*optional*|boolean|
|**enabledSolutions**  <br>*optional*|< string > array|
|**imsOrgIdsFromRelatedCompanies**  <br>*optional*|[ImsOrgIdsFromRelatedCompanies](#imsorgidsfromrelatedcompanies)|
|**ipObfuscationEnabled**  <br>*optional*|boolean|
|**isBlocked**  <br>*optional*|boolean|
|**isDeleted**  <br>*optional*|boolean|
|**lastModified**  <br>*optional*|string (date-time)|
|**localizationEnabled**  <br>*optional*|boolean|
|**mcAssociation**  <br>*optional*|[AnalyticsMcAssociation](#analyticsmcassociation)|
|**mcAudiences**  <br>*optional*|[AnalyticsMcAudiences](#analyticsmcaudiences)|
|**mcEstimatedClusters**  <br>*optional*|[AnalyticsMcEstimatedClusters](#analyticsmcestimatedclusters)|
|**numGroups**  <br>*optional*|integer (int32)|
|**numericRsid**  <br>*optional*|integer (int32)|
|**organization**  <br>*optional*|integer (int32)|
|**parentRsid**  <br>*optional*|string|
|**references**  <br>*optional*|[ReportSuiteHateoasReferences](#reportsuitehateoasreferences)|
|**relatedCompanies**  <br>*optional*|< [RelatedCompany](#relatedcompany) > array|
|**reportSuiteName**  <br>*optional*|string|
|**rsid**  <br>*optional*|string|
|**saveAamIdValues**  <br>*optional*|boolean|
|**signedUpDate**  <br>*optional*|string (date-time)|
|**signedUpOurTime**  <br>*optional*|string (date-time)|
|**stitchingEnabled**  <br>*optional*|boolean|
|**taxonomist**  <br>*optional*|boolean|
|**timestampSupport**  <br>*optional*|enum (NOT_ALLOWED, REQUIRED, ROLLUP, OPTIONAL)|
|**timezone**  <br>*optional*|integer (int32)|
|**timezoneZoneinfo**  <br>*optional*|string|
|**tntConfig**  <br>*optional*|[TntConfig](#tntconfig)|
|**type**  <br>*optional*|string|


<a name="analyticsreportsuitedataretentionsettings"></a>
### AnalyticsReportSuiteDataRetentionSettings

|Name|Schema|
|---|---|
|**fragKeyMonths**  <br>*optional*|integer (int32)|
|**fragMonths**  <br>*optional*|integer (int32)|
|**fragNonKeyMonths**  <br>*optional*|integer (int32)|
|**fragSubRelMonths**  <br>*optional*|integer (int32)|
|**getdWMonths**  <br>*optional*|integer (int32)|
|**retentionMessage**  <br>*optional*|string|
|**retentionStatus**  <br>*optional*|string|


<a name="analyticssegmentresponseitem"></a>
### AnalyticsSegmentResponseItem

|Name|Description|Schema|
|---|---|---|
|**aamStatus**  <br>*optional*|AAM/Raven publishing status (cross-product segment sharing). A segment can be published to AAM, and this flag indicates whether the segment has been published to AAM.|< string, object > map|
|**alternateVariableNames**  <br>*optional*||[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*|Whether or not the segment has been marked approved.|boolean|
|**asiInUse**  <br>*optional*|Whether or not the segment currently in use in an ASI (old version of VSR) slot.|boolean|
|**compatibility**  <br>*optional*|Analytics products that the segment is compatible with|< string, object > map|
|**created**  <br>*optional*||string (date-time)|
|**curatedItem**  <br>*optional*||boolean|
|**customerJourney**  <br>*optional*||boolean|
|**dataGroup**  <br>*optional*|The data group of the segment|string|
|**definition**  <br>*optional*|The segment definition as a JSON object|< string, object > map|
|**description**  <br>*optional*|A description of the segment.|string|
|**dwInUse**  <br>*optional*|Whether or not the segment currently in use in a Data Warehouse request. A Data Warehouse request is another type of report that clients can run based on their raw data|boolean|
|**favorite**  <br>*optional*|Whether or not the segment has been marked as a favorite.|boolean|
|**id**  <br>*optional*|Id of the segment.|string|
|**internal**  <br>*optional*|Whether or not the segment is internal. Internal means that the segment is used by the product but not exposed to the customers|boolean|
|**isDeleted**  <br>*optional*|Whether or not the segment is 'Deleted' (deleted segments are only returned if requested by id)|boolean|
|**legacyId**  <br>*optional*|Legacy segment id from old segment database (only exists if the segment was migrated from the old segment DB)|string|
|**migratedIds**  <br>*optional*|A list of ids that have been migrated from one data center to another. This is the id of the segment in the old data center.  This is an array and can have multiple ids if the segment has been migrated more than once.|< string > array|
|**modified**  <br>*optional*||string (date-time)|
|**name**  <br>*optional*|A name for the segment.|string|
|**owner**  <br>*optional*|The owner of the segment as an Owner object.|[Owner](#owner)|
|**reportSuiteName**  <br>*optional*|The friendly name for the report suite id.|string|
|**reportTimeAttribution**  <br>*optional*||boolean|
|**rsid**  <br>*optional*|The report suite id.|string|
|**shares**  <br>*optional*|Existing shares for the segment.|< [Share](#share) > array|
|**siteTitle**  <br>*optional*|A name for the report suite.  This is deprecated and should use the report suite name instead.|string|
|**tags**  <br>*optional*|All existing tags associated with the segment.|< [Tag](#tag) > array|
|**template**  <br>*optional*|Whether or not the segment is a template.  A template is a predefined segment that can be used by all customers and can not be edited|boolean|
|**usageSummary**  <br>*optional*|How frequently the user uses this segment.|[SummarizedUsageItem](#summarizedusageitem)|
|**virtualReportSuites**  <br>*optional*|A list of all Virtual Report Suites that are using this segment.|< [AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite) > array|


<a name="analyticstrackingserver"></a>
### AnalyticsTrackingServer

|Name|Schema|
|---|---|
|**trackingServer**  <br>*optional*|string|


<a name="analyticsvrscompatibility"></a>
### AnalyticsVRSCompatibility

|Name|Schema|
|---|---|
|**message**  <br>*optional*|string|
|**supported_products**  <br>*optional*|< string > array|
|**valid**  <br>*optional*|boolean|
|**validator_version**  <br>*optional*|string|


<a name="analyticsvirtualreportsuite"></a>
### AnalyticsVirtualReportSuite

|Name|Description|Schema|
|---|---|---|
|**alternateVariableNames**  <br>*optional*||[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*||boolean|
|**axleConfig**  <br>*optional*||[ReportSuiteAxleConfig](#reportsuiteaxleconfig)|
|**calendarType**  <br>*optional*||[CalendarType](#calendartype)|
|**compatibility**  <br>*optional*||[AnalyticsVRSCompatibility](#analyticsvrscompatibility)|
|**created**  <br>*optional*||string (date-time)|
|**curatedComponents**  <br>*optional*||< [AnalyticsCuratedComponent](#analyticscuratedcomponent) > array|
|**curationEnabled**  <br>*optional*||boolean|
|**currency**  <br>*optional*||string|
|**currentTimezoneOffset**  <br>*optional*||number (float)|
|**darkSessionsEnabled**  <br>*optional*||boolean|
|**dataCurrentAsOf**  <br>*optional*||string (date-time)|
|**dataSchema**  <br>*optional*||string|
|**description**  <br>*optional*||string|
|**discoverUiEnabled**  <br>*optional*||boolean|
|**enabledSolutions**  <br>*optional*||< string > array|
|**favorite**  <br>*optional*||boolean|
|**globalCompanyKey**  <br>*optional*||string|
|**groups**  <br>*optional*||< [UserGroup](#usergroup) > array|
|**id**  <br>*optional*||string|
|**internal**  <br>*optional*||boolean|
|**isBlocked**  <br>*optional*||boolean|
|**isDeleted**  <br>*optional*||boolean|
|**migratedIds**  <br>*optional*||< string > array|
|**modified**  <br>*optional*||string (date-time)|
|**name**  <br>*optional*||string|
|**numGroups**  <br>*optional*||integer (int32)|
|**numericRsid**  <br>*optional*||integer (int32)|
|**owner**  <br>*optional*||[Owner](#owner)|
|**parentRsid**  <br>*optional*||string|
|**parentRsidName**  <br>*optional*||string|
|**reportSuiteName**  <br>*optional*  <br>*read-only*|The report suite name for which the component was created/updated|string|
|**rsid**  <br>*optional*|The report suite id for which the component was created/updated|string|
|**segmentList**  <br>*optional*||< string > array|
|**sessionDefinition**  <br>*optional*||[JsonNode](#jsonnode)|
|**shares**  <br>*optional*||< [Share](#share) > array|
|**siteTitle**  <br>*optional*||string|
|**tags**  <br>*optional*||< [Tag](#tag) > array|
|**taxonomist**  <br>*optional*||boolean|
|**timezone**  <br>*optional*||integer (int32)|
|**timezoneZoneinfo**  <br>*optional*||string|
|**usageSummary**  <br>*optional*||[SummarizedUsageItem](#summarizedusageitem)|


<a name="approval"></a>
### Approval

|Name|Description|Schema|
|---|---|---|
|**approvalId**  <br>*optional*  <br>*read-only*|A system generated approval id|integer (int64)|
|**approvalTimestamp**  <br>*optional*  <br>*read-only*|The timestamp for when this approval was last updated|string (date-time)|
|**companyId**  <br>*required*|The Analytics company id for which this approval was created|integer (int32)|
|**componentId**  <br>*required*|The id of the component for which to create an approval|string|
|**componentType**  <br>*required*|The component type|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|
|**componentTypeId**  <br>*optional*|The component type id which is determined by the componentType|integer (int32)|
|**userId**  <br>*required*|The Analytics user id of the user that created this approval|integer (int32)|


<a name="batchdatagovernancesettings"></a>
### BatchDataGovernanceSettings

|Name|Schema|
|---|---|
|**auth**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**gdpr**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**identifiability**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**sensitivity**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**status**  <br>*optional*|[BatchOperationStatus](#batchoperationstatus)|
|**variableId**  <br>*optional*|string|


<a name="batchoperationstatus"></a>
### BatchOperationStatus

|Name|Schema|
|---|---|
|**error**  <br>*optional*|[ErrorStatus](#errorstatus)|
|**success**  <br>*optional*|boolean|


<a name="batchreportsuitedatausagesettings"></a>
### BatchReportSuiteDataUsageSettings

|Name|Schema|
|---|---|
|**considerations**  <br>*optional*|< [Consideration](#consideration) > array|
|**rsid**  <br>*optional*|string|
|**status**  <br>*optional*|[BatchOperationStatus](#batchoperationstatus)|


<a name="calcmetriccompatibility"></a>
### CalcMetricCompatibility

|Name|Schema|
|---|---|
|**functions**  <br>*optional*|< string > array|
|**identityDimensions**  <br>*optional*|< string > array|
|**identityMetrics**  <br>*optional*|< [IdentityMetric](#identitymetric) > array|
|**message**  <br>*optional*|string|
|**segments**  <br>*optional*|< string > array|
|**supported_products**  <br>*optional*|< string > array|
|**supported_schema**  <br>*optional*|< string > array|
|**valid**  <br>*optional*|boolean|
|**validator_version**  <br>*optional*|string|


<a name="calcmetricfunction"></a>
### CalcMetricFunction

|Name|Schema|
|---|---|
|**category**  <br>*optional*|string|
|**definition**  <br>*optional*|[CalcMetricFunctionDef](#calcmetricfunctiondef)|
|**description**  <br>*optional*|string|
|**example**  <br>*optional*|string|
|**exampleKey**  <br>*optional*|string|
|**id**  <br>*optional*|string|
|**name**  <br>*optional*|string|
|**namespace**  <br>*optional*|string|
|**persistable**  <br>*optional*|boolean|


<a name="calcmetricfunctiondef"></a>
### CalcMetricFunctionDef

|Name|Schema|
|---|---|
|**formula**  <br>*optional*|< string, object > map|
|**func**  <br>*optional*|string|
|**parameters**  <br>*optional*|< [CalcMetricFunctionParameter](#calcmetricfunctionparameter) > array|
|**version**  <br>*optional*|< integer (int32) > array|


<a name="calcmetricfunctionparameter"></a>
### CalcMetricFunctionParameter

|Name|Schema|
|---|---|
|**default-value**  <br>*optional*|object|
|**descKey**  <br>*optional*|string|
|**description**  <br>*optional*|string|
|**friendlyName**  <br>*optional*|string|
|**friendlyNameKey**  <br>*optional*|string|
|**func**  <br>*optional*|string|
|**name**  <br>*optional*|string|
|**type**  <br>*optional*|string|


<a name="calculatedmetricauthorization"></a>
### CalculatedMetricAuthorization

|Name|Schema|
|---|---|
|**authorized**  <br>*optional*|boolean|
|**unAuthorizedMetricIdentities**  <br>*optional*|< string > array|


<a name="calculatedmetricdef"></a>
### CalculatedMetricDef
*Type* : object


<a name="calculatedmetricerrorstatus"></a>
### CalculatedMetricErrorStatus

|Name|Schema|
|---|---|
|**errorCode**  <br>*optional*|enum (no_feature_access_to_advanced_calculated_metrics, invalid_metric_access, method_not_allowed, resource_conflict, invalid_access, resource_temporarily_unavailable, external_api_failure, resource_already_exists, invalid_state, invalid_json_input, invalid_parameters, invalid_dimension_access, unsupported_data_type, resource_not_found, insufficient_access, health_check_error, invalid_data, unexpected_error, external_api_error, unsupported_resource, io_error, invalid_request, invalid_client_id, unauthorized, authorization_error, invalid_token, insufficient_scope)|
|**errorDescription**  <br>*optional*|string|
|**errorDetails**  <br>*optional*|< string, object > map|
|**errorId**  <br>*optional*|string|


<a name="calendartype"></a>
### CalendarType

|Name|Schema|
|---|---|
|**anchorDate**  <br>*optional*|string (date-time)|
|**rsid**  <br>*optional*|string|
|**type**  <br>*optional*|enum (gregorian, nrf, qrs, custom_454, custom_445, modified_gregorian)|


<a name="column"></a>
### Column

|Name|Schema|
|---|---|
|**id**  <br>*optional*|string|
|**segmentIds**  <br>*optional*|< string > array|
|**title**  <br>*optional*|string|
|**type**  <br>*optional*|enum (DIMENSION, METRIC)|


<a name="company"></a>
### Company

|Name|Schema|
|---|---|
|**accessType**  <br>*optional*|enum (pointProducts, standard, premium, mobile, premiumPredictive, premiumAttribution, premiumCustomer, core, essentialsDps, foundation, select, prime, ultimate)|
|**adminLogin**  <br>*optional*|string|
|**allowAdobeEmails**  <br>*optional*|boolean|
|**billingCustomerId**  <br>*required*|integer (int64)|
|**companyPrefix**  <br>*optional*|string|
|**companySecurity**  <br>*optional*|[CompanySecurity](#companysecurity)|
|**companyid**  <br>*optional*|integer (int32)|
|**description**  <br>*required*|string|
|**disabled**  <br>*optional*|boolean|
|**eccId**  <br>*optional*|integer (int32)|
|**featureAccessOverrides**  <br>*optional*|< string, < string, string > map > map|
|**globalCompanyKey**  <br>*required*|string|
|**imsOrgid**  <br>*optional*|string|
|**imsProductId**  <br>*optional*|string|
|**imsUserMigrationActive**  <br>*optional*|boolean|
|**imsUserMigrationComplete**  <br>*optional*|boolean|
|**imsUserMigrationDeadline**  <br>*optional*|string (date-time)|
|**imsUserMigrationStartDate**  <br>*optional*|string (date-time)|
|**marketingCloudOnly**  <br>*optional*|boolean|
|**name**  <br>*required*|string|
|**namespace**  <br>*required*|string|
|**taxonomistMigrationStart**  <br>*optional*|string (date-time)|
|**taxonomistMigrationStatus**  <br>*optional*|enum (not_started, in_progress, complete, complete_saint_hidden)|
|**validEmails**  <br>*optional*|< string > array|


<a name="companysecurity"></a>
### CompanySecurity

|Name|Schema|
|---|---|
|**emailRestrictions**  <br>*optional*|boolean|
|**ipRestrictions**  <br>*optional*|boolean|
|**passwordExpiration**  <br>*optional*|boolean|
|**passwordRecovery**  <br>*optional*|boolean|
|**strongPasswords**  <br>*optional*|boolean|


<a name="consideration"></a>
### Consideration

|Name|Schema|
|---|---|
|**label**  <br>*optional*|string|
|**status**  <br>*optional*|boolean|


<a name="customreportsuitefiltergroup"></a>
### CustomReportSuiteFilterGroup

|Name|Schema|
|---|---|
|**customGroupId**  <br>*optional*|integer (int32)|
|**customGroupName**  <br>*optional*|string|


<a name="deleteresponse"></a>
### DeleteResponse

|Name|Schema|
|---|---|
|**message**  <br>*optional*|string|
|**result**  <br>*optional*|string|


<a name="dimensionitem"></a>
### DimensionItem

|Name|Schema|
|---|---|
|**dimension**  <br>*optional*|string|
|**itemId**  <br>*optional*|string|
|**value**  <br>*optional*|string|


<a name="errorstatus"></a>
### ErrorStatus

|Name|Schema|
|---|---|
|**errorCode**  <br>*optional*|enum (invalid_metric_access, method_not_allowed, resource_conflict, invalid_access, resource_temporarily_unavailable, external_api_failure, resource_already_exists, invalid_state, invalid_json_input, invalid_parameters, invalid_dimension_access, unsupported_data_type, resource_not_found, insufficient_access, health_check_error, invalid_data, unexpected_error, external_api_error, unsupported_resource, io_error, invalid_request, invalid_client_id, unauthorized, authorization_error, invalid_token, insufficient_scope)|
|**errorDescription**  <br>*optional*|string|
|**errorDetails**  <br>*optional*|< string, object > map|
|**errorId**  <br>*optional*|string|


<a name="expirationsettings"></a>
### ExpirationSettings

|Name|Schema|
|---|---|
|**containerName**  <br>*optional*|string|
|**events**  <br>*optional*|< string > array|
|**func**  <br>*optional*|enum (afterEvents, inactivity, container, beforeEvents)|
|**granularity**  <br>*optional*|string|
|**numPeriods**  <br>*optional*|integer (int32)|


<a name="favorite"></a>
### Favorite

|Name|Schema|
|---|---|
|**companyId**  <br>*optional*|integer (int32)|
|**componentId**  <br>*optional*|string|
|**componentType**  <br>*optional*|string|
|**componentTypeId**  <br>*optional*|integer (int32)|
|**favoriteId**  <br>*optional*|integer (int64)|
|**favoriteTimestamp**  <br>*optional*|string (date-time)|
|**userId**  <br>*optional*|integer (int32)|


<a name="identitymetric"></a>
### IdentityMetric

|Name|Schema|
|---|---|
|**dimensionView**  <br>*optional*|enum (LINEAR_ALLOCATION, PARTICIPATION_ALLOCATION, LAST_TOUCH_ALLOCATION, MC_FIRST_TOUCH_ALLOCATION, MC_LAST_TOUCH_ALLOCATION)|
|**identity**  <br>*optional*|string|


<a name="imsorgidsfromrelatedcompanies"></a>
### ImsOrgIdsFromRelatedCompanies

|Name|Schema|
|---|---|
|**owningImsOrgId**  <br>*optional*|string|
|**relatedImsOrgIds**  <br>*optional*|< string > array|


<a name="jsonobject"></a>
### JSONObject
*Type* : object


<a name="jsonnode"></a>
### JsonNode

|Name|Schema|
|---|---|
|**array**  <br>*optional*|boolean|
|**bigDecimal**  <br>*optional*|boolean|
|**bigInteger**  <br>*optional*|boolean|
|**binary**  <br>*optional*|boolean|
|**boolean**  <br>*optional*|boolean|
|**containerNode**  <br>*optional*|boolean|
|**double**  <br>*optional*|boolean|
|**float**  <br>*optional*|boolean|
|**floatingPointNumber**  <br>*optional*|boolean|
|**int**  <br>*optional*|boolean|
|**integralNumber**  <br>*optional*|boolean|
|**long**  <br>*optional*|boolean|
|**missingNode**  <br>*optional*|boolean|
|**nodeType**  <br>*optional*|enum (ARRAY, BINARY, BOOLEAN, MISSING, NULL, NUMBER, OBJECT, POJO, STRING)|
|**null**  <br>*optional*|boolean|
|**number**  <br>*optional*|boolean|
|**object**  <br>*optional*|boolean|
|**pojo**  <br>*optional*|boolean|
|**short**  <br>*optional*|boolean|
|**textual**  <br>*optional*|boolean|
|**valueNode**  <br>*optional*|boolean|


<a name="locale"></a>
### Locale

|Name|Schema|
|---|---|
|**country**  <br>*optional*|string|
|**displayCountry**  <br>*optional*|string|
|**displayLanguage**  <br>*optional*|string|
|**displayName**  <br>*optional*|string|
|**displayScript**  <br>*optional*|string|
|**displayVariant**  <br>*optional*|string|
|**extensionKeys**  <br>*optional*|< string > array|
|**iso3Country**  <br>*optional*|string|
|**iso3Language**  <br>*optional*|string|
|**language**  <br>*optional*|string|
|**script**  <br>*optional*|string|
|**unicodeLocaleAttributes**  <br>*optional*|< string > array|
|**unicodeLocaleKeys**  <br>*optional*|< string > array|
|**variant**  <br>*optional*|string|


<a name="metricswarning"></a>
### MetricsWarning

|Name|Schema|
|---|---|
|**helpLink**  <br>*optional*|string|
|**text**  <br>*optional*|string|
|**title**  <br>*optional*|string|


<a name="owner"></a>
### Owner

|Name|Description|Schema|
|---|---|---|
|**id**  <br>*required*|the login id of the owner|integer (int32)|
|**login**  <br>*optional*|the friendly full login name of the owner, included when the expansion parameter ownerFullName is true|string|
|**name**  <br>*optional*|the friendly full login name of the owner, included when the expansion parameter ownerFullName is true|string|


<a name="pageable"></a>
### Pageable

|Name|Schema|
|---|---|
|**offset**  <br>*optional*|integer (int32)|
|**pageNumber**  <br>*optional*|integer (int32)|
|**pageSize**  <br>*optional*|integer (int32)|
|**sort**  <br>*optional*|[Sort](#sort)|


<a name="predictivesettings"></a>
### PredictiveSettings

|Name|Schema|
|---|---|
|**trainingPeriods**  <br>*optional*|integer (int32)|


<a name="rankedcolumnerror"></a>
### RankedColumnError

|Name|Schema|
|---|---|
|**columnId**  <br>*optional*|string|
|**errorCode**  <br>*optional*|enum (unauthorized_metric, unauthorized_dimension, unauthorized_dimension_global, anomaly_detection_failure_unexpected_item_count, anomaly_detection_failure_tsa_service, not_enabled_metric, not_enabled_dimension, not_enabled_dimension_global)|
|**errorDescription**  <br>*optional*|string|
|**errorId**  <br>*optional*|string|


<a name="rankedcolumnmetadata"></a>
### RankedColumnMetaData

|Name|Schema|
|---|---|
|**columnErrors**  <br>*optional*|< [RankedColumnError](#rankedcolumnerror) > array|
|**columnIds**  <br>*optional*|< string > array|
|**dimension**  <br>*optional*|[ReportDimension](#reportdimension)|


<a name="rankedreportdata"></a>
### RankedReportData

|Name|Schema|
|---|---|
|**columns**  <br>*optional*|[RankedColumnMetaData](#rankedcolumnmetadata)|
|**firstPage**  <br>*optional*|boolean|
|**lastPage**  <br>*optional*|boolean|
|**message**  <br>*optional*|string|
|**number**  <br>*optional*|integer (int32)|
|**numberOfElements**  <br>*optional*|integer (int32)|
|**oberonRequestXML**  <br>*optional*|< string > array|
|**oberonResponseXML**  <br>*optional*|< string > array|
|**predictiveRequestObjects**  <br>*optional*|< string > array|
|**predictiveResponseObjects**  <br>*optional*|< string > array|
|**reportId**  <br>*optional*|string|
|**request**  <br>*optional*|[RankedRequest](#rankedrequest)|
|**rows**  <br>*optional*|< [Row](#row) > array|
|**summaryData**  <br>*optional*|[RankedSummaryData](#rankedsummarydata)|
|**totalElements**  <br>*optional*|integer (int32)|
|**totalPages**  <br>*optional*|integer (int32)|


<a name="rankedrequest"></a>
### RankedRequest

|Name|Schema|
|---|---|
|**anchorDate**  <br>*optional*|string|
|**dimension**  <br>*optional*|string|
|**globalFilters**  <br>*optional*|< [ReportFilter](#reportfilter) > array|
|**globalPredictiveSettings**  <br>*optional*|[PredictiveSettings](#predictivesettings)|
|**locale**  <br>*optional*|[Locale](#locale)|
|**metricContainer**  <br>*optional*|[ReportMetrics](#reportmetrics)|
|**rsid**  <br>*optional*|string|
|**search**  <br>*optional*|[ReportSearch](#reportsearch)|
|**settings**  <br>*optional*|[RankedSettings](#rankedsettings)|
|**statistics**  <br>*optional*|[RankedStatistics](#rankedstatistics)|


<a name="rankedsettings"></a>
### RankedSettings

|Name|Schema|
|---|---|
|**countRepeatInstances**  <br>*optional*|boolean|
|**darkSessionsEnabled**  <br>*optional*|boolean|
|**dataSchema**  <br>*optional*|string|
|**dimensionSort**  <br>*optional*|string|
|**includeAnomalyDetection**  <br>*optional*|boolean|
|**includeLatLong**  <br>*optional*|boolean|
|**includePercentChange**  <br>*optional*|boolean|
|**limit**  <br>*optional*|integer (int32)|
|**page**  <br>*optional*|integer (int32)|
|**reflectRequest**  <br>*optional*|boolean|
|**sessionExpiration**  <br>*optional*|< [ExpirationSettings](#expirationsettings) > array|
|**suiteReportingContext**  <br>*optional*|enum (DEVICE, TROMMEL_COMBINED)|


<a name="rankedstatistics"></a>
### RankedStatistics

|Name|Schema|
|---|---|
|**functions**  <br>*optional*|< string > array|
|**ignoreZeroes**  <br>*optional*|boolean|


<a name="rankedsummarydata"></a>
### RankedSummaryData
*Type* : object


<a name="relatedcompany"></a>
### RelatedCompany

|Name|Schema|
|---|---|
|**companyId**  <br>*optional*|integer (int32)|
|**name**  <br>*optional*|string|


<a name="reportdimension"></a>
### ReportDimension

|Name|Schema|
|---|---|
|**id**  <br>*optional*|string|
|**type**  <br>*optional*|enum (STRING, INT, DECIMAL, CURRENCY, PERCENT, TIME, ENUM, ORDERED_ENUM)|


<a name="reporterrorstatus"></a>
### ReportErrorStatus

|Name|Schema|
|---|---|
|**errorCode**  <br>*optional*|enum (invalid_segment_ids_found, invalid_metric_access, method_not_allowed, resource_conflict, invalid_access, resource_temporarily_unavailable, external_api_failure, resource_already_exists, invalid_state, invalid_json_input, invalid_parameters, invalid_dimension_access, unsupported_data_type, resource_not_found, insufficient_access, health_check_error, invalid_data, unexpected_error, external_api_error, unsupported_resource, io_error, invalid_request, invalid_client_id, unauthorized, authorization_error, invalid_token, insufficient_scope)|
|**errorDescription**  <br>*optional*|string|
|**errorDetails**  <br>*optional*|< string, object > map|
|**errorId**  <br>*optional*|string|


<a name="reportfilter"></a>
### ReportFilter

|Name|Schema|
|---|---|
|**dateRange**  <br>*optional*|string|
|**dimension**  <br>*optional*|string|
|**excludeItemIds**  <br>*optional*|< integer > array|
|**id**  <br>*optional*|string|
|**itemId**  <br>*optional*|string|
|**itemIds**  <br>*optional*|< string > array|
|**segmentDefinition**  <br>*optional*|< string, object > map|
|**segmentId**  <br>*optional*|string|
|**type**  <br>*optional*|enum (DATE_RANGE, BREAKDOWN, SEGMENT, EXCLUDE_ITEM_IDS)|


<a name="reportmetric"></a>
### ReportMetric

|Name|Schema|
|---|---|
|**allocationType**  <br>*optional*|string|
|**columnId**  <br>*optional*|string|
|**filters**  <br>*optional*|< string > array|
|**id**  <br>*optional*|string|
|**metricDefinition**  <br>*optional*|< string, object > map|
|**metricView**  <br>*optional*|string|
|**predictive**  <br>*optional*|[ReportMetricPredictiveSettings](#reportmetricpredictivesettings)|
|**sort**  <br>*optional*|string|


<a name="reportmetricpredictivesettings"></a>
### ReportMetricPredictiveSettings

|Name|Schema|
|---|---|
|**anomalyConfidence**  <br>*optional*|number (double)|


<a name="reportmetrics"></a>
### ReportMetrics

|Name|Schema|
|---|---|
|**metricFilters**  <br>*optional*|< [ReportFilter](#reportfilter) > array|
|**metrics**  <br>*optional*|< [ReportMetric](#reportmetric) > array|


<a name="reportsearch"></a>
### ReportSearch

|Name|Schema|
|---|---|
|**clause**  <br>*optional*|string|
|**empty**  <br>*optional*|boolean|
|**excludeItemIds**  <br>*optional*|< integer > array|
|**includeSearchTotal**  <br>*optional*|boolean|
|**itemIds**  <br>*optional*|< integer > array|


<a name="reportsuiteaxleconfig"></a>
### ReportSuiteAxleConfig

|Name|Schema|
|---|---|
|**axleData**  <br>*optional*|boolean|
|**axleStart**  <br>*optional*|string|


<a name="reportsuitedatausagesettings"></a>
### ReportSuiteDataUsageSettings

|Name|Schema|
|---|---|
|**considerations**  <br>*optional*|< [Consideration](#consideration) > array|


<a name="reportsuitehateoasreferences"></a>
### ReportSuiteHateoasReferences

|Name|Schema|
|---|---|
|**billingCustomerUrl**  <br>*optional*|string|
|**companyUrl**  <br>*optional*|string|


<a name="rollingdatefunction"></a>
### RollingDateFunction

|Name|Schema|
|---|---|
|**date**  <br>*optional*|string|
|**dow**  <br>*optional*|enum (monday, tuesday, wednesday, thursday, friday, saturday, sunday)|
|**function**  <br>*optional*|string|
|**granularity**  <br>*optional*|enum (year, quarter, month, week, day, hour, minute)|
|**offset**  <br>*optional*|integer (int32)|


<a name="row"></a>
### Row

|Name|Schema|
|---|---|
|**data**  <br>*optional*|< number (double) > array|
|**dataAnomalyDetected**  <br>*optional*|< boolean > array|
|**dataExpected**  <br>*optional*|< number (double) > array|
|**dataLowerBound**  <br>*optional*|< number (double) > array|
|**dataUpperBound**  <br>*optional*|< number (double) > array|
|**itemId**  <br>*optional*|string|
|**latitude**  <br>*optional*|number (double)|
|**longitude**  <br>*optional*|number (double)|
|**percentChange**  <br>*optional*|< number (double) > array|
|**value**  <br>*optional*|string|


<a name="rowitem"></a>
### RowItem

|Name|Schema|
|---|---|
|**itemId**  <br>*optional*|string|
|**value**  <br>*optional*|string|


<a name="segmentcompatibility"></a>
### SegmentCompatibility

|Name|Schema|
|---|---|
|**message**  <br>*optional*|string|
|**supported_features**  <br>*optional*|< string > array|
|**supported_products**  <br>*optional*|< string > array|
|**supported_schema**  <br>*optional*|< string > array|
|**valid**  <br>*optional*|boolean|
|**validator_version**  <br>*optional*|string|


<a name="segmentpublishingconfig"></a>
### SegmentPublishingConfig

|Name|Schema|
|---|---|
|**dataSourceId**  <br>*optional*|integer (int32)|
|**segmentFolderId**  <br>*optional*|integer (int32)|
|**traitFolderId**  <br>*optional*|integer (int32)|


<a name="segmentsummaryresponse"></a>
### SegmentSummaryResponse

|Name|Schema|
|---|---|
|**compatibility**  <br>*optional*|< string > array|
|**detailMsg**  <br>*optional*|string|
|**oberonRequestXml**  <br>*optional*|string|
|**oberonResponseXml**  <br>*optional*|string|
|**report**  <br>*optional*|[TotalsReportData](#totalsreportdata)|
|**supportedEngines**  <br>*optional*|< string > array|


<a name="share"></a>
### Share

|Name|Schema|
|---|---|
|**componentId**  <br>*required*|string|
|**componentType**  <br>*optional*|string|
|**shareId**  <br>*optional*|integer (int64)|
|**shareToDisplayName**  <br>*optional*|string|
|**shareToId**  <br>*required*|integer (int64)|
|**shareToLogin**  <br>*optional*|string|
|**shareToType**  <br>*required*|string|


<a name="sort"></a>
### Sort
*Type* : object


<a name="suitecollectionitem"></a>
### SuiteCollectionItem

|Name|Schema|
|---|---|
|**axleConfig**  <br>*optional*|[ReportSuiteAxleConfig](#reportsuiteaxleconfig)|
|**calendarType**  <br>*optional*|[CalendarType](#calendartype)|
|**collectionItemType**  <br>*optional*|string|
|**currency**  <br>*optional*|string|
|**currentTimezoneOffset**  <br>*optional*|number (float)|
|**dataCurrentAsOf**  <br>*optional*|string (date-time)|
|**dataSchema**  <br>*optional*|string|
|**discoverUiEnabled**  <br>*optional*|boolean|
|**enabledSolutions**  <br>*optional*|< string > array|
|**isBlocked**  <br>*optional*|boolean|
|**isDeleted**  <br>*optional*|boolean|
|**name**  <br>*optional*|string|
|**numGroups**  <br>*optional*|integer (int32)|
|**numericRsid**  <br>*optional*|integer (int32)|
|**parentRsid**  <br>*optional*|string|
|**rsid**  <br>*optional*  <br>*read-only*|string|
|**taxonomist**  <br>*optional*|boolean|
|**timezoneZoneinfo**  <br>*optional*|string|


<a name="summarizedusageitem"></a>
### SummarizedUsageItem

|Name|Schema|
|---|---|
|**count**  <br>*optional*|integer (int32)|
|**itemId**  <br>*optional*|string|
|**mostRecentTimestamp**  <br>*optional*|string (date-time)|
|**relevancyScore**  <br>*optional*|number (float)|


<a name="tag"></a>
### Tag
Tag Model


|Name|Description|Schema|
|---|---|---|
|**components**  <br>*optional*|the list of components that have been tagged with this tag|< [TaggedComponent](#taggedcomponent) > array|
|**description**  <br>*optional*|the tag description|string|
|**id**  <br>*optional*|the tag id|integer (int32)|
|**name**  <br>*optional*|the tag name|string|


<a name="taggedcomponent"></a>
### TaggedComponent

|Name|Schema|
|---|---|
|**componentId**  <br>*optional*|string|
|**componentType**  <br>*optional*|string|
|**tags**  <br>*optional*|< [Tag](#tag) > array|


<a name="tntconfig"></a>
### TntConfig

|Name|Schema|
|---|---|
|**tnt**  <br>*optional*|boolean|
|**tntA4tDateEnabled**  <br>*optional*|boolean|
|**tntAllocationType**  <br>*optional*|integer (int32)|
|**tntClientCode**  <br>*optional*|string|
|**tntExpirePeriods**  <br>*optional*|integer (int32)|
|**tntExpireType**  <br>*optional*|integer (int32)|


<a name="totalsreportdata"></a>
### TotalsReportData

|Name|Schema|
|---|---|
|**columns**  <br>*optional*|< [Column](#column) > array|
|**message**  <br>*optional*|string|
|**reportId**  <br>*optional*|string|
|**totals**  <br>*optional*|< [RowItem](#rowitem) > array|


<a name="unhashreportdata"></a>
### UnhashReportData

|Name|Schema|
|---|---|
|**firstPage**  <br>*optional*|boolean|
|**lastPage**  <br>*optional*|boolean|
|**message**  <br>*optional*|string|
|**number**  <br>*optional*|integer (int32)|
|**numberOfElements**  <br>*optional*|integer (int32)|
|**oberonRequestXML**  <br>*optional*|string|
|**oberonResponseXML**  <br>*optional*|string|
|**reportId**  <br>*optional*|string|
|**rows**  <br>*optional*|< [RowItem](#rowitem) > array|
|**searchAnd**  <br>*optional*|string|
|**searchNot**  <br>*optional*|string|
|**searchOr**  <br>*optional*|string|
|**searchPhrase**  <br>*optional*|string|
|**totalElements**  <br>*optional*|integer (int32)|
|**totalPages**  <br>*optional*|integer (int32)|


<a name="user"></a>
### User

|Name|Schema|
|---|---|
|**admin**  <br>*optional*|boolean|
|**companyid**  <br>*optional*|integer (int32)|
|**email**  <br>*optional*|string|
|**firstName**  <br>*optional*|string|
|**fullName**  <br>*optional*|string|
|**imsUserId**  <br>*optional*|string|
|**lastName**  <br>*optional*|string|
|**login**  <br>*optional*|string|
|**loginId**  <br>*optional*|integer (int32)|


<a name="usergroup"></a>
### UserGroup

|Name|Schema|
|---|---|
|**allRsids**  <br>*optional*|boolean|
|**created**  <br>*optional*|string (date-time)|
|**description**  <br>*optional*|string|
|**groupId**  <br>*optional*|integer (int32)|
|**imsPlcId**  <br>*optional*|string|
|**imsPlcIdOrphaned**  <br>*optional*|boolean|
|**loginIds**  <br>*optional*|< integer (int32) > array|
|**modified**  <br>*optional*|string (date-time)|
|**name**  <br>*optional*|string|
|**oids**  <br>*optional*|< integer (int32) > array|
|**rsids**  <br>*optional*|< string > array|
|**tokens**  <br>*optional*|< string > array|



