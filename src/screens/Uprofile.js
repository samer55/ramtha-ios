import React, { useState ,useEffect} from 'react';
import { Image, ScrollView, Text, View,Dimensions,TouchableOpacity,Linking,StatusBar } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { firebaseApp } from '../../firebase'
import Trainer from '../components/Trainer';
import Complete from './Complete';

const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import Touch from '../components/Touch';
import User from '../components/user';
import { Container, Header, Content, Button, ListItem, Icon, Left, Body, Right, Switch ,Title,Badge} from 'native-base';
import SwipeablePanel from 'rn-swipeable-panel';

const Uprofile = ({ navigation, screenProps,props,toggleTheme }) => {
  const theme = useTheme();
  const [ss] = useState('0');
  const [name, setNames] = useState(theme=='dark'?true:false)
  const [username, setuser] = useState('')
  const [mail, setemail] = useState('')
  const [balance, setbalance] = useState('')
  const [names, setname] = useState('')
    const [imagesp, setimg] = useState('')
  const [modal, setmodal] = useState(false)
    const [admin, setadmin] = useState(false)
  const openPanel = () => {
    setmodal(true)

  };
  function  logOut () {
      firebaseApp
        .auth()
        .signOut()
        .then(
          () => {
            navigation.navigate('Loading');
          },
          function(error) {
            console.log(error);
          }
        );
    }
 const closePanel = () => {
      setmodal(false)
  };
  function increment() {
 screenProps.updateTheme(theme=='dark'?'light':'dark')

setNames(theme=='dark'?false:true)

    }
    useEffect(() => {
   /** handleWidgets */

         firebaseApp.database().ref('users/' + firebaseApp.auth().currentUser.uid).on('value',
             (snapshot) => {





               val = snapshot.val()
                let available =[]
               if (snapshot.val()) {
setuser(snapshot.val().username)
setname(snapshot.val().name)
setimg(snapshot.val().image)
setemail(snapshot.val().email)
setbalance(snapshot.val().balance)


               }
               else {
                 return null
               }
             })
             if (firebaseApp.auth().currentUser.uid==="KPOrr97SKpbNvdg4MyRXz61CGqR2") {
               setadmin(true)
             }
  }, []);
  return (
    <View style={{flex:1}}>
    <Header searchBar rounded style={{backgroundColor: gStyle.container[theme].backgroundColor}}>

             <Body>
               <Title style={{color:'black'}}>الملف الشخصي</Title>
             </Body>
             <Right>
               <Icon active name="settings" type="MaterialCommunityIcons" onPress={()=>navigation.navigate('Settings')}/>
             </Right>
</Header>
    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container[theme]}
    >
<StatusBar hidden={true} />
    <Trainer
      theme={theme}
      icon="ios-wifi"
      title={username}
      imageSrc={imagesp?{uri:imagesp}:require('../assets/users.png')}
name={names}
onPress={()=>setmodal(true)}
      details={balance}
    />

      <View style={gStyle.spacer16} />
      <Content style={{width:Dimensions.get('window').width }}>




              <ListItem icon button onPress={()=>navigation.navigate('Fav')}>
                <Left>
                  <Button style={{ backgroundColor: "#800020" }} onPress={()=>navigation.navigate('Fav')}>
                    <Icon active name="heart" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text[theme]}>المفضلة</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text[theme]}></Text>
                  <Icon active name="arrow-forward" onPress={()=>navigation.navigate('Fav')}/>
                </Right>
              </ListItem>
            

              <ListItem Button  onPress={()=>navigation.navigate('Myads')} icon>
                <Left>
                  <Button style={{ backgroundColor: "steelblue" }} >
                    <Icon active name="paper" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text[theme]}>اعلاناتي</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text[theme]}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>
              {admin?  <ListItem Button  onPress={()=>navigation.navigate('Premium')} icon>
                <Left>
                  <Button style={{ backgroundColor: "#800020" }} >
                  <Icon name="chart-areaspline" type="MaterialCommunityIcons"/>
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text[theme]}>تمييز اعلان</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text[theme]}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>:null}
              {admin?  <ListItem Button  onPress={()=>navigation.navigate('Newnot')} icon>
                <Left>
                  <Button style={{ backgroundColor: "#800020" }} >
                  <Icon name="bell" type="MaterialCommunityIcons"/>
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text[theme]}>اضف اشعار</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text[theme]}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>:null}


              <ListItem Button  onPress={logOut} icon>
                <Left>
                  <Button style={{ backgroundColor: "#800020" }} >
                  <Icon name="logout" type="MaterialCommunityIcons"/>
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text[theme]}>تسجيل الخروج</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text[theme]}></Text>
                  <Icon active name="arrow-forward"/>
                </Right>
              </ListItem>

            </Content>
            <View style={gStyle.spacer16} />


    </ScrollView>
    <SwipeablePanel
             fullWidth
             isActive={modal}
             onClose={closePanel}
             showCloseButton


             onPressCloseButton={closePanel}
         >
    <Complete name={names}/>
  </SwipeablePanel>
    </View>
  );
};

Uprofile.navigationOptions = ({ theme,navigation }) => {
  function  logOut () {
      firebaseApp
        .auth()
        .signOut()
        .then(
          () => {
            navigation.navigate('Loading');
          },
          function(error) {
            console.log(error);
          }
        );
    }


  return {
    header:null
  };
};

/*
// shoutout @notbrent: https://snack.expo.io/H105kxsG7
const shouldShowBackButton = stackRouteNavigation => {
  const parent = stackRouteNavigation.dangerouslyGetParent();
  return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
};

SettingsScreen.navigationOptions = ({ navigation }) => ({

headerLeft: !shouldShowBackButton(navigation) ? (
  <View style={{ flex: 1 }}>
    <Text>left</Text>
  </View>
) : null,
*/

export default Uprofile;
