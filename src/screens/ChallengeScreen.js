import React,{useState,useEffect} from 'react';
import {ToastAndroid, ScrollView, Image,Text, View,TextInput, ImageBackground ,Platform,Dimensions,TouchableOpacity,StyleSheet,KeyboardAvoidingView,Alert} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import Door from '../components/Door';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
// components
import { Feather } from 'react-native-vector-icons';
import { Ionicons } from 'react-native-vector-icons';

import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import * as firebase from 'firebase';
const { width } = Dimensions.get("screen");

import NavigationBack from '../components/NavigationBack';
import * as Permissions from 'expo-permissions';
import { firebaseApp } from '../../firebase'
import {  Button,Textarea} from 'native-base';
import {Item,Icon ,Footer,FooterTab,Container,Content} from 'native-base';
import { Form} from 'native-base';
import Moment from 'moment';
import { Header,Left,Right,Body,Title,Spinner} from 'native-base';
import {  Picker } from "native-base";
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebaseApp
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const ChallengeScreen = ({navigation}) => {
  const theme = useTheme();
  const firstlock=navigation.state.params.data.firstdoor.length ==0?false:!navigation.state.params.data.firstLock
  const secondlock=navigation.state.params.data.seconddoor.length ==0?false:!navigation.state.params.data.secondlock
  const myuid=navigation.state.params.myuid
  const [selected, setselect] = useState('All')
const data =navigation.state.params.data
  const [isVisible, setvisible] = useState(firstlock)
  const [seconddoor, setseconddoor] = useState(secondlock)
  const [times, settimes] = useState(0)
  const [image, setimage] = useState(null)
  const [uploading, setupload] = useState(false)
  const [status, setstatus] = useState(false)
  const [post, setpost] = useState('')
  const [showreply, setreply] = useState(false)
  const [clicked, setckick] = useState(false)
  const [modal, isModalVisible] = useState(false)

  const showToast = () => {
     ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
   };
   const showToastWithGravity = () => {
      ToastAndroid.showWithGravity(
        "All Your Base Are Belong To Us",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    };
  function  toggleModal (t){
    isModalVisible(!modal)
    };
    const showToastWithGravityAndOffset = () => {
      ToastAndroid.showWithGravityAndOffset(
        "A wild toast appeared!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    };
   useEffect(() => {
  /** handleWidgets */

console.log('First lock '+data.firstLock);
 {data.title=='challenge'&&data.firstLock?
  alert(`باب التحدي يظهر لك تحدي اصدقائك
      اذا قبلت تكسب 5 نقاط
      واذا رفضت لا تكسب شئ
      عند الرفض يستم حذف التحدي
      ملاحظة: سيتم حذف البوابة تلفائي خلال 48 ساعة`):
      data.title=='truth'&&data.firstLock?
      alert(`باب الصراحة يظهر لك صراحة اصدقائك
             كسبت نقظتين بسبب فتحك البوابة و
                   اذا قمت بالرد تكسب 3 نقاط
                 واذا رفضت لا تكسب الثلاث نقاط
                    عند الرفض يستم حذف التحدي
           ملاحظة: سيتم حذف البوابة تلفائي خلال 48 ساعة`) :null  }

                 {update(data.firstLock)}
                if (showreply) {

                }else {
                  setreply(data.accept)
                }
 }, []);
   function goBack() {
     if (data.firstLock) {
       navigation.goBack()
       navigation.state.params.onBack();  // Call onBack function of ScreenA

     }else {
         navigation.goBack()
     }
  }

  function deletes(){
      const time = data.updatedAt
    if (new Date().getTime() > time)  {
       return (
        firebaseApp.database().ref('Doors/' + firebaseApp.auth().currentUser.uid+'/'+data.postuid).on('value', function(snapshot) {
     snapshot.ref.remove();
   })

       )
          goBack()
     }

}

function update(d){

  if (d===true)  {

       firebaseApp.database().ref(`Doors/${myuid}/${navigation.state.params.data.postuid}`).update({
          firstLock:false,
            updatedAt:new Date().getTime()+(60*60*48*1000)
        })
        {data.title=='truth'?inc(2):null}



   }

}
function deletesss(){
alert('جاري الحذف الرجاء الانتظار قليلا')

  firebaseApp.database().ref('Doors/' + firebaseApp.auth().currentUser.uid+'/'+data.postuid).on('value', function(snapshot) {
snapshot.ref.remove();
})
goBack()
}
function inc(d){



        firebaseApp.database().ref(`users/${myuid}/balance`).transaction(function(currentClicks) {
  // If node/clicks has never been set, currentRank will be `null`.
  return (currentClicks || 0) + d;
})


}




const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

const  _pickImage = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
       if (status !== 'granted') {

alert('الرجاء السماح للوصول للصور لحفظ المنشور')          }else {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  _handleImagePicked(pickerResult);
}

  };
const  _handleImagePicked = async pickerResult => {
    try {
      setupload(true)
setstatus('جاري تحميل الصورة');
      if (!pickerResult.cancelled) {
        setimage(await uploadImageAsync(pickerResult.uri))
      }
        console.log("state ===="+image);
    } catch (e) {
      console.log(e);
      setstatus('حدث خظأ اثناء تحميل الصورة');
      alert('Upload failed, sorry :(');
    } finally {
      setupload(false)
setstatus('');
    }
  };









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
function Done(){
  Alert.alert(
  'تم الرد',
  'تم الرد وسيتم مشاهدة الرد بين اصدقائك في شاشة تحديات',
  [
    {text: 'حسنا', onPress:goBack()},
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
    {text: 'شرح البوابة', onPress: () => {data.title=='challenge'?
     alert(`باب التحدي يظهر لك تحدي اصدقائك
         اذا قبلت تكسب 5 نقاط
         واذا رفضت لا تكسب شئ
         عند الرفض يستم حذف التحدي
         ملاحظة: سيتم حذف البوابة تلفائي خلال 48 ساعة`):
         data.title=='truth'?
         alert(`باب الصراحة يظهر لك صراحة اصدقائك
                كسبت نقظتين بسبب فتحك البوابة و
                      اذا قمت بالرد تكسب 3 نقاط
                    واذا رفضت لا تكسب الثلاث نقاط
                       عند الرفض يستم حذف التحدي
              ملاحظة: سيتم حذف البوابة تلفائي خلال 48 ساعة`) :null}},
    {text: 'حذف الباب', onPress: confirmss},
  ],
  { cancelable: false }
)
}
function creates(){
if (!clicked) {
  setstatus('جاري النشر..');
  const newPostKey = firebaseApp.database().ref('posts').push().key

        const uid = firebaseApp.auth().currentUser.uid
        const username = firebaseApp.auth().currentUser.displayName
const userid =data.userId

if (post.length >0) {



        const postData = {
          writerId:uid,
          type:data.title=='truth'?'اجاب على الصراحة':'قبل التحدي',
          user:username,
          NewChallenge:false,
          title:data.title=='truth'?'الصراحة':'التحدي',
      des:data.firstdoor,
      reply:post,
      image:image,
      firstlie:'',
      secondlie:'',
      seen:selected,
      thirdlie:'س',
      lie:'',
      liegame:false,
      earn:3,
      firstno:2,
      secondno:1,
      thirdno:5,
      love:0,
      laugh:0,
      sad:0,
      dislike:0,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: new Date().getTime()+(60*60*48*1000),
          postuid:newPostKey,

        }
        let updates = {}
const mes =data.title=='truth'?'اجاب على الصراحة':'قبل التحدي'
        updates['Posts/' +newPostKey] = postData

        firebaseApp.database().ref().update(updates)
        .then(() => {
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
               contents: {"en": firebaseApp.auth().currentUser.displayName +" "+mes },
      filters: [{"field":"tag","key":"uid","relation":"=","value":data.writerId}],
             })
           })
           .then((response) => response.json())
           .then((responseData) => {
               console.log("Push POST:" + JSON.stringify(responseData));
               responseData.json()
           })
        setstatus('تم النشر')
        setpost('')
        setimage(null)
Done()
setckick(false);
{data.title=='truth'?inc(3):data.title=='challenge'?inc(5):null}
notification(newPostKey)
        })
        .catch(() => {
        setstatus('حدث شئ خاطئ')
          setckick(false);
        })

      .catch(error => {
        console.log(error)
      })




} else {

  setstatus('الرجاء كتابة الرد')
alert('الرجاء كتابة رد')

    setckick(false);
}

setTimeout(() => {
      setstatus('')
    }, 3000)

}


}



function notification(notkey){
  const newPostKey = firebaseApp.database().ref('posts').push().key

  firebaseApp.database().ref(`notification/${data.writerId}/${newPostKey}`).update({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`${firebaseApp.auth().currentUser.displayName} قام بالرد على ${data.title=='truth'?'الصراحة':'التحدي'}`,
      postuid:notkey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
     updatedAt: new Date().getTime()+(60*60*48*1000),
      notuid:newPostKey
  });

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

    <Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular'}]}>صاحب {data.title=='truth'?'الصراحة':'التحدي'} {navigation.state.params.data.user}</Text>

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
    <Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>{data.title=='truth'?'الصراحة':'التحدي'}</Text>

    <View style={{ flex: 1,backgroundColor: '#eb144c',borderRadius: 9,width: Dimensions.get('window').width-10,paddingVertical: 12,justifyContent: 'flex-end',alignItems: 'flex-end',alignSelf: 'center'}}>

      <Text
        style={[gStyle.det, { marginVertical: 0,alignSelf: 'flex-end',marginHorizontal: 5,color:'white'}]}

      >{data.firstdoor}</Text>
    </View>
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
onPress={confirms}
    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderColor: '#eb144c'}}
  >
    <Text style={[gStyle.button,{color:'#800020'}]}>رفض</Text>
  </Button>
  <Button
    block

onPress={accept}
    style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: '#eb144c'}}
  >
    <Text style={[gStyle.button,gStyle.text['dark']]}>{data.title=='truth'?'قم بالرد':'قبول التحدي'}</Text>
  </Button>
</View>:
data.title=='challenge'?<Text style={[gStyle.button,gStyle.text[theme],{marginVertical: 5}]}>تم قبول التحدي</Text>:null
}


{false?<View style={{flex:1}}>
     <Textarea onChangeText={(d)=>setpost(d)} style={{width:Dimensions.get('window').width-10,alignSelf: 'center'}} backgroundColor="white" rowSpan={5} bordered placeholder="قم بالرد..."  placeholderTextColor='gray'/>
<View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-end',width: Dimensions.get('window').width,}}>
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
<View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'flex-end',width: Dimensions.get('window').width,marginVertical: 10}}>
{image?<Image source={{uri:image}} style={{resizeMode: 'contain',width: 50,height: 50,margin: 10}}/>
:null}
<Button

  bordered
  danger
onPress={_pickImage}
  style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderColor: '#eb144c'}}
>
  <Text style={[gStyle.button,{color:'#eb144c'}]}>اضف صورة</Text>
</Button>

</View>
</View>
<TouchableOpacity


  disabled={clicked}
  onPress={rep}

  style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,backgroundColor: '#eb144c',height: 50}}
>
  {clicked? <Spinner color='white' />:<Text style={[gStyle.button,{color:'white'}]}>قم بالرد</Text>}
</TouchableOpacity>
</View>:null}


    </ScrollView>
  {showreply?  <Footer style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
      <FooterTab  style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
      <Button iconRight block style={{width:'100%',backgroundColor: '#eb144c',justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}} onPress={toggleModal}>

             <Text style={{fontFamily: 'Cairo-Regular',fontSize: 17,color: 'white',marginHorizontal: 20}}>اضف رد</Text>
             <Icon name='send' style={{color:'white'}}/>

           </Button>
      </FooterTab>
    </Footer>:null}
    <Modal isVisible={modal} style={{width,alignSelf: 'center'}}>
          <Container style={width}>
          {status.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: status=='جاري النشر..'?'green':status=='تم النشر'?'green':'#800020'}}>
          <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular',color: '#FFF'}]}>{status}</Text>

          </View>:null}
            <Header style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor,marginTop: 5}}>
                      <Left>
                        <Button transparent onPress={toggleModal}>
                          <Icon name='close' />
                        </Button>
                      </Left>
                      <Body>
                        <Title>اضف رد</Title>
                      </Body>
                      <Right >
                      <Button transparent onPress={rep}>
                        <Icon name='send' />
                      </Button>
                      </Right>
                    </Header>
                    <Content style={{backgroundColor:gStyle.container['light'].backgroundColor}}>
                    <View style={{flex:1}}>

                    <TextInput
                       placeholder="مالرد الذي تريد ارساله.."
                       keyboardType="default"
                       multiline={true}
                       autoFocus={true}
                       style={{ flex: 1,
                      fontSize: 16,
                      backgroundColor: 'white',
                      padding: 20,
                      textAlignVertical: 'top'}}
                       enablesReturnKeyAutomatically={true}
                       returnKeyType='done'
                        onChangeText={(d)=>setpost(d)}
                     />
                         </View>
                  {image&&image.length>0?  <ImageBackground

                        source={{uri:image}}
                        style={{
                          resizeMode: 'contain',
                          width: '100%',
                          alignSelf: 'center',
                        marginHorizontal: 10,
                        marginVertical: 15,
                        flex:1,
                    height:250,

                        }}
                      >
                      <Ionicons name="ios-close-circle" onPress={()=>setimage(null)} color="#fff" size={30} style={{ position: 'absolute', top: 30, left: 10 }} />

                      </ImageBackground>:null}
                    </Content>
                    <Footer style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
                      <FooterTab  style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor,marginTop: 5,flexDirection: 'row'}}>
                      <Item picker >
                      <Picker

                      style={{ height: 50, width: '70%',color:'white' }}
                      selectedValue={selected}
                        onValueChange={(d)=>setselect(d)}
                      >
                      <Picker.Item label="يمكن للجميع مشاهدة الرد" value="All" />
                      <Picker.Item label="فقط من يتابعك" value="friend" />

                      </Picker>


                      </Item>
                      <Button transparent onPress={_pickImage}>
                        <Icon name='image' style={{color:'#eb3349'}}/>
                      </Button>
                      </FooterTab>
                    </Footer>
                            </Container>
          </Modal>
    </KeyboardAvoidingView>
  );
function rep(){
  setckick(true);
  {clicked?null:creates()}
}
};


ChallengeScreen.navigationOptions = ({ navigation }) => ({
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

export default ChallengeScreen;
