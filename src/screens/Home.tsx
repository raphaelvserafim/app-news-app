import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NewsCard from '@/components/NewsCard';
import { categories, sampleNews } from '@/data';
import { COLORS } from '@/constants/theme';

export function HomeScreen() {
  const [news, setNews] = useState<typeof sampleNews>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNews(sampleNews);
      setLoading(false);
    }, 1000);
  }, []);

  const renderItem = ({ item }: { item: typeof sampleNews[0] }) => (
    <NewsCard
      title={item.title}
      description={item.description}
      imageUrl={item.imageUrl}
      onPress={() => console.log('News item pressed:', item.title)}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Name</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.bannerContainer}>
          {sampleNews.length > 0 && (
            <View style={styles.bannerWrapper}>
              <Image
                source={{ uri: sampleNews[0].imageUrl }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>{sampleNews[0].title}</Text>
                <Text style={styles.bannerDescription}>{sampleNews[0].description}</Text>
              </View>
            </View>
          )}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <View key={category.name} style={styles.categoryButton}>
              <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>All News</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <FlatList
            data={news}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.footerSafeArea} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSafeArea: {
    backgroundColor: COLORS.header,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.header,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 5,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  bannerContainer: {
    width: '100%',
    height: 220,
    marginBottom: 15,
    overflow: 'hidden',
  },
  bannerWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerDescription: {
    fontSize: 16,
    color: '#fff',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  footerSafeArea: {
    backgroundColor: 'transparent',
  },
});
