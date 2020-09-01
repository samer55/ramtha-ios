import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabBar from "fluidbottomnavigation-rn";
import SvgHome from '../components/icons/Svg.Home';

import { colors } from '../constants';
import { Ionicons } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { MaterialIcons } from 'react-native-vector-icons';


export default class Nava extends Component {

  render() {
    return (
      <View style={styles.container}>
      
        <TabBar
          onPress={tabIndex => {
            // eslint-disable-next-line no-console
            console.log("render component with index: ", tabIndex);
          }}
          tintColor="#800020"
          values={[
            { title: "المزيد", icon: require("./pl.png") },
            { title: "ملف الشخصي", icon: require("./pl.png") },
            { title: "اضف اعلان", icon: require("./pl.png") },
            { title: "العروض", icon: require("./pl.png") },
            { title: "الاقسام", icon: require("./design.png")}
          ]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff"
  }

});
