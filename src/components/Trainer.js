import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  TouchableOpacity,
  Text as NativeText,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { colors, gStyle, images } from '../constants';
import { Button ,Thumbnail} from 'native-base';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import { Ionicons } from 'react-native-vector-icons';

import Text from './text/Text';

const Trainer = props => {
  const {
    title,
    icon,
    caption,
    imageSrc,
    theme,
    datas,
    details,
    containerStyle,
    onPress,
    name,
    imageContainerStyle,
    overlayContainerStyle,
    iconContainerStyle,
    titleStyle,
    captionStyle,
    ImageComponent,
    ...attributes
  } = props;

  const {
    width = Dimensions.get('window').width,
    height = width * 0.4
  } = props;

  const styles = StyleSheet.create({
    container: {
      width,
      height
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      width,
      height
    },
    overlayContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 45,
      paddingBottom: 40,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    text: {
      color: '#ffffff',
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 15,
      textAlign: 'center'
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    }
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        width: width - 24,
        backgroundColor:
          theme !== 'light' ? colors.darkColor : colors.whitesmoke,
        height,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        },
        //android
        elevation: 1,
        flex: 1,
        marginVertical: 10,

      }}
    >
      <Image
        source={ imageSrc }
        style={{
          resizeMode: 'contain',
          flex:1,
          borderRadius:16,
width: '100%',
marginHorizontal: 5,
height: 150

        }}
      />

      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5
        }}
      >
        <Text style={[gStyle.det, gStyle.text[theme],{marginVertical: 3,textAlign: 'left'}]}>{title}</Text>
        <Text style={[gStyle.det, gStyle.text[theme],{marginVertical: 0,textAlign: 'left'}]}>{name}</Text>
<Button onPress={onPress} bordered style={{borderColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 15,marginVertical: 10}}>
<Text style={{color:'#eb144c',fontFamily: 'raleway'}}>تعديل الملف الشخصي</Text>
</Button>
      </View>
    </View>
  );
};

Trainer.propTypes = {
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

Trainer.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Trainer;
