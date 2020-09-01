import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, Content, Form, Item, Input, Label,Button } from 'native-base';
import { firebaseApp } from '../../firebase'
import OneSignal from 'react-native-onesignal'

// components
import Touch from '../components/Touch';

const Login = ({ navigation }) => {
  const [errMsg, seterror] = useState('')
  const [name, setname] = useState('')
  const [password, setpass] = useState('')
  const [email, setmail] = useState('')
  const [username, setuser] = useState('')

  const theme = useTheme();
  function _handleSignIn () {
    seterror('جاري تسجيل الدخول')
  if (email.length == 0) {
  seterror("الرجاء ادخال بريدك الالكتروني.")

  }
  else if (password.length == 0) {
  seterror("الرجاء ادخال كلمة المرور.")
  }
  else {
    console.log("user displayName: " + email + " - " + password)

  firebaseApp.auth().signInWithEmailAndPassword(email.trim(), password)
  .then((user) => {
    const userId = firebaseApp.auth().currentUser.uid;
    console.log("user uid: " + " - " + userId)

   firebaseApp.database().ref('users').child(userId).once('value')
   OneSignal.sendTag("username", user.displayName)
   OneSignal.sendTag("uid", user.uid)

   console.log("user displayName: " + user.displayName + " - " + user.uid)
   navigation.navigate('SettingsStack')
  })
  .catch((error) => {
   seterror(error.message)

  })
  }

  }
  return (
    <ScrollView
      contentContainerStyle={[gStyle.Centercont,{width: Dimensions.get('window').width}]}
      style={gStyle.container[theme]}
    >
      <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center'}]}>تسجيل الدخول</Text>
      <Text   style={[gStyle.text[theme]]}>{errMsg}</Text>

              <Form style={{width:Dimensions.get('window').width-35}}>
                <Item stackedLabel>
                  <Label autoCompleteType  keyboardType={'email'} style={[gStyle.text[theme]]}>البريد الالكتروني</Label>
                  <Input autoCapitalize = "none" style={[gStyle.text[theme]]}  onChangeText={v=>{setmail(v)}} value={email.replace(" ", "")}/>
                </Item>

                <Item  last stackedLabel>
                  <Label style={[gStyle.text[theme]]}>كلمة المرور</Label>
                  <Input autoCapitalize = "none" secureTextEntry={true} style={[gStyle.text[theme]]}  onChangeText={v=>{setpass(v)}}/>
                </Item>
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',

                  }}
                >
                  <Button
                    block
                    light
                    onPress={_handleSignIn}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={[gStyle.button]}>تسجيل الدخول</Text>
                  </Button>
                </View>
              </Form>
<TouchableOpacity style={{marginVertical: 10}} onPress={()=>navigation.navigate('Signup')}>
              <Text onPress={()=>navigation.navigate('Signup')} style={[gStyle.text[theme],{fontFamily: 'Cairo-Bold',fontSize: 17}]}>جديد؟ سجل الان</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('Forget')}>
              <Text  onPress={()=>navigation.navigate('Forget')} style={[gStyle.text[theme],{fontFamily: 'Cairo-Regular',color: '#800020'}]}>نسيت كلمة المرور؟</Text>
</TouchableOpacity>
    </ScrollView>
  );
};

Login.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Signup'
};

Login.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Login;
