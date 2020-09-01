import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList} from "react-native";
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

import { Button,Header,Item,Icon,Input } from 'native-base';

import NavigationHome from '../components/NavigationHome';

import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';

export default class extends React.Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationHome navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title: 'ابحث عن شخص ما'
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

this.displayCategories()
  }
  displayCategories = () => {
    var ref = firebaseApp.database().ref("users"); //Here assuming 'Users' as main table of contents

    ref.once('value').then(snapshot => {
        // console.log(snapshot.val());

         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

        this.setState({ dataArray: Object.values(items),spinner:false,searched:Object.values(items)},function(){
          this.arrayholder=Object.values(items)
        });
        console.log('itemss----------------'+items);
        console.log('dataArray----------------'+this.state.dataArray);

    });
console.log(this.state.dataArray);
  }

  componentDidMount() {
    this.setState({spinner:true})
    firebaseApp.auth().onAuthStateChanged(user => {
      this.currentUserId=user.uid
      this.currentusername=user.displayName
    })


    }
    searchFilterFunction = text => {
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.username.toUpperCase()}
        ${item.name.toUpperCase()}`;

         const textData = text.toUpperCase();

         return itemData.indexOf(textData) > -1;
      });

      this.setState({ dataArray: newData });
    };

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
        dataArray:newData,
        text:text,
      });
      }

  render() {
    const dataArray = Object.values(this.arrayholder)
    const {navigation}=this.props
    let ArrayOfPeopleObject = Object.values(this.state.dataArray)

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>
          <Header  searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor }}>
      <Item>
      <Icon name="ios-search" />
      <Input placeholder="ابحث" onChangeText={text => this.searchFilterFunction(text)} />
      </Item>
      <Button transparent>
      <Text style={gStyle.text[theme]}>ابحث</Text>
      </Button>
      </Header>

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container[theme]}
      >
      <Spinner
             visible={this.state.spinner}
            textContent={'جاري التحميل...'}
             textStyle={{color:'#fff'}}
           />

        <Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>ابحث عن صديقك واكتب له</Text>

        <List style={{width}}>
        <FlatList
   data={this.state.dataArray}
   renderItem={({ item }) => (
     <ListItem thumbnail>
       <Left>
         <Thumbnail square source={require('../assets/account.png')} />
       </Left>
       <Body>
         <Text style={gStyle.text[theme]}>@{item.username}</Text>
         <Text style={gStyle.text[theme]} note numberOfLines={1}>{item.name}</Text>
       </Body>
       <Right>
         <Button transparent onPress={()=>navigation.navigate('Write',{secret:true,data:item,myuid:this.currentUserId,username:this.currentusername})}>
           <Text style={gStyle.text[theme]}>اكتب</Text>
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
          <Thumbnail square source={require('../assets/users.png')} />
        </Left>
        <Body>
          <Text style={gStyle.text[theme]}>@{data.user}</Text>
          <Text style={gStyle.text[theme]} note numberOfLines={1}>{data.username}</Text>
        </Body>
        <Right>
          <Button transparent onPress={()=>navigation.navigate('Write',{data,myuid:this.currentUserId,username:this.currentusername})}>
            <Text style={gStyle.text[theme]}>اكتب</Text>
          </Button>
        </Right>
      </ListItem>)})


}

}
