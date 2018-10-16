# What Is the Query Service?

Use the Query Service to build comprehensive data analysis ecosystems. Create a picture of consumers across their various interaction channels. These channels might include:

*   Point-of-sale system
*   Website
*   CRM system

The Query Service helps you collect all that data in one place and answer questions about that data.

Traditionally, data has been siloed in different vendor solutions or managed across different internal environments like Hadoop or other proprietary data warehousing systems, making it difficult to access and use together to gain the most insights. And, once insights are generated, each of these environments has different workflows for getting them back into the Experience Cloud.

The Adobe Experience Platform Query Service closes that loop. It provides a general-purpose SQL interface for Experience Platform datasets.

The Query Service serves as a consolidated reporting SQL interface for solutions across the Experience Cloud and other datasets loaded into the Experience Platform.

In its current implementation, Query Service provides:

*   Basic structure
*   Query service itself
*   SQL interface to make it possible to generate queries
*   Integration pathways for external tools to connect and issue queries

## High-Level Objectives

*   Provide an SQL interface into Experience Platform datasets.
*   Support the existing Adobe IMS authorization model.
*   Support Analytics reporting functionality like Sessionization and Attribution through extra SQL helper functions.
*   Support joining between datasets.
*   Support both live and export queries.
*   Support a classic HTTP API and allow integrations with 3rd party applications without a new, proprietary JDBC/ODBC driver.
*   Lay the foundation for future functionality later, such as machine learning.
*   Accomplish all of the above using open-source resources whenever possible.