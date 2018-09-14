# Errors and Troubleshooting

## REST API Errors

| HTTP Status Code | Description | Possible Causes |
| ---------------- | ----------- | --------------- |
| 400 | Bad request | Malformed or illegal query |
| 401 | Authentication failed | Invalid auth token |
| 500 | Internal server error | Internal system failure |

## PostgreSQL API Errors

| Error Code and Connection State | Description | Possible Cause |
| ------------------------------- | ----------- | -------------- |
| **28P01** Start-up - authentication | Invalid password | Invalid authentication token |
| **28000** Start-up - authentication | Invalid authorization type | Invalid authorization type. Must be `AuthenticationCleartextPassword`. |
| **42601** Simple query | Syntax error | Invalid command or syntax error |
| **58000** Simple query | System error | Internal system failure |
| **42601** Extended query | Syntax error | Invalid command or syntax error |
| **58000** Extended query | System error | Internal system failure |
| **08P01** N/A | Unsupported message type | Unsupported message type |