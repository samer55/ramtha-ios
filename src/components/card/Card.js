import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, Image, StyleSheet } from 'react-native';

import normalize from '../helpers/normalizeText';
import { BackgroundImage, fonts, TextPropTypes, ViewPropTypes, withTheme } from '../config';

import Text from '../text/Text';
import Divider from '../divider/Divider';

const Card = props => {
  const {
    children,
    containerStyle,
    wrapperStyle,
    imageWrapperStyle,
    title,
    titleStyle,
    titleNumberOfLines,
    FeaturedTitle,
    FeaturedTitleStyle,
    FeaturedSubtitle,
    FeaturedSubtitleStyle,
    dividerStyle,
    image,
    imageStyle,
    imageProps,
    theme,
    ...attributes
  } = props;

  return (
    <View >
    </View>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: TextPropTypes.style,
  FeaturedTitle: PropTypes.string,
  FeaturedTitleStyle: TextPropTypes.style,
  FeaturedSubtitle: PropTypes.string,
  FeaturedSubtitleStyle: TextPropTypes.style,
  dividerStyle: ViewPropTypes.style,
  image: Image.propTypes.source,
  imageStyle: ViewPropTypes.style,
  imageWrapperStyle: ViewPropTypes.style,
  imageProps: PropTypes.object,
  titleNumberOfLines: PropTypes.number,
  theme: PropTypes.object,
};

const styles = {
  container: theme => ({
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    borderColor: theme.colors.grey5,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  }),
  FeaturedTitle: {
    fontSize: normalize(18),
    marginBottom: 8,
    color: 'white',
    ...fonts.bold,
    // ...Platform.select({
    //   android: {
    //     ...fonts.android.black,
    //   },
    //   default: {
    //     fontWeight: '800',
    //   },
    // }),
  },
  FeaturedSubtitle: {
    fontSize: normalize(13),
    marginBottom: 8,
    color: 'white',
    ...fonts.bold,
    // fontFamily: fontFamily.fontBold,
    // ...Platform.select({
    //   android: {
    //     ...fonts.android.black,
    //   },
    //   default: {
    //     fontWeight: '400',
    //   },
    // }),
  },
  wrapper: {
    backgroundColor: 'transparent',
  },
  divider: {
    marginBottom: 15,
  },
  cardTitle: theme => ({
    fontSize: normalize(14),
    color: theme.colors.grey1,
    ...fonts.bold,
    // fontFamily: fontFamily.fontBold,
    // ...Platform.select({
    //   android: {
    //     ...fonts.android.black,
    //   },
    //   default: {
    //     fontWeight: 'bold',
    //   },
    // }),
    textAlign: 'center',
    marginBottom: 15,
  }),
  imageCardTitle: {
    marginTop: 15,
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export { Card };
export default withTheme(Card, 'Card');
