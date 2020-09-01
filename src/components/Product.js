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

const Product = props => {
  const {
    title,
    icon,
    caption,
    imageSrc,
    onPresss,
    data,
    datas,
    name,
    onPress,
    price,
    theme,
    containerStyle,
    imageContainerStyle,
    overlayContainerStyle,
    iconContainerStyle,
    titleStyle,
    store,
    navigation,
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
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 150,
        flexDirection: 'column'
      }}
    onPress={()=>navigation.navigate('Productpages',{uid:data.postuid})}
    >
      <Thumbnail
        large
        square
        style={{ marginHorizontal: 5, marginVertical: 10, borderRadius: 9 }}
        source={{
          uri: imageSrc?imageSrc[0]:"https://i.ibb.co/VtfQWmF/placeholder-image-300x207.png"
        }}
      />
      <Text
        style={[
          {
            fontFamily: 'Cairo-Regular',
            fontSize: 13,

            marginVertical: 3
          },
          gStyle.text[theme]
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text
      numberOfLines={1}
        style={[
          {
            fontFamily: 'Cairo-Regular',
            fontSize: 13,

            marginVertical: 3
          },
          gStyle.text[theme]
        ]}
      >
          {store}
      </Text>
      <Text
      numberOfLines={1}
        style={[
          {
            fontFamily: 'raleway',
            fontSize: 13,
color:'#eb144c',
            marginVertical: 3
          },
          gStyle.text[theme]
        ]}
      >
        {price}
      </Text>
    </TouchableOpacity>
  );
};

Product.propTypes = {
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

Product.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Product;
