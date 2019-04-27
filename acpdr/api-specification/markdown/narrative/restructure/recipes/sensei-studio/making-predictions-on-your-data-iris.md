# Making Predictions on You Data using the Iris Example Notebook 

-> Sensei Studio -> New Notebook -> Learn -> Machine Learning -> Iris Dataset

This example notebook illustrates using various functions of the sklearn, pandas, matplotlib libraries to:
* Load and split training and validation data
* Inspect various aspects of the data
* Use various visualizations to determine the algorithm to use to make predictions on your data
* Use various visualizations to analyze the confusion matrix to determine accuracy
* TODO: complete this list  

## Loading The Dataset

This example dataset is of attributes of Iris flower types listing target feature to predict, ingested from [?? What format is this?? data](https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data) where the column names are provided explicitly, rather than being inferred from the CSV header which is omitted from this example dataset

> `url = "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"`<br>
`names = ['sepal-length', 'sepal-width', 'petal-length', 'petal-width', 'class']`<br>
`dataset = pandas.read_csv(url, names=names)`

### Inspect Dataset Size

Executing the following line:

> `print("We should see 150 instances and 5 attributes", dataset.shape)`

Shows the dataset has 150 rows, 5 columns:

`We should see 150 instances and 5 attributes (150, 5)`

### Inspect Dataset Sampling

> `print(dataset.head(20))`

Shows us the first 20 rows of data:

`TODO: show the data`

### Inspect Distribution of Attributes

> `print(dataset.describe())`

Results in the following statistical summary:

`TODO: Show results`

### Inspect Class 

> `print(dataset.groupby('class').size())`

Results i the following class distriution:

```
class
Iris-setosa              50
Iris-versicolor          50
Iris-verginica           50
dtype: int64
```

## Visualizing the Data

### Rendering Univariate Plots

#### Box and Whisker Plots

> `# https://en.wikipedia.org/wiki/Box_plot`<br>
`# https://flowingdata.com/2008/02/15/how-to-read-and-use-a-box-and-whisker-plot`<br>
`dataset.plot(kind='box', subplots=True, layout=(2,2), sharex=False, sharey=False, figsize=(10,10))`<br>
`plt.show()`

Resulting Visualization

`Show a screenshot of the chart`

#### Scatter Plot Matrix

In this example, the Scatter Plot Matrix reveals correlation in the data that can be used to predict the various types of Iris based on the given attributes. 

> `# Note the diagonal grouping of some pairs of attributes.`<br>
`# This suggests a high correlation and a predictable relationship.`<br>
`scatter_matrix(dataset, figsize=(14,14))`<br>
`plt.show()`

Resulting Visualization

`Show a screenshot of the chart`

## Training and Verification

Define training and verification datasets.

### Splitting Training and Validation Datasets

The following illustrates separating your data into 80% train, 20% validation datasets:

> `array = dataset.values`<br>
`X = array[:,0:4]`<br>
`Y = array([:,4])`<br>
`TODO: COMPLETE THIS - Sensei Studio is down`

### Setting Test Options an Evaluation Metric

### Selecting the Algorithm to Use to Make Predictions

Determine algorithms 

In this example, sklearn.neighbors.KNeighborsClassifier (KNearestNeighbor Vote)


> TODO: need to complete

Note on confusion matrix - There are no outliers in Iris-setosa

Visualize confusion matrices - helpful in determining which algorythm to use for making predictions

See confusion matrix in table row - imperfect, but high accuracy

See more information and statustics available for this use-case

## Executing the notebook

By default, example notebooks are already run and stuff, so clear and re-run

