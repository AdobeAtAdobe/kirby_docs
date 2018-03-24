
<a name="connector"></a>
### connector

|Name|Description|Schema|
|---|---|---|
|**category**  <br>*optional*|Connectors currently have 2 categories: 1) standard: we are connecting to a known source with known data (ie. other companies data stores) or 2) custom: a generaic connector to FTP or S3 etc.  <br>**Example** : `"string"`|enum (standard, custom)|
|**description**  <br>*optional*|Introductory text describing this connector, it's primary functionality, relevant data sets, etc.  <br>**Example** : `"string"`|string|
|**documents**  <br>*optional*|URLs pointing to supporting documentation for using and gaining value from this connector.  <br>**Example** : `[ "[documents](#documents)" ]`|< [documents](documents.md#documents) > array|
|**frequency**  <br>*optional*|Suggested ingest frequency for Connections created from this Connector.  <br>**Example** : `"object"`|[frequency](#connector-frequency)|
|**ingestStart**  <br>*optional*|Suggested date/time to start ingesting.  <br>**Example** : `"string"`|string|
|**maxConnections**  <br>*optional*|The maximum number of connections a customer (IMS Org) can create of this type.  <br>**Example** : `0`|integer|
|**name**  <br>*optional*|Name of this Connector.  <br>**Example** : `"string"`|string|
|**paramsSchema**  <br>*optional*|JSON Schema used to validation service params.  <br>**Example** : `"object"`|object|
|**type**  <br>*optional*|The ingest type for this Connector.  <br>**Example** : `"string"`|enum (batch, stream)|
|**uiCreationAllowed**  <br>*optional*|When set to false, this connector should not be shown by the UI Connector Library. Essentially, the UI is not to create connectors of this type, but should show status related to this connector elsewhere.  <br>**Example** : `true`|boolean|
|**version**  <br>*optional*|The Semantic version of the batch. Updated when the Connector is modified.  <br>**Example** : `"string"`|string|

<a name="connector-frequency"></a>
**frequency**

|Name|Description|Schema|
|---|---|---|
|**day**  <br>*optional*|Crontab day entry.  <br>**Example** : `"string"`|string|
|**dayOfWeek**  <br>*optional*|Crontab weekday entry.  <br>**Example** : `"string"`|string|
|**hour**  <br>*optional*|Crontab hour entry.  <br>**Example** : `"string"`|string|
|**live**  <br>*optional*|Set to true if the incoming data streams in live.  <br>**Example** : `true`|boolean|
|**minute**  <br>*optional*|Crontab minute entry.  <br>**Example** : `"string"`|string|
|**month**  <br>*optional*|Crontab month entry.  <br>**Example** : `"string"`|string|
|**timezone**  <br>*optional*|The timezone (ie: Europe/London).  <br>**Example** : `"string"`|string|
|**userEditable**  <br>*optional*|Signifies the granularity to which a user can configure the frequency settings. Settings representing the current granularity and smaller are allowed.  <br>**Example** : `"string"`|enum (minute, hour, day, month, week, never)|



