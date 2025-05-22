import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';

const UserDetailsSkeleton = () => {
  const { isDarkMode } = useTheme();
  const globalstyle = getGlobalStyles();

  return (
 <>
   <View style={styles.profileContainer}>
        <View style={[styles.profileImageWrapper, { backgroundColor: '#e0e0e0' }]}>
          <View style={[styles.profileImage, { backgroundColor: '#ccc' }]} />
        </View>
        <View style={styles.namePlaceholder} />
        <View style={styles.locationContainer}>
          <View style={styles.locationIcon} />
          <View style={styles.locationText} />
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.infocantainer}>
        <View style={styles.section}>
          <View style={styles.sectionTitle} />
          <View style={styles.bioContainer} />
        </View>
      </View>
 </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  profileImageWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  namePlaceholder: {
    height: 30,
    width: 180,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginTop: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  locationIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  locationText: {
    height: 20,
    width: 120,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginLeft: 8,
  },
  infocantainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    height: 20,
    width: 140,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
    alignSelf:"center"
  },
  bioContainer: {
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },


});
export default UserDetailsSkeleton;