# Experience Data Model: Field Dictionary

Experience Data Model (XDM) defines a set of standard fields that can be used when composing schemas for use in Adobe Experience Platform. These XDM field types contain specific definitions that provide consistency in behavior for any fields sharing the same XDM field type.

See [Basics of Schema Composition](schema_composition.md) for more information about the building blocks of schemas, including principles and best practices in defining schemas.

> **Note:** If a field is marked "**DEPRECATED**", it means that it should no longer be used in new implementations. The field continues to be available for backwards compatibility, but will no longer be supported in future releases.

---

|Field Name|Type|Format|XDM Type|Title|Description|
|----------|----|------|--------|-----|-----------|
|xdm:COGS|number||number|Cost of Goods Sold|Cost of Goods Sold. In the `currencyCode` currency.|
|xdm:POIDetail|context/poi-detail|||POI Detail|Detail of the POI that cause the event.|
|xdm:POIID|string||string|POI Identity|The unique identifier of the POI.|
|xdm:POIinteraction|context/poi-interaction|||POI Interaction|The Point of Interest(POI) interaction details.|
|xdm:SKU|string||string|SKU|Stock Keeping Unit, the unique identifier for a product defined by the vendor.|
|xdm:URL|string||string|URL|The referrer URL.|
|xdm:acceptLanguage|string||string|Accept Language|An IETF Language Tag (RFC 5646).|
|xdm:activePOIs|array||array|POI Detail|Details of the POIs that cause the event.|
|xdm:activeWindow|boolean||boolean|Active Window|Indicates whether ad was shown on active window on users' device.|
|xdm:adAssetReference|context/advertising-timed-asset-reference|||Ad Asset Reference|Asset information about the ad captured by the experience event.|
|xdm:adAssetViewDetails|context/advertising-timed-asset-view-details|||Ad Asset View Details|View details for the ad playback captured by the experience event.|
|xdm:adBreak|context/advertising-break|||Ad Break|Details about how a timed advertising is being inserted into a timed media.|
|xdm:adHeight|integer||int|Ad Height|The number of vertical pixels of the player, measured at runtime. This can be larger than the size of the ad if the player has extra controls or thumbnails.|
|xdm:adLoadType|string||string|Ad Load Type|The type of ad loaded as defined by each customer's internal representation.|
|xdm:adUnitDepth|integer||int|Ad Unit Depth|Publishers may embed ad units inside containers/iFrames in order limit the ad's access solely to the code of the page. This describes how many 'containers' or iFrames the ad unit is displayed inside of.|
|xdm:adViewability|context/adviewability|||MRC Viewability|The runtime measured viewability specific details such as player volume, library version, window status, viewport/ad measured dimensions, etc.|
|xdm:adWidth|integer||int|Ad Width|The number of horizontal pixels of the player, measured at runtime. This can be larger than the size of the ad if the player has extra controls or thumbnails.|
|xdm:address|common/address|||Address|The physical address of the location.|
|xdm:advertising|context/advertising|||Advertising|The information related to advertising activity related to the experience event|
|xdm:application|channels/application|||Application|Application registered to receive Push Notifications.|
|xdm:applicationCloses|data/measure||||Graceful termination(s) of an application.|
|xdm:beaconInteractionDetails|context/beacon-interaction-details|||Beacon Interaction Details|Beacon details active for the POI interaction.|
|xdm:beaconMajor|number||number|Beacon Major|The first sub organization identifier of an area multiple beacon operate in.|
|xdm:beaconMinor|number||number|Beacon Minor|The second sub organization identifier of an area multiple beacon operate in. The smallest area a beacon can refine location to.|
|xdm:billingPeriod|string||string|Billing Period|The duration between billings.|
|xdm:billingStartDate|string|date|date|Billing Start Date|The date when the first bill is due.|
|xdm:birthDay|integer||byte|Birth day|The day of the month a person was born (1-31).|
|xdm:birthMonth|integer||byte|Birth month|The month of the year a person was born (1-12).|
|xdm:birthYear|integer||short|Birth year|The year a person was born including the century (yyyy, e.g 1983).|
|xdm:bitrateAverage|data/measure|||Average Bitrate|A weighted average of all bitrate values related to the play duration that occurred during a playback session.|
|xdm:bitrateChanges|data/measure|||Bitrate Changes|The number of bitrate change events that occurred during a playback session.|
|xdm:bounces|data/measure||||Asynchronous message(s) that have been returned as temporarily undeliverable the receiving system.|
|xdm:brand|string||string|Brand|Brand of the Master/Variant products.|
|xdm:broadcastChannel|string||string|Distribution Channel|Distribution channel from where the content was played.|
|xdm:broadcastContentType|string||string|Broadcast Content Type|The type of the stream delivery.|
|xdm:broadcastNetwork|string||string|Broadcast Network|The programmer network name.|
|xdm:browserDetails|context/browserdetails|||Browser Details|The browser specific details such as browser name, version, javascript version, user agent string, accept language.|
|xdm:bufferTime|data/measure|||Total Buffer Duration|Describes the total amount of time (in seconds) spent buffering.|
|xdm:buffers|data/measure|||Buffers|The number of buffer states that occurred during a playback session.|
|xdm:carrier|string||string|Mobile Network Carrier|A mobile network carrier or MNO, also known as a wireless service provider, wireless carrier, cellular company, or mobile network carrier, is a provider of services wireless communications that owns or controls all the elements necessary to sell and deliver services to an end user.|
|xdm:cartAbandons|data/measure||||A product list has been identified as no longer accessible (e.g purchasable) by the user.|
|xdm:category|string||string|Category|The main, top level categorization of this type of subscription.|
|xdm:ceiling|number||number|Ceiling|The maximum elevation of the shape. Only valid when used in combination with `elevation`. This value conforms to the [WGS84](http://gisgeography.com/wgs84-world-geodetic-system/) datum and is measured in meters. This value is not part of the schema.org spec. In combination with `elevation`, this property can be used to express a three-dimensional bounding box for a location.|
|xdm:channel|channels/channel|||Communication Channel|Channels for communicating with customers or users.|
|xdm:chapterAssetReference|context/media-timed-chapter-asset-reference|||Chapter Asset Reference|Asset information about the chapter captured by the experience event.|
|xdm:chapterAssetViewDetails|context/media-timed-chapter-view-details|||Chapter View Details|View details for the chapter playback captured by the experience event.|
|xdm:chargeMethod|string||string|Charge Method|The way the billing is setup to charge the customer.|
|xdm:checkouts|data/measure||||An action during a checkout process of a product list, there can be more than one checkout event if there are multiple steps in a checkout process. If there are multiple steps the event time information and referenced page or experience is used to identify the step individual events represent in order.|
|xdm:city|string||string|City|The name of the city.|
|xdm:clicks|data/measure||||Click(s) actions on a message.|
|xdm:code|string||string|Code|The description of the discountValue attribute. e.g percentage, currency, 3for2 etc. Can be enumerated, custom values allowed.|
|xdm:colorDepth|integer||int|Color Depth|The number of bits used for each color component of a single pixel.|
|xdm:commerce|context/commerce|||Commerce|The commerce specific data related to this interaction.|
|xdm:completes|data/measure|||Completes|Indicates if a timed media asset was watched to completion - this does not necessarily mean the viewer watched the whole video; viewer could have skipped ahead.|
|xdm:condition||||Condition|The minimum amount of items or price for the discount to qualify|
|xdm:connectionType|string||string|Connection Type|Internet connection type.|
|xdm:containedInPlace|string|uri|string|Contained by Location|XDM URI of another `Place` that this place is contained in.This property is based on `schema:containedInPlace`, but is using URI references instead of embedding the containing place.|
|xdm:containsPlaces|array||array|Contains Locations|An array of XDM URIs of other `Place` instances that this place is containing.This property is based on `schema:containsPlace`, but is using URI references instead of embedding the containing place. In addition, it is an array, allowing one place to include multiple other places.|
|xdm:contractID|string||string|Contract ID|Unique ID for the contract that governs this subscription.|
|xdm:conversions|data/measure||||A customer pre-defined action(s) which triggers an event for performance evaluation.|
|xdm:cookiesEnabled|boolean||boolean|Allows Cookies|The current user agent settings allow for the writing of cookies.'|
|xdm:country|string||string|Country|The country that the subscription contractual/agreement terms are rooted in.|
|xdm:countryCode|string||string|Country code|The two-character [ISO 3166-1 alpha-2](https://datahub.io/core/country-list) code for the country.|
|xdm:countryOfOrigin|string||string|Country of Origin|The two-character [ISO 3166-1 alpha-2](https://datahub.io/core/country-list) code for the country of origin of the product as defined by customs requirements.|
|xdm:courtesyTitle|string||string|Courtesy title|Normally an abbreviation of a persons *title*, *honorific*, or *salutation*.The `courtesyTitle` is used in front of full or last name in opening texts.e.g Mr. Miss. or Dr J. Smith.|
|xdm:crashes|data/measure||||Triggered when the application does not exit gracefully. Event is sent on application launch after a crash.|
|xdm:createdByBatchID|string|uri|string|Created by Batch Identifier|The Data Set Files in Catalog Services which has been originating the creation of the entity.|
|xdm:currencyCode|string||string|Currency Code|The ISO 4217 currency code used for this payment item.|
|xdm:dataSource|data/datasource|||Data Source|Globally unique identification of a data source.|
|xdm:department|string||string|Department|Primary department the product is associated with.|
|xdm:deregistrationDate|string|date-time|date-time|Deregistration Date|Date and time when the profile has disabled push notifications on the application.|
|xdm:device|context/device|||Device|The device linked to the subscription.|
|xdm:deviceGeoAccuracy|number||number|Geo Device Accuracy|The accuracy of the geo measuring device or mechanism. Measured in meters.|
|xdm:directMarketing|context/direct-marketing|||Direct Marketing|The events and properties related to direct/outbound marketing such as email, direct mail, texts and in-app notifications.|
|xdm:distanceToCenter|number||number|Distance to Center|Distance to center of geo in case of a geo circle. Measured in meters.|
|xdm:distanceToPOICenter|number||number|Distance to POI Center|Estimated distance from the POI Center in meters.|
|xdm:dmaID|integer||int|Designated Market Area|The Nielsen Media Research designated market area.|
|xdm:dropBeforeStarts|data/measure|||Drop Before Starts|Indicates the user abandoned the media stream before the first frame (e.g. during the pre-roll ad break, due to an error while loading the content from the CDN).|
|xdm:droppedFrames|data/measure|||Dropped Frames|The number of frames dropped during playback of the main content.|
|xdm:emailFormat|string||string|Email Format|Email format preferred by the profile. This can be rich text/plain text|
|xdm:endDate|string|date|date|End Date|The date the current subscription term ends.|
|xdm:endUserIDs<br><strong>DEPRECATED</strong>|context/enduserids|||End User IDs|Condensed, normalized encapsulation of all end user identifiers. <br>_This field has been deprecated, use xdm:identityMap instead._|
|xdm:environment|context/environment|||Environment|Environment of the subscription.This can be either then known environment at the time of the subscription or the environment of the application for subscriptions related to anApplication.|
|xdm:errors|data/measure|||Errors|The number of errors that were encountered during playback.|
|xdm:eventType|string||string|Type of the event received|The type for the external event received|
|xdm:extension|string||string|Extension|The internal dialing number used to call from a private exchange, operator or switchboard.|
|xdm:fabrication|string||string|Fabrication|Primary material the product is constructed with.|
|xdm:faxPhone|context/phonenumber|||Fax Phone|Fax phone number.|
|xdm:featureUsages|data/measure||||Activation(s) of an application feature that is being measured.|
|xdm:federated|data/measure|||Federated|Indicates if an experience event was created through data federation (data sharing).|
|xdm:firstLaunches|data/measure||||Triggered on first launch after install.|
|xdm:firstName|string||string|First name|The first segment of the name in the writing order most commonly accepted in the language of the name. In many cultures this is the preferred personal or given name.The `firstName` and `lastName` properties have been introduced to maintain compatibility with existing systems that model names in a simplified, non-semantic, and non-internationalizable way. Using `xdm:fullName` is always preferable.|
|xdm:firstQuartiles|data/measure||||A digital video ad has played through 25% of its duration at normal speed.|
|xdm:fullName|string||string|Full name|The full name of the person, in writing order most commonly accepted in the language of the name.|
|xdm:gender|string||string|Gender|Gender the product is marketed to.|
|xdm:geo|common/geo|||Geo|The geographic location where the experience was delivered.|
|xdm:geoInteractionDetails|context/geo-interaction-details|||Geo Interaction Details|Geo details active for the POI interaction.|
|xdm:geoShape|external/schema/geoshape|||Geo Shape|Geo shape of the geo being interacted with.|
|xdm:geoUnit|common/geounit|||Geographical Unit|The geographical unit within the organization owning the profile. This can be used to reference the geographical information maintained in another dataset.|
|xdm:globalOptout|boolean||boolean|Global Opt-out|Do not contact this profile on any outbound channel.|
|xdm:homeAddress|common/address|||Home Address|A home postal address.|
|xdm:homePhone|context/phonenumber|||Home Phone|Home phone number.|
|xdm:id|string||string|Unique Identifier|Unique identifier of the measure. In cases of data collection using lossy communication channels, such as mobile apps or websites with offline functionality, where transmission of measures cannot be ensured, this property contains a client-generated, unique ID of the measure taken. It is best practice to make this sufficiently long to ensure enough entropy. Additionally, if information such as time stamp, device ID, IP or MAC address, or other potentially user-identifying values are incorporated in the generation of the xdm:id, the result should be hashed, so that no PII is encoded in the value, as the goal is not to identify user or device, but the specific measure in time.|
|xdm:identities<br><strong>DEPRECATED</strong>|array||array|All User Identities|Array of Identities. Condensed, normalized encapsulation of all end user identifiers. <br>_This field has been deprecated, use xdm:identityMap instead._|
|xdm:identityMap|object||map|Identity Map|Condensed, normalized encapsulation of all end user identifiers. Replaces `xdm:endUserIDs` and `xdm:identities` which are now deprecated. Learn more about [Adobe Experience Platform Identity Service](../../identity_services_architectural_overview/identity_services_architectural_overview.md).|
|xdm:implementationDetails|context/implementationdetails|||Viewabiltity implementation details|The name and version of the library instrumented to measure viewability metrics.|
|xdm:impressions|data/measure|||Impressions|Describes the intention to play a timed media asset. It does not measure success, as the user might abandon the content before the first frame is viewed.|
|xdm:index|integer||int|Chapter Index|The index of the chapter inside the content.|
|xdm:industry|string||string|Industry|The the industry that this organization is a part of. This is a free-form field, and it is advisable to use a structured value for queries or to use the `xdm:classifier` property.|
|xdm:installs|data/measure||||Install of an application on a device where the actual install event is available.|
|xdm:ipV4|string|ipv4|string|IPv4|The numerical label assigned to a device participating in a computer network that uses the Internet Protocol for communication. |
|xdm:ipV6|string|ipv6|string|IPv6|The numerical label assigned to a device participating in a computer network that uses the Internet Protocol for communication. |
|xdm:isErrorPage|boolean||boolean|Is Error Page|Flag that indicate if the page is error page or not.  Error here is defined by the application, and may nor may not correspond to a page served with an HTTP error code.  This flag is used to broadly categorize web interactions.|
|xdm:isHomePage|boolean||boolean|Is Home Page|Flag that indicate if the page is the site home page or not.  The definition of home page is determined by the application, but is commonly used to designate a top level landing page or common site entry point.  This flag is used to broadly categorize web interactions.|
|xdm:isPaid|boolean||boolean|Is Paid|Indicate if the search is paid or not.|
|xdm:javaEnabled|boolean||boolean|Java Enabled|If Java was enabled in the device this observation was made from.|
|xdm:javaScriptEnabled|boolean||boolean|JavaScript Enabled|If JavaScript was enabled in the device this observation was made from.|
|xdm:javaScriptVersion|string||string|JavaScript Version|The version of JavaScript supported during the observation.|
|xdm:javaVersion|string||string|Java Version|The version of Java supported during the observation.|
|xdm:keywords|string||string|Keywords|The keywords for the search.|
|xdm:label|string||string|Label|Additional display information that maybe available, e.g MS Outlook rich address controls display 'John Smith smithjr@company.uk', the 'John Smith' part is data that would be placed in the label.|
|xdm:lastName|string||string|Last name|The last segment of the name in the writing order most commonly accepted in the language of the name. In many cultures this is the inherited family name, surname, patronymic, or matronymic name.The `firstName` and `lastName` properties have been introduced to maintain compatibility with existing systems that model names in a simplified, non-semantic, and non-internationalizable way. Using `xdm:fullName` is always preferable.|
|xdm:lastQualificationTime|string|date-time|date-time|Last Qualification Time|The timestamp when the assertion of segment membership was made.|
|xdm:lastVerifiedDate|string|date|date|Last Verified Date|The date that the address was last verified as still belonging to the person.|
|xdm:launches|data/measure||||Launch of an application. Triggered on every run, including crashes and installs. Also triggered on a resume from background when the lifecycle session timeout has been exceeded.|
|xdm:legalName|string||string|Organization Name|The official name of the organization.|
|xdm:linkClicks|data/measure||||Click of a web-link has occurred.|
|xdm:listPrice|number||number|List Price|Default price of the product before sales and discounting. In the `currencyCode` currency.|
|xdm:localTime|string|date-time|date-time|Local Time|The local time using RFC3339 with a stated timezone offset such as "2001-07-04T12:08:56-07:00". An example formatting pattern is "yyyy-MM-dd'T'HH:mm:ssXXX".|
|xdm:locatingType|string||string|Locating Type|Mechanism used to ascertain location.|
|xdm:location|context/place|||Location|The location of the organization's main office.|
|xdm:manufacturer|string||string|Manufacturer|The name of the organization who owns the design and creation of the Device. For example, 'Apple' is the manufacturer of the iPhone.|
|xdm:manufacturerName|string||string|Manufacturer Name|Manufacturer of the product.|
|xdm:marketSegment|string||string|Market Segment|The named market segment that the organization participates in. This is a free-form field, and it is advisable to use a structured value for queries or to use the `xdm:identifier` property.|
|xdm:marketing|context/marketing|||Marketing|The information related to marketing activities that are active with the touchpoint.|
|xdm:masterProductDescription|string||string|Master Product Description|The description of the product.|
|xdm:masterProductID|string|uri|string|Master Product Identifier|The internal unique ID of the product in the commerce backend system.|
|xdm:masterProductName|string||string|Master Product Name|The localized name of the product.|
|xdm:masterProductSKU|string||string|Master Product SKU|The unique SKU (Stock Keeping Unit) of the master product assigned by the vendor or manufacturer(to update).|
|xdm:measuredAdNotVisible|data/measure||||Indicator of ad not being visible as measured by a viewability library at impression time.|
|xdm:measuredMuted|data/measure||||Indicator of ad being muted as measured by a viewability library at impression time.|
|xdm:measuredWindowInactive|data/measure||||Indicator of ad being displayed in an inactive window as measured by a viewability library at impression time.|
|xdm:measurement|string||string||How to take measures of this metric.|
|xdm:measurementEligible|boolean||boolean|Viewability Measurement Eligible|Whether or not the ad was eligible to viewability measurement. An ad is eligible if the unit has a supported creative format and tag type.|
|xdm:media|context/media|||Media|The media activity information related to the experience event|
|xdm:mediaChapter|context/media-timed-chapter|||Media Chapter|Timed media - chapter information.|
|xdm:mediaSegmentViews|data/measure|||Media Segment Views|Indicates when at least one frame (not necessarily the first) has been viewed.|
|xdm:mediaTimed|context/media-timed|||Timed Media Information|Timed media - main content, ads & chapters|
|xdm:middleName|string||string|Middle name|Middle, alternative, or additional names supplied between the first name and last name.|
|xdm:midpoints|data/measure||||A digital video ad has played through 50% of its duration at normal speed.|
|xdm:mirrorPages|data/measure||||Click on a link in a message to a web hosted mirror page.|
|xdm:mobilePhone|context/phonenumber|||Mobile Phone|Mobile phone number.|
|xdm:model|string||string|Model|The name of the model for the Device. This is the common, human-readable or marketing name for the Device. The 'iPhone 6S' is a particular model of mobile phone.|
|xdm:modelNumber|string||string|Model Number|The unique model number designation assigned by the manufacturer for this Device. Model numbers are not versions, but unique identifiers that identify a particular model configuration. While the model for a particular phone might be 'iPhone 6S' the model number would be 'A1633', or 'A1634' based on configuration at the time of sale.|
|xdm:modifiedByBatchID|string|uri|string|Modified by Batch Identifier|The last Data Set Files in Catalog Services which has modified the entity.At creation time, `modifiedByBatchID` is set as `createdByBatchID`.|
|xdm:msaID|integer||int|Metropolitan Statistical Area|The Metropolitan Statistical Area in the USA where the observation occurred.|
|xdm:name|string||string|Name|The display name for the product as presented to the user for this product view.|
|xdm:namespace|context/namespace|||Namespace|The namespace associated with the `xid` attribute.|
|xdm:nonDeliverables|data/measure||||Asynchronous message(s) failed to deliver in a way that indicates that no future delivery attempts will be successful to the address.|
|xdm:notSent|data/measure||||Asynchronous message (email, SMS, MMS etc) was not dispatched due to cancellation or expiration of the marketing activity.|
|xdm:number|string||string|Number|The phone number. Note the phone number is a string and may include meaningful characters such as brackets (), hyphens - or characters to indicate sub dialing identifiers like extensions x. E.g 1-353(0)18391111 or +613 9403600x1234.|
|xdm:offset|integer||int|Chapter Offset|The offset of the chapter, in seconds, inside the content from the start.|
|xdm:opens|data/measure||||The direct marketing message (email, SMS, Push Notifications etc) has been opened/swyped/touched by the recipient.|
|xdm:operatingSystem|string||string|Operating System|The name of the operating system used when the observation was made. This attribute should not contain any version information i.e. 10.5.3, but can contain *edition* designations such as 'Ultimate', or 'Professional'.|
|xdm:operatingSystemVendor|string||string|Operating System Vendor|The name of the operating system vendor used when the observation was made.|
|xdm:operatingSystemVersion|string||string|Operating System Version|The full version identifier for the operating system used when the observation was made. Versions are generally numerically composed, but may be in a vendor defined format.|
|xdm:optInOut|context/optinout|||OptInOut|Describes a users opting in and out preferences for communication by medium and communication type.|
|xdm:order|data/order|||Order|The placed order for one or more products.|
|xdm:orgUnit|common/orgunit|||Organizational Unit|The unit within the organization owning the profile. This can be used to reference the organization details maintained in another dataset.|
|xdm:organizations|array||array|Organizations||
|xdm:originalSaleDate|string|date|date|Original Sale Date|First date the product was made available for sale. The time using RFC3339 with a stated timezone offset such as "2001-07-04T12:08:56-07:00". An example formatting pattern is "yyyy-MM-dd'T'HH:mm:ssXXX".|
|xdm:pageDepth|integer||int|Page Depth|The page depth in the search results.|
|xdm:pageViews|data/measure||||View(s) of a webpage has occurred.|
|xdm:pauseTime|data/measure|||Total Pause Duration|Describes the duration (in seconds) in which playback was paused by the user.|
|xdm:pauses|data/measure|||Pauses|The number of pause periods that occurred during playback.|
|xdm:paymentAmount|number||number|Payment Amount|The value of the payment.|
|xdm:paymentMethod|string||string|Payment Method|The payment method for recurring payments.|
|xdm:paymentStatus|string||string|Payment Status|The standing of the account.|
|xdm:paymentType|string||string|Payment Type|The method of payment for this order. Enumerated, custom values allowed.|
|xdm:payments|array||array|Payment List|The list of payments for this order.|
|xdm:percentViewable|integer||byte|Percent Viewable|Percent of pixels in the ad deemed viewable at measurement time.|
|xdm:person|context/person|||Person|An individual actor, contact, or owner.|
|xdm:personalEmail|context/emailaddress|||Personal Email|A personal email address.|
|xdm:placeContext|context/placecontext|||Place Context|The transient circumstances related to the observation. Examples include locale specific information such as weather, local time, traffic, day of the week, workday vs. holiday, working hours.|
|xdm:planName|string||string|Plan Name|The human readable name for the subscription.|
|xdm:playerName|string||string|Content Player Name|Name of the player.|
|xdm:playerSDKVersion|context/implementationdetails|||Player SDK Version|The SDK version used by the player.|
|xdm:playerVolume|integer||byte|Player Volume Percentage|The player volume percentage, measured at runtime where 0 is muted and 100 is maximum volume.|
|xdm:poiEntries|data/measure||||The number of times a person has entered the Point of Interest (POI).|
|xdm:poiExits|data/measure||||The number of times a person has exited the Point of Interest (POI).|
|xdm:pointOfInterest|external/schema/geocoordinates|||Point of Interest|The coordinates of the point of interest for this location.|
|xdm:postOfficeBox|string||string|Post Office Box|Post office box of the address.|
|xdm:postalCode|string||string|Postal code|The postal code of the location. Postal codes are not available for all countries. In some countries, this will only contain part of the postal code.|
|xdm:preferredLanguage|string||string|Preferred Language|Describes the preferred system of communication used by the profile. Language codes are expressed in BCP 47 format.|
|xdm:priceTotal|number||number|Price Total|The total price of this order after all discounts and taxes have been applied.|
|xdm:primary|boolean||boolean|Primary|Primary phone number indicator.Unlike for Address or EmailAddress, there can be multiple primary phone numbers; one per communication channel.The communication channel is defined by the type:* `textMessaging`: type = `mobile`* `phone`: type = `home` | `work` | `unknown`* `fax`: type = `fax`|
|xdm:primaryAssetReference|context/media-timed-asset-reference|||Primary Asset Reference|Asset information about the main content that was played, present on all ads and chapters that occur during the content's playback.|
|xdm:primaryAssetViewDetails|context/media-timed-asset-view-details|||Primary Asset View Details|View details for the main content playback, present on all ads and chapters that occur during the content's playback.|
|xdm:product|string|uri|string|Product|The XDM identifier of the product itself.|
|xdm:productAddMethod|string||string|Product Add Method|The method that was used to add a product item to the list by the visitor. Set with product list add metrics.|
|xdm:productCreateDate|string|date|date|Product Creation Date|The date when this product variant was created. The time using RFC3339 with a stated timezone offset such as "2001-07-04T12:08:56-07:00". An example formatting pattern is "yyyy-MM-dd'T'HH:mm:ssXXX".|
|xdm:productLastModified|string|date|date|Product Last Modified|The date when this product variant was last modified. The time using RFC3339 with a stated timezone offset such as "2001-07-04T12:08:56-07:00". An example formatting pattern is "yyyy-MM-dd'T'HH:mm:ssXXX".|
|xdm:productListAdds|data/measure||||Addition of a product to the product list. Example a product is added to a shopping cart.|
|xdm:productListItems|array||array|Product List Items|A list of items representing a product selected by a customer with specific options and pricing that are for that usage context at a specific point of time and may differ from the product record.|
|xdm:productListOpens|data/measure||||Initialization of a new product list. Example a shopping cart is created.|
|xdm:productListRemovals|data/measure||||Removal(s) of a product entry from a product list. Example a product is removed from a shopping cart.|
|xdm:productListReopens|data/measure||||A product list that was no longer accessible(abandoned) has been re-activated by the user. Example via a re-marketing activity.|
|xdm:productListViews|data/measure||||View(s) of a product-list has occurred.|
|xdm:productURL|string||string|Product URL|The URL for the primary Product View of the product variant page.|
|xdm:productViews|data/measure||||View(s) of a product have occurred.|
|xdm:profilePictureLink|string||string|Profile Picture Link|Link to profile's picture|
|xdm:progress10|data/measure|||10% Progress Marker|Indicates that the playhead passed the 10% marker of media based on stream length. The marker is only counted once, even if seeking backwards. If seeking forward, markers that are skipped are not counted.|
|xdm:progress25|data/measure|||25% Progress Marker|Indicates that the playhead passed the 25% marker of media based on stream length. Marker only counted once, even if seeking backwards. If seeking forward, markers that are skipped are not counted.|
|xdm:progress50|data/measure|||50% Progress Marker|Indicates that the playhead passed the 50% marker of media based on stream length. Marker only counted once, even if seeking backwards. If seeking forward, markers that are skipped are not counted.|
|xdm:progress75|data/measure|||75% Progress Marker|Indicates that the playhead passed the 75% marker of media based on stream length. Marker only counted once, even if seeking backwards. If seeking forward, markers that are skipped are not counted.|
|xdm:progress95|data/measure|||95% Progress Marker|Indicates that the playhead passed the 95% marker of media based on stream length. Marker only counted once, even if seeking backwards. If seeking forward, markers that are skipped are not counted.|
|xdm:proximity|string||string|Proximity to beacon|Estimated distance from the beacon.|
|xdm:proximityUUID|string||string|Proximity UUID|The UUID configured into a beacon (or multiple beacons if multiple operate in an area) to be transmitted to mobile devices in range to identify an organizations beacons.|
|xdm:purchaseID|string||string|Purchase ID|Unique identifier assigned by the seller for this purchase or contract. There is no guarantee that the ID is unique.|
|xdm:purchaseOrderNumber|string||string|Purchase Order Number|Unique identifier assigned by the purchaser for this purchase or contract.|
|xdm:purchases|data/measure||||An order has been accepted. Purchase is the only required action in a commerce conversion. Purchase must have a product list referenced.|
|xdm:pushNotificationTokens|array||array|Push Notification Tokens|Push notification tokens are used to communicate with applications that are installed on devices or SaaS application accounts.|
|xdm:qoe|context/media-timed-qoe|||Quality of Experience|Timed media properties related to the content playback's quality of experience (QoE).|
|xdm:quantity|integer||int|Quantity|The number of units the customer has indicated they require of the product.|
|xdm:quicktimeVersion|string||string|Quicktime Version|The version of Apple Quicktime supported during the observation.|
|xdm:rating|number||number|Rating|The calculated score or star rating for this organization. `1` indicates the maximum possible rating, `0` the minumum possible rating.|
|xdm:reason|string||string|Reason|The general intent the member has for the use of the subscription.|
|xdm:receivedTimestamp|string|date-time|date-time|Received Timestamp|The time at which this interaction was received by a server.|
|xdm:region|string||string|Region|The region, county, or district portion of the address.|
|xdm:registrationDate|string|date-time|date-time|Registration Date|Date and time when the profile has authorized its application to receivepush notifications.|
|xdm:renew|string||string|Renew|The agreed way that the subscription may continue after the end date.|
|xdm:repositoryCreatedBy|string||string|Created by User Identifier|User id who has created the entity.|
|xdm:repositoryLastModifiedBy|string||string|Modified by User Identifier|User id who last modified the entity.At creation time, `modifiedByUser` is set as `createdByUser`.|
|xdm:resumes|data/measure|||Resumes|Marks each playback that was resumed after more than 30 minutes of buffer, pause, or stall period.|
|xdm:revision|string||string|Revision|The identification between subscriptions of the same name and category hierarchy.|
|xdm:saveForLaters|data/measure||||Product list is saved for future use. Example a product wish list.|
|xdm:screenHeight|integer||int|Screen Height|The number of veritcal pixels of the device's active display in its default orientation.|
|xdm:screenWidth|integer||int|Screen Width|The number of horizontal pixels of the device's active display in its default orientation.|
|xdm:search|context/search|||Search|The information related to web or mobile search.|
|xdm:searchEngine|string||string|Search Engine|The search engine used by the search.|
|xdm:searchEngineID|string|uri|string|Search Engine ID|The application-specified identifier used to identify the search engine used by the search.|
|xdm:segmentID|context/segmentidentity|||Segment ID|The identity of the segment or snapshot definition in with the domain of the specific system that processes that type of segment.|
|xdm:segments|array||array|Segment Membership||
|xdm:sends|data/measure||||Asynchronous message(s) (email, SMS, MMS etc) have been dispatched to a person's account/address/device.|
|xdm:server|string||string|Server|The normative or usual server that hosts the web page.  This may or may not be the host or server that actually served the page interaction, but is used for classification purposes.|
|xdm:sessionTimeout|integer||int|Media Session Server Timeout|Indicates the amount of time, in seconds, that passed between the user's last known interaction and the moment the session was closed.|
|xdm:shape|external/schema/geoshape|||Geo Shape|The geographic shape of the physical location.|
|xdm:showType|string||string|Show Type|The type of content e.g. Trailer, Full Episode.|
|xdm:siteSection|string||string|Site Section|The normative name of the site section where this web page resides, which may be used to classify or categorize the interaction|
|xdm:size|number||number|Size|Standard product size for the product.|
|xdm:sourceFeed|string||string|Feed Type|The type of feed. Can either represent actual feed-related data (e.g. EAST HD/SD), or the source of the feed (e.g. an URL).|
|xdm:stallTime|data/measure|||Total Stalling Duration|Describes the duration (in seconds) in which the playback was stalled during playback.|
|xdm:stalls|data/measure|||Stalls|The number of stall states that occurred during a playback session.|
|xdm:startDate|string|date|date|Start Date|The date the subscription begins.|
|xdm:starts|data/measure|||Starts|Indicates the first frame of the timed media asset has been viewed - i.e. the viewer did not abandon during pre-roll ad, buffering, etc.|
|xdm:stateProvince|string||string|State or province|The state, or province portion of the observation. The format follows the [ISO 3166-2 (country and subdivision)][http://www.unece.org/cefact/locode/subdivisions.html] standard.|
|xdm:status|string||string|Status|The current status of the subscription.|
|xdm:statusReason|string||string|Status Reason|A description of the current status.|
|xdm:streamFormat|string||string|Stream Format|Free-form format of the stream (e.g. short, long).|
|xdm:street1|string||string|Street 1|Primary Street level information, apartment number, street number and street name.|
|xdm:street2|string||string|Street 2|Optional street information second line.|
|xdm:street3|string||string|Street 3|Optional street information third line.|
|xdm:street4|string||string|Street 4|Optional street information fourth line.|
|xdm:subCategory|string||string|Sub Category|The specific sub categorization of the subscription.|
|xdm:subscriber|context/person|||Subscriber|The owner of the subscription.|
|xdm:subscriptions|array||array|Subscriptions|Subscriptions that this profile is entitled to including terminated, expired or exhausted subscriptions.|
|xdm:supplierName|string||string|Supplier Name|The distributor of the product.|
|xdm:tags|array||array|Tags|Tags are used to indicate how the aliases represented by a given datasource should be interpreted by applications using those aliases.Examples:* `isAVID`: data sources representing Analytics visitor IDs.* `isCRSKey`: data sources representing aliases that should be used as keys in CRS.Tags are set when the data source is created but they are also included in pipeline messages when referencing a given data source.|
|xdm:term|integer||int|Term|The numeric value of the term.|
|xdm:termUnitOfTime|string||string|Term Unit Of Time|The unit of time for the term period.|
|xdm:testProfile|boolean||boolean|Test Profile|Indicates the `profile` record is for use in testing/verification purposes and should not be automatically included in normal operation(s).|
|xdm:thirdPartyCookiesEnabled|boolean||boolean|Allows Third-party Cookies|If third-party cookies were enabled when this observation was made.|
|xdm:thirdQuartiles|data/measure||||A digital video ad has played through 75% of its duration at normal speed.|
|xdm:timePlayed|data/measure|||Time Spent|Describes the amount of time (in seconds) spent by a user on a specific timed media asset.|
|xdm:timeToStart|data/measure|||Time to Start|Describes the duration (in seconds) passed between video load and start.|
|xdm:timeZone|string||string|Time Zone|Describes which time zone the profile is present in, most frequently/the time zone preferred by the profile. Time zones are expressed according to the IETF tz database: https://www.ietf.org/timezones/tzdb-2016i/tz-link.htm|
|xdm:timestamp|string|date-time|date-time|Timestamp|The time when the first event of the interaction occurred.|
|xdm:token|string||string|Token|The service specific token used to address the application for communication. e.g an Apple APN ID or a Google GCM ID.|
|xdm:topUp|string||string|Top Up|Agreed terms for how consumable aspects of a subscription are repurchased during a billing period.|
|xdm:totalTimePlayed|data/measure|||Content Play|Describes the total amount of time spent by a user on a specific timed media asset, which includes time spent watching ads.|
|xdm:trackingCode|string||string|Tracking Code|Tracking code that can be used to identify the marketing campaign the event is associated with.|
|xdm:transactionID|string||string|Transaction ID|The unique transaction identifier for this payment item.|
|xdm:type|string||string|Type|The referrer type.|
|xdm:typeID|string||string|Type Identifier|An identifier for the device. This may be an identifier from Device Atlas or another service that identifies the hardware that is being used.|
|xdm:typeIDService|string|uri|string|Type Identifier Service|The namespace of the service that is used to identify the device type.|
|xdm:unit|string|||||
|xdm:unitOfMeasure|string||string|Unit of Measure|Standard unit of measure of the variant. Denotes the units for the size measurement.|
|xdm:unmeasurableIframe|data/measure||||Indicator of viewability library not being able to properly execute measurements due to ad being displayed inside an iframe.|
|xdm:unmeasurableOther|data/measure||||Indicator of viewability library not being able to properly execute measurements due to non-predefined error.|
|xdm:unsubscriptions|data/measure||||The recipient of the direct marketing message (email, newsletters, etc) has opted out from receiving them.|
|xdm:upgrades|data/measure||||Upgrade of an application that has previously been installed. Triggered on first launch after upgrade.|
|xdm:userAgent|string||string|User Agent|The HTTP User-Agent string from the client request.|
|xdm:userComplaints|data/measure||||User complaint(s) have been received. This generally occurs when a recipient of a message reports it as spam.|
|xdm:validUntil|string|date-time|date-time|Valid Until|The timestamp for when the segment assertion should no longer be assumed to be valid and should either be ignored or revalidated.|
|xdm:validity|string||string|Validity|A level of technical correctness of the phone number.|
|xdm:value|number||number||The quantifiable value of this measure.|
|xdm:vendor|string||string|Vendor|The application or browser vendor.|
|xdm:version|string||string|Version|The version of the segment definition used in this segment assertion. Version can be omitted in audience lists when all memberships versions are the same.|
|xdm:viewabilityEligibleImpressions|data/measure||||Impression(s) of an advertisement to an end user with viewablility library instrumented.|
|xdm:viewable|boolean||boolean|Viewable Ad|Display ads are considered viewable when at least 50% of the ad is visible for at least 1 second. Video ads are considered viewable when at least 50% of the ad is visible while the video is playing for at least 2 consecutive seconds. All viewable ads are measurable, because you can't confirm that an ad has met the criteria for viewability unless it can be measured.|
|xdm:viewableCompletes|data/measure||||Completion(s) of an advertisement to an end user deemed viewable at completion time by a viewability library.|
|xdm:viewableFirstQuartiles|data/measure||||First quartile(s) of an advertisement to an end user deemed viewable at first quartile of play by a viewability library.|
|xdm:viewableImpressions|data/measure||||Impressions of an advertisement to an end user deemed viewable after two seconds of play by a viewability library.|
|xdm:viewableMidpoints|data/measure||||Midpoint(s) of an advertisement to an end user deemed viewable at midpoint of play by a viewability library.|
|xdm:viewableThirdQuartiles|data/measure||||Third quartile(s) of an advertisement to an end user deemed viewable at third quartile of play by a viewability library.|
|xdm:viewportHeight|integer||int|Viewport Height|The vertical size (in pixels) of the window the experience was displayed inside. For a web view event, the browser viewport height.|
|xdm:viewportWidth|integer||int|Viewport Width|The horizontal size (in pixels) of the window the experience was displayed inside. For a web view event, the browser viewport width.|
|xdm:web|context/webinfo|||Web|The information related to web page and link of the ExperienceEvent.|
|xdm:webInteraction|context/webinteraction|||Web Interaction|Details about the web link (URL) that corresponds to where the interaction occurred.|
|xdm:webPageDetails|context/webpagedetails|||Web Page Details|Details about the web page where the web interaction occurred.|
|xdm:webReferrer|context/webreferrer|||Web Referrer|The referrer of a web interaction, which is the URL a visitor came from immediately before the current web interaction was recorded.|
|xdm:website|string|uri|string|Web Site|The URL of the organization's website.|
|xdm:workAddress|common/address|||Work Address|A work postal address.|
|xdm:workEmail|context/emailaddress|||Work Email|A work email address.|
|xdm:workPhone|context/phonenumber|||Work Phone|Work phone number.|
|xdm:xid|string||string|Experience Identifier|When present, this value represents a cross-namespace identifier that is unique across all namespace-scoped identifiers in all namespaces.|