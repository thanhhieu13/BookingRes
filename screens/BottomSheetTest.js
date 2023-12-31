import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import { defaultStyles } from '../constants/Styles';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 200;



const BottomSheetTest = () => { 
  const navigation = useNavigation();

  // const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollRef = useAnimatedRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={22} color={'#ffffff'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#ffffff'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT /2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);


  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>
        <Animated.Image
          source={{ uri: "https://pasgo.vn/Upload/anh-chi-tiet/slide-isushi-1-normal-2281058760960.webp" }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>nha hang</Text>
          <Text style={styles.location}>
           nha hang
          </Text>
          <Text style={styles.rooms}>
           nha hang
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
             nha hang
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ab porro, exercitationem excepturi praesentium nulla quasi repellat doloremque! Beatae aliquid neque eaque numquam, veniam nobis provident. Magni distinctio consequuntur placeat!
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: "https://pasgo.vn/Upload/anh-chi-tiet/slide-isushi-1-normal-2281058760960.webp" }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by </Text>
              <Text>Host since</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>hello</Text>
          <Text style={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga reiciendis doloremque totam eos, amet facilis voluptate magni fugit, ut consequuntur eius quis quibusdam soluta sit? Nostrum dolorem omnis nam necessitatibus.
          </Text>
          <Text style={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga reiciendis doloremque totam eos, amet facilis voluptate magni fugit, ut consequuntur eius quis quibusdam soluta sit? Nostrum dolorem omnis nam necessitatibus.
          </Text>
          <Text style={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga reiciendis doloremque totam eos, amet facilis voluptate magni fugit, ut consequuntur eius quis quibusdam soluta sit? Nostrum dolorem omnis nam necessitatibus.
          </Text>
          <Text style={styles.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga reiciendis doloremque totam eos, amet facilis voluptate magni fugit, ut consequuntur eius quis quibusdam soluta sit? Nostrum dolorem omnis nam necessitatibus.
          </Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€222</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',

  },
  location: {
    fontSize: 18,
    marginTop: 10,

  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,

  },
  ratings: {
    fontSize: 16,

  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,

  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#000',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: 'red',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,

  },
});

export default BottomSheetTest;
