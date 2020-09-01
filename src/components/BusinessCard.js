import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  TouchableOpacity,
  Text as NativeText,
  View,
  Share as Shared,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { colors, gStyle, images } from '../constants';
import { Button ,Thumbnail} from 'native-base';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { firebaseApp } from '../../firebase'
import moment from 'moment';
// components
import { MaterialIcons } from 'react-native-vector-icons';
import { Feather } from 'react-native-vector-icons';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import { AntDesign } from 'react-native-vector-icons';
import { FontAwesome } from 'react-native-vector-icons';

import Hyperlink from 'react-native-hyperlink';

import Text from './text/Text';

const BCard = props => {
  const {
    title,
    icon,
    price,
    caption,
    show,
    imageSrc,
    onfirst,
    name,
    body,
    onsecond,
    onthird,
    theme,
    incs,
    onPresss,
    laugh,
    sad,
    firstno,
    secondno,
    image,
    thirdno,
    dis,
    onPress,challenge,
    datas,
    details,
    containerStyle,
    imageContainerStyle,
    overlayContainerStyle,
    love,
    iconContainerStyle,
    user,
    data,
    navigation,
    titleStyle,
    nolikes,
    onLike,
    laughed,
    onUnlike,
    nodis,
    inArray,
    nolaugh,
    type,
    pimg,
    nosad,
    captionStyle,
    lie,
    ImageComponent,
    ...attributes
  } = props;

  const {
    width = Dimensions.get('window').width,
    height = width * 0.7
  } = props;
  const trLocale = require('moment/locale/ar');
function dele(){
  firebaseApp.database().ref('Posts/' + data.postuid).on('value', function(snapshot) {
snapshot.ref.remove();
})
if (show) {
  navigation.goBack()
}
}
  const timeString = moment().locale('ar',trLocale).fromNow();
  const [clicked, setclick] = useState(false)


      useEffect(() => {
         // Update the document title using the browser API
       });
  const sharesocial= async () => {
    setclick(false)

     try {
       const result = await Shared.share({
         message: `
        ${data.type}  ${data.user}
      لمشاهدة الرد حمل التطبيق على الاندرويد
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
   }
   const imgsafe= async () => {
     const { status } = 'await Permissions.askAsync(Permissions.CAMERA_ROLL);'
          if (status !== 'granted') {

alert('الرجاء السماح للوصول للصور لحفظ المنشور')          }else {
  try {

    let result = ''
    let saveResult = ''
    console.log(saveResult);
    Alert.alert(
    'تم حفظ المنشور في معرض الصور',
    'يمكنك ارسال الصورة لاصدقائك او مشاركة عبر التواصل الاجتماعي',
    [
      {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
      {text: 'مشاركة عبر التواصل', onPress: sharesocial},
    ],
    { cancelable: false }
  )
    setclick(false)

  }
  catch(snapshotError) {
    console.error(snapshotError);
  }
}
     setclick(false)

    }
    const styles = StyleSheet.create({
    head:{
      flex:1,
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 9,
      position: 'absolute',
      marginBottom: 5,
      bottom: -10
    },
    profile:{
      flex:8,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    edit:{
      flex:2,
alignItems: 'center',justifyContent: 'center'
    },
    edits:{
      flex:2,

      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    pimg:{
      flex:2,


    },
    footericon:{
      flex:8,

      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    iconname:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',

      alignItems: 'center'
    },
    likesname:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-start',

      alignItems: 'center'
    },
    names:{
      flex:8,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
padding: 10,
      flexDirection: 'column'
    },
    body:{

      flex:1,

    },
    likes:{
      color:'#800020',
      marginHorizontal: 10
    },
    comment:{
      color:'black',
        marginHorizontal: 10
    },
    name:{
      fontFamily: 'Cairo-Regular',
      marginVertical: 2
    },
    time:{
      fontFamily: 'Cairo-Regular',
      fontSize: 12
    },
    image:{
      width: width-50,
      minHeight:  150,
      alignSelf: 'center',
      resizeMode: 'cover',

      borderRadius: 9,

    }
    });



  return (
    <View
      style={{
        width: width-50 ,
        backgroundColor:'#fff',

        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 0
        },
        //android
        elevation: 5,
        flex: 1,
        marginVertical: 10,
        paddingBottom: 30,

alignSelf: 'center',
        marginHorizontal: 10,
        borderRadius: 9
      }}

    >
    <View style={styles.body}>

{image&&image.length>0?<Image style={styles.image} source={{uri:image}}/>:null}
    </View>
      <View style={styles.head}>
<View style={styles.profile}>
<View style={styles.pimg}>
  <Thumbnail small square borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={pimg} />
  </View>
<View style={styles.names}>
<Text style={styles.name}>{name}</Text>
<Text style={[styles.time,{fontFamily: 'Cairo-Regular'}]}>{type}</Text>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<FontAwesome name='map-marker' size={15} style={{marginRight: 5}} color="green"/>

<Text style={styles.time}  numberOfLines={1}>Irbid ,30 streets</Text>

</View>

</View>
</View>
<View style={styles.edit}>
<Button bordered style={{borderColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 10}}>
<Text style={[styles.time,{color:'#eb144c'}]}>View</Text>
</Button>
</View>
      </View>



    </View>
  );
function  _renderTruncatedFooter(handlePress) {
    return (
      <Text style={{ color: 'white', marginTop: 5,fontFamily: 'Cairo-Bold'}} onPress={handlePress}>
        اقرا اكثر..
      </Text>
    );
  };
function  _renderRevealedFooter (handlePress){
    return (
      <Text style={{ color: 'white', marginTop: 5,fontFamily: 'Cairo-Bold' }} onPress={handlePress}>
      اقرأ اقل..
      </Text>
    );
  };
};

BCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  caption: PropTypes.node,
  imageSrc: Image.propTypes.source,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  iconContainerStyle: ViewPropTypes.style,
  imageContainerStyle: ViewPropTypes.style,
  overlayContainerStyle: ViewPropTypes.style,
  titleStyle: NativeText.propTypes.style,
  captionStyle: NativeText.propTypes.style,
  width: PropTypes.number,
  height: PropTypes.number,
  ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

BCard.defaultProps = {
  ImageComponent: BackgroundImage
};

export default BCard;
