# Real-time Customer Profile search developer guide

The Profile search is used to search and index configurable fields contained across various data sources and return them in near real-time. 

This developer guide provides information to help you better understand Profile search and includes sample API calls for performing basic actions using the API. In this guide, you will find information on:

- [Getting search results](#get-search-results)
- [Creating provisioning requests](#create-provisioning-requests)
- [Handling configuration requests](#handle-configuration-requests)
  - [Creating a configuration request](#create-a-configuration-request)
  - [Deleting a configuration request](#delete-a-configuration-request)

## Getting started

This guide requires a working understanding of the various Adobe Experience Platform services involved with using Profile search.

- [Real-time Customer Profile][rtcp]: Provides a unified consumer profile in real-time based on aggregated data from multiple sources.
- [Segmentation][segmentation]: Provides the ability to create segments and audiences from your Real-time Customer Profile data.
- [Experience Data Model (XDM)][xdm]: The standardized framework by which Platform organizes customer data.

The following sections provide additional information that you will need to know in order to successfully use Profile search using the API.

### Reading sample API calls

This guide provides example API calls to demonstrate how to format your requests. These include paths, required headers, and properly formatted request payloads. Sample JSON returned in API responses is also provided. For information on the conventions used in this documentation for sample API calls, see the section on [how to read example API calls][read-api-calls] in the Experience Platform troubleshooting guide.

### Gather values for required headers

In order to make calls to Experience Platform APIs, you must first complete the [authentication tutorial][auth-tutorial]. Completing the authentication tutorial provides the values for each of the required headers in all Platform API calls, as shown below:

- Authorization: `Bearer {ACCESS_TOKEN}`
- x-api-key: `{API_KEY}`
- x-gw-ims-org-id: `{IMS_ORG}`

All resources in Experience Platform are isolated to specific virtual sandboxes. All requests to Platform APIs require a header that specifies the name of the sandbox in which the operation will take place:

- x-sandbox-name: `{SANDBOX_NAME}`

> **Note:** For more information on working with sandboxes in Experience Platform, see the [sandboxes overview documentation][sandboxes].

## Sample API Calls

Now that you understand what headers to use, you are ready to begin making calls to the Profile search API. The following sections walk through the most common API calls you will make using Profile search. Each call includes the general API format, a sample request showing required headers, and a sample response.

### Get search results

The search endpoint can be used to get search results based on the values of the `schema.name` parameter.

#### API Format

```http
GET /search?schema.name={SCHEMA_NAME}
```

- `{SCHEMA_NAME}`: **Required.** The name of the schema containing the content to be searched, written in dot-notation format. Currently, only `_xdm.context.segmentdefinition` is supported.

You can also include any of the following request parameters to further refine your search:

- `limit`: Optional. The number of search results to return. The default value is 50.
- `page`: Optional. The page number used for paginating results of the query searched.
- `s`: Optional. A query that conforms to Microsoft's implementation of [Lucene's search syntax][lucene]. If no search term is specified, then all records associated with `schema.name` will be returned. A more detailed explanation about the search parameter can be [found below](#search-parameter).
- `namespace`: Optional. Identifies the actual data to search on the schema class specified in the `schema.name` parameter. 
- `organization.type`: Optional. Determines the content of the response from calling the API request. The format of the content returned is dependent on the values used in `schema.name`. For `_xdm.context.segmentdefinition`, the valid values are `hierarchy, hierarchyinfo`.
- `organization.id`: Optional, but required **if** `organization.type` is specified. Gives the hierarchy of the specified organization when used with the `organization.type` of hierarchy. 

#### Request

```shell
curl -X GET \
    https://platform.adobe.io/data/core/ups/search?schema.name=_xdm.context.segmentdefinition \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'Content-Type: application/json' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' \
    -H 'x-sandbox-name: {SANDBOX_NAME}'
```

#### Response

Upon successful invocation, the server returns an array of objects that meet your search criteria. So, in this example, since the `schema.name` parameter was `_xdm.context.segmentdefinition` in the request, a list of segment definitions will be returned.

```json
{
  "aam-hierarchy": {
    "_xdm.context.segmentdefinition": [
      {
        "isFolder": true,
        "id": "100023",
        "name": "EbayFolder99970152100023",
        "description": "",
        "parentFolderId": "99970"
      },
      {
        "isFolder": false,
        "id": "1000028",
        "name": "SegmentName Ebaysoap driven whose parent id is 103584, at FolderLevel 1, with Segment Doc Number 16",
        "description": "Description Ebaysaddle count teacher crowd sometime food apartment seems frame fast, in Folder Id 103584, at level 1, for segmentDocNumber 16",
        "parentFolderId": "103584"
      }
    ]
  },
  "page": {
    "totalCount": 2,
    "totalPages": 1,
    "pageOffset": "1",
    "pageSize": 2,
    "limit": 2
  }
}
```

### Create provisioning requests

You can create provisioning requests to enable Profile search on schemas by making a POST request to the `/search/provisioning/component/init` endpoint.

#### Request

```shell
curl -X POST \
    https://platform.adobe.io/data/core/ups/search/provisioning/component/init \
    -H 'Authorization: Bearer {ACCESS_TOKEN}' \
    -H 'x-api-key: {API_KEY}' \
    -H 'x-gw-ims-org-id: {IMS_ORG}' 
```

>**Note:** This POST request does **not** have any payload, and therefore does **not** require a Content-Type header. In addition, there is **no** Sandbox header because all the data is sent into a global sandbox.

#### Response

Upon a successful invocation, the server responds with HTTP status 201 (Created) and the following message:

```plaintext
The request has been fulfilled and resulted in a new resource being created.
```

### Handle configuration requests

The configuration endpoint can be used to set up the proper indexes, indexers, and data source connections for a new IMS Organization. Two properties are required in order to handle configuration requests: database name and container name.

Database name represents the name of the Profile database for the organization that will be configured.

Container name represents the name of the container populated by a data connector, which is what is read during configuration. Currently, the only valid container names are as follows:
- `_xdm.content.segmentdefinition`
- `_experience.audiencemanager.segmentfolder`

### Create a configuration request

The following API call generates the required data source, indexer, and index based on the parameters supplied in the request payload.

#### API format

```http
POST /search/configure
```

#### Request

```shell
curl -X POST \
  https://platform.adobe.io/data/core/ups/search/configure \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "databaseName": {DATABASE_NAME},
    "containerName": "_xdm.context.segmentdefinition" "_experience.audiencemanager.segmentfolder"
  }'
```

#### Response

Upon a successful invocation, the server responds with HTTP status 202 (Accepted) and the following message.

```plaintext
The request has been accepted for processing, but the processing has not been completed.
```

### Delete a configuration request

The following API call removes matching index entries, and deletes the indexer and data source based on the parameters supplied in the request payload. The index itself will **not** be deleted, as it is a shared resource.

#### API format

```http
DELETE /search/configure
```

#### Request

```shell
curl -X DELETE \
  https://platform.adobe.io/data/core/ups/search/configure \
  -H 'Authorization: Bearer {ACCESS_TOKEN}' \
  -H 'x-api-key: {API_KEY}' \
  -H 'x-gw-ims-org-id: {IMS_ORG}' \
  -H 'x-sandbox-name: {SANDBOX_NAME}' \
  -d '{
    "databaseName": {DATABASE_NAME},
    "containerName": "_xdm.context.segmentdefinition" "_experience.audiencemanager.segmentfolder"
  }'
```

#### Response

Upon a successful invocation, the server responds with HTTP status 202 (Accepted) and the following message.

```plaintext
The request has been accepted for processing, but the processing has not been completed.
```

## Next steps

Now that you understand how the search API works, you now will have a better understanding on how to use Real-time Customer Profile and Segmentation. For more information on Real-time Customer Profile, please read the [Real-time Customer Profile overview][rtcp]. For more information on Segmentation, please read the [Segmentation overview][segmentation].

## Appendix

### Search parameter

The following table lists the specifics of how the search parameter works when using the search API. 

Search Query | Description
------------ | -----------
cat | Search for any word. This will return results if the word "cat" is found in any of the searchable fields.
cat AND dog | A Boolean search. This will return results if **both** the words "cat" and "dog" are found in any of the searchable fields.
cat OR dog | A Boolean search. This will return results if **either** the word "cat" or the word "dog" are found in any of the searchable fields.
cat NOT dog | A Boolean search. This will return results if the word "cat" is found but the word "dog" is not found in any of the searchable fields.
name: cat AND dog | A Boolean search. This will return results if **both** the words "cat" and "dog" are found in the field named "name".
run* | A wildcard search. Using the `*` character matches 0 or more characters, meaning it will return results if the content of any of the searchable fields contains a word that starts with "run". So, for example, this will return results if the words "runs", "running", "runner", or "runt" appear.  
cam? | A wildcard search. Using the `?` character matches only exactly one character, meaning it will return results if the content of any of the searchable fields starts with "cam" and an additional letter. So, for example, this will return results if the words "camp" or "cams" appear, but will not return results if the words "camera" or "campfire" appear.
"British Columbia" | A phrase search. This will return results if the contents of any of the searchable fields contains the full phrase "British Columbia".
blue\~ | A fuzzy search. Optionally, you can put a number between 0-2 after the tilde (\~) to specify the edit distance. For example, "blue\~1" would be return "blue", "blues", or "glue". **Note:** Fuzzy search can **only** be applied to terms, not phrases. However, you can append tildes to the end of each word in a phrase. So, for example, "University\~ of\~ British\~ Columbia\~" would match on "University of British Columbia".
"hotel airport"\~5 | A proximity search. This type of search is used to find terms that are near to each other in a document. For example, the phrase `"hotel airport"~5` will find the terms "hotel" and "airport" within 5 words of each other in a document.
`/a[0-9]+b$/` | A regular expression search. This type of search finds a match based on the contents between forward slashes "/", as documented in the RegExp class. For example, to find documents containing "motel" or "hotel", specify /[mh]otel/. Regular expression searches are matched against single words.

For more detailed documentation about the query syntax, please read the [Lucene query syntax documentation][lucene].

[xdm]: ../schema_registry/xdm_system/xdm_system_in_experience_platform.md
[rtcp]: ../unified_profile_architectural_overview/unified_profile_architectural_overview.md
[segmentation]: ../../segmentation/segmentation-overview.md
[read-api-calls]: ../platform_faq_and_troubleshooting/platform_faq_and_troubleshooting.md#how-do-i-format-an-api-request
[auth-tutorial]: ../../tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md
[sandboxes]: ../sandboxes/sandboxes-overview.md
[lucene]: https://docs.microsoft.com/en-us/azure/search/query-lucene-syntax