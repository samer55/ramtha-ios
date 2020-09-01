import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl,Image,Linking} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images,colors } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import moment from 'moment';
import Lightbox from 'react-native-lightbox';
import Hyperlink from 'react-native-hyperlink';
import Card from '../components/Card';

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
import NavigationBack from '../components/NavigationBack';

import { Button,Header,Item,Icon,Input } from 'native-base';


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
const offers = [
  {
id:0,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'احدث العروض',
type:'web-design'
  },
  {
id:1,
img:'https://i.ytimg.com/vi/x_HL0wiK4Zc/maxresdefault.jpg',
name:'افراح وتهاني',
type:'Graphics'
  },
  {
id:2,
img:'https://upload.wikimedia.org/wikipedia/commons/d/dd/Henry_Cavill_by_Gage_Skidmore_2.jpg',
name:'عزاء مواساة',
type:'Writer'
  },
  {
id:3,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'مواد تموينية',
type:'web-design'
  },
  {
id:4,
img:'https://images.unsplash.com/photo-1528900403525-dc523d4f18d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'مطاعم وطبخ منزلي',
type:'web-design'
  },
  {
id:5,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'اثاث منزلي',
type:'web-design'
  },
  {
id:6,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'مستلزمات الأسرة',
type:'web-design'
  },
  {
id:7,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'الكترونيات',
type:'web-design'
  },
  {
id:8,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'سيارات ومحركات',
type:'web-design'
  },
  {
id:9,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'مهن مختلفة ووظائف',
type:'web-design'
  },
  {
id:10,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'مقاولات وحرف',
type:'web-design'
  },
  {
id:11,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'طيور وحيوانات',
type:'web-design'
  },
  {
id:12,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'ادوات منزلية',
type:'web-design'
  },
  {
id:13,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'محلات صرافة',
type:'web-design'
  },
  {
id:14,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'سياحة وسفر',
type:'web-design'
  },
  {
id:15,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'تجهيزات افراح',
type:'web-design'
  },
  {
id:16,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'خدمات عزاء',
type:'web-design'
  },
  {
id:17,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'رياضة',
type:'web-design'
  },
  {
id:18,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'تكسي وتوصيل ونقل',
type:'web-design'
  },
  {
id:19,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'عطارين',
type:'web-design'
  },
  {
id:20,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'مكتبات وقرطاسية',
type:'web-design'
  },
  {
id:21,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'ذهب ومجوهرات',
type:'web-design'
  },
  {
id:22,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'حجامة',
type:'web-design'
  },
  {
id:23,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'عسل واعشاب',
type:'web-design'
  },
  {
id:23,
img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
name:'اخرى',
type:'web-design'
  },

];
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title: 'الاخبار'
  });

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
type:props.navigation.getParam('type',''),
        text:'',
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        admin:false,
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
  deletess=(data)=>{
    var updates = {};
    alert('تم الحذف')
  updates[`News/${data.postuid}`] = null;
  return firebaseApp
  .database()
  .ref()
  .update(updates)

  this.displayCategories()

  }
  _onRefresh = () => {
   this.setState({refreshing: true});
   this.friends()
   this.displayCategories()

 }
  displayCategories = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("News"); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           if (child.val().typeofservice===this.state.type&&(this.props.appStore.place==child.val().city||child.val().city=='all')) {
console.log(child.val().typeofservice+'////'+this.state.type);
              items.push(child.val());
           }else if (this.state.type==='new'&&child.val().typeofservice!=='died'&&(this.props.appStore.place==child.val().city||child.val().city==='all')) {

             items.push(child.val());
           }
        });
        sort = items.sort(function(a, b) {
         // Turn your strings into dates, and then subtract them
         // to get a value that is either negative, positive, or zero.
         return new Date(b.createdAt) - new Date(a.createdAt);

       });
        this.setState({ refreshing:false,dataArray: Object.values(sort),searched:Object.values(items),spinner:false},function(){
          this.arrayholder=Object.values(items)
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }
  friends = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("friends/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         friend =[]
         snapshot.forEach((snap) => {
           var item = snap.val();
item.key = snap.key;
console.log("Ssss---- "+snap.val());
items.push(item);



        });

        this.setState({ friends: Object.values(items),spinner:false});

    });
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    if (firebaseApp.auth().currentUser.uid==="KPOrr97SKpbNvdg4MyRXz61CGqR2") {
      this.setState({admin:true})
    }
  }
  })


    }
    searchFilterFunction = text => {
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.username.toUpperCase()}
        ${item.name.toUpperCase()}`;

         const textData =text.length==0?'dsfsdfshhh' :text.toUpperCase();

         return itemData.indexOf(textData) > -1;
      });

      this.setState({dataSources : newData });
    };
    create = (d) => {
      this.setState({
        ploading:true,
        postStatus: 'جاري الارسال..',
        shows:true,pcolor:'warning'
      })
      const newPostKey = firebaseApp.database().ref('friends').push().key

            const uid = firebaseApp.auth().currentUser.uid



            const postData = {
              userId:uid,
              username:firebaseApp.auth().currentUser.displayName,
          accept:false,
            status:'send',
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,

            }
            const postDatas = {
              userId:d.userId,
              username:d.username,
          accept:true,
          status:'send',
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,

            }
            let updates = {}
            let updatess = {}

            updates['friendsreq/' +d.userId +'/'+uid] = postData

              //  updates["data/"+newPostKey+'/name'] =state.tag
      //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

            firebaseApp.database().ref().update(updates)
            .then(() => {
              this.setState({
                              postStatus: 'تم شكرا لك.',
                          refreshing:false,

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

    SearchFilterFunction(text) {
      const newData = this.state.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar

        const itemData = item.username?`${item.username}${item.name}`.toUpperCase():'dsfsdfs';
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSources:newData,
        text:text,
      });
      }

  render() {
    const filtered =this.state.dataArray.filter(person => this.state.friends.includes(person.userId))
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>



        <List style={{width}}>
        <FlatList
   data={this.state.dataArray}
   renderItem={({ item }) => (
     <Card

       image={item.img?item.img[0]:this.state.type=='new'&&item.typeofservice!=='important'?'https://i.ibb.co/TbFvc7N/man-reading-newspaper-6053.jpg':item.typeofservice=='important'?'https://i.ibb.co/zrGNZnt/Ll76T.jpg':'https://i.ibb.co/n3zzxsh/Whats-App-Image-2020-06-11-at-9-44-16-PM.jpg'}
       pimg={{uri:'https://thenypost.files.wordpress.com/2019/12/trump-thunberg.jpg?quality=80&strip=all'}}
time={moment(item.createdAt).fromNow()}
       show={false}
       body={item.about}
name={item.title}

     />

    )}

 />



          </List>



      </View>
    )}

  </ThemeContext.Consumer>

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
