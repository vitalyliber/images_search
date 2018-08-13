import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from "react-redux";
import { getImages } from "../actions/images";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4EBEC',
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  homeTitle: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    width: '100%',
    backgroundColor: '#FAF6F5',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  columns2: {
    flex: 0.5,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  columns3: {
    flex: 0.33,
    margin: 5,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  columns4: {
    flex: 0.5,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  imagesBlock: {
    flex: 1,
    paddingHorizontal: 10,
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    height: 100,
    width: '100%',
  },
  imageTitle: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  }
});

@connect(
  ({ images, isLoading }) => ({ images, isLoading }),
  { getImages },
)

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      text: props.images.keyword,
      typingTimeout: 0,
      grid: 2,
    };
  }

  onSearch = (text) => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      text: text,
      typingTimeout: setTimeout(() => {
        this.props.getImages(text)
      }, 1500)
    })
  };

  render() {
    const { images: { images, isLoading } } = this.props;
    const { grid } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.homeTitle} >Image search</Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => this.onSearch(text)}
          value={this.state.text}
          clearButtonMode="always"
          placeholder="Search"
          underlineColorAndroid="transparent"
        />

        <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <TouchableOpacity
            style={{ backgroundColor: grid === 2 ? 'white' : '#FAF6F5', alignItems: 'center', width: '33.33%', borderColor: '#F4EBEC', borderRightWidth: 1, padding: 10}}
            onPress={() => this.setState({ grid: 2})}
          >
            <Text>2 per row</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: grid === 3 ? 'white' : '#FAF6F5', alignItems: 'center', width: '33.34%', borderColor: '#F4EBEC', borderRightWidth: 1, padding: 10}}
            onPress={() => this.setState({ grid: 3})}
          >
            <Text>3 per row</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: grid === 4 ? 'white' : '#FAF6F5', alignItems: 'center', width: '33.33%', padding: 10}}
            onPress={() => this.setState({ grid: 4})}
          >
            <Text>4 per row</Text>
          </TouchableOpacity>
        </View>

        { isLoading ? (
          <ActivityIndicator size="large" color="#707070" style={{ marginTop: 20 }}/>
        ) : (
          <FlatList
            style={styles.imagesBlock}
            data={images.concat([{}, {}])}
            numColumns={grid}
            key = {grid}
            keyExtractor={(item) => item.link}
            renderItem={({item}) =>
              <View style={styles[`columns${grid}`]}>
                {item.image &&
                  <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => this.props.navigation.navigate('ImagePreview', {image: item})}
                  >
                    <Image
                      style={{height: '100%'}}
                      source={{uri: item.image.thumbnailLink}}
                      resizeMode="cover"
                    />
                    <View
                      style={styles.imageTitle}
                    >
                      <Text numberOfLines={1}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>
            }
          />
        )}
      </View>
    );
  }
};
