import React,{useState,useEffect} from 'react';
import { ScrollView, Image,Text, View ,Platform,Dimensions,TouchableWithoutFeedback,TouchableOpacity,StyleSheet,TextInput,KeyboardAvoidingView,Alert} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import Door from '../components/Door';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
// components
import NavigationBack from '../components/NavigationBack';
import * as Permissions from 'expo-permissions';
import { firebaseApp } from '../../firebase'
import {  Button,Textarea} from 'native-base';
import {Item,Icon } from 'native-base';
import { Form} from 'native-base';
import Moment from 'moment';
import { Header,Left,Right,Body,Title,Spinner} from 'native-base';
import {  Picker } from "native-base";
import * as firebase from 'firebase';
import { Feather } from 'react-native-vector-icons';
import { Ionicons } from 'react-native-vector-icons';

const Liescreen = ({navigation}) => {
  const theme = useTheme();
  const firstlock=navigation.state.params.data.firstdoor.length ==0?false:!navigation.state.params.data.firstLock
  const secondlock=navigation.state.params.data.seconddoor.length ==0?false:!navigation.state.params.data.secondlock
  const myuid=navigation.state.params.myuid
  const [selected, setselect] = useState('All')
const data =navigation.state.params.data
  const [isVisible, setvisible] = useState(firstlock)
  const [seconddoor, setseconddoor] = useState(secondlock)
  const [times, settimes] = useState(0)
  const [showreply, setreply] = useState(false)
  const [status, setstatus] = useState(false)
  const [post, setpost] = useState('')
  const [opened, setopened] = useState('')
  const [clicked, setclick] = useState(false)

  useEffect(() => {
     // Update the document title using the browser API

  {update(data.firstLock)}
  {data.title=='lie'&&data.firstLock?
   alert(`طريقة اللعب:
     لديك 3 كذبات اثنان منهم حقيقة
     وواحدة منهم كذبة صحيحة
     يجب عليك معرفة الكذبة الصحيحة بالضغط عليها
     اذا اخترت الكذبة الصحيحة
     تكسب 3 نقاط واذا لم تكتشف
     لا تكسب شئ واذا قمت بالرد تكسب نقطتين
     سيتم حذف البوابة خلال 48 ساعة`):
       data.title=='truth'&&data.firstLock?
       alert(`باب الصراحة يظهر لك صراحة اصدقائك
              كسبت نقظتين بسبب فتحك البوابة و
                    اذا قمت بالرد تكسب 3 نقاط
                  واذا رفضت لا تكسب الثلاث نقاط
                     عند الرفض يستم حذف التحدي
            ملاحظة: سيتم حذف البوابة تلفائي خلال 48 ساعة`) :null  }
            firebaseApp
              .database()
              .ref('Doors/' + firebaseApp.auth().currentUser.uid+'/'+data.postuid)

              .once("value")
              .then(snapshot => {


                         });

                         {update(data.firstLock)}
                         if (showreply) {
                         setopened(data.selectedlie)
                         }else {
                          setreply(data.accept)
                         }


  }, []);
   function goBack() {
     console.log("selectedlie data "+data.selectedlie+" / opened "+opened);
     if (!data.firstLock&&(data.selectedlie==opened)) {
         navigation.goBack()
     }else {
        navigation.state.params.onBack();
       navigation.goBack()

     }
     // Call onBack function of ScreenA
  }
  function deletes(){
      const time = data.updatedAt
    if (new Date().getTime() > time)  {
       return (
        firebaseApp.database().ref('Doors/' + firebaseApp.auth().currentUser.uid+'/'+data.postuid).on('value', function(snapshot) {
     snapshot.ref.remove();
   })

       )
       navigation.state.params.onBack();
      navigation.goBack()
     }

}

function update(d){

  if (d===true)  {
     return (
       firebaseApp.database().ref(`Doors/${myuid}/${navigation.state.params.data.postuid}`).update({
          firstLock:false,
            updatedAt:new Date().getTime()+(60*60*48*1000)
        })

     )

   }

}
function deletesss(){

console.log("delete check "+data.writerId+"////+"+data.postuid);
  firebaseApp.database().ref('Doors/' + firebaseApp.auth().currentUser.uid+'/'+data.postuid).on('value', function(snapshot) {
snapshot.ref.remove();
})
navigation.state.params.onBack();
navigation.goBack()
}
function inc(d){

  if (d===data.lie)  {


        firebaseApp.database().ref(`users/${myuid}/balance`).transaction(function(currentClicks) {
  // If node/clicks has never been set, currentRank will be `null`.
  return (currentClicks || 0) + 3;
})

        firebaseApp.database().ref(`Doors/${myuid}/${data.postuid}`).update({
            accept:true,
            selectedlie:d
        })
setopened(d)
setreply(true)
}else{
  firebaseApp.database().ref(`Doors/${myuid}/${data.postuid}`).update({
      accept:true,
        selectedlie:d
  })
setopened(d)
setreply(true)
}


}
function inc2(){



        firebaseApp.database().ref(`users/${myuid}/balance`).transaction(function(currentClicks) {
  // If node/clicks has never been set, currentRank will be `null`.
  return (currentClicks || 0) + 2;
})



}
  function accept(){
    firebaseApp.database().ref(`Doors/${myuid}/${navigation.state.params.data.postuid}`).update({
        accept:true,
    });
  setreply(true)
}
 function openhatedoor(){
    firebaseApp.database().ref(`Doors/${myuid}/${navigation.state.params.data.postuid}`).update({
        secondlock:false,
    });
    setseconddoor(true)
}
function first(){

   inc('first')
}
function seconds(){

   inc('second')
}
function thirds(){

   inc('third')
}
function creates() {
if (!clicked) {
  setstatus('جاري النشر..');
  const newPostKey = firebaseApp.database().ref('posts').push().key

        const uid = firebaseApp.auth().currentUser.uid
        const username = firebaseApp.auth().currentUser.displayName
const userid =data.userId

if (post.length >0) {



        const postData = {
          writerId:uid,
          type:'اختار كذبة',
          user:username,
          NewChallenge:false,
          title:'الكذبة',
      des:data.firstdoor,
      reply:post,
      image:'',
      firstlie:data.firstlie,
      secondlie:data.secondlie,
      seen:selected,
      thirdlie:data.thirdlie,
      lie:selected,
      liegame:false,
      selectedlie:opened.length>0?opened:data.selectedlie,
      earn:3,
      firstno:0,
      secondno:0,
      thirdno:0,
      love:0,
      laugh:0,
      sad:0,
      dislike:0,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: new Date().getTime()+(60*60*48*1000),
          postuid:newPostKey,

        }
        let updates = {}

        updates['Posts/' +newPostKey] = postData
        firebaseApp.database().ref().update(updates)
        .then(() => {
        setstatus('تم النشر')
        setpost('')
        fetch('https://onesignal.com/api/v1/notifications',
         {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': "Basic NmIxNTQ4OWEtMzgzZi00YjI5LWFjM2EtYzdmNjYyYTUxNmZl",
           },
           body: JSON.stringify(
           {
             app_id: "092f9c3e-c1c4-4952-abdc-4dcd497ceddb",
             included_segments: ["All"],
             headings: {"en": "شخص ما قام بفتح الباب السري"},
             android_sound: "fishing",
             data: {"puid": newPostKey, "new_message":true},
             ios_sound: "fishing.caf",
             contents: {"en": firebaseApp.auth().currentUser.displayName +" "+'اختار كذبة' },
      filters: [{"field":"tag","key":"uid","relation":"=","value":navigation.state.params.data.writerId}],
           })
         })
         .then((response) => response.json())
         .then((responseData) => {
             console.log("Push POST:" + JSON.stringify(responseData));
             responseData.json()
         })
        inc2()
        notification(newPostKey)

alert('تم الرد')
goBack()
setclick(false)
        })
        .catch(() => {
        setstatus(  'حدث شئ خاطئ')
        setclick(false)

        })

      .catch(error => {
        console.log(error)
        setclick(false)

      })




} else {

  setstatus('الرجاء كتابة الرد')
  setclick(false)

}
}

}
function notification(notkey){
  const newPostKey = firebaseApp.database().ref('posts').push().key

  firebaseApp.database().ref(`notification/${data.writerId}/${newPostKey}`).update({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`${firebaseApp.auth().currentUser.displayName} اختار الكذبة ${(data.selectedlie=='first'||opened=='first')?'الاولى':(data.selectedlie=='second'||opened=='second')?'الثانية':'الثالثة'}
      ورد عليها`,
      postuid:notkey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
     updatedAt: new Date().getTime()+(60*60*48*1000),
      notuid:newPostKey
  });

}
function confirms(){
  Alert.alert(
  'هل تريد رفض التحدي',
  'عند الرفض سيتم حذف الباب',
  [
    {text: 'لا', onPress: () => console.log('Ask me later pressed')},
    {text: 'رفض وحذف', onPress: deletesss},
  ],
  { cancelable: false }
)
}
function confirmss(){
  Alert.alert(
  'هل انت متاكد؟',
  'سيتم حذف البوابة نهائيا او ستحذف تلقائي خلال 48 ساعة من فتحها',
  [
    {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
    {text: 'حذف', onPress: deletesss},
  ],
  { cancelable: false }
)
}
function setting(){
  Alert.alert(
  'المزيد من الاعدادات',
  'هل تريد حذف الباب او قراءة شرح للباب',
  [
    {text: 'شرح البوابة', onPress: () =>
    alert(`طريقة اللعب:
      لديك 3 كذبات اثنان منهم حقيقة
      وواحدة منهم كذبة صحيحة
      يجب عليك معرفة الكذبة الصحيحة بالضغط عليها
      اذا اخترت الكذبة الصحيحة
      تكسب 3 نقاط واذا لم تكتشف
      لا تكسب شئ واذا قمت بالرد تكسب نقطتين
      سيتم حذف البوابة خلال 48 ساعة`)
      },
    {text: 'حذف الباب', onPress: confirmss},
  ],
  { cancelable: false }
)
}
     return (
       <KeyboardAvoidingView
     behavior={Platform.Os == "ios" ? "padding" : "height"}
     style={gStyle.container[theme]}
   >
   {status.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: status=='جاري النشر..'?'green':status=='تم النشر'?'green':'#800020'}}>
   <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular',color: '#FFF'}]}>{status}</Text>

   </View>:null}
   <Header searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor,marginTop: 5}}>
   <Left>
              <Button transparent onPress={goBack}>
              <Ionicons name={'ios-close-circle-outline'} size={30} color={'#fff'} />

              </Button>
            </Left>
            <Body>
              <Title>الباب السري</Title>
            </Body>
            <Right>



              <Button onPress={setting} transparent >
              <Feather name={'more-horizontal'} size={30} color={'#fff'} />
              </Button>
            </Right>
</Header>

    <ScrollView
      contentContainerStyle={gStyle.contentContainers}
      style={gStyle.container[theme]}

    >

    <View style={{flex:1}}
  >
    <View  style={{flex:1,justifyContent: 'center',alignItems: 'center',width: Dimensions.get('window').width}}>

    <TouchableOpacity onPress={navigation.state.params.data.user=='مجهول'?null:()=>navigation.navigate('Profile',{data:navigation.state.params.data.writerId})} style={{flex:1,justifyContent: 'center',alignItems: 'center',width: Dimensions.get('window').width}}>

    <Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular'}]}>صاحب {'الكذبات'} {navigation.state.params.data.user}</Text>

         </TouchableOpacity>
</View>
<View
  style={{
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,marginVertical: 5,
    width:Dimensions.get('window').width
  }}
/>
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center',width: Dimensions.get('window').width}}>
    <Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>الثلاث كذبات</Text>
    <Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20}]}>الاولى</Text>

    <TouchableOpacity  style={{ flex: 1,backgroundColor: '#eb144c',borderRadius: 9,width: Dimensions.get('window').width-10,paddingVertical: 12,justifyContent: 'flex-end',alignItems: 'flex-end',alignSelf: 'center'}}>

      <Text
        style={[gStyle.det, { marginVertical: 0,alignSelf: 'flex-end',marginHorizontal: 5,color:'white'}]}

      >{data.firstlie}</Text>
    </TouchableOpacity>
    <Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20}]}>الثانية</Text>

    <TouchableOpacity   style={{ flex: 1,backgroundColor: '#eb144c',borderRadius: 9,width: Dimensions.get('window').width-10,paddingVertical: 12,justifyContent: 'flex-end',alignItems: 'flex-end',alignSelf: 'center'}}>

      <Text
        style={[gStyle.det, { marginVertical: 0,alignSelf: 'flex-end',marginHorizontal: 5,color:'white'}]}

      >{data.secondlie}</Text>
    </TouchableOpacity>
    <Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20}]}>الثالثة</Text>

    <TouchableOpacity   style={{ flex: 1,backgroundColor: '#eb144c',borderRadius: 9,width: Dimensions.get('window').width-10,paddingVertical: 12,justifyContent: 'flex-end',alignItems: 'flex-end',alignSelf: 'center'}}>

      <Text
        style={[gStyle.det, { marginVertical: 0,alignSelf: 'flex-end',marginHorizontal: 5,color:'white'}]}

      >{data.thirdlie}</Text>
    </TouchableOpacity>
</View>
</View>
{!showreply?<View
  style={{
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
width:Dimensions.get('window').width
  }}
>
  <Button

    bordered
    danger
onPress={()=>inc('first')}
    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderColor: '#eb144c'}}
  >
    <Text style={[gStyle.button,{color:'#800020'}]}>اختر الاولى</Text>
  </Button>
  <Button

    bordered
    danger
onPress={()=>inc('second')}
    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderColor: '#eb144c'}}
  >
    <Text style={[gStyle.button,{color:'#800020'}]}>اختر الثانية</Text>
  </Button>
  <Button

    bordered
    danger
onPress={()=>inc('third')}
    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderColor: '#eb144c'}}
  >
    <Text style={[gStyle.button,{color:'#800020'}]}>اختر الثالثة</Text>
  </Button>
</View>:<View style={{flex:1}}>

<Text style={[gStyle.button,gStyle.text[theme],{marginVertical: 5,marginHorizontal: 20}]}>الكذبة الصحيحة هي {data.lie=='first'?'الاولى':data.lie=='second'?'الثانية':'الثالثة'} </Text>
<Text style={[gStyle.button,gStyle.text[theme],{marginVertical: 5,marginHorizontal: 20}]}>لقد اخترت {(data.selectedlie=='first'||opened=='first')?'الاولى':(data.selectedlie=='second'||opened=='second')?'الثانية':'الثالثة'} </Text>

</View>
}
<View
  style={{
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,marginVertical: 5,
    width:Dimensions.get('window').width
  }}
/>

{showreply?<View style={{flex:1}}>
     <Textarea onChangeText={(d)=>setpost(d)} style={{width:Dimensions.get('window').width-10,alignSelf: 'center'}} backgroundColor="white" rowSpan={5} bordered placeholder="قم بالرد..."  placeholderTextColor='gray'/>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: Dimensions.get('window').width,}}>
  <Item picker >
  <Picker

 style={{ height: 50, width: Dimensions.get('window').width,color:'white' }}
 selectedValue={selected}
   onValueChange={(d)=>setselect(d)}

>
<Picker.Item label="يمكن للجميع مشاهدة الرد" value="All" />
<Picker.Item label="فقط من يتابعك" value="friend" />

</Picker>


</Item>

<Image source={{uri:'https://i.pinimg.com/564x/b5/96/9a/b5969ad562f56c19173d32c03260effd.jpg'}} style={{resizeMode: 'contain',width: 50,height: 50,margin: 10}}/>
</View>
<Button

  block
  disabled={clicked}
  onPress={rep}

  style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,backgroundColor: '#eb144c'}}
>
  {clicked? <Spinner color='white' />:<Text style={[gStyle.button,{color:'white'}]}>قم بالرد</Text>}
</Button>
</View>:null}


    </ScrollView>
    </KeyboardAvoidingView>
  );
  function rep(){
    setclick(true);
    {clicked?null:creates()}
  }
};


Liescreen.navigationOptions = ({ navigation }) => ({
  header:null
});;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB'
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32
  }
});

export default Liescreen;
