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

const SettingsScreen = ({ navigation, screenProps,props,toggleTheme }) => {
  const theme = useTheme();
  const [ss] = useState('0');
  const [name, setNames] = useState(theme=='dark'?true:false)
  const [username, setuser] = useState('')
  const [mail, setemail] = useState('')
  const [balance, setbalance] = useState('')
  const [names, setname] = useState('')
  const [modal, setmodal] = useState(false)
  const openPanel = () => {
    setmodal(true)

  };

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
setemail(snapshot.val().email)
setbalance(snapshot.val().balance)


               }
               else {
                 return null
               }
             })
  }, []);
  return (
    <View style={{flex:1}}>
    <Header searchBar rounded style={{backgroundColor: gStyle.container[theme].backgroundColor}}>
<Left>
<TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

<Icon name='ios-close-circle' size={40} color="#000000"/>
</TouchableOpacity>
</Left>
             <Body>
               <Title style={{color:'black'}}>اعدادات</Title>
             </Body>

</Header>
    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container[theme]}
    >
<StatusBar hidden={true} />

      <View style={gStyle.spacer16} />
      <Content style={{width:Dimensions.get('window').width }}>

      <ListItem Button  onPress={()=>navigation.navigate('EditPro',{name:names,email:mail})} icon>
        <Left>
          <Button style={{ backgroundColor: "#eb144c" }} >
            <Icon active name="person" />
          </Button>
        </Left>
        <Body>
          <Text style={gStyle.text[theme]}>تعديل بريد الالكتروني</Text>
        </Body>
        <Right>
          <Text style={gStyle.text[theme]}></Text>
          <Icon active name="arrow-forward"/>
        </Right>
      </ListItem>

              <ListItem icon Button  onPress={()=>navigation.navigate('Secure')}>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }} onPress={()=>navigation.navigate('Secure')}>
                    <Icon active name="lock" />
                  </Button>
                </Left>
                <Body>
                  <Text style={gStyle.text[theme]}>تعديل كلمة المرور</Text>
                </Body>
                <Right>
                  <Text style={gStyle.text[theme]}></Text>
                  <Icon active name="arrow-forward" onPress={()=>navigation.navigate('Secure')}/>
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
    <Complete/>
  </SwipeablePanel>
    </View>
  );
};

SettingsScreen.navigationOptions = ({ theme,navigation }) => {
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

export default SettingsScreen;
