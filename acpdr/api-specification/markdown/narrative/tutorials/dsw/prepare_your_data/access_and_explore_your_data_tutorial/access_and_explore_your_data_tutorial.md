# Access and explore your data <!-- omit in toc -->

This tutorial provides you with the prerequisites and assets required for all other Adobe Experience Platform Data Science Workspace tutorials. Upon completion, the Retail Sales schema and datasets will be available for you and members of your IMS Organization on Experience Platform.

-   [Create Retail Sales schema and dataset](#create-retail-sales-schema-and-dataset)
-   [Preview your schema and data](#preview-your-schema-and-data)

## Getting started

Before starting this tutorial, you must have the following prerequisites:
*   Access to Adobe Experience Platform. If you do not have access to an IMS Organization in Experience Platform, please speak to your system administrator before proceeding.
*   Authorization to make Experience Platform API calls. Complete the [Authenticate and access Adobe Experience Platform APIs](../../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) tutorial to obtain the following values in order to successful complete this tutorial:
    *   Authorization: `{ACCESS_TOKEN}`
    *   x-api-key: `{API_KEY}`
    *   x-gw-ims-org-id: `{IMS_ORG}`
    *   Client secret: `{CLIENT_SECRET}`
    *   Client certificate: `{PRIVATE_KEY}`
*   Sample data and source files for the [Retail Sales Recipe](../../../../technical_overview/data_science_workspace_overview/dsw_prebuilt_recipes/retail_sales_recipe/retail_sales_recipe.md). Download the assets required for this and other Data Science Workspace tutorials from the <a href="https://github.com/adobe/experience-platform-dsw-reference/">Adobe public Git repository</a>.
*   <a href="https://www.python.org/download/releases/2.7/" target="_blank">Python 2.7</a> and the following Python packages:
    *   <a href="https://pypi.org/project/pip/" target="_blank">pip</a>
    *   <a href="https://pyyaml.org/" target="_blank">PyYAML</a>
    *   <a href="https://pypi.org/project/dictor/" target="_blank">dictor</a>
    *   <a href="https://pypi.org/project/jwt/" target="_blank">JWT</a>
*   A working understanding of the following concepts used in this tutorial:
    *   [Experience Data Model (XDM)](../../../../technical_overview/schema_registry/xdm_system/xdm_system_in_experience_platform.md)
    *   [Basics of schema composition](../../../../technical_overview/schema_registry/schema_composition/schema_composition.md)

## Create Retail Sales schema and dataset

The Retail Sales schema and datasets are created automatically by using the provided bootstrap script. Follow the steps below in order:

### Configure files

1.  Inside the Experience Platform tutorial resource package, navigate into the directory `bootstrap`, and open `config.yaml` using an appropriate text editor. 
2.  Under the `Enterprise` section, input the following values:

    ```yaml
    Enterprise:
        api_key: {API_KEY}
        org_id: {IMS_ORG}
        tech_acct: {technical_account_id}
        client_secret: {CLIENT_SECRET}
        priv_key_filename: {PRIVATE_KEY}
    ```

3.  Edit the values found under the `Platform` section, Example shown below:

    ```yaml
    Platform:
        platform_gateway: https://platform.adobe.io
        ims_token: {ACCESS_TOKEN}
        ingest_data: "True"
        build_recipe_artifacts: "False"
        kernel_type: Python
    ```

    *   `platform_gateway` : The base path for API calls. Do not modify this value.
    *   `ims_token` : Your `{ACCESS_TOKEN}` goes here.
    *   `ingest_data` : For the purpose of this tutorial, set this value as `"True"` in order to create the Retail Sales schemas and datasets. A value of `"False"` will only create the schemas.
    *   `build_recipe_artifacts` : For the purpose of this tutorial, set this value as `"False"` to prevent the script from generating a Recipe artifact.
    *   `kernel_type` : The execution type of the Recipe artifact. Leave this value as `Python` if `build_recipe_artifacts` is set as `"False"`, otherwise specify the correct execution type.

4.  Under the `Titles` section, provide the following information appropriately for the Retail Sales sample data, save and close the file after edits are in place. Example shown below:

    ```yaml
    Titles:
        input_class_title: retail_sales_input_class
        input_mixin_title: retail_sales_input_mixin
        input_mixin_definition_title: retail_sales_input_mixin_definition
        input_schema_title: retail_sales_input_schema
        input_dataset_title: retail_sales_input_dataset
        file_replace_tenant_id: DSWRetailSalesForXDM0.9.9.9.json
        file_with_tenant_id: DSWRetailSales_with_tenant_id.json
        is_output_schema_different: "True"
        output_mixin_title: retail_sales_output_mixin
        output_mixin_definition_title: retail_sales_output_mixin_definition
        output_schema_title: retail_sales_output_title
        output_dataset_title: retail_sales_output_dataset
    ```

### Run the bootstrap script

1.  Open your terminal application and navigate to the Experience Platform tutorial resource directory.
2.  Set the `bootstrap` directory as the current working path and run the `bootstrap.py` python script by entering the following command:

    ```bash
    python bootstrap.py
    ```

    >   **Note:** The script may take several minutes to complete.

## Preview your schema and data

Upon successful completion of the bootstrap script, the Retail Sales input and output schemas and datasets can be viewed on Experience Platform. 

1.  Click the **Schemas** link located in the left navigation column and find the input schema created by the bootstrap script. The name of the schema will correspond to what was defined in `config.yaml` from the previous step. View the schema details and it's composition by clicking into it.

    ![](./images/schema_overview.png)

2.  Click the **Datasets** link located in the left navigation column and open the input dataset that was created by clicking on the name of the listing. The name of the dataset will correspond to what was defined in `config.yaml` from the previous step. 

    ![](./images/dataset_overview.png)

3.  Click **Preview Dataset** located at the top right preview a subset of the dataset.

    ![](./images/preview_dataset.png)

## Next steps

You have now successfully ingested Retail Sales sample data into Experience Platform using the provided bootstrap script.

To continue working with the ingested data:
* [Analyze your data using Jupyter notebooks](../analyze_your_data_using_jupyter_notebooks/analyze_your_data_using_jupyter_notebooks.md)
    * Use Jupyter notebooks in Data Science Workspace to access, explore, visualize, and understand your data.
* [Package source files into a Recipe](../../author_a_model/package_source_files_into_recipe/package_source_files_into_recipe.md)
    * Follow this tutorial to learn how to bring your own Model into Data Science Workspace by packaging source files in an importable Recipe file.