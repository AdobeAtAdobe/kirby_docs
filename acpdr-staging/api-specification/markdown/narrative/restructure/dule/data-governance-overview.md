# Data Governance Overview and DULE

Data governance encompasses the strategies and technologies used to apply policies and control access to data, track changes to datasets, and to ensure data usage is in compliance with regulations, contract terms, and corporate policies.

Data governance plays a key role in the Adobe Cloud Platform (ACP) at various levels, ranging from security, encryption, data usage labeling and enforcement, monitoring, and so forth. In this document we will take a deeper look at data usage labeling and enforcement within ACP.

## DULE

One of the key differentiators for ACP is that powerful and extensible data governance functionalities are deeply embedded within data processing mechanisms throughout the platform. These functionalities are embodied within a data governance framework known as "DULE" (Data Usage Labeling and Enforcement). DULE is a set of functionalities for applying specific labels (meta-data) to data to identify privacy or contract-related restrictions.

The main functionalities of DULE are:

* Data Usage Labeling
 - Allows users to label data based on their governance and compliance needs.
* Data Access Policies and Enforcement
 - Allows users to set data usage policies for enforcement

Currently, within DULE, there are three types of data to which labels can be applied, each with a fixed set of values. The currently supported types of data are:

* Contractual Data:  This is data that is governed by customary contract-based restrictions
* Identity Data: This data falls in two categories:
 1.  Directly Identifiable Data (e.g. email, phone, name)
 2. Indirectly Identifiable Data (e.g. IP address, MCID, Loyalty Card #)
* Sensitivity Data: Data that refers to geolocations (e.g. GPS-based data)
