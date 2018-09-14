# Connect a Supported Client

The following clients are officially supported:

*   PSQL Command Line Interface
*   Tableau
*   Power BI

Querying is based on the postgres protocol. Other clients might work.

## Connect to Query Service using the PSQL Command Line

To use the PSQL command line to connect to Query Service, enter the following, substituting your own token and other authentication information:

```
psql ”sslmode=require
      host=query….mc.adobe.net
      port=5432
      dbname=5ac…6a89
      user=0E2…29@AdobeOrg
options='token=eyJ4N…WLA' "
```

Once you've connected, use the `/d` command see which tables are available for queries. For example:

```
5ac….a89=> \\d
```

                  List of relations
Schema |           Name            | Type  |  Owner  
--------+---------------------------+-------+----------
public | aa\_post\_vals\_3\_production | table | postgres
(1 row)