import colors from './colors';
import fonts from './fonts';
import { Image, Text, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity } from 'react-native';

// utility styles
// /////////////////////////////////////////////////////////////////////////////
export default {
  activeOpacity: 0.7,

  // containers
  // ///////////////////////////////////////////////////////////////////////////
  container: {
    dark: {
      backgroundColor: colors.darkHighlightColor,
      flex: 1
    },
    light: {
      backgroundColor: colors.white20,
      flex: 1
    }
  },
  containersssss: {
    dark: {
      backgroundColor: colors.darkHighlightColor,
      flex: 1
    },
    light: {
      backgroundColor: colors.whitesmoke,
      flex: 1
    }
  },
  backgroundc: {
    dark: {
      backgroundColor: colors.darkHighlightColor,

    },
    light: {
      backgroundColor: colors.whitesmoke,

    }
  },
  promoContainer: {
        flex:1,


        bottom: 0,
        paddingBottom: 10,
        paddingTop: 10
    },
    promoPrice: {
        fontSize: 20,
    },
    promoReveal: {
        padding: Dimensions.get('window').height * (.2/10),
        textAlign: 'center',
        backgroundColor: '#159588',
        color: '#fff',
        width: Dimensions.get('window').width * .9,
        marginRight: Dimensions.get('window').width * .05,
        marginLeft: Dimensions.get('window').width * .05,
    },
  cards: {
    dark: {
      backgroundColor: colors.darkColor,
      flex: 1
    },
    light: {
      backgroundColor: colors.white,
      flex: 1
    }
  },
  contentContainer: {
    alignItems: 'flex-start',
    paddingTop: 32,
    paddingBottom:20
  },
  contentContainers: {
    alignItems: 'flex-start',

  },
  contentContainerss: {
    alignItems: 'center',
paddingBottom:20,
  },
  Centercont: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom:20
  },
  row: {
    dark: {
      backgroundColor: colors.darkHighlightColor
    },
    light: {
      backgroundColor: colors.white
    }
  },
  // navigation styles
  // ///////////////////////////////////////////////////////////////////////////
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  Title: {
    fontSize: 20,
    fontFamily: 'Cairo-Regular',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 10
  },
  Titleleft: {
    fontSize: 20,
    fontFamily: 'Cairo-Regular',
    alignSelf: 'flex-start',
    marginLeft: 0,
    marginVertical: 10
  },
  det: {
    fontSize: 18,
    fontFamily: 'Cairo-Regular'
  },
  button: {
    fontSize: 15,
    fontFamily: 'Cairo-Regular'
  },
  p: {
    fontSize: 13,
    fontFamily: 'raleway',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 10
  },
  selected: {
    fontSize: 15,
    fontFamily: 'raleway'
  },

  // button
  // ///////////////////////////////////////////////////////////////////////////
  btn: {
    alignItems: 'center',
    backgroundColor: colors.darkColor,
    borderColor: colors.darkColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  btnText: {
    color: colors.white,
    textAlign: 'center'
  },

  // text
  // ///////////////////////////////////////////////////////////////////////////
  text: {
    dark: {
      color: colors.white
    },
    light: {
      color: colors.darkColor
    }
  },
  textPacifico: {
    fontFamily: fonts.pacifico,
    fontSize: 20
  },

  // spacers
  // ///////////////////////////////////////////////////////////////////////////
  spacer16: {
    height: 16,
    width: '100%'
  },
  spacer64: {
    height: 64,
    width: '100%'
  }
};
