//import libraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import color from '../../Utils/color';
import categorydata from '../../Constant';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

// create a component
const Categories = ({ activeCategory, setActiveCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {
          categorydata?.map((cat, index) => {
            let isActive = cat.name == activeCategory;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveCategory(cat?.name)}
              >
                <View style={[
                  styles.imageview,
                  isActive && { backgroundColor: color.YELLOW, borderRadius: hp(7) }
                ]}>
                  <Image source={{ uri: cat?.image }}
                    style={[styles.imagesty, isActive && { borderRadius: hp(7) }]}
                  />
                  <Text style={styles.itemtxt}>{cat?.name}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    padding: 10
  },
  imageview: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 120,
    width: 120,
    borderRadius: 70, // Default border radius
    padding: 15,
  },
  imagesty: {
    width: hp(12),
    height: hp(12),
    resizeMode: "center",
    justifyContent: 'center',
    borderRadius: hp(7), // Default border radius for image
  },
  itemtxt: {
    fontSize: hp(2.2),
    fontWeight: '500',
    color: color.BLACK
  }
});

//make this component available to the app
export default Categories;
