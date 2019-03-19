---
layout: default
---

# Link

Link in a message.
## Properties

`object`


###  id
`string` _Required_




###  description
`string` 

A human-friendly description of the URL.


###  url
`string` _Required_




###  occurrence
`integer` _Required_

URL occurrence index in the content (first is 1).
When the same URL is available several times in the same content, its is
necessary to track which occurrence of the URL has been clicked on.



###  tags
`string`[] 

A list of tags qualifying the link.
The URL category is one of those tags.




