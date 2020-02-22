# Data Science Workspace troubleshooting guide

This document provides answers to frequently asked questions about Adobe Experience Platform Data Science Workspace. For questions and troubleshooting regarding Platform APIs in general, see the [Adobe Experience Platform API troubleshooting guide](../../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md).

-   [Why am I unable to access JupyterLab on Safari?](#why-am-i-unable-to-access-jupyterlab-on-safari)
-   [Why am I seeing a '403 Forbidden' message when trying to upload or delete a file in JupyterLab?](#why-am-i-seeing-a-403-forbidden-message-when-trying-to-upload-or-delete-a-file-in-jupyterlab)
-   [Why do some parts of my Jupyter Notebook look scrambled or do not render as code?](#why-do-some-parts-of-my-jupyter-notebook-look-scrambled-or-do-not-render-as-code)
-   [How do I install custom Python libraries?](#how-do-i-install-custom-python-libraries)
-   [Can I install custom PySpark libraries?](#can-i-install-custom-pyspark-libraries)
-   [Is it possible to configure Spark cluster resources for JupyterLab Spark or PySpark kernel?](#is-it-possible-to-configure-spark-cluster-resources-for-jupyterlab-spark-or-pyspark-kernel)

## Why am I unable to access JupyterLab on Safari?

Safari disables third-party cookies by default. Because your Jupyter virtual machine instance resides on a different domain than its parent frame, Adobe Experience Platform currently requires that third-party cookies be enabled. Please enable third-party cookies or switch to a different browser such as Google Chrome.

## Why am I seeing a '403 Forbidden' message when trying to upload or delete a file in JupyterLab?

If your browser is enabled with advertisement blocking software such as Ghostery or AdBlock Plus, the domain "\*.adobe.net" must be whitelisted in each advertisement blocking software for JupyterLab to operate normally. This is because JupyterLab virtual machines run on a different domain than the Experience Platform domain.

## Why do some parts of my Jupyter Notebook look scrambled or do not render as code?

This can happen if the cell in question is accidentally changed from "Code" to "Markdown". While a code cell is focused, pressing the key combination **ESC+M** changes the type of the cell to Markdown. A cell's type can be changed by the dropdown indicator at the top of the notebook for the selected cell(s). To change a cell type to code, start by selecting the given cell you want to change. Next, click the dropdown that indicates the cell's current type, then select "Code".

![](./images/code_type.png)

## How do I install custom Python libraries?

The Python kernel comes pre-installed with many popular machine learning libraries. However, you can install additional custom libraries by executing the following command within a code cell:

```shell
!pip install {library name}
```

For a complete list of pre-installed Python libraries, see the [appendix section of the JupyterLab User Guide](../jupyterlab/jupyterlab_overview.md#supported-libraries).

## Can I install custom PySpark libraries?

Unfortunately, you cannot install additional libraries for the PySpark kernel. However, you can contact your Adobe customer service representative to have custom PySpark libraries installed for you.

For a list of pre-installed PySpark libraries, see the [appendix section of the JupyterLab User Guide](../jupyterlab/jupyterlab_overview.md#supported-libraries). 

## Is it possible to configure Spark cluster resources for JupyterLab Spark or PySpark kernel?

You can configure resources by adding the following block to the first cell of your notebook:

```python
%%configure -f 
{
    "numExecutors": 10,
    "executorMemory": "8G",
    "executorCores":4,
    "driverMemory":"2G",
    "driverCores":2,
    "conf": {
        "spark.cores.max": "40"
    }
}
```

For more information on Spark cluster resource configuration, including the complete list of configurable properties, see the [JupyterLab User Guide](../jupyterlab/jupyterlab_overview.md#pyspark-spark-execution-resource).