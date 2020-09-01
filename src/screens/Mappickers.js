import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';
import Geolocation from '@react-native-community/geolocation';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Trainer from '../components/Trainer';
import moment from 'moment';
import 'moment/src/locale/ar'

const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';
import * as firebase from 'firebase';

import { Button,Header,Item,Icon,Input } from 'native-base';
import NavigationBack from '../components/NavigationBack';

import MapView from "react-native-maps";

import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
  header:null
  });

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',

        text:'',
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        commentsRef:'',
        search:'',
        fetch:'false',
        loading: true,
             region: {
               latitude:10,
               longitude: 10,
               latitudeDelta: 0.001,
               longitudeDelta: 0.001
             },
             isMapReady: false,
             marginTop: 20,
             userLocation: "",
             regionChangeProgress: false,

        dataSources: [],
        searched:[],
        commentsRefs:'',
    };
    this.arrayholder=[]
    this.datas=[]
this.users=[ {
  title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
first:'#800020',
second:'steelblue',
  username:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,
},


]
this.currentUserId=''
this.currentusername=''
this.arrayholder=[]


  }


async componentDidMount(){
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION

Geolocation.getCurrentPosition(
    (position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      };
      this.setState({
        region: region,
        loading: false,
        fetch:'still',
        error: null,
      });
    },
    (error) => {
      alert(error);
      this.setState({
        error: error.message,
        loading: false
      })
    },
    { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },

  );
 }

onMapReady = () => {
  this.setState({ isMapReady: true, marginTop: 0 });
}

fetchAddress = () => {
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyBgUqmdbJVF8uUENYrgOVlfm9Kaz5NI5uI")
    .then((response) => response.json())
    .then((responseJson) => {
      const userLocation = responseJson.results[0].formatted_address;
      this.setState({
        userLocation: userLocation,
        regionChangeProgress: false,
        fetch:'true'
      });
    });
}

onRegionChange = region => {
  this.setState({
    region,
    regionChangeProgress: true
  })
}
onLocationSelect = () => alert(this.state.userLocation);
findCoordinates = () => {
  Geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

  displayCategories = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("notification/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         friend =[]
         snapshot.forEach((child) => {


  items.push(child.val());


        });
        sort = items.sort(function(a, b) {
         // Turn your strings into dates, and then subtract them
         // to get a value that is either negative, positive, or zero.
         return new Date(b.createdAt) - new Date(a.createdAt);

       });

        this.setState({ dataSources:Object.values(sort),searched:Object.values(items),spinner:false},function(){
          this.arrayholder=items
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }

    create = (d) => {
      this.setState({
        ploading:true,
        postStatus: 'جاري الارسال..',
        shows:true,pcolor:'warning'
      })
      const newPostKey = firebaseApp.database().ref('friends').push().key

            const uid = firebaseApp.auth().currentUser.uid



            const postData = {
              userId:d.userId,
              username:d.username,
          accept:false,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,

            }
            let updates = {}
            let updatess = {}

            updates['friends/' + uid+'/'+d.userId] = postData

              //  updates["data/"+newPostKey+'/name'] =state.tag
      //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

            firebaseApp.database().ref().update(updates)
            .then(() => {
              this.setState({
                              postStatus: 'تم شكرا لك.',
                          refreshing:true,

                            })

    alert('تم ارسال طلب الصداقة')


            })
            .catch(() => {
              this.setState({ postStatus: 'Something went wrong!!!',pcolor:'#800020' })
            })

          .catch(error => {
            console.log(error)
          })








    }
    deletereq=(d)=>{
      firebaseApp.database().ref(`friendsreq/${d.userId}/${firebaseApp.auth().currentUser.uid}`).on('value', function(snapshot) {
    snapshot.ref.remove();
    })
    firebaseApp.database().ref(`friendsreq/${firebaseApp.auth().currentUser.uid}/${d.userId}`).on('value', function(snapshot) {
  snapshot.ref.remove();
  })
    }
   accepts=(d)=>{



             firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).child(d.userId.toLowerCase()).set(d.username)

             firebaseApp.database().ref(`friends/${d.userId}`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)
          this.deletereq(d)
this.displayCategories()


    }
    deletes=(d)=>{

console.log(d);
            firebaseApp.database().ref(`friends`).equalTo(d).on('value', function(snapshot) {
          snapshot.ref.remove();
          })
          firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).on('value', function(snapshot) {
        snapshot.ref.remove();
        })
 this.displayCategories()


     }


  render() {
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    let trLocale = require('moment/locale/ar');
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={styles.container}>
         <View style={{ flex: 2 }}>

             <MapView
               style={{ ...styles.map, marginTop: this.state.marginTop }}
               initialRegion={this.state.region}
               showsUserLocation={true}
                region={this.state.region}
               onMapReady={this.onMapReady}
               onRegionChangeComplete={this.onRegionChange}
             >
                <MapView.Marker
                 coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                 title={"Your Location"}
                 draggable
               />
             </MapView>



         </View>
         <View style={styles.deatilSection}>
         <ScrollView>
           <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "roboto", marginBottom: 20 }}>اختر موقع الاعلان</Text>
           <Text style={{ fontSize: 10, color: "#999" }}>Long,lat</Text>
             <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
               {this.state.region.longitude},{this.state.region.latitude}</Text>
              
<Button danger onPress={()=>{
  this.props.region(this.state.region)
this.props.onPressclose()
}} style={{justifyContent: 'center'}}>
<Text style={{color: '#fff'}}>
اضف موقع للاعلان
</Text>
</Button>
<Button light onPress={this.props.onPressclose} style={{marginVertical: 10,justifyContent: 'center'}} >
<Text style={{color:'black'}}>
الغاء
</Text>
</Button>
</ScrollView>
         </View>
       </View>
    )}

  </ThemeContext.Consumer>

    );
  }


_renderRow = (data) => {

  this.users.map((data, index) => {
    return(
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={require('../assets/account.png')} />
        </Left>
        <Body>
          <Text style={gStyle.text[theme]}>@{data.user}</Text>
          <Text style={gStyle.text[theme]} note numberOfLines={1}>{data.username}</Text>
        </Body>
        <Right>
          <Button transparent onPress={()=>navigation.navigate('Write',{data,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={gStyle.text[theme]}>اكتب</Text>
          </Button>
          <Button transparent onPress={()=>navigation.navigate('Write',{data,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={[gStyle.text[theme],{color:'#800020'}]}>اضف كصديق</Text>
          </Button>
        </Right>
      </ListItem>)})


}

}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width
  },
  map: {
    flex: 1
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%'
  },
  mapMarker: {
    fontSize: 40,
    color: "#800020"
  },
  deatilSection: {
    flex: 2,
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    justifyContent: "flex-start"
  },
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    width: Dimensions.get("window").width - 20,
    position: "absolute",
    bottom: 100,
    left: 10
  }
});
