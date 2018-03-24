# GDPR Core Service Java Client

## Requirements

Building the API client library requires [Maven](https://maven.apache.org/) to be installed.

## Installation

To install the API client library to your local Maven repository, simply execute:

```shell
mvn install
```

To deploy it to a remote Maven repository instead, configure the settings of the repository and execute:

```shell
mvn deploy
```

Refer to the [official documentation](https://maven.apache.org/plugins/maven-deploy-plugin/usage.html) for more information.

### Maven users

Add this dependency to your project's POM:

```xml
<dependency>
    <groupId>io.swagger</groupId>
    <artifactId>swagger-java-client</artifactId>
    <version>1.0.0</version>
    <scope>compile</scope>
</dependency>
```

### Gradle users

Add this dependency to your project's build file:

```groovy
compile "io.swagger:swagger-java-client:1.0.0"
```

### Others

At first generate the JAR by executing:

    mvn package

Then manually install the following JARs:

* target/swagger-java-client-1.0.0.jar
* target/lib/*.jar

## Getting Started

Please follow the [installation](#installation) instruction and execute the following Java code:

```java

import io.swagger.client.*;
import io.swagger.client.auth.*;
import io.swagger.client.model.*;
import io.swagger.client.api.GDPRCentralServiceApi;

import java.io.File;
import java.util.*;

public class GDPRCentralServiceApiExample {

    public static void main(String[] args) {

        GDPRCentralServiceApi apiInstance = new GDPRCentralServiceApi();
        String jobId = "jobId_example"; // String | jobId
        try {
            ResponseEntity result = apiInstance.deleteRequest_(jobId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling GDPRCentralServiceApi#deleteRequest_");
            e.printStackTrace();
        }
    }
}

```

## Documentation for API Endpoints

All URIs are relative to *https://platform.adobe.io*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*GDPRCentralServiceApi* | [**deleteRequest_**](docs/GDPRCentralServiceApi.md#deleteRequest_) | **DELETE** /data/privacy/gdpr/{jobId} | Not in Use : : Request for deleting GDPR jobId
*GDPRCentralServiceApi* | [**getStatus**](docs/GDPRCentralServiceApi.md#getStatus) | **GET** /data/privacy/gdpr/{jobId} | Retrieve details of JobId specified in request
*GDPRCentralServiceApi* | [**getStatusAll**](docs/GDPRCentralServiceApi.md#getStatusAll) | **GET** /data/privacy/gdpr | Retrieve details of all JobId&#39;s for a specific UserId/Logged in Users id
*GDPRCentralServiceApi* | [**performDataOperation**](docs/GDPRCentralServiceApi.md#performDataOperation) | **POST** /data/privacy/gdpr | Access or Delete GDPR service requests
*GDPRCentralServiceHealthCheckApi* | [**saySomething**](docs/GDPRCentralServiceHealthCheckApi.md#saySomething) | **GET** /data/privacy/gdpr/ping | Access or Delete GDPR service requests


## Documentation for Models

 - [ACompanyContextModel](docs/ACompanyContextModel.md)
 - [AGDPRRequestModel](docs/AGDPRRequestModel.md)
 - [AModelForUsers](docs/AModelForUsers.md)
 - [ErrorResponse](docs/ErrorResponse.md)
 - [ProblemDetail](docs/ProblemDetail.md)
 - [ResponseEntity](docs/ResponseEntity.md)
 - [Something](docs/Something.md)
 - [UserId](docs/UserId.md)


## Documentation for Authorization

All endpoints do not require authorization.
Authentication schemes defined for the API:

## Recommendation

It's recommended to create an instance of `ApiClient` per thread in a multithreaded environment to avoid any potential issues.

## Author

[Jeff Hanson](mailto:jefhanso@adobe.com)
