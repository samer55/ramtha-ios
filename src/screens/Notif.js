import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import moment from 'moment';
import 'moment/src/locale/ar'

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
import * as firebase from 'firebase';

import { Button,Header,Item,Icon,Input } from 'native-base';
import NavigationBack from '../components/NavigationBack';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { firebaseApp } from '../../firebase'

export default class Notif extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',

        text:'',
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
params:  props.navigation.getParam('onnav',null),
        commentsRefs:'',
    };
    this.arrayholder=[]
    this.datas=[]
this.users=[ {
  title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
first:'#800020',
second:'steelblue',
  username:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,
},


]
this.currentUserId=''
this.currentusername=''
this.arrayholder=[]

this.displayCategories()

  }
  onReceived(notification) {
   console.log("-----------------Notification received: ", notification);
 }
 static navigationOptions = ({ navigation }) => ({
   header:null
 });
 onOpened = openResult => {
   console.log("Message: ", openResult.notification.payload.body);
   console.log("Data: ", openResult.notification.payload.additionalData);
   console.log("isActive: ", openResult.notification.isAppInFocus);
   console.log("openResult: ", openResult);
   console.log("title: ", openResult.notification.payload.title);

 };
  displayCategories = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
if (user) {
  this.setState({spinner:true})
  var ref = firebaseApp.database().ref("notification/"); //Here assuming 'Users' as main table of contents

  ref.once('value').then(snapshot => {
      // console.log(snapshot.val());

       // get children as an array
       var items = [];
       friend =[]
       snapshot.forEach((child) => {


items.push(child.val());


      });
      sort = items.sort(function(a, b) {
       // Turn your strings into dates, and then subtract them
       // to get a value that is either negative, positive, or zero.
       return new Date(b.createdAt) - new Date(a.createdAt);

     });

      this.setState({ dataSources:Object.values(sort),searched:Object.values(items),spinner:false},function(){
        this.arrayholder=items
      });
      console.log('itemss----------------'+items);
      console.log('dataArray----------------'+this.state.dataArray);

  });

}else {
  this.props.navigation.navigate('SettingsStack')

}
    })
console.log(this.state.dataArray);
  }

    create = (d) => {
      this.setState({
        ploading:true,
        postStatus: 'جاري الارسال..',
        shows:true,pcolor:'warning'
      })
      const newPostKey = firebaseApp.database().ref('friends').push().key

            const uid = firebaseApp.auth().currentUser.uid



            const postData = {
              userId:d.userId,
              username:d.username,
          accept:false,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,

            }
            let updates = {}
            let updatess = {}

            updates['friends/' + uid+'/'+d.userId] = postData

              //  updates["data/"+newPostKey+'/name'] =state.tag
      //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

            firebaseApp.database().ref().update(updates)
            .then(() => {
              this.setState({
                              postStatus: 'تم شكرا لك.',
                          refreshing:true,

                            })

    alert('تم ارسال طلب الصداقة')


            })
            .catch(() => {
              this.setState({ postStatus: 'Something went wrong!!!',pcolor:'#800020' })
            })

          .catch(error => {
            console.log(error)
          })








    }
    deletereq=(d)=>{
      firebaseApp.database().ref(`friendsreq/${d.userId}/${firebaseApp.auth().currentUser.uid}`).on('value', function(snapshot) {
    snapshot.ref.remove();
    })
    firebaseApp.database().ref(`friendsreq/${firebaseApp.auth().currentUser.uid}/${d.userId}`).on('value', function(snapshot) {
  snapshot.ref.remove();
  })
    }
   accepts=(d)=>{



             firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).child(d.userId.toLowerCase()).set(d.username)

             firebaseApp.database().ref(`friends/${d.userId}`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)
          this.deletereq(d)
this.displayCategories()


    }
    deletes=(d)=>{

console.log(d);
            firebaseApp.database().ref(`friends`).equalTo(d).on('value', function(snapshot) {
          snapshot.ref.remove();
          })
          firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).on('value', function(snapshot) {
        snapshot.ref.remove();
        })
 this.displayCategories()


     }


  render() {
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    let trLocale = require('moment/locale/ar');
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (

          <View style={{flex:1}}>
          <Header searchBar rounded style={{width: width,backgroundColor: '#fff'}}>
          <Left>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',paddingHorizontal: 2,marginLeft: 20}}>
          <Ionicons name='ios-close' size={40} color="#000000"/>
          </TouchableOpacity>

                   </Left>
                   <Body style={{alignItems: 'flex-start'}}>
                   </Body>
                   <Right>


                   </Right>
        </Header>

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container['light']}
      >



        <List style={{width}}>
        {this.state.dataSources.map((item, index) => {





          return( <ListItem thumbnail>
             <Left>
               <Thumbnail square source={require('../assets/not.png')} />
             </Left>
             <Body>
               <Text style={[gStyle.text['light'],{textAlign: 'left',fontFamily: 'Cairo-Bold'}]}  numberOfLines={2}>{item.head}</Text>
               <Text style={[gStyle.text['light'],{textAlign: 'left',fontFamily: 'Cairo-Regular'}]} note numberOfLines={2}>{item.body}</Text>

                <Text style={[gStyle.text['light'],{textAlign: 'left'}]} note numberOfLines={2}>{moment(item.createdAt).locale('ar',trLocale).fromNow()}</Text>
             </Body>

           </ListItem>
         )})}

     </List>




      </ScrollView>
      </View>


    );
  }


_renderRow = (data) => {

  this.users.map((data, index) => {
    return(
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={require('../assets/account.png')} />
        </Left>
        <Body>
          <Text style={gStyle.text[theme]}>@{data.user}</Text>
          <Text style={gStyle.text[theme]} note numberOfLines={1}>{data.username}</Text>
        </Body>
        <Right>
          <Button transparent onPress={()=>navigation.navigate('Write',{data,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={gStyle.text[theme]}>اكتب</Text>
          </Button>
          <Button transparent onPress={()=>navigation.navigate('Write',{data,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={[gStyle.text[theme],{color:'#800020'}]}>اضف كصديق</Text>
          </Button>
        </Right>
      </ListItem>)})


}

}
