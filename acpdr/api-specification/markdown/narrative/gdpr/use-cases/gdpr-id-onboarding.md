# Onboarding customers with a diverse set of organizational IDs

[!NOTE]This is a work in progress!

For each GDPR API call:

* A customer must provide one [IMSOrg ID](../gdpr-terminology.md#IMSORGID), which the Privacy Core Service validates and authenticates
* The customer may provide zero or more legacy org IDs, which the Privacy Core Service does not validate or authenticate. The Privacy Core Service relays these org IDs faithfully to each Solution subscribed to its pipeline message to determine whether the org ID is relevant to them. If so, the solution validates it and authenticates it.

The customer must supply a namespace and other details for each identifier submitted. For more details about namespaces or data submission format, please see [Central Service Customer API](TBD)

## Customer Provisioning/Initialization for GDPR Request Processing

1. Adobe Experience Cloud, its solutions, and Core Services provide documentation on how customers discover their IMSOrg IDs and legacy Org IDs
2. Customers discover their org IDs where possible and file a Customer Care ticket for help with discovering other IDs
3. If the customer doesn't have an IMSOrg ID, Customer Care escalates in order to provision the customer with a new IMSOrg ID
4. If they customer wants to discover their AdCloud and Campaign org IDs, then Customer Care reaches out to AdCloud and Campaign to help find the customer's legacy org IDs
5. Once Customer Care hears back from AdCloud, they return all discovered org IDs to the customer and close the customer's ticket
