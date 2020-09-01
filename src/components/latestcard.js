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
import { Button ,Thumbnail,Icon} from 'native-base';
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

const LCard = props => {
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
    cats,
    theme,
    incs,
    onPresss,
    laugh,
    uids,
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
       const accept=  () => {
         firebaseApp.database().ref(`Ads/${uids}`).update({accept:data.accept?false:true})

        }
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

      backgroundColor: 'white',

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
padding: 19,
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
    <TouchableOpacity
    onPress={()=>navigation.navigate('Productpage',{uid:uids})}
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
        marginHorizontal: 10,
        borderRadius: 2
      }}

    >

      <View style={styles.head}>
<View style={styles.profile}>
<View style={styles.pimg}>
  <Thumbnail  square  style={{flex:1}} source={{uri:image?image[0]:'https://edgepharm.com/wp-content/uploads/2020/01/image-placeholder.jpg'}} />
  </View>
<View style={styles.names}>
<Text style={styles.name}>{name}</Text>
<Text style={[styles.time,{fontFamily: 'Cairo-Regular'}]}>{type}</Text>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>

<Text style={[styles.time,{color: '#800020'}]}  numberOfLines={1}>{price}</Text>

</View>

</View>
</View>
<View style={styles.edit}>
{cats=='fav'?
<Icon active name="heart" style={{color: '#800020'}}/>

:<Button
onPress={cats=='Special'?accept:cats=='myads'?()=>navigation.navigate('Editads',{data:data}):()=>navigation.navigate('Productpages',{uid:uids})}
 bordered style={{borderColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 10}}>
<Text style={[styles.time,{color:'#eb144c'}]}>{cats=='ads'?'عرض':cats=='Special'?data.accept?'الغاء تمييز':'تمييز':'تعديل'}</Text>
</Button>}
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

LCard.propTypes = {
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

LCard.defaultProps = {
  ImageComponent: BackgroundImage
};

export default LCard;
