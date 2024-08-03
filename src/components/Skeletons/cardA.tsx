import React from 'react';
import { View, Animated, StyleSheet, } from 'react-native';

export function NewsCardASkeleton() {
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
    <View style={styles.skeleton}>
      <View style={styles.skeletonCard}>
        <View style={styles.skeletonContent}>
          <Animated.View style={[styles.skeletonTitle, { backgroundColor }]} />
          <Animated.View style={[styles.skeletonDescription, { backgroundColor }]} />
        </View>
        <View style={styles.skeletonImageContainer}>
          <Animated.View style={[styles.skeletonImage, { backgroundColor }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    width: "100%",
    marginBottom: 15,
    elevation: 3,
  },
  skeletonCard: {
    flexDirection: 'row',
    height: 100,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    alignItems: 'center',
  },
  skeletonContent: {
    flex: 1,
    padding: 10,
  },
  skeletonImageContainer: {
    width: 120,
    height: '100%',
  },
  skeletonImage: {
    width: '100%',
    height: '100%',
  },
  skeletonTitle: {
    height: 20,
    width: '100%',
    marginBottom: 6,
    borderRadius: 4,
  },
  skeletonDescription: {
    height: 15,
    width: '100%',
    borderRadius: 4,
  },
});
