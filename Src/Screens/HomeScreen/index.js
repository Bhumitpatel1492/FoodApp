// import libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Image, Animated, ScrollView, TextInput } from 'react-native';
import Images from '../../Utils/images';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import color from '../../Utils/color';
import Categories from '../Categories';

// create a component
const HomeScreen = () => {
  const [listData, setListData] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [Search, setSearch] = useState('')
  const [ActiveCategory, setActiveCategory] = useState('Beef')

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
        <Categories activeCategory={ActiveCategory} setActiveCategory={setActiveCategory} />
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
