import HeaderBack from '@/component/HeaderBack';
import color, { globalstyle } from '@/styles/global';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const UserDetails = () => {

    /**
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {number} age - The age of the user.
 * @property {string} location - The location of the user.
 * @property {string} bio - A short biography of the user.
 * @property {string[]} joinedParties - List of joined groups.
 * @property {any} profileImage - Path to the user's profile image.
 */


    const user = {
        name: 'Maya',
        age: 20,
        location: 'New York, NY',
        bio: "Hi, I’m Emma! I’m an adventurous soul who loves hiking, live music, and trying out new recipes. I’m looking for someone to share laughs and create memories with.",
        joinedParties: ['Tech Group', 'Chess group', "McDonald's group",],
        profileImage: require('../assets/images/cardimg3.png'),
    };

    return (



        <View style={[styles.container, globalstyle.container]}>
            <HeaderBack
                title={"User Details"}
                rightIcon={require("../assets/icons/status.png")}
                onRightPress={() => console.log("onRightPress")}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    <View style={styles.profileImageWrapper}>
                        <Image source={user.profileImage} style={styles.profileImage} />
                    </View>
                    <Text style={[styles.nameAge, globalstyle.text_40_bold_90, { lineHeight: 40 }]}>{user.name}, {user.age}</Text>
                    <View style={styles.locationContainer}>
                        <Image
                            source={require('../assets/icons/location.png')}
                            style={styles.locationIcon}
                        />
                        <Text style={styles.locationText}>{user.location}</Text>
                    </View>
                </View>



                {/* Bio Section */}
                <View style={styles.infocantainer}>
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, globalstyle.text_18_semi_90]}>
                            My Aura <Text>✨</Text>
                        </Text>
                        <View style={[styles.bioContainer, globalstyle.border]}>
                            <Text style={globalstyle.text_14_reg_60}>{user.bio}</Text>
                        </View>
                    </View>
                    {/* Joined Parties Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, globalstyle.text_18_semi_90]}>
                            Joined Parties <Text>🎉</Text>
                        </Text>
                        <View style={[globalstyle.border, styles.joinedContainer]}>
                            {
                                user?.joinedParties?.map((item, index) => {
                                    return (
                                        <View key={Date.now() + index + "joinedlist"} style={styles.partyTag}>
                                            <Text style={globalstyle.text_14_semi_90}>{item}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
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
        borderColor: color.purple50,
        backgroundColor: color.white,
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
    locationText: {
        fontSize: 18,
        color: color.charcol90,
        fontWeight: '400',
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
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        padding: 20,
        width: "100%",
        gap: 8,
        borderRadius: 16
    },
    partyTag: {
        backgroundColor: color.charcol05,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: "flex-start",
    },

});

export default UserDetails;