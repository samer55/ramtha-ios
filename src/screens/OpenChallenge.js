import React from 'react';
import { KeyboardAvoidingView,Platform,Image, Text, StatusBar,View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Icon,Input,Textarea } from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form } from 'native-base';
import Card from '../components/Card';
import NavigationBack from '../components/NavigationBack';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import * as firebase from 'firebase';

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
import {  Picker } from "native-base";

import { ThemeContext } from 'react-navigation';
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebaseApp
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
class OpenChallenge extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,

    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title: 'عرض'
  });
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      Duration: '-------------',
      myuid:'',
      likes:0,

datastate:[],
      secondno:0,
      selected:'All',
      thirdno:0,

      image:null,
      uploading:false,

      writerId:"",
      type:"",
      user:"",
      NewChallenge:false,
      title:"",
    des:"",
    reply:"",

    firstlie:'',
    secondlie:'',
    seen:"",
    thirdlie:'',
    lie:'',
    liegame:false,
    earn:0,
    firstno:0,


    love:0,
    laugh:0,
    sad:0,
    dislike:0,
      createdAt: 0,
      updatedAt: 0,
      postuid:"",

      post:'',
      myusername:'',
      Duration:'close',
      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.currentusername=''
  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  onValueChange1(value: string) {
    this.setState({
      Duration: value
    });
  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };
  DisplayPosts = (data) => {
    const {navigation}=this.props
  const uiddd =  navigation.getParam('puid', [])
  console.log("piidd "+uiddd);
        firebaseApp.database().ref(`Posts/${uiddd}`).on('value',
        (snapshot) => {
          val = snapshot.val()
           let available =[]

          if (snapshot.val()) {
console.log("u uidas "+snapshot.val().user);

            this.setState({

user:snapshot.val().user,
writerId:snapshot.val().writerId,
type:snapshot.val().type,
user:snapshot.val().user,
NewChallenge:snapshot.val().NewChallenge,
title:snapshot.val().title,
des:snapshot.val().des,
reply:snapshot.val().reply,
image:snapshot.val().image,

firstlie:snapshot.val().firstlie,
secondlie:snapshot.val().secondlie,
seen:snapshot.val().seen,
thirdlie:snapshot.val().thirdlie,
lie:snapshot.val().lie,
liegame:snapshot.val().liegame,
earn:snapshot.val().earn,
firstno:snapshot.val().firstno,
secondno:snapshot.val().secondno,
thirdno:snapshot.val().thirdno,
likedby:snapshot.val().likedby,
laughedby:snapshot.val().laughedby,
sadedby:snapshot.val().sadedby,
dislikedby:snapshot.val().dislikedby,
love:0,
laugh:0,
sad:0,
dislike:0,
createdAt: snapshot.val().createdAt,
updatedAt: snapshot.val().updatedAt,
postuid:snapshot.val().postuid,
            })

          }
          else {
            return null
          }
        })
        console.log("data is ");
  }
  componentDidMount() {
    const {navigation}=this.props
  const uiddd =  navigation.getParam('puid', [])
  console.log("piidd "+uiddd);
        firebaseApp.database().ref(`Posts/${uiddd}`).on('value',
        (snapshot) => {
          val = snapshot.val()
           let available =[]

          if (snapshot.val()) {
  console.log("u uidas "+snapshot.val().user);

            this.setState({

  user:snapshot.val().user,
  writerId:snapshot.val().writerId,
  type:snapshot.val().type,
  user:snapshot.val().user,
  NewChallenge:snapshot.val().NewChallenge,
  title:snapshot.val().title,
  des:snapshot.val().des,
  reply:snapshot.val().reply,
  image:snapshot.val().image,

  firstlie:snapshot.val().firstlie,
  secondlie:snapshot.val().secondlie,
  seen:snapshot.val().seen,
  thirdlie:snapshot.val().thirdlie,
  lie:snapshot.val().lie,
  liegame:snapshot.val().liegame,
  earn:snapshot.val().earn,
  firstno:snapshot.val().firstno,
  secondno:snapshot.val().secondno,
  thirdno:snapshot.val().thirdno,
  likedby:snapshot.val().likedby,
  laughedby:snapshot.val().laughedby,
  sadedby:snapshot.val().sadedby,
  dislikedby:snapshot.val().dislikedby,
  love:0,
  laugh:0,
  sad:0,
  dislike:0,
  createdAt: snapshot.val().createdAt,
  updatedAt: snapshot.val().updatedAt,
  postuid:snapshot.val().postuid,
            })

          }
          else {
            return null
          }
        })
  }
  _onRefresh = () => {
   this.setState({refreshing: true});
   const {navigation}=this.props
 const data =  navigation.getParam('data', []);
   this.DisplayPosts(data)
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


               this.DisplayPosts(data)

             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)
               this.DisplayPosts(data)

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


                this.DisplayPosts(data)

              }
              else{
                firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
                // If node/clicks has never been set, currentRank will be `null`.
                return (currentClicks || 0) + 1;
                })
                let updates = {}
                firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)
                this.DisplayPosts(data)

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


                this.DisplayPosts(data)

              }
              else{
                firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
                // If node/clicks has never been set, currentRank will be `null`.
                return (currentClicks || 0) + 1;
                })
                let updates = {}
                firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)
                this.DisplayPosts(data)

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


                this.DisplayPosts(data)

              }
              else{
                firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
                // If node/clicks has never been set, currentRank will be `null`.
                return (currentClicks || 0) + 1;
                })
                let updates = {}
                firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)
                this.DisplayPosts(data)

              }
            })
 }
  }


 onBack() {
   this.setState({spinner:true})

     // Back from another screen
   }

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
   creates=(data) =>{


    this.setState({status:'جاري الرد',refreshing:true})
    const newPostKey = firebaseApp.database().ref('posts').push().key

          const uid = firebaseApp.auth().currentUser.uid
          const username = firebaseApp.auth().currentUser.displayName
  const userid =data.writerId

  if (this.state.post.length >0) {



          const postData = {
            writerId:uid,
            type:data.title=='الصراحة'?'اجاب على الصراحة':'قبل التحدي',
            user:username,
            NewChallenge:false,
            title:data.title,
        des:data.des,
        reply:this.state.post,
        image:this.state.image,
        firstlie:'',
        secondlie:'',
        seen:this.state.selected,
        thirdlie:'',
        lie:'',
        liegame:false,
        earn:3,
        firstno:2,
        secondno:1,
        thirdno:5,
        love:0,
        laugh:0,
        sad:0,
        dislike:0,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: new Date().getTime()+(60*60*48*1000),
            postuid:newPostKey,

          }
          let updates = {}

          updates['Posts/' +newPostKey] = postData

          firebaseApp.database().ref().update(updates)
          .then(() => {

    this.setState({status:'تم النشر',post:'',image:null,refreshing:false})

  alert('تم الرد')
  this.props.navigation.goBack()

          })
          .catch(() => {

          this.setState({status:'حدث شئ خاطئ'})

          })

        .catch(error => {
          console.log(error)
        })




  } else {
  this.setState({status:'الرجاء كتابة الرد'})

  }

this.inc(3,userid,data.postuid)
this.notification(data,newPostKey)

  }
  inc=(d,userId,ds)=>{



          firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/balance`).transaction(function(currentClicks) {
    // If node/clicks has never been set, currentRank will be `null`.
    return (currentClicks || 0) + d;
  })

            firebaseApp.database().ref(`users/${userId}/balance`).transaction(function(currentClicks) {
      // If node/clicks has never been set, currentRank will be `null`.
      return (currentClicks || 0) + d;
    })
    firebaseApp.database().ref(`Posts/${ds}/earn`).transaction(function(currentClicks) {
// If node/clicks has never been set, currentRank will be `null`.
return (currentClicks || 0) + d;
})
  }
   notification=(data,notkey)=>{
     const newPostKey = firebaseApp.database().ref('posts').push().key

     firebaseApp.database().ref(`notification/${data.writerId}/${newPostKey}`).update({
         username:firebaseApp.auth().currentUser.displayName,
         noti:`${firebaseApp.auth().currentUser.displayName} قام بالرد على ${data.title}`,
         postuid:notkey,
           createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: new Date().getTime()+(60*60*48*1000),
         notuid:newPostKey
     });

  }
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
  this.notifications(data.writerId,data.postuid)
     this.DisplayPosts(data)
};
notifications=(d,notkey)=>{
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
     this.DisplayPosts(data)
};

render(){
  const {navigation}=this.props
  let arr=[]
  arr.push({

  user:this.state.user,
  writerId:this.state.writerId,
  type:this.state.type,
  user:this.state.user,
  NewChallenge:this.state.NewChallenge,
  title:this.state.title,
  des:this.state.des,
  reply:this.state.reply,
  image:this.state.image,

  firstlie:this.state.firstlie,
  secondlie:this.state.secondlie,
  seen:this.state.seen,
  thirdlie:this.state.thirdlie,
  lie:this.state.lie,
  liegame:this.state.liegame,
  earn:this.state.earn,
  firstno:this.state.firstno,
  secondno:this.state.secondno,
  thirdno:this.state.thirdno,
  likedby:this.state.likedby,
  laughedby:this.state.laughedby,
  sadedby:this.state.sadedby,
  dislikedby:this.state.dislikedby,
  love:0,
  laugh:0,
  sad:0,
  dislike:0,
  createdAt: this.state.createdAt,
  updatedAt: this.state.updatedAt,
  postuid:this.state.postuid,
  })
const data = arr[0];
console.log("mmsssss    "+data);
user= firebaseApp.auth().currentUser.displayName;
    userEmail = firebaseApp.auth().currentUser.email;
    liked = data.likedby ? Object.values(data.likedby).map((project)=>{
      return project.likedby;
    }) : [];
    laughed = data.laughedby ? Object.values(data.laughedby).map((project)=>{
      return project.likedby;
    }) : [];
    saded = data.sadedby ? Object.values(data.sadedby).map((project)=>{
      return project.likedby;
    }) : [];
    disliked = data.dislikedby ? Object.values(data.dislikedby).map((project)=>{
      return project.likedby;
    }) : [];
    function isInArray(d, userEmail) {
      return d.indexOf(userEmail.toLowerCase()) > -1;
      }
  return (
    <ThemeContext.Consumer>
      {theme => (
        <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={gStyle.container[theme]}
    >
        <View style={{flex:1}}>
        <StatusBar hidden={true} />

    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container[theme]}
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#eb144c"
          />
        }
    >
    <Spinner
           visible={this.state.spinner}
           textContent={'جاري التحميل...'}
           textStyle={{color:'#fff'}}
         />
<View style={{flex:1,width: Dimensions.get('window').width,alignItems: 'center'}}>


           <Card
           love={liked && liked.length >0 ? liked.length : 0 }
           inArray={isInArray(liked, userEmail)}
                   dis={isInArray(disliked, userEmail)?()=>this.onUnlike(data,'dislikedby'):()=>this.onLike(data,'dislikedby')}
                   sad={isInArray(saded, userEmail)?()=>this.onUnlike(data,'sadedby'):()=>this.onLike(data,'sadedby')}
                   nolikes={data.love}
                   onLike={()=>this.onLike(data,'likedby')}
                   onUnlike={()=>this.onUnlike(data,'likedby')}
                   nolaugh={laughed && laughed.length >0 ? laughed.length : 0 }
                   nosad={saded && saded.length >0 ? saded.length : 0 }
                   nodis={disliked && disliked.length >0 ? disliked.length : 0 }

                   laugh={isInArray(laughed, userEmail)?()=>this.onUnlike(data,'laughedby'):()=>this.onLike(data,'laughedby')}

             containerStyle={{ alignSelf: 'center'}}
             image={require('../assets/logo.png')}
          show={true}
             theme={theme}
             data={data}

             incs={()=>this.incs(data)}
             theme={theme}
firstno={this.state.firstno}
secondno={this.state.secondno}
thirdno={this.state.thirdno}
             lie={data.liegame}
             first={data.first}
             challenge={data.first=="#800020"?'قبل التحدي':data.first=='steelblue'?'اختار الصراحة':data.first=='yellow'?'اختار باب الحب':'اختار الجرأة'}
             navigation={navigation}
             second={data.second}
             title={data.title}
             user={data.user}
           />
</View>
<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular',color: '#eb144c'}]}>{this.state.status}</Text>

{data.NewChallenge?<View style={{flex:1}}>
     <Textarea onChangeText={(d)=>this.setState({post:d})} style={{width:Dimensions.get('window').width-10,alignSelf: 'center'}} backgroundColor="white" rowSpan={5} bordered placeholder="قم بالرد..."  placeholderTextColor='gray'/>
<View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-end',width: Dimensions.get('window').width,}}>
  <Item picker >
  <Picker

 style={{ height: 50, width: Dimensions.get('window').width,color:'white' }}
 selectedValue={this.state.selected}
   onValueChange={(d)=>this.setState({selected:d})}

>
<Picker.Item label="يمكن للجميع مشاهدة الرد" value="All" />
<Picker.Item label="فقط من يتابعك" value="friend" />

</Picker>


</Item>
<View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'flex-end',width: Dimensions.get('window').width,marginVertical: 10}}>
{this.state.image?<Image source={{uri:this.state.image}} style={{resizeMode: 'contain',width: 50,height: 50,margin: 10}}/>
:null}
<Button

  bordered
  danger
onPress={this._pickImage}
  style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderColor: '#eb144c'}}
>
  <Text style={[gStyle.button,{color:'#eb144c'}]}>اضف صورة</Text>
</Button>

</View>
</View>
<Button

  block

onPress={()=>this.creates(data)}
  style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,backgroundColor: '#eb144c'}}
>
  <Text style={[gStyle.button,{color:'white'}]}>قم بالرد</Text>
</Button>
</View>:null}
             </ScrollView>
    </View>
        </KeyboardAvoidingView>
  )}

</ThemeContext.Consumer>
  )
}
 _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this._handleImagePicked(pickerResult);
  };
_handleImagePicked = async pickerResult => {
    try {
      this.setState({uploading:true})

    this.setState({status:'جاري تحميل الصورة',refreshing:true})
      if (!pickerResult.cancelled) {
          this.setState({image:await uploadImageAsync(pickerResult.uri)})
      }
        console.log("state ===="+image);
    } catch (e) {
      console.log(e);
      this.setState({status:'حدث خظأ اثناء تحميل الصورة',refreshing:false})

    } finally {
      this.setState({uploading:false,refreshing:false})
      this.setState({status:''})


    }
  };


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

export default OpenChallenge;
