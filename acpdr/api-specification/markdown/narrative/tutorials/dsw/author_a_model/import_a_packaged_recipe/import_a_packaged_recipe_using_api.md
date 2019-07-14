# Import a packaged Recipe using the API <!-- omit in toc -->

This tutorial uses the [Sensei Machine Learning API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/sensei-ml-api.yaml) to create an **Engine**, also known as a Recipe in the user interface. 

Before getting started, it is important to note that Adobe Experience Platform Data Science Workspace uses different terms to refer to similar elements within the API and UI. The API terms are used throughout this tutorial and the following table outlines the correlating terms:

| UI Term | API Term |
| ---- | ---- |
| Recipe | Engine |
| Model | MLInstance |
| Training and evaluation | Experiment |
| Service | MLService |

An Engine contains machine learning algorithms and logic to solve specific problems. The diagram below provides a visualization showing the API workflow in Data Science Workspace. This tutorial focuses on creating an Engine, the brain of a machine learning Model.

![](./images/api/engine_hierarchy_api.png)

## Getting started

This tutorial requires a packaged Recipe file in the form of either a binary artifact or a Docker URL. Follow the [Package source files into a Recipe](../../author_a_model/package_source_files_into_recipe/package_source_files_into_recipe.md) tutorial to create a packaged Recipe file or provide your own.

*   Binary artifact : The binary artifact (eg. JAR, EGG) used to create an Engine.  
*   `{DOCKER_URL}` : An URL address to a Docker image of an intelligent service.

This tutorial requires you to have completed the [Authentication to Adobe Experience Platform tutorial](https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md) in order to successfully make calls to Platform APIs. Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

*   `{ACCESS_TOKEN}`: Your specific bearer token value provided after authentication.
*   `{IMS_ORG}`: Your IMS org credentials found in your unique Adobe Experience Platform integration.
*   `{API_KEY}`: Your specific API key value found in your unique Adobe Experience Platform integration.

## Create an Engine

Depending on the form of the packaged Recipe file to be included as a part of the API request, an Engine is created through one of two ways:
-   [Create an Engine with a binary artifact](#create-an-engine-with-a-binary-artifact)
-   [Create an Engine with a Docker URL](#create-an-engine-with-a-docker-url)

### Create an Engine with a binary artifact

In order to create an Engine using a local packaged `.jar` or `.egg` binary artifact, you must provide the absolute path to the binary artifact file in your local file system. Consider navigating to the directory containing the binary artifact in a Terminal environment, and execute the `pwd` Unix command for the absolute path.

The following call creates an Engine with a binary artifact:

#### API Format

```http
POST /engines
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/engines \
    -H 'Authorization: {ACCESS_TOKEN}' \
    -H 'X-API-KEY: {API_KEY}' \
    -H 'content-type: multipart/form-data' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -F 'engine={
        "name": "Retail Sales Engine PySpark",
        "description": "A description for Retail Sales Engine, this Engines execution type is PySpark",
        "type": "PySpark"
    }' \
    -F 'defaultArtifact=@path/to/binary/artifact/file/pysparkretailapp-0.1.0-py3.7.egg'
```

*   `engine > name` : The desired name for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in Data Science Workspace user interface as the Recipe's name.
*   `engine > description` : An optional description for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in Data Science Workspace user interface as the Recipe's description. Do not remove this property, let this value be an empty string if you choose not to provide a description.
*   `engine > type`: The execution type of the Engine. This value corresponds to the language in which the binary artifact was developed in.

    > **Note:** When uploading a binary artifact to create an Engine, `type` is either `Spark` or `PySpark`.

*   `defaultArtifact` : The absolute path to the binary artifact file used to create the Engine.

    > **Note:** Ensure to include `@` before the file path.

#### Response

```JSON
{
    "id": "00000000-1111-2222-3333-abcdefghijkl",
    "name": "Retail Sales Engine PySpark",
    "description": "A description for Retail Sales Engine, this Engines execution type is PySpark",
    "type": "PySpark",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "your_user_id@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "artifacts": {
        "default": {
            "image": {
                "location": "wasbs://some-storage-location.net/some-path/your-uploaded-binary-artifact.egg",
                "name": "pysparkretailapp-0.1.0-py3.7.egg",
                "executionType": "PySpark",
                "packagingType": "egg"
            }
        }
    }
}
```

A successful response shows a JSON payload with information regarding the newly created Engine. The `id` key represents the unique Engine identifier and is required in the next tutorial to create an MLInstance. Ensure the Engine identifier is saved before continuing to the [next steps](#next-steps).

### Create an Engine with a Docker URL

In order to create an Engine with a packaged Recipe file stored in a Docker container, you must provide the Docker URL to the packaged Recipe file.

The following call creates an Engine with a Docker URL:

#### API Format

```http
POST /engines
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/engines \
    -H 'Authorization: {ACCESS_TOKEN}' \
    -H 'X-API-KEY: {API_KEY}' \
    -H 'content-type: multipart/form-data' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -F 'engine={
        "name": "Retail Sales Engine Python",
        "description": "A description for Retail Sales Engine, this Engines execution type is Python",
        "type": "Python"
        "artifacts": {
            "default": {
                "image": {
                    "location": "{DOCKER_URL}",
                    "name": "retail_sales_python",
                    "executionType": "Python"
                }
            }
        }
    }' 
```

*   `engine > name` : The desired name for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in Data Science Workspace user interface as the Recipe's name.
*   `engine > description` : An optional description for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in Data Science Workspace user interface as the Recipe's description. Do not remove this property, let this value be an empty string if you choose not to provide a description.
*   `engine > type`: The execution type of the Engine. This value corresponds to the language in which the Docker image is developed in.
    
    > **Note:** When a Docker URL is provided to create an Engine, `type` is either `Python`, `R`, or `Tensorflow`.

*   `artifacts > default > image > location` : Your `{DOCKER_URL}` goes here. A complete Docker URL has the following structure: 
    
    ```
    your_docker_host.azurecr.io/docker_image_file:version
    ```
    
*   `artifacts > default > image > name` : An additional name for the Docker image file. Do not remove this property, let this value be an empty string if you choose not to provide an additional Docker image file name.
*    `artifacts > default > image > executionType` : The execution type of this Engine. This value corresponds to the language in which the Docker image is developed in.

    > **Note:** When a Docker URL is provided to create an Engine, `executionType` is either `Python`, `R`, or `Tensorflow`.

#### Response

```JSON
{
    "id": "00000000-1111-2222-3333-abcdefghijkl",
    "name": "Retail Sales Engine Python",
    "description": "A description for Retail Sales Engine, this Engines execution type is Python",
    "type": "Python",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "your_user_id@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "artifacts": {
        "default": {
            "image": {
                "location": "{DOCKER_URL}",
                "name": "retail_sales_python",
                "executionType": "Python",
                "packagingType": "docker"
            }
        }
    }
}
```

A successful response shows a JSON payload with information regarding the newly created Engine. The `id` key represents the unique Engine identifier and is required in the next tutorial to create an MLInstance. Ensure the Engine identifier is saved before continuing to the next steps.

## Next steps

You have created an Engine using the API and a unique Engine identifier was obtained as part of the response body. You can use this Engine identifier in the next tutorial as you learn how to [create, train, and evaluate a Model using the API](../../train_evaluate_score_a_model/train_and_evaluate_a_model_tutorial/train_and_evaluate_a_model_using_the_api.md).