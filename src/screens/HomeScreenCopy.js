import React from 'react';
import { Image, StatusBar,Text, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Badge} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,   } from 'native-base';
import Card from '../components/Card';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Entypo } from 'react-native-vector-icons';
import { device} from '../constants';
import {  Picker } from "native-base";
import { Ionicons } from 'react-native-vector-icons';

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
const offers = [
  {
    title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
    user:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,
  },
  {
    title: 'بهوايا انت قاعدة معايا عينيكي ليا مرايا',
    description: 'When you subscribe 1 year on openshop apps',
    first:'#800020',
  second:'steelblue',
      user:'samisami',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:false,
  },
  {
    title: 'باب الكراهية',
    first:'#800020',
  second:'steelblue',
      user:'ahmed',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:true,
  },



];
const posts = [
  {
    type:'قبل التحدي',
    user:'sameranas',
    NewChallenge:false,
    title:'التحدي',
des:'يجب عليك ان تضيف صورتك وانت صغير',
reply:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
image:'https://previews.123rf.com/images/bogumil/bogumil1306/bogumil130600035/20420629-young-kid-is-going-to-school.jpg',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:false,
love:1,
laugh:0,
sad:0,
dislike:0
  },
  {
    type:'اختار الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'السؤال',
des:'هل بكيت يوما من اجل شخص؟',
reply:'لا لم ابكي يوما',
image:'',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
liegame:false,
thirdlie:'انا شخص بحب الناس',
lie:'first',
love:5,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اختار كذبة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الكذبة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
dateadded:20302302033,
love:5,
liegame:false,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اجاب على الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الصراحة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
firstno:2,
secondno:1,
thirdno:5,
dateadded:20302302033,
love:1,
laugh:2,
sad:6,
liegame:false,
dislike:3
  },

  {
    type:'اضاف 3 كذبات',
    user:'ahmed ahmed',
    NewChallenge:true,
    title:'الكذبة الاولى',
des:'انا شخص احب الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:true,
earn:5,
firstno:2,
secondno:1,
thirdno:5,

dateadded:20302302033,
love:1,
laugh:2,
sad:6,
dislike:3
  },
];
import { ThemeContext } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
       refreshing: false,
       friendarray:[],
      myusername:'',
      posts:[],
      Duration:'date',
      disabled:false,
      reqdata:[],
  not:[],
      check:false,
      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.not=[]
    this.friendsdata=[]
    this.currentusername=''
    this.displayCategories(this.state.myuid)
    this._displayfriend()
    this.DisplayPosts(this.state.myuid)

  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  _onRefresh = () => {
   this.setState({refreshing: true});
   this.displayCategories()
   this._displayfriend()
   this.DisplayPosts()

   firebaseApp
     .database()
     .ref('users/'+firebaseApp.auth().currentUser.uid)

     .once("value")
     .then(snapshot => {

this.setState({balance:snapshot.val().balance,refreshing:false})
     });

 }
 req=()=>{
   var ref = firebaseApp.database().ref("friendsreq/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

   ref.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var items = [];
        friend =[]
        snapshot.forEach((child) => {

if(child.val().accept==false){
 items.push(child.val());
}

       });

       this.setState({ reqdata:Object.values(items),spinner:false});

   });
 }
 notf=()=>{
   var ref = firebaseApp.database().ref("notification/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

   ref.once('value').then(snapshot => {
       // console.log(snapshot.val());

        // get children as an array
        var items = [];
        friend =[]
        snapshot.forEach((child) => {

if(child.val()){
 items.push(child.val());
}

       });

       this.setState({ spinner:false},function(){
         this.not=Object.values(items)
       });

   });

 }
  onValueChange1(value: string) {
    this.setState({
      Duration: value,
      refreshing:true
    });
    this._onRefresh()
  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };
  displayCategories = (d) => {
    this.setState({refreshing:true})

    console.log("------------uid home ------ "+firebaseApp.auth().currentUser.uid);
    let uid =firebaseApp.auth().currentUser.uid
    console.log("------------uid uid ------ "+uid);
const refs =`Doors/${uid}`
    var ref = firebaseApp.database().ref(refs);//Here assuming 'Users' as main table of contents

    firebaseApp.database().ref(`Doors/${uid}`).once('value').then(snapshot => {
        // console.log(snapshot.val());
console.log('lalallaal-----'+snapshot.val());
         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

    let sort =items

if (this.state.Duration=='date') {
   sort = items.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);

  });

} else if(this.state.Duration=='open'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==false||word.secondlock ==false);

}else if(this.state.Duration=='close'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==true&word.secondlock ==true);

}else {
 sort =items
}



this.setState({ dataArray: Object.values(sort)},function(){this.arrayholder=Object.values(sort)});

    });
console.log(this.state.dataArray);
  }

_displayfriend =()=>{

  console.log('ddddddd =====');

  var ref = firebaseApp.database().ref("friends/"+firebaseApp.auth().currentUser.uid); //Here assuming 'Users' as main table of contents

  ref.once('value').then(snapshot => {
      // console.log(snapshot.val());

       // get children as an array
       var items = [];
       friend =[]
       snapshot.forEach((snap) => {
         var item = snap.val();
item.key = snap.key;

items.push(item);

      });
console.log('friedndsdfsdf ====='+items);
      this.setState({ friendarray: Object.values(items)},function(){this.friendsdata=Object.values(items)});

  });
}

  DisplayPosts = (d) => {
    this.setState({refreshing:true})


    firebaseApp.database().ref(`Posts`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

    let sort =items

if (this.state.Duration=='date') {
   sort = items.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);

  });

}else {
 sort =items
}
let filtered=sort.filter(person => this.friendsdata.includes(person.user)|| person.writerId === firebaseApp.auth().currentUser.uid|| person.writerId === "fWTdjLH0EbOq0xBvb7GSuy8jeJp1")
console.log(sort +'--------------------------------posts');
this.setState({ check:false,disabled:false,posts: Object.values(filtered),spinner:false});

    });
  }



  componentDidMount() {
      this.setState({spinner:true})
    this.setState({refreshing:true})
    firebaseApp
      .database()
      .ref('users/'+firebaseApp.auth().currentUser.uid)

      .once("value")
      .then(snapshot => {

this.setState({balance:snapshot.val().balance,refreshing:false})
      });

  }
  componentWillUnmount() {

 }

deletess=(data,name)=>{
  var updates = {};
updates[`Posts/${data.postuid}/${name}/${firebaseApp.auth().currentUser.uid.toLowerCase()}`] = null;
return firebaseApp
.database()
.ref()
.update(updates)
}
 incs=async (data)=>{

if (this.state.check!=true) {
   this.setState({check:true})
  firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              console.log('existsssss');
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) - 1;
              })
this.deletess(data,'likesuser')




            }
            else{
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) + 1;
              })
              let updates = {}
              firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)


            }
          })
}




 }
 clickquiz=(data,lie)=>{

if (this.state.check!=true) {
   this.setState({check:true})
  firebaseApp.database().ref(`Posts/${data.postuid}/liesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {



            }
            else{
              firebaseApp.database().ref(`Posts/${data.postuid}/${lie}`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) + 1;
              })
              let updates = {}
              firebaseApp.database().ref(`Posts/${data.postuid}/liesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)


            }
          })
}

this.props.navigation.navigate('Challenge',{data,myuid:firebaseApp.auth().currentUser.uid })


 }
 laugh=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'laughusers')




             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)


             }
           })
}
 }
 sad=(data)=>{

   firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'sadusers')




             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)


             }
           })

 }
 dis=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
 this.deletess(data,'disusers')




             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)


             }
           })
}
 }
 onBack() {

  this._onRefresh()

     // Back from another screen
   }

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
header:null
  });
  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({ date: Moment(date).format('MMM Do YY') });

    this.hideDatePicker();
  };
  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.user.toUpperCase()}
      ${item.title.toUpperCase()}   ${item.firstdoor.toUpperCase()} ${item.seconddoor.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ dataArray: newData });
  };

render(){

  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>

<StatusBar hidden={true} />
        <Header searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor,marginTop: 5}}>
        <Left>
                   <Button transparent onPress={()=>navigation.navigate('Share',{})}>
                   <Entypo name={'slideshare'} size={30} color={'#fff'} />

                   </Button>
                 </Left>
                 <Body>
                   <Title>الباب السري</Title>
                 </Body>
                 <Right>

                 <Button transparent
                   style={[{padding: 12,
                   position: 'relative'}]}
                   onPress={()=>navigation.navigate('Notification',{})}
                 >
                   <Ionicons
                     name="ios-notifications"
                     size={30}
                     color={'white'}

                   />
                  {this.not.length>0? <View

                     style={[{  backgroundColor: '#eb144c',
                       borderRadius: 4,
                       alignSelf: 'center',
                       height: 16 / 2,
                       width: 16 / 2,
                       position: 'absolute',
                       top: 9,
                       right: 12}]}
                   />:null}
                 </Button>
                   <Button transparent>
                   <MaterialCommunityIcons name={'trophy-award'} onPress={()=>navigation.navigate('Top',{})} size={30} color={'#fff'} />
                   </Button>

                   <Button onPress={()=>navigation.navigate('Friends',{})} transparent style={{justifyContent: 'center',alignItems: 'center'}} >
                   {this.state.reqdata.length>0? <Badge style={{ backgroundColor: '#eb144c',position: 'relative',alignItems: 'center',justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>{this.state.reqdata.length}</Text>
          </Badge>:<MaterialCommunityIcons name={'account-heart'} size={30} color={'#fff'} />}

                   </Button>
                 </Right>
    </Header>

    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container[theme]}
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#eb144c"
          />
        }
    >

         <View style={{flex:1,justifyContent: 'space-between',alignItems: 'center',flexDirection: 'row',width: '100%'}}>
         <Text style={[gStyle.text[theme], gStyle.Title]}>نقاطي : {this.state.balance}</Text>

         <Item picker >
         <Picker

        style={{ height: 50, width: 150,color:'white' }}
        selectedValue={this.state.Duration}
        onValueChange={this.onValueChange1.bind(this)}

      >
      <Picker.Item label="الوقت من الاحدث للاقدم" value="date" />
      <Picker.Item label="المفتوح" value="open" />
      <Picker.Item label="المغلق" value="close" />
      <Picker.Item label="من الاقدم للاحدث" value="dateopposite" />

      </Picker>
         </Item>

         </View>



         {this.state.dataArray.length ===0?
           <View
             style={{
               flex: 1,

               padding: 20,
               alignSelf: 'center',
               justifyContent: 'center',
               alignItems: 'center',

             }}
           >
           <Text style={[gStyle.button,gStyle.text[theme]]}>لايوجد لديك ابواب لتفتحها شارك اصدقائك بحسابك لكي يرسلوا لك</Text>

             <Button
               block

           danger
               onPress={()=>navigation.navigate('Share')}
               style={{ justifyContent: 'center', alignItems: 'center',padding: 25}}
             >
               <Text style={[gStyle.button,{color:'white'}]}>شارك اصدقائك </Text>
             </Button>
           </View>
         :null}

<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: 10}}>
{this.state.dataArray.map((data, index) => {

      const time = data.updatedAt
    if (new Date().getTime() > time && data.firstLock==false)  {
       return (
        firebaseApp.database().ref('Doors/' + data.writerId+'/'+data.postuid).on('value', function(snapshot) {
     snapshot.ref.remove();
   })

       )

     }



  return(


      <Carousel

onPress={()=>navigation.navigate(data.title=='truth'?'ChallengeScreen':data.title=='challenge'?'ChallengeScreen':data.title=='both'?'MyDoor':data.title=='love'?'MyDoor':'Liescreen',{data,myuid:firebaseApp.auth().currentUser.uid, onBack: this._onRefresh })}
        imageSrc={data.firstLock&data.secondlock ===true?require('../assets/logo.png'):require('../assets/opened.png')}
        data={data}
        theme={theme}
        firstLock={data.firstLock}
timeleft={data.updatedAt}
        first={data.first}
        second={data.second}
        title={data.title=='truth'?'باب الصراحة':data.title=='challenge'?'باب التحدي':data.title=='both'?'الجرأة والصراحة':data.title=='love'?'باب الحب والكراهية':'باب الكذب'}
        user={data.user}

      />

  )
})}

</ScrollView>


      <Text style={[gStyle.text[theme], , gStyle.Title,{alignSelf: 'flex-end',marginHorizontal: 10}]}>تحديات اصدقائك</Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}

        style={{ paddingVertical: 10 }}
      >


      {this.state.posts.map((data, index) => {
        const frien=[{uid:"fWTdjLH0EbOq0xBvb7GSuy8jeJp1"}]


        const time = data.updatedAt
      if (new Date().getTime() > time)  {
         return (
          firebaseApp.database().ref('Posts/' + data.postuid).on('value', function(snapshot) {
       snapshot.ref.remove();
     })

         )

       }

else if(true){
  return(
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        marginVertical: 10
      }}
    >


      <Card
        containerStyle={{ alignSelf: 'center', marginHorizontal: 20 }}
onPress={()=>navigation.navigate('Challenge',{data,myuid:firebaseApp.auth().currentUser.uid, onBack: this.onBack.bind(this) })}
        image={require('../assets/logo.png')}
        data={data}
        theme={theme}
        show={false}
        lie={data.liegame}
        dis={()=>this.dis(data)}
        sad={()=>this.sad(data)}
        nolikes={data.love}
        nolaugh={data.laugh}
        nosad={data.sad}
        nodis={data.dislike}
onfirst={()=>this.clickquiz(data,'firstno')}
onsecond={()=>this.clickquiz(data,'secondno')}
onthird={()=>this.clickquiz(data,'thirdno')}
        laugh={()=>this.laugh(data)}
        first={data.first}
        incs={()=>this.incs(data)}
        challenge={data.first=="#800020"?'قبل التحدي':data.first=='steelblue'?'اختار الصراحة':data.first=='yellow'?'اختار باب الحب':'اختار الجرأة'}
        navigation={navigation}
        second={data.second}
        title={data.title}
        user={data.user}

      />
    </View>
  )

}else {
  return null
}


      })}
      </ScrollView>
{this.state.dataArray.length ===0?
  <View
    style={{
      flex: 1,
      padding: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

    }}
  >
  <Text style={[gStyle.button,gStyle.text[theme]]}>لايوجد لديك ابواب لتفتحها شارك اصدقائك بحسابك لكي يرسلوا لك</Text>

    <Button
      block

  danger
      onPress={()=>navigation.navigate('Share')}
      style={{ justifyContent: 'center', alignItems: 'center',padding: 25}}
    >
      <Text style={[gStyle.button,{color:'white'}]}>شارك اصدقائك </Text>
    </Button>
  </View>
:null}
      <Text
        style={[
          gStyle.text[theme],
          gStyle.textPacifico,
          { alignSelf: 'center' }
        ]}
      >
        Design By Opentiq
      </Text>
    </ScrollView>
    </View>
  )}

</ThemeContext.Consumer>
  )
}

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

export default HomeScreen;
