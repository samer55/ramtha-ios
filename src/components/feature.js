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
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import Text from './text/Text';

const Feature = props => {
  const {
    title,
    icon,
    caption,
    imageSrc,
    theme,
    datas,
    details,
    containerStyle,
    data,
    onPress,
    imageContainerStyle,
    overlayContainerStyle,
    iconContainerStyle,
    titleStyle,
    first,
    second,
    captionStyle,
    ImageComponent,
    ...attributes
  } = props;

  const {
    width = Dimensions.get('window').width,
    height = width * 0.25
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
const firstcolor =first =='#800020'?'احمر':first =='steelblue'?'ازرق':first =='yellow'?'اصفر':'اسود'
const secondcolor =second =='#800020'?'احمر':second =='steelblue'?'ازرق':second =='yellow'?'اصفر':'اسود'

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        width: width-10 ,

        backgroundColor:
          theme !== 'light' ? colors.darkColor : colors.whitesmoke,
        
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
          height: 0,
          width: 0
        },
        //android
        elevation: 1,
        flex: 1,
        marginVertical: 5,
        paddingVertical: 10

      }}
      onPress={onPress}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 ,flexDirection: 'column'}}>
        <MaterialCommunityIcons name={data.firstLock&data.secondlock ?'door':'door-open'} size={50} color={data.firstLock&data.secondlock ?'#800020':gStyle.text[theme].color} />
        <Text style={[gStyle.det, gStyle.text[theme],{alignSelf: 'center'}]}>{data.firstLock&data.secondlock ?'مغلق':'مفتوح'}</Text>

      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginVertical: 5,paddingHorizontal: 10
        }}
      >
        <Text numberOfLines={1} style={[gStyle.Title, gStyle.text[theme],{alignSelf:'flex-end',marginVertical: 0}]}>{title}</Text>
        <Text style={[gStyle.det, gStyle.text[theme],{marginBottom: 5}]}>المرسل: @{details} </Text>
      </View>
    </TouchableOpacity>
  );
};

Feature.propTypes = {
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

Feature.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Feature;
