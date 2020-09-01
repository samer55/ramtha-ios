import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';

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


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
header:null
  });

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
this.friends()
this.displayCategories()
  }
  _onRefresh = () => {
   this.setState({refreshing: true});
   this.friends()
   this.displayCategories()

 }
  displayCategories = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("users"); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

        this.setState({ refreshing:false,dataArray: Object.values(items),searched:Object.values(items),spinner:false},function(){
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

items.push(item);



        });

        this.setState({ friends: Object.values(items),spinner:false});

    });
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.currentUserId=user.uid
      this.currentusername=user.displayName
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
        filters: [{"field":"tag","key":"uid","relation":"=","value":d.userId}],
         })
       })
       .then((response) => response.json())
       .then((responseData) => {
           console.log("Push POST:" + JSON.stringify(responseData));
           responseData.json()
       })
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
    const filtered =this.state.dataArray.filter(person => this.state.friends.includes(person.user))
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1,backgroundColor: gStyle.container[theme].backgroundColor}}>
          <Header  searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor }}>
      <Item>
      <Icon name="ios-search" />
      <Input placeholder="ابحث عن شخص لترسل له طلب صداقة" onChangeText={text => this.searchFilterFunction(text)} />
      </Item>
      <Button transparent>
      <Text style={gStyle.text[theme]}>ابحث</Text>
      </Button>
      </Header>

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
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

<Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>ابحث عن شخص لترسل لتكتب له </Text>


        <List style={{width}}>
        <FlatList
   data={this.state.dataArray}
   renderItem={({ item }) => (
     <ListItem thumbnail>
       <Left>
         <Thumbnail square source={require('../assets/users.png')} />
       </Left>
       <Body>
         <Text style={[gStyle.text[theme],{textAlign: 'left'}]}>@{item.username}</Text>
         <Text style={[gStyle.text[theme],{textAlign: 'left'}]} note numberOfLines={1}>{item.name}</Text>
       </Body>
       <Right >

         <Button block style={{backgroundColor: '#eb144c'}}  onPress={()=>this.create(item)}>
           <Text style={[gStyle.text[theme],{color:'#fff'}]}>اضف كصديق</Text>
         </Button>
       </Right>
     </ListItem>
    )}

 />



          </List>



      </ScrollView>
      <View         style={{paddingVertical: 10, justifyContent: 'center', alignItems: 'center',height: 60,backgroundColor: 'transparent',padding: 20}}
>
      <Button

        block
        light
      onPress={()=>navigation.navigate('Home',{start:true})}
        style={{ borderRadius: 9,marginVertical: 5,justifyContent: 'center', alignItems: 'center',height: 50,marginHorizontal: 5}}
      >
        <Text style={[gStyle.button,gStyle.text['light']]}>تخطي</Text>
      </Button>
      </View>
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
