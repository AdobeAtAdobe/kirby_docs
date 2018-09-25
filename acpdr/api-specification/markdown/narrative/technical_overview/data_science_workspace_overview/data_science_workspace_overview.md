# Data Science Workspace Overview

- [Data Science Workspace Overview](#datascienceworkspaceoverview)
    - [Overview](#overview)
    - [Introduction](#introduction)
    - [Terminology](#terminology)
    - [Why Data Science Workspace?](#whydatascienceworkspace)
        - [One-stop Data Access](#onestopdataaccess)
        - [Prebuilt machine learning recipes](#prebuiltmachinelearningrecipes)
        - [Workflow focused on the data scientist](#workflowfocusedonthedatascientist)
        - [Data exploration](#dataexploration)
        - [Authoring](#authoring)
        - [Experimentation](#experimentation)
        - [Operationalization](#operationalization)
        - [Continuous improvement](#continuousimprovement)
        - [Access to new features and datasets](#accesstonewfeaturesanddatasets)
        - [Security and peace of mind](#securityandpeaceofmind)
    - [Data Science Workspace in action](#datascienceworkspaceinaction)
        - [Define the problem](#definetheproblem)
        - [Explore and prepare the data](#exploreandpreparethedata)
        - [Author the recipe](#authortherecipe)
        - [Experiment with the recipe](#experimentwiththerecipe)
        - [Operationalize the model](#operationalizethemodel)
    - [Conclusion](#conclusion)
    - [Additional Resources](#additionalresources)


## Overview

Data Science Workspace uses machine learning and artificial intelligence to unleash insights from your data. Integrated into the Adobe Cloud Platform, Data Science Workspace helps you make predictions using your content and data assets across Adobe solutions.  

Data scientists of all skill levels will find sophisticated, easy-to-use tools that support rapid development, training, and tuning of machine learning recipes-all the benefits of AI technology, without the complexity.  

With Data Science Workspace, data scientists can easily create intelligent services-APIs-powered by machine learning. These services work with other Adobe services, including Adobe Target and Adobe Analytics Cloud, to help you automate personalized, targeted digital experiences in web, desktop, and mobile apps.

---

## Introduction

Today's enterprise puts a high priority on mining big data for the predictions and insights that will help them personalize customer experiences and deliver more value to customers-and to the business. 
As important as it is, getting from data to insights can come at a high cost. It typically requires skilled data scientists who conduct intensive and time-consuming data research to develop machine-learning models, or recipes, which power intelligent services. The process is lengthy, the technology is complex, and skilled data scientists can be hard to find.  

With Data Science Workspace, the Adobe Cloud Platform allows you to bring experience-focused AI to bear across the enterprise, streamlining and accelerating data-to-insights-to-code with:
* A machine learning framework and runtime
* Integrated access to your data stored in Adobe Cloud Platform
* A unified data schema built on the Experience Data Model (XDM)
* The compute power essential for machine learning/AI and managing big datasets
* Prebuilt machine learning recipes to accelerate the leap into AI-driven experiences
* Simplified authoring, reuse, and modification of recipes for data scientists of varied skill levels
* Intelligent service publishing and sharing in just a few clicks-without a developer-and monitoring and retraining for continuous optimization of personalized customer experiences

Data scientists of all skill levels will achieve insights faster and more effective digital experiences sooner. 

## Terminology

Before diving into details of Data Science Workspace, here is a brief summary of key terms:

| Term | Definition |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Algorithm | Standard Data Science technique such as classification, linear regression, k-means clustering etc. |
| XDM | Standardized, extensible schemas for representing all experience data to enable immediate semantic understanding of cross-channel data and foster an ecosystem of pre-built insights & services. [(More information)](https://adobe.io/apis/cloudplatform/dataservices/xdm.html) |
| Feature | A feature is an individual measurable property or characteristic of a phenomenon being observed |
| Feature Engineering | Feature engineering is the process of converting raw data into usable form for analysis - using domain knowledge of the data to create features that make machine learning algorithms work. |
| Recipe | A recipe is a propriety algorithm, or an ensemble of algorithms, to help solve specific business problems |
| Instance | An instance is an occurrence of the recipe configured with the right data definition to help solve specific business problems. One recipe can create many instances. |
| Trained Model | A trained model is an instance (of the recipe) that is trained using historical data to learn from. The historical data must contain the correct answer, also known as the target or target attribute. The trained model finds patterns in the training data to help predict the target and uses that knowledge to predict the target for new sets of data where the target is unknown. One instance can create multiple trained models - one per training task. |
| Service | Service that is created from a "Trained Model" to be used in building experiences. |
| Jupyter Notebook | Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text. [(More information)](http://jupyter.org/) |
| Experiment | An experiment is the process of creating a trained model by training the instance with a portion of the live production data. |
| Hyperparameters | Different from standard model parameters, hyperparameters are high-level properties of a model that are usually fixed (hence not learned) during model training. Examples are: depth of decision tree, number of hidden layers, prior of NB, learning rate. |
| Unified Edge | Unified Edge is a cohesive collection of components and services which, when used together, power aggregation, sharing, and processing of data for real-time analysis and execution of customer experiences. |

The following chart outlines the hierarchical relationship between recipes, instances, experiments, and trained models. 

![](recipe_hiearchy.png)

## Why Data Science Workspace?

With Data Science Workspace, your data scientists can streamline the cumbersome process of uncovering insights in large datasets. Built on a common machine learning framework and runtime, Data Science Workspace delivers advanced workflow management, model management, and scalability. Intelligent services support re-use of machine learning recipes to power a variety of applications created using Adobe products and solutions. 

### One-stop Data Access

Data is the cornerstone of AI and machine learning.  

Data Science Workspace is fully integrated with the Adobe Cloud Platform, including the data lake, unified profile, and unified edge. Explore all your organizational data stored in Adobe Cloud Platform at once, along with common big data and deep learning libraries, such as Spark ML, and TensorFlow. If you don't find what you need, ingest your own datasets using the XDM standardized schema.  

### Prebuilt machine learning recipes

Data Science Workspace includes prebuilt machine learning recipes for common business needs, like retail sales prediction and anomaly detection, so data scientist and developers don't have to start from scratch. The built-in recipe gallery offers recommendations for prebuilt recipes based on your business need.

If you prefer, you can adapt a prebuilt recipe to your needs, import a recipe, or start from scratch to build a custom recipe. However you begin, once you train and hyper-tune a recipe, creating a custom intelligent service doesn't require a developer-just a few clicks and you're ready to build a targeted, personalized digital experience. 

### Workflow focused on the data scientist
Whatever your level of data science expertise, Data Science Workspace helps simplify and accelerate the process of finding insights in data and applying them to digital experiences.
 
### Data exploration

Finding the right data and preparing it is the most labor-intensive part of building an effective recipe. Data Science Workspace and the Adobe Cloud Platform help you get from data to insights more quickly.

On the Adobe Cloud Platform, your cross-channel data is centralized and stored in the XDM standardized schema, so data is easier to find, understand, and clean. A single store of data based on a common schema can save you countless hours of data exploration and preparation. 

As you browse, use the R, Python, or Scala language with the integrated, hosted Jupyter Notebook to browse the catalog of data on the platform. Using one of these languages, you can also take advantage of Spark ML and TensorFlow. Start from scratch, or use one of the notebook templates provided for specific business problems. 

As part of the data exploration workflow, you can also ingest new data or use existing features to help with data preparation.  

### Authoring

With Data Science Workspace, you decide how you want to author recipes. 

* Save time by browsing for a prebuilt recipe that addresses your business need, which you can use as-is or configure to meet your specific requirements. 
* Create a recipe from scratch, using the authoring runtime in Jupyter Notebook to develop and register the recipe.
* Upload a recipe authored outside the Adobe Cloud Platform into Data Science Workspace or import recipe code from a repository, such as Git, using the authentication and integration available between Git and Data Science Workspace.

### Experimentation

Data Science Workspace brings tremendous flexibility to the experimentation process. Start with your recipe. Then create a separate instance, using the same core algorithm paired with unique characteristics, such as hyper-tuning parameters. You can create as many instances as you need, training and scoring each instance as many times as you want. As you train them, Data Science Workspace tracks recipes, recipe instances, and trained instances, along with evaluation metrics, so you don't have to.

### Operationalization

When you're happy with your recipe, it's just a few clicks to create an intelligent service. No coding required-you can do it yourself, without enlisting a developer or engineer. 
Then publish the intelligent service to Adobe IO and it's ready for your digital experience team to consume.

<!--You can also publish your intelligent service to the Service Gallery, where it's available to specific people, specific organizations, or everyone who develops data solutions on the Adobe Cloud Platform. You can even share it with your external partners, and they can share their intelligent service with you. And the next time you're starting a new recipe, you can check the Service Gallery to see if there's a similar intelligent service you can use to get started. -->

### Continuous improvement

Data Science Workspace tracks where intelligent services are invoked and how they're performing. As data rolls in, you can evaluate intelligent service accuracy to close the loop, and retrain the recipes as needed to improve performance. The result is continuous refinement in the precision of customer personalization.

### Access to new features and datasets

Data scientists can take advantage of new technologies and datasets as soon as they are available through the Adobe services. Through frequent updates, we do the work of integrating datasets and technologies into the platform, so you don't have to.

### Security and peace of mind

Securing your data is a top priority for Adobe. We protect your data with security processes and controls developed to help us comply with industry-accepted standards, regulations, and certifications.

We build security into our software and services as part of Adobe Secure Product Lifecycle.
To learn more about Adobe data and software security, compliance, and more, visit our security page at https://www.adobe.com/security.html. 

## Data Science Workspace in action 

Predictions and insights provide the information you need to deliver a highly personalized experience to each customer who visits your web site, contacts your call center, or engages in other digital experiences. Here's how your day-to-day work happens with Data Science Workspace.

### Define the problem

It all starts with a business problem. For example, an online call center needs context to help them turn a negative customer sentiment positive.

There's plenty of data about the customer. They've browsed the site, put items in their cart, and even placed orders. They might have received emails, used coupons, or contacted the call center previously. The recipe, then, needs to use the data available about the customer and their activities to determine propensity to buy and recommend an offer that the customer is likely to appreciate and use.

![](example_problem.png)
 
At the time of the call center contact, the customer still has two pairs of shoes in the cart, but removed a shirt. With this information, the intelligent service might recommend that the call center agent offer a coupon for 20% off on shoes during the call. If the customer uses the coupon, that information is added to the dataset and the predictions become even better the next time the customer calls.

### Explore and prepare the data

Based on the business problem defined, you know the recipe should look at all the customer's web transactions, including site visits, searches, page views, links clicked, cart actions, offers received, emails received, call center interactions, and so on. 

A data scientist typically spends up to 75% of the time required to create a recipe exploring and transforming the data. Data often comes from multiple repositories and is saved in different schemas-it must be combined and mapped before it can be used to create a recipe. 

Your first step is to check the recipe gallery to see if an existing recipe meets your needs, or comes close. Or, you might import a recipe you created outside of Adobe Cloud Platform. Starting with an existing recipe often streamlines the data exploration phase.
 
![](prebuilt_recipes.png)

If you're starting from scratch or configuring an existing recipe, you begin your data search in a centralized and standardized data catalog for you organization, which simplifies the hunt considerably. You might even find that another data scientist in your organization has already identified a similar dataset, and choose to fine-tune that dataset rather than start from scratch.
All the data in the Adobe Cloud Platform complies with a standardized XDM schema, eliminating the need to create a complex model for joining data or obtain help from a data engineer.

If you don't immediately find the data you need, but it exists outside the Adobe Cloud Platform, it's a relatively simple task to ingest additional datasets, which will also transform into the standardized XDM schema.  
You can use Jupyter Notebook to simplify data pre-processing-possibly starting with a notebook template or a notebook you've used previously for propensity to buy.  
 
![](list_of_notebooks.png)

For more information, check out this tutorial:
* [How to Access and Explore Data in the Data Science Workspace](../../tutorials/ml_access_and_explore_data_tutorial/ml_access_and_explore_data_tutorial.md)

### Author the recipe

If you already found a recipe that meets all your needs, you can move on to experimentation. 
Or, you can modify the recipe a bit-or create one from scratch-taking advantage of the Data Science Workspace authoring runtime in Jupyter Notebook. Using the authoring runtime ensures that you can both use the Data Science Workspace training and scoring workflow and convert the recipe later so it can be stored in the recipe gallery and reused by others in your organization.

You can also use the [Data Science Workspace](http://platform.adobe.com/studio) to import a recipe, so that you can take advantage of the experimentation workflows as you create your intelligent service.

For more information, check out this tutorial:
* [Package Recipe to Import into the Data Science Workspace](../../tutorials/package_recipe_to_import_into_dsw/package_recipe_to_import_into_dsw.md)

### Experiment with the recipe

With a recipe in hand that incorporates your core algorithms, you'll create one or more unique instances of the recipe, and change the parameters for each instance so you can experiment. Then you'll test each unique recipe instance. 

![](recipe_hiearchy.png)

As you test, Data Science Workspace keeps track of evaluation metrics for each unique recipe instance and each trained instance. You'll check Data Science Workspace's evaluation metrics as you experiment to find the instance that performs best. 

![](evaluation_metrics.png)

For more information, check out these tutorials:
* [Import, Train, and Evaluate Recipe Tutorial via UI](../../tutorials/how_to_import_train_evaluate_recipe_tutorial/how_to_import_train_evaluate_recipe_tutorial.md)
* [Import, Train, and Evaluate Recipe Tutorial via API](../../tutorials/how_to_import_train_evaluate_recipe_tutorial/how_to_import_train_evaluate_recipe_api_tutorial.md)


### Operationalize the model

When you've selected the best trained recipe to address your business need, you can create an intelligent service in Data Science Workspace without developer assistance. It's just a couple of clicks-no coding required. Then publish the intelligence service to Adobe I/O for deployment in digital experiences. 

As your intelligent service is deployed, you can continue to track where it's used and how it's doing, retraining it to improve performance as more data becomes available. 

## Conclusion

Data Science Workspace helps streamline and simplify data science workflow, from data gathering to algorithms to intelligent services, for data scientists of all skill levels. With the sophisticated tools Data Science Workspace provides, you can significantly shorten the time from data to insights.

More importantly, Data Science Workspace puts the data science and algorithmic optimization capabilities of Adobe's leading marketing platform in the hands of enterprise data scientists. For the first time, enterprises can bring proprietary algorithms to the platform, taking advantage of Adobe's powerful machine learning and AI capabilities to deliver highly personalized customer experiences at massive scale.  

With the marriage of brand expertise and Adobe's machine learning and AI prowess, enterprises will have the power to drive more business value and brand loyalty by giving customers what they want, before they ask for it.

Adobe was recently named the only leader in "The Forrester Wave™: Digital Intelligence Platforms, Q2 2017" report, and received the highest scores possible in nine criteria, including behavioral targeting and online testing.

## Additional Resources
For more information about Data Science Workspace, visit https://adobe.io/apis/cloudplatform/dataservices.html.
To stay up to date, sign up for Adobe Sensei and AI news at www.adobe.com/subscription/adobesenseinewsletter.html.
