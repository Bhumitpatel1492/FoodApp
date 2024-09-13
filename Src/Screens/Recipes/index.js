//import libraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import color from '../../Utils/color';
import { mealData } from '../../Constant';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MasonryList from '@react-native-seoul/masonry-list';
import RecipesCard from '../RecipesCard';
import { useNavigation } from '@react-navigation/native';

// create a component
const RecipesView = ({ meals, activeCategory, setActiveCategory }) => {
  const navigation = useNavigation()
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <View>
        <Text style={styles.itemtxt} >{'Recipes'}</Text>
        <MasonryList
          data={meals}
          keyExtractor={(item) => item?.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipesCard navigation={navigation} item={item} index={i} />}
          // refreshing={isLoadingNext}
          // onRefresh={() => refetch({ first: ITEM_CNT })}
          onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)}
        />
      </View>
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
  itemtxt: {
    fontSize: hp(3),
    fontWeight: '500',
    color: color.BLACK,
    marginTop: 10
  },

});

//make this component available to the app
export default RecipesView;
