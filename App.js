import React from 'react';
import { StatusBar, View ,AsyncStorage,StyleSheet,Dimensions,Text,Platform} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Provider } from 'mobx-react';
import appStore from './store/AppStore'

// tab navigator
import TabNavigator from './src/navigation/TabNavigator';
import AppIntroSlider from 'react-native-app-intro-slider';
const ThemeContext = React.createContext(null);
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import { observer,inject } from 'mobx-react'
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    OneSignal.init("2d2cde7a-e181-4deb-81c6-fd84f70992b9", {kOSSettingsKeyAutoPrompt: false,
                                           kOSSettingsKeyInAppLaunchURL: false});
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("ids", this.onIds);
    OneSignal.configure();
    OneSignal.registerForPushNotifications();
    OneSignal.getPermissionSubscriptionState((status) => {
        console.log(status);
    });

    this.state = {
      isLoading: true,
      theme: 'light',
      isLoadingComplete: false,
      fontLoaded: false,
      showRealApp: false,
firstLaunch: null,
      show_Main_App: false
    };

    // is iPad?


    this.updateTheme = this.updateTheme.bind(this);
  }

   onReceived = notification => {
      console.log("Notification received: ", notification);
    };



    onIds = device => {
      console.log("Device info: ", device);
      this.setState({ device });
    };
  componentDidMount() {
    // get system preference

    AsyncStorage.getItem('first_timess').then((value) => {
         this.setState({ show_Main_App: !!value, loading: false });
       });
  }
  on_Done_all_slides = () => {
    AsyncStorage.setItem('first_timess', 'true').then(() => {
      this.setState({ show_Main_App: true });

    });

};
toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };
on_Skip_slides = () => {
  AsyncStorage.setItem('first_times', 'true').then(() => {
      this.setState({ show_Main_App: true });
    });

};
_renderItem = ({ item, dimensions }) => (
  <View
    style={[

      {
        flex: 1,
        paddingTop: item.topSpacer,
        paddingBottom: item.bottomSpacer,
        width: Dimensions.width,
        backgroundColor:item.backgroundColor,
        justifyContent:'center',
        alignItems:'center'
      },
    ]}

  >
    <Ionicons
      style={{ backgroundColor: 'transparent'}}
      name={item.icon}
      size={100}
      color="white"

    />
    <View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>

    </View>
  </View>
);
  updateTheme(themeType) {
    this.setState({
      theme: themeType
    });
  }

  render() {
    const { isLoading, theme } = this.state;
    const iOSStatusType = theme === 'light' ? 'dark-content' : 'light-content';


    console.disableYellowBox = true;

    return (
      <ThemeContext.Provider
             value={{ theme: 'light', toggleTheme: this.toggleTheme }}>

<StatusBar hidden={false} />
<Provider appStore={appStore}>
          <TabNavigator
            screenProps={{
              updateTheme: this.updateTheme
            }}
            theme={'light'}
          />
          </Provider>
       </ThemeContext.Provider>

    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5
  },
  text1: {
    color: '#fff',
    fontSize: 20,
    textAlign:'center',
    alignItems:'center'
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const slides = [
  {
    key: 'k1',
    title: 'Select offer you want to share',
    text: 'There is many offer we have, Select the one you want to share & Earn',
    icon:"md-pricetags",
    titleStyle: styles.title,
    textStyle: styles.text,
    iconStyle: styles.image,
    backgroundColor: '#FF1744',
  },
  {
    key: 'k2',
    title: 'Copy & Share Promo code',
    text: 'Copy promo code for each Promotion and offer it to let people get the offer & you earn',
    icon:'md-qr-scanner'
  ,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#D500F9',
  },
  {
    key: 'k3',
    title: 'They earn & you earn',
    text: 'When they subscribe & use your promo code they earn the offer & you earn Commission',
    icon:'md-cash'
    ,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#2979FF',
  },
  {
    key: 'k4',
    title: 'Transfer when it reach 50$',
    text: 'When you reach 50$ you can ask for transfer money',
    icon:'ios-cash'
    ,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#1DE9B6',
  },
  {
    key: 'k5',
    title: 'Get Ready & Start Earning',
    text: ' ',
    icon:'ios-infinite',
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FF3D00',
  },
];

export default App;
