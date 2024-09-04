//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, SafeAreaView, StatusBar } from 'react-native';
import Images from '../../Utils/images';
import color from '../../Utils/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// create a component
const SpleshScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 1200);
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={color.TRANSPARENT} />
        <View style={{ backgroundColor: color.WHITE, height: 300, width: 300, borderRadius: 150, justifyContent: "center", alignItems: "center" }}>
          <Image
            source={Images.Ic_Splesh_logo}
            resizeMode='contain'
            style={{ height: hp(250), width: hp(250), justifyContent: "center", borderRadius: hp(120) }}
          />
        </View>
        <View style={styles.txtview}>
          <Text style={styles.txt}>{"Foddy"}</Text>
          <Text style={[styles.txt, { fontSize: 18, }]}>{'Food is always right'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.COLOR_ORANGE_CARD
  },
  txtview: {
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 33,
    color: color.WHITE,
    fontStyle: 'normal',
    textAlign: "center",
    fontWeight: "bold"
  }
});

//make this component available to the app
export default SpleshScreen;
