# Running queries

Adobe Experience Platform Query Service provides the power to run SQL queries against datasets in the Data Lake within Experience Platform. As you use SQL to interact with datasets in the Data Lake, it is important to understand that Query Service automatically manages certain aspects, such as creating SQL-safe table names for each dataset in the data lake. 

There are also considerations around working with hierarchical data in the Data Lake, including discovering the schema upon which a dataset is based and ensuring that you are selecting the correct field within the hierarchical model.

The following documentation will help you to better understand core concepts within Query Service:

* [Datasets vs tables and schema](qs-queries-datasetsvtables.md)
* [General guidance for writing queries](qs-queries-writingqueries.md)
* [ExperienceEvent queries](qs-queries-experienceevent.md)
* [Joining datasets](qs-queries-joiningdatasets.md)
* [Using Adobe-defined functions (ADFs)](qs-queries-adobefunctions.md)
* [Deduplicating data](qs-deduplication.md)
