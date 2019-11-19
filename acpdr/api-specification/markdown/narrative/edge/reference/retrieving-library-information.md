---
description: >-
  Learn how to retrieve information about the library loaded onto the website.
---

# Retrieving Library Information

It's often helpful to access some of the details behind the library you have loaded onto your website. To do this, execute the `getLibraryInfo` command as follows:

```js
alloy("getLibraryInfo").then(function(libraryInfo) {
  console.log(libraryInfo.version);
});
```

Currently, the provided `libraryInfo` object contains the following properties:

* `version` This is the version of the loaded library. For example, if the version of the library being loaded were 1.0.0, the value would be `1.0.0`.
