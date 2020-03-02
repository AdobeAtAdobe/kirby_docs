# Create an Adobe Audience Manager source connector in the UI

This tutorial walks you through the steps to create a source connectors for Adobe Audience Manager to bring in Consumer Experience Event data into Platform using the user interface.

## Create a source connection with Adobe Audience Manager

Log in to <a href="https://platform.adobe.com" target="_blank">Adobe Experience Platform</a> and then select **Sources** from the left navigation bar to access the sources workspace. The *Catalog* screen displays a variety of sources for which you can create source connections with, and each source shows the number of existing connections associated to them.

Under the *Adobe applications* category, select **Adobe Audience Manager** to expose an information bar on the right-side of your screen. The information bar provides a brief description for the selected source as well as options to view its documentation or to connect with the source.

To create a new source connector for Adobe Audience Manager, click **Connect source**.

![](./../../images/aam/aam_catalog.png)

A dialog box appears. Click **Connect** to create the connection.

![](./../../images/aam/aam_connect_full.png)

If a source connection with Adobe Audience Manager is established, the *Source activity* page for Audience Manager connector be displayed.

![](./../../images/aam/aam_flow.png)

If you wish to pause incoming Audience Manager data, you can do so by clicking the dataflow listing and toggle its *Status* from the right *Properties* column.

![](./../../images/aam/aam_flow_disable.png)

## Next steps

While an Audience Manager dataflow is active, incoming data is automatically ingested into Real-time Customer Profiles. You can now utilize this incoming data and create audience segments using Platform Segmentation Service. See the following documents for more details:

-   [Real-time Customer Profile overview](./../../../../technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md)
-   [Segmentation Service overview](./../../../../technical_overview/segmentation/segmentation-overview.md)