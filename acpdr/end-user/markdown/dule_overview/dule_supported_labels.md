# Supported Data Usage Labels

Adobe Experience Platform includes infrastructure for data governance with Data Usage Labeling and Enforcement (DULE) at its core.  DULE features enable the application of data usage labels to connections, datasets, and fields to categorize data according to the type of usage policies that apply to that data.

The following list outlines all data usage labels currently supported by Experience Platform.

More information regarding Data Governance and DULE can be found in the [Data Usage Labeling and Enforcement User Guide](dule_overview.md).

## Contract Labels:

Contract "C" labels are used to categorize data that has contractual obligations or is related to your organization's data governance policies.

|Label|Definition|
|---|---|
|**C1**|Data can only be exported from Adobe Experience Cloud in an aggregated form without including individual or device identifiers.|
|**C2**|Data cannot be exported to a third-party.|
|**C3**|Data cannot be combined or otherwise used with directly identifiable information.|
|**C4**|Data cannot be used for targeting any ads or content, either on-site or cross-site.|
|**C5**|Data cannot be used for interest-based, cross-site targeting of content or ads.|
|**C6**|Data cannot be used for on-site ad targeting.|
|**C7**|Data cannot be used for on-site targeting of content.|
|**C8**|Data cannot be used for measurement of your organization’s websites or apps.|
|**C9**|Data cannot be used in Data Science workflows.|

## Identity Labels:

Identity "I" labels are used to categorize data that can identify or contact a specific person.

|Label|Definition|
|---|---|
|**I1**|Directly identifiable data that can identify or contact a specific person, rather than a device.|
|**I2**|Indirectly identifiable data that can be used in combination with any other data to identify or contact a specific person.|


## Sensitive Labels:

Sensitive “S” labels are used to categorize data that you, and your organization, consider sensitive.  

One type of data you may consider to be sensitive may be different types of geographic data; however, this category is not limited to geographic data.

|Label|Definition|
|---|---|
|**S1**|Data specifying latitude and longitude that can be used to determine the precise location of a device.|
|**S2**|Data that can be used to determine a broadly defined geofence area.|