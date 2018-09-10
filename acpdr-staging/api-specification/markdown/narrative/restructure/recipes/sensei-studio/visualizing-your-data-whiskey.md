# Exploring and Visualizing Data using the Whisky Exploration Example Notebook 

-> Sensei Studio -> New Notebook -> Learn -> Data Exploration -> Whisky Exploration

This example notebook illustrates using various machine learning libraries to:
* Load and merge datasets from a URL
* Inspect various aspects of the data
* Calculate correlations in  data
* Use Heatmap visualizations

## Loading The Dataset

This example dataset is of flavor data on whiskies, ingested from CSV data for the [whisky flavors](http://30mondays.com/data/whisky/whiskies.csv) and [brewery regions](http://30mondays.com/data/whisky/regions.csv) where the column names are inferred from the CSV header. Joining the regions data with column name headers results in the table data being added under the column indicated; in this case "Region" as opposed to the data header "Regions"

> `whisky = "http://30mondays.com/data/whisky/whiskies.csv"`<br>
`whiskyRegions = "http://30mondays.com/data/whisky/regions.csv"`<br>
`dataset = pandas.read_csv(whisky, header='infer')`<br>
`dataset["Region"] = pandas.read_csv(whiskyRegions)`

### Inspecting Dataset Size

Executing the following line:

> `print("(Distillery, Body) =>", dataset.shape)`

Shows the dataset has 86 rows, 16 columns:

```
(Distillery, Body) => (86, 16)
```

### Inspecting Dataset Sampling

> `print(dataset.head(10))`

Shows us the first 10 rows of data:

```
TODO: show the data
```

## Discovering Correlations

This example demonstrates data correlation, wherein the degree of correlation between each of the flavors is calculated. 

### Building the Correlation Matrix

The following demonstrates calculating the correlation of the flavors to one-another by isolating the flavors section of the dataset: 

> `flavors = dataset.iloc[:, 1:13]`<br>
`corr_flavors = pandas.DataFrame.corr(flavors)`<br>
`print("Correlating Body to Flavors \n\n\n", corr_flavors)`

For the given dataset, we are given the following results:

```
Show The Data here 
```
 
## Visualizing Correlation Data

!!! TODO: a blurb on what you gain by visualizing your data, the visualizations available, stuff like that

### Rendering Heatmaps

The following example demonstrates seaborn's heatmap visualization of the correlation data. TODO: rephrase that up to par

> `import seaborn as sns`<br>
`import numpy as npz`<br><br>
`f, ax = plt.subplots(figsize=(10, 8))`<br><br>
`mask = np.zeros_like(corr_flavors)`<br>
`mask[np.triu_indices_from(mask)] = True`<br><br>
`sns.heatmap(corr_flavors, square=true, ax=ax, mask=mask)`<br><br>
`plt.show()`

Resulting Visualization

`Show a screenshot of the visualization`

#### Rendering Hierarchically-Clustered Heatmaps

Above data is plotted randomly; in the order found in the initial dataset. The following demonstrates clustering flavors with stronger correlations next to each other, enhancing the relevance of the visualization:

> `sns.clustermap(corr_flavors, mask=mask, figsize=(14, 14), metric="correlation", col_cluster=False)`<br>
`plt.show()`

Resulting Visualization

`Show a screenshot of the visualization`

