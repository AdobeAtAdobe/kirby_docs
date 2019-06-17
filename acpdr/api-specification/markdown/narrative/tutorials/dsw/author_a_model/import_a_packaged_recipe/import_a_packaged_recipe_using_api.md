# Import a packaged Recipe using the API <!-- omit in toc -->

- [Objective](#objective)
- [Prerequisites](#prerequisites)
- [API workflow](#api-workflow)
    - [Create an Engine](#create-an-engine)
- [Next steps](#next-steps)

---

## Objective
In this step by step tutorial, we will consume the APIs which allow us to create an Engine, an Experiment, scheduled Experiment Runs, and Models. For a detailed list of API documentation please refer to [this document](https://www.adobe.io/apis/cloudplatform/dataservices/api-reference.html).

---

## Prerequisites

Follow this [Tutorial](../../authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) for authorization to start making API calls.

From the tutorial you should now have the following values:

* `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
* `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
* `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

* Link to a Docker image of an intelligent service

---

## API workflow

We will be consuming the APIs to create an Experiment Run for training and scoring. For this tutorial, we will be focused on Engines, MLInstances, and Experiments. The following chart outlines the relationship between the three and also introduces the idea of a Run and a Model. 

![](./images/engine_hierarchy_api.png)

> **Note:** The terms "Engine", "MLInstance", "MLService", "Experiment", and "Model" are referred to as different terms in the UI. If you're coming from the UI, the following table will map the differences.
> 
> UI Term | API Term
> --- | ---
> Recipe | Engine
> Model | MLInstance/ Experiment
> Service | MLService

### Create an Engine

With the Docker image for the Engine created in the [Package Recipe to Data Science Workspace tutorial](../package_recipe_to_import_into_dsw/package_recipe_to_import_into_dsw.md), we can create a Engine. The Engine is an umbrella entity holding all MLInstances. An Engine is usually tied to one or more Docker images which is specified in the body of the request.


#### Request <!-- omit in toc -->

```SHELL
curl -X POST \
  https://platform.adobe.io/data/sensei/engines \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'X-API-KEY: {API_KEY}' \
  -H 'content-type: multipart/form-data' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -F 'engine={
        "name": "Sensei - Sentiment Analysis",
        "description": "Description of Sensei - Retail",
        "type": "Spark",
        "artifacts": {
            "default": {
                "image": {
                    "location": "{DOCKER_IMAGE}",
                    "name": "retail",
                    "executionType": "Spark",
                    "metadata": {
                        "__artifacts": "{ARTIFACT_BINARIES}"
                    }
                }
            }
        }
    }'
```

`{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.  
`{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.  
`{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.  
`{DOCKER_IMAGE}`: Link to the Docker image.  
`{ARTIFACT_BINARIES}`: The binary Engine artifact (eg. JAR, EGG) used for all operations by default.  

> **Note:** If an image that is not `Spark` is used, the `type` and `executionType` fields should be set to the correct type (eg. `Python`, `Pyspark`).

#### Response <!-- omit in toc -->

The response from the Engine creation call is captured below.

```JSON
{
    "id": "{ENGINE_ID}",
    "name": "Sensei - Retail",
    "type": "Spark",
    "created": "2018-11-11T11:11:11.111Z",
    "updated": "2018-11-11T11:11:11.111Z",
    "deleted": false,
    "artifacts": {
        "default": {
            "image": {
                "location": "{DOCKER_IMAGE}",
                "name": "retail",
                "executionType": "Spark",
                "packagingType": "docker"
            },
            "defaultMLInstanceConfigs": [
                {
                    "name": "train",
                    "parameters": [
                        {
                            "key": "numFeatures",
                            "value": "1000"
                        },
                        {
                            "key": "maxIter",
                            "value": "100"
                        },
                        {
                            "key": "regParam",
                            "value": "0.15"
                        }
                    ]
                }
            ]
        }
    }
}
```

`{ENGINE_ID}`: This ID returned can be used to create a number of MLInstances.

---

## Next steps

This tutorial went over how to consume the APIs to create an Engine, an Experiment, scheduled Experiment Runs, and trained Models. In the [next exercise](../how_to_score_with_recipe/how_to_score_with_recipe.md), you will be making predictions by scoring a new dataset using the top performing trained model.