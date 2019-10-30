# Sensei Machine Learning developer guide

The Sensei Machine Learning framework is used to manage and access machine learning models within Adobe Experience Platform Data Science Workspace, providing a user interface and RESTful API from which all available resources are accessible.

This developer guide provides steps to help you start using the [Sensei Machine Learning API](https://www.adobe.io/apis/experienceplatform/home/api-reference.html#!acpdr/swagger-specs/sensei-ml-api.yaml) and demonstrates API calls for performing CRUD operations on each of the endpoints:

-   [Engines](#engines)
    -   [Lookup your Docker registry](#lookup-your-docker-registry)
    -   [Create an Engine using Docker URLs](#create-an-engine-using-docker-urls)
    -   [Create an Engine using binary artifacts](#create-an-engine-using-binary-artifacts)
    -   [Create a feature pipeline Engine using binary artifacts](#create-a-feature-pipeline-engine-using-binary-artifacts)
    -   [Retrieve a list of Engines](#retrieve-a-list-of-engines)
    -   [Retrieve a specific Engine](#retrieve-a-specific-engine)
    -   [Update an Engine](#update-an-engine)
    -   [Delete an Engine](#delete-an-engine)
-   [MLInstances](#mlinstances)
    -   [Create an MLInstance](#create-an-mlinstance)
    -   [Retrieve a list of MLInstances](#retrieve-a-list-of-mlinstances)
    -   [Retrieve a specific MLInstance](#retrieve-a-specific-mlinstance)
    -   [Update an MLInstance](#update-an-mlinstance)
    -   [Delete an MLInstance](#delete-an-mlinstance)
    -   [Delete MLInstances by Engine ID](#delete-mlinstances-by-engine-id)
-   [Experiments](#experiments)
    -   [Create an Experiment](#create-an-experiment)
    -   [Create and execute an Experiment run](#create-and-execute-a-training-or-scoring-run)
    -   [Retrieve a list of Experiments](#retrieve-a-list-of-experiments)
    -   [Retrieve a specific Experiment](#retrieve-a-specific-experiment)
    -   [Retrieve a list of Experiment runs](#retrieve-a-list-of-experiment-runs)
    -   [Update an Experiment](#update-an-experiment)
    -   [Delete an Experiment](#delete-an-experiment)
    -   [Delete Experiments by MLInstance ID](#delete-experiments-by-mlinstance-id)
-   [MLServices](#mlservice)
    -   [Create an MLService](#create-an-mlservice)
    -   [Retrieve a list of MLServices](#retrieve-a-list-of-mlservices)
    -   [Retrieve a specific MLService](#retrieve-a-specific-mlservice)
    -   [Update an MLService](#update-an-mlservice)
    -   [Delete an MLService](#delete-an-mlservice)
    -   [Delete MLServices by MLInstance ID](#delete-mlservices-by-mlinstance-id)


[//]: # (TODO: Models endpoint)
[//]: # (TODO: Insights endpoint)

The [Appendix](#appendix) to this document contains additional helpful resources related to this API, including:

-   [Query parameters for asset retrieval](#query-parameters-for-asset-retrieval)
-   [Python CPU and GPU configurations](#python-cpu-and-gpu-configurations)
-   [PySpark and Spark resource configurations](#pyspark-and-spark-resource-configurations)

## Getting started with the Sensei Machine Learning API

Using the Sensei Machine Learning API, you can perform basic CRUD operations in order to view and manage all machine learning assets available to you within Adobe Experience Platform. You can also use API calls to create new machine learning Models for your organization, as well as view and edit resources that you have already defined.

The following sections provide additional information that you will need to know in order to successfully make calls to the Sensei Machine Learning API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in documentation for sample API calls, see the section on [how to read example API calls](https://www.adobe.io/apis/experienceplatform/home/services/troubleshooting.html#!api-specification/markdown/narrative/technical_overview/platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request) in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Platform APIs, you must first complete the [authentication tutorial](../../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md). Completing the authentication tutorial provides the values for each of the required headers in all Experience Platform API calls, as shown below:

- Authorization: Bearer `{ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox the operation will take place in:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on sandboxes in Platform, see the [sandbox overview documentation](../../sandboxes/sandboxes-overview.md). 

All requests that contain a payload (POST, PUT, PATCH) require an additional header:

- Content-Type: application/json

## Sample API calls

The following sections provide important information regarding each endpoint and demonstrates sample API calls for performing CRUD operations. Each call includes the general API format, a sample request showing required headers, and a sample response.

## Engines

Engines are the foundations for machine learning Models in Data Science Workspace. They contain machine learning algorithms that solve specific problems, feature pipelines to perform feature engineering, or both. 

### Lookup your Docker registry

Your Docker registry credentials are required in order to upload a packaged Recipe file, including your Docker host URL, username, and password. You can look up this information by performing the following GET request:

#### API Format

```http
GET /engines/dockerRegistry
```

#### Request

```shell
curl -X GET https://platform.adobe.io/data/sensei/engines/dockerRegistry \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```
#### Response

A successful response returns a payload containing the details of your Docker registry including the Docker URL (`host`), username (`username`), and password (`password`).

>   **Note:** Your Docker password changes whenever your `{ACCESS_TOKEN}` is updated.

```json
{
    "host": "docker_host.azurecr.io",
    "username": "00000000-0000-0000-0000-000000000000",
    "password": "password"
}
```

### Create an Engine using Docker URLs

You can create an Engine by performing a POST request while providing its metadata and a Docker URL that references a Docker image in multipart forms.

#### API Format

```http
POST /engines
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/engines \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: multipart/form-data' \
    -F 'engine={
        "name": "A name for this Engine",
        "description": "A description for this Engine",
        "type": "Python",
        "algorithm": "Classification",
        "artifacts": {
            "default": {
                "image": {
                    "location": "{DOCKER_URL}",
                    "name": "An additional name for the Docker image",
                    "executionType": "Python"
                }
            }
        }
    }' 
```

*   `name`: The desired name for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in the UI as the Recipe's name.
*   `description`: An optional description for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in UI as the Recipe's description. This property is required. If you do not want to provide a description, set its value to be an empty string.
*   `type`: The execution type of the Engine. This value corresponds to the language in which the Docker image is built upon and can be either "Python", "R", or "Tensorflow".
*   `algorithm`: A string that specifies the type of machine learning algorithm. Supported algorithm types include "Classification", "Regression", or "Custom".
*   `artifacts > default > image > location`: The location of the Docker image linked to by a Docker URL.
*   `artifacts > default > image > executionType`: The execution type of the Engine. This value corresponds to the language in which the Docker image is built upon and can be either "Python", "R", or "Tensorflow".


#### Response

A successful response returns a payload containing the details of the newly created Engine including its unique identifier (`id`).

```json
{
    "id": "{ENGINE_ID}",
    "name": "A name for this Engine",
    "description": "A description for this Engine",
    "type": "Python",
    "algorithm": "Classification",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "artifacts": {
        "default": {
            "image": {
                "location": "{DOCKER_URL}",
                "name": "An additional name for the Docker image",
                "executionType": "Python",
                "packagingType": "docker"
            }
        }
    }
}
```

### Create an Engine using binary artifacts

You can create an Engine using local `.jar` or `.egg` binary artifacts by performing a POST request while providing its meta data and the artifact's path in multipart forms.

#### API Format

```http
POST /engines
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/engines \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: multipart/form-data' \
    -F 'engine={
        "name": "A name for this Engine",
        "description": "A description for this Engine",
        "algorithm": "Classification",
        "type": "PySpark",
    }' \
    -F 'defaultArtifact=@path/to/binary/artifact/file.egg'
```

*   `name`: The desired name for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in the UI as the Recipe's name.
*   `description`: An optional description for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in UI as the Recipe's description. This property is required. If you do not want to provide a description, set its value to be an empty string.
*   `algorithm`: A string that specifies the type of machine learning algorithm. Supported algorithm types include "Classification", "Regression", or "Custom".
*   `type`: The execution type of the Engine. This value corresponds to the language in which the binary artifact is built upon and can be either "PySpark" or "Spark".


#### Response

A successful response returns a payload containing the details of the newly created Engine including its unique identifier (`id`).

```json
{
    "id": "{ENGINE_ID}",
    "name": "A name for this Engine",
    "description": "A description for this Engine",
    "type": "PySpark",
    "algorithm": "Classification",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "artifacts": {
        "default": {
            "image": {
                "location": "wasbs://artifact-location.blob.core.windows.net/Engine_ID/default.egg",
                "name": "file.egg",
                "executionType": "PySpark",
                "packagingType": "egg"
            }
        }
    }
}
```

### Create a feature pipeline Engine using binary artifacts

You can create a feature pipeline Engine using local `.jar` or `.egg` binary artifacts by performing a POST request while providing its meta data and the artifact's paths in multipart forms. A PySpark or Spark Engine has the ability to specify computation resources such as the number of cores or the amount of memory. Please refer to the appendix section on [PySpark and Spark resource configurations](#appendix-pyspark-and-spark-resource-configurations) for more information.

#### API Format

```http
POST /engines
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/engines \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: multipart/form-data' \
    -F 'engine={
        "name": "Feature Pipeline Engine",
        "description": "A feature pipeline Engine",
        "algorithm":"fp",
        "type": "PySpark"
    }' \
    -F 'featurePipelineOverrideArtifact=@path/to/binary/artifact/feature_pipeline.egg' \
    -F 'defaultArtifact=@path/to/binary/artifact/feature_pipeline.egg'
```

*   `name`: The desired name for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in the UI as the Recipe's name.
*   `description`: An optional description for the Engine. The Recipe corresponding to this Engine will inherit this value to be displayed in UI as the Recipe's description. This property is required. If you do not want to provide a description, set its value to be an empty string.
*   `algorithm`: A string that specifies the type of machine learning algorithm. Set this value as "fp" to specify this creation to be a Feature Pipeline Engine.
*   `type`: The execution type of the Engine. This value corresponds to the language in which the binary artifacts are built upon and can be either "PySpark" or "Spark".

#### Response

A successful response returns a payload containing the details of the newly created Engine including its unique identifier (`id`).

```json
{
    "id": "{ENGINE_ID}",
    "name": "Feature Pipeline Engine",
    "description": "A feature pipeline Engine",
    "type": "PySpark",
    "algorithm": "fp",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "artifacts": {
        "default": {
            "image": {
                "location": "wasbs://artifact-location.blob.core.windows.net/Engine_ID/default.egg",
                "name": "file.egg",
                "executionType": "PySpark",
                "packagingType": "egg"
            }
        }
    }
}
```

###  Retrieve a list of Engines

You can retrieve a list of Engines by performing a single GET request. To help filter results, you can specify query parameters in the request path. For a list of available queries, refer to the appendix section on [query parameters for asset retrieval](#appendix-query-parameters-for-asset-retrieval).

#### API Format

```http
GET /engines
GET /engines?parameter_1=value_1
GET /engines?parameter_1=value_1&parameter_2=value_2
```

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/engines \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```
#### Response

A successful response returns a list of Engines and their details.

```json
{
    "children": [
        {
            "id": "{ENGINE_ID}",
            "name": "A name for this Engine",
            "description": "A description for this Engine",
            "type": "PySpark",
            "algorithm": "Classification",
            "created": "2019-01-01T00:00:00.000Z",
            "createdBy": {
                "userId": "Jane_Doe@AdobeID"
            },
            "updated": "2019-01-01T00:00:00.000Z"
        },
        {
            "id": "{ENGINE_ID}",
            "name": "A name for this Engine",
            "description": "A description for this Engine",
            "type": "Python",
            "algorithm": "Classification",
            "created": "2019-01-01T00:00:00.000Z",
            "createdBy": {
                "userId": "Jane_Doe@AdobeID"
            },
            "updated": "2019-01-01T00:00:00.000Z"
        },
        {
            "id": "{ENGINE_ID}",
            "name": "Feature Pipeline Engine",
            "description": "A feature pipeline Engine",
            "type": "PySpark",
            "algorithm":"fp",
            "created": "2019-01-01T00:00:00.000Z",
            "createdBy": {
                "userId": "Jane_Doe@AdobeID"
            },
            "updated": "2019-01-01T00:00:00.000Z"
        }
    ],
    "_page": {
        "property": "deleted==false",
        "totalCount": 100,
        "count": 3
    }
}
```

### Retrieve a specific Engine

You can retrieve the details of a specific Engine by performing a GET request that includes the ID of the desired Engine in the request path.

#### API Format

```http
GET /engines/{ENGINE_ID}
```

*   `{ENGINE_ID}`: The ID of an existing Engine.

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/engines/{ENGINE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```
#### Response

A successful response returns a payload containing the details of the desired Engine.

```json
{
    "id": "{ENGINE_ID}",
    "name": "A name for this Engine",
    "description": "A description for this Engine",
    "type": "PySpark",
    "algorithm": "Classification",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "artifacts": {
        "default": {
            "image": {
                "location": "wasbs://artifact-location.blob.core.windows.net/{ENGINE_ID}/default.egg",
                "name": "file.egg",
                "executionType": "PySpark",
                "packagingType": "egg"
            }
        }
    }
}
```

### Update an Engine

You can modify and update an existing Engine by overwriting its properties through a PUT request that includes the target Engine's ID in the request path and providing a JSON payload containing updated properties.

>   **Note:** In order to ensure the success of this PUT request, it is suggested that first you perform a GET request to [retrieve the Engine by ID](#retrieve-an-engine-by-id). Then, modify and update the returned JSON object and apply the entirety of the modified JSON object as the payload for the PUT request.

The following sample API call will update an Engine's name and description while having these properties initially:

```json
{
    "name": "A name for this Engine",
    "description": "A description for this Engine",
    "type": "Python",
    "algorithm": "Classification",
    "artifacts": {
        "default": {
            "image": {
                "executionType": "Python",
                "packagingType": "docker"
            }
        }
    }
}
```

#### API Format

```http
PUT /engines/{ENGINE_ID}
```

*   `{ENGINE_ID}`: The ID of an existing Engine.

#### Request

```shell
curl -X PUT \
    https://platform.adobe.io/data/sensei/engines/{ENGINE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: application/vnd.adobe.platform.sensei+json;profile=engine.v1.json' \
    -d '{
        "name": "An updated name for this Engine",
        "description": "An updated description",
        "type": "Python",
        "algorithm": "Classification",
        "artifacts": {
            "default": {
                "image": {
                    "executionType": "Python",
                    "packagingType": "docker"
                }
            }
        }
    }'
```

#### Response

A successful response returns a payload containing the Engine's updated details.

```json
{
    "id": "{ENGINE_ID}",
    "name": "An updated name for this Engine",
    "description": "An updated description",
    "type": "Python",
    "algorithm": "Classification",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "displayName": "Jane Doe",
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-02T00:00:00.000Z",
    "artifacts": {
        "default": {
            "image": {
                "executionType": "Python",
                "packagingType": "docker"
            }
        }
    }
}
```

### Delete an Engine

You can delete an Engine by performing a DELETE request while specifying the target Engine's ID in the request path. Deleting an Engine will cascade delete all MLInstances which reference that Engine, including any Experiments and Experiment runs belonging to those MLInstances.

#### API Format

```http
DELETE /engines/{ENGINE_ID}
```

*   `{ENGINE_ID}`: The ID of an existing Engine.

#### Request

```shell
curl -X DELETE \
    https://platform.adobe.io/data/sensei/engines/{ENGINE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

```json
{
    "title": "Success",
    "status": 200,
    "detail": "Engine deletion was successful"
}
```

## MLInstances

An MLInstance is a pairing of an existing [Engine](#engine) with an appropriate set of configurations that defines any training parameters, scoring parameters, or hardware resource configurations.

[//]: # (talk about configurations here)

### Create an MLInstance

You can create an MLInstance by performing a POST request while providing a request payload consisting of a valid Engine ID (`{ENGINE_ID}`) and an appropriate set of default configurations. If the Engine ID references a PySpark or Spark Engine then you have the ability to configure the amount of computation resources such as the number of cores or the amount of memory. If a Python Engine is referenced then you can choose between using either a CPU or GPU for training and scoring purposes. Refer to the appendix sections on [PySpark and Spark resource configurations](#appendix-pyspark-and-spark-resource-configurations) and [Python CPU and GPU configuration](#appendix-python-cpu-and-gpu-configurations) for more information.

#### API Format

```http
POST /mlInstances
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/mlInstances \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
    -H 'content-type: application/vnd.adobe.platform.sensei+json;profile=mlInstance.v1.json' \
    -d '{
        "name": "A name for this MLInstance",
        "description": "A description for this MLInstance",
        "engineId": "{ENGINE_ID}",
        "tasks": [
            {
                "name": "train",
                "parameters": [
                    {
                        "key": "training parameter",
                        "value": "parameter value"
                    }
                ]
            },
            {
                "name": "score",
                "parameters": [
                    {
                        "key": "scoring parameter",
                        "value": "parameter value"
                    }
                ]
            },
            {
                "name": "fp",
                "parameters": [
                    {
                        "key": "feature pipeline parameter",
                        "value": "parameter value"
                    }
                ]
            }
        ],
    }'
```

*   `name`: The desired name for the MLInstance. The Model corresponding to this MLInstance will inherit this value to be displayed in the UI as the Model's name.
*   `description`: An optional description for the MLInstance. The Model corresponding to this MLInstance will inherit this value to be displayed in UI as the Model's description. This property is required. If you do not want to provide a description, set its value to be an empty string.
*   `engineId`: The ID of an existing Engine.
*   `tasks`: A set of configurations for training, scoring, or feature pipelines.

#### Response

A successful response returns a payload containing the details of the newly created MLInstance including its unique identifier (`id`).

```json
{
    "id": "{MLINSTANCE_ID}",
    "name": "A name for this MLInstance",
    "description": "A description for this MLInstance",
    "engineId": "{ENGINE_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "tasks": [
        {
            "name": "train",
            "parameters": [
                {
                    "key": "training parameter",
                    "value": "parameter value"
                }
            ]
        },
        {
            "name": "score",
            "parameters": [
                {
                    "key": "scoring parameter",
                    "value": "parameter value"
                }
            ]
        },
        {
            "name": "fp",
            "parameters": [
                {
                    "key": "feature pipeline parameter",
                    "value": "parameter value"
                }
            ]
        }
    ]
}
```

### Retrieve a list of MLInstances

You can retrieve a list of MLInstances by performing a single GET request. To help filter results, you can specify query parameters in the request path. For a list of available queries, refer to the appendix section on [query parameters for asset retrieval](#appendix-query-parameters-for-asset-retrieval).

#### API Format

```http
GET /mlInstances
GET /mlInstances?parameter_1=value_1
GET /mlInstances?parameter_1=value_1&parameter_2=value_2
```

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/mlInstances \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of MLInstances and their details.

```json
{
    "children": [
        {
            "id": "{MLINSTANCE_ID}",
            "name": "A name for this MLInstance",
            "description": "A description for this MLInstance",
            "engineId": "{ENGINE_ID}",
            "created": "2019-01-01T00:00:00.000Z",
            "createdBy": {
                "displayName": "Jane Doe",
                "userId": "Jane_Doe@AdobeID"
            },
            "updated": "2019-01-01T00:00:00.000Z"
        },
        {
            "id": "{MLINSTANCE_ID}",
            "name": "Retail Sales Model",
            "description": "A Model created with the Retail Sales Recipe",
            "engineId": "{ENGINE_ID}",
            "created": "2019-01-01T00:00:00.000Z",
            "createdBy": {
                "displayName": "Jane Doe",
                "userId": "Jane_Doe@AdobeID"
            },
            "updated": "2019-01-01T00:00:00.000Z"
        }
    ],
    "_page": {
        "property": "deleted==false",
        "totalCount": 2,
        "count": 2
    }
}
```

### Retrieve a specific MLInstance

You can retrieve the details of a specific MLInstance by performing a GET request that includes the ID of the desired MLInstance in the request path.

#### API Format

```http
GET /mlInstances/{MLINSTANCE_ID}
```

*   `{MLINSTANCE_ID}`: The ID of the desired MLInstance.

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/mlInstances/{MLINSTANCE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns the details of the MLInstance.

```json
{
    "id": "{MLINSTANCE_ID}",
    "name": "A name for this MLInstance",
    "description": "A description for this MLInstance",
    "engineId": "{ENGINE_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "displayName": "Jane Doe",
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "tasks": [
        {
            "name": "train",
            "parameters": [
                {
                    "key": "training parameter",
                    "value": "parameter value"
                }
            ]
        },
        {
            "name": "score",
            "parameters": [
                {
                    "key": "scoring parameter",
                    "value": "parameter value"
                }
            ]
        },
        {
            "name": "fp",
            "parameters": [
                {
                    "key": "feature pipeline parameter",
                    "value": "parameter value"
                }
            ]
        }
    ]
}
```

### Update an MLInstance

You can update an existing MLInstance by overwriting its properties through a PUT request that includes the target MLInstance's ID in the request path and providing a JSON payload containing updated properties.

>   **Note:** In order to ensure the success of this PUT request, it is suggested that first you perform a GET request to [retrieve the MLInstance by ID](#retrieve-an-mlinstance-by-id). Then, modify and update the returned JSON object and apply the entirety of the modified JSON object as the payload for the PUT request.

The following sample API call will update an MLInstance's training and scoring parameters while having these properties initially:

```json
{
    "name": "A name for this MLInstance",
    "description": "A description for this MLInstance",
    "engineId": "00000000-0000-0000-0000-000000000000",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "displayName": "Jane Doe",
        "userId": "Jane_Doe@AdobeID"
    },
    "tasks": [
        {
            "name": "train",
            "parameters": [
                {
                    "key": "learning_rate",
                    "value": "0.3"
                }
            ]
        },
        {
            "name": "score",
            "parameters": [
                {
                    "key": "output_dataset_id",
                    "value": "output-dataset-000"
                }
            ]
        }
    ]
}
```

#### API Format

```http
PUT /mlInstances/{MLINSTANCE_ID}
```

*   `{MLINSTANCE_ID}`: A valid MLInstance ID.

#### Request

```shell
curl -X PUT \
    https://platform.adobe.io/data/sensei/mlInstances/{MLINSTANCE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: application/vnd.adobe.platform.sensei+json;profile=mlInstance.v1.json' \
    -d '{
        "name": "A name for this MLInstance",
        "description": "A description for this MLInstance",
        "engineId": "00000000-0000-0000-0000-000000000000",
        "created": "2019-01-01T00:00:00.000Z",
        "createdBy": {
            "displayName": "Jane Doe",
            "userId": "Jane_Doe@AdobeID"
        },
        "tasks": [
            {
                "name": "train",
                "parameters": [
                    {
                        "key": "learning_rate",
                        "value": "0.5"
                    }
                ]
            },
            {
                "name": "score",
                "parameters": [
                    {
                        "key": "output_dataset_id",
                        "value": "output-dataset-001"
                    }
                ]
            }
        ]
    }'
```

#### Response

A successful response returns a payload containing the MLInstance's updated details.

```json
{
    "id": "{MLINSTANCE_ID}",
    "name": "A name for this MLInstance",
    "description": "A description for this MLInstance",
    "engineId": "00000000-0000-0000-0000-000000000000",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "displayName": "Jane Doe",
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-02T00:00:00.000Z",
    "tasks": [
        {
            "name": "train",
            "parameters": [
                {
                    "key": "learning_rate",
                    "value": "0.5"
                }
            ]
        },
        {
            "name": "score",
            "parameters": [
                {
                    "key": "output_dataset_id",
                    "value": "output-data-set-001"
                }
            ]
        }
    ]
}
```

### Delete MLInstances by Engine ID

You can delete all MLInstances sharing the same Engine by performing a DELETE request that includes the Engine ID as a query parameter.

#### API Format

```http
DELETE /mlInstances?engineId={ENGINE_ID}
```

*   `{ENGINE_ID}`: A valid Engine ID.

#### Request

```shell
curl -X DELETE \
    https://platform.adobe.io/data/sensei/mlInstances?engineId={ENGINE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

```json
{
    "title": "Success",
    "status": 200,
    "detail": "MLInstances successfully deleted"
}
```

### Delete an MLInstance

You can delete a single MLInstance by performing a DELETE request that includes the target MLInstance's ID in the request path.

#### API Format

```http
DELETE /mlInstances/{MLINSTANCE_ID}
```

*   `{MLINSTANCE_ID}`: A valid MLInstance ID.

#### Request

```shell
curl -X DELETE \
    https://platform.adobe.io/data/sensei/mlInstances/{MLINSTANCE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

```json
{
    "title": "Success",
    "status": 200,
    "detail": "MLInstance deletion was successful"
}
```

## Experiments

Model development and training occurs at the Experiment level, where an Experiment consists of an MLInstance, training runs, and scoring runs.

### Create an Experiment

You can create an Experiment by performing a POST request while providing a name and a valid MLInstance ID in the request payload.

>   **Note:** Unlike model training in the UI, creating an Experiment through an explicit API call does not automatically create and execute a training run.

#### API Format

```http
POST /experiments
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/experiments \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: application/vnd.adobe.platform.sensei+json;profile=experiment.v1.json' \
    -d '{
        "name": "a name for this Experiment",
        "mlInstanceId": "{MLINSTANCE_ID}"
    }'
```

*   `name`: The desired name for the Experiment. The training run corresponding to this Experiment will inherit this value to be displayed in the UI as the training run name.
*   `mlInstanceId`: A valid MLInstance ID.

#### Response

A successful response returns a payload containing the details of the newly created Experiment including its unique identifier (`id`).

```json
{
    "id": "{EXPERIMENT_ID}",
    "name": "A name for this Experiment",
    "mlInstanceId": "{MLINSTANCE_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "createdByService": false
}
```

### Create and execute a training or scoring run

You can create training or scoring runs by performing a POST request and providing a valid Experiment ID and specifying the run task. Scoring runs can be created only if the Experiment has an existing and successful training run. Successfully creating a training run will initialize the model training procedure and its successful completion will generate a trained model. Generating trained models will replace any previously existing ones such that an Experiment can only utilize a single trained model at any given time.

#### API Format

```http
POST /experiments/{EXPERIMENT_ID}/runs
```

*   `{EXPERIMENT_ID}`: A valid Experiment ID.

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/experiments/{EXPERIMENT_ID}/runs \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: application/vnd.adobe.platform.sensei+json;profile=experimentRun.v1.json' \
    -d '{
        "mode": "{TASK}"
    }'
```

*   `{TASK}`: Specifies the run's task. Set this value as either `train` for training, `score` for scoring, or `fp` for feature pipeline.

#### Response

A successful response returns a payload containing the details of the newly created run including the inherited default training or scoring parameters, and the run's unique ID (`{RUN_ID}`).

```json
{
    "id": "{RUN_ID}",
    "mode": "{TASK}",
    "experimentId": "{EXPERIMENT_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "createdBySchedule": false,
    "tasks": [
        {
            "name": "{TASK}",
            "parameters": [
                {
                    "key": "parameter",
                    "value": "parameter value"
                }
            ]
        }
    ]
}
```

### Retrieve a list of Experiments

You can retrieve a list of Experiments belonging to a particular MLInstance by performing a single GET request and providing a valid MLInstance ID as a query parameter. For a list of available queries, refer to the appendix section on [query parameters for asset retrieval](#appendix-query-parameters-for-asset-retrieval).


#### API Format

```http
GET /experiments
GET /experiments?property=mlInstanceId=={MLINSTANCE_ID}
```

*   `{MLINSTANCE_ID}`: Provide a valid MLInstance ID to retrieve a list of Experiments belonging to that particular MLInstance.

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/experiments?property=mlInstanceId=={MLINSTANCE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a list of Experiments sharing the same MLInstance ID (`{MLINSTANCE_ID}`).

```json
{
    "children": [
        {
            "id": "{EXPERIMENT_ID}",
            "name": "A name for this Experiment",
            "mlInstanceId": "{MLINSTANCE_ID}",
            "created": "2019-01-01T00:00:00.000Z",
            "updated": "2019-01-01T00:00:00.000Z",
            "createdByService": false
        },
        {
            "id": "{EXPERIMENT_ID}",
            "name": "Training Run 1",
            "mlInstanceId": "{MLINSTANCE_ID}",
            "created": "2019-01-01T00:00:00.000Z",
            "updated": "2019-01-01T00:00:00.000Z",
            "createdByService": false
        },
        {
            "id": "{EXPERIMENT_ID}",
            "name": "Training Run 2",
            "mlInstanceId": "{MLINSTANCE_ID}",
            "created": "2019-01-01T00:00:00.000Z",
            "updated": "2019-01-01T00:00:00.000Z",
            "createdByService": false
        }
    ],
    "_page": {
        "property": "deleted==false",
        "count": 3
    }
}
```

### Retrieve a specific Experiment

You can retrieve the details of a specific Experiment by performing a GET request that includes the desired Experiment's ID in the request path.

#### API Format

```http
GET /experiments/{EXPERIMENT_ID}
```

*   `{EXPERIMENT_ID}`: A valid Experiment ID

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/experiments/{EXPERIMENT_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```


#### Response

A successful response returns a payload containing the details of the requested Experiment.

```json
{
    "id": "{EXPERIMENT_ID}",
    "name": "A name for this Experiment",
    "mlInstanceId": "{MLINSTANCE_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z",
    "createdByService": false
}
```

### Retrieve a list of Experiment runs

You can retrieve a list of training or scoring runs belonging to a particular Experiment by performing a single GET request and providing a valid Experiment ID. To help filter results, you can specify query parameters in the request path. For a complete list of available query parameters, see the appendix section on [query parameters for asset retrieval](#appendix-query-parameters-for-asset-retrieval).

>   **Note:** When combining multiple query parameters, they must be separated by ampersands (&).

#### API Format

```http
GET /experiments/{EXPERIMENT_ID}/runs
GET /experiments/{EXPERIMENT_ID}/runs?parameter_1=value_1
GET /experiments/{EXPERIMENT_ID}/runs?parameter_1=value_1&parameter_2=value_2
```

*   `{EXPERIMENT_ID}`: A valid Experiment ID

#### Request

The following request contains a query and retrieves a list of training runs belonging to some Experiment.

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/experiments/{EXPERIMENT_ID}/runs?property=mode==train \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a payload containing a list of runs and each of their details including their Experiment run ID (`{RUN_ID}`).

```json
{
    "children": [
        {
            "id": "{RUN_ID}",
            "mode": "train",
            "experimentId": "{EXPERIMENT_ID}",
            "created": "2019-01-01T00:00:00.000Z",
            "createdBy": {
                "userId": "Jane_Doe@AdobeID"
            },
            "createdBySchedule": false
        }
    ],
    "_page": {
        "property": "mode==train,experimentId=={EXPERIMENT_ID},deleted==false",
        "totalCount": 1,
        "count": 1
    }
}
```

### Update an Experiment

You can update an existing Experiment by overwriting its properties through a PUT request that includes the target Experiment's ID in the request path and providing a JSON payload containing updated properties.

>   **Note:** In order to ensure the success of this PUT request, it is suggested that first you perform a GET request to [retrieve the Experiment by ID](#retrieve-a-specific-experiment). Then, modify and update the returned JSON object and apply the entirety of the modified JSON object as the payload for the PUT request.

The following sample API call will update an Experiments's name while having these properties initially:

```json
{
    "name": "A name for this Experiment",
    "mlInstanceId": "{MLINSTANCE_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "createdByService": false
}
```

#### API Format

```http
PUT /experiments/{EXPERIMENT_ID}
```

*   `{EXPERIMENT_ID}`: A valid Experiment ID

#### Request

```shell
curl -X PUT \
    https://platform.adobe.io/data/sensei/experiments/{EXPERIMENT_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: application/vnd.adobe.platform.sensei+json;profile=experiments.v1.json' \
    -d '{
        "name": "An upated name",
        "mlInstanceId": "{MLINSTANCE_ID}",
        "created": "2019-01-01T00:00:00.000Z",
        "createdBy": {
            "userId": "Jane_Doe@AdobeID"
        },
        "createdByService": false
    }'
```

#### Response

A successful response returns a payload containing the Experiment's updated details.

```json
{
    "id": "{EXPERIMENT_ID}",
    "name": "An updated name",
    "mlInstanceId": "{MLINSTANCE_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-02T00:00:00.000Z",
    "createdByService": false
}
```

### Delete an Experiment

You can delete a single Experiment by performing a DELETE request that includes the target Experiment's ID in the request path.

#### API Format

```http
DELETE /experiments/{EXPERIMENT_ID}
```

*   `{EXPERIMENT_ID}`: A valid Experiment ID

#### Request

```shell
curl -X DELETE \
    https://platform.adobe.io/data/sensei/experiments/{EXPERIMENT_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

```json
{
    "title": "Success",
    "status": 200,
    "detail": "Experiment successfully deleted"
}
```

### Delete Experiments by MLInstance ID

You can delete all Experiments belonging to a particular MLInstance by performing a DELETE request that includes the MLInstance ID as a query parameter.

#### API Format

```http
DELETE /experiments?mlInstanceId={MLINSTANCE_ID}
```

*   `{MLINSTANCE_ID}`: A valid MLInstance ID.

#### Request

```shell
curl -X DELETE \
    https://platform.adobe.io/data/sensei/experiments?mlInstanceId={MLINSTANCE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

```json
{
    "title": "Success",
    "status": 200,
    "detail": "Experiments successfully deleted"
}
```

## MLServices

An MLService is a published trained model that provides your organization with the ability to access and reuse previously developed models. A key feature of MLServices is the ability to automate training and scoring on a scheduled basis. Scheduled training runs can help upkeep a model's efficiency and accuracy, while scheduled scoring runs can ensure that new insights are consistently generated.

Automated training and scoring schedules are defined with a starting timestamp, ending timestamp, and a frequency represented as a <a href="https://en.wikipedia.org/wiki/Cron" target="_blank">cron expression</a>. Schedules can be defined when [creating an MLService](#create-an-mlservice) or applied by [updating an existing MLService](#update-an-mlservice).

### Create an MLService

You can create an MLService by performing a POST request and a payload that provides a name for the service and a valid MLInstance ID. The MLInstance used to create an MLService is not required to have existing training Experiments but you can choose to create the MLService with an existing trained model by providing the corresponding Experiment ID and training run ID.

#### API Format

```http
POST /mlServices
```

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/sensei/mlServices \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: application/vnd.adobe.platform.sensei+json; profile=mlService.v1.json' \
    -d '{
        "name": "A name for this MLService",
        "description": "A description for this MLService",
        "mlInstanceId": "{MLINSTANCE_ID}",
        "trainingDataSetId": "{DATASET_ID}",
        "trainingExperimentId": "{TRAINING_ID}",
        "trainingExperimentRunId": "{RUN_ID}",
        "trainingSchedule": {
            "startTime": "2019-01-01T00:00",
            "endTime": "2019-12-31T00:00",
            "cron": "20 * * * *"
        },
        "scoringSchedule": {
            "startTime": "2019-01-01T00:00",
            "endTime": "2019-12-31T00:00",
            "cron": "20 * * * *"
        }
    }'
```

*   `name`: The desired name for the MLService. The service corresponding to this MLService will inherit this value to be displayed in the Service Gallery UI as the service's name.
*   `description`: An optional description for the MLService. The service corresponding to this MLService will inherit this value to be displayed in Service Gallery UI as the service's description.
*   `mlInstanceId`: A valid MLInstance ID.
*   `trainingDataSetId`: A training dataset ID which if provided will override the MLInstance's default dataset ID. If the MLInstance used to create the MLService does not define a training dataset, you must provide an appropriate training dataset ID.
*   `trainingExperimentId`: An Experiment ID which you can optionally provide. If this value is not provided then creating the MLService will also create a new Experiment using the MLInstance's default configurations.
*   `trainingExperimentRunId`: A training run ID which you can optionally provide. If this value is not provided then creating the MLService will also create and execute a training run using the MLInstance's default training parameters.
*   `trainingSchedule`: A schedule for automated training runs. If this property is defined, then the MLService will automatically perform training runs on a scheduled basis.
*   `trainingSchedule > startTime`: A timestamp for which scheduled training runs will begin.
*   `trainingSchedule > endTime`: A timestamp for which scheduled training runs will end.
*   `trainingSchedule > cron`: A cron expression that defines the frequency of automated training runs.
*   `scoringSchedule`: A schedule for automated scoring runs. If this property is defined, then the MLService will automatically perform scoring runs on a scheduled basis.
*   `scoringSchedule > startTime`: A timestamp for which scheduled scoring runs will begin.
*   `scoringSchedule > endTime`: A timestamp for which scheduled scoring runs will end.
*   `scoringSchedule > cron`: A cron expression that defines the frequency of automated scoring runs.

#### Response

A successful response returns a payload containing the details of the newly created MLService including its unique identifier (`id`), Experiment ID for training (`trainingExperimentId`), Experiment ID for scoring (`scoringExperimentId`), and the input training dataset ID (`trainingDataSetId`).

```json
{
    "id": "{MLSERVICE_ID}",
    "name": "A name for this MLService",
    "description": "A description for this MLService",
    "mlInstanceId": "{MLINSTANCE_ID}",
    "trainingExperimentId": "{TRAINING_ID}",
    "trainingDataSetId": "{DATASET_ID}",
    "scoringExperimentId": "{SCORING_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "trainingSchedule": {
        "startTime": "2019-01-01T00:00",
        "endTime": "2019-12-31T00:00",
        "cron": "20 * * * *"
    },
    "scoringSchedule": {
        "startTime": "2019-01-01T00:00",
        "endTime": "2019-12-31T00:00",
        "cron": "20 * * * *"
    },
    "updated": "2019-01-01T00:00:00.000Z"
}
```

### Retrieve a list of MLServices

You can retrieve a list of MLServices by performing a single GET request. To help filter results, you can specify query parameters in the request path. For a list of available queries, refer to the appendix section on [query parameters for asset retrieval](#appendix-query-parameters-for-asset-retrieval).

#### API Format

```http
GET /mlServices
GET /mlServices?parameter_1=value_1
GET /mlServices?parameter_1=value_1&parameter_2=value_2
```

#### Request

The following request contains a query and retrieves a list of MLServices sharing the same MLInstance ID (`{MLINSTANCE_ID}`).

```shell
curl -X GET \
    'https://platform.adobe.io/data/sensei/mlServices?property=mlInstanceId=={MLINSTANCE_ID}' \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

*   `{MLINSTANCE_ID}`: A valid MLInstance ID.

#### Response

A successful response returns a list of MLServices and their details including their MLService ID (`{MLSERVICE_ID}`), Experiment ID for training (`{TRAINING_ID}`), Experiment ID for scoring (`{SCORING_ID}`), and the input training dataset ID (`{DATASET_ID}`).

```json
{
    "children": [
        {
            "id": "{MLSERVICE_ID}",
            "name": "A service created in UI",
            "mlInstanceId": "{MLINSTANCE_ID}",
            "trainingExperimentId": "{TRAINING_ID}",
            "trainingDataSetId": "{DATASET_ID}",
            "scoringExperimentId": "{SCORING_ID}",
            "created": "2019-01-01T00:00:00.000Z",
            "createdBy": {
                "displayName": "Jane Doe",
                "userId": "Jane_Doe@AdobeID"
            },
            "updated": "2019-01-01T00:00:00.000Z"
        }
    ],
    "_page": {
        "property": "mlInstanceId=={MLINSTANCE_ID},deleted==false",
        "count": 1
    }
}
```

### Retrieve a specific MLService

You can retrieve the details of a specific Experiment by performing a GET request that includes the desired MLService's ID in the request path.

#### API Format

```http
GET /mlServices/{MLSERVICE_ID}
```

*   `{MLSERVICE_ID}`: A valid MLService ID.

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/sensei/mlServices/{MLSERVICE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

A successful response returns a payload containing the details of the requested MLService.

```json
{
    "id": "{MLSERVICE_ID}",
    "name": "A name for this MLService",
    "description": "A description for this MLService",
    "mlInstanceId": "{MLINSTANCE_ID}",
    "trainingExperimentId": "{TRAINING_ID}",
    "trainingDataSetId": "{DATASET_ID}",
    "scoringExperimentId": "{SCORING_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "updated": "2019-01-01T00:00:00.000Z"
}
```

### Update an MLService

You can update an existing MLService by overwriting its properties through a PUT request that includes the target MLService's ID in the request path and providing a JSON payload containing updated properties.

>   **Note:** In order to ensure the success of this PUT request, it is suggested that first you perform a GET request to [retrieve the MLService by ID](#retrieve-a-specific-mlservice). Then, modify and update the returned JSON object and apply the entirety of the modified JSON object as the payload for the PUT request.

#### API Format

```http
PUT /mlServices/{MLSERVICE_ID}
```

*   `{MLSERVICE_ID}`: A valid MLService ID.

#### Request

```shell
curl -X PUT \
    https://platform.adobe.io/data/sensei/mlServices/{MLSERVICE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}' \
    -H 'content-type: application/vnd.adobe.platform.sensei+json; profile=mlService.v1.json' \
    -d '{
        "name": "A name for this MLService",
        "description": "A description for this MLService",
        "mlInstanceId": "{MLINSTANCE_ID}",
        "trainingExperimentId": "{TRAINING_ID}",
        "trainingDataSetId": "{DATASET_ID}",
        "scoringExperimentId": "{SCORING_ID}",
        "trainingSchedule": {
            "startTime": "2019-01-01T00:00",
            "endTime": "2019-12-31T00:00",
            "cron": "20 * * * *"
        },
        "scoringSchedule": {
            "startTime": "2019-01-01T00:00",
            "endTime": "2019-12-31T00:00",
            "cron": "20 * * * *"
        }
    }'
```

#### Response

A successful response returns a payload containing the MLService's updated details.

```json
{
    "id": "{MLSERVICE_ID}",
    "name": "A name for this MLService",
    "description": "A description for this MLService",
    "mlInstanceId": "{MLINSTANCE_ID}",
    "trainingExperimentId": "{TRAINING_ID}",
    "trainingDataSetId": "{DATASET_ID}",
    "scoringExperimentId": "{SCORING_ID}",
    "created": "2019-01-01T00:00:00.000Z",
    "createdBy": {
        "userId": "Jane_Doe@AdobeID"
    },
    "trainingSchedule": {
        "startTime": "2019-01-01T00:00",
        "endTime": "2019-12-31T00:00",
        "cron": "20 * * * *"
    },
    "scoringSchedule": {
        "startTime": "2019-01-01T00:00",
        "endTime": "2019-12-31T00:00",
        "cron": "20 * * * *"
    },
    "updated": "2019-01-02T00:00:00.000Z"
}
```

### Delete an MLService

You can delete a single MLService by performing a DELETE request that includes the target MLService's ID in the request path.

#### API Format

```http
DELETE /mlServices/{MLSERVICE_ID}
```

*   `{MLSERVICE_ID}`: A valid MLService ID

#### Request

```shell
curl -X DELETE \
    https://platform.adobe.io/data/sensei/mlServices/{MLSERVICE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

```json
{
    "title": "Success",
    "status": 200,
    "detail": "MLService deletion was successful"
}
```

### Delete MLServices by MLInstance ID

You can delete all MLServices belonging to a particular MLInstance by performing a DELETE request that specifies an MLInstance ID as a query parameter.

#### API Format

```http
DELETE /mlServices?mlInstanceId={MLINSTANCE_ID}
```

*   `{MLINSTANCE_ID}`: A valid MLInstance ID.

#### Request

```shell
curl -X DELETE \
    https://platform.adobe.io/data/sensei/mlServices?mlInstanceId={MLINSTANCE_ID} \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

```json
{
    "title": "Success",
    "status": 200,
    "detail": "MLServices deletion was successful"
}
```

## Appendix

The following sections provide reference information for various features of the Sensei Machine Learning API.

### Query parameters for asset retrieval

The Sensei Machine Learning API provides support for query parameters with retrieving assets. Available query parameters and their usages are described in the following table:

| Query parameter | Description | Default value |
| --------------- | ----------- | ------- |
| `start` | Indicates the starting index for pagination. | `start=0` |
| `limit` | Indicates the maximum number of results to return. | `limit=25` |
| `orderby` | Indicates the properties to use for sorting in priority order. Include a dash (**-**) before a property name to sort in descending order, otherwise results are sorted in ascending order. | `orderby=created` |
| `property` | Indicates the comparison expression that an object must satisfy in order to be returned. | `property=deleted==false` |

>   **Note:** When combining multiple query parameters, they must be separated by ampersands (**&**).

### Python CPU and GPU configurations

Python Engines have the ability to choose between either a CPU or a GPU for its training or scoring purposes, and is defined on an [MLInstance](#mlinstance) as a task specification (`tasks > specification`).

The following is an example configuration that specifies using a CPU for training and a GPU for scoring:

```json
[
    {
        "name": "train",
        "parameters": [
            {
                "key": "training parameter",
                "value": "parameter value"
            }    
        ],
        "specification": {
            "type": "ContainerTaskSpec",
            "cpus": "1"
        }
    },
    {
        "name": "score",
        "parameters": [
            {
                "key": "scoring parameter",
                "value": "parameter value" 
            }
        ],
        "specification": {
            "type": "ContainerTaskSpec",
            "gpus": "1"
        }
    }
]
```

>   **Note:** The values of `cpus` and `gpus` does not signify the number of CPUs or GPUs, but rather the number of physical machines. These values are permissibly `"1"` and will throw an exception otherwise.

### PySpark and Spark resource configurations

PySpark and Spark Engines have the ability to modify computational resources for training and scoring purposes, these resources are described in the following table:

| Resource | Description | Type |
| -------- | ----------- | ---- |
| driverMemory | Memory for driver in megabytes | int |
| driverCores | Number of cores used by driver | int |
| executorMemory | Memory for executor in megabytes | int |
| executorCores | Number of cores used by executor | int |
| numExecutors | Number of executors | int |

Resources can be specified on an [MLInstance](#mlinstance) as either (A) individual training or scoring parameters, or (B) within an additional specifications object (`specification`). For example, the following resource configurations are the same for both training and scoring:

```json
[
    {
        "name": "train",
        "parameters": [
            {
                "key": "driverMemory",
                "value": "2048"
            },
            {
                "key": "driverCores",
                "value": "1"
            },
            {
                "key": "executorMemory",
                "value": "2048"
            },
            {
                "key": "executorCores",
                "value": "2"
            },
            {
                "key": "numExecutors",
                "value": "3"
            }
        ]
    },
    {
        "name": "score",
        "parameters": [
            {
                "key": "scoring parameter",
                "value": "parameter value"
            }
        ],
        "specification": {
            "type": "SparkTaskSpec",
            "name": "Spark Task name",
            "className": "Class name",
            "driverMemoryInMB": 2048,
            "driverCores": 1,
            "executorMemoryInMB": 2048,
            "executorCores": 2,
            "numExecutors": 3
        }
    }
]
```

<img src="https://i.imgur.com/aIgvaQu.png" alt="back-to-top" width="50" height="50" style="position: fixed; bottom: 30px; float: right; right: 10%; left: 90%; opacity: 0.4; padding-top: 0px; padding-bottom: 0px; border-style: hidden; border-radius: 50%;" onmouseover="this.style.opacity = 0.9;" onmouseout="this.style.opacity = 0.4;" onclick="document.documentElement.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight; document.body.scrollTop = document.getElementsByClassName('udp-header')[0].offsetHeight;">
