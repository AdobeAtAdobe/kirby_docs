# Get Your Data on Adobe Cloud Platform

Ingest additional datasets, beyond the solution datasets, needed to support planned queries.

These might include:

*   CRM dataset
*   Point-of-sale dataset
*   Experience event dataset from an external system, such as an ad server or e-commerce platform, or any other external dataset

Data is ingested using the Adobe bulk ingestion APIs.

If you can ingest data into the platform, that data can be queried. It is not required that you reformat to XDM or that you dedupe or otherwise clean up the dataset.

The Query Service generates an offline token for the user. The client ID is `acp\_foundations\_queryService` and the user ID is the actual user. This causes the Catalog DataSet `createdClient` to be `acp\_foundations\_queryService`, which is used to display the Source in the table as Query Service.
