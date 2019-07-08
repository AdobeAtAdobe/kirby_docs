# Score a Model in the UI <!-- omit in toc -->

Scoring in Adobe Experience Platform Data Science Workspace can be achieved by feeding input data into an existing trained Model. Scoring results are then stored and viewable in a specified output dataset as a new batch. 

This tutorial demonstrates the steps required to score a Model in the Data Science Workspace user interface:
- [Create a new scoring run](#create-a-new-scoring-run)
- [View scoring results](#view-scoring-results)

## Getting started

In order to complete this tutorial, you must have access to Experience Platform. If you do not have access to an IMS Organization in Experience Platform, please speak to your system administrator before proceeding.

This tutorial requires a trained Model. If you do not have a trained Model, follow the [train and evaluate a Model in the UI](../train_and_evaluate_a_model_tutorial/train_and_evaluate_a_model_ui.md) tutorial before continuing.

## Create a new scoring run

A scoring run is created using optimized configurations from a previously completed and evaluated training run. The set of optimal configurations for a Model are typically determined by reviewing training run evaluation metrics.

1. Find the most optimal training run to use its configurations for scoring. Open the desired Training run by clicking on its name.

2. From the Training Run **Evaluation** tab, click on the **Score** button on the top right of the screen. This will initiate a new **Run Scoring** workflow.
![](images/ui/training_run_overview.png)

3. Select the input scoring dataset and click **Next**.
![](images/ui/scoring_input.png)

4. Select the output scoring dataset, this is the dedicated output dataset where the scoring results are stored. Confirm your selection and click **Next**.
![](images/ui/scoring_results.png)

5. The final step in the workflow prompts you to configure your scoring run. These configurations are used by the Model for the scoring run.
Note that you will not be able to remove inherited parameters that were set during the Model creation. You can edit or revert non-inherited parameters by double clicking the value or clicking on the revert icon while hovering over the entry. 
![](images/ui/configuration.png) 
Review and confirm the scoring configurations and click **Finish**  to create and execute the scoring run. You will be directed to the **Scoring Runs** tab and the new scoring run will show a status.
![](images/ui/scoring_runs_tab.png)
A scoring run will display either of the four following statuses: Pending, Complete, Failed, or Running, and are updated automatically. Proceed to the next step if the status is either "Completed" or "Failed".

## View scoring results

1. Find the training run that was used for the scoring run, and click on the name to view its **Evaluation** page.

2. Near the top of the training run evaluation page, click the **Scoring Runs** tab to view a listing of existing scoring runs. Click on the scoring listing to view its details in the right column.
![](./images/ui/view_details.png)

3. If the selected scoring run has a status of either "Complete" or "Failed", the **View Activity Logs** link found in the right column will be active. Click on the link to view or download the execution logs. If a scoring run had failed, the execution logs can provide useful information in determining the reason for failure.
![](images/ui/activity_logs.png)

4. Click on **Preview Scoring Results Dataset** link found in the right column. You will be able to see a preview of the output dataset from the scoring run.
![](images/ui/preview_results.png)

5. For the complete set of scoring results, click on the **Scoring Results Dataset** link found in the right column.

## Next steps

This tutorial walked you through the steps to score data using a trained Model in Data Science Workspace. Follow the tutorial on [publishing a Model as a Service in the UI](../../operationalize_a_model/publish_model_as_a_service/publish_model_as_service_ui.md) to allow users within your organization to score data by providing easy access to a machine learning Service.
