import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import Polyline from 'react-native-maps';



 class App extends React.Component {
   constructor(props)
   {
   super(props);
   this.state = ({
     lat:76.8,
     long:24.56,
   markers :[{coordinate:{latitude:37.78821,longitude: -122.4324}},
            {coordinate:{latitude:37.78821,longitude: -122.4324}} ]
});
   }

handleLat=(text)=>{
  this.setState ({ lat:+text })
  // console.log(this.state.lat)
}

handleLong=(Var)=>{
  this.setState ({ long:+Var })
}

 changeCo=()=>{
   console.log(this.state.lat)
   console.log(this.state.long)
   this.setState ({ markers:[...this.state.markers,{coordinate:{latitude:+this.state.lat,longitude:+this.state.long}}] })
   console.log(this.state.markers);
 }


  render() {
  return (
// {/* <ScrollView keyboardShouldPersistTaps="handled"> */}
  <View style={styles.page}>
   <View style={styles.navBar}>
     <TextInput
       style={styles.textinputR}
       placeholder="add latitude"
       keyboardType={'numeric'}
       value={this.state.lat}
       onChangeText={this.handleLat}
     />
     <TextInput
       style={styles.textinputR}
       placeholder="add longitude"
       keyboardType={'numeric'}
       value={this.state.long}
       onChangeText={this.handleLong}
     />
    <Button style={{size: 15, color: 'white'}} title="add" onPress={this.changeCo}
    />
   </View>

  <View style={styles.container}>
    <MapView style={styles.map}
        initialRegion={{
           latitude: 37.78821,
           longitude: -122.4324,
           latitudeDelta: 0.0,
           longitudeDelta: 0.0,
           }}
           mapType='none'
           // onPress={(e)=>
           //   this.setState ({ markers:[...this.state.markers,{coordinate:e.nativeEvent.coordinate}] }) }>
          >
          {this.state.markers.map((marker ,i)=>(
             <MapView.Marker
               key={i}
               coordinate={marker.coordinate}
               title={'hello'}
               description={"description"} />
          ))}
          {this.state.markers.map((mark,i)=>(
            <Polyline
              key={i}
              coordinate={mark.coordinate}
              strokeColor='#000'
              strokeWidth={6} />
          ))}

      </MapView>
    </View>
  </View>
// </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  map :{
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'red'
  },
  navBar: {
    flex: 0.2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8a',
    height: 20,
    width: 360,
  },
  textinputR: {
    marginRight: 10,
    height: 36,
    width: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
  // textinputL: {
  //   marginRight: 5,
  //   height: 36,
  //   width: 150,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   borderColor: 'white',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});
export default App;
