import React from 'react';
import { ScrollView, Text, View,Image,Dimensions } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import ProductDet from '../components/ProductDet';

// components
import NavigationBack from '../components/NavigationBack';

const Product = () => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={gStyle.contentContainer}
      style={gStyle.container[theme]}
    >
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
    <Image
      source={{ uri: "https://images-na.ssl-images-amazon.com/images/I/81aOyorH4AL._AC_SX425_.jpg" }}
      style={{
        resizeMode: 'contain',

      width:Dimensions.get('window').width,height: Dimensions.get('window').width,marginHorizontal: 5,alignSelf: 'center'
      }}
    />
    </View>
    <ProductDet
      theme={theme}
      icon="ios-wifi"
      title="Whey Protien"
        onPress={() => navigation.navigate('MultiStack')}
      price="50$"
      details='          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis Theme natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Aenean imperdiet.
'
    />
    </ScrollView>
  );
};

Product.navigationOptions = ({ navigation }) => ({
  headerLeft: <NavigationBack navigation={navigation} />,
  headerRight: <View style={{ flex: 1 }} />,
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Product Screen'
});

export default Product;
