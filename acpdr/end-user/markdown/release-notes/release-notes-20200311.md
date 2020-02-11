---

title: Adobe Experience Platform Release Notes
description: Experience Platform release notes March 11, 2020
doc-type: release notes
last-update: February 11, 2020
author: ens71067

---

# Adobe Experience Platform release notes 
## Release date: March 11, 2020

New features in Adobe Experience Platform:
* [Access control](#access-control)
* [Sandboxes](#sandboxes)

## Access control

Experience Platform leverages [Adobe Admin Console](https://adminconsole.adobe.com) product profiles to link users with permissions and sandboxes. Permissions control access to a variety of Platform capabilities, including data modeling, profile management, and sandbox administration.

### Key features

Feature | Description
--- | ---
Permissions | In the Admin Console, the _Permissions_ tab within a Platform product profile allows you customize which Platform capabilities are available for the users attached to that profile. Available permission categories include: <br><ul><li>Data Modeling</li><li>Data Management</li><li>Profile Management</li><li>Identities</li><li>Data Monitoring</li><li>Sandbox Administration</li><li>Destinations</li><li>Sources</li></ul>
Access to sandboxes | The _Permissions_ tab within a Platform product profile can grant its users access to specific sandboxes. See the section on [sandboxes](#sandboxes) below for more information.

For more information, please see the [access control overview](../../../api-specification/markdown/narrative/technical_overview/access-control/access-control-overview.md).

## Sandboxes

Experience Platform is built to enrich digital experience applications on a global scale. Companies often run multiple digital experience applications in parallel and need to cater for the development, testing, and deployment of these applications while ensuring operational compliance.

In order to address this need, Experience Platform provides sandboxes which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

### Key features

Feature | Description
--- | ---
Production sandbox | Experience Platform provides a single production sandbox, which cannot be deleted or reset.
Non-production sandboxes | Multiple non-production sandboxes can be created for a single Platform instance, allowing you to test features, run experiments, and make custom configurations without impacting your production sandbox.
Sandbox switcher | In the Experience Platform user interface, the sandbox switcher in the top-left corner of the screen allows you to switch between available sandboxes through a dropdown menu.
`x-sandbox-name` header | All calls to Experience Platform APIs must now include the new `x-sandbox-name` header, whose value references the `name` attribute of the sandbox the operation will take place in.

For more information, please see the [sandboxes overview](../../../api-specification/markdown/narrative/technical_overview/sandboxes/sandboxes-overview.md).