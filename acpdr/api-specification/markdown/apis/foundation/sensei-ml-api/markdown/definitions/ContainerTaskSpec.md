
<a name="containertaskspec"></a>
### ContainerTaskSpec
*Polymorphism* : Inheritance  
*Discriminator* : type


|Name|Description|Schema|
|---|---|---|
|**cmd**  <br>*optional*|**Example** : `"string"`|string|
|**cpus**  <br>*required*|**Example** : `0.0`|number (float)|
|**diskSizeInGB**  <br>*required*|used to attach a disk of mentioned size to container.This acts as working space for code  <br>**Example** : `0.0`|number (float)|
|**gpus**  <br>*required*|**Example** : `0`|integer (int32)|
|**instances**  <br>*required*|**Example** : `0`|integer (int32)|
|**memoryInMB**  <br>*required*|**Example** : `0`|integer (int32)|
|**type**  <br>*required*|**Example** : `"string"`|enum (ContainerTaskSpec, SparkTaskSpec)|



