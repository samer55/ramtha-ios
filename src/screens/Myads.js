import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,Image,PixelRatio} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea} from 'native-base';
import RNPicker from "rn-modal-picker";

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
import ShowScroller from './showscards'

import { Button,Header,Item,Icon,Label } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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

    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        text:'',
page:1,
demo1: {},
  demo2: {},
  demo3: {},
  demo4: {},
game:'',
 isDateTimePickerVisible: false,
        lovemsg:'',
        typeofservice:'local',
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
        Online: [
     {
       id: 1,
       name: "Art & photography"
     },
     {
       id: 2,
       name: "Clothing & fashion"
     },
     {
       id: 3,
       name: "Jewelry & accessories"
     },
     {
       id: 4,
       name: "Electronics"
     },
     {
       id: 5,
       name: "Food & Drinks"
     },
     {
       id: 6,
       name: "Home & Gardens"
     },
     {
       id: 7,
       name: "Furniture"
     },
     {
       id: 8,
       name: "Health & Beauty"
     },
     {
       id: 9,
       name: "Sports"
     },
     {
       id: 10,
       name: "Toys & Games"
     },
     {
       id: 11,
       name: "Others"
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
   placeHolderText: "Select industry",
   selectedText: "",
        title:'',
postStatus:null,
        color1:'steelblue',
        color:'#800020',
        commentsRef:'',
        time:'',
        dataSources: [],
data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('myuid',''),
secret:  props.navigation.getParam('secret',false),
firstlie:'',
  multiSliderValue: [0, 0],
secondlie:'',
typeofjob:'full',
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }
  DisplayPosts = (d) => {
    this.setState({refreshing:true})


    firebaseApp.database().ref(`Ads`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           if (child.val().writerId===firebaseApp.auth().currentUser.uid) {

    items.push(child.val());

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

      else   if (d==="pricehigh") { sort = items.sort((a, b) => {

         if (a.price < b.price) {
           return 1;
         }
         if (a.price > b.price) {
           return -1;
         }
         return 0;
       })}else if (d==="pricelow") { sort = items.sort((a, b) => {

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
    this.DisplayPosts()

  }
  _selectedValue(index, item) {
  this.setState({ selectedText: item.name });
}

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title:  'اعلاناتي'
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
      postStatus: 'جاري الارسال..',
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


      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.containersssss[theme]}
      >

<ShowScroller cats="myads" dataset={this.state.posts} type="latest" navigation={navigation}/>

      </ScrollView>
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
  <Form style={{width:width-10 }}>

  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
    placeholder='Enter the name of Store..'
  />

  </Form>
  <View style={{flex:1,marginVertical: 10,alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>

           </View>
  <Item picker styke={{marginVertical:10,alignSelf:'center',alignItems:'center'}} >
  <Picker

  style={{ height: 50, width: width-20,alignSelf: 'center',marginVertical: 10}}
  selectedValue={this.state.typeofservice}
  onValueChange={(d)=>this.setState({typeofservice:d})}

  >

  <Picker.Item label="Local Store" value="local" />
  <Picker.Item label="Online Store" value="online" />

  </Picker>
  </Item>
  <View style={{borderWidth: 1,borderColor: '#dddddd',marginBottom: 10}}/>

         <RNPicker
                  dataSource={this.state.Online}
                  dummyDataSource={this.state.Online}
                  defaultValue={false}
                  pickerTitle={"Choose industry"}
                  showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={"none"}
                  searchBarPlaceHolder={"Search....."}
                  showPickerTitle={true}
                  pickerStyle={Styles.pickerStyle}
                  itemSeparatorStyle={Styles.itemSeparatorStyle}
                  pickerItemTextStyle={Styles.listTextViewStyle}
                  selectedLabel={this.state.selectedText}
                  placeHolderLabel={this.state.placeHolderText}
                  selectLabelTextStyle={Styles.selectLabelTextStyle}
                  placeHolderTextStyle={Styles.placeHolderTextStyle}
                  dropDownImageStyle={Styles.dropDownImageStyle}
                  selectedValue={(index, item) => this._selectedValue(index, item)}
                />
          </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 20}}>


              <Item picker styke={{marginVertical:10}} >
              <Picker

             style={{ height: 50, width: width,marginVertical: 10}}
             selectedValue={this.state.title}
             onValueChange={this.onValueChange1.bind(this)}

            >

            <Picker.Item label="I Don't Have any office or store yet" value="truth" />
            <Picker.Item label="I have local store/office" value="challenge" />

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
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10}}>

  <Form style={{width:width-10 }}>

  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Description
  </Label>

              <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="Enter Description.." />
<Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
What Type of job you need?
</Label>


        <Item picker styke={{marginVertical:10}} >
        <Picker

       style={{ height: 50, width: width,marginVertical: 10}}
       selectedValue={this.state.typeofjob}
       onValueChange={(d)=>this.setState({typeofjob:d})}

      >
      <Picker.Item label="Freelancer" value="Freelancer" />

      <Picker.Item label="Working from home" value="Working from home" />

      <Picker.Item label="Part time job" value="Part time job" />
      <Picker.Item label="Full time job" value="Full time job" />

      <Picker.Item label="one time job" value="one time job" />

      </Picker>
        </Item>
            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Days Opening
  </Label>

  <View style={{alignItems: 'center',marginVertical: 10}}>
  <ScrollView horizontal={true}>
  {this.state.daily.map((item)=>{
    return(
    <TouchableOpacity onPress={()=>this.onUpdateItem(item.day,item.selected)} style={{marginHorizontal: 20,flex:1,padding: 20,borderRadius: 12,backgroundColor:item.selected?'#eb144c':'#fff',borderColor:'#eb144c',borderWidth: 0.5,alignItems: 'center',justifyContent: 'center'}}>
    <Text style={{color:item.selected?'#fff':'#eb144c'}}>{item.day}</Text>
    </TouchableOpacity>)
  })}
  </ScrollView>
  </View>
  <Label style={{fontFamily: 'Cairo-Regular',marginVertical: 10}}>
  Time Opening
  </Label>
  <View style={{padding: 20}}>
  <Button



  block
    onPress={this.showDateTimePicker}

    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,width: '100%',backgroundColor:'#eb144c'}}
  >
    <Text style={[gStyle.button,{color:'#fff'}]}>{this.state.time.length>0?this.state.time:'Pick time Available'}</Text>
  </Button>
  </View>
  <DateTimePicker
  mode="time"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <Item picker style={{marginVertical:10}} >
          <Picker

         style={{ height: 50, width: width,marginVertical: 10}}
         selectedValue={this.state.title}
         onValueChange={this.onValueChange1.bind(this)}

        >
        <Picker.Item label="24 hours available" value="challenge" />

        <Picker.Item label="Working 2 hours/day" value="challenge" />

        <Picker.Item label="Working 3 hours/day" value="challenge" />
        <Picker.Item label="Working 4 hours/day" value="challenge" />

        <Picker.Item label="Working 5 hours/day" value="truth" />
        <Picker.Item label="Working 6 hours/day" value="challenge" />
        <Picker.Item label="Working 7 hours/day" value="challenge" />
        <Picker.Item label="Working 8 hours/day" value="challenge" />
        <Picker.Item label="Working 9 hours/day" value="challenge" />
        <Picker.Item label="Working 10 hours/day" value="challenge" />
        <Picker.Item label="Working 11 hours/day" value="challenge" />

        </Picker>
          </Item>
                      </Form>

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
const dash = StyleSheet.create({
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
  row:{alignItems: 'center',justifyContent: 'space-between',flex:1,flexDirection:
'row'},
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  containerStyle: {
    backgroundColor: 'lightblue',
  },
});
