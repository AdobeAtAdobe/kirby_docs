# Enrich Real-time Customer Profile using machine learning insights

Adobe Experience Platform Data Science Workspace provides the tools and resources to create, evaluate, and utilize machine learning models to generate data predictions and insights. When machine learning insights are ingested into a Profile-enabled dataset, that same data is also ingested as Profile records which can then be segmented into subsets of related elements by using Experience Platform Segmentation Service.

This document provides a step-by-step tutorial to enrich Real-time Customer Profile with machine learning insights, steps are broken into the following sections:

1.  [Create an output schema and dataset](#create-an-output-schema-and-dataset)
2.  [Configure an output schema and dataset](#configure-an-output-schema-and-dataset)
3.  [Create segments using the Segment Builder](#create-segments-using-the-segment-builder)

## Getting started

This tutorial requires a working understanding of the various aspects of Adobe Experience Platform involved in ingesting Profile data and creating segments. Before beginning this tutorial, please review the documentation for the following services:

*   <a href="https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md" target="_blank">Real-time Customer Profile</a>: Provides a unified, real-time consumer profile based on aggregated data from multiple sources.
*   <a href="https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/identity_services_architectural_overview/identity_services_architectural_overview.md" target="_blank">Identity Service</a>: Enables Real-time Customer Profile by bridging identities from disparate data sources being ingested into Platform.
*   <a href="https://www.adobe.io/apis/experienceplatform/home/xdm/xdmservices.html#!api-specification/markdown/narrative/technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md" target="_blank">Experience Data Model (XDM)</a>: The standardized framework by which Platform organizes customer experience data.

In addition to the above-mentioned documents, it is highly recommended that you also review the following guides on schemas and the Schema Editor:

*   <a href="https://www.adobe.io/apis/experienceplatform/home/xdm/xdmservices.html#!api-specification/markdown/narrative/technical_overview/schema_registry/schema_composition/schema_composition.md" target="_blank">Basics of schema composition</a>: Describes XDM schemas, building blocks, principles, and best practices for composing schemas to be used in Experience Platform.
*   <a href="https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/schema_editor_tutorial/schema_editor_tutorial.md" target="_blank">Schema Editor tutorial</a>: Provides detailed instructions for creating schemas using the Schema Editor within Experience Platform.

## Create an output schema and dataset

The first step towards enriching Real-time Customer Profile with scoring insights is knowing what real-world object (such as a person) your data defines. Having an understanding of your data enables you to describe and design a structure that is meaning to your data, much like designing a relational database.

Composing a schema begins by assigning a class. Classes define the behavioral aspects of the data the schema will contain (record or time-series). This section provides basic instructions to create a schema using the schema builder. For a more in-depth tutorial, refer to the tutorial on <a href="https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/schema_editor_tutorial/schema_editor_tutorial.md" target="_blank">creating a schema using the Schema Editor</a>.

1.  On Adobe Experience Platform, click the **Schema** tab to access the schema browser. Click **Create Schema** access the *Schema Editor*, where you can interactively build and create schemas.
    ![](./images/schema_browser.png)

2.  Within the *Composition* window, click **Assign** to browse your available classes.
    *   To assign an existing class, click and highlight the desired class and then click **Assign Class**.
        ![](./images/existing_class.png)

    *   To create a custom class, click **Create New Class** found near the center-top of the browser window. Provide a class name, description, and choose the class's behavior. Click **Assign Class** once you are finished.
        ![](./images/create_new_class.png)

    At this point, your schema's structure should contain some class fields and you are ready to assign mixins. A mixin is a group of one or more fields that describe a particular concept.

3.  Within the *Composition* window, click **Add** in the *Mixins* sub-section.
    *   To assign an existing mixin, click and highlight the desired mixin and then click **Add Mixin**. Unlike classes, multiple mixins can be assigned to a single schema as long as it is appropriate to do so.
        ![](./images/existing_mixin.png)

    *   To create a new mixin, click **Create New Mixin** found near the center-top of the browser window. Provide a name and description for the mixin then click **Assign Mixin** once you are finished.
        ![](./images/create_new_mixin.png)

    *   To add mixin fields, click the name of the mixin inside the *Composition* window. You will then be provided the option to add mixin fields by clicking **Add Field** within the *Structure* window. Ensure to provide mixin properties accordingly.
        ![](./images/mixin_properties.png)

4.  Once you are done building your schema, click the top level field of your schema within the *Structure* window to display the schema's properties in the right property window. Provide a name and a description, and click **Save** to create the schema.
    ![](./images/save_schema.png)

5.  Create an output dataset using your newly created schema by clicking **Datasets** from the left navigation column, then click **Create dataset**. On the next screen, choose **Create dataset from schema**.
    ![](./images/dataset_overview.png)

6.  Using the schema browser, find and select the newly created schema, then click **Next**.
    ![](./images/choose_schema.png)

7.  Provide a name and an optional description, then click **Finish** to create the dataset.
    ![](./images/configure_dataset.png)

Now that you have a created an output schema dataset, you are ready continue on to the next section to configure and enable them for Profile enrichment.

## Configure an output schema and dataset

Before you can enable a dataset for Profile, you need to configure the dataset's schema to having a primary identity field and then enable the schema for Profile. If you wish to create and enable a new schema, you can refer to the tutorial on <a href="https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/schema_editor_tutorial/schema_editor_tutorial.md" target="_blank">creating a schema using the Schema Editor</a>. Otherwise follow the instructions below to enable an existing schema and dataset.

1.  On Adobe Experience Platform, use the schema browser to find the output schema you wish to enable Profile on and click its name to view its composition.
    ![](./images/schemas.png)

2.  Expand the schema structure and find an appropriate field to set as the primary identifier. Click the desired field to display its properties.
    ![](./images/schema_structure.png)

3.  Set the field as the primary identity by enabling the field's **Identity** property, **Primary Identity** property, and then selecting an appropriate **Identity Namespace**. Click **Apply** once you have made your changes.
    ![](./images/set_identity.png)

4.  Click the top-level object of your schema structure to display the schema properties and enable the schema for Profile by toggling the **Profile** switch. Click **Save** to finalize your changes, dataset that were created using this schema can now be enabled for Profile.
    ![](./images/enable_schema.png)

5.  Use the dataset browser to find the dataset you wish to enable Profile on and click its name to access its details.
    ![](./images/datasets.png)

6.  Enable the dataset for Profile by toggling the **Profile** switch found in the right information column. 
    ![](./images/enable_dataset.png)

When data is ingested into a Profile-enabled dataset, that same data is also ingested as Profile records. Now that your schema and dataset is prepared, generate some data into the dataset by performing scoring runs using an appropriate model, and continue with this tutorial to create insight segments using the Segment Builder.

## Create segments using the Segment Builder

Now that you have generated and ingested insights into your Profile-enabled dataset, you can manage that data by identifying subsets of related elements using the Segment Builder. Follow the steps below to build your own segments.

1.  On Adobe Experience Platform, click the **Segments** tab followed by **Create Segment** to access the Segment Builder.
    ![](./images/segments_overview.png)

2.  Within the Segment Builder, the left rail provides access to the core building blocks of segments: attributes, events, and existing segments. Each building block appears in its own respective tab. Select the class to which your Profile-enabled schema extends then browse and find the building blocks for your segment.
    ![](./images/segment_builder.png)

3.  Drag and drop building blocks onto the rule builder canvas, complete them by providing comparative statements.
    ![](./images/drag_fill.gif)

4.  While you build your segment you can preview estimated segment results by observing the *Segment Properties* panel.
    ![](./images/preview_segment.gif)

5.  Select an appropriate **Merge Policy**, provide a name and an optional description, then click **Save** to complete your new segment.
    ![](./images/save_segment.png)


## Next steps

This document walked you through the steps required to enable a schema and dataset for Profile, and briefly demonstrated the workflow for creating insight segments using the Segment Builder. To learn more about segments and the Segment Builder, refer to the <a href="https://www.adobe.io/apis/experienceplatform/home/profile-identity-segmentation/profile-identity-segmentation-services.html#!api-specification/markdown/narrative/technical_overview/segmentation/segmentation-overview.md" target="_blank">Segmentation Service overview</a>.
