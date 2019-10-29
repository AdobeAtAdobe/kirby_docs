# Connect with Looker

To connect Looker with Adobe Query Service on Adobe Experience Platform, please follow the steps below:

After logging into Looker, click on **Admin**, followed by **Connections**.

![](images/clients/looker/click-admin-connections.png)

On this page, click on **New Connection**.

![](images/clients/looker/click-new-connection.png)
   
From here, you can fill out the details for the Connection Settings.

![](images/clients/looker/new-connection.png)

- **Name:** The name of your connection.
- **Dialect:** The dialect used for the SQL database. Query Service uses **PostgreSQL**.
- **Host and Port:** The host endpoint and its port for Query Service. To find the host and port that you should use, visit the [credentials page on Platform][credentials].
- **Database:** The database that will be used. To find the database you should use, visit the [credentials page on Platform][credentials].
- **Username and Password:** The login credentials that will be used. The username will be in the form of `ORG_ID@AdobeOrg`. To find out your login credentials, visit the [credentials page on Platform][credentials].

After inputting your connection details, click on **Test These Settings** to ensure your credentials work properly. If they do, a message telling you can connect will appear below. If your connection is indeed successful, click on **Add Connection** to create your connection.

![](images/clients/looker/click-test-connection.png)

## Next Steps

Now that you've connected with Query Service, you can use Looker to write queries. For more information on how to write and run queries, please read the [running queries guide][running-queries].

[credentials]: https://platform.adobe.com/query/configuration
[running-queries]: ./qs-queries.md