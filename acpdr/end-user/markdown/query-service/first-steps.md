# First Steps

1.  Make sure your data is ingested.
    
    If you can ingest data into the platform, that data can be queried. It is not required that you reformat to XDM or that you dedupe or otherwise clean up the data set.
    
    The following clients are officially supported:
    
    *   PSQL Command Line Interface
    *   Tableau
    *   Power BI
    
    Querying is based on the postgres protocol. Other clients might work.
    
2.  [Ingest](qs-add-data.md) data
    
3.  Connect an external tool.
    
4.  Issue queries
    
    Not all [SQL syntax is supported](qs-sql-syntax.md). 
    
    For example, select statements are supported, but insert or update statements are not. Query Service uses a read-only paradigm for queries.