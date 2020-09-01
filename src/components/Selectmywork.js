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
import { Button } from 'native-base';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import { Ionicons } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Text from './text/Text';

const Selectmywork = props => {
  const {
    title,
    titlea,
    icon,
    price,
    caption,
    Title,
    imageSrc,
    det,
    theme,
    onPress,
    datas,
    op,
    details,
    containerStyle,
    color,
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
    height = Dimensions.get('window').height
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
    <ImageBackground

        source={{uri:imageSrc}}
        style={{
          resizeMode: 'contain',
          width: width-10,marginVertical: 10,
        flex:1,

        alignSelf: 'center',
height: 150


        }}
      >
      <LinearGradient
               colors={color}
               style={{ padding: 40, alignItems: 'center', borderRadius: 5,width:width-10,height: 150}}>
               <TouchableOpacity onPress={op}>
               <Text
                 style={{
                   backgroundColor: 'transparent',
                   fontSize: 24,
                   color: '#fff',
                   fontWeight: '500',
                   alignSelf: 'center',textAlign: 'center',
                   fontFamily: 'Cairo-Regular'
                 }}>
                 {titlea}
               </Text>
               <Text
                 style={{
                   backgroundColor: 'transparent',
                   fontSize: 13,
                   color: '#fff',
                   fontWeight: '500',
                   marginTop: 10,
                   alignSelf: 'center',textAlign: 'center',
                   fontFamily: 'Cairo-Regular'
                 }}>
                 {det}
               </Text>
               </TouchableOpacity>
             </LinearGradient>
      </ImageBackground>
  );
};

Selectmywork.propTypes = {
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

Selectmywork.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Selectmywork;
