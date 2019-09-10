# Publish a Model as a Service in the UI

Adobe Experience Platform Data Science Workspace allows you to publish your trained and evaluated Model as a Service, enabling users within your IMS Organization to score data without the need for creating their own Models.

This tutorial walks through the steps to publish a Model as a Service, and score data using a Service through the *Service Gallery*. It is broken into the following main sections:

-   [Publish a Model](#publish-a-model)
-   [Score using a Service](#access-a-service)

## Getting started

In order to complete this tutorial, you must have access to Experience Platform. If you do not have access to an IMS Organization in Experience Platform, please speak to your system administrator before proceeding.

This tutorial requires an existing Model with a successful training run. If you do not have a publishable Model, follow the [Train and evaluate a Model in the UI](../../train_evaluate_score_a_model/train_and_evaluate_a_model_tutorial/train_and_evaluate_a_model_ui.md) tutorial before continuing.

If you prefer to publish a Model by using Sensei Machine Learning APIs, refer to the [API tutorial](./publish_model_as_service_using_the_api.md).

## Publish a Model

1.  In Adobe Experience Platform, click the **Models** link located in the left navigation column to list all existing Models. Find and click the name of the Model to be published as a Service.
![](./images/ui/1_browse_model.png)
2.  Click **Publish** near the top right of the Model overview page to start a Service creation process.
![](./images/ui/2_view_training_runs.png)
3.  Input a desired name for the Service and optionally provide a Service description, click **Next** when finished.
![](./images/ui/3_configure_service.png)
4.  All successful training runs for to the Model are listed. The new Service will inherit training and scoring configurations from the selected training run. 
![](./images/ui/4_select_training_run.png)
5.  Click **Finish** to create the Service and redirect to the **Services** page showing all available Services, including the newly created Service.
![](./images/ui/all_services.png)

## Score using a Service

1. In Adobe Experience Platform, click the **Services** tab located in the left navigation column to access the *Service Gallery*. Find the Service that you wish to use and click **Score**.
![](./images/ui/click_to_score.png)
2. Select an appropriate input dataset for the scoring run, then click **Next**.
![](./images/ui/6_scoring_input.png)
3. Select an appropriate output dataset for the scoring results, then click **Next**.
![](./images/ui/7_scoring_output.png)
4. When a Service is created, it inherits default scoring configurations. You can review these configurations and adjust them as needed by double-clicking on the values. Once you are satisfied with the configurations, click **Finish** to begin the scoring run.
![](./images/ui/8_scoring_configure.png)

## Next steps

By following this tutorial, you have successfully published a Model as an accessible Service, and scored data using the new Service through the *Service Gallery*. Continue to the next tutorial to learn how you can [schedule automated training and scoring runs on a Service](../scheduling/schedule_models_ui.md).
