# Real-time Customer Profile user guide

Real-time Customer Profile creates a holistic view of each of your individual customers, combining data from multiple channels including online, offline, CRM, and third-party data.

This document serves as a guide for interacting with Real-time Customer Profile in the Adobe Experience Platform user interface. The following topics are covered:

* [Profile overview](#profile-overview)
* [View profile samples](#view-profile-samples)
    * [Profile search](#profile-search)
    * [Profile Viewer](#profile-viewer)
* [View merge policies](#merge-policies)
* [View union schemas](#union-schema)

## Getting started

This user guide requires an understanding of the various Experience Platform services involved with managing Real-time Customer Profile. Before reading this user guide, please review the documentation for the following services:

* [Real-time Customer Profile](unified_profile_architectural_overview.md): Provides a unified, real-time consumer profile based on aggregated data from multiple sources.
* [Identity Service](../identity_services_architectural_overview/identity_services_architectural_overview.md): Enables Real-time Customer Profile by bridging identities from disparate data sources being ingested into Platform.
* [Experience Data Model (XDM)](../schema_registry/xdm_system/xdm_system_in_experience_platform.md): The standardized framework by which Platform organizes customer experience data.

## Profile overview

In the [Experience Platform UI](http://platform.adobe.com), click **Profiles** in the left navigation to open the _Overview_ tab in the _Profiles_ workspace. This tab displays several widgets that provide high-level information about the Profile store, including the total addressable audience, the number of Profile records that were ingested within the last week, as well as statistics regarding successful and failed records for the same time period.

![](images/profile-overview.png)

## View profile samples

Click **Samples** to view a sample list of available profiles. Each listed profile displays its ID, first name, last name, and personal email. Clicking the ID of a listed profile displays its details within the [Profile Viewer](#profile-viewer).

![](images/profile-samples.png)

You can customize the attributes that are displayed in the list by clicking the column selector icon. This displays a dropdown list containing common profile attributes which you can add or remove.

![](images/column-selector.png)

### Profile search

If you know a linked identity for a particular profile (such as its email address), you can look up that profile by clicking **Find a profile**. This is the most reliable way to access a specific profile, regardless of whether it appears in the list of samples.

![](images/find-a-profile.png)

In the dialog that appears, select an appropriate ID namespace from the dropdown list ("Email" in this example) and enter the ID value below before clicking **OK**.

<img src='images/find-a-profile-details.png' width=450><br>

If found, the details of the targeted profile appear in the Profile Viewer, as described in the next section.

### Profile Viewer

Upon selecting or searching for a specific profile, the _Detail_ screen of the Profile Viewer opens. This page displays information about the selected profile, such as the profile's basic attributes, linked identities, and available contact channels.

![](images/profile-viewer-detail.png)

The Profile Viewer also provides tabs that allow you to view Experience Events and segment memberships associated with this profile, if any exist.

![](images/profile-viewer-events-seg.png)

## Merge policies

Click **Merge Policies** to view a list of merge policies belonging to your organization. Each listed policy displays its name, whether or not it is the default merge policy, and the schema that it applies to.

![](images/profile-merge-policies.png)

For more information on working with merge policies in the UI, see the [merge policy tutorial](../../tutorials/merge_policies/create-merge-policies.md).

## Union schema

Click **Union Schema** to view the union schemas for your profile data store. A union schema is an amalgamation of all Experience Data Model (XDM) fields under the same class, whose schemas have been enabled for use in Real-time Customer Profile. Click a class in the left-hand list to view the structure of its union schema in the canvas.

![](images/profile-union-schema.png)

See the [section on union schemas](../schema_registry/schema_composition/schema_composition.md#union) in the schema composition guide for more information on union schemas and their role in Real-time Customer Profile.

## Next steps

By reading this guide, you now know how to view and manage your profile data in the Experience Platform UI. For information on how to leverage Real-time Customer Profile to generate audience segments in the UI, see the [Segment Builder user guide](../segmentation/segment-builder-guide.md).