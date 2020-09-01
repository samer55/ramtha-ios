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
import { FontAwesome } from 'react-native-vector-icons';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import { AntDesign } from 'react-native-vector-icons';

import Hyperlink from 'react-native-hyperlink';

import Text from './text/Text';

const SlCard = props => {
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
    type,
    onthird,
    theme,
    incs,
    onPresss,
    laugh,
    sad,
    by,
    firstno,
    secondno,
    image,
    navPress,
    thirdno,
    dis,
    onPress,challenge,
    datas,
    details,
    containerStyle,
    imageContainerStyle,
    overlayContainerStyle,
    cat,
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
      flex:2,
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'row',

      shadowColor: '#000',
      shadowOpacity: 0.4,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 0
      },
    position: 'absolute',
      //android
      elevation: 5,
bottom: 0,
      backgroundColor: 'white',
      borderRadius: 10
    },
    profile:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    edit:{
      flex:2,

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
      fontFamily: 'Cairo-Regular',
      marginVertical: 2
    },
    time:{
      fontFamily: 'Cairo-Regular',
      fontSize: 12,
      color:by?'black':'green',
      marginHorizontal: 2
    },
    times:{
      fontFamily: 'Cairo-Regular',
      fontSize: 12,
      color:'black',
      marginHorizontal: 2
    },
    type:{
      fontFamily: 'raleway',
      fontSize: 12,
      color:'#eb144c'
    },
    cat:{
      fontFamily: 'Cairo-Regular',
      fontSize: 12,
      marginLeft: 5,
      color:'#000000'
    },
    image:{
      width: '100%',
        height: '100%',
      resizeMode: 'cover',
      flex:1,
      borderRadius: 15,

    }
    });



  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get('window').width * 0.45,
        height: width/2,
      margin: 5,
        borderColor: "lightgray",
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={()=>navigation.navigate('Productpage',{uid:data.postuid})}
    >
    {data.img&&data.img.length>0?<Image style={styles.image} source={{uri:data.img[0]}}/>:<Image style={styles.image} source={{uri:"https://i.ibb.co/VtfQWmF/placeholder-image-300x207.png"}}/>}
      <View style={styles.head}>
<View style={[styles.profile,{padding: 5}]}>

<Text style={styles.name} >{name}</Text>

</View>

      </View>



    </TouchableOpacity>
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

SlCard.propTypes = {
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

SlCard.defaultProps = {
  ImageComponent: BackgroundImage
};

export default SlCard;
