import { NewsCardAProps } from '@/model';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export function NewsCardA({ item, onPress }: NewsCardAProps) {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.newsCard}>
        <View style={styles.newsContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <Image source={{ uri: item.imageUrl }} style={styles.newsImage} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  newsCard: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 15,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 3,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  newsContent: {
    flex: 1,
    padding: 10,
  },
  newsImage: {
    width: 120,
    height: '100%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
  },
});
