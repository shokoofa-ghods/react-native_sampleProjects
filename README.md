# react-native Sample Projects
<br/>


## simple list of people app
on this project you can add or delete from list and also the contents of the list,
will be stored in your file system provided that you allow the external storage accession.

### details
- accession to local storage
- 'PermissionsAndroid' library  
- write and read from file
- add/delete users from list

</br>


## simple coordination finder app
this app is set to get longitude and atitude to ascertain the exact coordination on page using map

### details
- using google maps API

for integrating Google Maps into React Native App on Android follow bellow instructions

+ `npm install --save react-native-maps`
+ Create a Google Maps API Key
+ Create a Google Maps API Key under AndroidManifes.xml file under the “android/app/src/main/” folder
+ you need to add lines in build..gradle file for more information about lines visit following [webpage](https://medium.com/@samil.mehdiyev/integrating-google-maps-into-react-native-app-on-android-40c984c0e4f2). 
</br>


### note
+ after cloning the project run npm install or yarn to get the node_module folder
+ then run npx react-native run-android
