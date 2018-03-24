
<a name="availabledates"></a>
### availableDates
Describes what date range of data is available in the Batch. Null if dates aren't relevant for data related to this Batch.


|Name|Description|Schema|
|---|---|---|
|**endDate**  <br>*optional*|The Unix timestamp (in seconds) for the most recent data available in this Batch.  <br>**Example** : `0`|integer (int64)|
|**startDate**  <br>*optional*|The Unix timestamp (in seconds) for the oldest data available in this Batch.  <br>**Example** : `0`|integer (int64)|



