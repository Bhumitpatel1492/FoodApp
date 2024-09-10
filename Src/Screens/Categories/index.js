//import libraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import color from '../../Utils/color';
import categorydata from '../../Constant';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

// create a component
const Categories = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {
          categories?.map((cat, index) => {
            let isActive = cat.strCategory == activeCategory;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveCategory(cat?.strCategory)}
              >
                <View style={[
                  styles.imageview,

                ]}>
                  <View style={[styles.subimmview, { backgroundColor: isActive ? color.YELLOW : 'transparent' }]}>
                    <Image source={{ uri: cat?.strCategoryThumb }}
                      style={[styles.imagesty, isActive && { borderRadius: hp(7) }]}
                    />
                  </View>
                  <Text style={styles.itemtxt}>{cat?.strCategory}</Text>
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
    width: hp(8),
    height: hp(8),
    resizeMode: "center",
    justifyContent: 'center',
    borderRadius: hp(7), // Default border radius for image
  },
  itemtxt: {
    fontSize: hp(2.2),
    fontWeight: '500',
    color: color.BLACK,
    marginTop: 10
  },
  subimmview: {
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(10),
    height: hp(10),
    borderRadius: hp(7),
  }
});

//make this component available to the app
export default Categories;
