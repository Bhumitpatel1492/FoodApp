//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Images from '../../Utils/images';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './styles';
import color from '../../Utils/color';
import YoutubeIframe, { getYoutubeMeta } from 'react-native-youtube-iframe';

const Recipesdetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [mealLoading, setMealLoading] = useState(true);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMeals([]);
      setMealLoading(true);
      getRecipes(item?.idMeal);
    });
    return unsubscribe;
  }, []);

  // API call to get the recipe details
  const getRecipes = async (id) => {
    console.log('id--BB-->', id);
    setMealLoading(true);
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response && response?.data) {
        setMeals(response?.data?.meals[0]);
        console.log('meals--->', meals);

        setMealLoading(false);
        setIngredientsLoading(false);
      }
    } catch (error) {
      Alert.alert(error.message || "An error occurred");
      console.log('getRecipes List Api Error---details--->', error);
      setMealLoading(false);
    }
  };

  // Extracting the indices for ingredients
  const ingredientsIndexs = (meal) => {
    if (!meal) return [];
    let indexs = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i] && meal['strIngredient' + i].trim() !== "") {
        indexs.push(i);
      }
    }
    return indexs;
  };


  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/; const match = url?.match(regex); if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  const rendermainview = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderitemimageview()}
        {renderitemnameview()}
        {mealLoading ? renderBasicDetailsSkeleton() : renderbasicdetailsview()}
        {!mealLoading && !ingredientsLoading ? renderingredientsview() : renderIngredientsskeletonview()}
        {renderIntroductionview()}
        {rendervideoview()}
      </View>
    );
  };

  const renderitemimageview = () => (
    <Image
      source={{ uri: item?.strMealThumb }}
      style={styles.imgstyle}
    />
  );

  const renderitemnameview = () => (
    <View style={styles.nameview}>
      <View style={{ width: '52%' }}>
        <Text style={styles.itemtxt}>{item?.strMeal ?? ""}</Text>
        <Text style={styles.itemtxt}>{meals?.strArea ?? ""}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btnstyle}>
          <Text style={{ color: color.BLACK }}>{'Add To favourite '}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderbasicdetailsview = () => (
    <View style={styles.basicdetailsview}>
      <View style={styles.clockview}>
        <View style={styles.subview}>
          <Image
            source={Images?.Ic_Clock_Icon}
            style={styles.iconsty}
            resizeMode='contain'
          />
        </View>
        <View style={{ marginTop: hp(1) }}>
          <Text style={styles.detailstxt}>{'35'}</Text>
          <Text style={styles.detailstxt}>{'min'}</Text>
        </View>
      </View>
      <View style={styles.clockview}>
        <View style={styles.subview}>
          <Image
            source={Images?.Ic_User_Icon}
            style={styles.iconsty}
            resizeMode='contain'
          />
        </View>
        <View style={{ marginTop: hp(1) }}>
          <Text style={styles.detailstxt}>{'03'}</Text>
          <Text style={[styles.detailstxt, { fontSize: hp(1.8) }]}>{'serving'}</Text>
        </View>
      </View>
      <View style={styles.clockview}>
        <View style={styles.subview}>
          <Image
            source={Images?.Ic_calories_Icon}
            style={styles.iconsty}
            resizeMode='contain'
          />
        </View>
        <View style={{ marginTop: hp(1) }}>
          <Text style={styles.detailstxt}>{'103'}</Text>
          <Text style={styles.detailstxt}>{'cal'}</Text>
        </View>
      </View>
      <View style={styles.clockview}>
        <View style={styles.subview}>
          <Image
            source={Images?.Ic_stack_Icon}
            style={styles.iconsty}
            resizeMode='contain'
          />
        </View>
        <View style={{ marginTop: hp(2.5) }}>
          <Text style={styles.detailstxt}>{'Easy'}</Text>
        </View>
      </View>
    </View>
  );

  const renderBasicDetailsSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={styles.lodingmainview}>
        {[...Array(4)].map((_, idx) => (
          <View key={idx} style={{ alignItems: 'center' }}>
            <View style={styles.lodingsubview} />
            <View style={styles.lodinglittle} />
            <View style={styles.lodingtxt} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );

  // Main Ingredients View
  const renderingredientsview = () => {
    if (!meals || ingredientsLoading || mealLoading) {
      return renderIngredientsskeletonview();
    }

    const ingredientsList = ingredientsIndexs(meals);

    return (
      <View>
        <Text style={styles.itemtxt}>{'Ingredients'}</Text>
        <View>
          {ingredientsList.length > 0 ? (
            ingredientsList.map(i => (
              <View key={i} style={{ flexDirection: 'row' }}>
                <View style={{ margin: hp(1), height: hp(2), width: hp(2), borderRadius: hp(1), backgroundColor: color.YELLOW }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.detailstxt}>{meals['strMeasure' + i] || ""}</Text>
                  <Text style={styles.detailstxt}>{meals['strIngredient' + i] || ""}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.detailstxt}>No ingredients available</Text>
          )}
        </View>
      </View>
    );
  };

  // Skeleton View for Ingredients
  const renderIngredientsskeletonview = () => (
    <SkeletonPlaceholder>
      <View style={{ marginTop: hp(4) }}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item marginTop={10}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={{ flexDirection: 'row', marginTop: 10 }}>
              <SkeletonPlaceholder.Item
                width={20}
                height={20}
                borderRadius={10}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item width={180} height={20} borderRadius={4} />
            </View>
          ))}
        </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  );

  const renderIntroductionview = () => {
    return (
      <View>
        <Text style={styles.itemtxt}>{'Instructions'}</Text>

        <View>
          <Text style={styles.itemtxt}>
            {meals?.strInstructions}
          </Text>
        </View>
      </View>
    )
  }

  const rendervideoview = () => {
    return (
      <View>
        {
          meals?.strYoutube && (
            <View>
              <Text>
                {'Recipe Video'}
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meals?.strYoutube)}
                  height={hp(30)} />
              </View>
            </View>
          )
        }
      </View>
    )
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar barStyle={'dark-content'} />
      {rendermainview()}
    </ScrollView>
  );
};

export default Recipesdetails;
