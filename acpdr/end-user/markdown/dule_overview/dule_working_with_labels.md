# Working with Data Usage Labels in Adobe Experience Platform

Data Usage Labeling and Enforcement (DULE) is at the core of the data governance infrastructure included in Adobe Experience Platform. DULE features enable data usage labels to be applied to connections, datasets, and fields, categorizing them according to the type of data usage policies applied.

Data usage labels are inherited down from connections to datasets and from datasets to fields. This means that data usage labels applied at the connection level are propagated to all datasets and fields in the connection, while labels applied to datasets are propagated to all fields in the dataset. Labels can also be applied directly to individual fields (column headers) in a dataset, without propagation.

Labels can be applied at any time, providing flexibility in how you choose to govern data. Best practice encourages labeling data as soon as it is ingested into Experience Platform, or as soon as data becomes available in Platform.

The examples below will walk you through the steps necessary to add and edit labels at the Connection, Dataset, and Field level using the Data workspace in Adobe Experience Platform. Each example requires you to have an Adobe ID and access to Adobe Experience Platform.

More information regarding Data Usage Labeling and Enforcement can be found in the [DULE User Guide](dule_overview.md).

### Adding Data Usage Labels at the Connection Level
Creating a connection requires login access to the connector. In this example, a connection will be made to Microsoft Dynamics.

1. In Adobe Experience Platform, select the Data workspace from the top navigation.
![Data Workspace](DataWorkspace.png)
1. From the Data workspace, select the Connections tab. If connections have been made, they will be listed here with Connection Name, Source, and Status.
![Connections Tab](DataWorkspaceList.png)
1. To create a new connection, click on the “Create Dataset” button.
1. On the Select Data Source screen, under Adobe Connectors, click the "Create Connection" button for Microsoft Dynamics.
![Create Connection](ConnectionCreate.png)
1. Use your Microsoft Dynamics credentials to connect.
1. On the Create Connection screen, under "Configure: Microsoft Dynamics", give the connection a Name (required) and Description (optional), then click the "Add Labels" button to begin adding labels.
![Connection-Level Labels](ConnectionAddLabels.png)
1. In the “Edit Data Labels” dialog, expand each type of label to see all available options. Select the checkbox next to each label that you would like to add. The “Applied Labels” section at the top of the dialog will show any labels that are currently applied, and will update when you save your changes. Once you have finished selecting labels, click the "Save Changes" button. 
![Add connection-level labels](ConnectionAddLabelsDialog.png)
1. The connection labels you selected will now appear on the Data Governance tab within the connection details.
![Data Governance Tab](ConnectionDetailsDataGovernance.png)

### Editing Data Usage Labels via Connection Details
1. Select the Connections tab in the Data workspace.
1. From the list of connections, click on the name of the connection that you wish to edit.
1. On the connection details page, select the Data Governance tab. All connection labels that have been applied to this connection are visible in the Connection Labels section, beside the connection name.
![Data Governance Tab](ConnectionDetailsDataGovernance.png)
1. To remove a label, click on the "x" next to the individual label.
1. To add new labels, hover over the connection row and a pencil "edit" icon will appear.
![Edit connection-level labels](ConnectionLabels.png)
1. Click on the pencil icon to open the "Edit Data Labels" dialog (the same dialog you saw when creating the connection).  
![Edit Label Dialog](ConnectionLabelsDialog.png)
1. Select data labels by checking the checkbox next to each label you wish to use. 
1. Once you have finished selecting data usage labels, click the "Save Changes" button. 
1. You will now see all selected connection labels on the Data Governance tab within the connection details.

### Adding Data Usage Labels at the Dataset Level During Data Ingestion
1. In Adobe Experience Platform, select the Data workspace from the top navigation.
1. From within the Data workspace, select the Dataset tab. If datasets have been created, they will be listed here with Dataset Name, Source, Schema, and Status of Last Batch.
![Dataset Tab within Data Workspace](DatasetListView.png)
1. To create a new dataset using a file, click on the "Create Dataset" button.
1. On the Select Data Source screen, under Adobe Connectors, click the "Create Dataset" button for File.
![Create Dataset using a File](DatasetCreate.png)
1. Add a Name for the dataset (required) and a Description (optional), then click the "Next" button.
![Add Dataset Name and Description](DatasetCreateDataset.png)
1. You can then drag and drop or browse your computer to find the file you wish to use for your dataset. Adobe Experience Platform accepts CSV files up to 10 GB in size.
![Adding labels to dataset during ingest](DatasetLabelsIngest.png)
1. Once the data file has been successfully added, the option to add Data Governance Labels will appear. Select "Add Labels" to open the "Edit Data Labels" dialog.
![Edit Data Labels Dialog](DatasetEditDataLabelsDialog.png)
1. Select data labels by checking the checkbox beside each label you wish to use.
1. Once you have finished selecting data usage labels, click the "Save Changes" button. The selected label(s) will appear under "Data Governance Labels" in the Create Dataset screen.
![Labels Applied to Dataset](DatasetAppliedLabels.png)
1. Click the "Save" button to save your dataset.

### Editing Data Usage Labels via Dataset Details
1. Select the Datasets tab in the Data workspace.
1. From the list of datasets, click on the name of the dataset you wish to edit.
![Select Dataset from List](DatasetEditFromList.png)
1. On the dataset details page, select the Data Governance tab. 
![Dataset Data Governance Tab](DatasetDataGovernanceTab.png)
1. In the Dataset Labels section, you will see the Dataset Name as well as any existing data labels. To remove a label, click on the "x" next to the individual label.  
1. To remove multiple labels at once, or add new labels to the dataset, hover over the dataset name and a pencil "edit" icon will appear. 
![Hover over the dataset to edit](DatasetEditDatasetLabels.png)
1. Click on the pencil icon to open the "Edit Data Labels" dialog.
1. Select data labels by checking the checkbox next to each label you wish to use. 
1. Once you have finished selecting data usage labels, click the "Save Changes" button. 
1. You should now see all selected dataset labels next to the name of the dataset, within the Dataset Labels section of the Data Governance tab.

**Show Inherited Labels** 

The "Show Inherited Labels" toggle is off by default. If you toggle it on, you will see any inherited labels from the connection-level down to the dataset and fields. These inherited labels will not have an "x" next to them for easy removal, and will be "greyed out" in the Edit Data Labels dialog.

This is because **inherited fields are read only**, meaning they cannot be removed at the dataset or field-level. Labels applied at the connection-level can only be removed by following the [_Editing Data Usage Labels via Connection Details_](#Editing-Data-Usage-Labels-via-Connection-Details) steps outlined above. 

### Adding Data Usage Labels at the Field Level via Dataset Details 

Continuing the workflow above for [_Editing Data Usage Labels via Dataset Details_](#editing-data-usage-labels-via-dataset-details), if the dataset contains data (meaning there is at least one column and one row) you will see a section in the dataset details called Field Labels.  Each column in a dataset is represented by a row in the Field Labels section.  

1. Hover over the field row you wish to edit and a pencil "edit" icon will appear. Alternatively, click the checkbox beside the field name and an "Edit Data Labels" button will appear. To add and edit labels for multiple fields at once, select the "Fields in Dataset" checkbox to select all fields and the "Edit Data Labels" button will appear.
![Edit Field Labels](FieldEditDataLabels.png)
1. Click on the pencil icon (or the "Edit Data Labels" button) to open the "Edit Data Labels" dialog. You will see a list of Selected Fields and Applied Labels at the top of the dialog.
![Edit Data Labels for Individual Fields](FieldEditLabelDialog.png)
1. Select data labels by checking the checkbox next to each label you wish to use. As noted above, inherited labels are read only, and will be greyed out in the dialog, meaning you will not be able to edit them.
1. Once you have finished selecting data usage labels, click the "Save Changes" button. 
1. You will now see the selected field labels for each Field in the row next to the Field Name. You can repeat these steps to continue adding field-level labels to additional fields.
![Field Labels Section](FieldsFieldLabelSection.png)


**Note:** It is important to remember that inheritance moves from the top-level down only (Connection → Dataset → Fields), meaning that labels applied at the field-level will not be propagated to other fields or upwards to the dataset or connection.