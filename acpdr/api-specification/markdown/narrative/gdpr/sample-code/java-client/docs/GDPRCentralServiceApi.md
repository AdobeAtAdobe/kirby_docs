# GDPRCentralServiceApi

All URIs are relative to *https://platform.adobe.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteRequest_**](GDPRCentralServiceApi.md#deleteRequest_) | **DELETE** /data/privacy/gdpr/{jobId} | Not in Use : : Request for deleting GDPR jobId
[**getStatus**](GDPRCentralServiceApi.md#getStatus) | **GET** /data/privacy/gdpr/{jobId} | Retrieve details of JobId specified in request
[**getStatusAll**](GDPRCentralServiceApi.md#getStatusAll) | **GET** /data/privacy/gdpr | Retrieve details of all JobId&#39;s for a specific UserId/Logged in Users id
[**performDataOperation**](GDPRCentralServiceApi.md#performDataOperation) | **POST** /data/privacy/gdpr | Access or Delete GDPR service requests


<a name="deleteRequest_"></a>
# **deleteRequest_**
> ResponseEntity deleteRequest_(jobId)

Not in Use : : Request for deleting GDPR jobId

Not In Use : Delete GDPR request for specified jobId

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.GDPRCentralServiceApi;


GDPRCentralServiceApi apiInstance = new GDPRCentralServiceApi();
String jobId = "jobId_example"; // String | jobId
try {
    ResponseEntity result = apiInstance.deleteRequest_(jobId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling GDPRCentralServiceApi#deleteRequest_");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **jobId** | **String**| jobId |

### Return type

[**ResponseEntity**](ResponseEntity.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getStatus"></a>
# **getStatus**
> AGDPRRequestModel getStatus(jobId)

Retrieve details of JobId specified in request



### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.GDPRCentralServiceApi;


GDPRCentralServiceApi apiInstance = new GDPRCentralServiceApi();
String jobId = "jobId_example"; // String | jobId
try {
    AGDPRRequestModel result = apiInstance.getStatus(jobId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling GDPRCentralServiceApi#getStatus");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **jobId** | **String**| jobId |

### Return type

[**AGDPRRequestModel**](AGDPRRequestModel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="getStatusAll"></a>
# **getStatusAll**
> AGDPRRequestModel getStatusAll()

Retrieve details of all JobId&#39;s for a specific UserId/Logged in Users id



### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.GDPRCentralServiceApi;


GDPRCentralServiceApi apiInstance = new GDPRCentralServiceApi();
try {
    AGDPRRequestModel result = apiInstance.getStatusAll();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling GDPRCentralServiceApi#getStatusAll");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**AGDPRRequestModel**](AGDPRRequestModel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="performDataOperation"></a>
# **performDataOperation**
> List&lt;AGDPRRequestModel&gt; performDataOperation(body)

Access or Delete GDPR service requests

An authenticated user can submit requests for Access or delete of their privacy data

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.GDPRCentralServiceApi;


GDPRCentralServiceApi apiInstance = new GDPRCentralServiceApi();
AGDPRRequestModel body = new AGDPRRequestModel(); // AGDPRRequestModel |
try {
    List<AGDPRRequestModel> result = apiInstance.performDataOperation(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling GDPRCentralServiceApi#performDataOperation");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AGDPRRequestModel**](AGDPRRequestModel.md)|  | [optional]

### Return type

[**List&lt;AGDPRRequestModel&gt;**](AGDPRRequestModel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined
