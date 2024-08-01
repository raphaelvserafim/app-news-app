import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import { Searchbar, ActivityIndicator, Text, Appbar } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

import { categories, sampleNews } from '@/data';
import { COLORS } from '@/constants/theme';
import { NewsCardA, NewsCardB } from '@/components';

export function HomeScreen() {
  const [news, setNews] = useState<typeof sampleNews>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    setTimeout(() => {
      setNews(sampleNews);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" color="#fff" onPress={() => { }} />
        <Appbar.Content title="Name" color="#fff" style={styles.headerContent} />
        <Appbar.Action icon="magnify" color="#fff" onPress={() => setSearchVisible(!searchVisible)} />
      </Appbar.Header>
      {searchVisible && (
        <Searchbar
          placeholder="Buscar"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={styles.searchbar}
        />
      )}
      {loading ? (
        <ActivityIndicator animating={true} style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <View style={{ flex: 1 }}>
              <Carousel
                loop
                width={width}
                height={250}
                autoPlay={true}
                data={news}
                scrollAnimationDuration={5000}
                mode="parallax"
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={NewsCardB}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {categories.map((category) => (
                <View key={category.name} style={styles.categoryButton}>
                  <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={news}
            renderItem={NewsCardA}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },
  searchbar: {
    margin: 10,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#ffffff',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingBottom: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingLeft: 10,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007bff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 15,
    marginLeft: 15,
    color: '#333',
  },
  listContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    height: 50,
    backgroundColor: COLORS.header,
    color: "#fff"
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});