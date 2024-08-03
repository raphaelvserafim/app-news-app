import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Searchbar, ActivityIndicator, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

import { COLORS } from '@/constants/theme';
import { NewsCardA, NewsCardB } from '@/components';
import { Header } from '@/components/Header';
import environment from '@/configs/environment';
import { allCategories } from '@/services/categories';
import { getRecentPosts } from '@/services/posts';

export function HomeScreen() {
  const [news, setNews] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    fetchCategories();
    fetchNews();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await allCategories();
      if (response?.length > 0) {
        setCategories(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await getRecentPosts(page);
      setNews((prevNews: any) => [...prevNews, ...response]);
      setLoading(false);
      setIsFetchingMore(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const handleEndReached = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
      fetchNews();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={environment.NAME}
        setSearchVisible={() => setSearchVisible(!Boolean(searchVisible))}
      />
      {searchVisible && (
        <Searchbar
          placeholder="Buscar"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={styles.searchbar}
        />
      )}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <>
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
              <FlatList
                horizontal
                data={categories}
                renderItem={({ item: category }) => (
                  <TouchableOpacity onPress={() => console.log(category)} key={'category-' + category.id}>
                    <View key={category.name} style={styles.categoryButton}>
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.categoriesContainer}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          data={news}
          renderItem={({ item }) => <NewsCardA item={item} onPress={(e) => console.log(e)} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => isFetchingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        />
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
