import React from "react";
import { KeyboardAvoidingView,Platform,Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,PixelRatio} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea} from 'native-base';
import RNPicker from "rn-modal-picker";
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import * as firebase from 'firebase';
import {  Picker } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';
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
import { Input } from 'react-native-elements';
import uuid from 'uuid';

import { Button,Header,Item,Icon,Label } from 'native-base';
const NORTH_AMERICA = ['CA', 'MX', 'US']
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  console.log(uri+imageName);
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const imageRef = firebaseApp.storage().ref('posts').child(imageName)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


var itemsservice = [
  //name key is must.It is to show the text in front
  { id: 1, name: 'angellist' },
  { id: 2, name: 'codepen' },
  { id: 3, name: 'envelope' },
  { id: 4, name: 'etsy' },
  { id: 5, name: 'facebook' },
  { id: 6, name: 'foursquare' },
  { id: 7, name: 'github-alt' },
  { id: 8, name: 'github' },
  { id: 9, name: 'gitlab' },
  { id: 10, name: 'instagram' },
];
import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import NavigationBack from '../components/NavigationBack';
const colors = [

'#800020',
'steelblue',
'yellow',
'purple',
'black'
];
const weekdays = [


];

import { MaterialCommunityIcons } from 'react-native-vector-icons';
const daily = [

  {day:'Saturday',selected:false},
  {day:'Sunday',selected:false},
  {day:'Monday',selected:false},
  {day:'Tuesday',selected:true},
  {day:'Wednesday',selected:false},
  {day:'Thursday',selected:false},
  {day:'Friday',selected:false},


];
export default class extends React.Component {

  constructor(props) {
    super(props);
  const  cca2 = 'United State'
   const  callingCode = '1'
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        pimg:'https://i.ibb.co/ZJwzJML/users.png',
        text:'',
        cca2:'United State',
      callingCode:'1',
page:1,
game:'',
 isDateTimePickerVisible: false,
        lovemsg:'',
        typeofservice:'local',
        hatemsg:'',
         serverData: [],
           uploading:false,
        lie:'',
        errMsg:'',
        daily:[

          {day:'Saturday',selected:false},
          {day:'Sunday',selected:false},
          {day:'Monday',selected:false},
          {day:'Tuesday',selected:true},
          {day:'Wednesday',selected:false},
          {day:'Thursday',selected:false},
          {day:'Friday',selected:false},


        ],
        Online: [
     {
       id: 1,
       name: "Graphic & Design"
     },
     {
       id: 2,
       name: "Digital Marketing"
     },
     {
       id: 3,
       name: "Writing & Translation"
     },
     {
       id: 4,
       name: "Video & Animation"
     },
     {
       id: 5,
       name: "Music & Audio"
     },
     {
       id: 6,
       name: "Programming & Teach"
     },
     {
       id: 7,
       name: "Business"
     },
     {
       id: 8,
       name: "Lifestyle"
     },
     {
       id: 9,
       name: "Gaming"
     },
     {
       id: 10,
       name: "E-commerce"
     },
     {
       id: 11,
       name: "Book & Ebook Publishing"
     },
     {
       id: 12,
       name: "PodCasting"
     },
     {
       id: 13,
       name: "Potical Campaigns"
     },
     {
       id: 14,
       name: "Influencers"
     }
   ],
        dataSource: [
     {
       id: 1,
       name: "Baby sitting"
     },
     {
       id: 2,
       name: "Barber"
     },
     {
       id: 3,
       name: "Beachbody On Demand"
     },
     {
       id: 4,
       name: "Beauty Services"
     },
     {
       id: 5,
       name: "Car repair"
     },
     {
       id: 6,
       name: "Car Wash"
     },
     {
       id: 7,
       name: "Carpenter"
     },
     {
       id: 8,
       name: "Carpet Repairer"
     },
     {
       id: 9,
       name: "DJ"
     },
     {
       id: 10,
       name: "Computer Repairer"
     },
     {
       id: 11,
       name: "Catering"
     },
     {
       id: 12,
       name: "Doctors"
     },
     {
       id: 13,
       name: "Dog Grooming"
     },
     {
       id: 14,
       name: "Dog Walking"
     },
     {
       id: 15,
       name: "Electricians"
     },
     {
       id: 16,
       name: "Fire Fighters"
     },
     {
       id: 17,
       name: "Fitness Coach"
     },
     {
       id: 18,
       name: "Helpers"
     },
     {
       id: 19,
       name: "Home Cleaning"
     },
     {
       id: 20,
       name: "Home Painting"
     },
     {
       id: 21,
       name: "Insurance Agent"
     },
     {
       id: 22,
       name: "Interior Decorator"
     },
     {
       id: 23,
       name: "Lawn Care"
     },
     {
       id: 24,
       name: "Lawn Mowing"
     },
     {
       id: 25,
       name: "Lawyers"
     },
     {
       id: 12,
       name: "Lock Smith"
     },
     {
       id: 12,
       name: "Maids"
     },
     {
       id: 12,
       name: "Massage"
     },
     {
       id: 12,
       name: "Mechanic"
     },
     {
       id: 12,
       name: "Mobile Technician"
     },
     {
       id: 12,
       name: "Office Cleaning"
     },
     {
       id: 12,
       name: "Party Cleaning"
     },
     {
       id: 12,
       name: "Pest Control"
     },
     {
       id: 12,
       name: "Physiotharaphy Services"
     },
     {
       id: 12,
       name: "Tutor / Teacher"
     },
     {
       id: 12,
       name: "Physiotharaphy Services"
     },
     {
       id: 12,
       name: "Psychologists"
     },
     {
       id: 12,
       name: "Road Assistance"
     },
     {
       id: 12,
       name: "Security Guard"
     },
     {
       id: 12,
       name: "Snow Plows"
     },
     {
       id: 12,
       name: "Sofa Repair"
     },
     {
       id: 12,
       name: "Spa"
     },
     {
       id: 12,
       name: "Tour Guide"
     },
     {
       id: 12,
       name: "Tow Truck"
     },
     {
       id: 12,
       name: "Translator"
     },
     {
       id: 12,
       name: "Travel Agent"
     },
     {
       id: 12,
       name: "Private language tutor / teacher"
     },
     {
       id: 12,
       name: "TV Repairer"
     },
     {
       id: 12,
       name: "Vet"
     },
     {
       id: 12,
       name: "Workers"
     },
     {
       id: 12,
       name: "Yoga Trainer"
     },
     {
       id: 12,
       name: "Developer"
     }
     ,
     {
       id: 12,
       name: "Design"
     },
     {
       id: 12,
       name: "Design"
     },
     ,
     {
       id: 12,
       name: "other"
     }



   ],
   name:props.name,
   major:'',
   age:0,
   bio:'',
   year:'First year',
   fac:'Hijjawi',
   placeHolderText: "Select your career",
   selectedText: "",
        title:'',
postStatus:null,
        color1:'steelblue',
        color:'#800020',
        commentsRef:'',
        time:'',
        dataSources: [],
firstlie:'',
secondlie:'',
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]
    this.currentUserId=''
    this.currentusername=''



  }
  _pickImage = async () => {
    const newPostKey = firebaseApp.database().ref('posts').push().key
const imageName = `${newPostKey}.jpg`

    const cam_options = {
    mediaType: 'photo',
    maxWidth: 600,
    maxHeight: 600,
    quality: 1,
    noData: true,
  };
  ImagePicker.showImagePicker(cam_options, (response) => {
    if (response.didCancel) {
    }
    else if (response.error) {
    }
    else {

      uploadImage(response.uri,imageName).then(url => {
        this.setState({
          imagePath: response.uri,
          status:'جاري تحميل الصورة',
          pimg:url,
          imageHeight: response.height,
          imageWidth: response.width,
          uploading:false
        })
    })

    }
  })
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };


   };
 _handleImagePicked = async pickerResult => {
     try {
       this.setState({uploading:true})

     this.setState({status:'جاري تحميل الصورة',refreshing:true,uploading:false})
       if (!pickerResult.cancelled) {
           this.setState({pimg:await uploadImageAsync(pickerResult.uri),uploading:false})
       }

     } catch (e) {
       console.log(e);
       this.setState({status:'حدث خظأ اثناء تحميل الصورة',refreshing:false})

     } finally {
       this.setState({uploading:false,refreshing:false})
       this.setState({status:''})


     }
   };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.currentUserId=user.uid
      this.currentusername=user.displayName
      firebaseApp.database().ref('users').child(user.uid).once('value')
           .then((snapshot) => {
if (snapshot.val().image) {
  this.setState({pimg:snapshot.val().image,

    name:snapshot.val().name,


    })

}


           })
    })

  }
  _selectedValue(index, item) {
  this.setState({ selectedText: item.name });
}

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title:  'Offer Service'
  });
send=()=>{
  Alert.alert(
  'هل تريد من صديقك معرفة اسمك؟',
  'عند الارسال بسرية لا يستطيع صديقك معرفة هويتك',
  [
    {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
    {text: 'ارسل بسرية', onPress:this.createsecret, style: 'cancel'},
    {text: 'ارسال', onPress: this.create},
  ],
  { cancelable: false }
)
}
  onValueChange1(value: string) {
    this.setState({
      title: value,
    });
  }
  onValueChange2(value: string) {
    this.setState({
      lie: value,
    });
  }
  create = () => {
    this.setState({
      ploading:true,
      postStatus: 'Completing..',
      shows:true,pcolor:'warning'
    })
    console.log("title===="+this.state.title);
    const newPostKey = firebaseApp.database().ref('door').push().key

          const uid = this.state.myuid
          const username = this.state.username
const userid =this.state.data.userId

  if (this.state.title.length !=='null') {
    if (this.state.lovemsg.length >0||this.state.hatemsg.length >0||(this.state.title=='lie'&&this.state.firstlie.length>0&&this.state.secondlie.length>0&&this.state.thirdlie.length>0&&this.state.lie.length>0)) {



          const postData = {
            writerId:uid,
            title:this.state.title,
            user:username,
          firstdoor:this.state.lovemsg,
          seconddoor:this.state.hatemsg,
          firstLock:true,
          secondlock:true,
          accept:false,
          lie:this.state.lie,
          firstlie:this.state.firstlie,
          secondlie:this.state.secondlie,
          thirdlie:this.state.thirdlie,
          onedoor:this.state.title ==='truth'||this.state.title=='challenge'?true:false,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP,
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          updates['Doors/' + userid+'/'+newPostKey] = postData

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

          firebaseApp.database().ref().update(updates)
          .then(() => {
            fetch('https://onesignal.com/api/v1/notifications',
             {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': "Basic NWZjZmVkNGUtNjNmNC00NGFjLTkwOWUtYTc5NzZhMzg3ZTky",
               },
               body: JSON.stringify(
               {
                 app_id: "45117f3a-d813-446a-b656-164bab41bf51",
                 included_segments: ["All"],
                 headings: {"en": "هناك من ارسل لك باب سري"},
                 android_sound: "fishing",
                 data: {"puid": newPostKey, "new_message":true},
                 ios_sound: "fishing.caf",
                 contents: {"en": "شخص ما ارسل لك باب سري افتح الباب لتقرأ ما بداخله" },
        filters: [{"field":"tag","key":"uid","relation":"=","value":userid}],
               })
             })
             .then((response) => response.json())
             .then((responseData) => {
                 console.log("Push POST:" + JSON.stringify(responseData));
                 responseData.json()
             })
            this.setState({
                            postStatus: 'تم شكرا لك.',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false})
  alert('تم ارسال رسالتك')
this.props.navigation.goBack()

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'#800020' })
          })

        .catch(error => {
          console.log(error)
        })



    } else {

        this.setState({ploading:false,  postStatus: 'الرجاء عدم ترك ايا حقل فارغ',shows:true ,pcolor:'#800020'})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: 'الرجاء اختيار عنوان',shows:true ,pcolor:'#800020'})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }
this.inc()


  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({time:Moment(date).format('LT') })
    this.hideDateTimePicker();
  };
   inc=()=>{



          firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/balance`).transaction(function(currentClicks) {
    // If node/clicks has never been set, currentRank will be `null`.
    return (currentClicks || 0) - 2;
  })


  }
     onSelectColor(color) {
       this.setState({ color });
     }
     onSelectColor1(color1) {
       this.setState({ color1 });
     }
  render() {

    const {navigation}=this.props
    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>

          <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={gStyle.container[theme]}
        >
      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.containersssss[theme]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={'Loading...'}
             textStyle={{color:'#fff'}}
           />
<Text style={{color:'#800020'}}>{this.state.errMsg}</Text>
           {this.state.page==1?this.AddTitle(theme):null}




           <Button
             block

onPress={this.Edit}
             style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#d0021b"}}
           >
             <Text style={[gStyle.button,gStyle.text['dark']]}>تعديل</Text>
           </Button>

      </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }
  Edit = () => {
    const uid = this.currentUserId
    const username = this.currentusername



    if (this.state.name.length < 0) {
      this.setState({ errMsg: "الرجاء ادخال الاسم" })
    }
    else {
      this.setState({ errMsg: "جاري حفظ الاسم" })
      firebaseApp.auth().onAuthStateChanged(user => {

      user.updateProfile({ displayName: this.state.name })
      })
if (this.state.pimg&&this.state.pimg.length>0) {
    this.setState({ errMsg: "جاري حفظ الصورة" })
    let updates = {}



}
firebaseApp.database().ref('users/' + uid).update({image:this.state.pimg,name:this.state.name})
.then(() => {
  this.setState({
                  errMsg: 'تم التعديل',

                })



  setTimeout(() => {
  }, 1000)
})
    }









  }
  createsecret = () => {
    this.setState({
      ploading:true,
      postStatus: 'جاري الارسال..',
      shows:true,pcolor:'warning'
    })
    const newPostKey = firebaseApp.database().ref('door').push().key

          const uid = this.state.myuid
          const username = this.state.username
const userid =this.state.data.userId

  if (this.state.title.length !=='null') {
    if (this.state.lovemsg.length >0||this.state.hatemsg.length >0||(this.state.title=='lie'&&this.state.firstlie.length>0&&this.state.secondlie.length>0&&this.state.thirdlie.length>0&&this.state.lie.length >0&&this.state.lie.length>0)) {

          const postData = {
            writerId:uid,
            title:this.state.title,
            user:'مجهول',
          firstdoor:this.state.lovemsg,
          seconddoor:this.state.hatemsg,
          firstLock:true,
          secondlock:true,
          accept:false,
          lie:this.state.lie,
          firstlie:this.state.firstlie,
          secondlie:this.state.secondlie,
          thirdlie:this.state.thirdlie,
          onedoor:this.state.title ==='truth'||this.state.title=='challenge'?true:false,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP,
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          updates['Doors/' + userid+'/'+newPostKey] = postData

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

          firebaseApp.database().ref().update(updates)
          .then(() => {
            fetch('https://onesignal.com/api/v1/notifications',
             {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': "Basic NWZjZmVkNGUtNjNmNC00NGFjLTkwOWUtYTc5NzZhMzg3ZTky",
               },
               body: JSON.stringify(
               {
                 app_id: "45117f3a-d813-446a-b656-164bab41bf51",
                 included_segments: ["All"],
                 headings: {"en": "هناك من ارسل لك باب سري"},
                 android_sound: "fishing",
                 data: {"puid": newPostKey, "new_message":true},
                 ios_sound: "fishing.caf",
                 contents: {"en": "شخص ما ارسل لك باب سري افتح الباب لتقرأ ما بداخله" },
        filters: [{"field":"tag","key":"uid","relation":"=","value":userid}],
               })
             })
             .then((response) => response.json())
             .then((responseData) => {
                 console.log("Push POST:" + JSON.stringify(responseData));
                 responseData.json()
             })
            this.setState({
                            postStatus: 'تم شكرا لك.',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false})
  alert('تم ارسال رسالتك')
this.props.navigation.goBack()

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'#800020' })
          })

        .catch(error => {
          console.log(error)
        })




    } else {

        this.setState({ploading:false,  postStatus: 'الرجاء عدم ترك ايا حقل فارغ',shows:true ,pcolor:'#800020'})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: 'الرجاء اختيار عنوان',shows:true ,pcolor:'#800020'})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }

this.inc()

  }

AddTitle = (theme) => {
return (
  <View style={{flex:1,marginVertical: 10,width:width,marginTop: 40}}>
  <TouchableOpacity onPress={this._pickImage} style={{alignItems: 'center',justifyContent: 'center',marginVertical: 10}}>
  <Thumbnail large source={this.state.pimg?{uri:this.state.pimg}:require('../assets/users.png')} style={{alignSelf: 'auto'}}/>
  <Text style={{color:'#d0021b'}}>تعديل صورة الشخصية</Text>
  </TouchableOpacity>
  <Input inputStyle={{backgroundColor: '#fff',padding: 10,borderWidth: 0.4,marginVertical: 10,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"تعديل الاسم"} value={this.state.name}   onChangeText={(text) => this.setState({ name: text })}
  />



          </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}>


              <Item picker style={{marginVertical:10}} >
              <Picker

             style={{ height: 50, width: width-20,marginVertical: 10}}
             selectedValue={this.state.title}
             onValueChange={this.onValueChange1.bind(this)}

            >

            <Picker.Item label="I Don't Work at any place yet" value="don't work" />
            <Picker.Item label="I own/work at company" value="own" />

            </Picker>
              </Item>

              </View>
)
}
onUpdateItem = (i,d) => {
  this.setState({
    daily: this.state.daily.map(el => (el.day === i ? {...el, selected:!d} : el))
  });
 };

AddChallenge = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10,paddingVertical: 20}}>

  <Form style={{width:width,marginTop: 20,paddingHorizontal: 10}}>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"Major e.g: Computer engineering.."}  value={this.state.major}  onChangeText={(text) => this.setState({ major: text })}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Select Factuality
  </Label>
        <Item picker style={{marginVertical:10}} >
        <Picker

       style={{ height: 50, width: width,marginVertical: 10}}
       selectedValue={this.state.fac}
       onValueChange={(d)=> this.setState({fac:d})}

      >
      <Picker.Item label="Hijjawi" value="Hijjawi" />

      <Picker.Item label="Science" value="Science" />

      <Picker.Item label="Medicine" value="Medicine" />
      <Picker.Item label="IT" value="IT" />

      <Picker.Item label="Physical Education" value="Physical Education" />
      <Picker.Item label="Law" value="Law" />
      <Picker.Item label="Fine Art" value="Fine Art" />
      <Picker.Item label="Tourism and Hotel Management" value="Tourism and Hotel Management" />
      <Picker.Item label="Pharmacy" value="Pharmacy" />
      <Picker.Item label="The Language Center" value="The Language Center" />
      <Picker.Item label="Economics and Administrative Science" value="Economics and Administrative Science" />
      <Picker.Item label="Shariaa & Islamic" value="Shariaa & Islamic" />

      </Picker>
        </Item>
        <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
        You are in (years in University)
        </Label>
              <Item picker style={{marginVertical:10}} >
              <Picker

             style={{ height: 50, width: width,marginVertical: 10}}
             selectedValue={this.state.year}
             onValueChange={(d)=> this.setState({year:d})}


            >
            <Picker.Item label="First year" value="First year" />

            <Picker.Item label="Second year" value="Second year" />

            <Picker.Item label="Third year" value="Third year" />
            <Picker.Item label="Fourth year" value="Fourth year" />

            <Picker.Item label="Fifth year" value="Fifth year" />
            <Picker.Item label="Sixth year" value="Sixth year" />
            <Picker.Item label="Seventh year" value="Seventh year" />

            </Picker>
              </Item>

            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب شئ يتطلب الجرأة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.hatemsg} onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="ماذا تريد من صديقك ان يفعل اذا اختار باب الجرأة.." />
            </Form>
              </View>
)
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingVertical: 20}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-start',marginRight: 20}]}>Contact info</Text>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Phone number
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"+13235334433"}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Web url
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"www.opentiq.com"}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Web url
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"e.g: info@opentiq.com"}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Facebook url
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://fb.com/opentiq"}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Instagram account
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"Opentiq"}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Twitter url
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  linkedin url
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Youtube link url
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
     </Form>


              </View>
)
}
lovedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب اكثر شئ تحبه في صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا يعجبك اكثر في شخصية صديقك.." />
            </Form>
              </View>
)
}
hatedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>ماذا تكره في شخصية صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea  rowSpan={5} style={gStyle.text[theme]} value={this.state.hatemsg}  onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="مالذي تكرهه في شخصية صديقك.." />
            </Form>
              </View>
)
}
liegame = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>باب الكذب</Text>
  <Text style={[gStyle.p,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>طريقة اللعب: يجب كتابة 3 كذبات اثنان منهم حقيقة وواحدة كذب يجب على صديقة معرفة الكذبة</Text>

  <Form style={{width:width-10 }}>
              <Textarea onChangeText={(firstlie)=>this.setState({firstlie})} value={this.state.firstlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الاولى" />
              <Textarea  onChangeText={(secondlie)=>this.setState({secondlie})} value={this.state.secondlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثانية"/>

              <Textarea  onChangeText={(thirdlie)=>this.setState({thirdlie})} value={this.state.thirdlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثالثة" />
              <Item picker >
              <Picker

              style={{ height: 50, width: width,color:'white' }}
              selectedValue={this.state.lie}
              onValueChange={this.onValueChange2.bind(this)}

              >
              <Picker.Item label="اختر الكذبة" value="" />

              <Picker.Item label="الاولى" value="first" />
              <Picker.Item label="الثانية" value="second" />
              <Picker.Item label="الثالثة" value="third" />

              </Picker>
              </Item>
            </Form>
              </View>
)
}
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemSeparatorStyle:{
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3"
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 21,
    elevation:3,
    paddingRight: 25,
    marginRight: 12,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});
