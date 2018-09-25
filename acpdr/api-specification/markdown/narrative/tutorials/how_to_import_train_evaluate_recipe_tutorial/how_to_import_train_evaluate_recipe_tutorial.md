# Tutorial - Import, Train and Evaluate Recipe Tutorial via UI

## Objective
In this step by step tutorial, we will go over how to import a recipe into the Data Science workspace. From there, we will go over an example where we train and evaluate the recipe.

---

## Prerequisites

* A registered Adobe ID account
    * The Adobe ID account must have been added to an Organization with access to "Adobe Cloud Platform"
* Link to a Docker image of an intelligent service

## UI Workflow

In this section, we will go over creating recipe where you can import your Docker image. We went through the steps to create a Docker image in the [Package Recipe to Data Science Workspace tutorial](../package_to_import_into_dsw/package_recipe_to_import_into_dsw.md).

First, we launch the [Adobe Cloud Platform UI](https://ui-prod-va7.cloud.adobe.io/) and go to the `Data Science` tab in the top navigation bar. You will be taken to the `Overview` tab where you will see 3 sections:
* Recipes
* My Instances
* My Notebooks

For this tutorial, we will be focused on Recipes, Instances and Experiments. The following chart outlines the relationship between the three and also introduces the idea of a trained model. 

![](recipe_hierarchy.png)

The Recipe section is a carousel that lists the recipes that you or others in your IMS Organization have created. A recipe refers to a proprietary algorithm, or an ensemble of algorithms, to help solve specific business problems.

The Instances section is a list of recently updated recipe instances. An instance is an occurrence of the recipe configured with the right data definition to help solve specific business problems. One recipe can create many instances.

In the UI, an experiment is run within the context of an Instance and the experiment run will correspond to a trained model.

### New Recipe

We first want to create a new Recipe. From the Data Science overview page, click on the "New" button on the top right. From there, you will be given an option to create a Notebook or a Recipe. 

![](new_recipe_dropdown.png)

Choose Recipe and a "New Recipe" dialog will popup on the screen. The `*` indicate which fields require to be filled. 

![](new_recipe_modal.png)

* **Name** - This is the name of your Recipe
* **Recipe Type** - What language or tool you're going to use
* **Recipe Source** - Where your image is uploaded to. Currently only supports Docker and Artifactory images
* **Source File/Artifact ID** - Link to the Docker image
* **Configuration File** - This file expects a JSON object containing parameters for the training and scoring of the instance. You can leave this blank when creating the Recipe as the workflow will prompt you to enter the configuration when creating an Instance or an Experiment. Example of configuration file for the sentiment analysis sample application:

``` JSON
[
    {
        "name": "train",
        "parameters": [
            {
                "key": "numFeatures",
                "value": "10",
                "secret": false
            },
            {
                "key": "maxIter",
                "value": "2",
                "secret": false
            },
            {
                "key": "regParam",
                "value": "0.15",
                "secret": false
            },
            {
                "key": "trainingDataLocation",
                "value": "wasbs://intelligentservices@mlhackathon01.blob.core.windows.net/samples/sentiment_analysis/text_emotion_training.csv",
                "secret": false
            },
            {
                "key": "CONF_blobStoreAccount_KEY",
                "value": "fs.azure.account.key.mlhackathon01.blob.core.windows.net",
                "secret": false
            },
            {
                "key": "CONF_blobStoreAccount_VALUE",
                "value": "{vault.secret/ethos/tenants/acppf/compute/ml/scalasampleapp/blobStoreAccountKey}",
                "secret": false
            }
        ]
    },
    {
        "name": "score",
        "parameters": [
            {
                "key": "scoringDataLocation",
                "value": "wasbs://intelligentservices@mlhackathon01.blob.core.windows.net/samples/sentiment_analysis/scoringdataemotions.csv",
                "secret": false
            },
            {
                "key": "scoringResultsLocation",
                "value": "wasbs://intelligentservices@mlhackathon01.blob.core.windows.net/samples/sentiment_analysis/outputemotions",
                "secret": false
            },
            {
                "key": "CONF_blobStoreAccount_KEY",
                "value": "fs.azure.account.key.mlhackathon01.blob.core.windows.net",
                "secret": false
            },
            {
                "key": "CONF_blobStoreAccount_VALUE",
                "value": "{vault.secret/ethos/tenants/acppf/compute/ml/scalasampleapp/blobStoreAccountKey}",
                "secret": false
            }
        ]
    }
]
```

For this tutorial, we will be creating a Python Recipe using the Docker image that we created and pushed to the Artifactory in the [Package Recipe tutorial](../package_recipe_to_dsw.md). Here you can see the values that we entered in the dialog.

![](new_recipe_modal_filled.png)

After pressing "Save", we are taken to the new Recipe's overview page. From here we are able to view information about the Recipe we just created and are able to create Recipe Instances to run experiments.


### Create Instance

Now that we created a new Python Recipe and are taken to the Recipe Overview, we can create a Recipe Instance. Remember that an instance is an occurrence of the recipe configured with the right data definition to help solve specific business problems. One recipe can create many instances. Since the Recipe we created is new, it has no existing Instances so the user interface will show that you have an empty list of Instances and ask if you want to create your first instance.

![](empty_instance_list.png)

Click on the Create Instance button and a New Instance dialog should appear. Fill in the name for your Instance and a description for your instance. Adding a configuration file in this step is not required if you already added it in the creation for the Recipe. However, if you do add a configuration file, it will overwrite your previous file.

![](new_instance_modal.png)

Click on Save once you have everything filled out. You will be taken to your Instance overview page.

### Create Experiment

After creating the new Instance, you should see an overview page as seen below.

![](new_instance_overview.png)

To create a new Experiment, we can use either of the "Create Experiment" buttons in the overview page. Once clicking on the "Create Experiment" buttons, a "New Experiment" dialog will appear. Note that as with the instance creation, adding a configuration file in this step is not required if you already added it in the creation for the Recipe. However, if you do add a configuration file, it will overwrite your previous file.

Note that some Recipes have parameters hard-coded within its code. These Recipes will not even require a configuration file until they update the Recipe.

![](new_experiment_modal.png)

After clicking on the "Save" button, your experiment is created and will automatically run in the background until the status is either Completed or Failed.

You can click on the Experiment to view the details about the Experiment. This can be done even before the Experiment Run has been completed. Once in the Experiment detail page, you can view all Experiment Runs. Clicking on the "Configuration" tab, we are able to see our current Experiment's Training and Scoring Parameters.

![](experiment_configuration.png)

### Evaluating Experiment Results

After the evaluation is finished running, results will be shown under the "Evaluation Metrics" tab in the experiment page. Metrics are automatically generated depending on your model's algorithm type. For binary classification, the follow metrics are generated:
* Measures
* Receiver Operator Characteristics
* Confusion Matrix

For other model types (e.g. regression), only the follow metric is generated
* Measures

#### Measures Chart

The Measures chart displays key values which describe your results.

![](measures_chart.png)


The "Precision" metric describes the percentage of relevant instances compared with the total *retrieved* instances while the "Recall" metric describes the percentage of relevant instances that have been retrieved compared with the total amount of *relevant* retrieved instances. Precision can be seen as the probability that a randomly selected outcome is correct, while recall is seen as the probability of a correctly selected outcome from a given dataset to be correctly selected.

Precision and recall are commonly used together for evaluation. In fact, the F1 score is the harmonic average of the precision and recall. The ideal F1 score would be 1 while the worse is at 0. 

The "Accuracy" metric compares the results with the expected outcome.

The "Area Under Curve" metric (AUC) is used to measure the efficiency of a binary classification algorithm.

#### Receiver Operator Characteristics

The Receiver Operating Characteristic curve (ROC curve) is a plot of true positive rates against the false positive rates. This relationship shows the tradeoff between sensitivity and specificity. The perfect curve would be one with 0% false positive rate and 100% true positive rate. This means the curve would hug the left and top axis of the chart. Conversely, as the curve appears closer to the diagonal line, the less accurate the test. The diagonal line represents if the results were decided randomly.

![](receiver_operator_characteristic_chart.png)


#### Confusion Matrix

The Confusion Matrix shows the distribution of predictions into the following four buckets:
* True Positive - Predicted positive correctly
* True Negative - Predicted negative correctly
* False Positive - Predicted positive incorrectly
* False Negative - Predicted negative incorrectly

![](confusion_matrix.png)


The total percentage of correctly predicted results is found by adding up the percentages for true positive and true negative results.
