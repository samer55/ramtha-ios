import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
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
import SlCard from '../components/slidescard'
import Lightbox from 'react-native-lightbox';

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
id:0,
img:'https://i.ibb.co/yBqVkH6/discount.png',
name:'احدث الاعلانات',
type:'web-design'
  },
  {
id:1,
img:'https://i.ibb.co/PWC4sTg/contract.png',
name:'افراح وتهاني',
type:'Graphics'
  },
  {
id:2,
img:'https://i.ibb.co/QPPVpt4/sheet.png',
name:'عزاء مواساة',
type:'Writer'
  },
  {
id:3,
img:'https://i.ibb.co/M66Wsvy/commerce-and-shopping.png',
name:'مواد تموينية',
type:'web-design'
  },
  {
id:4,
img:'https://i.ibb.co/VVQYkpr/tray.png',
name:'مطاعم وطبخ منزلي',
type:'web-design'
  },
  {
id:5,
img:'https://i.ibb.co/QKgH1bn/cabinets.png',
name:'اثاث منزلي',
type:'web-design'
  },
  {
id:6,
img:'https://i.ibb.co/V3qHRKK/people.png',
name:'مستلزمات الأسرة',
type:'web-design'
  },
  {
id:7,
img:'https://i.ibb.co/HnppRnm/phone-2.png',
name:'الكترونيات',
type:'web-design'
  },
  {
id:8,
img:'https://i.ibb.co/b5phSdk/transport.png',
name:'سيارات ومحركات',
type:'web-design'
  },
  {
id:9,
img:'https://i.ibb.co/bsFvVfJ/laptop.png',
name:'مهن مختلفة ووظائف',
type:'web-design'
  },
  {
id:10,
img:'https://i.ibb.co/f4LHmMJ/industry.png',
name:'مقاولات وحرف',
type:'web-design'
  },
  {
id:11,
img:'https://i.ibb.co/6m2Fcvv/animal-kingdom.png',
name:'طيور وحيوانات',
type:'web-design'
  },
  {
id:12,
img:'https://i.ibb.co/VLt1fX5/eating.png',
name:'ادوات منزلية',
type:'web-design'
  },
  {
id:13,
img:'https://i.ibb.co/rf7HyHZ/money-2.png',
name:'محلات صرافة',
type:'web-design'
  },
  {
id:14,
img:'https://i.ibb.co/KzGbCrx/transportation.png',
name:'سياحة وسفر',
type:'web-design'
  },
  {
id:15,
img:'https://i.ibb.co/94Y9058/show.png',
name:'تجهيزات افراح',
type:'web-design'
  },
  {
id:16,
img:'https://i.ibb.co/RDdzT09/woman.png',
name:'خدمات عزاء',
type:'web-design'
  },
  {
id:17,
img:'https://i.ibb.co/2jwkRgp/holidays.png',
name:'رياضة',
type:'web-design'
  },
  {
id:18,
img:'https://i.ibb.co/YdL2Nv7/track.png',
name:'تكسي وتوصيل ونقل',
type:'web-design'
  },
  {
id:19,
img:'https://i.ibb.co/9ZCJTWK/kitchen.png',
name:'عطارين',
type:'web-design'
  },
  {
id:20,
img:'https://i.ibb.co/sjH71LC/pencils.png',
name:'مكتبات وقرطاسية',
type:'web-design'
  },
  {
id:21,
img:'https://i.ibb.co/Zcxnznb/elegant.png',
name:'ذهب ومجوهرات',
type:'web-design'
  },

  {
id:22,
img:'https://i.ibb.co/yWwxJJ2/food.png',
name:'عسل واعشاب',
type:'web-design'
  },
  {
id:23,
img:'https://i.ibb.co/yyxYmgf/barn.png',
name:'عقارات واراضي',
type:'web-design'
  },
  {
id:24,
img:'https://i.ibb.co/B34FBwz/menu.png',
name:'اخرى',
type:'web-design'
  },
];
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import { ThemeContext } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Searchall extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.addEventListener("opened", this.onOpened);

    this.state = {
      balance: 0,secret:'',
      status:'',
      catindex:0,
      sec:'احدث الاعلانات',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
       refreshing: false,
      myusername:'',
      posts:[],
list:[],
load:false,
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

  componentDidUpdate(prevProps) {
  if((this.props.appStore.place!== prevProps.appStore.place)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
  {
    this._onRefresh();
  }
}
  _onRefresh = () => {
   this.componentDidMount()

 }
  onValueChange1(value: string) {
    this.setState({
      Duration: value,
      refreshing:true,
      firsts:true
    });
    this.DisplayPosts(value)
  }
  onOpened = openResult => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
    console.log("title: ", openResult.notification.payload.title);

 this.props.navigation.navigate('Notif')
  };
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



  DisplayPosts = (d='latest') => {
    this.setState({refreshing:true,load:true})


    firebaseApp.database().ref(`Ads`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           if (this.props.appStore.place==child.val().city) {
                items.push(child.val());
           }

        });
        sort = items.sort(function(a, b) {
         // Turn your strings into dates, and then subtract them
         // to get a value that is either negative, positive, or zero.
         return new Date(b.createdAt) - new Date(a.createdAt);

       });
       this.setState({ load:false,check:false,disabled:false,posts: Object.values(sort),spinner:false,refreshing:false,firsts:false},function(){
  this.filt=Object.values(sort)
});

    });
  }


  componentDidMount() {
    this.DisplayPosts()
    var ref1 = firebaseApp.database().ref("Special/search/"+this.props.appStore.place); //Here assuming 'Users' as main table of contents

    ref1.once('value').then(snapshot => {
        // console.log(snapshot.val());
this.setState({list:[]})
         // get children as an array
         var items = [];
         snapshot.forEach((child) => {

           if (new Date().getTime() < child.val().updatedAt) {
                items.push(child.val());
           }else {
             this.deletesss(child.val().postuid)
           }

        });
       this.setState({list:Object.values(items)})



        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
  }
  componentWillUnmount() {

 }
 deletesss=(d)=>{
   var updates = {};
 updates["Special/search/"+this.props.appStore.place+'/'+d] = null;
 return firebaseApp
 .database()
 .ref()
 .update(updates)
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
      ${item.title.toUpperCase()}   ${item.typeofservice.toUpperCase()} ${item.about.toUpperCase()} ${item.hsection.toUpperCase()}`;

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
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1,width:Dimensions.get('window').width}}>
<StatusBar hidden={true} />

    <ScrollView
      contentContainerStyle={[gStyle.contentContainerss,{width:Dimensions.get('window').width}]}
      style={gStyle.container[theme]}
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
onRefresh={this._onRefresh}
            tintColor="#eb144c"
          />
        }
    >

  {this.state.list.length>0 ? <Swiper style={styles.wrapper} showsPagination={false} autoplay height={200}>

{this.state.list&&this.state.list.map((item)=>{

  return(
    <View style={styless.slide2}>
    <TouchableOpacity onPress={()=>navigation.navigate('Top',{params:this.state.list})} style={{width:Dimensions.get('window').width,height: '100%'}}>
    <Image style={{width: Dimensions.get('window').width,height: '100%',resizeMode: 'cover'}} source={{uri:item.img}} />
</TouchableOpacity>
    </View>
  )
})}

         </Swiper>:<View style={{justifyContent: 'flex-start',alignItems: 'flex-start',height: 300,flex: 1}}>
         <Image source={{uri:'https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif'}} style={{height:200,width:250}} />


         </View>}

         <Item  style={{position: 'absolute',top:170,backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
           shadowOpacity: 0.4,
           shadowRadius: 3,

           shadowOffset: {
             height: 2,
             width: 0
           },
           //android
           elevation: 5,}}>

              <Icon name="ios-search" />
              <Input placeholder="ابحث" onChangeText={text => this.searchFilterFunction(text)} />
            </Item>
    <View style={{paddingTop: 10,flex:1,width:Dimensions.get('window').width }}>
{/*cards start*/}
<View style={{flex:1,alignItems: 'flex-end',paddingTop: 30,paddingHorizontal: 10}}>
<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>

{
offers.map((category, index) => {
    return (
      <Button bordered={category.name==this.state.sec?false:true} onPress={()=>this.setState({sec:category.name})} dark style={{backgroundColor: category.name==this.state.sec?'#800020':null,borderRadius: 12,justifyContent: 'center',alignItems: 'center',padding: 10,marginHorizontal: 10}}>
      <Text style={{color:category.name==this.state.sec?'#fff':'black',fontFamily: 'Cairo-Bold'}}>{category.name}</Text>
      </Button>   )
  })
}
</ScrollView>
</View>
{!this.state.load?<View style={styles.container}>

     {
              this.state.posts.map((category, index) => {
                if (this.state.sec===category.typeofservice||this.state.sec=='احدث الاعلانات') {
                  return (
                    <SlCard type={category.city} name={category.title} data={category}  cat={category.hesection} by={category.section} navigation={navigation}/>
                  )
                }

       })
     }

   </View>:   <View style={{justifyContent: 'center',alignItems: 'center',flex: 1}}>
      <Image source={{uri:'https://cdn.dribbble.com/users/563824/screenshots/3306683/untitled-6-110.gif'}} style={{height:200,width:250}} />


      </View>}
   {/*cards end*/}

    </View>
    </ScrollView>
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
    width: Dimensions.get('window').width,

  },
  container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: Dimensions.get('window').width,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center'
  },
  item: {
      width: Dimensions.get('window').width * 0.25,
      height: 100,margin: 10,
      borderWidth: 1,
      borderColor: "lightgray",
      alignItems: 'center',
      justifyContent: 'center'
  },
  itemIcon: {
      width: 50,
      height: 50,
      resizeMode: 'cover'
  },
  itemTitle: {
      marginTop: 16,textAlign: 'center'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width-30,

    alignItems: 'center',
    backgroundColor: '#fff'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width-30,

    backgroundColor: '#92BBD9'
  },
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
    flex:1,

  },
  slide2: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
    backgroundColor: '#fff'
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
export default Searchall;
