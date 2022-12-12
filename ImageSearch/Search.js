import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { searchImages } from './actions';
import { useNavigation } from '@react-navigation/native';
import DetailScreen from './DetailScreen';

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [numColumns, setNumColumns] = useState(2);
  const [flatListKey, setFlatListKey] = useState(1);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  const onChangeText = (text) => {
    setQuery(text);
  };

  const onSubmit = () => {
    props.dispatch(searchImages(query, page));
  };

  const setSelectedImage = (selected) => {
    const navigation = useNavigation();

        navigation.navigate('Detail', {
                  image: selected,
                  user: selected.user,
                  tags: selected.tags.split(','),
                  resolution: `${selected.imageWidth} x ${selected.imageHeight}`
                })
  };

  const onLayout = (event) => {
      const { width, height } = event.nativeEvent.layout;
      if (width > height) {
        setNumColumns(4);
        setFlatListKey(2);
      } else {
        setNumColumns(2);
        setFlatListKey(1);
      }
  };

   useEffect(() => {
      onSubmit()
    }, [page]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelected(item)}>
      <Image
         key={item.id}
         source={{ uri: item.webformatURL }}
         style={{ width: 200, height: 200 }}
      />
    </TouchableOpacity>
  );

  if (selected != null) {
    return (
      <TouchableOpacity onPress={() => setSelected(null)}>
        <DetailScreen image={selected} user={selected.user} tags={selected.tags}/>
      </TouchableOpacity>
    )
  }

  return (

    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder="Enter search query"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <FlatList
            data={props.images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            onLayout={onLayout}
            key={flatListKey}
      />
    </View>
  );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginTop: 50,
        paddingBottom: 40,
        marginLeft: 10,
        marginRight: 10
    },
    input: {
      fontSize: 12,
      color: "#000",
      height: 30,
      borderStartWidth : 1,
      borderEndWidth : 1,
      borderTopWidth : 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth : 1,
      marginBottom: 2
   }
})

const mapStateToProps = (state) => {
  return {
    images: state.images,
  };
};

export default connect(mapStateToProps)(Search);