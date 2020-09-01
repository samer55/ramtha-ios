import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,FlatList} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Spinner} from 'native-base';
import _ from 'lodash';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Trainer from '../components/Trainer';
import ShowScroller from './showscards'

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

  render() {

    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>


      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.container[theme]}
      >
      <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>

      <ShowScroller dataset={[{name:'Alrazy pharmacy',type:"Pharmacies",image:'https://cdnimgen.royanews.tv/imageserv/Size728Q40/news/20200323/20375.JPG',price:'12JD',store:'Loolet Stores'},{name:'Heigh Gym',type:"Gyms",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRb2Wri7FHrB7R2cZzJGhs9zRHmisBYFWBRCkYhfLzwdQlaPydd&usqp=CAU',store:"naseh Furniture"}]} type="latest" />
      </View>

      </ScrollView>
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }




}
