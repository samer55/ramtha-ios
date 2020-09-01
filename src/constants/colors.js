// colors
// /////////////////////////////////////////////////////////////////////////////
const darkColor = '#141d26';
const darkHighlightColor = '#3a3a3a';
const grey = '#d0ccd0';
const white20 = 'rgba(255, 255, 255, 0.1)';

export default {
  black: '#000000',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  white20,

  darkColor,
  darkHighlightColor,
  grey,

  activeTintColor: {
    light:darkColor,
    dark: grey
  },
  inactiveTintColor: {
    light: grey,
    dark: white20
  }
};
