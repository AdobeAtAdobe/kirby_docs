# Sandboxes in Adobe Experience Platform

Adobe Experience Platform is built to enrich digital experience applications on a global scale. Companies often run multiple digital experience applications in parallel and need to cater for the development, testing, and deployment of these applications while ensuring operational compliance. 

In order to address this need, Experience Platform provides **sandboxes** which partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications.

This document provides a high-level overview of sandboxes in Experience Platform, and covers the following topics:

* [Understanding sandboxes](#understanding-sandboxes)
* [Access control for sandboxes](#access-control-for-sandboxes)
* [Sandboxes in the Experience Platform UI](#managing-sandboxes-in-the-experience-platform-ui)
* [Sandboxes in Experience Platform APIs](#sandboxes-in-experience-platform-apis)

## Understanding sandboxes

Sandboxes are virtual partitions within a single instance of Experience Platform, which allow for seamless and cost-effective integration with the development process of your digital experience applications. An Experience Platform instance supports one production sandbox and multiple non-production sandboxes, with each sandbox maintaining its own independent library of Platform resources (including schemas, datasets, profiles, and so on).  All content and actions taken within a sandbox are confined to only that sandbox and do not affect any other sandboxes.

Non-production sandboxes allow you to test features, run experiments, and make custom configurations without impacting your production sandbox. In addition, non-production sandboxes have a reset feature that removes all customer-created resources from the sandbox. Non-production sandboxes cannot be converted to production sandboxes.

> **Note:** When a sandbox is first created, it does not contain any data. Since each sandbox maintains its own isolated data store, they must also ingest their data independently.

In summary, sandboxes provide the following benefits:

* **Application lifecycle management**: Create separate virtual environments to develop and evolve digital experience applications.
* **Project and brand management**: Allow multiple projects to run in parallel within the same IMS Org, while providing isolation and access control. Future releases will provide support for deploying in multiple regions.
* **Flexible development ecosystem**: Provide sandboxes in a seamless, scalable, and cost-effective way for exploration, enablement, and demonstration purposes.

## Access control for sandboxes

By default, all users for an organization have access to a production sandbox. Access to non-production sandboxes must be granted by a system administrator, product administrator, or product profile administrator through the [Adobe Admin Console](https://adminconsole.adobe.com).

In order to view, create, update, or delete non-production sandboxes, users must also be granted Sandbox Administration permissions.

For more information on managing roles and permissions for sandboxes, see the [access control overview](../access-control/access-control-overview.md).

## Sandboxes in the Experience Platform UI

In the [Experience Platform user interface](https://platform.adobe.com), users can switch between the sandboxes they have access to by using the **sandbox switcher** control on the top-left of the screen.  Users with Sandbox Administration privileges also have access to the **Sandboxes** tab in the left-navigation, where they can view and manage sandboxes for their organization. For more information on how to work with sandboxes in the UI, see the [sandbox user guide](sandbox-user-guide.md).

## Sandboxes in Experience Platform APIs

When making calls to Experience Platform APIs, a sandbox name must be supplied under the header `x-sandbox-name`. For example, when making a call to the [Catalog Service API](../../../../../../acpdr/swagger-specs/schema-registry.yaml) to view all datasets within the Production sandbox, the sandbox's name ("prod") is provided as a header in the API request:

```shell
curl -X GET \
  https://platform.adobe.io/data/foundation/catalog/datasets \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: prod'
```

If `x-sandbox-name` is not included in an API call, the system will use a default sandbox instead. However, the best practice is to always include this header in all API calls, even when using the default sandbox. For this reason, the API documentation for Experience Platform treats `x-sandbox-name` as a required header.

### Sandbox API

The Sandbox API allows you to manage sandboxes by using RESTful API operations. See the [Sandbox API developer guide](sandbox_developer_guide.md) for detailed information on how to use the API, including properly formatted requests and example responses.

## Next steps

By reading this document, you have been introduced to the essential concepts about sandboxes in Experience Platform. For detailed steps on how to manage sandboxes, see the [user guide](sandbox-user-guid.md) for the UI or the [developer guide](sandbox_developer_guide.md) for the API.

While sandboxes serve as a valuable tool for isolating Platform environments for your development team, you can also manage more granular access control by using the Adobe Admin Console. See the [access control overview](../access-control/access-control-overview.md) for more information.