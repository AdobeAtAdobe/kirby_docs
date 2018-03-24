# GDPRCentralServiceHealthCheckApi

All URIs are relative to *https://platform.adobe.io*

Method | HTTP request | Description
------------- | ------------- | -------------
[**saySomething**](GDPRCentralServiceHealthCheckApi.md#saySomething) | **GET** /data/privacy/gdpr/ping | Access or Delete GDPR service requests


<a name="saySomething"></a>
# **saySomething**
> Something saySomething(status)

Access or Delete GDPR service requests

The message is read from the properties

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.GDPRCentralServiceHealthCheckApi;


GDPRCentralServiceHealthCheckApi apiInstance = new GDPRCentralServiceHealthCheckApi();
Integer status = 56; // Integer |
try {
    Something result = apiInstance.saySomething(status);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling GDPRCentralServiceHealthCheckApi#saySomething");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | **Integer**|  |

### Return type

[**Something**](Something.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined
