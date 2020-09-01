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

import Text from './text/Text';

const Membership = props => {
  const {
    title,
    icon,
    price,
    caption,
    imageSrc,
    theme,
    onPress,
    datas,
    details,
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
    <View
      style={{
        width: width - 90,
        backgroundColor:
          theme !== 'light' ? colors.darkColor : colors.whitesmoke,
        height,
        shadowColor: '#000',
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
        marginLeft: 20,
        padding: 5
      }}
    >
      <View
        style={{
          flex: 1,

          alignItems: 'flex-start'
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[gStyle.Title, gStyle.text[theme]]}>{title}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[gStyle.p, { marginVertical: 0 }, gStyle.text[theme]]}
            numberOfLines={2}
          >{`${details}`}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <Text
              style={[
                gStyle.Title,
                { fontSize: 17, marginVertical: 0 },
                gStyle.text[theme]
              ]}
            >
              {price}
            </Text>
          </View>
          <Button
            bordered
            style={{
              padding: 15,
              alignSelf: 'flex-start',
              marginRight: 5,
              borderColor: colors.grey
            }}
            onPress={onPress}
          >
            <Text style={gStyle.text[theme]}>Get it</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

Membership.propTypes = {
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

Membership.defaultProps = {
  ImageComponent: BackgroundImage
};

export default Membership;
