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

import { ViewPropTypes, BackgroundImage, withTheme } from './config';

import Text from './text/Text';
import Icon from './icons/Icon';

const Carousel = props => {
  const {
    title,
    icon,
    caption,
    imageSrc,
    user,
    onPress,
    datas,
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
    <TouchableOpacity onPress={onPress} style={{flex:1,alignItems: 'center',marginHorizontal: 5,width: 100}}>
<View style={{borderRadius: 100/2,borderWidth: 0.5,borderColor: '#eb144c',padding: 5,justifyContent: 'center',alignItems: 'center'}}>
    <Image
      source={imageSrc}

      style={{
        width: 70,
  height: 70,
  alignSelf: 'center',
  overflow: "hidden",

      }}
    />
    </View>
    <Text style={[gStyle.text[theme],{fontFamily: 'Cairo-Regular',alignSelf: 'center',textAlign: 'center'}]}>{title}</Text>

  {user&&user.length>0?  <Text style={[gStyle.text[theme],{fontFamily: 'Cairo-Regular',textAlign: 'center'}]}>{user}</Text>:null}



    </TouchableOpacity>
  );
};

Carousel.propTypes = {
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

Carousel.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Carousel;
