import React,{useState,useEffect} from 'react';
import { ScrollView, Image,Text, View ,Dimensions,TouchableOpacity,Alert} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import Door from '../components/Door';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
// components
import NavigationBack from '../components/NavigationBack';
import * as Permissions from 'expo-permissions';
import { firebaseApp } from '../../firebase'
import {  Button,Textarea,Header,Right,Left,Title,Body} from 'native-base';
import {Item,Icon } from 'native-base';
import { Form,  Picker,Spinner as SSpinner } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import * as firebase from 'firebase';
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

const MyDoor = ({navigation}) => {
  const theme = useTheme();
  const firstlock=navigation.state.params.data.firstdoor.length ==0?false:!navigation.state.params.data.firstLock
  const secondlock=navigation.state.params.data.seconddoor.length ==0?false:!navigation.state.params.data.secondlock
  const myuid=navigation.state.params.myuid
  const [selected, setselect] = useState('All')
const data=navigation.state.params.data
  const [isVisible, setvisible] = useState(firstlock)
  const [seconddoor, setseconddoor] = useState(secondlock)
  const [isreply, reply] = useState(false)
  const [image, setimage] = useState(null)
  const [uploading, setupload] = useState(false)
  const [status, setstatus] = useState(false)
  const [post, setpost] = useState('')
  const [type, settype] = useState('')
  const [des, setdes] = useState('')
  const [clicked, setckick] = useState(false)

  useEffect(() => {
     // Update the document title using the browser API

            firebaseApp
              .database()
              .ref('Doors/' + myuid+'/'+data.postuid)

              .once("value")
              .then(snapshot => {
                {data.title=='both'&&(snapshot.val().firstLock&&snapshot.val().secondlock)?
                alert(`باب الجرأة والصراحة يظهر لك بابين
                       تكسب نقظتين عند فتحك البوابة
                             اذا قمت بالرد تكسب 3 نقاط
                           واذا رفضت لا تكسب الثلاث نقاط
                              عند الرفض يستم حذف التحدي
                     ملاحظة: سيتم حذف البوابة تلفائي خلال 48 ساعة`):
                     data.title=='truth'&&(snapshot.val().firstLock&&snapshot.val().secondlock)?
                     alert(`باب الحب والكراهية يظهر لك بابين
                       باب الحب يظهر لك اكثر شئ يحبه بك صديقك
                       باب الكراهية يظهر لك اكثر شئ يكرهه بك
                            تكسب نقظتين عند فتحك البوابة
                                  اذا قمت بالرد تكسب 3 نقاط
                                واذا رفضت لا تكسب الثلاث نقاط
                                   عند الرفض يستم حذف التحدي
                          ملاحظة: سيتم حذف البوابة تلفائي خلال 48 ساعة`) :null  }



   });
}, []);
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
   function inc(d){



           firebaseApp.database().ref(`users/${myuid}/balance`).transaction(function(currentClicks) {
     // If node/clicks has never been set, currentRank will be `null`.
     return (currentClicks || 0) + d;
   })


   }
   function goBack() {
     setvisible(false)
     setseconddoor(false)
     reply(false)
if (data.firstLock&&data.secondlock) {
  navigation.goBack()
  navigation.state.params.onBack()
}else {
  navigation.goBack()
}



  }
  function goBacks() {


 }
 function Done(){
   Alert.alert(
   'تم الرد',
   'تم الرد وسيتم مشاهدة الرد بين اصدقائك في شاشة تحديات',
   [
     {text: 'حسنا', onPress:()=>navigation.goBack()},
   ],
   { cancelable: false }
 )
 }
  function openlovedoor(){
    firebaseApp.database().ref(`Doors/${myuid}/${navigation.state.params.data.postuid}`).update({
        firstLock:false,
        updatedAt:new Date().getTime()+(60*60*48*1000)
    });
    inc(3)
    setvisible(true)
}
 function openhatedoor(){
    firebaseApp.database().ref(`Doors/${myuid}/${navigation.state.params.data.postuid}`).update({
        secondlock:false,
        updatedAt:new Date().getTime()+(60*60*48*1000)
    });
    inc(3)
    setseconddoor(true)
}

const  _pickImage = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
       if (status !== 'granted') {

alert('الرجاء السماح للوصول للصور لحفظ المنشور')          }else {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  _handleImagePicked(pickerResult);}
  };
const  _handleImagePicked = async pickerResult => {
    try {
      setupload(true)
setstatus('جاري تحميل الصورة')
      if (!pickerResult.cancelled) {
        setimage(await uploadImageAsync(pickerResult.uri))
        setstatus('')

      }
        console.log("state ===="+image);
    } catch (e) {
      console.log(e);
      setstatus('حدث شئ خاطئ اثناء تحميل الصورة')

      alert('Upload failed, sorry :(');
    } finally {
      setupload(false)

    }
  };
  function creates() {

    setstatus('جاري النشر..');
    const newPostKey = firebaseApp.database().ref('posts').push().key

          const uid = firebaseApp.auth().currentUser.uid
          const username = firebaseApp.auth().currentUser.displayName
  const userid =data.userId

  if (post.length >0) {



          const postData = {
            writerId:uid,
            type:`اختار ${type}`,
            user:username,
            NewChallenge:false,
            title:type,
        des:des,
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
                 contents: {"en": firebaseApp.auth().currentUser.displayName+" " +`قام بالرد على ${data.title=="both"?'باب الجرأة والصراحة':'باب الحب والكراهية'}` },
          filters: [{"field":"tag","key":"uid","relation":"=","value":navigation.state.params.data.writerId}],
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
          inc(2)

notification(newPostKey)
  Done()
  setckick(false);

          })
          .catch(() => {
          setstatus('حدث شئ خاطئ')
            setckick(false);
          })

        .catch(error => {
          console.log(error)
        })




  } else {
  setckick(false);
    setstatus('الرجاء كتابة الرد')
  }
  setTimeout(() => {
        setstatus('')
      }, 4000)



  }
  function notification(notkey){
    const newPostKey = firebaseApp.database().ref('notification').push().key

    firebaseApp.database().ref(`notification/${data.writerId}/${newPostKey}`).update({
        username:firebaseApp.auth().currentUser.displayName,
        noti:`${firebaseApp.auth().currentUser.displayName} قام بالرد على ${data.title=="both"?'باب الجرأة والصراحة':'باب الحب والكراهية'}`,
        postuid:notkey,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
       updatedAt: new Date().getTime()+(60*60*48*1000),
        notuid:newPostKey
    });

  }
function answer(){
  reply(true);
  settype(data.title=='love'?'باب الحب':'باب الصراحة')
  setdes(navigation.state.params.data.firstdoor)

}
function answers(){
  reply(true);
  settype(data.title=='love'?'باب الكراهية':'باب الجرأة')
  setdes(navigation.state.params.data.seconddoor)
}
     return (
    <ScrollView
      contentContainerStyle={gStyle.contentContainers}
      style={gStyle.container[theme]}

    >

    <View style={{flex:1}}
  >
    <View  style={{flex:1,justifyContent: 'center',alignItems: 'center',width: Dimensions.get('window').width}}>
    <Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20,color:'#eb144c',fontWeight: 'bold',fontFamily: 'Cairo-Bold'}]}>انتبه: يمكنك اختيار باب واحد فقط</Text>

</View>
<View
  style={{
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,marginVertical: 5,
    width:Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }}
/>
<Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'center',marginHorizontal: 20,fontWeight: 'bold',fontFamily: 'Cairo-Bold'}]}>اختر باب واحد</Text>

<View style={{flex:1,  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 10,
  alignItems: 'center',width:Dimensions.get('window').width}}>
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center',width: Dimensions.get('window').width}}>

<Door  color='white' onPress={openlovedoor}/>
<Text style={[gStyle.text[theme], , gStyle.det,{alignSelf: 'center',marginHorizontal: 20}]}>{data.title=='love'?'باب الحب':'باب الصراحة'}</Text>

</View>
<View style={{flex:1,justifyContent: 'center',alignItems: 'center',width: Dimensions.get('window').width}}>

<Door  color='white' onPress={openhatedoor}/>
<Text style={[gStyle.text[theme],  gStyle.det,{alignSelf: 'center',marginHorizontal: 20}]}>{data.title=='love'?'باب الكراهية':'باب الجرأة'}</Text>

</View>
</View>
<TouchableOpacity  onPress={navigation.state.params.data.user=='مجهول'?null:()=>navigation.navigate('Profile',{data:data.writerId})} style={{flex:1,justifyContent: 'center',alignItems: 'center',width: Dimensions.get('window').width}}>
<Text style={[gStyle.text[theme],  gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular'}]}>المرسل: {navigation.state.params.data.user}</Text>


</TouchableOpacity>
<Modal
       testID={'modal'}
       isVisible={isVisible}
       backdropColor="#B4B3DB"
       backdropOpacity={0.8}
       animationIn="zoomInDown"
       animationOut="zoomOutUp"
       animationInTiming={600}
       animationOutTiming={600}
       backdropTransitionInTiming={600}
       backdropTransitionOutTiming={600}>
       <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: 'white',width:Dimensions.get('window').width ,alignSelf: 'center'}}   collapsable={false}
         ref={view => {
            this._containers = view;
          }}>
          <Header style={{width: Dimensions.get('window').width,backgroundColor: '#fff'}}>
<Left>
 <Button transparent>
 <MaterialCommunityIcons onPress={goBack} name='close' size={30} color='black' />

 </Button>
</Left>
<Right>
  <Text style={{fontFamily: 'Cairo-Bold'}}>{data.title=='love'?'باب الحب':'باب الصراحة'}</Text>
</Right>
</Header>
       <Text style={[gStyle.text['light'], gStyle.det,{alignSelf: 'flex-end',marginHorizontal: 20}]}>{navigation.state.params.data.firstdoor.length>0?navigation.state.params.data.firstdoor:'لا شئ يحبه فيك'}</Text>
       <Text style={[gStyle.text['light'], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>#تطبيق_الباب_السري</Text>

       <View
         style={{
           borderBottomColor: '#dddddd',
           borderBottomWidth: 1,marginVertical: 5,
           width:Dimensions.get('window').width
         }}
       />

       </View>
       <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>
       <TouchableOpacity onPress={async () =>{
           try {
             let result = await captureRef(this._containers, {
               format: 'png',
             });

             let saveResult = await MediaLibrary.saveToLibraryAsync(result, 'photo');
             console.log(saveResult);
             alert('تم الحفظ في معرض الصور')
           }
           catch(snapshotError) {
             console.error(snapshotError);
           }
         }}>
       <Text style={[gStyle.text['light'],  gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20,color:'#800020'}]}>حفظ</Text>
       </TouchableOpacity>
       <Button
            block

       onPress={answer}
            style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,backgroundColor: '#eb144c',marginVertical: 10}}
            >
            <Text style={[gStyle.button,{color:'#fff',fontFamily: 'Cairo-Bold'}]}>قم بالرد</Text>
            </Button>
       </View>
     </Modal>
     <Modal
            testID={'modal'}
            isVisible={seconddoor}
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: 'white',width:Dimensions.get('window').width,alignSelf: 'center',borderColor:'#eb144c',borderWidth: 0.3}}   collapsable={false}
              ref={view => {
                 this.seconddoor = view;
               }}>
               <Header style={{width: Dimensions.get('window').width,backgroundColor: '#fff'}}>
     <Left>
      <Button transparent>
      <MaterialCommunityIcons onPress={goBack} name='close' size={30} color='black' />

      </Button>
     </Left>
     <Right>
       <Text style={{fontFamily: 'Cairo-Bold'}}>{data.title=='love'?'باب الكراهية':'باب الجرأة'}</Text>
     </Right>
     </Header>
            <Text style={[gStyle.text['light'], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>{navigation.state.params.data.seconddoor.length>0?navigation.state.params.data.seconddoor:'لاشئ يكرهه فيك'}</Text>
            <Text style={[gStyle.text['light'], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20}]}>#تطبيق_الباب_السري</Text>

            <View
              style={{
                borderBottomColor: '#dddddd',
                borderBottomWidth: 1,marginVertical: 5,
                width:Dimensions.get('window').width
              }}
            />

            </View>
            <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>
            <TouchableOpacity onPress={async () =>{
                try {
                  let result = await captureRef(this.seconddoor, {
                    format: 'png',
                  });

                  let saveResult = await MediaLibrary.saveToLibraryAsync(result, 'photo');
                  console.log(saveResult);
                  alert('تم الحفظ في معرض الصور')
                }
                catch(snapshotError) {
                  console.error(snapshotError);
                }
              }}>
            <Text style={[gStyle.text['light'],  gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 20,color:'#800020'}]}>حفظ</Text>
            </TouchableOpacity>
            <Button
                 block

            onPress={answers}
                 style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,backgroundColor: '#eb144c',marginVertical: 10}}
                 >
                 <Text style={[gStyle.button,{color:'#fff',fontFamily: 'Cairo-Bold'}]}>قم بالرد</Text>
                 </Button>
            </View>
          </Modal>
          <Modal
                 testID={'modal'}
                 isVisible={isreply}
                 backdropColor="#B4B3DB"
                 backdropOpacity={0.8}
                 animationIn="zoomInDown"
                 animationOut="zoomOutUp"
                 animationInTiming={600}
                 animationOutTiming={600}
                 backdropTransitionInTiming={600}
                 backdropTransitionOutTiming={600}>
                 <View style={{flex:1,backgroundColor: 'white',width:Dimensions.get('window').width ,alignSelf: 'center',height: Dimensions.get('window').height,borderColor:'#eb144c',borderWidth: 0.3}}   collapsable={false}
                   ref={view => {
                      this._containers = view;
                    }}>
                    {status.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: status=='جاري النشر..'?'green':status=='تم النشر'?'green':'#800020'}}>
                    <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular',color: '#FFF'}]}>{status}</Text>

                    </View>:null}

                    <Header style={{width: Dimensions.get('window').width,backgroundColor: '#fff'}}>
         <Left>
           <Button transparent>
           <MaterialCommunityIcons onPress={goBack} name='close' size={30} color='black' />

           </Button>
         </Left>
         <Body>
           <Button transparent>

           </Button>
         </Body>
<Right></Right>
       </Header>
       <ScrollView>
                    <Textarea onChangeText={(d)=>setpost(d)} style={{width:Dimensions.get('window').width-10,alignSelf: 'center'}} backgroundColor="white" rowSpan={5} bordered placeholder="قم بالرد على التحدي.."  placeholderTextColor='gray'/>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: Dimensions.get('window').width,}}>
                    <Item picker >
                    <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="عرض حسب"
                    placeholderStyle={gStyle.text[theme]}
                    textStyle={gStyle.text[theme]}
                    placeholderIconColor="#007aff"
                    selectedValue={selected}

                    >
                    <Picker.Item label="يمكن للجميع مشاهدة الرد" value="All" />
                    <Picker.Item label="فقط من يتابعك" value="friend" />
                    </Picker>
                    </Item>

                    </View>
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
                    <TouchableOpacity


                      disabled = {clicked}
                      onPress={() => {
                        setckick(true);
                      clicked?null:creates()
                      }}
                      style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,backgroundColor: '#eb144c',height: 45}}
                    >
                    {clicked? <SSpinner color='white' />:<Text style={[gStyle.button,{color:'white'}]}>قم بالرد</Text>}

                    </TouchableOpacity>
                    <Text style={[gStyle.p,{color:'#eb144c'}]}>{status}</Text>

</ScrollView>
                 </View>

               </Modal>

     </View>
    </ScrollView>
  );
};

MyDoor.navigationOptions = ({ navigation }) => ({
  headerLeft: <NavigationBack navigation={navigation} />,
  headerRight: <View style={{ flex: 1 }} />,
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'اختر باب'
});

export default MyDoor;
