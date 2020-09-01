import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Label,CheckBox,List,ListItem} from 'native-base';
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
import SwipeablePanel from 'rn-swipeable-panel';
import { ThemeContext } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Prod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      swipeablePanelActive: false,
title:'high',
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
      listedsection:  props.navigation.getParam('listed',[]),
      idin:  props.navigation.getParam('id',[]),
      sec:  props.navigation.getParam('sec',''),
      head:  props.navigation.getParam('head',''),
      idins:  props.navigation.getParam('ids',0),
      tit:  props.navigation.getParam('title',''),

       refreshing: false,
      myusername:'',
      posts:[],
used:false,
used1:false,
      Duration:'popular',
      disabled:false,
      catindex:0,
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
   let d=this.state.title
   var ds=this.state.used
   var d1=this.state.used1
   this.DisplayPosts(d,ds,d1)


 }
  onValueChange1(value: string) {
    this.setState({
      title: value,


    });
    let d=value
    var ds=this.state.used
    var d1=this.state.used1
    this.DisplayPosts(d,ds,d1)
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

  openPanel = () => {
      this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
      this.setState({ swipeablePanelActive: false });
  };


  DisplayPosts = (d,ds,d1) => {
    this.setState({refreshing:true})


    firebaseApp.database().ref(`Ads`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           if (((this.state.head===child.val().hsection||(this.state.head==='الجميع'&&this.state.tit===child.val().typeofservice))&&this.props.appStore.place==child.val().city)) {
console.log(this.state.head+'-------'+child.val().hsection+'////head : '+this.state.head+'---'+this.state.tit+'----'+child.val().typeofservice);
             if (ds===child.val().used&&d1==false) {
               items.push(child.val());
             }else if ((ds===true&&d1===true)||(ds===false&&d1===false)) {

                items.push(child.val());
             }else if ((ds===false&&d1==true)&&d1!==child.val().used) {

                 items.push(child.val());
             }

           }else if (this.state.idins==200&&child.val().accept&&this.props.appStore.place==child.val().city) {
             if (ds===child.val().used&&d1==false) {
               console.log("this&&&&&&&&&&&&&&&&&&&&&"+ds+'----'+child.val().used);
               items.push(child.val());
             }else if ((ds===true&&d1===true)||(ds===false&&d1===false)) {
               console.log("thisoneثثثثثثثثثثثثثثثثثث"+ds+'-----'+d1);

                items.push(child.val());
             }else if ((ds===false&&d1==true)&&d1!==child.val().used) {
               console.log("thissssقققققققققق");

                 items.push(child.val());
             }
           }

        });
let sort = items
      if(d==="latest"){
          sort = items.sort(function(a, b) {
           // Turn your strings into dates, and then subtract them
           // to get a value that is either negative, positive, or zero.
           return new Date(b.createdAt) - new Date(a.createdAt);

         });
        }

      else   if (d==="high") { sort = items.sort((a, b) => {

         if (a.price < b.price) {
           return 1;
         }
         if (a.price > b.price) {
           return -1;
         }
         return 0;
       })}else if (d==="low") { sort = items.sort((a, b) => {

          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        })}else {
          sort=items
        }
this.setState({ check:false,disabled:false,posts: Object.values(sort),spinner:false,refreshing:false,firsts:false},function(){
  this.filt=Object.values(sort)
});

    });
  }



  componentDidMount() {
    let d ='latest'
    let ds =this.state.used
    let d1 =this.state.used1
    this.DisplayPosts(d,ds,d1)

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
 used =()=>{
   this.setState({used:!this.state.used});
   this.setState({refreshing:true})
   var ds=!this.state.used
   var d='latest'
   var d1 = this.state.used1

this.DisplayPosts(d,ds,d1)
 }
 used1 =()=>{
   this.setState({used1:!this.state.used1});
   this.setState({refreshing:true})
   var ds=this.state.used
   var d='latest'
   var d1 = !this.state.used1
this.DisplayPosts(d,ds,d1)
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
<Header searchBar rounded style={{backgroundColor: 'white'}}>

<Left>
<TouchableOpacity onPress={()=>navigation.goBack()}>

  <Icon name="arrow-back" />
  </TouchableOpacity>

</Left>
<Body>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder={`ابحث في قسم ${this.state.head}`} onChangeText={(d)=>this.searchFilterFunction(d)}/>
    </Item>
          </Body>
          <Right>
  <TouchableOpacity onPress={this.openPanel} style={{flexDirection: 'row'}}>
          <Icon name="ios-funnel" type="Ionicons" />
          <Text style={{fontSize: 15,fontFamily: 'Cairo-Bold'}}>فلترة</Text>

</TouchableOpacity>

      </Right>
      </Header>
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

    <View style={{paddingTop: 10,flex:1,width:Dimensions.get('window').width }}>
{/*cards start*/}
<View style={{flex:1,alignItems: 'flex-end',paddingTop: 10,paddingHorizontal: 10}}>
<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
<Button bordered={this.state.sec===''?false:true} onPress={()=>this.setState({sec:''})} dark style={{backgroundColor: this.state.sec===''?'#800020':null,borderRadius: 12,justifyContent: 'center',alignItems: 'center',padding: 10,marginHorizontal: 10}}>
<Text style={{color:this.state.sec===''?'#fff':'black'}}>جميع الاعلانات</Text>
</Button>
{
this.state.listedsection.map((category, index) => {
  if (category.indsec==this.state.idin) {
    return (
      <Button bordered={category.name==this.state.sec?false:true} onPress={()=>this.setState({sec:category.name})} dark style={{backgroundColor: category.name==this.state.sec?'#800020':null,borderRadius: 12,justifyContent: 'center',alignItems: 'center',padding: 10,marginHorizontal: 10}}>
      <Text style={{color:category.name==this.state.sec?'#fff':'black'}}>{category.name}</Text>
      </Button>   )
  }

  })
}
</ScrollView>
</View>
{this.state.head=='دعوة حضور مناسبة'||this.state.head=="تقديم تهنئة وتبريك"||this.state.head=="موقع العزاء"||this.state.head=="تقديم تعزية ومواساة"?<Button bordered={this.state.sec===''?false:true} onPress={()=>navigation.navigate('Ch')} dark style={{marginVertical: 20,backgroundColor: 'black',borderRadius: 12,justifyContent: 'center',alignItems: 'center',padding: 10,marginHorizontal: 10}}>
<Text style={{color:'#fff'}}>اضف {this.state.head}</Text>
</Button>:null}

<View style={styles.container}>
     {
       this.state.posts.map((category, index) => {
         if (((this.state.sec==category.section||this.state.sec.length==0) &&(this.state.head===category.hsection||this.state.head==='الجميع'))||this.state.idins==200) {
           return (
          <SlCard type={category.city} name={category.title} data={category}  cat={category.hesection} by={category.section} navigation={navigation}/>
           )
         }

       })
     }
   </View>
   {/*cards end*/}

    </View>
    </ScrollView>
    <SwipeablePanel
             fullWidth
             isActive={this.state.swipeablePanelActive}
             onClose={this.closePanel}
             showCloseButton
             onPressCloseButton={this.closePanel}
         >
         <View style={{flex: 1,justifyContent: 'center',paddingVertical: 30,width:Dimensions.get('window').width,paddingHorizontal: 20,paddingBottom: 30}}>
<ScrollView>
         <Label style={{fontFamily: 'Cairo-Bold'}}>
         مستعمل او غير مستعمل
         </Label>
         <ListItem onPress={this.used}>
          <CheckBox checked={this.state.used} style={{marginHorizontal: 10}} onPress={this.used}/>
          <Body>
            <Text style={{fontFamily: 'Cairo-Regular'}}>مستعمل </Text>
          </Body>
        </ListItem>
        <ListItem onPress={this.used1}>
          <CheckBox checked={this.state.used1} style={{marginHorizontal: 10}} onPress={this.used1}/>
          <Body>
            <Text style={{fontFamily: 'Cairo-Regular'}}>غير مستعمل</Text>
          </Body>
        </ListItem>
        <Label style={{fontFamily: 'Cairo-Bold',marginVertical: 10}}>
        ترتيب حسب
        </Label>
         <Picker
         selectedValue={this.state.title}
         onValueChange={this.onValueChange1.bind(this)}
         iosIcon={<Icon name="arrow-down" />}

        style={{ height: 50, width: '100%',textAlign: 'right',alignSelf: 'center',alignItems: 'center',justifyContent: 'flex-end',color:'#eb144c'}}


       >
       <Picker.Item label="الاحدث" value="latest" />

       <Picker.Item label="الاعلى سعر" value="high" />
       <Picker.Item label="الاقل سعر" value="low" />
       <Picker.Item label="الاقدم للاحدث" value="time" />

       </Picker>
       </ScrollView>
       </View>
 </SwipeablePanel>
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
    backgroundColor: '#97CAE5'
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
export default Prod;
