import * as React from 'react';
//import { SnackSession } from 'snack-sdk';
import { AppRegistry,Platform,KeyboardAvoidingView,Alert,Text, View, StyleSheet,FlatList,Image,TouchableOpacity ,ToastAndroid,TextInput ,Button,AsyncStorage} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import * as RNFS  from 'react-native-fs';
import VersionCheck from 'react-native-version-check';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import File from './components/File';


export async function request_writeFile_runtime_permission() {
  try {
     var granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      { //'title': 'ReactNativeCode Write File Permission',
        'message': 'ReactNativeCode App needs access to your external storage'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("By your permission we can access to your external storage");
    }
    else {
      Alert.alert("Access To External Storage Permission Not Granted");
    }
  } catch (err) {
    console.warn(err)
  }
  return(granted)
}


export default class App extends React.Component {

  //CONST_KEY_1;
constructor(props){
super(props);

 this.state={
    items:[],
  ff:{fullname:'',
  email:'',
  url:'',
 },
}

}


  handleName= (text)=>{
      this.setState({ff:{fullname:text}})
}

  handleEmail= (text)=>{
    this.setState({ff:{...this.state.ff,email:text}})
  }

  handleUrl= (text)=>{
    this.setState({ff:{url1:text}})
  }



 newAdd(){
     const name1=this.state;
     this.setState({
     items:[this.state.ff,...this.state.items]
   })
   this.saveFile();

     console.log(Platform.Version);
   //this.addData();
   //this.readFile();
 }

delete(){
  const result =this.state.items.findIndex(obj => obj.fullname==this.state.ff.fullname)
  console.log(result);
      if (result > -1) {
  this.state.items.splice(result, 1);
    this.setState({
    items:[...this.state.items]
    })
  console.log(this.state.items);
  }
   else {
  Alert.alert('Alert', 'this name doesn'+"'t exist in the list to be deleted")
   }
}

fisrtSaveFile(){
var RNFS = require('react-native-fs');
var path = RNFS.ExternalCachesDirectoryPath + '/test.txt';
RNFS.writeFile(path, JSON.stringify(this.state.items) , 'utf8')
 .then((success) => {
   console.log('FILE WRITTEN! 1');
 })
 .catch((err) => {
   console.log(err.message);
 });
}

 async saveFile (){
   const perResult=await request_writeFile_runtime_permission()
   console.log(perResult)
    if(perResult=='granted'){
   const name2=this.state;
var RNFS = require('react-native-fs');
var path = RNFS.ExternalCachesDirectoryPath + '/test.txt';
RNFS.writeFile(path, JSON.stringify(name2) , 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN! 2');
  })
  .catch((err) => {
    console.log(err.message);
  });
  this.readFile();
  }
  else {
    Alert.alert('','The name has added in your list but has not WRITTEN to your external file')
  }
}



readFile(){
  const name1=this.state;
  var path = RNFS.ExternalCachesDirectoryPath + '/test.txt';
  RNFS.readDir(RNFS.ExternalCachesDirectoryPath)
  .then((result) => {
  console.log('GOT RESULT', result);
  return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
  if (statResult[0].isFile()) {
  return RNFS.readFile(statResult[1], 'utf8');
  }
  return 'no file';
  })
  .then((contents) => {
  let obj = JSON.parse(contents);
  this.setState({
  items:[...obj.items]
  })
  console.log(JSON.stringify(this.state.items));
  })

  .catch((err) => {
  console.log('f :'+err.message, err.code);
  });
  }


  renderItem=({item})=>{

return(
    <View style={styles.container}>
<Text style={{padding:10,fontWeight:'bold',	textAlignVertical : 'center'}}>{item.fullname}</Text>
<Text style={{fontSize:15,color:'#39F',textAlignVertical :'center'}}>{item.email}</Text>
</View>
)
}

renderseparator=()=>{
  return(
    <View style={{height:1,width:'100%',backgroundColor:'#AAF'}}></View>
  )
}


 componentDidMount(){
   const url='http://www.json-generator.com/api/json/get/cgfUkfyayG?indent=2'

     fetch(url)
     .then((response)=>response.json())
      .then((responseJson)=>{
         this.setState({
      items:[...responseJson.items]
         })
          this.fisrtSaveFile()
       })
    .catch((error)=>{console.log(error)});
 }

 // async componentDidMount({
 //   await request_writeFile_runtime_permission()
 // })

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.navBar} >
<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset = { 0} style = {{ flex: 1 }}>

<TextInput style = {{margin: 15,height: 40,width: 300, borderWidth: 1,borderColor: 'white'}} placeholder = 'add name'
value={this.state}
onChangeText = {this.handleName}/>

<TextInput style = {{margin: 15,height: 40,width: 300, borderWidth: 1,borderColor: 'white'}} placeholder = 'add email'
value={this.state}
onChangeText = {this.handleEmail}/>


<Button style={{size: 15,color: "white",backgroundColor: "#FFFFFF",  flex: 1 }} title='add' onPress={()=>this.newAdd()}/>
<Button style={{size: 15,color: "white"}} title='delete' onPress={()=>this.delete()}/>

</KeyboardAvoidingView>
</View>
<View style={styles.body} >
  <KeyboardAvoidingView behavior='position' keyboardVerticalOffset ={ -500}  >
        <FlatList
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={(item,index)=>index}
          ItemSeparatorComponent={this.renderseparator}
        />
        </KeyboardAvoidingView>
      </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('File',()=>App)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column',
    //padding: 8,
  },
  navBar: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5CF',
    height: 5,
  },
  body: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    //paddingTop: Constants.statusBarHeight,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
