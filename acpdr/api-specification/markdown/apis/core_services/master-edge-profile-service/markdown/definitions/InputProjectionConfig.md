
<a name="inputprojectionconfig"></a>
### InputProjectionConfig
Projections are an edge "view" of the full profile data managed by the Unified Profile. Roughly put, edge projections are materialized by applying a mask on top of the complete profile data in the Unified Profile. Each customer can manage the edge projections by maintaining a projection configuration via the Edge Projection Configuration API. There is one single projection configuration per customer. <br/>A projection configuration contains:<ul><li>a selector of properties under the extended data model that are to be replicated to the edges, i.e. the mask to apply on top of the data in Unified Profile</li><li>a TTL representing the default maximum time an idle profile projection is stored on the edge before being deleted; expressed in seconds</li><li>a replication policy defining the behaviour of the data replication from the hub to the edges</li></ul>


|Name|Description|Schema|
|---|---|---|
|**replicationPolicy**  <br>*optional*|A policy defining the behaviour of data replication from the hub to the edges.  <br>**Default** : `"REACTIVE"`  <br>**Example** : `"PROACTIVE"`|enum (PROACTIVE, REACTIVE)|
|**selector**  <br>*required*|A property selector under the extended data model that are to be replicated to the edges, i.e. the mask to apply on top of the data in Unified Profile.  <br>**Example** : `"person.gender,addresses.city,phoneNumbers.number"`|string|
|**ttl**  <br>*optional*|A TTL representing the default maximum time an idle profile projection is stored on the edge before being deleted; expressed in seconds. Ranges between 3600 and 172800.  <br>**Default** : `3600`  <br>**Minimum value** : `3600`  <br>**Maximum value** : `172800`  <br>**Example** : `86400`|integer (int32)|



