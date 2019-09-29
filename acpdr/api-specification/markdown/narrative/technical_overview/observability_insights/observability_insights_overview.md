# Observability Insights API developer guide

Observability Insights is a RESTful API that allows you to expose key observability metrics in Adobe Experience Platform. These metrics provide insights into Platform usage statistics, health-checks for Platform services, historical trends, and performance indicators for various Platform functionalities. 

This document demonstrates an example call to the Observability Insights API, and provides a list of exposed metrics that are compatible with the service. For a complete list of Observability endpoints, please refer to the [Observability Insights API reference](../../../../../../acpdr/swagger-specs/observability-insights.yaml).

To successfully make calls to Platform APIs, you must first complete the [Authentication to Adobe Experience Platform tutorial](../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

* Authorization: Bearer `{ACCESS_TOKEN}`
* x-api-key: `{API_KEY}`
* x-gw-ims-org-id: `{IMS_ORG}`

## Retrieve observability metrics

You can retrieve observability metrics by making a GET request to the `/metrics` endpoint in the Observability Insights API.

#### API format

When using the `/metrics` endpoint, at least one metric request parameter must be provided. Other query parameters are optional for filtering results.

```http
GET /metrics?metric={METRIC}
GET /metrics?metric={METRIC}&metric={METRIC_2}
GET /metrics?metric={METRIC}&id={ID}
GET /metrics?metric={METRIC}&dateRange={DATE_RANGE}
GET /metrics?metric={METRIC}&metric={METRIC_2}&id={ID}&dateRange={DATE_RANGE}
```

* `{METRIC}`: The metric you want to expose. When combining multiple metrics in a single call, you must use an ampersand (`&`) to separate individual metrics. For example, `metric={METRIC_1}&metric={METRIC_2}`.
* `{ID}`: The identifier for a particular Platform resource whose metrics you want to expose. This ID may be optional, required, or not applicable depending on the metrics being used. 
* For a list of available metrics, as well as supported IDs (both required and optional) for each metric, see the [metrics table](#list-of-available-metrics) below.
* `{DATE_RANGE}`: The date range for the metrics you want to expose, in ISO 8601 format (for example, `2018-10-01T07:00:00.000Z/2018-10-09T07:00:00.000Z`).

#### Request

```shell
curl -X GET \
  https://platform.adobe.io/data/infrastructure/observability/insights/metrics?metric=timeseries.ingestion.dataset.size&metric=timeseries.ingestion.dataset.recordsuccess.count&id=5cf8ab4ec48aba145214abeb&dateRange=2018-10-01T07:00:00.000Z/2019-06-06T07:00:00.000Z \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}'
```

#### Response

A successful response returns a list of objects, each containing a timestamp within the provided `dateRange` and corresponding values for the metrics specified in the request path. If the `id` of a Platform resource is included in the request path, the results will apply only to that particular resource. If the `id` is omitted, the results will apply to all applicable resources within your IMS Organization.

```json
{
    "id": "5cf8ab4ec48aba145214abeb",
    "imsOrgId": "{IMS_ORG}",
    "timeseries": {
        "granularity": "MONTH",
        "items": [
            {
                "timestamp": "2019-06-01T00:00:00Z",
                "metrics": {
                    "timeseries.ingestion.dataset.recordsuccess.count": 1125,
                    "timeseries.ingestion.dataset.size": 32320
                }
            },
            {
                "timestamp": "2019-05-01T00:00:00Z",
                "metrics": {
                    "timeseries.ingestion.dataset.recordsuccess.count": 1003,
                    "timeseries.ingestion.dataset.size": 31409
                }
            },
            {
                "timestamp": "2019-04-01T00:00:00Z",
                "metrics": {
                    "timeseries.ingestion.dataset.recordsuccess.count": 740,
                    "timeseries.ingestion.dataset.size": 25809
                }
            },
            {
                "timestamp": "2019-03-01T00:00:00Z",
                "metrics": {
                    "timeseries.ingestion.dataset.recordsuccess.count": 740,
                    "timeseries.ingestion.dataset.size": 25809
                }
            },
            {
                "timestamp": "2019-02-01T00:00:00Z",
                "metrics": {
                    "timeseries.ingestion.dataset.recordsuccess.count": 390,
                    "timeseries.ingestion.dataset.size": 16801
                }
            }
        ],
        "_page": null,
        "_links": null
    },
    "stats": {}
}
```

## List of available metrics

Below is a list of metrics that are exposed by Observability Insights, each with their associated Platform service, description, and accepted ID query parameter.

Insights metric|Platform service|Description|ID query parameter
---- | ---- | ---- | ----
timeseries.ingestion.dataset.new.count | Data Ingestion | Total number of datasets created. | N/A
timeseries.ingestion.dataset.size | Data Ingestion | Cumulative size of all data ingested for one dataset for or all datasets.| Dataset ID (Optional)
timeseries.ingestion.dataset.dailysize | Data Ingestion | Size of data ingested on a daily usage basis for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.ingestion.dataset.batchfailed.count | Data Ingestion | Number of batches failed for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.ingestion.dataset.batchsuccess.count | Data Ingestion | Number of batches ingested for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.ingestion.dataset.recordsuccess.count | Data Ingestion | Number of records ingested for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.total.messages.rate | Data Ingestion (streaming) | Total number of messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.valid.messages.rate | Data Ingestion (streaming) | Total number of valid messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.invalid.messages.rate | Data Ingestion (streaming) | Total number of invalid messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.type.count | Data Ingestion (streaming) | Total number of invalid "type" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.range.count | Data Ingestion (streaming) | Total number of invalid "range" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.format.count | Data Ingestion (streaming) | Total number of invalid "format" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.pattern.count | Data Ingestion (streaming) | Total number of invalid "pattern" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.presence.count | Data Ingestion (streaming) | Total number of invalid "presence" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.enum.count | Data Ingestion (streaming) | Total number of invalid "enum" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.unclassified.count | Data Ingestion (streaming) | Total number of invalid "unclassified" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.validation.category.unknown.count | Data Ingestion (streaming) | Total number of invalid "unknown" messages for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.data.collection.inlet.total.messages.received | Data Ingestion (streaming) | Total number of messages received for one data inlet or for all data inlets. | Inlet ID (Optional)
timeseries.data.collection.inlet.total.messages.size.received | Data Ingestion (streaming) | Total size of data received for one data inlet or for all data inlets. | Inlet ID (Optional)
timeseries.data.collection.inlet.success | Data Ingestion (streaming) | Total number of successful HTTP calls to one data inlet or to all data inlets. | Inlet ID (Optional)
timeseries.data.collection.inlet.failure | Data Ingestion (streaming) | Total number of failed HTTP calls to one data inlet or to all data inlets. | Inlet ID (Optional)
timeseries.profiles.dataset.recordread.count | Real-time Customer Profile | Number of records read from the data lake by Profile, for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.profiles.dataset.recordsuccess.count | Real-time Customer Profile | Number of records written to their data source by Profile, for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.profiles.dataset.recordfailed.count | Real-time Customer Profile | Number of records failed by Profile, for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.profiles.dataset.batchsuccess.count | Real-time Customer Profile | Number of Profile batches ingested for a dataset or for all datasets. | Dataset ID (Optional)
timeseries.profiles.dataset.batchfailed.count | Real-time Customer Profile | Number of Profile batches failed for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.identity.dataset.recordsuccess.count | Identity Service | Number of records written to their data source by Identity Service, for one dataset or all datasets. | Dataset ID (Optional)
timeseries.identity.dataset.recordfailed.count | Identity Service | Number of records failed by Identity Service, for one dataset or for all datasets. | Dataset ID (Optional)
timeseries.identity.dataset.namespacecode.recordsuccess.count | Identity Service | Number of Identity records successfully ingested for a namespace. | Namespace ID (**Required**)
timeseries.identity.dataset.namespacecode.recordfailed.count | Identity Service | Number of Identity records failed by a namespace. | Namespace ID (**Required**)
timeseries.identity.dataset.namespacecode.recordskipped.count | Identity Service | Number of Identity records skipped by a namespace. | Namespace ID (**Required**)
timeseries.identity.graph.imsorg.uniqueidentities.count | Identity Service | Number of unique identities stored in the identity graph for your IMS Organization. | N/A
timeseries.identity.graph.imsorg.namespacecode.uniqueidentities.count | Identity Service | Number of unique identities stored in the identity graph for a namespace. | Namespace ID (**Required**)
timeseries.identity.graph.imsorg.numidgraphs.count | Identity Service | Number of unique graph identities stored in the identity graph for your IMS Organization. | N/A
timeseries.identity.graph.imsorg.graphstrength.uniqueidentities.count | Identity Service | Number of unique identities stored in the identity graph for your IMS Organization for a particular graph strength ("unknown", "weak", or "strong"). | Graph strength (**Required**)
timeseries.gdpr.jobs.totaljobs.count | GDPR | Total number of jobs created from GDPR. | ENV (**Required**)
timeseries.gdpr.jobs.completedjobs.count | GDPR | Total number of completed jobs from GDPR. | ENV (**Required**)
timeseries.gdpr.jobs.errorjobs.count | GDPR | Total number of error jobs from GDPR. | ENV (**Required**)
timeseries.queryservice.query.scheduleonce.count | Query Service | Total number of non-recurring scheduled queries. | N/A
timeseries.queryservice.query.scheduledrecurring.count | Query Service | Total number of recurring scheduled queries. | N/A
timeseries.queryservice.query.batchquery.count | Query Service | Total number of executed batch queries. | N/A
timeseries.queryservice.query.scheduledquery.count | Query Service | Total number of executed scheduled queries. | N/A
timeseries.queryservice.query.interactivequery.count | Query Service | Total number of executed interactive queries. | N/A
timeseries.queryservice.query.batchfrompsqlquery.count | Query Service | Total number of executed batch queries from PSQL. | N/A