Common issues with Data Collection Core Services.

## The data payload and results look fine, but no data is actually being ingested

1. Ensure that the timestamp being passed in is correct - the timestamp must be in one of the following formats
    - yyyy-MM-dd'T'HH:mm:ssZ
    - yyyy-MM-dd'T'HH:mm:ss.[0-9]{1,9}Z
    - yyyy-MM-dd'T'HH:mm:ss[+-]HH:mm 
    - yyyy-MM-dd'T'HH:mm:ss.[0-9]{1,9}[+-]HH:mm] 

## When doing a profile lookup using email, it fails

1. If the email contains a "+" in it, ensure that the "+" is encoded - otherwise, it will be treated as a space.

