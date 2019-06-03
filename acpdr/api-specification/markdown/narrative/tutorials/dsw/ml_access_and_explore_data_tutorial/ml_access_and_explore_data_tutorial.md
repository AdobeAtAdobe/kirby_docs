# How to access and explore data in Data Science Workspace <!-- omit in toc -->

- [Objective](#objective)
- [Concepts Introduced:](#concepts-introduced)
- [Create Retail Sales schema and dataset](#create-retail-sales-schema-and-dataset)
- [Preview your schema and data](#preview-your-schema-and-data)
- [Explore notebooks in Data Science Workspace](#explore-notebooks-in-data-science-workspace)
    - [Choose your workspace](#choose-your-workspace)
    - [Create a new notebook](#create-a-new-notebook)
    - [Access data](#access-data)
        - [External data](#external-data)
        - [Adobe Experience Platform data](#adobe-experience-platform-data)
            - [By Dataset ID](#by-dataset-id)
    - [Explore our data](#explore-our-data)
        - [Statistical summary](#statistical-summary)
        - [Data visualization](#data-visualization)
            - [Univariate graphs](#univariate-graphs)
            - [Multivariate graphs](#multivariate-graphs)
- [Next steps](#next-steps)

---

## Objective
In this step by step tutorial, we will focus on how to create a new Jupyter notebook in the Data Science Workspace to access data from Adobe Experience Platform. You will also be able to upload data from external sources. We will then explore the dataset to get a better understanding of the data. The main points that will be covered in this tutorial are:

* Create a dataset based on a schema
* Explore dataset in Platform
* Create a new Jupyter notebook
* Explore dataset in notebook

We will go through the UI flow in this tutorial. The example we will use in the tutorial is the [Retail Sales Python recipe](https://github.com/adobe/experience-platform-dsw-reference/tree/master/recipes/python/retail).

> **Note:** Data Science Workspace also supports the following languages:
> * Scala
> * PySpark
> * Tensorflow
> * R

---

## Concepts Introduced:
* XDM: [Experience Data Model](https://www.adobe.io/open/standards/xdm.html) is the common language for the experience business.
* Datasets: [Adobe Experience Platform](https://www.adobe.io/apis/experienceplatform/home/overview.html) is an open system. A Dataset is a collection of data that includes schema and fields. Datasets available in the platform can be read and exported.
* Batches: Datasets are made up of batches. A Batch is a set of data collected over a period of time and processed together as a single unit. New batches are created when data is added to a Dataset.
* JupyterLab: [JupyterLab](https://blog.jupyter.org/jupyterlab-is-ready-for-users-5a6f039b8906) is the next-generation web-based interface for Project Jupyter, and is tightly integrated into Adobe Experience Platform.
* Data Access SDK: The Data Access SDK (integrated in Data Science Workspace) is used to read and write data to the platform at scale.

---

## Create Retail Sales schema and dataset

In this section, you will be creating an XDM schema and ingesting external data into a dataset. This data will be used later to create our machine learning model.

In this tutorial, we have provided a script that will output the Retail Sales Schema, and Retail Sales dataset. Specifically, the script will do the following steps for you:
1. Get the tenantID of the org
2. Create Retail Sales class
3. Create Retail Sales mixin with the class
4. Create Retail Sales Schema with the class and the mixin
5. Create dataset with the schema
6. Create batch with the dataset
7. Ingest the datafile (with the right tenantID)
8. Close the batch

Since the script leverages the [APIs](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/schema-registry.yaml), you will need to provide your IMS Organization ID, API key, and bearer access token as they are prerequisites to making API calls to Platform. Visit the [How to access Adobe Experience Platform APIs](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) tutorial to get started.

To begin clone or download the [experience-platform-dsw-reference](https://github.com/adobe/experience-platform-dsw-reference) to your computer. The script will be in the `bootstrap` folder.

Next, open the `config.yaml` in a text editor and make changes to the following variables:
* `api_key`: Can be found in the [Copy down access values](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md#copy-down-access-values) section.
* `org_id`: Can be found in the [Copy down access values](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md#copy-down-access-values) section.
* `client_secret`: Can be found in the [Copy down access values](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md#copy-down-access-values) section.
* `priv_key_filename`: This is the path to your local `private.key` file created in the [Create integration](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md#add-integration-details-public-key-and-product-profile) section.

 Once completed, you can run the script by opening your terminal application and navigating to the location where you downloaded the script. From there, run the following command.

```Python
python bootstrap.py
```

> **Note:** Python has to be installed before you can run the script. You can download Python from the [official site](https://www.python.org/downloads/).

## Preview your schema and data

Once you have completed running the scripts, your newly created schema and dataset will be on Experience Platform. 

![](./images/dataset_overview.png)

Navigate to the **Browse** tab in under **Schemas** to find the schema you just created. Clicking into it, you will be able to see the schema's composition: its class and mixins.

![](./images/schema_overview.png)

Likewise, to view your dataset, navigate to the **Datasets** page to find the one you just created. Clicking on **Preview Dataset**, you will see a subset of the dataset.

![](./images/preview_dataset.png)

---

## Explore notebooks in Data Science Workspace

In this section, we will be exploring data that we previously ingested into our retail sales schema.

The Data Science Workspace allows users to create Jupyter Notebooks through the JupyterLab platform where they can create and edit machine learning workflows. JupyterLab is a server-client collaboration tool that allows users to edit notebook documents via a web browser. These notebooks can contain both executable code and rich text elements. For our purposes, we will use Markdown for analysis description and executable Python code to perform data exploration and analysis.

### Choose your workspace

When launching JupyterLab, we are presented with a web-based interface for Jupyter Notebooks. Depending on which type of notebook we pick, a corresponding kernel will be launched.

When comparing which environment to use we must consider each service's limitations. For example, if we are using the [pandas](https://pandas.pydata.org/) library with Python, as a regular user the RAM limit is 2 GB. Even as a power user, we would be limited to 20 GB of RAM. If dealing with larger computations, it would make sense to use Spark which offers 1.5 TB that is shared with all notebook instances. 

Currently, GPU support is not available in the workspace. However, this feature will be made available in future releases. Different intelligent services will benefit running on a CPU or on a GPU, so this will have to be considered when selecting an environment.


### Create a new notebook

In the Adobe Experience Platform UI, click on the Data Science tab in the top menu to take you to the Data Science Workspace. From this page, click on the JupyterLab tab which will open the JupyterLab launcher. You should see a page similar to this.

![](./images/jupyterlab_launcher.png)

In our tutorial, we will be using Python 3 in the Jupyter Notebook to show how to access and explore the data. In the Launcher page, there are sample notebooks provided. We will be using the Retail Sales recipe for Python 3.

![](./images/retail_sales.png)

The Retail Sales recipe is a standalone example which uses the same Retail Sales dataset to show how data can be explored and visualized in Jupyter Notebook. Additionally, the notebook goes further in depth with training and verification. More information about this specific notebook can be found in this [walkthrough](../../../technical_overview/data_science_workspace_overview/dsw_walkthrough/dsw_walkthrough.md).

### Access data

We will go over accessing data internally from Adobe Experience Platform and data externally. We will be using the `data_access_sdk_python` library to access internal data such as datasets and XDM schemas. For external data, we will use the pandas Python library.

#### External data

With the Retail Sales notebook opened, find the "Load Data" header. The following Python code uses pandas' `DataFrame` data structure and the [read_csv()](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_csv.html#pandas.read_csv) function to read the CSV hosted on Github into the DataFrame:

![](images/read_csv.png)

Pandas' DataFrame data structure is a 2-dimensional labeled data structure. To quickly see the dimensions of our data, we can use the `df.shape`. This returns a tuple that represents the dimensionality of the DataFrame:

![](images/df_shape.png)

Finally, we can take a peek at what our data looks like. We can use `df.head(n)` to view the first `n` rows of the DataFrame:

![](images/df_head.png)

#### Adobe Experience Platform data

Now, we will go over accessing Adobe Experience Platform data.

##### By Dataset ID

For this section, we are using the Retail Sales dataset which is the same dataset used in the Retail Sales sample notebook.

In our Jupyter Notebook, we can access our data from the **Data** tab on the left. Upon clicking the tab, you will be able to see a list of Datasets.

![](images/dataset_tab.png)

Now in the Datasets directory, we will be able to see all the ingested datasets. Note that it may take a minute to load all the entries if your directory is heavily populated with datasets.

Since the dataset is the same, we want to replace the load data from the previous section which uses external data. Select the code block under **Load Data** and press the **'d'** key on your keyboard twice. Make sure the focus is on the block and not in the text. You can press **'esc'** to escape the text focus before pressing **'d'** twice.

Now, we can right click on the `Retail-Training-<your-alias>` dataset and select the "Explore Data in Notebook" option in the dropdown. An executable code entry will appear in your notebook.

```PYTHON
from data_access_sdk_python.reader import DataSetReader
from datetime import date
reader = DataSetReader()
df = reader.load(data_set_id="xxxxxxxx", ims_org="xxxxxxxx@AdobeOrg",batch_id="xxxxxxxx")
df.head()
```

If you are working on other kernels other than Python, please refer to [this page](https://github.com/adobe/acp-data-services-dsw-reference/wiki/Accessing-Data-on-the-Platform) to access data on the Adobe Experience Platform.

Selecting the executable cell then pressing the play button in the toolbar will run the executable code. The output for `head()` will be be a table with your dataset's keys as columns and the first n rows in the dataset. `head()` accepts an integer argument to specify how many lines to output. By default this is 5.

![](images/datasetreader_head.png)

If you restart your kernel and run all the cells again, you should get the same outputs as before.

![](images/restart_kernel_run.png)

### Explore our data

Now that we can access our data, let's focus on the data itself by using statistics and visualization. The dataset that we are using is a retail dataset which gives miscellaneous information about 45 different stores on a given day. Some characteristics for a given `date` and `store` include the following:
* `storeType`
* `weeklySales`
* `storeSize`
* `temperature`
* `regionalFuelPrice`
* `markDown`
* `cpi`
* `unemployment`
* `isHoliday`

#### Statistical summary

We can leverage Python's pandas library to get the data type of each attribute. The output of the following call will give us information about the number of entries and the data type for each of the columns:

```PYTHON
df.info()
```

![](images/df_info.png)

This information is useful since knowing the data type for each column will enable us to know how to treat the data.

Now let's look at the statistical summary. Only the numeric data types will be shown, so `date`, `storeType`, and `isHoliday` will not be outputted:

```PYTHON
df.describe()
```

![](images/df_describe.png)

With this, we can see there are 6435 instances for each characteristic. Also, statistical information such as mean, standard deviation (std), min, max, and interquartiles are given. This gives us information about the deviation for the data. In the next section, we will go over visualization which works together with this information to give us a good understanding of our data. 

Looking at the minimum and maximum values for `store`, we can see that there are 45 unique stores the data represents. There are also `storeTypes` which differentiate what a store is. We can see the distribution of `storeTypes` by doing the following:

![](images/df_groupby.png)

This means 22 stores are of `storeType` `A`, 17 are `storeType` `B`, and 6 are `storeType` `C`.

#### Data visualization

Now that we know our data frame values, we want to supplement this with visualizations to make things clearer and easier to identify patterns. Graphs are also useful when conveying results to an audience. Some Python libraries which are useful for visualization include:
* [Matplotlib](https://matplotlib.org/)
* [pandas](https://pandas.pydata.org/)
* [seaborn](https://seaborn.pydata.org/)
* [ggplot](https://ggplot2.tidyverse.org/)

In this section, we will quickly go over some advantages for using each library.

[Matplotlib](https://matplotlib.org/) is the oldest Python visualization package. Their goal is to make "easy things easy and hard things possible". This tends to be true as the package is extremely powerful but also comes with complexity. It is not always easy to get a reasonable looking graph without taking a considerable amount of time and effort.

[Pandas](https://pandas.pydata.org/) is mainly used for its DataFrame object which allows for data manipulation with integrated indexing. However, pandas also includes a built-in plotting functionality which is based off of matplotlib. 

[seaborn](https://seaborn.pydata.org/) is a package build on top of matplotlib. Its main goal is to make default graphs more visually appealing and to simplify creating complicated graphs.

[ggplot](https://ggplot2.tidyverse.org/) is a package also built on top of matplotlib. However the main difference is that the tool is a port of ggplot2 for R. Similar to seaborn, the goal is to improve upon matplotlib. Users that are familiar with ggplot2 for R should consider this library.


##### Univariate graphs 

Univariate graphs are plots of an individual variable. A common univariate graph is used to visualize your data is the box and whisker plot.

Using our retail dataset from before, we can generate the box and whisker plot for each of the 45 stores and their weekly sales. The plot is generated using the `seaborn.boxplot` function.

![](images/box_whisker.png)

A box and whisker plot is used to show the distribution of data. The outer lines of the plot show the upper and lower quartiles, while the box spans the interquartile range. The line in the box marks the median. Any points of data more than 1.5 times the upper or lower quartile are marked as a circle. These points are considered outliers.

##### Multivariate graphs

Multivariate plots are used to see the interaction between variables. With the visualization, data scientists can see if there are any correlations or patterns between the variables. A common multivariate graph used is a correlation matrix. With a correlation matrix, dependencies between multiple variables are quantified with the correlation coefficient. 

Using the same retail dataset, we can generate the correlation matrix.

![](images/correlation_1.png)

Notice the diagonal of 1's down the center. This shows that when comparing a variable to itself, it has complete positive correlation. Strong positive correlation will have a magnitude closer to 1 while weak correlations will be closer to 0. Negative correlation is shown with a negative coefficient showing an inverse trend.

---

## Next steps

This tutorial went over how to create a new Jupyter notebook in the Data Science Workspace and how to access data externally as well as from Adobe Experience Platform. Specifically, we went over the following steps:
* Create a dataset based on a schema
* Create a new Jupyter notebook
* Access datasets and schemas
* Explore datasets 

Now you are ready to go on to the [next section](../package_recipe_to_import_into_dsw/package_recipe_to_import_into_dsw.md) to package a recipe and to import into the Data Science Workspace.