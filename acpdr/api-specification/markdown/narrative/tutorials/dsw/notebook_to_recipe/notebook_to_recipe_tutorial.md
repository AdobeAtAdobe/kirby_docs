# Tutorial: How to create a Recipe in Data Science Workspace in notebook template <!-- omit in toc -->

- [Purpose](#purpose)
- [Getting started with the JupyterLab notebook environment](#getting-started-with-the-jupyterlab-notebook-environment)
- [Making edits to Recipe files](#making-edits-to-recipe-files)
- [Getting Started with the Recipe Builder notebook](#getting-started-with-the-recipe-builder-notebook)
  - [Requirements file](#requirements-file)
  - [Configuration file](#configuration-file)
  - [Evaluator file](#evaluator-file)
    - [Evaluate the trained model](#evaluate-the-trained-model)
    - [Prepare and split the dataset](#prepare-and-split-the-dataset)
      - [Loading data](#loading-data)
        - [From Data Access SDK](#from-data-access-sdk)
        - [From external source](#from-external-source)
      - [Data preparation and feature engineering](#data-preparation-and-feature-engineering)
  - [Training data loader](#training-data-loader)
  - [Scoring data loader](#scoring-data-loader)
  - [Pipeline file](#pipeline-file)
    - [Training](#training)
    - [Scoring](#scoring)
- [Training and scoring](#training-and-scoring)
- [Create recipe](#create-recipe)
- [Conclusion](#conclusion)


## Purpose

This tutorial will go over two main sections. First, you will create a machine learning Model using a template within JupyterLab Notebook. Next, you will exercise the notebook to recipe workflow within JupyterLab to create a recipe within Data Science Workspace. 

## Getting started with the JupyterLab notebook environment

Creating a recipe from scratch can be done within Data Science Workspace. To start, navigate to [Adobe Experience Platform](https://platform.adobe.com) and click on the ML Models tab on the left to get to the Data Science Workspace. From here, click on the Notebooks sub-tab and on the Jupyterlab launcher screen, create a new notebook by select the Recipe Builder template.

The Recipe Builder notebook allows you to run training and scoring runs inside the notebook. This gives you the flexibility to make changes to their `train()` and `score()` methods in between running experiments on the training and scoring data. Once you are happy with the outputs of the training and scoring, you can create a recipe to be used in Data Science Workspace using the notebook to recipe functionality built in to the Recipe Builder notebook.

> **Note:** The Recipe Builder notebook supports working with all file formats but currently the Create Recipe functionality only supports Python.

![](./images/notebook_launcher.png)

When you click on the Recipe Builder notebook from the launcher, the notebook is opened and you will be prompted to enter a Recipe name. Upon entering the name, the notebook will be renamed and a folder of the same name will be created with all the recipe files in it. The template used in the notebook is the Python Retail Sales Forecasting Recipe which can also be found in [this public repository](https://github.com/adobe/experience-platform-dsw-reference/tree/master/recipes/python/retail/)

![](./images/enter_recipe_name.png)

You can view the files in the sidebar on the left in JupyterLab.

![](./images/recipe_files.png)

You will notice that in the toolbar there are three additional actions namely – "Train", "Score" and "Create Recipe". These icons will only appear in the Recipe Builder notebook. More information about these actions will be talked about [here](#training-and-scoring) after building your Recipe in the notebook.

![](./images/toolbar_actions.png)

## Making edits to Recipe files

To make edits to the recipe files, navigate to the cell in Jupyter corresponding to the file path. For `evaluator.py`, look for `%%writefile demo-recipe/evaluator.py`. 

Start making necessary changes to the cell and when finished, simply run the cell. The `%%writefile filename.py` command will write the contents of the cell to the `filename.py`. You will have to manually run the cell for each file with changes.

> **Note:** You should run the cells manually when applicable. 

---

## Getting Started with the Recipe Builder notebook

Now that you know the basics for the JupyterLab notebook environment, you can begin looking at the files that make up a machine learning model recipe. The files we will talk about are shown here:
- [Requirements file](#requirements-file)
- [Configuration file](#configuration-file)
- [Evaluator file](#evaluator-file)
- [Training data loader](#training-data-loader)
- [Scoring data loader](#scoring-data-loader)
- [Pipeline file](#pipeline-file)

---

### Requirements file

The requirements file is used to declare additional libraries you wish to use in the recipe. You can specify the version number if there is a dependency. To look for additional libraries, visit https://anaconda.org. The list of main libraries already in use include:

```JSON
python=3.5.2
scikit-learn
pandas
numpy
data_access_sdk_python
```

> **Note:** Libraries or specific versions you add may be incompatible with the above libraries

---

### Configuration file

The configuration file is used to specify the datasets you wish to use for training and scoring as well as adding hyperparameters. To find the dataset IDs, go to the Data Tab on the left navigation bar (under the folder icon) or in [Adobe Experience Platform](https://platform.adobe.com/).

By default, the following configuration parameters are set for you when you access data:
 * `ML_FRAMEWORK_IMS_USER_CLIENT_ID` 
 * `ML_FRAMEWORK_IMS_TOKEN` 
 * `ML_FRAMEWORK_IMS_ML_TOKEN` 
 * `ML_FRAMEWORK_IMS_TENANT_ID` 

When scoring, `saveData` is set to `False` since saving data is not relevant when scoring from the notebook.

---

### Evaluator file

The `evaluator.py` file contains logic for how you wish to evaluate your trained recipe as well as how your training data should be split. In the Retail Sales example, the logic for loading and preparing the training data will be included. We will go over the two sections below.

#### Evaluate the trained model

The `evaluate()` function is performed after the Model is trained and will return a metric to indicate how successful the Model performs. The `evaluate()` function uses the testing dataset labels and the Trained Model to predict a set of features. These predicted values are then compared with actual features in the testing dataset. Common scoring algorithms include:
* [Mean absolute percentage error (MAPE)](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error)
* [Mean absolute error (MAE)](https://en.wikipedia.org/wiki/Mean_absolute_error)
* [Root-mean-square error (RMSE)](https://en.wikipedia.org/wiki/Root-mean-square_deviation)


The `evaluate()` function in the Retail Sales sample is shown below:

```PYTHON
def evaluate(self, data=[], model={}, configProperties={}):
    print ("Evaluation evaluate triggered")
    test = data.drop('weeklySalesAhead', axis=1)
    y_pred = model.predict(test)
    y_actual = data['weeklySalesAhead'].values
    mape = np.mean(np.abs((y_actual - y_pred) / y_actual))
    mae = np.mean(np.abs(y_actual - y_pred))
    rmse = np.sqrt(np.mean((y_actual - y_pred) ** 2))

    metric = [{"name": "MAPE", "value": mape, "valueType": "double"},
                {"name": "MAE", "value": mae, "valueType": "double"},
                {"name": "RMSE", "value": rmse, "valueType": "double"}]

    return metric
```

Notice that the function returns a `metric` object containing an array of evaluation metrics. These metrics will be used to evaluate how well the trained model performs.

#### Prepare and split the dataset

The data preparation phase for training requires splitting the dataset to be used for training and testing. This test data will be used implicitly to evaluate the Model after it is trained. This process is separate from scoring. 

This section will show the `split()` function which will first load data into the notebook, then clean up the data by removing unrelated columns in the dataset. From there, you will be able to perform feature engineering which is the process to create additional relevant features from existing raw features in the data. An example of this process can be seen below along with an explanation.

```PYTHON
def split(self, configProperties={}):
    #########################################
    # Load Data
    #########################################
    prodreader = DataSetReader(client_id=configProperties['ML_FRAMEWORK_IMS_USER_CLIENT_ID'],
                                user_token=configProperties['ML_FRAMEWORK_IMS_TOKEN'],
                                service_token=configProperties['ML_FRAMEWORK_IMS_ML_TOKEN'])

    df = prodreader.load(data_set_id=configProperties['trainingDataSetId'],
                          ims_org=configProperties['ML_FRAMEWORK_IMS_TENANT_ID'])

    #########################################
    # Data Preparation/Feature Engineering
    #########################################
    df.date = pd.to_datetime(df.date)
    df['week'] = df.date.dt.week
    df['year'] = df.date.dt.year

    df = pd.concat([df, pd.get_dummies(df['storeType'])], axis=1)
    df.drop('storeType', axis=1, inplace=True)
    df['isHoliday'] = df['isHoliday'].astype(int)

    df['weeklySalesAhead'] = df.shift(-45)['weeklySales']
    df['weeklySalesLag'] = df.shift(45)['weeklySales']
    df['weeklySalesDiff'] = (df['weeklySales'] - df['weeklySalesLag']) / df['weeklySalesLag']
    df.dropna(0, inplace=True)

    df = df.set_index(df.date)
    df.drop('date', axis=1, inplace=True)

    # Split
    train_start = '2010-02-12'
    train_end = '2012-01-27'
    test_start = '2012-02-03'
    train = df[train_start:train_end]
    test = df[test_start:]

    return train, test
```

There are two main things happening in the `split()` function: loading data and data preparation. 

##### Loading data

In this step, you will load the data into a [pandas dataframe](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.html). Data can be loaded from files in Adobe Experience Platform via the Data Access SDK or externally, from pandas' `read_csv()` or `read_json()` functions.
* [From Data Access SDK](#from-data-access-sdk)
* [From external Source](#from-external-source)

> **Note:** In the Recipe Builder notebook, data is loaded via the Data Access SDK.

###### From Data Access SDK

Users can load data using the Data Access SDK. The library can be imported at the top of the page by including the line:

`from data_access_sdk_python.reader import DataSetReader`

We then use the `load()` method to grab the training dataset from the `trainingDataSetId` as set in our configuration (`recipe.conf`) file.

```PYTHON
prodreader = DataSetReader(client_id=configProperties['ML_FRAMEWORK_IMS_USER_CLIENT_ID'],
                           user_token=configProperties['ML_FRAMEWORK_IMS_TOKEN'],
                           service_token=configProperties['ML_FRAMEWORK_IMS_ML_TOKEN'])

df = prodreader.load(data_set_id=configProperties['trainingDataSetId'],
                     ims_org=configProperties['ML_FRAMEWORK_IMS_TENANT_ID'])
```

> **Note:** As mentioned in the [Configuration File section](#configuration-file), the following configuration parameters are set for you when you access data from Experience Platform:
> * `ML_FRAMEWORK_IMS_USER_CLIENT_ID` 
> * `ML_FRAMEWORK_IMS_TOKEN` 
> * `ML_FRAMEWORK_IMS_ML_TOKEN` 
> * `ML_FRAMEWORK_IMS_TENANT_ID` 

Now that you have your data, you can begin with data preparation and feature engineering.

---

###### From external source

This section will show you how to import a JSON or CSV file to a pandas object. Official documentation from the pandas library can be found here:
* [read_csv](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_csv.html)
* [read_json](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_json.html)

First, here is an example of importing a CSV file. The `data` argument is the path to the CSV file. This variable was imported from the `configProperties` in the [previous section](#extract-fields-from-configuration-file).

```PYTHON
df = pd.read_csv(data)
```

You can also import from a JSON file. The `data` argument is the path to the CSV file. This variable was imported from the `configProperties` in the [previous section](#extract-fields-from-configuration-file).

```PYTHON
df = pd.read_json(data)
```

Now your data is in the dataframe object and can be analyzed and manipulated in the [next section](#data-preparation-and-feature-engineering).

---

##### Data preparation and feature engineering

After the data is loaded, the data undergoes preparation and is then split to training and testing datasets. In the Retail Sales example, there are five things being done to the original dataset:
* add `week` and `year` columns
* convert `storeType` to an indicator variable
* convert `isHoliday` to a numeric variable
* offset `weeklySales` to get future and past sales value
* split data, by date, to `train` and `test` dataset

First, `week` and `year` columns are created and the original `date` column converted to Python [datetime](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.to_datetime.html). Week and year values are extracted from the datetime object.

Next, `storeType` is converted to three columns representing the three different store types, (`A`, `B`, and `C`). Each will contain a boolean value to state which `storeType` is true. The `storeType` column will be dropped.

Similarly, `weeklySales` changes the `isHoliday` boolean to a numerical representation, one or zero.

This data is split between `train` and `test` dataset.

The `load()` function should complete with the `train` and `test` dataset as the output.

---

### Training data loader

The purpose of the Training Data Loader is to instantiate a training and testing dataset used for creating the machine learning Model. Typically, there are two tasks that the training data loader will accomplish:
* Load data from external source
* Data preparation and feature engineering

However, as you recall, this was done in the [`split()` function]((#prepare-and-split-the-dataset)) in the `evaluator.py` file. This step is usually known as train/test split. The sample Retail Sales sample code is shown below:

```PYTHON
import numpy as np
import pandas as pd
from data_access_sdk_python.reader import DataSetReader

from recipe.evaluator import Evaluator

def load(configProperties):
    print("Training Data Load Start")
    evaluator = Evaluator()
    (train_data, _) = evaluator.split(configProperties)

    print("Training Data Load Finish")
    return train_data
```

Notice that the `load()` function basically calls the `split()` function from `evaluator.py` and returns only the training dataset. This is because in the notebook, we are only training and scoring our model.

---

### Scoring data loader

The procedure to load data for scoring is similar to the loading training data in the [`split()` function]((#prepare-and-split-the-dataset)). We use the Data Access SDK to load data from the `scoringDataSetId` found in our `recipe.conf` file. 

```PYTHON
def load(configProperties):

    print("Scoring Data Load Start")

    #########################################
    # Load Data
    #########################################
    prodreader = DataSetReader(client_id=configProperties['ML_FRAMEWORK_IMS_USER_CLIENT_ID'],
                               user_token=configProperties['ML_FRAMEWORK_IMS_TOKEN'],
                               service_token=configProperties['ML_FRAMEWORK_IMS_ML_TOKEN'])

    df = prodreader.load(data_set_id=configProperties['scoringDataSetId'],
                         ims_org=configProperties['ML_FRAMEWORK_IMS_TENANT_ID'])
```

After loading the data, data preparation and feature engineering is done. 

```PYTHON
    #########################################
    # Data Preparation/Feature Engineering
    #########################################
    df.date = pd.to_datetime(df.date)
    df['week'] = df.date.dt.week
    df['year'] = df.date.dt.year

    df = pd.concat([df, pd.get_dummies(df['storeType'])], axis=1)
    df.drop('storeType', axis=1, inplace=True)
    df['isHoliday'] = df['isHoliday'].astype(int)

    df['weeklySalesAhead'] = df.shift(-45)['weeklySales']
    df['weeklySalesLag'] = df.shift(45)['weeklySales']
    df['weeklySalesDiff'] = (df['weeklySales'] - df['weeklySalesLag']) / df['weeklySalesLag']
    df.dropna(0, inplace=True)

    df = df.set_index(df.date)
    df.drop('date', axis=1, inplace=True)

    print("Scoring Data Load Finish")

    return df
```

Since the purpose of our Model is to predict future weekly sales, you will need to create a scoring dataset used to evaluate how well the Model's prediction performs.

This Recipe Builder notebook does this by offsetting our weeklySales 7 days forwards. Notice that there are measurements for 45 stores every week so you can shift the `weeklySales` values 45 datasets forwards into a new column called `weeklySalesAhead`.

```PYTHON
df['weeklySalesAhead'] = df.shift(-45)['weeklySales']
```

Similarly, you can create a column `weeklySalesLag` by shifted 45 back. Using this you can also calculate the difference in weekly sales and store them in column `weeklySalesDiff`.

```PYTHON
df['weeklySalesLag'] = df.shift(45)['weeklySales']
df['weeklySalesDiff'] = (df['weeklySales'] - df['weeklySalesLag']) / df['weeklySalesLag']
```

Since you are offsetting the `weeklySales` datapoints 45 datasets forwards and 45 datasets backwards to create new columns, the first and last 45 data points will have NaN values. You can remove these points from our dataset by using the `df.dropna()` function which removes all rows that have NaN values.

```PYTHON
df.dropna(0, inplace=True)
```

The `load()` function in your scoring data loader should complete with the scoring dataset as the output.

---

### Pipeline file

The `pipeline.py` file includes logic for training and scoring. We will go over both in the next two sections.

#### Training

The purpose of training is to create a Model using features and labels in your training dataset. 

> **Note:**  _Features_ refer to the input variable used by the machine learning model to predict the _labels_.

The `train()` function should include the Training Model and return the Trained Model. Some examples of different Models can be found in the [scikit-learn user guide documentation](https://scikit-learn.org/stable/user_guide.html). 

After choosing your Training Model, you will fit your x and y training dataset to the Model and the function will return the Trained Model. An example that shows this is as follows:

```PYTHON
def train(configProperties, data):

    print("Train Start")

    #########################################
    # Extract fields from configProperties
    #########################################
    learning_rate = float(configProperties['learning_rate'])
    n_estimators = int(configProperties['n_estimators'])
    max_depth = int(configProperties['max_depth'])


    #########################################
    # Fit model
    #########################################
    X_train = data.drop('weeklySalesAhead', axis=1).values
    y_train = data['weeklySalesAhead'].values

    seed = 1234
    model = GradientBoostingRegressor(learning_rate=learning_rate,
                                      n_estimators=n_estimators,
                                      max_depth=max_depth,
                                      random_state=seed)

    model.fit(X_train, y_train)

    print("Train Complete")

    return model
```

Notice that depending on your application, you will have arguments in your `GradientBoostingRegressor()` function. `xTrainingDataset` should contain your features used for training while `yTrainingDataset` should contain your labels.

---

#### Scoring

The `score()` function should contain the scoring algorithm and return a measurement to indicate how successful the Model performs. The `score()` function uses the scoring dataset labels and the Trained Model to generate a set of predicted features. These predicted values are then compared with the actual features in the scoring dataset. In this example, the `score()` function uses the Trained Model to predict features using the labels from the scoring dataset. The predicted features are returned.

```PYTHON
def score(configProperties, data, model):

    print("Score Start")

    X_test = data.drop('weeklySalesAhead', axis=1).values
    y_test = data['weeklySalesAhead'].values
    y_pred = model.predict(X_test)

    data['prediction'] = y_pred
    data = data[['store', 'prediction']].reset_index()
    data['date'] = data['date'].astype(str)

    print("Score Complete")

    return data
```

---

## Training and scoring

When you are done making changes to your notebook and want to train your recipe, you can click on the associated buttons at the top of the bar to creating a training run in the cell. Upon clicking the button, a log of commands and outputs from the training script will appear in the notebook (under the `evaluator.py` cell). Conda first installs all the dependencies in the background, then the training is initiated.

Note that you must run training at least once before you can run scoring. Clicking on the "Run Scoring" button will score on the trained model that was generated during training. The scoring script will appear under `datasaver.py`.


## Create recipe

When you are done editing the recipe and satisfied with the training/scoring output, you can create a recipe from the notebook by pressing Create Recipe. After pressing it, you will see a progress bar showing how much time is left for the build to finish. If the recipe creation is successful the progress bar will be replaced by an external link that you can click to navigate to the created recipe.

![](./images/recipe_details.png)

> **Caution:** 
> * Do not delete any of the file cells
> * Do not edit the `%%writefile` line at the top of the file cells
> * Do not create recipes in different notebooks at the same time

---

## Conclusion

This tutorial went over creating a machine learning Model in the Recipe Builder notebook. From there, we exercised the notebook to recipe workflow within the notebook to create a recipe within Data Science Workspace.