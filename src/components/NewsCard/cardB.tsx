import { NewsCardAProps } from '@/model';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, } from 'react-native-paper';

export function NewsCardB({ item, onPress }: NewsCardAProps) {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.bannerWrapper}>
        <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} resizeMode="cover" />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Text style={styles.bannerDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bannerWrapper: {
    width: '100%',
    height: 250,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bannerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  bannerDescription: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  }
});
