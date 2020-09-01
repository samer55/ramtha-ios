import React from 'react';
import {Share as Shared, KeyboardAvoidingView,Platform,Image, Text,FlatList, StatusBar,View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Icon,Input,Textarea ,Left,Right,Body} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,Spinner as SSpinner ,List,ListItem,Content} from 'native-base';
import Card from '../components/Card';
import NavigationBack from '../components/NavigationBack';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import * as firebase from 'firebase';
const { width } = Dimensions.get("screen");
import Trainer from '../components/Trainer';
import { FontAwesome } from 'react-native-vector-icons';

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
class Profile extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,

    headerRight:null,
    headerTitleStyle: gStyle.headerTitleStyle,
    title: 'صفحة اللاعب'
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
      friend:false,

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
userdata:[],

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

        firebaseApp.database().ref('users/' + data).on('value',
        (snapshot) => {





          val = snapshot.val()
           let available =[]
          if (snapshot.val()) {


            this.setState({
              userdata:snapshot.val(),
balance:snapshot.val().balance,
email:snapshot.val().email,
username:snapshot.val().username,
name:snapshot.val().name,

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
  const data =  navigation.getParam('data', []);
  firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).child(data.toLowerCase()).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              this.setState({friend:true,refreshing:false})
            }else {
              this.setState({refreshing:false,friend:false})

            }
          })
this.DisplayPosts(data)
  }
  _onRefresh = () => {
   this.setState({refreshing: true});
   const {navigation}=this.props
 const data =  navigation.getParam('data', []);
 firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).child(data.toLowerCase()).once('value')
         .then((snapshot) => {
           if (snapshot.val()) {
             this.setState({friend:true,refreshing:false})
           }else {
             this.setState({refreshing:false,friend:false})

           }
         })
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

    this.setState({status:'تم النشر',post:'',image:null,refreshing:false,spinner:false,clicked:false})
    this.inc(3,userid,data.postuid)
    this.notification(data,newPostKey)

  alert('تم الرد')
  this.props.navigation.goBack()

          })
          .catch(() => {

          this.setState({status:'حدث شئ خاطئ',refreshing:false,spinner:false,clicked:false})

          })

        .catch(error => {
          console.log(error)
        })




  } else {
  this.setState({status:'الرجاء كتابة الرد',refreshing:false,spinner:false,clicked:false})

  }


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

     firebaseApp.database().ref(`notification/${data}/${newPostKey}`).update({
         username:firebaseApp.auth().currentUser.displayName,
         noti:`${firebaseApp.auth().currentUser.displayName} ارسل لك طلب صداقة`,
         postuid:notkey,
         friend:true,
           createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: new Date().getTime()+(60*60*48*1000),
         notuid:newPostKey
     });

  }
  onLike = (data,d) => {
  firebaseApp.database().ref().child('Posts').child(data.postuid).child(d).push({
    likedby: firebaseApp.auth().currentUser.email
  })
     this.DisplayPosts(data)
};

 onUnlike = (data,d) => {
  let ref = firebaseApp.database().ref('Posts').child(data.postuid).child(d);
    ref.orderByChild('likedby').equalTo(firebaseApp.auth().currentUser.email).once('value', snapshot => {
      let updates = {};
      snapshot.forEach(child => updates[child.key] = null);
      ref.update(updates);
  });
     this.DisplayPosts(data)
};
sendreq = () => {
  this.setState({
    ploading:true,
    postStatus: 'جاري الارسال..',
    shows:true,pcolor:'warning'
  })
  const newPostKey = firebaseApp.database().ref('friends').push().key

        const uid = firebaseApp.auth().currentUser.uid
        const {navigation}=this.props
      const uuid =  navigation.getParam('data', []);

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
           headings: {"en": "طلب صداقة"},
           android_sound: "fishing",
           data: {"puid": newPostKey, "new_message":true},
           ios_sound: "fishing.caf",
           contents: {"en": firebaseApp.auth().currentUser.displayName +" ارسل لك طلب صداقة على تطبيق الباب السري" },
        filters: [{"field":"tag","key":"uid","relation":"=","value":uuid}],
         })
       })
       .then((response) => response.json())
       .then((responseData) => {
           console.log("Push POST:" + JSON.stringify(responseData));
           responseData.json()
       })

        const postData = {
          userId:uid,
          username:firebaseApp.auth().currentUser.displayName,
      accept:false,
        status:'send',
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,

        }

        let updates = {}
        let updatess = {}

        updates['friendsreq/' +uuid +'/'+uid] = postData

          //  updates["data/"+newPostKey+'/name'] =state.tag
  //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

        firebaseApp.database().ref().update(updates)
        .then(() => {

          this.setState({
                          postStatus: 'تم ارسال طلب صداقة',
                      refreshing:false,

                        })

alert('تم ارسال طلب الصداقة')
this.notification(uuid,uid)

        })
        .catch(() => {
          this.setState({ postStatus: 'Something went wrong!!!',pcolor:'#800020' })
        })

      .catch(error => {
        console.log(error)
      })
}

deletefriend=()=>{
  const {navigation}=this.props
const uuid =  navigation.getParam('data', []);
console.log("uuid+ "+uuid);



      firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).on('value', function(snapshot) {
    snapshot.ref.uuid.remove();
    })
this._onRefresh()

 }

render(){
  const {navigation}=this.props
  const uuid =  navigation.getParam('data', []);

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
         <Trainer
           theme={theme}
           icon="ios-wifi"
           title={this.state.username}
           imageSrc={require('../assets/users.png')}
name={this.state.name}
           details={this.state.balance}
         />
        <View
           style={{
             flex: 1,
             padding: 20,
             justifyContent: 'space-around',
             alignItems: 'center',
             flexDirection: 'row',
         width
           }}
         >
           <Button

             bordered
             danger
             disabled={this.state.page==1?true:false}
              onPress={()=>navigation.navigate('Write',{data:this.state.userdata,myuid:firebaseApp.auth().currentUser.uid,username:firebaseApp.auth().currentUser.displayName})}

             style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5}}
           >
             <Text style={[gStyle.button,{color:'#eb144c'}]}>اكتب</Text>
           </Button>
           <Button
             block
onPress={this.state.friend?()=>{
     firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).child(uuid.toLowerCase()).set(null)
     firebaseApp.database().ref(`friends/${uuid}`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(null)
this._onRefresh()
}:this.sendreq}
             style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#eb144c"}}
           >
             <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.friend?'الغاء الصداقة':'اضف كصديق'}</Text>
           </Button>
         </View>
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

export default Profile;
