import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, View ,Text,TouchableOpacity} from 'react-native';
import { Button ,Thumbnail} from 'native-base';
import Product from '../components/Product'
import BCard from '../components/BusinessCard'
import LCard from '../components/latestcard'

import Card from '../components/slidescard'
const ShowScroller = ({ dataset, type ,cats,navPress,navigation}) => {
  const dataArray = Object.values(dataset);

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 4 }}
      data={dataArray}
      horizontal={type=="latest"?false:true}
      renderItem={({ item }) => {
        let renderItem =  <Card type={item.type} name={item.title} image={item.image} cat={item.cat} by={item.by} navigation={navigation}/>;

        if (type=="company") {
          renderItem = (
          <TouchableOpacity onPress={()=>navigation.navigate('BusinessProfile')} style={{flex:1,justifyContent: 'space-around',alignItems: 'center',marginHorizontal: 10}}>
          {item.pimg&&item.pimg.length>0?  <Thumbnail large   source={{uri:item.pimg}} />
:  <Thumbnail large navigation={navigation}  source={{uri:'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-4.png'}} />
}
<Text>{item.name}</Text>
<Text>{item.type}</Text>

          </TouchableOpacity>
          );
        }
      else  if  (cats=="Product") {
            renderItem = (
          <Product navigation={navigation} data={item} name={item.title} imageSrc={item.img} price={item.price} store={item.store} />
        )
        }
      else  if  (type=="local") {
            renderItem = (
          <BCard  navigation={navigation} image={item.image}
            pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}

            show={false}
    name={item.name}
    type={item.type}/>
        )
        }
      else  if  (type=="latest") {
            renderItem = (
          <LCard navigation={navigation}
            pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
 image={item.img}
            show={false}
            data={item}
            uids={item.postuid}
            cats={cats}
    name={item.title}
    price={item.price}
    type={item.typeofservice}/>
        )
        }
return renderItem;

      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

ShowScroller.defaultProps = {
  dataset: 'dumbData',
  type: 'rectangle'
};

ShowScroller.propTypes = {
  // optional
  dataset: PropTypes.string,
  type: PropTypes.string
};

const styles = StyleSheet.create({
  rectangle: {
    height: 131,
    marginRight: 8,
    width: 91
  },
  rectangleImage: {
    height: 131,
    marginRight: 8,
    resizeMode: 'contain',
    width: 91
  },
  round: {
    borderRadius: 48,
    height: 96,
    marginRight: 8,
    width: 96
  },
  roundImage: {
    height: 96,
    marginRight: 8,
    resizeMode: 'contain',
    width: 96
  }
});

export default ShowScroller;
