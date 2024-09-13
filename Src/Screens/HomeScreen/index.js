// import libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Image, Animated, ScrollView, TextInput, Alert } from 'react-native';
import Images from '../../Utils/images';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../Utils/color';
import Categories from '../Categories';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import recipesView from '../Recipes'
import RecipesView from '../Recipes';
// create a component
const HomeScreen = () => {
  const [listData, setListData] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [Search, setSearch] = useState('')
  const [ActiveCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [mealLoading, setMealLoading] = useState(true)
  const [meals, setMeals] = useState([])

  useEffect(() => {
    getCategories()
    getRecipes()
  }, [])

  const getCategories = async () => {
    try {
      const responce = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      // console.log('getCategories List Api Success--->', responce?.data)
      if (responce && responce?.data) {
        setCategories(responce?.data?.categories)
        setLoading(false)
      }

    } catch (error) {
      Alert.alert(error)
      console.log('getCategories List Api Error--->', error)
      setLoading(false)
    }
  }

  const getRecipes = async (category = "Beef") => {
    try {
      const responce = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      console.log('getRecipes List Api Success--->', responce?.data)
      if (responce && responce?.data) {
        console.log('if--data--getRecipes List Api', responce?.data?.meals);

        setMeals(responce?.data?.meals)
        setMealLoading(false)
      }

    } catch (error) {
      Alert.alert(error)
      console.log('getRecipes List Api Error--->', error)
      setMealLoading(false)
    }
  }

  const handlechangeCategory = (category) => {
    setMealLoading(true)
    getRecipes(category)
    setActiveCategory(category)
    setMeals([])
  }

  const renderScreenheader = () => {
    return (
      <View style={{ height: 60, flexDirection: "row", justifyContent: 'space-between' }}>
        <Image source={Images.Ic_User_Profile} style={{ height: hp(6), width: hp(6) }} />

        <Image source={Images.Ic_Notification} style={{ height: hp(4), width: hp(4) }} />

      </View>
    )
  }
  const renderProfileView = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: hp(2.2), fontWeight: '400' }}>
          {'Hello John'}
        </Text>
        <Text style={{ fontSize: hp(3.5), fontWeight: "800" }}>{'Make your own food'}</Text>
        <Text style={{ fontSize: hp(3.5), fontWeight: "800" }}>{'Stay at'}
          <Text style={{ fontSize: hp(3.5), fontWeight: "800", color: color.ORANGE }}> {''}{'home'}</Text>
        </Text>
      </View>
    )
  }
  const renderSearchView = () => {
    return (
      <View style={styles.searchView}>
        <TextInput style={{ width: '85%', fontSize: hp(2.2), padding: 12 }}
          placeholder='Search any recipe'
          placeholderTextColor={color.GREY_TEXT}
          value={Search}
          onChangeText={(txt) => setSearch(txt)}
        />
        <View>
          <Image source={Images.Ic_Seach_Icon} style={{ height: hp(3.5), width: hp(3.5), marginRight: 18 }} />
        </View>
      </View>
    )
  }
  const renderCategoriesView = () => {
    return (
      <View style={{ marginTop: 20 }}>
        {categories?.length > 0 && !loading ? <Categories categories={categories} activeCategory={ActiveCategory} handlechangeCategory={handlechangeCategory} /> : renderCategoriesViewskeletonplaceholder()}
      </View>
    )
  }
  const renderCategoriesViewskeletonplaceholder = () => {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={60}
              height={60}
              borderRadius={30} // Makes it a circle
              marginLeft={10}   // Adds spacing between circles
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

    );
  }
  const SkeletonRecipesCard = ({ numColumns = 2 }) => {
    return (
      <SkeletonPlaceholder>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={'48%'}
              borderRadius={35}
              marginBottom={10}
            >
              {/* Skeleton for Image */}
              <SkeletonPlaceholder.Item
                height={index % 3 === 0 ? hp(25) : hp(35)} // Different heights as per the condition
                borderRadius={35}
                marginBottom={10}
              />
              {/* Skeleton for Text */}
              <SkeletonPlaceholder.Item
                width="80%"
                height={hp(1.5)} // Matching the font size for the text skeleton
                borderRadius={4}
                marginTop={10}
                alignSelf="center"
              />
            </SkeletonPlaceholder.Item>
          ))}
        </View>
      </SkeletonPlaceholder>
    );
  };

  const renderRecipeslist = () => {
    return (
      <View style={{ marginTop: 15 }}>
        {
          !mealLoading ? <RecipesView meals={meals} /> : SkeletonRecipesCard(2)
        }
      </View>
    )
  }


  const rendermainview = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {renderScreenheader()}
        {renderProfileView()}
        {renderSearchView()}
        {renderCategoriesView()}
        {renderRecipeslist()}
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      {rendermainview()}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color.WHITE,
  },
  searchView:
    { marginTop: 20, flexDirection: 'row', justifyContent: "space-between", backgroundColor: color.borderTextInput, borderRadius: 22, alignItems: 'center' },
  headerContainer: {
    backgroundColor: '#6200EE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 4, // Adds a shadow on Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 4, // iOS shadow
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    marginHorizontal: 10
  },
});

{/* <SectionList
        sections={listData}
        keyExtractor={(item) => item.idCategory}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
          </View>
        )}
        renderItem={renderItem}
      /> */}

// make this component available to the app
export default HomeScreen;
