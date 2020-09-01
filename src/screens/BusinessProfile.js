import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Footer, FooterTab} from 'native-base';
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
import {  Tab, Tabs } from 'native-base';
import Services from './Services'
import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';
const offers = [
  {
    title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
    user:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,
  },
  {
    title: 'بهوايا انت قاعدة معايا عينيكي ليا مرايا',
    description: 'When you subscribe 1 year on openshop apps',
    first:'#800020',
  second:'steelblue',
      user:'samisami',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:false,
  },
  {
    title: 'باب الكراهية',
    first:'#800020',
  second:'steelblue',
      user:'ahmed',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:true,
  },



];
import { LinearGradient } from 'expo-linear-gradient';

const posts = [
  {
    type:'قبل التحدي',
    user:'sameranas',
    NewChallenge:false,
    title:'التحدي',
des:'يجب عليك ان تضيف صورتك وانت صغير',
reply:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
image:'https://previews.123rf.com/images/bogumil/bogumil1306/bogumil130600035/20420629-young-kid-is-going-to-school.jpg',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:false,
love:1,
laugh:0,
sad:0,
dislike:0
  },
  {
    type:'اختار الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'السؤال',
des:'هل بكيت يوما من اجل شخص؟',
reply:'لا لم ابكي يوما',
image:'',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
liegame:false,
thirdlie:'انا شخص بحب الناس',
lie:'first',
love:5,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اختار كذبة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الكذبة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
dateadded:20302302033,
love:5,
liegame:false,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اجاب على الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الصراحة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
firstno:2,
secondno:1,
thirdno:5,
dateadded:20302302033,
love:1,
laugh:2,
sad:6,
liegame:false,
dislike:3
  },

  {
    type:'اضاف 3 كذبات',
    user:'ahmed ahmed',
    NewChallenge:true,
    title:'الكذبة الاولى',
des:'انا شخص احب الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:true,
earn:5,
firstno:2,
secondno:1,
thirdno:5,

dateadded:20302302033,
love:1,
laugh:2,
sad:6,
dislike:3
  },
];
import { ThemeContext } from 'react-navigation';

class BusinessProfile extends React.Component {
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




   handleScroll = (event) => {
     var currentOffset = event.nativeEvent.contentOffset.y;
          var direction = currentOffset > this.state.offset ? 'down' : 'up';
      this.state.offset = currentOffset;
     this.setState({ isNavBarHidden:this.state.offset===0?this.state.isNavBarHidden:!this.state.isNavBarHidden});
   };

  DisplayPosts = (d) => {
    this.setState({refreshing:true})

    let uid =firebaseApp.auth().currentUser.uid

    firebaseApp.database().ref(`Posts`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

      if(d==="latest"){
          sort = items.sort(function(a, b) {
           // Turn your strings into dates, and then subtract them
           // to get a value that is either negative, positive, or zero.
           return new Date(b.createdAt) - new Date(a.createdAt);

         });
        }
      else   if (d==="popular") { sort = items.sort((a, b) => {
         likeda = a.likedby ? Object.values(a.likedby).map((project)=>{
           return project.likedby;
         }) : [];
         likedb = b.likedby ? Object.values(b.likedby).map((project)=>{
           return project.likedby;
         }) : [];
         laugheda = a.laughedby ? Object.values(a.laughedby).map((project)=>{
           return project.likedby;
         }) : [];
         sadeda = a.sadedby ? Object.values(a.sadedby).map((project)=>{
           return project.likedby;
         }) : [];
         dislikeda = a.dislikedby ? Object.values(a.dislikedby).map((project)=>{
           return project.likedby;
         }) : [];
         laughedb = b.laughedby ? Object.values(b.laughedby).map((project)=>{
           return project.likedby;
         }) : [];
         sadedb= b.sadedby ? Object.values(b.sadedby).map((project)=>{
           return project.likedby;
         }) : [];
         dislikedb = b.dislikedby ? Object.values(b.dislikedby).map((project)=>{
           return project.likedby;
         }) : [];
         let as=likeda +laugheda+sadeda+dislikeda
         let bs =likedb+laughedb+sadedb+dislikedb
         if (as < bs) {
           return 1;
         }
         if (as > bs) {
           return -1;
         }
         return 0;
       })}
console.log(sort +'--------------------------------posts');
this.setState({ check:false,disabled:false,posts: Object.values(sort),spinner:false,refreshing:false,firsts:false},function(){
  this.filt=Object.values(sort)
});

    });
  }



  componentDidMount() {
    this.setState({refreshing:true,firsts:true})
  this.DisplayPosts('popular')
  }
  componentWillUnmount() {

 }
deletess=(data,name)=>{
  var updates = {};
updates[`Posts/${data.postuid}/${name}/${firebaseApp.auth().currentUser.uid.toLowerCase()}`] = null;
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



    <TouchableOpacity style={styless.slide1} >
    <ImageBackground style={{width: Dimensions.get('window').width,flex:1}} source={{uri:'https://miro.medium.com/max/8000/1*JrHDbEdqGsVfnBYtxOitcw.jpeg'}} >
<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position: 'absolute',top: 20,left: 20,justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>
<Ionicons name='ios-close-circle' size={40} color="#000000"/>
</TouchableOpacity>

    </ImageBackground>

    </TouchableOpacity>
    <View style={[styles.cards,{position: 'absolute',top:90,marginTop: 0}]}>
    <View style={cstyles.head}>
<View style={[cstyles.profile]}>
<View style={cstyles.pimg}>
<Thumbnail   borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={{uri:'https://cdnimgen.royanews.tv/imageserv/Size728Q40/news/20200323/20375.JPG'}} />
</View>
<View style={cstyles.names}>
<View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
<Text numberOfLines={2} style={cstyles.name}>Ahmed khalid fedsdfsdff</Text>
<Text style={[styles.time,{color:'#eb144c'}]}  numberOfLines={1}>Verfied</Text>

</View>
</View>
</View>
</View>
    <View style={cstyles.head}>
<View style={cstyles.profile}>

<View style={cstyles.names}>

<Rating imageSize={20} readonly startingValue={4} style={styles.rating} />
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',alignSelf: 'flex-start',marginVertical: 5}}>
<View style={{flex:1,flexDirection: 'row'}}>

<Text style={[styles.price,{fontSize: 10,fontFamily: 'Cairo-Regular'}]}  numberOfLines={1}>Corporate Business</Text>
<Text style={[styles.price,{fontSize: 10,fontFamily: 'Cairo-Regular'}]}   numberOfLines={1}>|</Text>

<Text style={[styles.price,{fontSize: 10,fontFamily: 'Cairo-Regular'}]}  numberOfLines={1}>Local Business</Text>

</View>

</View>
</View>
</View>
<View style={cstyles.edit}>
<Button block style={{backgroundColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 20,alignSelf: 'flex-end',borderRadius: 10}}>
<Text style={[styles.time,{color:'#fff'}]}>Follow</Text>
</Button>
</View>
    </View>

      </View>

            {/*start of details*/}
            <View style={{
          flex:1,
          marginTop: 90,


        }}>

            <ScrollView  >
            <Tabs  style={{marginBottom: 10}} tabBarUnderlineStyle={{backgroundColor:'#eb144c'}}>
            <Tab heading="Info" textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            <View style={{backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
                 shadowOpacity: 0.4,
                 shadowRadius: 3,
          flex:1,
marginTop: 10,
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

          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',alignSelf: 'flex-start',marginVertical: 5,width: '100%',marginHorizontal: 10}}>

          {business?<MaterialIcons name='business-center' size={15} style={{marginRight: 5}} color="black"/>:<FontAwesome name='map-marker' size={15} style={{marginRight: 5}} color="green"/>}
          {business?<Text style={styles.times}  numberOfLines={1}>dsfsdfdsf</Text>:
          <Text style={styles.time}  numberOfLines={1}>Irbid ,30 streets</Text>
          }

          </View>
          <View style={{flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <MaterialIcons name='today' size={15} style={{marginRight: 5}} color="black"/>
          <Text style={[styles.type,{color:'black'}]}  numberOfLines={2}>Sunday, Monday, Tuesday, Wednesday, Thursday,Friday</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <MaterialIcons name='phone' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>+962799064607</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <FontAwesome name='globe' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>www.opentiq.com</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <Ionicons name='ios-mail' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>info@opentiq.com</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <MaterialIcons name='access-time' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>5:00 AM - 6:30 PM</Text>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

          <FontAwesome name='facebook-square' size={15} style={{marginRight: 5}} color="blue"/>
          <FontAwesome name='instagram' size={15} style={{marginRight: 5}} color="#eb144c"/>
          <FontAwesome name='twitter' size={15} style={{marginRight: 5}} color="#1DA1F2"/>
          <FontAwesome name='linkedin-square' size={15} style={{marginRight: 5}} color="#0e76a8"/>
          <FontAwesome name='youtube' size={15} style={{marginRight: 5}} color="#800020"/>

          </View>
          </View>

          </ScrollView>

                  </View>
            <View style={styles.cards}>
            <Text style={gStyle.det}>Description</Text>
              <Text style={gStyle.p}>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci

          </Text>

              </View>
              <View style={styles.cards}>
              <Text style={[gStyle.det,{
                color:'#eb144c'
              }]}>Services</Text>

                <Text style={gStyle.p}>

          {`We Fix:
          All Computer software & hardware
          Sell new computer
          Replace old by new`}
            </Text>

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
                          </Tab>
            <Tab heading="Services" textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            <Services/>
            </Tab>
            <Tab heading="Jobs" textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            </Tab>
            <Tab heading="Articles" textStyle={{color:'black'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
            </Tab>
          </Tabs>

              </ScrollView>
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
  flex:7,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
},
edit:{
  flex:3,

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
export default BusinessProfile;
