import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Animated,Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,   } from 'native-base';
import Card from '../components/Card';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Entypo } from 'react-native-vector-icons';
import { device} from '../constants';
import {  Picker } from "native-base";
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper'
import ShowScroller from './showscards'
const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import { MaterialIcons } from 'react-native-vector-icons';
import { Feather } from 'react-native-vector-icons';
import { FontAwesome } from 'react-native-vector-icons';
import { Rating, AirbnbRating } from 'react-native-elements';
import MapView from "react-native-maps";
import { Ionicons } from 'react-native-vector-icons';

import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';

import { LinearGradient } from 'expo-linear-gradient';

import { ThemeContext } from 'react-navigation';

class Job extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
      loading: true,
           region: {
             latitude:32.5534246,
             longitude:35.8610753,
             latitudeDelta: 0.001,
             longitudeDelta: 0.001
           },

           isNavBarHidden: true,
           isMapReady: false,
           marginTop: 1,
           userLocation: "",
           regionChangeProgress: false,
       refreshing: false,
      myusername:'',
       offset: 0,
      posts:[],
heart:false,
scrollY: new Animated.Value(0)
,
      Duration:'popular',
      disabled:false,
      check:false,
      Additional: '-------------',
      spinner:false,

    };
    this.currentUserId=''
    this.arrayholder=[]
    this.filt=[]

    this.currentusername=''


  }





  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  _onRefresh = () => {
   this.setState({refreshing: true,firsts:true});
   this.DisplayPosts()

   firebaseApp
     .database()
     .ref('users/'+firebaseApp.auth().currentUser.uid)

     .once("value")
     .then(snapshot => {

this.setState({balance:snapshot.val().balance})
     });
 }
  onValueChange1(value: string) {
    this.setState({
      Duration: value,
      refreshing:true,
      firsts:true
    });
    this.DisplayPosts(value)
  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };
  displayCategories = (d) => {
    this.setState({refreshing:true})

    console.log("------------uid home ------ "+firebaseApp.auth().currentUser.uid);
    let uid =firebaseApp.auth().currentUser.uid
    console.log("------------uid uid ------ "+uid);
const refs =`Doors/${uid}`
    var ref = firebaseApp.database().ref(refs);//Here assuming 'Users' as main table of contents

    firebaseApp.database().ref(`Doors/${uid}`).once('value').then(snapshot => {
        // console.log(snapshot.val());
console.log('lalallaal-----'+snapshot.val());
         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

    let sort =items

if (this.state.Duration=='date') {
   sort = items.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);

  });

} else if(this.state.Duration=='open'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==false||word.secondlock ==false);

}else if(this.state.Duration=='close'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==true&word.secondlock ==true);

}else {
 sort =items
}


this.setState({ dataArray: Object.values(sort),spinner:false,refreshing:false},function(){this.arrayholder=Object.values(sort)});

    });
console.log(this.state.dataArray);
  }










 onBack() {
   this.setState({spinner:true})
   this.displayCategories(this.state.myuid)

     // Back from another screen
   }

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
header:null
  });
  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({ date: Moment(date).format('MMM Do YY') });

    this.hideDatePicker();
  };
  searchFilterFunction = text => {
    const newData = this.filt.filter(item => {
      const itemData = `${item.user.toUpperCase()}
      ${item.title.toUpperCase()}   ${item.type.toUpperCase()} ${item.reply.toUpperCase()} ${item.des.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ posts: newData });
  };
  onLike = (data,d) => {
    const newPostKey = firebaseApp.database().ref('posts').push().key

  firebaseApp.database().ref().child('Posts').child(data.postuid).child(d).push({
    likedby: firebaseApp.auth().currentUser.email
  })
  fetch('https://onesignal.com/api/v1/notifications',
   {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': "Basic NmIxNTQ4OWEtMzgzZi00YjI5LWFjM2EtYzdmNjYyYTUxNmZl",
     },
     body: JSON.stringify(
     {
       app_id: "092f9c3e-c1c4-4952-abdc-4dcd497ceddb",
       included_segments: ["All"],
       headings: {"en": "شخص ما قام بفتح بالتفاعل على منشورك"},
       android_sound: "fishing",
       data: {"puid": newPostKey, "new_message":true},
       ios_sound: "fishing.caf",
       contents: {"en": `شخص ما تفاعل ب ${d=='likedby'?'اعجبني':d=='sadedby'?'احزنني':d=='laughedby'?'اضحكني':d=='dislikedby'?'لم يعجبني':'لاشئ'}` },
filters: [{"field":"tag","key":"uid","relation":"=","value":data.writerId}],
     })
   })

   .then((responseData) => {
       console.log("Push POST:" + JSON.stringify(responseData));
       responseData.json()
   })
  this.notification(data.writerId,data.postuid)
};
notification=(d,notkey)=>{
  const newPostKey = firebaseApp.database().ref('like').push().key

  firebaseApp.database().ref(`notification/${d}/${newPostKey}`).update({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`شخص ما قام بالتفاعل على منشورك`,
      postuid:notkey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
     updatedAt: new Date().getTime()+(60*60*48*1000),
      notuid:newPostKey
  });

}
 onUnlike = (data,d) => {
  let ref = firebaseApp.database().ref('Posts').child(data.postuid).child(d);
    ref.orderByChild('likedby').equalTo(firebaseApp.auth().currentUser.email).once('value', snapshot => {
      let updates = {};
      snapshot.forEach(child => updates[child.key] = null);
      ref.update(updates);
  });
};
render(){


  const {navigation}=this.props
  const business = false
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>

<StatusBar hidden={true} />

<ScrollView style={{flex:1}}>
    <TouchableOpacity style={styless.slide1} >
    <ImageBackground style={{width: Dimensions.get('window').width,flex:1}} source={{uri:'https://miro.medium.com/max/8000/1*JrHDbEdqGsVfnBYtxOitcw.jpeg'}} >
<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position: 'absolute',top: 20,left: 20,justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>
<Ionicons name='ios-close-circle' size={40} color="#000000"/>
</TouchableOpacity>

    </ImageBackground>

    </TouchableOpacity>
      {this.state.isNavBarHidden?   <View style={{position: 'absolute',top:120,backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
           shadowOpacity: 0.4,
           shadowRadius: 3,
flex:1,
marginBottom:40,
alignSelf: 'center',
           shadowOffset: {
             height: 2,
             width: 0
           },
           //android
           elevation: 5,}}>
           <ScrollView
             contentContainerStyle={[gStyle.contentContainerss,{paddingTop: 10}]}
             style={gStyle.container[theme]}
             refreshControl={
                 <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this._onRefresh}
                   tintColor="#eb144c"
                 />
               }
           >
<Text style={styles.Title}>Mobile App Developer</Text>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5}}>
<View style={{flex:1,flexDirection: 'row'}}>
{business?<MaterialIcons name='business-center' size={15} style={{marginRight: 5}} color="black"/>:<FontAwesome name='map-marker' size={15} style={{marginRight: 5}} color="green"/>}
{business?<Text style={styles.times}  numberOfLines={1}>dsfsdfdsf</Text>:
<Text style={styles.time}  numberOfLines={1}>Irbid ,30 streets</Text>
}
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price]}  numberOfLines={1}>|</Text>
<Text style={[styles.price]}  numberOfLines={1}>Salary :</Text>

<Text style={[styles.price]}  numberOfLines={1}>5$/hr</Text>
</View>
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5}}>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price,{fontSize: 10,fontFamily: 'raleway'}]}  numberOfLines={1}>Categories :</Text>

<Text style={[styles.price,{fontSize: 10,fontFamily: 'raleway'}]}  numberOfLines={1}>Development & Design</Text>
</View>

</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5}}>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>Type :</Text>

<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>Local</Text>
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>|</Text>
<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>Position :</Text>

<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>Full Time</Text>
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>|</Text>
<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>Working hours :</Text>

<Text style={[styles.price,{fontSize: 10}]}  numberOfLines={1}>6</Text>
</View>
</View>

</ScrollView>
            </View>:null}
            {/*start of details*/}
            <View style={{
          flex:1,
          marginTop: 100,


        }}>


            <View style={styles.cards}>
            <Text style={gStyle.det}>Description</Text>
              <Text style={gStyle.p}>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci

          </Text>

              </View>
              <View style={styles.cards}>
              <Text style={[gStyle.det,{
                color:'#eb144c'
              }]}>Skills required</Text>

                <Text style={gStyle.p}>

{`We Fix:
All Computer software & hardware
Sell new computer
Replace old by new`}
            </Text>

                </View>
                <View style={styles.cards}>
                <View style={cstyles.head}>
          <View style={cstyles.profile}>
          <View style={cstyles.pimg}>
            <Thumbnail   borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={{uri:'https://cdnimgen.royanews.tv/imageserv/Size728Q40/news/20200323/20375.JPG'}} />
            </View>
          <View style={cstyles.names}>
          <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
          <Text numberOfLines={1} style={cstyles.name}>Ahmed khalid fedsdfsdff</Text>
          <Text style={[styles.time]}  numberOfLines={1}>Verfied</Text>

          </View>
          <Rating imageSize={20} readonly startingValue={4} style={styles.rating} />

          </View>
          </View>
          <View style={cstyles.edit}>
          <Button bordered style={{borderColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 10,borderRadius: 10}}>
          <Text style={[styles.time,{color:'#eb144c'}]}>View</Text>
          </Button>
          </View>
                </View>
                <View style={{flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>
    <View style={{flexDirection: 'row',marginHorizontal: 10}}>
    <MaterialIcons name='today' size={15} style={{marginRight: 5}} color="black"/>
                <Text style={[styles.type,{color:'black'}]}  numberOfLines={2}>Sunday, Monday, Tuesday, Wednesday, Thursday,Friday</Text>
    </View>
    <View style={{flexDirection: 'row',marginHorizontal: 10}}>
    <MaterialIcons name='access-time' size={15} style={{marginRight: 5}} color="black"/>

                <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>5:00 AM - 6:30 PM</Text>
    </View>
    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

    <FontAwesome name='facebook-square' size={15} style={{marginRight: 5}} color="blue"/>
    <FontAwesome name='instagram' size={15} style={{marginRight: 5}} color="#eb144c"/>
    <FontAwesome name='twitter' size={15} style={{marginRight: 5}} color="#1DA1F2"/>
    <FontAwesome name='linkedin-square' size={15} style={{marginRight: 5}} color="#0e76a8"/>

    </View>
                </View>
                  </View>
                <View style={[styles.cards,{display: "flex",flex:1}]}>
                <Text style={[gStyle.det]}>Location</Text>
                <MapView
                  style={styles.map}
region={this.state.region}
                  showsUserLocation={true}
                >
                <MapView.Marker
                 coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                 title={"Service Location"}
                 draggable
               />
                </MapView>

                  </View>


              </View>
              </ScrollView>
              <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',alignSelf: 'center',width: '100%',padding: 20}}>

            <Button block style={{justifyContent: 'center'
            ,alignItems: 'center',padding: 20,width: '100%',borderRadius: 10,backgroundColor: '#eb144c'}}>
<Text style={{fontSize: 12,fontFamily: 'Cairo-Regular',color: 'white'}}>Submit an application</Text>
            </Button>
              </View>

    </View>
  )}

</ThemeContext.Consumer>
  )
}

};


/*
// shoutout @notbrent: https://snack.expo.io/H105kxsG7
const shouldShowBackButton = stackRouteNavigation => {
  const parent = stackRouteNavigation.dangerouslyGetParent();
  return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
};

SettingsScreen.navigationOptions = ({ navigation }) => ({

headerLeft: !shouldShowBackButton(navigation) ? (
  <View style={{ flex: 1 }}>
    <Text>left</Text>
  </View>
) : null,
*/
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex:1,
    width: Dimensions.get('window').width-30,

  },
  map: {
    width:Dimensions.get('window').width-30,
    height: 200
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
  slide2: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width-30,

    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width-30,

    backgroundColor: '#92BBD9'
  },
  Title:{
    fontFamily: 'Cairo-Regular',
    fontSize: 21,
    textAlign: 'left'
  },
  time:{
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color:'green',
    textAlign: 'left',
    marginHorizontal: 2
  },
  times:{
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
    color:'black',
    marginHorizontal: 2
  },
  price:{
    fontFamily: 'Cairo-Regular',
    fontSize: 17,
    color:'black',
marginRight: 5
  },
  type:{
    fontFamily: 'raleway',
    fontSize: 12,
    color:'#eb144c',
    textAlign: 'left',
  },
  cards:{backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 3,
  paddingVertical: 20,
  flex:1,
  marginTop: 20,
  alignSelf: 'center',
    shadowOffset: {
      height: 1,
      width: 0
    },


    alignItems: 'center',
    justifyContent: 'flex-start',
    //android
    elevation: 2},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
const styless = StyleSheet.create({
  wrapper: {},
  slide1: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width/2

  },
  slide2: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
const cstyles = StyleSheet.create({
head:{
  flex:1,
  flexDirection: 'row',
},
profile:{
  flex:8,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
},
edit:{
  flex:2,

  justifyContent: 'center',
  alignItems: 'center'
},
edits:{
  flex:2,

  justifyContent: 'center',
  alignItems: 'flex-end'
},
pimg:{
  flex:3,


},
footericon:{
  flex:8,

  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'row'
},
iconname:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',

  alignItems: 'center'
},
likesname:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'flex-start',

  alignItems: 'center'
},
names:{
  flex:8,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
padding: 10,
  flexDirection: 'column'
},
body:{
  paddingVertical: 20,
  flex:1,

},
likes:{
  color:'#800020',
  marginHorizontal: 10
},
comment:{
  color:'black',
    marginHorizontal: 10
},
name:{
  fontFamily: 'Cairo-Regular',
  marginVertical: 2
},
time:{
  fontFamily: 'Cairo-Regular',
  fontSize: 12
},
image:{
  width: '100%',
  height: 200,
  resizeMode: 'contain',
  flex:1,
  borderRadius: 40,
  marginTop: 10
}
});
export default Job;
