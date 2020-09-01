import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Spinner} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
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
import NavigationBack from '../components/NavigationBack';


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title: 'طلبات الصداقة'
  });

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
refreshing:false,
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
        users:[],
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
this.friends()
this.usersfetch()
  }
  displayCategories = () => {
    this.setState({spinner:true})
    var ref = firebaseApp.database().ref("friendsreq/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         friend =[]
         snapshot.forEach((child) => {

if(child.val().accept==false){
  items.push(child.val());
}

        });

        this.setState({ dataSources:Object.values(items),searched:Object.values(items),spinner:false},function(){
          this.arrayholder=items
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }
  usersfetch=()=>{
    var ref = firebaseApp.database().ref("users"); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
           console.log(child.val());
        });

        this.setState({ refreshing:false,users: Object.values(items),spinner:false});
console.log("sdfsdfsdfsdf  fdsfdsf "+this.state.users);
    });

  }
  friends = () => {
    this.setState({spinner:true,refreshing:true})
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

        this.setState({ dataArray: Object.values(items),spinner:false,refreshing:false},function(){
          this.arrayholder=items
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.currentUserId=user.uid
      this.currentusername=user.displayName
    })


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
    accept2=(d)=>{
      firebaseApp.database().ref(`friends/${d.userId}`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.uid)

    }
   accepts=(d)=>{



             firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).child(d.userId.toLowerCase()).set(d.userId)
this.accept2(d)
          this.deletereq(d)
this.displayCategories()
this.friends()

    }
    deletes=(d)=>{

console.log("deletess"+d);

            firebaseApp.database().ref(`friends/${d}`).equalTo(firebaseApp.auth().currentUser.uid).on('value', function(snapshot) {
          snapshot.ref.remove();
          })
          firebaseApp.database().ref(`friends/${firebaseApp.auth().currentUser.uid}`).equalTo(d).on('value', function(snapshot) {
        snapshot.ref.remove();
        })
 this.displayCategories()
this.friends()

     }


  render() {
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    const filt =this.state.users.length>0&&this.state.users.filter(person => this.state.dataArray.includes(person.userId))
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>


      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container[theme]}
      >


           <Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>{this.state.dataSources.length >0?'طلبات الصداقة':'لايوجد طلبات حاليا'}</Text>

        <List style={{width}}>
        <FlatList
   data={this.state.dataSources}
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

         <Button style={{backgroundColor: '#eb144c'}}  onPress={()=>this.accepts(item)}>
           <Text style={[gStyle.text[theme],{color:'#fff'}]}>اقبل</Text>
         </Button>
       </Right>
     </ListItem>
    )}

 />
     </List>
 <Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>اصدقائي</Text>
{this.state.refreshing?<Spinner color='white' />:null}
<List style={{width}}>
<FlatList
data={filt}
renderItem={({ item }) => (
<ListItem thumbnail>
<Left>
  <Thumbnail square source={require('../assets/users.png')} />
</Left>
<Body>
  <Text style={[gStyle.text[theme],{textAlign: 'left'}]}>@{item.username}</Text>
  <Text style={[gStyle.text[theme],{textAlign: 'left'}]}>{item.name}</Text>

</Body>
<Right >
  <Button light  onPress={()=>navigation.navigate('Profile',{data:item.userId})}>
    <Text style={gStyle.text['light']}>عرض</Text>
  </Button>

</Right>
</ListItem>
)}

/>

          </List>


      </ScrollView>
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
