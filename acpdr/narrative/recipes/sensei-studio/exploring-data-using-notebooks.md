# Exploring Data on the Platform with Jupyter Notebooks 

In this tutorial, we demonstrate using Sensei Studio's Jupyter notebook management platform to import and visualize data.

The target audience for this tutorial are familiar with programming for data analysis/exploration workflows. 
The examples use various machine learning libraries to analyze and visualize your data, however this tutorial should not
be considered a reference for those libraries.  

## Creating a new notebook

From the 'New' menu on the Sensei Studio home page, select 'Notebook' to create a new notebook. 

> Hint: In the resulting menu, notice the options 'Create' and 'Learn'. You will find a wealth of examples by visiting the 
'Learn' tab. 

In the 'Create' menu of options, you could select to create a blank notebook using any supported kernel, or take advantage 
of the many templates.

> Hint: Use Folders to visually organize your notebooks. Creating a new folder will create a folder with a default name. 
Give it a better name, select it to navigate to within it, and then select 'Notebook' from the 'New' menu. 

## Developing in Sensei Studio

Whether from creating a new notebook, viewing an example from the 'Learn' area, or selecting any existing notebook,
you are directed to the development area of Sensei Studio. 

### Working with cells

Code is written in cells which can be run individually or run in sequence from any cell. See the 'Cell' menu for options. 
Any print-out, log, or visualizations are rendered in the footer of the cell in which the code runs. Each cell can have output.

> Hint: Change a cell type to Markdown using the 'Cell' menu option 'Cell Type' to more clearly document your workflow. 

### Adding a dataset

Sensei Studio provides a macro for adding datasets from any URL, or blob store from the 'Add Dataset' which will 
automatically generate a cell containing ingest code which uses the parameters specified. You may also use any library directly.
  
## Visualizing the Data

One of the major benefits of the Sensei Studio editor is data visualization. Correlations and patterns are much easier
to realize using various visualizations. Using visualization, you can more clearly make your analysis decisions.

### Visualizations

Visualizations in Sensei Studio are an artifact of the programmatic use of various visualization libraries. Some of those
are described below, as examples.  

#### Box and Whisker Plots

One way you may choose to view your data is as a Box and Whisker Plot. Learn more about Box and Whisker Plots
[here](https://en.wikipedia.org/wiki/Box_plot) and [here](https://flowingdata.com/2008/02/15/how-to-read-and-use-a-box-and-whisker-plot).

```
dataset.plot(kind='box', subplots=True, layout=(2,2), sharex=False, sharey=False, figsize=(10,10))
plt.show()
```

Resulting Visualization

> TODO: Show a screenshot of the chart - Need example data

#### Scatter Plot Matrix

In this example, the Scatter Plot Matrix reveals correlation in the data that can be used to predict the various types of Iris based on the given attributes. 

```
scatter_matrix(dataset, figsize=(14,14))
plt.show()
```

Resulting Visualization

> Notice the diagonal grouping of some pairs of attributes. This suggests a high correlation and a predictable relationship.

> TODO: Show a screenshot of the chart - Need example data




