import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

import { NewsCardA, NewsCardASkeleton, NewsCardBSkeleton, Header, NewsCardB } from '@/components';
import environment from '@/configs/environment';
import { allCategories } from '@/services/categories';
import { getRecentPosts } from '@/services/posts';
import { WebViewScreen } from '@/components/WebViewScreen';

export function HomeScreen() {
  const [news, setNews] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const width = Dimensions.get('window').width;
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [url, setUrl] = useState('');

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


  const handleUrl = (url: string) => {
    setUrl(url);
    setIsWebViewVisible(true);
    console.log({ url })
  };

  const renderSkeletonLoadersCardNewsA = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <NewsCardASkeleton key={`skeleton-${index}`} />
    ));
  };

  return (
    <View style={styles.container}>
      <Header
        title={environment.NAME}
        setSearchVisible={() => setSearchVisible(!searchVisible)}
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
          <Carousel
            loop
            width={width}
            height={250}
            autoPlay={true}
            data={Array.from({ length: 2 })}
            scrollAnimationDuration={5000}
            mode="parallax"
            renderItem={() => <NewsCardBSkeleton />}
          />
          <FlatList
            ListHeaderComponent={() => (
              <View style={styles.headerContainer}>
                <Carousel
                  loop
                  width={width}
                  height={250}
                  autoPlay={true}
                  data={[]}
                  scrollAnimationDuration={5000}
                  mode="parallax"
                  renderItem={() => <></>}
                />
                <FlatList
                  horizontal
                  data={[]}
                  renderItem={({ item: category }) => (
                    <>...</>
                  )}
                  contentContainerStyle={styles.categoriesContainer}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            data={[]}
            renderItem={({ item }) => <></>}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
              renderSkeletonLoadersCardNewsA()
            )}
          />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <Carousel
                loop
                width={width}
                height={250}
                autoPlay={true}
                data={news}
                scrollAnimationDuration={5000}
                mode="parallax"
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }: any) => <NewsCardB item={item} onPress={(e) => console.log(e)} />}
              />
              <FlatList
                horizontal
                data={categories}
                renderItem={({ item: category }) => (
                  <TouchableOpacity onPress={() => console.log(category)} key={'category-' + category.id}>
                    <View style={styles.categoryButton}>
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.categoriesContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
          data={news}
          renderItem={({ item }) => <NewsCardA item={item} onPress={(e) => handleUrl(e?.link)} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            isFetchingMore ? (
              <View style={styles.footerLoader}>
                {renderSkeletonLoadersCardNewsA()}
              </View>
            ) : null
          )}
        />
      )}
      
      {isWebViewVisible && (
        <WebViewScreen url={url} onClose={() => setIsWebViewVisible(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  searchbar: {
    margin: 10,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  carouselContainer: {
    height: 250,
    marginBottom: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 15,
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
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007bff',
  },
  listContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  footerLoader: {
    paddingVertical: 10,
  },
});
