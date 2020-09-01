import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Linking,
  Text,
  TouchableOpacity
} from 'react-native'
import { gStyle } from '../constants';
import NavigationBack from '../components/NavigationBack';



export default class Contactus extends Component {
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,
    title:  'تصميم وتطوير'
  });
  render() {
    return (
      <View style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
      <ScrollView>
      <Text

        style={[{
          fontFamily: 'Cairo-Bold',
          marginBottom:10,
          margin:10
        },gStyle.text['light']]}


>Opentiq Development Company
Mobile App & Web Development
      </Text>
        <Text
        style={[{
          fontFamily: 'Cairo-Bold',
          marginBottom:10,
          margin:10
        },{color:'#eb144c'}]}
      >
      {`
        شركة اوبن تيك لتطوير البرمجيات

 `}
        </Text>
        <Text
        style={[{
          fontFamily: 'Cairo-Bold',
          marginBottom:10,
          margin:10,
          fontSize: 17,

        },gStyle.text['light']]}
      > تواصل معنا:</Text>
      <Text
      style={[{
        fontFamily: 'Cairo-Bold',
        marginBottom:10,
        margin:10
      },gStyle.text['light']]}
    > بريد الكتروني:</Text>
        <TouchableOpacity onPress={ ()=> Linking.openURL('mailto:info@opentiq.com') }>
        <Text
        style={[{
          fontFamily: 'Cairo-Regular',
          marginBottom:10,
          margin:10
        },{color:'#eb144c'}]}
      >info@opentiq.com</Text>
        </TouchableOpacity>
        <Text
        style={[{
          fontFamily: 'Cairo-Bold',
          marginBottom:10,
          margin:10
        },gStyle.text['light']]}
      >
      صفحة فيس بوك</Text>
        <TouchableOpacity onPress={ ()=> Linking.openURL('https://web.facebook.com/Opentiq/?ref=bookmarks') }>
        <Text
        style={[{
          fontFamily: 'Cairo-Bold',
          marginBottom:10,
          margin:10
        },{color:'#eb144c'}]}
      >Opentiq.FB</Text>
        </TouchableOpacity>
        <Text
        style={[{
          fontFamily: 'Cairo-Bold',
          marginBottom:10,
          margin:10
        },gStyle.text['light']]}
      >
      موقع الكتروني</Text>
        <TouchableOpacity onPress={ ()=> Linking.openURL('https://opentiq.net') }>
        <Text
        style={[{
          fontFamily: 'Cairo-Bold',
          marginBottom:10,
          margin:10
        },{color:'#eb144c'}]}
      >https://opentiq.net</Text>
        </TouchableOpacity>


        </ScrollView>
      </View>
    )
  }
}
