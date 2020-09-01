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
import { Thumbnail } from 'native-base';
import { colors, gStyle, images } from '../constants';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';

import Text from './text/Text';
import Icon from './icons/Icon';

const Door = props => {
  const {
    title,
    icon,
    caption,
    imageSrc,
    datas,
    name,
    onPress,
    color,
    price,
    theme,
    containerStyle,
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
    height = width * 0.5
  } = props;

const imgsource=color=='#800020'?require('../assets/red.png'):color=='steelblue'?require('../assets/steelblue.png'):color=='yellow'?require('../assets/yellow.png'):color=='purple'?require('../assets/Purble.png'):color=='black'?require('../assets/black.png'):require('../assets/logo.png')
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
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
alignSelf: 'center',
      flex:1,height

      }}
onPress={onPress}
    >
    <Image
      source={imgsource}
      style={{
        resizeMode: 'center',
        width:200 ,
        height:200,
        borderRadius: width/2,
        alignSelf: 'center'

      }}
    />

    </TouchableOpacity>
  );
};

Door.propTypes = {
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

Door.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Door;
