
import HeaderBack from '@/component/HeaderBack';
import UserDetailsSkeleton from '@/component/skeletons/UserDetailsSkeleton';
import { useApi } from '@/hook/useApi';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

type RootStackParamList = {
  UserDetails: { id: string };
};

// 30.132831 74.206145 'longitude lattitude'

// Type for Nominatim response
type GeocodeResponse = {
  address: {
    city?: string;
    town?: string;
    village?: string;
  };
};

interface UserProfile {
  firstName?: string;
  lastName?: string;
  aura?: string;
  birthDate?: string;
  location: string; // Updated to string
  city?: string;
}

const UserDetails = () => {
  // Static user data (for fallback or testing)
  const user = {
    name: 'Maya',
    age: 20,
    location: 'New York, NY',
    bio: "Hi, I'm Emma! I'm an adventurous soul who loves hiking, live music, and trying out new recipes. I'm looking for someone to share laughs and create memories with.",
    joinedParties: ['Tech Group', 'Chess group', "McDonald's group"],
    profileImage: require('../assets/images/cardimg3.png'),
  };

  const globalstyle = getGlobalStyles();
  const { isDarkMode } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { mutate: fetchUser, isPending: loading, isError, error } = useApi();
  const route = useRoute<RouteProp<RootStackParamList, 'UserDetails'>>();
  const [isCityFetching, setIsCityFetching] = useState(false);
  const { id } = route.params;
  useEffect(() => {
    if(!id) return
    fetchUser(
      {
        url: `/users/${id}`,
        method: 'GET',
        showToast: false,
      },
      {
        onSuccess: async (response) => {
          const userData = response.data as UserProfile;
          setIsCityFetching(true);
          let city = 'Unknown';
          if (userData.location) {
            const coords = parseLocation(userData.location);
            if (coords) {
              city = await fetchCityName(coords.latitude, coords.longitude);
            }
          }
          setProfile({ ...userData, city });
          setIsCityFetching(false);
        },
        onError: (err) => {
          console.log('❌ Error fetching profile:', err.message);
          setIsCityFetching(false);
        },
      }
    );
  }, [id, fetchUser]);

  // Function to parse location string
  const parseLocation = (location: string): { latitude: number; longitude: number } | null => {
    try {
      const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));
      if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error('Invalid coordinates');
      }
      return { latitude, longitude };
    } catch (err) {
      console.log('Error parsing location:', err);
      return null;
    }
  };

  // Function to fetch city name using Nominatim
  const fetchCityName = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await axios.get<GeocodeResponse>(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
      );
      const { city, town, village } = response.data.address;
      return city || town || village || 'Unknown';
    } catch (err) {
      console.log('Error fetching city:', err);
      return 'Unknown';
    }
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };



  return (
    <View style={[styles.container, globalstyle.container]}>
      <HeaderBack
        title="User Details"
        rightIcon={require('../assets/icons/status.png')}
        onRightPress={() => console.log('onRightPress')}
      />
      {
        loading || isCityFetching ? <UserDetailsSkeleton /> :
          profile &&
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileContainer}>
              <View style={styles.profileImageWrapper}>
                <Image source={user.profileImage} style={styles.profileImage} />
              </View>
              <Text style={[styles.nameAge, globalstyle.text_40_bold_90, { lineHeight: 40 }]}>
                {profile?.firstName || user.name}, {profile?.birthDate ? calculateAge(profile.birthDate) : user.age}
              </Text>
              <View style={styles.locationContainer}>
                <Image
                  source={require('../assets/icons/location.png')}
                  style={[styles.locationIcon, { tintColor: isDarkMode ? colors.white : colors.black }]}
                />
                <Text style={[globalstyle.text_18_reg_90]}>
                  {isCityFetching ? 'Loading...' : profile?.city || 'Unknown'}
                </Text>
              </View>
            </View>
            <View style={styles.infocantainer}>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, globalstyle.text_18_semi_90]}>
                  My Aura <Text>✨</Text>
                </Text>
                <View style={[styles.bioContainer, globalstyle.border]}>
                  <Text style={[globalstyle.text_14_reg_60, { color: isDarkMode ? colors.charcol30 : colors.charcol60 }]}>
                    {profile?.aura || user.bio}
                  </Text>
                </View>
              </View>
              {/* Joined Parties Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, globalstyle.text_18_semi_90]}>
                  Joined Parties <Text>🎉</Text>
                </Text>
                <View style={[globalstyle.border, styles.joinedContainer]}>
                  {user.joinedParties.map((item, index) => (
                    <View
                      key={Date.now() + index + 'joinedlist'}
                      style={[styles.partyTag, { backgroundColor: isDarkMode ? colors.charcol80 : colors.charcol05 }]}
                    >
                      <Text style={globalstyle.text_14_semi_90}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginTop: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 22,
  },
  profileImageWrapper: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.purple50,
    backgroundColor: colors.white,
    shadowColor: '#800080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  nameAge: {
    marginTop: 20,
    textTransform: 'capitalize',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  section: {
    marginTop: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: 8,
  },
  bioContainer: {
    borderRadius: 16,
    padding: 20,
  },
  infocantainer: {
    padding: 8,
  },
  joinedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 20,
    width: '100%',
    gap: 8,
    borderRadius: 16,
  },
  partyTag: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
});

export default UserDetails;