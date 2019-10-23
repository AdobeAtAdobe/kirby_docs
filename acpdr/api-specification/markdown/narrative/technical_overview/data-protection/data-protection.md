# Data protection standards and procedures in Experience Platform

All data that is ingested and used by Adobe Experience Platform is stored in the Data Lake, a highly granular data store containing all data managed by Platform, regardless of origin or file format. All data persisted in the Data Lake is encrypted, stored, and managed in an isolated Microsoft Azure Data Lake Storage account that is unique to your organization.

The following process flow diagram illustrates how data is ingested, processed, encrypted, and persisted by Experience Platform:

![](images/platform-data-protection-flow.png)

For more information on how data at rest is encrypted in Data Lake Storage, see the document on [data encryption in Azure Data Lake Storage](https://docs.microsoft.com/en-us/azure/data-lake-store/data-lake-store-encryption). For information on how data at rest is encrypted in Cosmos DB, see the document on [data encryption in Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/database-encryption-at-rest).