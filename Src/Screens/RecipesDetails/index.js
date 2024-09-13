//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import color from '../../Utils/color';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// create a component
const Recipesdetails = ({ route }) => {
  const { item } = route.params;
  console.log(item);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Image
          source={{ uri: item?.strMealThumb }}
          style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
        />
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    padding: 10
  },
});

//make this component available to the app
export default Recipesdetails;
