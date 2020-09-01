import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Image,TouchableOpacity,Dimensions,Share as Shared } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import {  Button} from 'native-base';

import NavigationBack from '../components/NavigationBack';
import { firebaseApp } from '../../firebase'

// components
import Touch from '../components/Touch';
// components

const Share = ({ navigation }) => {
  const theme = useTheme();
  const [username, setuser] = useState('')
  const [mail, setemail] = useState('')
  const [balance, setbalance] = useState('')
  const [names, setname] = useState('')


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
    <ScrollView
      contentContainerStyle={gStyle.Centercont}
      style={[gStyle.container[theme]]}
    >
      <Text style={[gStyle.text[theme],gStyle.Title,{marginHorizontal: 20}]}>شارك اصدقائك لكي يرسلوا لك تحديات وبوابات سرية</Text>


      <View style={[{justifyContent: 'center',alignItems: 'center'},gStyle.backgroundc[theme]]}  collapsable={false}
        ref={view => {
           this.seconddoors = view;
         }}>
      <Image
        source={require('../assets/logo.png')}
        style={{
          resizeMode: 'contain',
          width: 200,
          height: 200,
          alignSelf: 'center'


        }}
      />
      <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center',marginTop:  0},{marginHorizontal: 20,textAlign: 'center'}]}>ارسل لي تحدي او باب سري على حسابي</Text>
      <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center',marginVertical: 3}]}>@{username}</Text>
      <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center',marginVertical: 3}]}>{names}</Text>

      <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>
      <TouchableOpacity >
      <Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20}]}>العب الان</Text>
    </TouchableOpacity>
      <Text style={[gStyle.text[theme], , gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20}]}>#تطبيق_الباب_السري</Text>

    </View>
    </View>

    <View
      style={{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,marginVertical: 10,
        width:Dimensions.get('window').width
      }}
    />
    <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>
    <Button bordered onPress={async () => {
       try {
         const result = await Shared.share({
           message: `ادخل معي في تحدي عبر الباب السري
            @${username}
           : حمل التطبيق على الاندرويد
           https://play.google.com/store/apps/details?id=com.opentiq.secretdoor
`,
         });

         if (result.action === Shared.sharedAction) {
           if (result.activityType) {
             // shared with activity type of result.activityType
           } else {
             // shared
           }
         } else if (result.action === Shared.dismissedAction) {
           // dismissed
         }
       } catch (error) {
         alert(error.message);
       }
     }} light style={{padding: 15,justifyContent: 'center',alignItems: 'center'}}>

    <Text style={[gStyle.text[theme]]}>شارك اسمك عبر التواصل</Text>
</Button>
  <Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>|</Text>
  <Button bordered light style={{padding: 15,justifyContent: 'center',alignItems: 'center'}} >

    <Text style={[gStyle.text[theme]]}>حفظ</Text>
</Button>
  </View>
    </ScrollView>
  );
};


Share.navigationOptions = ({ navigation }) => ({
  headerLeft: <NavigationBack navigation={navigation} />,
  headerRight: <View style={{ flex: 1 }} />,
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'شارك اصدقائك'
});

Share.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Share;
