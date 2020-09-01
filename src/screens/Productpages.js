import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Share,Animated,Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl,AsyncStorage } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Fab} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,   } from 'native-base';
import Card from '../components/Card';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import { device} from '../constants';
import {  Picker } from "native-base";
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper'
import ShowScroller from './showscards'
const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  Feather  from 'react-native-vector-icons/Feather';
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-elements';
import MapView from "react-native-maps";
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Lightbox from 'react-native-lightbox';
import moment from 'moment';
import _ from 'lodash'


import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';


import { ThemeContext } from 'react-navigation';
const HEADER_MAX_HEIGHT = 0;
const HEADER_MIN_HEIGHT = 0;
const PROFILE_IMAGE_MAX_HEIGHT = 0;
const PROFILE_IMAGE_MIN_HEIGHT = 0;
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Productpages extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
       active: false,
      setDatePickerVisibility: false,
      myuid:'',
      uid:  props.navigation.getParam('uid',''),
checks:[],
      businessdata:[],
imgs:[],
      loading: true,

           isNavBarHidden: true,
           isMapReady: false,
           marginTop: 1,
           userLocation: "",
           regionChangeProgress: false,
       refreshing: false,
      myusername:'',
       offset: 0,
      posts:[],
      login:false,
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
    this.saved=[]

    this.currentusername=''


  }



  DisplayPosts = (d) => {
    this.setState({refreshing:true})


    firebaseApp.database().ref(`Ads`).orderByChild('user').equalTo(d.user).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           if (d.postuid !==child.val().postuid) {
               items.push(child.val());
           }



        });
  let sort = items

  this.setState({ check:false,disabled:false,posts: Object.values(sort),spinner:false,refreshing:false,firsts:false},function(){
  this.filt=Object.values(sort)
  });

    });
  }
async componentDidMount() {
  firebaseApp.auth().onAuthStateChanged(user => {
if (user) {
  this.setState({login:true})

}
  })
    firebaseApp.database().ref('Ads/' + this.state.uid).on('value',
    (snapshot) => {






       let available =[]
      if (snapshot.val()) {


        this.setState({
businessdata:snapshot.val(),
imgs:snapshot.val().img
        })


this.DisplayPosts(snapshot.val())
      }
      else {
        return null
      }
    })

  }
   sharesocial= async () => {

     try {
       const result = await Share.share({
         message: `
        ${this.state.businessdata.title}
        ${this.state.businessdata.price}

        Ramtha sooq سوق الرمثا
      Google Play
         https://play.google.com/store/apps/details?id=com.opentiq.ramthasooq
`,
       });

       if (result.action === Share.sharedAction) {
         if (result.activityType) {
           // shared with activity type of result.activityType
         } else {
           // shared
         }
       } else if (result.action === Share.dismissedAction) {
         // dismissed
       }
     } catch (error) {
       alert(error.message);
     }
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







deletess=(data)=>{
  var updates = {};
updates[`Ads/${data.postuid}`] = null;
return firebaseApp
.database()
.ref()
.update(updates)
}
 incs=(data)=>{

if (this.state.check!=true) {
   this.setState({check:true})
  firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              console.log('existsssss');
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) - 1;
              })
this.deletess(data,'likesuser')



            }
            else{
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) + 1;
              })
              let updates = {}
              firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

            }
          })
}




 }
 laugh=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'laughusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 sad=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'sadusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 dis=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
 this.deletess(data,'disusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 isInArray=(d, userEmail)=> {
    return d.indexOf(userEmail.toLowerCase()) > -1;
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
   removeElement=(array, elem) =>{
  array.filter(evento => evento !== elem);
}

onsave =async(d)=>{
  let newIds =[]
  console.log("check    "+this.saved);

  if (this.isInArray(this.saved,d)) {
    newIds = this.saved

  newIds = newIds.filter((entity) => {
     return entity!==d
   });
   this.saved=newIds
console.log("nont array    "+this.saved);

    this.setState({heart:false})

  }else {


        console.log("sedc"+d);
        newIds = this.saved.push(d)
        this.saved =newIds
        console.log("------------ "+newIds+'---------'+this.saved);
        this.setState({heart:true})

  }
  console.log("ssssssss");

  try {
    await AsyncStorage.setItem('@MySupersStore:key', JSON.stringify(newIds));
  } catch (error) {
    // Error saving data
  }



}
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

  firebaseApp.database().ref().child('Ads').child(data.postuid).child(d).push({
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
unsave=(d)=>{



}
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
  let ref = firebaseApp.database().ref('Ads').child(data.postuid).child(d);
    ref.orderByChild('likedby').equalTo(firebaseApp.auth().currentUser.email).once('value', snapshot => {
      let updates = {};
      snapshot.forEach(child => updates[child.key] = null);
      ref.update(updates);
  });
};
render(){
  const headerHeight = this.state.scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [0, 70],
    extrapolate: 'clamp'
  });
  const profileImageHeight = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  const profileImageMarginTop = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5
    ],
    extrapolate: 'clamp'
  });
  const headerZindex = this.state.scrollY.interpolate({
    inputRange: [0,  0, 120],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp'
  });

  const headerTitleBottom = this.state.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        5 +
        PROFILE_IMAGE_MIN_HEIGHT +
        26
    ],
    outputRange: [-20, -20, -20, 0],
    extrapolate: 'clamp'
  });


  const {navigation}=this.props
  const {businessdata,imgs}=this.state
  let userEmail = this.state.login?firebaseApp.auth().currentUser.email:'info@opentiq.com';
let  liked = businessdata.likedby ? Object.values(businessdata.likedby).map((project)=>{
    return project.likedby;
  }) : [];
  const business = false
  return (

    <View style={{flex:1}}>

    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'whitesmoke',
        height: headerHeight,
        zIndex: headerZindex,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: headerZindex, //required for android
        alignItems: 'center',
        shadowColor: '#000',
         shadowOpacity: 0.4,
         shadowRadius: 3,
         shadowOffset: {
           height: 1,
           width: 0
         },

      }}
    >
    <View style={{flex:2,justifyContent: 'center',alignItems: 'center'}}>
    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

    <Ionicons name='ios-close-circle' size={40} color="#000000"/>
    </TouchableOpacity>
    </View>

    <View style={{flex:8,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>

    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

    <Text style={[styles.price]}  numberOfLines={1}>{businessdata.price}</Text>
  { this.state.login? <Button  onPress={this.isInArray(liked, userEmail)?()=>this.onUnlike(businessdata,'likedby'):()=>this.onLike(businessdata,'likedby')} transparent style={{justifyContent: 'center',alignItems: 'center'}}>

    <FontAwesome name={this.isInArray(liked, userEmail)?'heart':'heart-o'} size={20} style={{marginRight: 10}} color={this.isInArray(liked, userEmail)?'#800020':'#800020'}/>
    </Button>:<Button  onPress={()=>navigation.navigate('SettingsStack')} transparent style={{justifyContent: 'center',alignItems: 'center'}}>

      <FontAwesome name={'heart-o'} size={20} style={{marginRight: 10}} color={'#800020'}/>
      </Button>}
    <Button block onPress={()=>{Linking.openURL(`tel:${businessdata.Adphone}`)}} style={{backgroundColor: '#800020',justifyContent: 'center',alignItems: 'center',padding: 20,alignSelf: 'flex-end',borderRadius: 10}}>
    <Text style={[styles.time,{color:'#fff'}]}>تواصل</Text>
    </Button>
    </View>

    </View>
    </Animated.View>
  <StatusBar hidden={true} />

  <ScrollView style={{flex:1}}   scrollEventThrottle={16}
      onScroll={Animated.event([
        { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
      ])}>
      <View style={styless.slide1}>


      <ImageBackground style={{width: Dimensions.get('window').width,flex:1}} source={{uri:imgs?imgs[0]:"https://i.ibb.co/VtfQWmF/placeholder-image-300x207.png"}} >
      <View style={{position: 'absolute',top: 0,height: 50,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width:Dimensions.get('window').width,backgroundColor: 'rgba(0,0,0,0.2)',paddingHorizontal: 20}}>
      <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',paddingHorizontal: 2}}>
      <Ionicons name='ios-close' size={40} color="#fff"/>
      </TouchableOpacity>
      <View style={{flexDirection: 'row',justifyContent: 'space-around',alignSelf: 'center'}}>
      { this.state.login?   <TouchableOpacity onPress={this.isInArray(liked, userEmail)?()=>this.onUnlike(businessdata,'likedby'):()=>this.onLike(businessdata,'likedby')} transparent style={{justifyContent: 'center',alignItems: 'center'}}>

      <FontAwesome  name={this.isInArray(liked, userEmail)?'heart':'heart-o'} size={20} style={{marginRight: 10}} color={this.isInArray(liked, userEmail)?'#800020':'#fff'}/>
      </TouchableOpacity>: <TouchableOpacity onPress={()=>navigation.navigate('SettingsStack')} transparent style={{justifyContent: 'center',alignItems: 'center'}}>

      <FontAwesome  name={'heart-o'} size={20} style={{marginRight: 10}} color={'#fff'}/>
      </TouchableOpacity>}

      <TouchableOpacity onPress={this.sharesocial} style={{justifyContent: 'center',alignItems: 'center',padding: 7}}>
      <Ionicons name='md-share' size={25} color="#fff"/>
      </TouchableOpacity>
  {this.state.admin?    <TouchableOpacity onPress={()=>this.deletess(businessdata)} style={{justifyContent: 'center',alignItems: 'center',padding: 7}}>
      <Ionicons name='md-close' size={30} color="#800020"/>
      </TouchableOpacity>:null}
      </View>
      </View>
  </ImageBackground>

      </View>

  {this.state.isNavBarHidden?   <View style={{position: 'relative',top:-25,backgroundColor: 'white',width: Dimensions.get('window').width,paddingHorizontal: 20,borderTopLeftRadius:  15,borderTopRightRadius: 15,  shadowColor: '#000',
       shadowOpacity: 0.4,
       shadowRadius: 3,
  flex:1,

  alignSelf: 'center',
       shadowOffset: {
         height: 2,
         width: 0
       },
       //android
       elevation: 5,}}>
       <ScrollView
         contentContainerStyle={[gStyle.contentContainerss,{paddingTop: 10,marginBottom: 30}]}
         style={gStyle.container['light']}
         refreshControl={
             <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this._onRefresh}
               tintColor="#eb144c"
             />
           }
       >
  <Text style={styles.Title}>{businessdata.title}</Text>
  <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5}}>
  <View style={{paddingStart:10,paddingEnd:10,justifyContent: 'flex-start',flex: 1,flexDirection: 'row',alignItems: 'center'}}>
  <View  style={{ width: 0,
  height: 0,
  borderEndWidth:12,
  borderBottomWidth: 17,
  borderTopWidth: 17,
  borderEndColor:'#800020',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent'}}/>
  <View style={{height: 17*2,paddingStart:10,paddingEnd:10,justifyContent: 'center',backgroundColor: '#800020'}}>
  <Text style={[styles.price,{fontSize: 15,color: '#fff'}]}  numberOfLines={1}>{businessdata.price}</Text>
  </View>


  </View>
  <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>


  <Button onPress={()=>{Linking.openURL(`tel:${businessdata.Adphone}`)}} block style={{backgroundColor: '#0693e3',justifyContent: 'center',alignItems: 'center',padding: 20,alignSelf: 'flex-end',borderRadius: 10,shadowColor: "#000",
  shadowOffset: {
  width: 2,
  height: 7,
  },
  marginHorizontal: 4,
  shadowOpacity: 0.41,
  shadowRadius: 9.11,

  elevation: 12}}>
  <Icon name="phone-call" type="Feather"/>
  </Button>
  </View>
  </View>
  <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

  <Text style={[styles.type]}  numberOfLines={1}>{businessdata.section=='اختر فرع'?'':businessdata.section} {businessdata.section=='اختر فرع'?'':'-'} {businessdata.hsection} - {businessdata.typeofservice}</Text>
  <Text style={[styles.price,{fontFamily: 'raleway',fontSize: 12}]}  numberOfLines={1}>{moment(businessdata.createdAt).fromNow()}</Text>

  </View>

  </ScrollView>
        </View>:null}
        {/*start of details*/}
        <View style={{
      flex:1,
      marginTop: 5,


    }}>

        <View style={styles.cards}>
        <Text style={gStyle.det}>تفاصيل</Text>
          <Text style={gStyle.p}>
          {businessdata.about}
      </Text>

          </View>


          <View style={[styles.cards,{display: "flex",flex:1}]}>
          <Text style={[gStyle.det]}>صور من الاعلان</Text>
        {imgs?  <Swiper style={styles.wrapper} showsPagination={true} autoplay height={200}>

          {imgs&&imgs.map((img)=>{return(
            <View style={styless.slide2}>
            <Lightbox underlayColor="white">
            <Image style={{width: Dimensions.get('window').width,height: '100%',resizeMode: 'contain'}} source={{uri:img}} />
  </Lightbox>
  </View>
          )})}


               </Swiper>
  :null}
            </View>

            <View style={[styles.cards,{display: "flex",flex:1}]}>
            <Text style={[gStyle.det]}>موقع الاعلان</Text>
          {businessdata.region? <MapView
              style={styles.map}
  region={businessdata.region}
  onPress={()=>{Linking.openURL(`https://maps.google.com/?q=${businessdata.region.latitude},${businessdata.region.longitude}`)}}

              showsUserLocation={true}
            >
            <MapView.Marker
             coordinate={{ "latitude": businessdata.region.latitude, "longitude": businessdata.region.longitude}}
             title={"Service Location"}
             draggable
           />
            </MapView>:null}

              </View>
              <View style={styles.cards}>
              <View style={cstyles.head}>
        <View style={[cstyles.profile,{flex:1}]}>
        <View style={cstyles.pimg}>
          <Thumbnail   borderRadius={9} style={{borderRadius: 9,width: '100%',resizeMode: 'contain'}} source={require('../assets/users.png')} />
          </View>
        <View style={[cstyles.names]}>
        <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
        <Text numberOfLines={1} style={cstyles.name}>{businessdata.user}</Text>
        <Button onPress={()=>this.props.navigation.navigate('Adsprofile',{uid:businessdata.writerId})} bordered style={{borderColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 10,borderRadius: 10}}>
        <Text style={[styles.time,{color:'#eb144c'}]}>تابع المعلن</Text>
        </Button>
        </View>

        </View>
        </View>

              </View>

                </View>
           <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1,paddingHorizontal:10}}>

              </View>

          </View>

          </ScrollView>

          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="chatbubbles"  />
        <Button onPress={()=>{Linking.openURL(`https://wa.me/${businessdata.Adwhats}?text=${businessdata.title}`)}} style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button onPress={()=>{Linking.openURL(`tel:${businessdata.Adphone}`)}} style={{ backgroundColor: '#3B5998' }}>
              <Icon name="phone-call" type="Feather"/>
            </Button>
            <Button onPress={()=>{Linking.openURL(`sms:${businessdata.Adphone}`)}}  style={{ backgroundColor: '#DD5144' }}>
              <Icon name="sms" type="MaterialIcons"/>
            </Button>
          </Fab>
  </View>

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
    height: 200,
    margin: 5,
    borderRadius: 12
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
    fontFamily: 'Cairo-Bold',
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
    fontFamily: 'Cairo-Bold',
    fontSize: 17,
    color:'black',
marginRight: 5
  },
  type:{
    fontFamily: 'Cairo-Regular',
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
  fontFamily: 'Cairo-Bold',
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
export default Productpages;
