
<a name="connectionrequest"></a>
### connectionRequest

|Name|Description|Schema|
|---|---|---|
|**accountId**  <br>*optional*|Foreign key to the account where the credentials and related fields of the connector and connection combination is stored.  <br>**Example** : `"string"`|string|
|**attributes**  <br>*optional*|These are arbitrary key/value pairs related to this Connection.  <br>**Example** : `"object"`|object|
|**connector**  <br>*required*|The ID for the Connector this Connection was created from.  <br>**Example** : `"string"`|string|
|**contacts**  <br>*optional*|A list of persons to be contacts for this connection. One should be flagged as the primary contact/owner. This list is not meant to reflect roles or permissions, but a communication channel for operations related to this connection.  <br>**Example** : `[ "[contacts](#contacts)" ]`|< [contacts](contacts.md#contacts) > array|
|**dependencies**  <br>*optional*|**Example** : `[ "string" ]`|< string > array|
|**description**  <br>*optional*|The user-provided description of the Connection.  <br>**Example** : `"string"`|string|
|**dule**  <br>*optional*|DULE labels.  <br>**Example** : `"object"`|[dule](#connectionrequest-dule)|
|**enabled**  <br>*required*|Indicates the status of the Connection. Should be interpreted as disabled or suspended when set to false.  <br>**Example** : `true`|boolean|
|**frequency**  <br>*optional*|The frequency in which the data should be gathered into the platform. Specified either in CRONTAB format for recurring jobs or live=true for streaming data sources. The userEditable field is inherited from the parent connector.  <br>**Example** : `"object"`|[frequency](#connectionrequest-frequency)|
|**imsOrg**  <br>*optional*|The owning IMS organization identifier.  <br>**Example** : `"string"`|string|
|**ingestParams**  <br>*optional*|Keyed list of parameters used in this connection to connect to a related ingest job. These params are typically persisted after the connection's ingest mechanism has been created, and they hold identifiers and configuration information related to tying this connection to objects in the foreign ingest systems.  <br>**Example** : `"object"`|object|
|**ingestStart**  <br>*optional*|Suggested date/time to start ingesting.  <br>**Example** : `"string"`|string|
|**name**  <br>*required*|The user-facing name of this Connection.  <br>**Example** : `"string"`|string|
|**parentConnectionId**  <br>*optional*|Used in cases where global/shared data is managed by this connection. The parent connection performs the ETL/Mapping jobs, and this child connection represents a customer's membership and visibility into the parent.  <br>**Example** : `"string"`|string|
|**statsCache**  <br>*optional*|Cached statistics for this connection. Not to be used for transactionally sensitive workflows, as this may be outdated or incorrect at times. These values cannot be submitted to Catalog.  <br>**Example** : `"object"`|[statsCache](#connectionrequest-statscache)|
|**tags**  <br>*optional*|Tags are values associated with a particular object,  these are generally used by external systems for marking an object in a way that it understands.  Normally tags are not used for internal Catalog business logic  <br>**Example** : `{<br>  "string" : [ "string" ]<br>}`|< string, < string > array > map|

<a name="connectionrequest-dule"></a>
**dule**

|Name|Description|Schema|
|---|---|---|
|**contracts**  <br>*optional*|What Contractual Considerations, if any, apply to this data?  <br>**Example** : `[ "string" ]`|< enum (C1, C2, C3, C4, C5, C6, C7, C8, C9, None) > array|
|**identifiability**  <br>*optional*|Should this data be treated as Indirectly Identifiable Data or Directly Identifiable Data? (What is the level of Identifiability?)  <br>**Example** : `[ "string" ]`|< enum (I1, I2) > array|
|**loginState**  <br>*optional*|What is the Log-in State?  <br>**Example** : `[ "string" ]`|< enum (Identified, Incognito, Ambiguous, Not Provided) > array|
|**other**  <br>*optional*|Other information that may govern the use of this data.  <br>**Example** : `"string"`|string|
|**specialTypes**  <br>*optional*|Is this a special data type? (Relative to a regulated industry, or distinct regulatory rules, e.g. GDPR Special data, health data, or Financial data)  <br>**Example** : `[ "string" ]`|< enum (S1, S2) > array|

<a name="connectionrequest-frequency"></a>
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
|**userEditable**  <br>*optional*|If set to never, the user should not be allowed to adjust the frequency for connections created of this connection.  <br>**Example** : `"string"`|enum (minute, hour, day, month, week, never)|

<a name="connectionrequest-statscache"></a>
**statsCache**

|Name|Description|Schema|
|---|---|---|
|**earliestAvailableData**  <br>*optional*|Unix timestamp indicating the earliest start date of the oldest DataSetFile related to this connection.  <br>**Example** : `0`|integer (int64)|
|**lastSuccess**  <br>*optional*|Unix timestamp indicating the updated date of the latest successful batch related to this connection.  <br>**Example** : `0`|integer (int64)|
|**latestAvailableData**  <br>*optional*|Unix timestamp indicating the latest end date of the newest DataSetFile related to this connection.  <br>**Example** : `0`|integer (int64)|
|**recentFailure**  <br>*optional*|Unix timestamp indicating the updated date of the last failed batch within the last week.  <br>**Example** : `0`|integer (int64)|



