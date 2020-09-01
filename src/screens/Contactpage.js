import React from "react";
import { Alert ,Share,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl,ImageBackground,AsyncStorage,Linking} from "react-native";
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
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        title:props.appStore.place,
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
contact:  props.navigation.getParam('contact',null),
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
   this.friends()
   this.displayCategories()

 }
 onValueChange1(value: string) {
   this.setState({title:value})
 this.props.appStore.place = value
 }
 displayCategories = () => {
   this.setState({spinner:true})
   var ref = firebaseApp.database().ref("News"); //Here assuming 'Users' as main table of contents

   ref.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var items = [];
        snapshot.forEach((child) => {
          if (child.val().typeofservice==='important') {
             items.push(child.val());
          }
       });

       this.setState({ refreshing:false,dataArray: Object.values(items),searched:Object.values(items),spinner:false},function(){
         this.arrayholder=Object.values(items)
       });
       console.log('itemss----------------'+items);
       console.log('dataArray----------------'+this.state.dataArray);

   });
   var ref1 = firebaseApp.database().ref("Special/start/"+this.props.appStore.place); //Here assuming 'Users' as main table of contents

   ref1.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var items = [];
      this.setState({list:Object.values(snapshot.val().img)})



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

async  componentDidMount() {
  try {
    const myArray = await AsyncStorage.getItem('@MySupersStore:key');
    if (myArray !== null) {
      // We have data!!
      console.log(JSON.parse(myArray));
      this.props.appStore.saveduid=myArray
    }
  } catch (error) {
    // Error retrieving data
  }

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
          <Header searchBar rounded style={{width: width,backgroundColor: gStyle.container[theme].backgroundColor}}>
          <Left>
          <TouchableOpacity onPress={()=>navigation.goBack()}>

            <Icon name="arrow-back" />
            </TouchableOpacity>


                   </Left>
                   <Body>
                     <Title style={[{color:'#800020',fontFamily: 'Cairo-Bold'
  }]}>تواصل</Title>

                   </Body>
                   <Right>


                   </Right>
      </Header>
      <ScrollView containerStyle={{marginBottom: 30,paddingBottom: 40}}>
<Text style={{fontSize: 21,fontFamily: 'Cairo-Bold',margin: 20}}>لاضافة اعلان مميز او اعلان VIP</Text>
<Text style={{fontSize: 17,fontFamily: 'Cairo-Bold',marginVertical: 10,margin: 20}}>مندوب التطبيق 1</Text>
<TouchableOpacity style={{marginVertical: 10,alignItems: 'flex-end',marginRight: 20}} onPress={()=>{Linking.openURL(`https://wa.me/${'+962788040160'}?text=${''}`)}}>
<Icon name="logo-whatsapp" style={{color: 'green'}}/>
</TouchableOpacity>
<TouchableOpacity style={{marginVertical: 10,alignItems: 'flex-end',marginRight: 20}} onPress={()=>{Linking.openURL(`tel:+962788040160`)}}>
<Icon name="phone-call" type="Feather"/>
</TouchableOpacity>
<Text style={{fontSize: 17,fontFamily: 'Cairo-Bold',marginVertical: 10,margin: 20}}>مندوب التطبيق 2</Text>
<TouchableOpacity style={{marginVertical: 10,alignItems: 'flex-end',marginRight: 20}} onPress={()=>{Linking.openURL(`https://wa.me/${'+962786960174'}?text=${''}`)}}>
<Icon name="logo-whatsapp" style={{color: 'green'}}/>
</TouchableOpacity>
<TouchableOpacity style={{marginVertical: 10,alignItems: 'flex-end',marginRight: 20}} onPress={()=>{Linking.openURL(`tel:+962786960174`)}}>
<Icon name="phone-call" type="Feather"/>
</TouchableOpacity>
<Text style={{fontSize: 21,fontFamily: 'Cairo-Bold',margin: 20,color: '#800020'}}>مواعيد العمل من الساعة 8 صباحا وحتى الساعة 8 مساءا</Text>
{this.state.contact?<View>
<Text style={{fontSize: 21,fontFamily: 'Cairo-Bold',margin: 20,color: 'black'}}>للابلاغ عن مشكلة او اقتراح لتطوير التطبيق</Text>
<TouchableOpacity onPress={()=>{Linking.openURL(`mailto:ramthasouq@gmail.com`)}}>
<Text style={{fontSize: 15,fontFamily: 'Cairo-Regular',margin: 10}}> ramthasouq@gmail.com</Text>
</TouchableOpacity>
<Text style={{fontSize: 21,fontFamily: 'Cairo-Bold',margin: 20,color: 'black'}}>فكرة التطبيق</Text>
<Text style={{fontSize: 15,fontFamily: 'Cairo-Regular',margin: 10}}> تم إنشاء هذا التطبيق ( الخدماتي ) بفكرة من شباب طموحين من أبناء مدينة الرمثا وذلك من أجل تسهيل عملية البيع والشراء و متابعة آخر الأخبار والوفيات في كل مكان في الأردن من خلاله.
لم يقتصر هذا التطبيق على أبناء مدينة الرمثا فحسب، بل قام هؤلاء الشباب بإطلاق التطبيق من نافذة مدينة الرمثا إلى جميع محافظات المملكة و شتى المناطق في شمالها وشرقها و غربها وصولاً إلى أقصى جنوبها.
حيث يستطيع المستخدم في أي مكان داخل الأردن نشر اعلاناته بشكل مجاني في الأقسام الموجودة في التطبيق عن طريق اختيار المحافظة المراد نشر الإعلان فيها .
 تم تسجيل فكرة و تصميم هذا التطبيق بإسم هؤلاء الشباب لدى شركة Opentiq.
نسأل الله العظيم أن يجعل هذا العمل خالصاً لوجهه الكريم.</Text>
<TouchableOpacity onPress={async () => {

  try {
    const result = await Share.share({
      message: `

     Ramtha souq سوق الرمثا
   Google Play
      https://play.google.com/store/apps/details?id=com.opentiq.ramthasooq

      App Store:
      https://apps.apple.com/app/id1519595171

`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}}
>
<Text style={{fontSize: 17,fontFamily: 'Cairo-Bold',margin: 10,color: '#800020'}}>مشاركة التطبيق</Text>
</TouchableOpacity>
</View>:null}
<View style={{flex:1,padding: 20}}></View>
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
      backgroundColor: '#9DD6EB',
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
