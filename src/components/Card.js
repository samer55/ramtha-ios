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
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebaseApp } from '../../firebase'
import moment from 'moment';
// components
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  Feather  from 'react-native-vector-icons/Feather';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import  AntDesign  from 'react-native-vector-icons/AntDesign';

import Hyperlink from 'react-native-hyperlink';

import Text from './text/Text';

const Card = props => {
  const {
    title,
    icon,
    price,
    time,
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

    const styles = StyleSheet.create({
    head:{
      flex:1,
      flexDirection: 'row',
    },
    profile:{
      flex:9,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    edit:{
      flex:1,

      justifyContent: 'center',
      alignItems: 'center'
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
      paddingVertical: 20,
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
      fontFamily: 'Cairo-Bold',
      marginVertical: 2
    },
    time:{
      fontFamily: 'Cairo-Regular',
      fontSize: 12
    },
    image:{
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      flex:1,
      borderRadius: 12,
      marginTop: 10
    }
    });



  return (
    <View
      style={{
        width: width-20 ,
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
        marginVertical: 5,

alignSelf: 'center',
        padding: 20,
        borderRadius: 9
      }}

    >
      <View style={styles.head}>
<View style={styles.profile}>

<TouchableOpacity onPress={()=>navigation.navigate('Userprofile')} style={styles.names}>
<Text style={styles.name}>{name}</Text>
<Text style={styles.time}>{time}</Text>

</TouchableOpacity>
</View>

      </View>

      <View style={styles.body}>
      <View style={{flex:1}}>
      <Hyperlink linkDefault={true} linkStyle={{ color: '#800020', fontSize: 20 }}>

<Text styles={{fontSize:21,fontWeight:'500',fontFamily:'Cairo-Bold'}}>{body}</Text>
</Hyperlink>
</View>
{image&&image.length>0?<Image style={styles.image} source={{uri:image}}/>:null}
      </View>
      <View style={styles.head}>
      {/*footer here*/}



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

Card.propTypes = {
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

Card.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Card;
