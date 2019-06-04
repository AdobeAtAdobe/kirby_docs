# Adobe Cloud Platform Documentation Repository

Documentation related to APIs exposed by the Adobe Cloud Platform. This includes API Specifications, technical documentation, tutorials, and end-user guides

For any question around the APIs provided here, please reach out to [Grp-Platform-API](mailto:Grp-Platform-API@adobe.com?subject=Experience+API+Question). We are here to help.

For more information about the Adobe Cloud Platform API initiative refer to [the APIs Wiki](https://wiki.corp.adobe.com/display/DMSArchitecture/APIs).

## URL to view Documentation

[Swagger](https://git.corp.adobe.com/pages/experience-platform/api-specification)

[HTML - TODO]()

## Markdown Documentation

All narrative and end user documentation are written in Markdown. 

## Automated API Specification Markdown Generation Details

Swagger specs are converted to Markdown formatted documentation by the [swagger2markup maven plugin](https://github.com/Swagger2Markup/swagger2markup-maven-plugin) via an automated process controlled by the [api-specification](https://git.corp.adobe.com/experience-platform/api-specification) repository. Please see the Jenkinsfile and template poms located in the [/jenkins](https://git.corp.adobe.com/experience-platform/api-specification/tree/master/jenkins) directory within this repository for more details.

The build process is managed via the [swagger-markdown-pipeline job](https://mcdpv2.ci.corp.adobe.com:12001/job/platform-docs/job/swagger-markdown-pipeline) on the [mcdpv2](https://mcdpv2.ci.corp.adobe.com:12001) Jenkins instance. The job runs upon every push to this external repo and also on a cron schedule (hourly) to pickup any changes that occur upon relevant swagger specs outside of the repo.

*IMPORTANT*

The [/api-specification/markdown/apis](https://git.corp.adobe.com/experience-platform/documentation/tree/master/api-specification/markdown/apis) contains the generated Markdown documentation, and this directory is entirely managed by the automated build process. Any changes made within this directory will be lost upon the next build. Plan to place any related markdown documentation starting one-level up, under the [/api-specification/markdown](https://git.corp.adobe.com/experience-platform/documentation/tree/master/api-specification/markdown) directory.

## End User Documentation

End User documentation can be found in the [end-user/markdown](https://git.corp.adobe.com/experience-platform/documentation/tree/master/end-user/markdown) directory. Please place all end user documentation here.