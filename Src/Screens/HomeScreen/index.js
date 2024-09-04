// import libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Image, Animated } from 'react-native';

// create a component
const HomeScreen = () => {
  const [listData, setListData] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));



  return (
    <View style={styles.container}>
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
      <Text>HomeScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#f0f4f8',
  },
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

// make this component available to the app
export default HomeScreen;
