# Supported Data Usage Labels

Adobe Experience Platform includes infrastructure for data governance with Data Usage Labeling and Enforcement (DULE) at its core.  DULE features enable the application of data usage labels to connections, datasets, and fields to categorize data according to the type of data usage policies that apply.

The following list outlines all data usage labels currently supported by Experience Platform.

More information regarding Data Governance and DULE can be found in the [Data Usage Labeling and Enforcement (DULE) User Guide](dule_overview.md).


## Contractual Data:

"C" labels categorize data that has contractual obligations or is related to a data governance policy.

|Label|Definition|
|---|---|
|**C1**|Data can only be exported from Adobe Experience Cloud in an aggregated form without including individual or device identifiers.  _Example: data that originated from social media, such as Facebook or Twitter._  |
|**C2**|Data cannot be exported to a 3rd party. _Example: data that originated from social media and a 3rd party data provider._|
|**C3**|Data cannot be used in conjunction with directly identifiable information. _Example: data sourced from ad networks, ad servers, and 3rd party data providers._ |
|**C4**|Data cannot be used for any targeting, including your organization's own sites and apps. The C4 label is specific to your organization's privacy policy and aligns with ICO cookie categories, such as performance, functionality, and advertising cookies. |
|**C5**|Data cannot be used for targeting on your organization's own sites and apps. The C5 label is specific to your organization's privacy policy and is a subset of the C4 label. It limits targeting on your organization's sites and apps only. Cross-site targeting would be permitted.|
|**C6**|Data cannot be used for cross-site targeting. The C6 label is specific to your organization's privacy policy and is a subset of the C4 label. Despite limiting cross-site targeting, your organization's site and app targeting would be permitted.  The C6 label is roughly similar to ICO advertising cookies.|
|**C7**|Data cannot be used for performance and optimization of your organization's own website. The C7 label is specific to your organization's privacy policy and is roughly similar to ICO performance and functionality cookies.|
|**C8**|Data cannot be used in Data Science workflows.|


## Identity Data:

“I” labels are used to categorize data that can identify or contact a specific person.

|Label|Definition|
|---|---|
|**I1**| _Directly Identifiable Data:_ Data that can identify or contact a specific person, rather than a device.|
|**I2**|_Indirectly Identifiable Data:_ Data that can be used in combination with any other data to identify or contact a specific person.|


## Sensitive Data:

“S” labels are used to categorize sensitive data such as geographic data.

|Label|Definition|
|---|---|
|**S1**|_Geo-Location Data:_ Data specifying latitude and longitude that can be used to determine the precise location of a device.|
|**S2**|_Geofence Data:_ Data that can be used to determine a broadly defined geofence area.|