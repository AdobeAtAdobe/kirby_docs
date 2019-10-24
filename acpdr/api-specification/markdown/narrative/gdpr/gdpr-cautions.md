# Adobe GDPR cautions

* Adobe does not provide consent management services, seek out a third-party provider for assistance.

* Adobe Experience Platform Privacy Service API coding is required to send access/delete requests

* Deploying the Adobe Privacy JavaScript tag is strongly recommended
 
* Mobile SDK updates are recommended if you have mobile apps that use our SDK

* Tell Data Subjects on a "delete" request that they must opt out of cross-site advertising (customer owns the method for doing this, we maintain the ad-tech opt-out on our site.)

* Remind Data Subjects, access/delete requests must be issued from each device in which they are interested having that request honored.

* As a processor, Adobe processes whatever IDs controllers send us in their use of our services. However, if controllers do not send us Adobe related IDs as part of a Data Subject request, we won't be able to return or delete any data. We encourage Customers to use the Adobe Privacy JS tag to send us the IDs we can use to process such requests.
