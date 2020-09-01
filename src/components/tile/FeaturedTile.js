import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text as NativeText,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

import { ViewPropTypes, BackgroundImage, withTheme } from '../config';
import { renderNode } from '../helpers';
import { gStyle } from '../../constants';

import Text from '../text/Text';
import Icon from '../icons/Icon';

const renderText = (content, defaultProps, style) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style])
  });

const FeaturedTile = props => {
  const {
    title,
    icon,
    caption,
    imageSrc,
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
    width = Dimensions.get('window').width - 35,
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
      backgroundColor: 'rgba(0,0,0,0.3)',
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
      fontWeight: '700',
      textAlign: 'center',
      fontFamily: 'Cairo-Regular'
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    }
  });

  return (
    <TouchableOpacity
      {...attributes}
      style={StyleSheet.flatten([
        styles.container,
        containerStyle && containerStyle
      ])}
    >
      <ImageComponent
        source={imageSrc}
        style={StyleSheet.flatten([
          styles.imageContainer,
          imageContainerStyle && imageContainerStyle
        ])}
        resizeMode="cover"
      >
        <View
          style={StyleSheet.flatten([
            styles.overlayContainer,
            overlayContainerStyle && overlayContainerStyle
          ])}
        >
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              iconContainerStyle && iconContainerStyle
            ])}
          >
            {icon && <Icon {...icon} />}
          </View>
          <Text
            testID="FeaturedTileTitle"
            style={StyleSheet.flatten([
              styles.text,
              titleStyle && titleStyle,
              gStyle.Title,{alignSelf:'center'
            }
            ])}
          >
            {title}
          </Text>
          {renderText(
            caption,
            { style: captionStyle },
            styles.text,
            gStyle.det
          )}
        </View>
      </ImageComponent>
    </TouchableOpacity>
  );
};

FeaturedTile.propTypes = {
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

FeaturedTile.defaultProps = {
  ImageComponent: BackgroundImage
};

export { FeaturedTile };
export default withTheme(FeaturedTile, 'FeaturedTile');
