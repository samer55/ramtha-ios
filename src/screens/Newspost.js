import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,Image,PixelRatio,ImageBackground,ActivityIndicator} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea,Switch} from 'native-base';
import RNPicker from "rn-modal-picker";
import Mappickers from './Mappickers';
import { TextInputMask } from 'react-native-masked-text'
import Loading from './Loadingpage';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

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

import { Button,Header,Item,Icon,Label } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
const offers = [
  {
id:0,
img:'https://i.ibb.co/yBqVkH6/discount.png',
name:'اختر قسم',
type:'web-design',

  },
  {
id:1,
img:'https://i.ibb.co/PWC4sTg/contract.png',
name:'افراح وتهاني',
type:'Graphics',
section:['دعوة حضور مناسبة','تقديم تهنئة وتبريك']
  },
  {
id:2,
img:'https://i.ibb.co/QPPVpt4/sheet.png',
name:'عزاء مواساة',
type:'Writer',
section:['موقع العزاء','تقديم تعزية ومواساة']

  },
  {
id:3,
img:'https://i.ibb.co/M66Wsvy/commerce-and-shopping.png',
name:'مواد تموينية',
type:'web-design',
section:['جملة ومفرق','خضراوات وفواكه','لحوم واسماك','دواجن','مخابز','مطاحن وتمور','سوبر ماركت','مول','اخرى']
  },
  {
id:4,
img:'https://i.ibb.co/VVQYkpr/tray.png',
name:'مطاعم وطبخ منزلي',
type:'web-designs',
section:['شاورما ودجاج','مشويات','حمص وفول وفلافل','فطاير','طبخ ارز','طبخ منزلي','اخرى']

  },
  {
id:5,
img:'https://i.ibb.co/QKgH1bn/cabinets.png',
name:'اثاث منزلي',
type:'web-design',
section:['جديد','مستعمل','دراي كلين وتنظيف']

  },
  {
id:6,
img:'https://i.ibb.co/V3qHRKK/people.png',
name:'مستلزمات الأسرة',
type:'web-design',
section:['اطفال','رجال','نساء','نظارات','دراي كلين ملابس','خياطة','اخرى']

  },
  {
id:7,
img:'https://i.ibb.co/HnppRnm/phone-2.png',
name:'الكترونيات',
type:'web-design',
section:['موبايلات','كمبيوترات','العاب الكترونية','كاميرات','اجهزة منزلية','تصليح','اخرى']

  },
  {
id:8,
img:'https://i.ibb.co/b5phSdk/transport.png',
name:'سيارات ومحركات',
type:'web-design',
section:['بيع وشراء','الصناعية للتصليح','تعليم قيادة','للأجرة','دراي كلين غسيل','زينة سيارات','جنطات وعجلات','اخرى']

  },
  {
id:9,
img:'https://i.ibb.co/bsFvVfJ/laptop.png',
name:'مهن مختلفة ووظائف',
type:'web-design',
section:['طبيب','طبيب بيطري','صيدليات وصيادلة','محامين','تعليم','وظائف','متفرقة']

  },
  {
id:10,
img:'https://i.ibb.co/f4LHmMJ/industry.png',
name:'مقاولات وحرف',
type:'web-design',
section:['مقاول بناء','مواسرجي','أعمال بناء','معامل','دهان','أعمال ديكور','نجار','مواد بناء','بليط','زجاج','حداد','فني تكييف','خدمات تنظيف','زراعة وحدائق','كهربائي','فني ستالايت','حفريات','أعمال المنيوم ومطابخ','اخرى']

  },
  {
id:11,
img:'https://i.ibb.co/6m2Fcvv/animal-kingdom.png',
name:'طيور وحيوانات',
type:'web-design',
section:['طيور','حيوانات','أسماك زينة','مستلزمات واطعمة','أخرى']

  },
  {
id:12,
img:'https://i.ibb.co/VLt1fX5/eating.png',
name:'ادوات منزلية',
type:'web-design',
section:[]

  },
  {
id:13,
img:'https://i.ibb.co/rf7HyHZ/money-2.png',
name:'محلات صرافة',
type:'web-design',
section:[]
  },
  {
id:14,
img:'https://i.ibb.co/KzGbCrx/transportation.png',
name:'سياحة وسفر',
type:'web-design',
section:[]
  },
  {
id:15,
img:'https://i.ibb.co/94Y9058/show.png',
name:'تجهيزات افراح',
type:'web-design',
section:[]
  },
  {
id:16,
img:'https://i.ibb.co/RDdzT09/woman.png',
name:'خدمات عزاء',
type:'web-design',
section:[]
  },
  {
id:17,
img:'https://i.ibb.co/2jwkRgp/holidays.png',
name:'رياضة',
type:'web-design',
section:['ذكور','اناث']
  },
  {
id:18,
img:'https://i.ibb.co/YdL2Nv7/track.png',
name:'تكسي وتوصيل ونقل',
type:'web-design',
section:[]
  },
  {
id:19,
img:'https://i.ibb.co/9ZCJTWK/kitchen.png',
name:'عطارين',
type:'web-design',
section:[]
  },
  {
id:20,
img:'https://i.ibb.co/sjH71LC/pencils.png',
name:'مكتبات وقرطاسية',
type:'web-design',
section:[]
  },
  {
id:21,
img:'https://i.ibb.co/Zcxnznb/elegant.png',
name:'ذهب ومجوهرات',
type:'web-design',
section:[]
  },

  {
id:22,
img:'https://i.ibb.co/yWwxJJ2/food.png',
name:'عسل واعشاب',
type:'web-design',
section:[]
  },
  {
id:23,
img:'https://i.ibb.co/B34FBwz/menu.png',
name:'اخرى',
type:'web-designf',
section:[]
  }

];

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
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';

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
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer
export default class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        text:'',
        advanced:0,
page:1,
demo1: {},
  demo2: {},
  list: [],
  swipeablePanelActive: false,
  demo3: {},
  demo4: {},
game:'',
 isDateTimePickerVisible: false,
        lovemsg:'',
        typeofservice:'important',
        hatemsg:'',
         serverData: [],
        lie:'',
        cca2:'US',
        callingCode:'1',
        daily:[

          {day:'Saturday',selected:false},
          {day:'Sunday',selected:false},
          {day:'Monday',selected:false},
          {day:'Tuesday',selected:true},
          {day:'Wednesday',selected:false},
          {day:'Thursday',selected:false},
          {day:'Friday',selected:false},


        ],
        Online: [],
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
   placeHolderText: "Select industry",
   selectedText: "اختر فرع",
        title:'',
        typeofservices:'Doctor',
        Adphone:0,
        Adwhats:'+962',
        Admail:'',
        international:'+962',
postStatus:null,
Addes:'',
city:'Ramtha',
Adtitle:'',
        color1:'steelblue',
        color:'#800020',
        image:'',
        commentsRef:'',
        used:false,
        time:'',
        region: {
          latitude:0,
          longitude: 0,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        },
        dataSources: [],
data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('myuid',''),
secret:  props.navigation.getParam('secret',false),
firstlie:'',
  multiSliderValue: [0, 0],
secondlie:'',
typeofjob:'full',
ind:0,
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }
  componentDidMount() {

  }
  _selectedValue(index, item) {
  this.setState({ selectedText: item.name });
}

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <View style={{ flex: 1 }} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title:  'اضف خبر'
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
  handleOpen = () => {
   this.setState({ show: true })
 }

 handleClose = () => {
   this.setState({ show: false })
   this.props.navigation.goBack()
 }
    openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };

    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };
  onValueChange2(value: string) {
    this.setState({
      lie: value,
    });
  }
  create = () => {
    this.setState({
      ploading:true,
      postStatus: 'جاري الاعلان..',
      shows:true,pcolor:'warning'
    })
    const newPostKey = firebaseApp.database().ref('News').push().key




  if (this.state.Adtitle.length >0) {
  if (this.state.Addes.length>0) {
          const postData = {
            writerId:firebaseApp.auth().currentUser.uid,
            title:this.state.Adtitle,
            user:firebaseApp.auth().currentUser.displayName,
          typeofservice:this.state.typeofservice,
          city:this.state.city,
        about:this.state.Addes,
        img:this.state.list,
          accept:false,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP,
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          updates['News/' +newPostKey] = postData
          firebaseApp.database().ref().update(updates)
          .then(() => {
          { /* fetch('https://onesignal.com/api/v1/notifications',
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
             })*/}
             setTimeout(() => {
               this.setState({
                               postStatus: 'تم شكرا لك.',
                               placeHolderText: "Select industry",
                               selectedText: "اختر فرع",
                                    title:'',
                                    typeofservices:'Doctor',
                                    Adphone:0,
                                    Adwhats:'+962',
                                    Admail:'',
                                    international:'+962',
                          list:[],
                            Addes:'',
                            city:'Ramtha',
                            Adtitle:'',
                                    color1:'steelblue',
                                    color:'#800020',
                                    image:'',
                                    commentsRef:'',
                                    time:'',


                             })
                             this.setState({shows:false})
                           this.props.navigation.navigate('Home')

           }, 3000)


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'#800020' })
          })

        .catch(error => {
          console.log(error)
        })

      } else {

        this.setState({ploading:false,  postStatus: 'الرجاء اضافة شرح وتفاصيل',shows:true ,pcolor:'#800020'})
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

  }
  displayCategories = (i) => {
    this.setState({refreshing:true})
    var ref = firebaseApp.database().ref("list/"+this.state.ind+'/secdata'); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
if (i==child.val().indsec) {
   items.push(child.val());
}



        });

        this.setState({ Online: Object.values(items),refreshing:false});

    });

  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  _pickImage = async () => {
     let pickerResult = await ImagePicker.launchImageLibraryAsync({
       allowsEditing: true,
       aspect: [4, 3],
     });
     this._handleImagePicked(pickerResult);
   };
   onAddItem = (s) => {
      this.setState(state => {
        const list = [...state.list, s];

        return {
          list,

        };
      });
    };
 _handleImagePicked = async pickerResult => {
     try {
       this.setState({uploading:true,swipeablePanelActive:false})

     this.setState({status:'uploading',refreshing:true})
       if (!pickerResult.cancelled) {

           this.setState({image:await uploadImageAsync(pickerResult.uri)})
           this.onAddItem(await uploadImageAsync(pickerResult.uri))
       }
         console.log("state ===="+image);
     } catch (e) {
       console.log(e);
       this.setState({status:'Something went wrong',refreshing:false})

     } finally {
       this.setState({uploading:false,refreshing:false})
       this.setState({status:''})


     }
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


        {this.state.postStatus==='جاري الاعلان..' ? <Loading/> :     <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.containersssss[theme]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={'Loading...'}
             textStyle={{color:'#fff'}}
           />
           <SCLAlert
                    theme="success"
                    show={this.state.show}
                    title="تهانينا"
                    subtitle="تم نشر اعلانك بنجاح"
                  >
                    <SCLAlertButton theme="default" onPress={this.handleClose}>حسنا</SCLAlertButton>

                  </SCLAlert>
           {this.state.page==1?this.AddTitle(theme):null}
           {this.state.page==1?this.AddTruth(theme):null}
           {this.state.page==2?this.AddChallenge(theme):null}
           {this.state.page==3?this.Adddare(theme):null}
           {this.state.page==3&&this.state.title=='both'?this.Adddare(theme):null}
           {this.state.page==2&&this.state.title=='love'?this.lovedoor(theme):null}
           {this.state.page==3&&this.state.title=='love'?this.hatedoor(theme):null}
           {this.state.page==2&&this.state.title=='lie'?this.liegame(theme):null}





{!this.state.secret?<View
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
    onPress={()=>this.setState({page:--this.state.page})}

    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5}}
  >
    <Text style={[gStyle.button,{color:'#800020'}]}>السابق</Text>
  </Button>
  <Button
    block
onPress={this.state.page==3?this.create:()=>{this.setState({page:++this.state.page})}}
    style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#800020"}}
  >
    <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==3?'اعلن':'التالي'}</Text>
  </Button>
</View>:null}

<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21}]}>{this.state.postStatus}</Text>

      </ScrollView>}

      </View>
    )}

  </ThemeContext.Consumer>

    );
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
                 'Authorization': "Basic NmIxNTQ4OWEtMzgzZi00YjI5LWFjM2EtYzdmNjYyYTUxNmZl",
               },
               body: JSON.stringify(
               {
                 app_id: "092f9c3e-c1c4-4952-abdc-4dcd497ceddb",
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
  onRemoveItem = i => {
    this.setState(state => {
      const list = state.list.filter((item, j) => i !== j);

      return {
        list,
      };
    });
  };

  onChange = demo => (index, selectedItem) => {
    this.setState({
      [demo]: {
        index,
        ...selectedItem,
      }
    })
  }
AddTitle = (theme) => {
return (
  <View style={{flex:1,marginVertical: 10}}>
  <Form style={{width:width }}>

  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
    placeholder='اضف عنوان ..' onChangeText={(Adtitle)=>this.setState({Adtitle})} value={this.state.Adtitle}
  />

  </Form>
  <View style={{flex:1,marginVertical: 10,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>

           </View>
  <Item picker styke={{marginVertical:10,alignSelf:'center',alignItems:'center'}} >
  <Picker

  style={{ height: 50, width: width-20,alignSelf: 'center',marginVertical: 10}}
  selectedValue={this.state.typeofservice}
  onValueChange={(d,i)=>this.setState({typeofservice:d,ind:i})}

  >
  <Picker.Item label={'عاجل'} value={'important'} />
  <Picker.Item label={'وفيات'} value={'died'} />
  <Picker.Item label={'اخر الاخبار'} value={'last'} />

  </Picker>
  </Item>


          </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 20}}>




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
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10}}>

  <Form style={{width:width-10 }}>

  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  تفاصيل وشرح
  </Label>

              <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]} value={this.state.Addes} onChangeText={(Addes)=>this.setState({Addes})} bordered placeholder="اضف تفاصيل ,شرح, دعوة.." />


            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  صور عن الخبر
  </Label>

  <View style={{alignItems: 'center',marginVertical: 10}}>
  <ScrollView horizontal={true}>
  {this.state.list.length===0?<TouchableOpacity onPress={this._pickImage} style={{marginHorizontal: 10,flex:1,width: 150,height: 100,borderRadius: 12,backgroundColor:'#fff',borderColor:'#800020',borderWidth: 0.5,alignItems: 'center',justifyContent: 'center'}}>
  <Icon name='image' style={{color:'#eb3349'}}/>

  <Text style={{color:'#800020'}}>اضف صورة</Text>
  </TouchableOpacity>:null}

  {this.state.list.map((item,index) => (
    <ImageBackground source={{uri:item}} style={{marginHorizontal: 10,borderRadius: 12,width: 150,height: 100,resizeMode: 'contain'}}>
<TouchableOpacity onPress={()=>this.onRemoveItem(index)} style={{position: 'absolute',top: 4,left:4,backgroundColor: 'rgba(0,0,0,0.2)',width: '100%'}}>

    <Icon name='closecircle' type="AntDesign" style={{color:'#fff'}}/>
</TouchableOpacity>
    </ImageBackground>
         ))}
  </ScrollView>
  </View>


                      </Form>
                      <Item picker styke={{marginVertical:10}} >
                      <Picker

                     style={{ height: 50, width: width,marginVertical: 10}}
                     selectedValue={this.state.city}
                     onValueChange={(d)=>this.setState({city:d})}

                    >
                    <Picker.Item label="جميع" value="all" />

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
                    <Picker.Item label="مفرق" value="Mafraq" />

                    </Picker>
                      </Item>
              </View>
)
}
renderPrice = (item) => {
  var { width } = Dimensions.get('window');

  return (<View>

    <TouchableOpacity
      style={Styles.PopupViewContainer}>
      <Text style={Styles.popupViewText}>{"From "+ this.state.multiSliderValue[0] +" - " +   this.state.multiSliderValue[1]+" $ "}</Text>
    </TouchableOpacity>




    <MultiSlider
      isMarkersSeparated={true}
      markerOffsetY={5}
      selectedStyle={{
        backgroundColor: '#800020',
      }}

      unselectedStyle={{
        backgroundColor: 'gray',
      }}

      containerStyle={{
        height: 40,
        alignSelf: 'center',

        marginHorizontal: 30
      }}

      trackStyle={{
        height: 14,
        backgroundColor: '#800020',
        borderRadius: 5,
      }}
      touchDimensions={{
        height: 40,
        width: 40,
        borderRadius: 20,
        slipDisplacement: 40,
      }}
      customMarkerLeft={(e) => {
        var currentValue = e.currentValue;
        return (
          <View style={[Styles.circle, { borderColor: '#800020' }]}>
            <Image source={require('../assets/minus_red.png')} style={[Styles.sliderImage, { tintColor: '#800020' }]} />
          </View>
        );
      }}

      customMarkerRight={(e) => {
        var currentValue = e.currentValue;
        return (
          <View style={[Styles.circle, { borderColor: '#800020' }]}>
            <Image source={require('../assets/plus_red.png')} style={[Styles.sliderImage, { tintColor: '#800020' }]} />
          </View>
        );
      }}
      sliderLength={width -20}
      min={Number(0)}
      max={Number(1000)}
      step={50}
      values={[0,1000]}
      onValuesChange={this.multiSliderValuesChange}
    />


  </View>);
}
multiSliderValuesChange = (values) => {
  this.setState({
    multiSliderValue: values,
  });
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب سؤال تريد من صديقك الاجابة عليه بصراحة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا تريد من صديقك ان يصارحك به اذا اختار باب الصراحة" />
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
  circle: {
    width: 19,
    height: 19,
    borderRadius: 100/2,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',

  },
  sliderImage:{
    tintColor:'#999999',
    resizeMode:'center',
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
  },
  popupViewText:{

    fontSize:14,
    color:'#999999',
  },
  PopupViewContainer:{
    height:50,
    width:width-10,
    backgroundColor:'#f0f0f0',
    paddingStart:15,
    paddingEnd:15,
    marginTop:5,
    marginBottom:5,
    paddingBottom:0,
    paddingTop:0,
     justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:5,

  }

});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777'
  }
});
const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  subContainer: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  containerStyle: {
    backgroundColor: 'lightblue',
  },
});
