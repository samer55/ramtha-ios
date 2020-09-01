import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Dimensions,TouchableOpacity ,Linking,Image} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, Content, Form, Item, Label,Button ,Body} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import {  ListItem, CheckBox } from 'native-base';
import OneSignal from 'react-native-onesignal'
import { Input } from 'native-base';
// components
import Touch from '../components/Touch';
import * as firebase from 'firebase';

const Signup = ({ navigation }) => {
  const [errMsg, seterror] = useState('')
  const [name, setname] = useState('')
  const [password, setpass] = useState('')
  const [email, setmail] = useState('')
  const [username, setuser] = useState('')
  const [code, setcode] = useState('')
  const [check, setcheck] = useState(false)
  const [secret, setsecret] = useState('')
function  validate(text){
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
setmail(text)
seterror("البريد غير صحيح")
      return false;
    }
    else {
      setmail(text)
      seterror("")

      console.log("Email is Correct");
    }
  }
  function codes(value: string) {
    var d =voucher_codes.generate({
      length: 4,
      count: 1,


        charset:username

    });  var d =voucher_codes.generate({
        length: 4,
        count: 1,


          charset:username

      });

    setcode(d.toString());
  }
  const theme = useTheme();
function  _handleSignUp () {


    seterror('جاري التسجيل');
      if (name.length <= 0) {
          seterror('الرجاء ادخال الاسم')
      }
else if (username.length < 1) {
          seterror('الرجاء ادخال اسم مستخدم ')
      }
      else if (email.length == 0) {

          seterror('الرجاء ادخال البريد الالكتروني.')
      }
      else if (password.length == 0) {
        seterror("الرجاء ادخال كلمة المرور.")
      }
      else {
firebaseApp.database().ref('usernameList').child(username.toLowerCase()).once('value')
        .then((snapshot) => {
          if (snapshot.val()) {
            seterror("اسم المستخدم غير متاح." )

          }
          else {
            firebaseApp.auth().createUserWithEmailAndPassword(email.trim(), password)
            .then((user) => {
              const userId = firebaseApp.auth().currentUser.uid;
              const userem = firebaseApp.auth().currentUser.email;



              firebaseApp.database().ref('usernameList').child(username.toLowerCase()).set(userId)

              firebaseApp.auth().currentUser.updateProfile({displayName:name})
              .then(() => {
                const userId = firebaseApp.auth().currentUser.uid;
                const names= name

                const usernames= username
                const email = firebaseApp.auth().currentUser.email;
                firebaseApp.database().ref('users/' + userId)
                .set({
                  userId,
                  name:names,
                  balance:50,
                  username:usernames,
                  email,
                })
                OneSignal.sendTag("username", usernames)
                OneSignal.sendTag("uid", userId)

                navigation.navigate('SettingsStack')
              }, function(error) {
                console.log(error);
              });
            })
            .catch((error) => {
              seterror(error.message)

            })
          }
        })
      }
    }

  return (
    <ScrollView
      contentContainerStyle={[gStyle.Centercont,{width: Dimensions.get('window').width,paddingBottom: 50}]}
      style={gStyle.container[theme]}
    >
<Text style={{fontFamily: 'Cairo-Bold',fontSize: 25,color: '#800020'}}>مرحبا بك في تطبيق سوق الرمثا</Text>
      <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center'}]}>تسجيل</Text>
      <Text   style={[gStyle.text[theme]]}>{errMsg} </Text>

              <Form style={{width:Dimensions.get('window').width-35}}>
              <Item inlineLabel>

                  <Input autoCapitalize = "none" style={[gStyle.text[theme]]} inputStyle={[gStyle.text[theme]]} placeholder="اسم المستخدم" placeholderTextColor={gStyle.text[theme].color} onChangeText={v=>{setuser(v)}} value={username.replace(" ", "_")}/>
</Item>
<Item inlineLabel>

                  <Input  style={[gStyle.text[theme]]} inputStyle={[gStyle.text[theme]]} placeholder="اسمك" placeholderTextColor={gStyle.text[theme].color}   onChangeText={v=>{setname(v)}} value={name}/>
</Item>
                  <Item inlineLabel>

                  <Input textContentType='emailAddress'        autoCorrect={false} autoComplete="true" autoCapitalize = "none" keyboardType={'email-address'} style={[gStyle.text[theme]]} inputStyle={[gStyle.text[theme]]} placeholder="البريد الالكتروني" placeholderTextColor={gStyle.text[theme].color}  onChangeText={(text) => validate(text)} value={email.replace(" ",'')}/>
</Item>
                  <Item inlineLabel>

                  <Input autoCapitalize = "none"  secureTextEntry={true} style={[gStyle.text[theme]]} inputStyle={[gStyle.text[theme]]}  placeholder="كلمة المرور" placeholderTextColor={gStyle.text[theme].color}  onChangeText={v=>{setpass(v)}}/>
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


                    onPress={_handleSignUp}
                    style={{ justifyContent: 'center', alignItems: 'center',backgroundColor: '#800020'}}
                  >
                    <Text style={[gStyle.button,{color:'white'}]}>تسجيل</Text>
                  </Button>
                </View>


                <TouchableOpacity style={{marginVertical: 10}} onPress={ ()=>navigation.navigate('Terms')}  >

                <Text style={[gStyle.text[theme],{fontFamily: 'Cairo-Regular'}]}> عند تسجيلك, فانك توافق على <Text style={{color:'#800020'}}>الشروط والاحكام</Text>,<Text style={{color:'#800020'}}>سياسة الخصوصية</Text></Text>
                </TouchableOpacity>
              </Form>
              <TouchableOpacity onPress={()=>navigation.navigate('Login')}>

              <Text onPress={()=>navigation.navigate('Login')}  style={[gStyle.text[theme],{fontFamily: 'Cairo-Bold',fontSize: 17}]}>مستخدم لدينا؟ سجل دخولك</Text>
</TouchableOpacity>
{/*<View
  style={{
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',

  }}
>
  <Button
    block

dark
    onPress={()=>navigation.navigate('Write')}
    style={{ justifyContent: 'center', alignItems: 'center',padding: 25}}
  >
    <Text style={[gStyle.button,{color:'white'}]}>او اكتب لشخص ما بسرية</Text>
  </Button>
</View>*/}


    </ScrollView>
  );


};

Signup.navigationOptions = {
header:null
};

Signup.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Signup;
