import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

function DetailScreen(props) {
  const { image, user, tags } = props;

  return (
    <View style={style.container}>
      <Image source={{ uri: image.largeImageURL }} style={style.image} />
      <Text>User: {user}</Text>
      <Text>Tags: {tags}</Text>
    </View>
  );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        height: 600
    },
    image: {
      width: '100%',
      color: "#000",
      height: 500
   }
})


export default DetailScreen;