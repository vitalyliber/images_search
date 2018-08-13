import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const black = '#000000';
const white = 'white';
const whiteBackground = 'rgba(255, 255, 255, 0.6)';

const styles = StyleSheet.create({
  container: {
    backgroundColor: black,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    zIndex: 10,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageText: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    backgroundColor: whiteBackground,
    height: 160,
  },
  imageTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  contextLink: {
    backgroundColor: black,
    maxWidth: 150,
    padding: 10,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  contextLinkText: {
    color: white,
  },
});

export default class ImagePreview extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    const image = navigation.getParam('image', {});

    return (
      <View style={styles.container}>
        { loading
        && <ActivityIndicator size="large" color="#707070" style={styles.loading} />
        }
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height}
          maxScale={2}
          minScale={1}
        >
          <Image
            style={styles.image}
            source={{ uri: image.link }}
            resizeMode="contain"
            onLoadStart={() => this.setState({ loading: true })}
            onLoadEnd={() => this.setState({ loading: false })}
          />
        </ImageZoom>

        <View
          style={styles.imageText}
        >
          <Text style={styles.imageTitle} numberOfLines={1}>
            {image.title}
          </Text>
          <Text numberOfLines={1}>
            {image.snippet}
          </Text>
          <TouchableOpacity
            style={styles.contextLink}
            onPress={() => Linking.openURL(image.image.contextLink)}
          >
            <Text numberOfLines={1} style={styles.contextLinkText}>
              {image.displayLink}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
