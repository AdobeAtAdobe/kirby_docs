# Sandbox user guide

Adobe Experience Platform provides virtual sandboxes that partition a single Platform instance into separate, isolated  virtual environments. This document provides steps for performing various tasks related to sandboxes within the [Experience Platform user interface](https://platform.adobe.com). For steps on performing different operations using the Sandbox API, see the [sandbox developer guide](sandbox-developer-guide.md). For a high-level overview of sandboxes in Experience Platform, please refer to the [overview documentation](sandboxes-overview.md).

The following tasks are covered:
- [View sandboxes](#view-sandboxes)
- [Switch between sandboxes](#switch-between-sandboxes)
- [Create a new sandbox](#create-a-new-sandbox)

## View sandboxes

In the Experience Platform UI, click **Sandboxes** in the left-navigation to open the _Sandboxes_ dashboard. The dashboard lists all available sandboxes for your organization, including the sandbox type (production or development) and state (active, creating, deleted, or failed).

![](images/sandboxes-tab.png)

## Switch between sandboxes

The **sandbox switcher** control at the top-left of the screen displays the currently active sandbox.

![](images/sandbox-selector.png)

To switch between sandboxes, click the sandbox switcher and select the desired sandbox from the dropdown list.

![](images/switch-sandbox.png)

Once a sandbox is selected, the screen refreshes with the selected sandbox now featured in the sandbox switcher.

![](images/sandbox-switched.png)

## Create a new sandbox

To create a new sandbox in the UI, click **Sandboxes** in the left-nav, then click **Create Sandbox**.

![](images/create-sandbox-button.png)

The _Create Sandbox_ dialog appears, prompting you to provide a display title and name for the sandbox. The **display title** is meant to be human-readable and should be descriptive enough to be easily identifiable. The sandbox **name** is an all-lowercase identifier for use in API calls, and should therefore be unique and concise.

When finished, click **Create**.

![](images/create-sandbox-dialog.png)

> **Note**: Since you are restricted to creating non-production sandbox types only, the **type** option is locked at "Non-Production" and cannot be manipulated.

Once you have finished creating the sandbox, refresh the page and the new sandbox appears in the _Sandboxes_ dashboard with a status of "Creating". New sandboxes take approximately 15 minutes to be provisioned by the system, after which their status changes to "Active".

![](images/sandbox-created.png)

## Next steps

This document demonstrated how to manage sandboxes within the Experience Platform UI. For information on how to manage sandboxes using the Sandbox API, see the [sandbox developer guide](sandbox-developer-guide.md).