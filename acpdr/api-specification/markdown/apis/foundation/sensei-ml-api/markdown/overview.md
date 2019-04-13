# Sensei ML Core API (Work In Progress)


<a name="overview"></a>
## Overview
<<< WORK IN PROGRESS >>>

This API provides a mechanism for Data Scientists to organize and manage ML services from algortithm onboarding through experimentation and to service deployment.

Please see the terminology established on this wiki: https://wiki.corp.adobe.com/pages/viewpage.action?pageId=1384647158


### Version information
*Version* : draft-06


### License information
*Terms of service* : https://www.adobe.com/legal/terms.html


### URI scheme
*Host* : platform.adobe.io  
*Schemes* : HTTPS


### Tags

* Engine : The Sensei Engine is an umbrella entity holding all MLInstances. This is tied to one or more docker images built to include the Sensei Code of a ML developer.
* Experiment : A data scientist conducts multiple experiments to arrive at a high performing model while training. This can include changing datasets, changing features, changing learning parameters and hardware.
* Home : The root of the Sensei API providing endpoint discoverability.
* MLInstance : The entity representing the combination of a Sensei Engine with Sensei Configuration, which is often use-case specific for a customer or client.
* Model : This API allows to register a ML model (model artifact that is created by the training process)
* Service (Not Supported) : The Service Configuration entity for hosting Published Models. Not currently supported.



