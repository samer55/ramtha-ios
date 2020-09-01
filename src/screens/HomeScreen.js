import React from 'react';
import { Image, StatusBar,Text, View, ScrollView,ImageBackground, Dimensions,StyleSheet,AsyncStorage,TouchableOpacity,Linking,RefreshControl,Alert } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images,colors } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Badge} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,   } from 'native-base';
import Card from '../components/Card';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { FontAwesome } from 'react-native-vector-icons';
import { device} from '../constants';
import {  Picker } from "native-base";
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'firebase';
const { width } = Dimensions.get("screen");
import Swiper from 'react-native-swiper'
import Lightbox from 'react-native-lightbox';

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
const offers = [
  {
id:0,
img:'https://i.ibb.co/yBqVkH6/discount.png',
name:'الأعلانات المميزة',
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
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.addEventListener("opened", this.onOpened);

    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      list:[],
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
      working:false,
      started:props.navigation.getParam('start', []),
       refreshing: false,
       friendarray:[],
      myusername:'',
      posts:[],
      Duration:props.appStore.place,
      disabled:false,
      reqdata:[],
  not:[],
      check:false,
      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.not=[]
    this.friendsdata=[]
    this.currentusername=''

  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
 onOpened = openResult => {
   console.log("Message: ", openResult.notification.payload.body);
   console.log("Data: ", openResult.notification.payload.additionalData);
   console.log("isActive: ", openResult.notification.isAppInFocus);
   console.log("openResult: ", openResult);
   console.log("title: ", openResult.notification.payload.title);

this.props.navigation.navigate('Notif')
 };
  onValueChange1(value: string) {
    this.setState({
      Duration: value,

    });

    AsyncStorage.setItem('place', value).then(() => {
      this.props.appStore.place = value

this.props.navigation.navigate('start',{chan:true})
    });

  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };

deletess=(data,name)=>{
  var updates = {};
updates[`Posts/${data.postuid}/${name}/${firebaseApp.auth().currentUser.uid.toLowerCase()}`] = null;
return firebaseApp
.database()
.ref()
.update(updates)
}


_onRefresh =()=>{
  var ref1 = firebaseApp.database().ref("Special/search/"+this.props.appStore.place); //Here assuming 'Users' as main table of contents

  ref1.once('value').then(snapshot => {
      // console.log(snapshot.val());

       // get children as an array
       var items = [];
       snapshot.forEach((child) => {

         if (new Date().getTime() < child.val().updatedAt) {
              items.push(child.val());
         }

      });
     this.setState({list:Object.values(items)})


      console.log('itemss----------------'+items);
      console.log('dataArray----------------'+this.state.dataArray);

  });

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
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.user.toUpperCase()}
      ${item.title.toUpperCase()}   ${item.firstdoor.toUpperCase()} ${item.seconddoor.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ dataArray: newData });
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
      noti:`${firebaseApp.auth().currentUser.displayName} قام بالتفاعل على منشورك`,
      postuid:notkey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
     updatedAt: new Date().getTime()+(60*60*48*1000),
      notuid:newPostKey
  });

}
componentDidMount() {
  if (new Date().getTime() < 1593732911502) {
    this.setState({working:false})
  }else if (new Date().getTime() > 1593732911502)  {
    this.setState({working:true})

  }
  var ref1 = firebaseApp.database().ref("Special/search/"+this.props.appStore.place); //Here assuming 'Users' as main table of contents

  ref1.once('value').then(snapshot => {
      // console.log(snapshot.val());

       // get children as an array
       var items = [];
       snapshot.forEach((child) => {

         if (new Date().getTime() < child.val().updatedAt) {
              items.push(child.val());
         }

      });
     this.setState({list:Object.values(items)})



      console.log('itemss----------------'+items);
      console.log('dataArray----------------'+this.state.dataArray);

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

        <View style={{flex:1}}>
        <Spinner
               visible={this.state.spinner}
              textContent={'جاري التحميل...'}
               textStyle={{color:'#fff'}}
             />
<StatusBar hidden={true} />
        <Header searchBar rounded style={{width: width,backgroundColor: '#fff'}}>
        <Left>
        <TouchableOpacity  onPress={()=>navigation.navigate('Notif',{})}>
        <Ionicons name={'md-notifications'} size={25} color={'#800020'} />

        </TouchableOpacity>

                 </Left>
                 <Body style={{alignItems: 'flex-end'}}>
<Title style={{fontFamily: 'Cairo-Bold',color: '#800020',fontSize: 10,textAlign: 'right'}}>(اختر محافظة للتسوق )</Title>
                 </Body>
                 <Right>


                 <Item picker >
                 <Picker
                 iosIcon={<Icon name="arrow-down" />}

                style={{ height: 50, width: 140}}
                selectedValue={this.state.Duration}
                onValueChange={this.onValueChange1.bind(this)}

              >
              <Picker.Item label="الرمثا" value="Ramtha" />
              <Picker.Item label="اربد" value="Irbid" />
              <Picker.Item label="البلقاء" value="Balqa" />
              <Picker.Item label="جرش" value="Jarash" />
              <Picker.Item label="الزرقاء" value="Zarqaa" />
              <Picker.Item label="الطفيلة" value="Tafaileh" />
              <Picker.Item label="عجلون" value="Ajloun" />
              <Picker.Item label="العقبة" value="Aqabah" />
              <Picker.Item label="عمان" value="Amman" />
              <Picker.Item label="الكرك" value="Karak" />
              <Picker.Item label="مادبا" value="Madaba" />
              <Picker.Item label="معان" value="Maan" />
              <Picker.Item label="المفرق" value="Mafraq" />


              </Picker>
                 </Item>
                 </Right>
    </Header>


    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container['light']}
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#eb144c"
          />
        }
    >
    {this.state.working?<View style={{marginVertical: 10,alignItems: 'center',justifyContent: 'center',flex: 1}}>
    <Swiper  containerStyle={{alignSelf: 'center'}} bounces={true} scrollEnabled style={[styles.wrapper]} showsPagination={true} autoplay height={150}>
           <TouchableOpacity style={[styles.slide1]} onPress={()=>navigation.navigate('List',{type:'important'})}>
           <ImageBackground style={{width: Dimensions.get('window').width,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/zrGNZnt/Ll76T.jpg'}} >
    <LinearGradient
             colors={['rgba(208,2,27,70)','rgba(0,0,0,0.1)']}
             style={{  alignItems: 'center',   width: Dimensions.get('window').width,height: '100%',justifyContent: 'center'}}>

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 17,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'Cairo-Bold'
             }}>
            تعرف على اخر الاخبار العاجلة
           </Text>
           <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white',borderRadius: 10}}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'Cairo-Bold'
             }}>
            تعرف اكثر
           </Text>
           </View>
           </LinearGradient>
    </ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.slide2]} onPress={()=>navigation.navigate('List',{type:'new'})}>
           <ImageBackground style={{width: Dimensions.get('window').width,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/TbFvc7N/man-reading-newspaper-6053.jpg'}} >
    <LinearGradient
             colors={['rgba(144,164,174,70)','rgba(0,0,0,0.1)']}
             style={{  alignItems: 'center', width: Dimensions.get('window').width,height: '100%',justifyContent: 'center'}}>

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 17,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'Cairo-Bold'
             }}>
            اكتشف الاخبار في منطقتك
           </Text>
           <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'Cairo-Bold'
             }}>
            اكتشف
           </Text>
           </View>
           </LinearGradient>
    </ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.slide3]} onPress={()=>navigation.navigate('List',{type:'died'})}>
    <LinearGradient
             colors={['rgba(74,144,226,43)','rgba(0,0,0,0.1)']}
             style={{  alignItems: 'center',  width: Dimensions.get('window').width,height: '100%',justifyContent: 'center'}}>

           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 17,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'Cairo-Bold'
             }}>
            تعرف على اخر اخبار الوفيات
           </Text>
           <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: '#fff',

               fontWeight: '500',

               alignSelf: 'center',textAlign: 'center',
               fontFamily: 'Cairo-Bold'
             }}>
            تعرف اكثر
           </Text>
           </View>
           </LinearGradient>
           </TouchableOpacity>

         </Swiper>
         </View>:null}
    <View style={{flex:1,justifyContent: 'flex-end',alignItems: 'center',flexDirection: 'row',width: '100%',paddingHorizontal: 20}}>
<TouchableOpacity onPress={()=>navigation.navigate('start')} style={{padding:10,borderWidth:0.5,borderColor:'#800020',borderRadius: 12}}>
    <Title style={{fontFamily: 'Cairo-Bold',color: '#800020',fontSize: 12}}>الرجوع لشاشة الدخول</Title>
</TouchableOpacity>
    <Text style={[gStyle.text['light'], gStyle.Title]}>جميع الأقسام</Text>



    </View>
    <View style={styles.container}>
         {
           offers.map((category, index) => {

             return (
               <TouchableOpacity
                 key={index}
                 style={styles.item}
                 onPress={category.id==0?() => navigation.navigate('Prod',{ids:200}):() => navigation.navigate('Find',{title:category.name,id:category.id})}
               >
                 <Image
                   style={styles.itemIcon}
                   source={{uri:category.img}}
                 />
                 <Text style={styles.itemTitle}>
                   {category.name}
                 </Text>
               </TouchableOpacity>
             )
           })
         }
       </View>

        {this.state.list.length>0?   <Swiper   bounces={true} scrollEnabled style={[styles.wrapper]} showsPagination={true} autoplay height={200}>

       {this.state.list&&this.state.list.map((item)=>{
         return(
           <View style={styless.slide2}>
             <Lightbox underlayColor="white">
           <Image style={{width: Dimensions.get('window').width,height: '100%',resizeMode: 'contain'}} source={{uri:item.img}} />
       </Lightbox>
           </View>
         )
       })}

                </Swiper>:null}


    </ScrollView>
    </View>
  )
}

};

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: Dimensions.get('window').width * 0.25,
        height: 100,margin: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        alignItems: 'center',
        borderRadius: 12,
        padding: 5,
        justifyContent: 'center'
    },
    itemIcon: {
        width: 45,
        height: 45,
        resizeMode: 'cover'
    },
    itemTitle: {
        marginTop: 16,textAlign: 'center'
    },
    wrapper: {},
    slide1: {

      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
      flex:1,
      width: Dimensions.get('window').width,

    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      width: Dimensions.get('window').width,

      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width,

      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }

});

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
export default HomeScreen;
