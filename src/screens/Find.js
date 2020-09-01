import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList,RefreshControl, SectionList} from "react-native";
// Argon themed components
import { Content,  List, ListItem, Left, Body, Right, Thumbnail,Text} from 'native-base';
import _ from 'lodash';

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
const DATA = [
  {
    title: "طبيب",
    data: ["عيون", "باطني", "جلدية"]
  },
  {
    title: "تعليم",
    data: ["ترجمة", "ابحاث جامعية", "مراكز تعليمية"]
  },
  {
    title: "وظائف",
    data: ["وظائف متوفرة", "اعمال حرة", "وظائف مستقلة"]
  }
];

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
        listdata:[],
        name:'dfsdf',
        mydata:[],
        spinner:false,
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
        catid:  props.navigation.getParam('id',null),

title:  props.navigation.getParam('title',null),
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
 displayCategories = () => {
   this.setState({refreshing:true})
   var ref = firebaseApp.database().ref("list/"+this.state.catid+'/section'); //Here assuming 'Users' as main table of contents

   ref.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var itemss = [];
        snapshot.forEach((child) => {

          itemss.push(child.val())


       });

       this.setState({ listdata: Object.values(itemss),refreshing:false});

   });
   var ref1 = firebaseApp.database().ref("list/"+this.state.catid+'/secdata'); //Here assuming 'Users' as main table of contents

   ref1.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var itemss = [];
        snapshot.forEach((child) => {

          itemss.push(child.val())


       });

       this.setState({ mydata: Object.values(itemss),refreshing:false});

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
console.log("Ssss---- "+snap.val());
items.push(item);



        });

        this.setState({ friends: Object.values(items),spinner:false});

    });
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
    componentDidMount() {
this.displayCategories()
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
    const {navigation}=this.props

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>
          <Header  searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor }}>
          <Left>
<NavigationBack navigation={navigation} />
          </Left>
    <Body></Body>
    
      </Header>
      <Content>
    <List>
      {this.state.listdata.map((f,index)=>{

  return(
      <View>
  <ListItem first button itemHeader onPress={()=>navigation.navigate('Prod',{head:f,listed:this.state.mydata,id:index,title:this.state.title})}>
    <Text style={{fontSize: 17,fontFamily: 'Cairo-Bold',fontWeight: 'bold',color: 'black'}}>{f}</Text>
  </ListItem>
  {this.state.mydata.map((d,i)=>{
    if (d.indsec==index) {
      return(
        <ListItem button  onPress={()=>navigation.navigate('Prod',{sec:d.name,listed:this.state.mydata,id:index,head:f})}>
            <Text style={{fontFamily: 'Cairo-Regular',fontSize: 12}}>{d.name}</Text>
          </ListItem>
      )
    }

  })  }
  <View style={{borderWidth: 1,borderColor: '#dddddd',marginBottom: 10}}/>

        </View>
)


    })}

      </List>
        </Content>
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 16,
paddingHorizontal: 10
  },
  item: {
    backgroundColor: "#ededed",
    padding: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginVertical: 8
  },
  header: {
    fontSize: 22,
    backgroundColor: "#fff",
    fontFamily: 'Cairo-Bold'
    ,  paddingHorizontal: 10
,alignSelf: 'flex-end'
  },
  title: {
    fontSize: 17,
      fontFamily: 'cairo'
  }
});
