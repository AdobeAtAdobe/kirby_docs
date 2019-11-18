# Access control and sandboxes troubleshooting guide

This document provides answers to frequently asked questions about access control and sandboxes in Adobe Experience Platform. For questions and troubleshooting related to other Platform services, please refer to the [Experience Platform troubleshooting guide](../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md).

Experience Platform leverages product profiles in the [Adobe Admin Console](http://adminconsole.adobe.com) to provide role-based **access control**, linking users with permissions and sandboxes. **Sandboxes** partition a single Platform instance into separate virtual environments to help develop and evolve digital experience applications. See the [access control overview](../access-control/access-control-overview.md) and [sandboxes overview](sandboxes-overview.md) for more information.

### Access control

- [Where can I find my current access permissions?](#where-can-i-find-my-current-access-permissions)
- [Some features in the Platform UI are not available. How is access to these features controlled by permissions?](#some-features-in-the-platform-ui-are-not-available-how-is-access-to-these-features-controlled-by-permissions)
- [How are permissions grouped, and which group contains the permission I want to use?](#how-are-permissions-grouped--and-which-group-contains-the-permission-i-want-to-use)
- [I just created a sandbox. How do I set permissions for the users who will be working with this sandbox?](#i-just-created-a-sandbox-how-do-i-set-permissions-for-the-users-who-will-be-working-with-this-sandbox)
- [What are Sandbox Administration permissions?](#what-are-sandbox-administration-permissions)

### Sandboxes

- [What is a sandbox?](#what-is-a-sandbox)
- [What types of sandboxes are available, and what are their differences?](#what-types-of-sandboxes-are-available--and-what-are-their-differences)
- [Can I access a resource from more than one sandbox?](#can-i-access-a-resource-from-more-than-one-sandbox)
- [How many production sandboxes can I have?](#how-many-production-sandboxes-can-i-have)
- [How many non-production sandboxes can I have?](#how-many-non-production-sandboxes-can-i-have)

## Where can I find my current access permissions?

If you are a system administrator, product administrator, or product-profile administrator for your IMS Organization, you can view your assigned product profile and the permissions it provides within the Adobe Admin Console. See the [access control user guide](../access-control/access-control-user-guide.md) for instructions on how to navigate the Admin Console to view a product profile's permissions.

If you are not an administrator, you can still view your current access permissions by sending a request to the `/acl/effective-policies` endpoint in the Access Control API. See the "View effective policies" section in [access control developer guide](../access-control/access-control-developer-guide.md#view-effective-policies) for more information.

## Some features in the Platform UI are not available. How is access to these features controlled by permissions?

If you do not have access permissions for a particular Platform feature, that feature will be hidden or greyed-out in the Experience Platform UI. For example, in order to view the "Profiles" tab, you must have either the "View Profiles" or "Manage Profiles" permissions. Contact your administrator if you require additional permissions for Experience Platform capabilities.

## How are permissions grouped, and which group contains the permission I want to use?

Permissions are grouped and categorized by the Platform capabilities they apply to (such as Data Management and Profile Management). For a full list of available permissions and the groups they belong to, see the [permissions section](../access-control/access-control-overview.md#permissions) in the access control overview.

## I just created a sandbox. How do I set permissions for the users who will be working with this sandbox?

The Adobe Admin Console links users to sandboxes and permissions through the use of **product profiles**. After creating a new sandbox, navigate to the _Permissions_ tab of the product profile you wish to grant access to, then click **Sandboxes**. From here, you can add or remove access to the new sandbox in the same manner as other permissions.

If you wish to add unique permissions to users of a particular sandbox, you may need to create a new product profile with the appropriate sandboxes and permissions applied, and assign those users to that profile.

See the [access control user guide](../access-control/access-control-user-guide.md) for more information on managing sandboxes and permissions in the Admin Console.

## What are Sandbox Administration permissions?

Sandbox Administration permissions grant access to view, create, reset, and/or delete sandboxes belonging to your IMS Organization.

While Sandbox Administration permissions allow you to view your organization's sandboxes, they do not grant access to the resources contained within those sandboxes. Conversely, being granted access to a specific sandbox does not entitle you to reset or delete that sandbox (unless you have also been granted appropriate Sandbox Administration permissions).

See the [access control overview](../access-control/access-control-overview.md) for more information on available permissions. For steps on how to manage permissions in the Admin Console, see the [access control user guide](../access-control/access-control-user-guide.md).

## What is a sandbox?

Sandboxes are virtual partitions within a single instance of Experience Platform. Each sandbox maintains its own independent library of Platform resources (including schemas, datasets, profiles, and so on). All content and actions taken within a sandbox are confined to only that sandbox and do not affect any other sandboxes. See the [sandboxes overview](sandboxes-overview.md) for more information.

## What types of sandboxes are available, and what are their differences?

There are two sandbox types available in Experience Platform:

* Production sandbox
* Non-production sandbox

Experience Platform provides a single **production sandbox**, which cannot be deleted or reset. Only one production sandbox can exist for a single Platform instance.

By contrast, multiple **non-production sandboxes** can be created by sandbox administrators for a single Platform instance. Non-production sandboxes allow you to test features, run experiments, and make custom configurations without impacting your production sandbox. In addition, non-production sandboxes have a reset feature that removes all customer-created resources from the sandbox. Non-production sandboxes cannot be converted to production sandboxes.

See the [sandboxes overview](sandboxes-overview.md) for more information.

## Can I access a resource from more than one sandbox?

Sandboxes are isolated partitions of a single Platform instance, with each sandbox maintaining its own independent library of resources. A resource that exists in one sandbox cannot be accessed from any other sandbox, regardless of sandbox type (production or non-production).

## How many production sandboxes can I have?

Experience Platform only supports one production sandbox per IMS Organization, which is provided out-of-the-box. While the production sandbox can be renamed, it cannot be deleted or reset. Users with Sandbox Administration permissions can only create, reset, and delete non-production sandboxes.

## How many non-production sandboxes can I have?

Experience Platform currently allows up to 15 non-production sandboxes to be active within a single IMS Organization.