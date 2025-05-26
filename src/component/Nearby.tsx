import React, { useEffect } from 'react';
import { View, ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import AroundMeCard from './AroundMeCard';
import AroundMeCardSkeleton from './skeletons/AroundMeCardSkeleton';
import { calculateAge } from '@/utils/calculateAge';
import { fetchNearbyUsers } from '@/redux/slices/nearbyWinkSlice';

const NearbyUsersScreen = ({ radius = 1000 }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.nearbyWink);
  console.log(users,"users")
  useEffect(() => {
    dispatch(fetchNearbyUsers(radius));
  }, [radius]);

  const onRefresh = () => {
    dispatch(fetchNearbyUsers(radius));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }>
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <AroundMeCardSkeleton key={index} />
        ))
      ) : users.length > 0 ? (
        users.map((item) => (
            console.log(item,"items"),
          <AroundMeCard
            key={item.id}
            receiverId={item.id}
            name={item.firstName || 'User'}
            age={calculateAge(item.birthDate)}
            location={item.city || 'Unknown'}
            image={item.profilePictureUrl || require('@/assets/images/cardimg2.png')}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>No users found nearby.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    gap: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 16,
  },
});

export default NearbyUsersScreen;
