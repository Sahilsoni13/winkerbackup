import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';

const AroundMeCardSkeleton: React.FC = () => {
  const { isDarkMode } = useTheme();
  const globalstyle = getGlobalStyles();

  // Animation setup for shimmering effect
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);
  // Interpolate shimmer animation for translateX effect
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={[styles.card, !isDarkMode && globalstyle.border, { backgroundColor: isDarkMode ? colors.charcol80 : colors.charcol05 }]}>
      {/* Skeleton for profile image */}
      <View style={styles.image}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              backgroundColor: isDarkMode ? colors.charcol60 : colors.charcol20,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
      {/* Skeleton for text container */}
      <View style={styles.textContainer}>
        {/* Skeleton for name and age */}
        <View style={[styles.textPlaceholder, { width: '60%', height: 16, backgroundColor: isDarkMode ? colors.charcol60 : colors.charcol20 }]}>
          <Animated.View
            style={[
              styles.shimmer,
              {
                backgroundColor: isDarkMode ? colors.charcol50 : colors.charcol10,
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
        {/* Skeleton for location */}
        <View style={[styles.locationbox, { marginTop: 4, marginBottom: 8 }]}>
          <View style={[styles.locationimg, { backgroundColor: isDarkMode ? colors.charcol60 : colors.charcol20 }]} />
          <View style={[styles.textPlaceholder, { width: '40%', height: 14, backgroundColor: isDarkMode ? colors.charcol60 : colors.charcol20 }]}>
            <Animated.View
              style={[
                styles.shimmer,
                {
                  backgroundColor: isDarkMode ? colors.charcol50 : colors.charcol10,
                  transform: [{ translateX }],
                },
              ]}
            />
          </View>
        </View>
        {/* Skeleton for wink button */}
        <View style={[styles.button, { backgroundColor: isDarkMode ? colors.charcol60 : colors.charcol20 }]}>
          <View style={styles.btncantainer}>
            <View style={[styles.locationimg, { backgroundColor: isDarkMode ? colors.charcol50 : colors.charcol10 }]} />
            <View style={[styles.textPlaceholder, { width: 40, height: 14, backgroundColor: isDarkMode ? colors.charcol50 : colors.charcol10 }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 16,
    alignItems: 'center',
    gap: 15,
  },
  image: {
    width: 98,
    height: 98,
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationbox: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  locationimg: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  btncantainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 40,
    width: 'auto',
  },
  textPlaceholder: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
});

export default AroundMeCardSkeleton;