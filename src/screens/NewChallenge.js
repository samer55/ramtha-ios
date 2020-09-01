import React from "react";
import { RefreshControl,Alert ,ImageBackground,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,TextInput,Image} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea,Content,Footer,FooterTab,Container} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
const { height } = Dimensions.get("screen");

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import * as firebase from 'firebase';
import {  Picker } from "native-base";
import { Feather } from 'react-native-vector-icons';
import { Ionicons } from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';

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
import Modal from 'react-native-modal';

import { Button,Header,Item,Icon,Input,Label,Title } from 'native-base';


import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import NavigationBack from '../components/NavigationBack';
const colors = [

'#800020',
'steelblue',
'yellow',
'purple',
'black'
];
import { MaterialCommunityIcons } from 'react-native-vector-icons';
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

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        text:'',
page:1,
game:'',
balance:0,
        lovemsg:'',
        hatemsg:'',
        lie:'',
        image:null,
        uploading:false,

        title:'',
postStatus:'',
        color1:'steelblue',
        color:'#800020',
        isModalVisible: false,
        commentsRef:'',
        dataSources: [],
data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('myuid',''),
secret:  props.navigation.getParam('secret',false),
firstlie:'',
secondlie:'',
selected:'All',
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }


toggleModal = (t) => {
  this.setState({isModalVisible: !this.state.isModalVisible,page:++this.state.page,title:t,lovemsg:'',image:null});
};
  componentDidMount() {
    Alert.alert(
    'طريقة اللعب',
    `لديك عدة بوابات
    باب الصراحة لكي ترسل للجميع صراحتك لهم او ما تشعر به
    باب التحدي يرسل تحدي لجميع اصدقائك واذا قبل شخص التحدي يكسب
    ثلاث نقاط وانت تكسب ثلاث
    باب الكذب: يظهر لك 3 حقول يجب عليك وضع حقيقتين وواحدة كذب ويحب على الجميع معرفة الكذبة فيهم
    لبدأ اللعب يجب ان يكون لديك 10 نقاط وعند ارسالك تخسر نقطتين

    `,
    [
      {text: 'كيف اكسب نقاط؟', onPress:this.setting},
      {text: 'فهمت ومستعد', onPress: () => console.log('Ask me later pressed')},
    ],
    { cancelable: false }
  )
  firebaseApp
    .database()
    .ref('users/'+firebaseApp.auth().currentUser.uid)

    .once("value")
    .then(snapshot => {

this.setState({balance:snapshot.val().balance,refreshing:false})
    });
  }
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    header:null
  });
send=()=>{
  Alert.alert(
  'هل تريد من صديقك معرفة اسمك؟',
  'عند الارسال بسرية لا يستطيع صديقك معرفة هويتك',
  [
    {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},

    {text: 'ارسال', onPress: this.create},
  ],
  { cancelable: false }
)
}
  onValueChange1(value: string) {
    this.setState({
      title: value,
    });
  }

  onValueChange2(value: string) {
    this.setState({
      lie: value,
    });
  }
  _onRefresh = () => {
   this.setState({refreshing: true});

   firebaseApp
     .database()
     .ref('users/'+firebaseApp.auth().currentUser.uid)

     .once("value")
     .then(snapshot => {

this.setState({balance:snapshot.val().balance,refreshing:false})
     });

 }
   setting=()=>{
    Alert.alert(
    'طريقة كسب نقاط',
    `يمكن ان تكسب نقاط من خلال
    فتحك البوابات السرية في الصفحة الرئيسة
    وقبولك التحديات
    ومن خلال ردك على الرسائل والبوابات
    عند ارسال رسالة ينقص منك نقطتين`,
    [
  {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
      {text: 'حسنا', onPress: ()=>console.log('done')},
    ],
    { cancelable: false }
  )
  }
  create = () => {

    this.setState({
      ploading:true,
      postStatus: 'جاري الارسال..',
      shows:true,pcolor:'warning'
    })
    console.log("title===="+this.state.title);
    const newPostKey = firebaseApp.database().ref('door').push().key


  if (this.state.title.length !=='null'&&(!this.state.clicked)) {
    if ((this.state.lovemsg.length >0||this.state.hatemsg.length >0)||(this.state.title=='lie'&&this.state.firstlie.length>0&&this.state.secondlie.length>0&&this.state.thirdlie.length>0&&this.state.lie.length>0)) {



          const postData = {
            writerId:firebaseApp.auth().currentUser.uid,
            type:this.state.title=='truth'?'اضاف صراحة':this.state.title=='challenge'?'اضاف تحدي':'اضاف 3 كذبات',
            user:firebaseApp.auth().currentUser.displayName,
            NewChallenge:true,
            title:this.state.title=='truth'?'الصراحة':this.state.title=='challenge'?'التحدي':'الكذبة الاولى',
        des:this.state.lovemsg,
        reply:'',
        image:null,
        imgnew:this.state.image,
        acceptno:0,
        firstlie:this.state.firstlie,
        secondlie:this.state.secondlie,
        seen:this.state.selected,
        thirdlie:this.state.secondlie,
        lie:this.state.lie,
        liegame:this.state.title==='lie'?true:false,
        earn:0,
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
          let updatess = {}

          updates['Posts/' + newPostKey] = postData

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

          firebaseApp.database().ref().update(updates)
          .then(() => {
            this.setState({
                            postStatus: 'تم الارسال',
                            title:'',
                            lovemsg:'',
                            firstlie:'',
                            secondlie:'',
                            thirdlie:'',
                            lie:'',
                            clicked:false,
                            hatemsg:'',
                            isModalVisible: !this.state.isModalVisible,
page:1
                          })
  this.setState({shows:false})
  alert('تم ارسال رسالتك')
this.inc()
this.props.navigation.navigate('Home')
          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'#800020',
            clicked:false })
          })

        .catch(error => {
          console.log(error)
        })



    } else {

        this.setState({ploading:false,  postStatus: 'الرجاء عدم ترك ايا حقل فارغ',shows:true ,pcolor:'#800020',
        clicked:false})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: 'الرجاء اختيار عنوان',shows:true ,pcolor:'#800020',
    clicked:false})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }
  setTimeout(() => {
  this.setState({postStatus:''})
}, 3000)


  }
  inc=()=>{



         firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/balance`).transaction(function(currentClicks) {
   // If node/clicks has never been set, currentRank will be `null`.
   return (currentClicks || 0) - 2;
 })


 }
     onSelectColor(color) {
       this.setState({ color });
     }
     onSelectColor1(color1) {
       this.setState({ color1 });
     }
     rep=()=>{
       this.setState({clicked:true})
       this.state.clicked?null:this.create()
     }
  render() {

    const {navigation}=this.props
      const {postStatus}=this.state
    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>

          <Header searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor,marginTop: 5}}>

                   <Body>
                     <Title>العب مع الجميع</Title>
                   </Body>
                   <Right>



                     <Button onPress={this.setting} transparent >
                     <Feather name={'more-horizontal'} size={30} color={'#fff'} />
                     </Button>
                   </Right>
       </Header>

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.containersssss[theme]}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="#eb144c"
            />
          }
      >
      <Spinner
             visible={this.state.spinner}
             textContent={'Loading...'}
             textStyle={{color:'#fff'}}
           />

           {this.state.page==1&&this.state.balance>10?this.AddTitle(theme):<Text style={[gStyle.det,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>لايوجد لديك نقاط كافي لبدأ اللعب يجب ان يتوافر لديك 10 نقاط واكثر نقاطك الحالية : {this.state.balance}</Text>}




{/*this.state.balance>10?<View
  style={{
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
width
  }}
>

  <Button

    bordered
    danger
    disabled={this.state.page==1?true:false}
    onPress={()=>this.setState({page:--this.state.page})}

    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5}}
  >
    <Text style={[gStyle.button,{color:'#eb144c'}]}>السابق</Text>
  </Button>
  <TouchableOpacity


onPress={this.state.page==3?this.rep:()=>{this.setState({page:++this.state.page})}}
    style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#eb144c",height: 45}}
  >
    <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==3?'ارسل':'التالي'}</Text>
  </TouchableOpacity>
</View>:  <Text style={[gStyle.det,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>لايوجد لديك نقاط كافي لبدأ اللعب يجب ان يتوافر لديك 10 نقاط واكثر نقاطك الحالية : {this.state.balance}</Text>
*/}
<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21}]}>{this.state.postStatus}</Text>
<Modal isVisible={this.state.isModalVisible} style={{width,alignSelf: 'center'}}>
      <Container style={width}>
      {postStatus.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: postStatus=='جاري الارسال..'?'green':postStatus=='تم الارسال'?'green':'#800020'}}>
      <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-end',marginHorizontal: 20,fontFamily: 'Cairo-Regular',color: '#FFF'}]}>{postStatus}</Text>

      </View>:null}
        <Header style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor,marginTop: 5}}>
                  <Left>
                    <Button transparent onPress={()=>  this.setState({isModalVisible: !this.state.isModalVisible,page:1,title:''})}>
                      <Icon name='close' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>ارسل باب سري</Title>
                  </Body>
                  <Right >
                  <Button transparent onPress={this.rep}>
                    <Icon name='send' />
                  </Button>
                  </Right>
                </Header>
                <Content style={{backgroundColor:this.state.title=='lie'? gStyle.container[theme].backgroundColor:gStyle.container['light'].backgroundColor}}>
                {this.state.page==2&&this.state.title=='truth'?this.AddTruth(theme):null}
                {this.state.page==2&&this.state.title=='challenge'?this.AddChallenge(theme):null}
                {this.state.page==2&&this.state.title=='both'?this.Addtruthques(theme):null}
                {this.state.page==3&&this.state.title=='both'?this.Adddare(theme):null}
                {this.state.page==2&&this.state.title=='love'?this.lovedoor(theme):null}
                {this.state.page==3&&this.state.title=='love'?this.hatedoor(theme):null}
                {this.state.page==2&&this.state.title=='lie'?this.liegame(theme):null}
              {this.state.image&&this.state.image.length>0?  <ImageBackground

                    source={{uri:this.state.image}}
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
                  <Ionicons name="ios-close-circle" onPress={()=>this.setState({image:null})} color="#fff" size={30} style={{ position: 'absolute', top: 30, left: 10 }} />

                  </ImageBackground>:null}
                </Content>
                <Footer style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
                  <FooterTab  style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor,marginTop: 5,flexDirection: 'row'}}>
                  <Item picker >
                  <Picker

                  style={{ height: 50, width: '70%',color:'white' }}
                  selectedValue={this.state.selected}
                   onValueChange={(d)=>this.setState({selected:d})}

                  >
                  <Picker.Item label="يمكن للجميع مشاهدة الرد" value="All" />
                  <Picker.Item label="فقط من يتابعك" value="friend" />

                  </Picker>


                  </Item>
                  <Button transparent onPress={this._pickImage}>
                    <Icon name='image' style={{color:'#eb3349'}}/>
                  </Button>
                  </FooterTab>
                </Footer>
                        </Container>
      </Modal>
      </ScrollView>
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }


AddTitle = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <LinearGradient
           colors={['#cc2b5e', '#753a88']}
           style={{ padding: 40, alignItems: 'center', borderRadius: 5,width:width-10 ,marginVertical: 20}}>
           <TouchableOpacity onPress={()=>this.toggleModal('truth')}>
           <Text
             style={{
               backgroundColor: 'transparent',
               fontSize: 22,
               color: '#fff',
               fontFamily: 'Cairo-Bold'
             }}>
             باب الصراحة
           </Text>
           </TouchableOpacity>
         </LinearGradient>
         <LinearGradient
                  colors={['#42275a', '#734b6d']}
                  style={{ padding: 40, alignItems: 'center', borderRadius: 5,width:width-10,marginVertical: 20 }}>
                     <TouchableOpacity onPress={()=>this.toggleModal('challenge')}>
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: 22,
                      color: '#fff',
                      fontFamily: 'Cairo-Bold'
                    }}>
                    باب التحدي
                  </Text>
                     </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                         colors={['#eb3349', '#f45c43']}
                         style={{ padding: 40, alignItems: 'center', borderRadius: 5,width:width-10 ,marginVertical: 20}}>
                          <TouchableOpacity onPress={()=>this.toggleModal('lie')}>
                         <Text
                           style={{
                             backgroundColor: 'transparent',
                             fontSize: 22,
                             color: '#fff',
                             fontFamily: 'Cairo-Bold'
                           }}>
                           باب الكذب
                         </Text>
                                </TouchableOpacity>
                       </LinearGradient>
  </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1}}>

  <TextInput
     placeholder="مالذي تريد مصارحة الجميع به"
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
      value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})}
   />
       </View>
)
}

AddChallenge = (theme) => {
return (
  <View style={{flex:1}}>

  <TextInput
     placeholder="مالذي تريد ان تتحدى الجميع به"
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
      value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})}
   />
       </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب شئ يتطلب الجرأة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="ماذا تريد من صديقك ان يفعل اذا اختار باب الجرأة.." />
            </Form>
              </View>
)
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب سؤال تريد من صديقك الاجابة عليه بصراحة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا تريد من صديقك ان يصارحك به اذا اختار باب الصراحة" />
            </Form>
              </View>
)
}
lovedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب اكثر شئ تحبه في صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا يعجبك اكثر في شخصية صديقك.." />
            </Form>
              </View>
)
}
_pickImage = async () => {
   let pickerResult = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3],
   });
   this._handleImagePicked(pickerResult);
 };
_handleImagePicked = async pickerResult => {
   try {
     this.setState({uploading:true})

   this.setState({postStatus:'جاري تحميل الصورة',refreshing:true})
     if (!pickerResult.cancelled) {
         this.setState({image:await uploadImageAsync(pickerResult.uri)})
     }
       console.log("state ===="+image);
   } catch (e) {
     console.log(e);
     this.setState({postStatus:'حدث خظأ اثناء تحميل الصورة',refreshing:false})

   } finally {
     this.setState({uploading:false,refreshing:false})
     this.setState({postStatus:''})


   }
 };

hatedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>ماذا تكره في شخصية صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea  rowSpan={5} style={gStyle.text[theme]}  onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="مالذي تكرهه في شخصية صديقك.." />
            </Form>
              </View>
)
}
liegame = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>باب الكذب</Text>
  <Text style={[gStyle.p,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>طريقة اللعب: يجب كتابة 3 كذبات اثنان منهم حقيقة وواحدة كذب يجب على اصدقائك معرفة الكذبة</Text>

  <Form style={{width:width-10 }}>
              <Textarea onChangeText={(firstlie)=>this.setState({firstlie})} value={this.state.firstlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الاولى" />
              <Textarea  onChangeText={(secondlie)=>this.setState({secondlie})} value={this.state.secondlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثانية"/>

              <Textarea  onChangeText={(thirdlie)=>this.setState({thirdlie})} value={this.state.thirdlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثالثة" />
              <Item picker >
              <Picker

              style={{ height: 50, width: width,color:'white' }}
              selectedValue={this.state.lie}
              onValueChange={this.onValueChange2.bind(this)}

              >
              <Picker.Item label="اختر الكذبة" value="" />

              <Picker.Item label="الاولى" value="first" />
              <Picker.Item label="الثانية" value="second" />
              <Picker.Item label="الثالثة" value="third" />

              </Picker>
              </Item>
            </Form>
              </View>
)
}
}
const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingTop: 25
  },
  userIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  userIcon: {
    height: 22,
    width: 22,
    tintColor: 'white'
  },
  closeIcon: {
    width: 30,
    height: 30,
    padding: 10
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height:'100%',
    backgroundColor: 'white'
  },
  createMessageContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row'
  },
  input: {
    height: '100%',
    width: '90%',
    paddingTop: 10,
    fontSize: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    fontFamily: 'Cairo-Regular'
  }
})
