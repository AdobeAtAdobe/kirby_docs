# Unified Profile Service APIs

Unified Profile provides mechanisms for ingesting, deleting and accessing profiles, and for working with profile segments from creating, previewing, and estimating segments to exporting segment audiences to datasets that can be used throughout Adobe Experience Platform.

## Terminology

Term | Definition
--- | ---
**Audience** | The collection of profiles that meet the segment definition criteria
**Predicate** | A Predicate is the object encapsulation of a query written in PQL. Also referred to as __Segment Definition__
**Profile** | An object following the standard XDM Profile schema representing the profile data of a user
**Segmentation** | Dividing a large group of customers, prospects, or consumers (Profiles) into smaller groups that share similar traits and will respond similarly to marketing strategies
**Segment** | Also **Definition**. The rule set defining how to subdivide a customer base, such as 'Men over 50'. Once conceptualized, segments are then defined in terms of the conditions that must be met to qualify for a segment


## The Unified Profile APIs

Name | Description
--- | ---
**[Profile Configuration API](../../../../../../acpdr/swagger-specs/profile-config-api.yaml)** | Work with Merge Policies which control the way Unified Profile Service merges Profile fragments across datasets
**[Profile Access API](../../../../../../acpdr/swagger-specs/profile-access.yaml)** | Get a Unified Profile, or paginated list of ExperienceEvents for a given ID and Namespace
**[Profile Export API](../../../../../../acpdr/swagger-specs/profile-export-api.yaml)** | Export audience members to a dataset which can be used throughout Adobe Experience Platform
**[Profile Preview API](../../../../../../acpdr/swagger-specs/profile-preview-api.yaml)** | Sessionless summary view of the audience membership of a given PQL Predicate Expression
**[Profile Segment Definitions API](../../../../../../acpdr/swagger-specs/profile-segment-definitions-api.yaml)** | Build a query that describes a subset of your user base, based on attributes of Profiles or time series events
**[Profile Segment Jobs API](../../../../../../acpdr/swagger-specs/profile-segment-jobs-api.yaml)** | Apply an existing Segment Definition to your user base and build a dataset representing members of your segment accessible to all Adobe Experience Platform capabilities

## Find out more about Unified Profile

[Unified Profile overview](../../../narrative/technical_overview/unified_profile_architectural_overview/unified_profile_architectural_overview.md)  

## Tutorials

[Configuring Unified Profile via API](../../../narrative/tutorials/activating_up_tutorial/activating_up_tutorial.md)  
[Adding data to Unified Profile](../../../narrative/tutorials/adding_data_to_unified_profile/adding_data_to_unified_profile.md)  
[Accessing Unified Profile data](../../../narrative/tutorials/consuming_unified_profile_data/consuming_unified_profile_data.md)  
[Configuring a dataset for Unified Profile and Identity Service via API](../../../narrative/tutorials/unified_profile_dataset_tutorial/unified_profile_dataset_tutorial.md)  
[Creating segments in Experience Platform](../../../narrative/tutorials/creating_a_segment_tutorial/creating_a_segment_tutorial.md)