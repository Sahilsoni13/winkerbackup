import AroundMeCardSkeleton from '@/component/skeletons/AroundMeCardSkeleton';
import WinkReceiveCard from '@/component/WinkReceiveCard';
import color from '@/styles/global';
import { getGlobalStyles } from '@/styles/globaltheme';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReceivedWinks, clearError } from '@/redux/slices/winkerSlice';
import { AppDispatch, RootState } from '@/redux/store'; // Adjust path to your store
import { calculateAge } from '@/utils/calculateAge';

const Winks = () => {
  const globalstyle = getGlobalStyles();
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const { winks, loading, error } = useSelector((state: RootState) => state.winker);
  console.log(winks, "winks")
  const [refreshing, setRefreshing] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const loadWinks = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchReceivedWinks()).finally(() => {
      setRefreshing(false);
      setInitialFetchDone(true);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReceivedWinks()).finally(() => {
      setInitialFetchDone(true);
    });
  }, [dispatch]);

  // Optionally clear error on component mount or refresh
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <View style={[styles.container, globalstyle.container]}>
      <Text style={[globalstyle.text_16_bold_90, styles.heading]}>People who wink at you</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadWinks} />
        }
      >
        {(loading || !initialFetchDone) ? (
          <View style={[{ flexDirection: 'column', gap: 16 }]}>
            {Array.from({ length: 6 }).map((_, index) => (
              <AroundMeCardSkeleton key={index} />
            ))}
          </View>
        ) : winks.length <= 0 ? (
          <View style={styles.noWinksContainer}>
            <Image source={require('../assets/images/noitem.png')} style={styles.noWinksImage} />
            <Text style={[globalstyle.text_22_reg_40, { maxWidth: 205, textAlign: 'center' }]}>
              No Winks Yet. Keep Exploring.
            </Text>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            {winks.map((person, index) => (
              <WinkReceiveCard
                key={index}
                name={person.sender.firstName || "User"}
                age={calculateAge(person.sender.birthDate) || 20}
                senderId={person.sender.id}
                id={person.id}
                location={person.sender.location}
                status={person.isAccepted ? 'Winked' : 'Wink back'}
                image={person.sender.profilePictureUrls[0] || require('@/assets/images/cardimg2.png')}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingTop: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  cardContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  heading: {
    paddingBottom: 16,
  },
  noWinksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noWinksImage: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
});

export default Winks;