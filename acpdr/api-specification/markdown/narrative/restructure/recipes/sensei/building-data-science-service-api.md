# Building an Experiment Using the Sensei API

## Create Project

`POST /projects`

> TODO: What is a project? In what ways are projects used? By what components/behavior? See them in the UI?.. 

### Prerequisites

Will require the following elements:

* Git repo
* Docker image
* Algorithm ? "neural-nets"
* Language ? "Python"
* ML Lib ? "tensorflow"

### Code Samples

**Create Project**

`POST /projects`

**Sample Request**

```
{
    "name": "Stock Image Tagging",
    "version": "1.0",
    "git_repo": "https://git.corp.adobe.com/adobesearch/stocktagging",
    "docker_image": "docker-sensei-snapshot.dr-uw2.adobeitc.com/image-tagging-cas_shell:1.0.0",
    "algorithm": "neural-nets",
    "language": "Python",
    "ml_lib": "tensorflow",
    "tags": [
        "cnn",
        "tensorflow",
        "stock",
        "image tagging"
    ]
}
```

**Sample Response**

`project_id = 78486f37-a3cc-421e-aa62-2d7ee1f0a843`

## Create Tenant

`POST /tenants`

> What is a tenant? What all things are grouped by a tenant? How would a DS use a tenant? Conceptual positioning, use,...

### Prerequisites

### Code Samples

**Create Tenant**

`POST /tenants`

**Sample Request**

```
{
  "name": "Stock",
  "version": "1.0"
}
```

**Sample Response**

`tenant_id = a069462f-fe2e-42de-8a7e-6d26d0628547`

## Create Dataset

`POST /tenants/{tenant_id}/datasets`

### Prerequisites
> Based on Tenant ID
> Service call requires tenant as an attribute as well

### Code Samples

**Create Dataset**

`POST /tenants/{tenant_id}/datasets`

**Sample Request**

```
{
  "name": "stock tagged images",
  "version": "1.0",
  "tenant": "a069462f-fe2e-42de-8a7e-6d26d0628547",
  "spec": {
    "source": "S3",
    "url": "s3://adobestock/input/tagged_images/",
    "authRole": "arn:aws:iam::035347861496:role/stocksenseiS3"
  },
  "tags": [
    "tagged",
    "images"
  ]
}
```

**Sample Response**

`dataset_id = fda2e032-d8a7-4e94-a0ba-c78babec0f99`

## Create Analyzer

`POST /projects/{projectId}/tenants/{tenantId}/analyzers`

> TODO: ? What is res_type, and what do the notes above even mean?
> More info: https://wiki.corp.adobe.com/display/AdobeCloudPlatform/Sensei+analyzer+creation+use+cases+and+internals

### Prerequisites
Will require the following elements:

* `git_repo`: project.git_repo
* `docker_image`: project.docker_image
* `datasets.input.id`: dataset_id
* `datasets.input.ref_expr`: if dataset_id is not specified, then resolve the dataset from completed task. Expression format = @[task_name].output["output_name"]. e.g. @["preprocess"].output["preprocessed_output"]
* `datasets.input.disk_size`: if provided, data will be provided locally to the container.
* `datasets.input.res_type`: dataset
* `datasets.output.name`: output will be expected at this folder inside the container
* `datasets.output.disk_size`: upper limit on expected output size. Needed to attach a disk of mentioned size.

### Code Samples

**Create Analyzer**

`POST /projects/{projectId}/tenants/{tenantId}/analyzers`

**Sample Request**

```
{
    "name": "Stock tagging analyzer",
    "version": "1.0.0",
    "git_repo": "https://git.corp.adobe.com/adobesearch/stocktagging",
    "docker_image": "docker-sensei-snapshot.dr-uw2.adobeitc.com/image-tagging-cas_shell:1.0.0",
    "description": "This will train an image tagging model over 10 million stock images.",
    "tags": [
        "image",
        "tagging"
    ],
    "analyzer_spec": {
        "tasks": [{
                "name": "preprocess",
                "analyzer_task_params": [{
                        "key": "filter_type",
                        "value": "bicubic"
                    },
                    {
                        "key": "resize_algorithm",
                        "value": "lanczos_resampling"
                    }
                ],
                "analyzer_task_spec": {
                    "cmd": "/app/sensei/preprocess.py",
                    "local_input_dir": "...",
                    "local_output_dir": "...",
                    "splunk_index": "...",
                    "memory": "4000",
                    "instances": 10,
                    "gpus": 4,
                    "cpus": 4,
                    "disk_size": 20000
                },
                "datasets": {
                    "inputs": [{
                        "name": "image_tagging_data",
                        "id": "fda2e032-d8a7-4e94-a0ba-c78babec0f99",
                        "ref_expr": "string",
                        "disk_size": 15000,
                        "res_type": "Dataset"
                    }],
                    "outputs": [{
                        "name": "processed_image_data",
                        "disk_size": 10000,
                        "restype": "Dataset"
                    }]
                }
            },
            {
                "name": "train",
                "analyzer_task_params": [{
                        "key": "learning_rate",
                        "value": "0.2"
                    },
                    {
                        "key": "activation_function",
                        "value": "tanh"
                    }
                ],
                "analyzer_task_spec": {
                    "cmd": "/app/sensei/train.py",
                    "local_input_dir": "...",
                    "local_output_dir": "...",
                    "splunk_index": "...",
                    "memory": "2000",
                    "instances": 1,
                    "gpus": 8,
                    "cpus": 4,
                    "disk_size": 30000
                },
                "datasets": {
                    "inputs": [{
                        "name": "processed_image_data",
                        "ref_expr": "@['preprocess'].output['processed_image_data']",
                        "disk_size": 10000,
                        "res_type": "Dataset"
                    }],
                    "outputs": [{
                            "name": "training_stats",
                            "disk_size": 10,
                            "restype": "generic"
                        },
                        {
                            "name": "model",
                            "disk_size": 3000,
                            "restype": "model"
                        }
                    ]
                }
            }
        ]
    }
}
```

**Sample Response**

`analyzer_id = 5ac7bfcf-6a6e-4c2a-b4a4-f1f38ce6147c`

## Create Experiment

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments`

It is used to save the experiment metadata, tags, description. 

### Prerequisites

### Code Samples

**Create Experiment**

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments`

**Sample Request**

```
{
  "name": "Experimenting with learning rate",
  "version": "1.0",
  "description": "string",
  "tags": [
    "learning_rate = 0.2"
  ]
}
```

**Sample Response**

`experiment_id = fbee8398-b4a6-4a8d-b3c9-4e7aea319aea`

## Create Experiment Run

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments/{experimentId}/runs`

> Operates in one of modes: preprocess/train/validate
tasks.analyzer_task_spec: defaults inherited from analyzer_spec. User can override.
? Get example returns from the different modes: preprocess, train, validate
? Where are tags used? (re: API example on End 2 End Flow, Create Experiment Run request JSON). Where are the tags used? Best Practices

### Prerequisites

### Code Samples

**Create Experiment Run**

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments/{experimentId}/runs`

**Sample Request - Preprocess Mode**

```
{
    "mode": "preprocess",
    "description": "stock image tagging preprocess task run",
    "tags": [
        "stock",
        "preprocess"
    ],
    "tasks": [{
                "name": "preprocess",
                "analyzer_task_params": [{
                        "key": "filter_type",
                        "value": "bicubic"
                    },
                    {
                        "key": "resize_algorithm",
                        "value": "lanczos_resampling"
                    }
                ],
                "analyzer_task_spec": {
                    "cmd": "/app/sensei/preprocess.py",
                    "local_input_dir": "...",
                    "local_output_dir": "...",
                    "splunk_index": "...",
                    "memory": "4000",
                    "instances": 10,
                    "gpus": 4,
                    "cpus": 4,
                    "disk_size": 20000
                },
                "datasets": {
                    "inputs": [{
                        "name": "image_tagging_data",
                        "id": "fda2e032-d8a7-4e94-a0ba-c78babec0f99",
                        "ref_expr": "string",
                        "disk_size": 15000,
                        "res_type": "Dataset"
                    }],
                    "outputs": [{
                        "name": "processed_image_data",
                        "disk_size": 10000,
                        "restype": "Dataset"
                    }]
                }
            }]
}
```

**Sample Request - Train Mode**

```
{
    "mode": "train",
    "description": "stock image tagging training task run",
    "tags": [
        "stock",
        "training"
    ],
    "tasks": [{
                "name": "train",
                "analyzer_task_params": [{
                        "key": "learning_rate",
                        "value": "0.2"
                    },
                    {
                        "key": "activation_function",
                        "value": "tanh"
                    }
                ],
                "analyzer_task_spec": {
                    "cmd": "/app/sensei/train.py",
                    "local_input_dir": "...",
                    "local_output_dir": "...",
                    "splunk_index": "...",
                    "memory": "2000",
                    "instances": 1,
                    "gpus": 8,
                    "cpus": 4,
                    "disk_size": 30000
                },
                "datasets": {
                    "inputs": [{
                        "name": "processed_image_data",
                        "ref_expr": "@723ab5e4-a923-463c-a6c2-77539e9a21a1.output['processed_image_data']",         // refers to preprocess run id
                        "disk_size": 10000,
                        "res_type": "Dataset"
                    }],
                    "outputs": [{
                            "name": "training_stats",
                            "disk_size": 10,
                            "restype": "generic"
                        },
                        {
                            "name": "model",
                            "disk_size": 3000,
                            "restype": "model"
                        }
                    ]
                }
            }]
}
```

**Sample Response**

`run_id = 723ab5e4-a923-463c-a6c2-77539e9a21a1`

## Get Experiment Run Status

`GET /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments/{experimentId}/runs/{runId}`

> Running experiments is asynchronous... Gotta be checking in... Exceptions to this, and things to consider

### Prerequisites

### Code Samples

**Get Experiment Run Status**

`GET /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments/{experimentId}/runs/{runId}`

**Sample Response**

```
{
    "id": "77d56a8b-5186-4f35-96d7-23509714589a",
    "name": "train",
    "description": "stock image tagging training task run",
    "tags": [
        "stock",
        "training"
    ],
    "spec": {
        "analyzer_context": {
            "tasks": [{
                "name": "train",
                "analyzer_task_params": [{
                        "key": "learning_rate",
                        "value": "0.2"
                    },
                    {
                        "key": "activation_function",
                        "value": "tanh"
                    }
                ],
                "analyzer_task_spec": {
                    "cmd": "/app/sensei/train.py",
                    "local_input_dir": "...",
                    "local_output_dir": "...",
                    "splunk_index": "...",
                    "memory": "2000",
                    "instances": 1,
                    "gpus": 8,
                    "cpus": 4,
                    "disk_size": 30000
                },
                "datasets": {
                    "inputs": [{
                        "name": "processed_image_data",
                        "ref_expr": "@723ab5e4-a923-463c-a6c2-77539e9a21a1.output['processed_image_data']",         // refers to preprocess run id
                        "disk_size": 10000,
                        "res_type": "Dataset"
                    }],
                    "outputs": [{
                            "name": "training_stats",
                            "disk_size": 10,
                            "restype": "generic"
                        },
                        {
                            "name": "model",
                            "disk_size": 3000,
                            "restype": "model"
                        }
                    ]
                }
            }]
        },
        "task_status": [{
            "task_id": "string",
            "task_name": "string",
            "state": "RUNNING",
            "status": "SUCCESS",
            "logs": "string",
            "started": "string",
            "ended": "string",
            "outputs": [{
                            "name": "training_stats",
                            "path": "s3://adobesensei/{project_id}/{tenant_id}/{analyzer_id}/{experiment_id}/{run_id}/outputs/training_stats/"
                            "restype": "generic"
                        },
                        {
                            "name": "model",
                            "path": "s3://adobesensei/{project_id}/{tenant_id}/{analyzer_id}/{experiment_id}/{run_id}/outputs/model/",
                            "restype": "model"
                        }]
        }]
    }
}
```


## Publish Model

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments/{experimentId}/models`

> ? what does it mean to publish a model

### Prerequisites

### Code Samples

**Publish Model**

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/experiments/{experimentId}/models`

**Sample Request**

```
{
  "name": "stock model",
  "version": "1.0",
  "refExpr": "@77d56a8b-5186-4f35-96d7-23509714589a['model']",
  "description": "stock model trained on 10 million images",
  "tags": [
    "stock",
    "1.0",
    "10 million"
  ]
}
```

**Note**: `refExpr`: expression syntax = `@task_id["output_name"]`. Task id & output_name is enough to find out the autogenerated s3 path of model
        

## Create Experiment Template

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/ExperimentTemplates?experimentRunId={experiment_run_id}`

> Create a template of the configuration described by project/tenant/analyzer/run

### Prerequisites

### Code Samples

**Create Experiment Template**

`POST /projects/{projectId}/tenants/{tenantId}/analyzers/{analyzerId}/ExperimentTemplates?experimentRunId={experiment_run_id}`

**Sample Response**

```
{
  "id": "976279bb-4b6a-4abf-bb4d-d9e3ca298b8a",
  "name": "stock experiment template",
  "description": "template created from training task",
  "docker_image": "docker-sensei-snapshot.dr-uw2.adobeitc.com/image-tagging-cas_shell:1.0.0",
  "spec": {
    "tasks": [{
                "name": "train",
                "analyzer_task_params": [{
                        "key": "learning_rate",
                        "value": "0.2"
                    },
                    {
                        "key": "activation_function",
                        "value": "tanh"
                    }
                ],
                "analyzer_task_spec": {
                    "cmd": "/app/sensei/train.py",
                    "local_input_dir": "...",
                    "local_output_dir": "...",
                    "splunk_index": "...",
                    "memory": "2000",
                    "instances": 1,
                    "gpus": 8,
                    "cpus": 4,
                    "disk_size": 30000
                },
                "datasets": {
                    "inputs": [{
                        "name": "processed_image_data",
                        "ref_expr": "@723ab5e4-a923-463c-a6c2-77539e9a21a1.output['processed_image_data']",         // refers to preprocess run id
                        "disk_size": 10000,
                        "res_type": "Dataset"
                    }],
                    "outputs": [{
                            "name": "training_stats",
                            "disk_size": 10,
                            "restype": "generic"
                        },
                        {
                            "name": "model",
                            "disk_size": 3000,
                            "restype": "model"
                        }
                    ]
                }
            }]
  }
}

```