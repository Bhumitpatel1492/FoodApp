import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import color from '../../Utils/color';
import categorydata from '../../Constant';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Categories = ({ categories, activeCategory, handlechangeCategory }) => {
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
                onPress={() => handlechangeCategory(cat?.strCategory)}
              >
                <View style={[
                  styles.imageview,

                ]}>
                  <View style={[styles.subimmview, { backgroundColor: isActive ? color.YELLOW : 'transparent' }]}>
                    <Image source={{ uri: cat?.strCategoryThumb }}
                      style={[styles.imagesty, isActive && { borderRadius: hp(7) }]}
                    />
                  </View>
                  <View >
                    <Text style={styles.itemtxt}>{cat?.strCategory}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageview: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 120,
    width: 120,
    borderRadius: 70,
  },
  imagesty: {
    width: hp(8),
    height: hp(8),
    resizeMode: "center",
    justifyContent: 'center',
    borderRadius: hp(7),
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

export default Categories;
