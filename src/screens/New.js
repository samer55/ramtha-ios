import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,TextInput} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea,Content,Switch} from 'native-base';

const { width,height } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import * as firebase from 'firebase';
import {  Picker } from "native-base";

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

import { Button,Header,Item,Icon,Input,Label } from 'native-base';


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
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import SwipeablePanel from 'rn-swipeable-panel';
import { FontAwesome } from 'react-native-vector-icons';
import { MaterialIcons } from 'react-native-vector-icons';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      init: true,
      errMsg: null,
      saveUpSuccess: false,
      username:  props.navigation.getParam('username',''),
 swipeablePanelActive: false,
      name:  props.navigation.getParam('name',''),
      email:  props.navigation.getParam('email',''),
      password: ''
    };
    this.arrayholder=[]



  }
  componentDidMount = () => {
      this.openPanel();
  };

  openPanel = () => {
      this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
      this.setState({ swipeablePanelActive: false });
  };

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    header:null
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

          <Header style={{width: Dimensions.get('window').width,backgroundColor: '#fff'}}>
      <Left>
      <Button transparent onPress={()=>navigation.goBack()}>
      <MaterialCommunityIcons  name='close' size={30} color='black' />

      </Button>
      </Left>
      <Body style={{justifyContent: 'center',alignItems: 'center'}}>
      <Picker

     style={{ height: 50, width: '100%',textAlign: 'right',alignSelf: 'center',alignItems: 'center',justifyContent: 'flex-end'}}


    >

    <Picker.Item label="Others" value="Others" />
    <Picker.Item label="Past Paper" value="Past Paper" />
    <Picker.Item label="Subject" value="Subject" />
    <Picker.Item label="Freelancer" value="Freelancer" />
    <Picker.Item label="Exam Schedule" value="Exam Schedule" />
    <Picker.Item label="Event" value="Event" />
    <Picker.Item label="Subject Videos" value="Subject Videos" />
    <Picker.Item label="Exam Reviews" value="Exam Reviews" />

    </Picker>
          </Body>
      <Right>
      <MaterialCommunityIcons  name='send' size={30} color='black' />

      </Right>
      </Header>
      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center',paddingVertical: 0,backgroundColor: 'white'}]}
        style={[gStyle.containersssss[theme],{paddingTop: 0,paddingVertical: 0}]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={'Loading...'}
             textStyle={{color:'#fff'}}
           />




             <Label style={[gStyle.text[theme],{color:'#eb144c'}]}>{this.state.errMsg}</Label>

             <TextInput
                placeholder="اضف منشور, اسئلة سنوات, طرفات وعبارات, ليصل لطلاب اليرموك"
                keyboardType="default"
                multiline={true}
                autoFocus={false}
                style={{ flex: 1,
               fontSize: 16,
               width,
               backgroundColor: 'white',
               padding: 20,

               textAlignVertical: 'top'}}
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                 value={this.state.post} onChangeText={(d)=>this.setState({post:d})}
              />



      </ScrollView>
      <SwipeablePanel
               fullWidth
               isActive={this.state.swipeablePanelActive}
               onClose={this.closePanel}
               showCloseButton


               onPressCloseButton={this.closePanel}
           >
           <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <FontAwesome  name='hashtag' size={15} color='white'  />
                </Button>
              </Left>
              <Body>
                <Text>Add Hashtag</Text>
              </Body>

            </ListItem>
            <ListItem icon>
               <Left>
                 <Button style={{ backgroundColor: "#eb144c" }}>
                   <FontAwesome  name='image' size={15} color='white'  />
                 </Button>
               </Left>
               <Body>
                 <Text>Add Image</Text>
               </Body>

             </ListItem>


               <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: "#9B9B9B" }}>
                      <MaterialIcons  name='visibility' size={15} color='white'  />
                    </Button>
                  </Left>
                  <Body>
                    <Text>Show Profile</Text>
                  </Body>
                  <Right>
                              <Switch value={false} />
                            </Right>
                </ListItem>
                <ListItem icon>
                   <Left>
                     <Button style={{ backgroundColor: "#4A90E2" }}>
                       <FontAwesome  name='unsorted' size={15} color='white'  />
                     </Button>
                   </Left>
                   <Body>
                     <Text>Select Student</Text>
                   </Body>

                 </ListItem>
   </SwipeablePanel>
  {!this.state.swipeablePanelActive? <Button block style={{backgroundColor: 'white'}} onPress={()=>this.setState({swipeablePanelActive:true})}>
   <Text style={{color:'black'}}>
More option
   </Text>
   </Button>:null}
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
  _handleSave = () => {


      if (this.state.name.length < 5) {
        this.setState({ errMsg: "يجب ان يتكون اسمك من 5 احرف على الاقل" })
      }
      else {
        this.setState({ errMsg: "جاري حفظ الاسم" })
        firebaseApp.auth().onAuthStateChanged(user => {

        user.updateProfile({ displayName: this.state.name })
        })


      }


      if (this.state.email.length == 0) {
        this.setState({ errMsg: "الرجاء ادخال بريدك الالكتروني" })
      }
      else {
        this.setState({ errMsg: "جاري حفظ بريدك االكتروني" })
        firebaseApp.auth().onAuthStateChanged(user => {

          user.updateEmail(this.state.email)
          .then(() => {
            this.setState({ errMsg: "تم تغيير البريد الالكتروني" })
          })
          .catch((error) => {
            this.setState({ errMsg: error.message })
          })        })

      }


  }
AddTitle = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اختر باب</Text>

  <Item picker >
  <Picker

 style={{ height: 50, width: width,color:'white' }}
 selectedValue={this.state.title}
 onValueChange={this.onValueChange1.bind(this)}

>
<Picker.Item label="اختر الباب" value="null" />

<Picker.Item label="باب الصراحة" value="truth" />
<Picker.Item label="باب التحدي" value="challenge" />
<Picker.Item label="باب الجرأة والصراحة" value="both" />
<Picker.Item label="باب الحب والكراهية" value="love" />
<Picker.Item label="باب الكذب" value="lie" />

</Picker>
  </Item>
  </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب شئ لصديقك تصارحه فيه..</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5}  style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="مالذي تريد مصارحة صديقك فيه.." />
            </Form>
              </View>
)
}

AddChallenge = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>..اكتب تحدي لصديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ما التحدي الذي تريده.." />
            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب شئ يتطلب الجرأة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="ماذا تريد من صديقك ان يفعل اذا اختار باب الجرأة.." />
            </Form>
              </View>
)
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب سؤال تريد من صديقك الاجابة عليه بصراحة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا تريد من صديقك ان يصارحك به اذا اختار باب الصراحة" />
            </Form>
              </View>
)
}
lovedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب اكثر شئ تحبه في صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا يعجبك اكثر في شخصية صديقك.." />
            </Form>
              </View>
)
}
hatedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>ماذا تكره في شخصية صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea  rowSpan={5} style={gStyle.text[theme]}  onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="مالذي تكرهه في شخصية صديقك.." />
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
