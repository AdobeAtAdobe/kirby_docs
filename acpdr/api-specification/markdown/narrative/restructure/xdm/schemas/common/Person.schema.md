---
layout: default
---

# Person

An individual actor, contact, or owner.
## Properties

`object`


###  firstName
`string` 

The personal, or given name.


###  lastName
`string` 

The inherited family name, surname, patronymic, or matronymic name.


###  middleName
`string` 

Middle, alternative, or additional names supplied between the first and last names.


###  courtesyTitle
`string` 

Normally an abbreviation of a persons *title*, *honorific*, or *salutation*.
The `courtesyTitle` is used in front of full or last name in opening texts.
e.g Mr. Miss. or Dr J. Smith.



###  birthDay
`integer` 

The day of the month a person was born (1-31).
Default 0 means absence.



###  birthMonth
`integer` 

The month of the year a person was born (1-12).
Default 0 means absence.



###  birthYear
`integer` 

The year a person was born including the century (yyyy, e.g 1983).
Default 0 means absence.



###  gender
`string` 

Gender identity of the person.


 *x ∈  {unknown,male,female,withheld,other}*
 


###  audit
[`common.AuditTrail.schema`](../common/AuditTrail.schema.md) 





