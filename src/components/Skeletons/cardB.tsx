import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export function NewsCardBSkeleton() {
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#c0c0c0'],
  });

  return (
    <View style={styles.bannerWrapper}>
      <Animated.View style={[styles.bannerImage, { backgroundColor }]} />
      <View style={styles.bannerTextContainer}>
        <Animated.View style={[styles.bannerTitle, { backgroundColor }]} />
        <Animated.View style={[styles.bannerDescription, { backgroundColor }]} />
      </View>
    </View>
  );
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
    alignSelf: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    height: 120,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
  },
  bannerTitle: {
    height: 25,
    width: '60%',
    marginBottom: 10,
    borderRadius: 4,
  },
  bannerDescription: {
    height: 15,
    width: '80%',
    borderRadius: 4,
  },
});
