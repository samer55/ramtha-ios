import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl,ImageBackground,AsyncStorage,Image} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Title} from 'native-base';
import _ from 'lodash';
import Swiper from 'react-native-swiper'
import {  Picker } from "native-base";
import { Ionicons } from 'react-native-vector-icons';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images,colors } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import LinearGradient from 'react-native-linear-gradient';
import Lightbox from 'react-native-lightbox';

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
    header:null
  });

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
type:props.navigation.getParam('type',''),
        text:'',
        list:[],
        check:[],
        load:false,load1:false,
        dataArray: [],
        friends:[],
        admin:false,
        working:false,
        name:'dfsdf',
        mydata:[],
        spinner:false,
        title:props.appStore.place,
        commentsRef:'',
        search:'',w:Dimensions.get('window').width-10,
        dataSources: [],
        searched:[],
        chan:  props.navigation.getParam('chan',false),

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
  }
  _onRefresh = () => {
   this.setState({refreshing: true});
   this.displayCategories()
   this.displayads()

 }
 onValueChange1(value: string) {
   this.setState({title:value})

    this.props.appStore.place = value
this.displayCategories()
this.displayads()

   AsyncStorage.setItem('place', value).then(() => {
     console.log(value+'------------------------------------------------dddd');
     this.props.appStore.place = value
   });

 }
 deletesss=(d)=>{
   var updates = {};
 updates["Special/start/"+this.props.appStore.place+'/'+d] = null;
 return firebaseApp
 .database()
 .ref()
 .update(updates)
 }
 displayCategories = () => {
   console.log("news city=-----"+this.props.appStore.place);

   this.setState({spinner:true,load:true})
   var ref = firebaseApp.database().ref("News"); //Here assuming 'Users' as main table of contents

   ref.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var items = [];
        snapshot.forEach((child) => {
          if (child.val().typeofservice==='important'&&(this.props.appStore.place==child.val().city||child.val().city==='all')) {
             items.push(child.val());
          }
       });
       sort = items.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);

      });
       this.setState({ load:false,refreshing:false,dataArray: Object.values(sort),searched:Object.values(sort),spinner:false},function(){
         this.arrayholder=Object.values(sort)
       });

   });

 }
 displayads=()=>{
   var ref1 = firebaseApp.database().ref("Special/start/"+this.props.appStore.place); //Here assuming 'Users' as main table of contents

   ref1.once('value').then(snapshot => {
       // console.log(snapshot.val());
       console.log("adss city=-----"+this.props.appStore.place);

        // get children as an array
        var items = [];
        snapshot.forEach((child) => {

          if (new Date().getTime() < child.val().updatedAt) {
            console.log("trueeeee");
               items.push(child.val());
          }else {
            console.log("falseeeee");

            this.deletesss(child.val().postuid)
          }

       });
      this.setState({list:Object.values(items)})

       console.log('itemss----------------'+items);
    //   console.log('dataArray----------------'+this.state.dataArray);

   });

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
//console.log("Ssss---- "+snap.val());
items.push(item);



        });

        this.setState({ friends: Object.values(items),spinner:false});

    });
  }
  componentWillReceiveProps (newProps) {
    if( newProps.appStore.place !== this.props.appStore.place ){
  this.displayCategories()
  this.displayads()

    } /* do stuff */
  }
async  componentDidMount() {
  if (new Date().getTime() < 1593732911502) {
    this.props.navigation.navigate('Home')
    this.setState({working:false})
  }else if (new Date().getTime() > 1593732911502)  {
    this.setState({working:true})

  }
  firebaseApp.auth().onAuthStateChanged(user => {
if (user) {
  if (firebaseApp.auth().currentUser.uid==="KPOrr97SKpbNvdg4MyRXz61CGqR2") {
    this.setState({admin:true})
  }
}
})
  this.setState({w:Dimensions.get('window').width})
  this.displayCategories()

this.displayads()

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
this.swiper.autoplay()
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
          <Header searchBar rounded style={{width: width,backgroundColor: '#fff'}}>
          <Left>


                   </Left>
                   <Body style={{alignItems: 'flex-start'}}>
  <Title style={{fontFamily: 'Cairo-Bold',color: '#800020',fontSize: 10,textAlign: 'right'}}>(اختر محافظة للتسوق )</Title>
                   </Body>
                   <Right>


                   <Item picker >
                   <Picker
                   iosIcon={<Icon name="arrow-down" />}

                  style={{ height: 50, width: 140,alignItems: 'center',justifyContent: 'flex-end'}}
                  selectedValue={this.state.title}
                  onValueChange={this.onValueChange1.bind(this)}

                >
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
                <Picker.Item label="المفرق" value="Mafraq" />

                </Picker>
                   </Item>
                   </Right>
      </Header>

<ScrollView refreshControl={
    <RefreshControl
      refreshing={this.state.refreshing}
onRefresh={this._onRefresh}
      tintColor="#eb144c"
    />
  }>

    {this.state.dataArray.length>0&&this.state.working?      <Swiper
 autoplayTimeout={2}	  containerStyle={{alignSelf: 'center',marginTop: 30}} bounces={true} scrollEnabled style={[styles.wrapper]} showsPagination={false} autoplay height={100}>
{this.state.dataArray&&this.state.dataArray.slice(0, 5).map((item)=>{
  return(
    <TouchableOpacity style={{

      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      height: 100,
      width: this.state.w,

    }} onPress={()=>navigation.navigate('List',{type:'important'})}>
    <ImageBackground style={{width: Dimensions.get('window').width,height: 300,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/zrGNZnt/Ll76T.jpg'}} >
<LinearGradient
      colors={['rgba(208,2,27,70)','rgba(0,0,0,0.1)']}
      style={{  alignItems: 'center',   width: Dimensions.get('window').width,height: 300,justifyContent: 'center'}}>

      <Text numberOfLines={1}
        style={{
          backgroundColor: 'transparent',
          fontSize: 17,
          color: '#fff',

          fontWeight: '500',

          alignSelf: 'center',textAlign: 'center',
          fontFamily: 'Cairo-Bold'
        }}>
{item.title}</Text>

    </LinearGradient>
</ImageBackground>
    </TouchableOpacity>
  )
})}

               </Swiper>:this.state.load&&this.state.dataArray.length==0?<View style={{justifyContent: 'center',alignItems: 'center',height: 100,flex: 1}}>
               <Image source={require('../assets/loading1.gif')} style={{height:100,width:250}} />


               </View>:null}

<View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',marginVertical: 30}}>
{this.state.working?<Button style={{justifyContent: 'center',alignItems: 'center',padding: 20,borderRadius: 9}} bordered dark onPress={()=>navigation.navigate('List',{type:'died'})}>
<Text style={{fontFamily: 'Cairo-Regular',color: 'black'}}>الوفيات</Text>
</Button>:false}
<Button style={{justifyContent: 'center',alignItems: 'center',padding: 20,backgroundColor: '#800020',borderRadius: 9}}  block danger onPress={()=>navigation.navigate('Home')}>
<Text style={{fontFamily: 'Cairo-Regular',color: '#fff'}}>دخول</Text>
</Button>
{this.state.working?<Button style={{justifyContent: 'center',alignItems: 'center',padding: 20,borderRadius: 9}} onPress={()=>navigation.navigate('List',{type:'new'})} bordered dark onPress={()=>navigation.navigate('List',{type:'new'})}>
<Text style={{fontFamily: 'Cairo-Regular',color: 'black'}}>اخر الاخبار</Text>
</Button>:false}

</View>


  {this.state.list.length>0?<Swiper autoplayTimeout={2}  containerStyle={{alignSelf: 'center'}} bounces={true} scrollEnabled style={[styles.wrapper]} showsPagination={true} autoplay height={300}>
    {this.state.list&&this.state.list.map((item)=>{
      return(
        <View style={{flex:1}}>
      {this.state.admin?  <Button light block onPress={()=>Alert.alert(
        'هل انت متاكد من حذف الاعلان',
        'عند ضغط على نعم سيتم حذف الاعلان',
        [
          {text: 'لا', onPress: () => console.log('Ask me later pressed')},
          {text: 'نعم', onPress: ()=>{this.deletesss(item.postuid);
          this._onRefresh()}},
        ],
        { cancelable: false }
      )} style={{justifyContent: 'center',alignItems: 'center',padding: 20}}>
      <Text style={{fontSize: 15,fontFamily: 'Cairo-Bold',color: 'red'}}>حذف</Text>
      </Button>:null}
        <TouchableOpacity style={[styles.slide1,{height: 300}]}>
        <Lightbox underlayColor="white">
        <Image style={{width: Dimensions.get('window').width,height: '100%',resizeMode: 'contain'}} source={{uri:item.img}} />

 </Lightbox>
        </TouchableOpacity>

        </View>
      )
    })}
     </Swiper>:this.state.load1&&this.state.dataArray.length==0?<View style={{justifyContent: 'center',alignItems: 'center',height: 400,flex: 1}}>
     <Image source={{uri:'https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif'}} style={{height:400,width:250,resizeMode: 'contain'}} />


     </View>:null}
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
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: Dimensions.get('window').width * 0.25,
        height: 100,margin: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        alignItems: 'center',
        borderRadius: 12,
        padding: 5,
        justifyContent: 'center'
    },
    itemIcon: {
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },
    itemTitle: {
        marginTop: 16,textAlign: 'center'
    },
    wrapper: {},
    slide1: {

      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      height: 100,
      width: Dimensions.get('window').width,

    },
    slide2: {
      justifyContent: 'center',
      width: Dimensions.get('window').width,
      height: 100,

      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width,
      height: 100,

      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }

});
