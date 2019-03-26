# GDPR faq

**When is the GDPR coming into effect?**

The GDPR was approved and adopted by the EU Parliament in April, 2016. The regulation will take effect after a two-year transition period and, unlike a Directive it does not require any enabling legislation to be passed by government--meaning it will be in force May 2018.

**Who does the GDPR affect?**

The GDPR not only applies to organizations located within the EU but it will also apply to organizations located outside of the EU if they offer goods or services to, or monitor the behavior of, EU [Data Subjects](gdpr-terminology.md#datasubject). It applies to all companies processing and holding the [Personal Data](gdpr-terminology.md#personaldata) of [Data Subjects](gdpr-terminology.md#datasubject) residing in the European Union, regardless of the company's location.

**What are the penalties for non-compliance?**

Organizations can be fined up to 4% of annual global turnover for breaching GDPR or €20 Million. This is the maximum fine that can be imposed for the most serious infringements e.g.not having sufficient customer consent to process data or violating the core of [Privacy by Design](gdpr-terminology.md#privacybydesign) concepts. There is a tiered approach to fines e.g. a company can be fined 2% for not having their records in order (article 28), not notifying the supervising authority and [Data Subject](gdpr-terminology.md#datasubject) about a breach or not conducting impact assessment. It is important to note that these rules apply to both [Data Controllers](gdpr-terminology.md#datacontroller) and [Data Processor](gdpr-terminology.md#dataprocessor) - meaning 'clouds' will not be exempt from GDPR enforcement.

**What constitutes [Personal Data](gdpr-terminology.md#personaldata)?**

Any information related to a natural person or [Data Subject](gdpr-terminology.md#datasubject), that can be used to directly or indirectly identify the person. It can be anything from a name, a photo, an email address, bank details, posts on social networking websites, medical information, or a computer IP address.

**What is the difference between a [Data Processor](gdpr-terminology.md#dataprocessor) and a [Data Controller](gdpr-terminology.md#datacontroller)?**

A [Data Controller](gdpr-terminology.md#datacontroller) is the entity that determines the purposes, conditions and means of the processing of [Personal Data](gdpr-terminology.md#personaldata), while the [Data Processor](gdpr-terminology.md#dataprocessor) is an entity which processes [Personal Data](gdpr-terminology.md#personaldata) on behalf of the [Data Controller](gdpr-terminology.md#datacontroller).

**Do [Data Processors](gdpr-terminology.md#dataprocessor) need 'explicit' or 'unambiguous' [Data Subject](gdpr-terminology.md#datasubject) [consent](gdpr-terminology.md#consent) - and what is the difference?**

The conditions for [consent](gdpr-terminology.md#consent) have been strengthened, as companies will no longer be able to utilize long illegible terms and conditions full of legalese, as the request for [consent](gdpr-terminology.md#consent) must be given in an intelligible and easily accessible form, with the purpose for data processing attached to that [consent](gdpr-terminology.md#consent) - meaning it must be unambiguous. [Consent](gdpr-terminology.md#consent) must be clear and distinguishable from other matters and provided in an intelligible and easily accessible form, using clear and plain language. It must be as easy to withdraw [consent](gdpr-terminology.md#consent) as it is to give it.​  Explicit [consent](gdpr-terminology.md#consent) is required only for processing sensitive [Personal Data](gdpr-terminology.md#personaldata) - in this context, nothing short of “opt in” will suffice. However, for non-sensitive data, “unambiguous” [consent](gdpr-terminology.md#consent) will suffice.

**What about [Data Subjects](gdpr-terminology.md#datasubject) under the age of 16?**

Parental consent is required to process the [Personal Data](gdpr-terminology.md#personaldata) of children under the age of 16 for online services; member states may legislate for a lower age of [consent](gdpr-terminology.md#consent) but this will not be below the age of 13.

**What is the difference between a [Regulation](gdpr-terminology.md#regulation) and a [Directive](gdpr-terminology.md#directive)?**

A [Regulation](gdpr-terminology.md#regulation) is a binding legislative act. It must be applied in its entirety across the EU, while a [Directive](gdpr-terminology.md#directive) is a legislative act that sets out a goal that all EU countries must achieve. However, it is up to the individual countries to decide how. It is important to note that the GDPR is a [Regulation](gdpr-terminology.md#regulation), in contrast the the previous legislation, which is a [Directive](gdpr-terminology.md#directive).

**Does my business need to appoint a [Data Protection Officer (DPO)](gdpr-terminology.md#dataprotectionofficer)?**

[DPOs](gdpr-terminology.md#dataprotectionofficer) must be appointed in the case of: (a) public authorities, (b) organizations that engage in large scale systematic monitoring, or (c) organizations that engage in large scale processing of sensitive [Personal Data](gdpr-terminology.md#personaldata) (Art. 37).  If your organization doesnt fall into one of these categories, then you do not need to appoint a [DPO](gdpr-terminology.md#dataprotectionofficer).

**How does the GDPR affect policy surrounding data breaches?**

Proposed regulations surrounding data breaches primarily relate to the notification policies of companies that have been breached. Data breaches which may pose a risk to individuals must be notified to the DPA within 72 hours and to affected individuals without undue delay.

**How do I get information about the status of my GDPR request or job?**

You can learn the status of your GDPR request or job by using the [GDPR API’s GET request](https://www.adobe.io/apis/cloudplatform/gdpr/api-reference.html) or by visiting the GDPR UI at [https://gdprui.cloud.adobe.io/](https://gdprui.cloud.adobe.io/). For example: from those locations, you can obtain a downloadable archive file with results of completed GDPR Access requests.

*Note:* As of September 14, 2018, we are turning off email notifications for completion or erroring of your GDPR requests. Other GDPR functionality is not affected by this change.

The following is a sample API GET request:

```json
{
    "jobs": [
        {
            "jobId": "XXXXXXX-XXXXXX-XXXXXXX-XXXX-XXXXXXXXXXX",
            "requestId": XXXXXX,
            "lastUpdatedOn": "09/11/2018 2:02 AM",
            "customer": {
                "user": {
                    "key": "155XXXX",
                    "action": [
                        "access"
                    ],
                    "userIDs": [
                        {
                            "namespace": "XXXX",
                           "value": "XXXXXXXX",
                            "type": "analytics",
                            "isDeletedClientSide": false
                        },
                        {
                            "namespace": "YYYYY",
                            "value": "YYYYYYYYYYYYY",
                            "type": "analytics",
                            "isDeletedClientSide": false
                        },
                        {
                            "namespace": "ZZZZZZZZ",
                            "value": "ZZZZZZZZZZZZZZZZZ",
                            "type": "analytics",
                            "isDeletedClientSide": false
                        }
                    ]
                },
                "companyContexts": [
                    {
                        "namespace": "imsOrgID",
                        "value": "XXXXXXXXXXXXXXXXXXX@AdobeOrg"
                    }
                ]
            },
           "emailId": "gdprstatus@mycompany.com",
            "productResponses": [
                {
                    "product": "Analytics",
                    "retryCount": 0,
                    "productStatusResponse": {
                        "statusCode": 1,
                        "statusMessage": "complete",
                        "solutionMessage": {
                            "message": "success",
                            "product": "analytics",
                            "results": {
                                "userContexts": [],
                                "receiptData": {}
                            },
                            "jobId": "XXXXXXX-XXXXXX-XXXXXXX-XXXX-XXXXXXXXXXX",
                            "status": "complete",
                            "action": null
                        }
                    },
                    "processedDate": "09/11/2018 2:00 AM"
                }
            ],
            "lastUpdatedBy": "GDPRCentralService",
            "timeRequested": "09/01/2018 4:52 AM",
            "submittedBy": "XXXXX-XXXXXX-XXXXX-XXXXXXX@techacct.adobe.com",
            "gdprStatusResponse": {
                "statusCode": 1,
                "statusMessage": "complete",
                "solutionMessage": null
            },
            "downloadUrl": "https://va7gdprprodblob.blob.core.windows.net/va7gdprprodblobpublic/XXXXXX-XXXXXX-XXXXXXX-XXXXXXX-XXXXXX-XXXXXXX.zip"
        }
    ],
    "totalRecords": 1
}
```