# Adobe Experience Platform Mobile SDK

## Overview

Adobe Experience Platform Mobile SDK provides General Data Protection Regulation (GDPR) - ready APIs for Controllers that allow users to perform the following tasks:

* Retrieve locally-stored identities
* Set opt status flags for data collection & transmission

## Retrieving Stored Identifiers

This information helps you retrieve locally stored, SDK identities from your Android app and with GDPR data access requests.

Important: The getAllIdentifiersAsync method retrieves identities stored in the SDK. You must call this method before the user opts-out.
SDK identities (as applicable) are locally stored and returned in a JSON string, which might contain:

* Company Context - IMS Org IDs
* User IDs
* Marketing Cloud ID (MCID)
* Integration Codes (ADID, Push ID)
* Data Source IDs (DPID, DPUUID)
* Analytics IDs (AVID, AID, VID, and associated RSIDs)
* Target Legacy IDs (TNTID, TNT3rdpartyID)
* Audience Manager ID (UUID)

Here is an example of the ```ADBMobile getAllIdentifiersAsync``` method for Android:

```
Config.getAllIdentifiersAsync(new ConfigCallback<String>() {
     @Override
     public void call(String identitiesJson) {
         Log.d("ADBMobile Identities", identitiesJson);
     }
});
```

Here is an example of the ```ADBMobile getAllIdentifiersAsync``` method for iOS:

```
[ADBMobile getAllIdentifiersAsync:^(NSString * _Nullable content){
      NSLog(content)
}]
```

## Setting the User's Opt Status

You can control whether the Analytics, Target, and Audience Manager activity is allowed on a device by using the following settings:

* ```privacyDefault``` in ADBMobile JSON Config. This setting controls the initial setting that persists until it is changed in the code.

* The ```Config.setPrivacyStatus``` method. After the privacy setting is changed by using this method, this change remains effective until you change it again or when you uninstall and install the app again. For more information about the methods, see Configuration Methods.

The following table describes each privacy status:

| Setting | Description | Value in JSON Config | Value in setPrivacyStatus |
| ------- | ------ | -------------------- | ------------------------- |
| Opt in  | - Analytics: Hits are sent<br/>- Target: Mbox requests are sent<br/>- Audience Manager: Signals and ID syncs are sent | optedin | MOBILE_PRIVACY_STATUS_OPT_IN |
| Opt out  | - Analytics: Hits are discarded<br/>- Target: Mbox requests are not allowed<br/>- Audience Manager: Signals and ID syncs are not allowed | optedout | MOBILE_PRIVACY_STATUS_OPT_OUT |
| Unknown  | - Analytics: If offline tracking is enabled, hits are saved until the privacy status changes to opt-in (hits are sent) or opt-out (hits are discarded). If offline tracking is not enabled, hits are discarded until the privacy status changes to opt-in<br/>- Target: Mbox requests are sent<br/>- Audience Manager: Signals and ID syncs are sent | optunknown | MOBILE_PRIVACY_STATUS_UNKNOWN |

Examples for Android:

```
public void setOptIn(View view) {
        Config.setPrivacyStatus(MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_OPT_IN);
    currentStatus = Config.getPrivacyStatus();
}

public void setOptOut(View view) {
    Config.setPrivacyStatus(MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_OPT_OUT);
    currentStatus = Config.getPrivacyStatus();
}

public void setOptUnknown(View view) {
        Config.setPrivacyStatus(MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_UNKNOWN);
    currentStatus = Config.getPrivacyStatus();
}
```

Examples for iOS:

```
- (IBAction) setPrivacyOptIn {
    [ADBMobile setPrivacyStatus:ADBMobilePrivacyStatusOptIn];
}

- (IBAction) setPrivacyOptOut {
    [ADBMobile setPrivacyStatus:ADBMobilePrivacyStatusOptOut];
}

- (IBAction) setPrivacyOptUnknown {
    [ADBMobile setPrivacyStatus:ADBMobilePrivacyStatusUnknown];
}
```
