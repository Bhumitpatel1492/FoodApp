//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import color from '../../Utils/color';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

// create a component
const RecipesCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0
  return (
    < Animated.View style={styles.container} entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable onPress={() => navigation.navigate('Recipesdetails', { item })} style={[styles.btnview, { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }]}>
        <Image
          source={{ uri: item?.strMealThumb }}
          style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), backgroundColor: color.BLACK_LIGHT, borderRadius: 35 }}
        />
        <Text style={styles.itemtxt} >
          {
            item?.strMeal?.lenght > 20 ? item?.strMeal?.slice(0, 20) + '....' : item?.strMeal
          }
        </Text>
      </Pressable>
    </Animated.View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color.WHITE
  },
  btnview: {
    width: '100%',
    justifyContent: 'center'
  },
  itemtxt: {
    fontSize: hp(1.5),
    fontWeight: '500',
    color: color.BLACK,
    marginTop: 10
  },
});

//make this component available to the app
export default RecipesCard;
