import AroundMeCard from '@/component/AroundMeCard';
import NearbyUsersScreen from '@/component/Nearby';
import { useApi } from '@/hook/useApi';
import color, { globalstyle } from '@/styles/global';
import { getGlobalStyles } from '@/styles/globaltheme';
import { AroundMeCardProps } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * @constant {Object} imageMap - Maps image filenames to their required image sources
 * @type {{ [key: string]: any }}
 */

const imageMap: { [key: string]: any } = {
    "cardimg1.png": require("../assets/images/cardimg1.png"),
    "cardimg2.png": require("../assets/images/cardimg2.png"),
    "cardimg3.png": require("../assets/images/cardimg3.png"),
    "cardimg4.png": require("../assets/images/cardimg4.png"),
};


/**
 * @function Winks
 * @description A React component that displays a list of people who have winked at the user, with a fallback UI if there are no winks.
 * @returns {JSX.Element} The Winks screen component
 */

const Winks = () => {

    /**
     * @constant {AroundMeCardProps[]} aroundMeData - Array of data for people who have winked at the user
     */
    const aroundMeData: AroundMeCardProps[] = [
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], },
        { name: "Tyler", age: 24, location: "New York, NY", image: imageMap["cardimg2.png"], },
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], },
        { name: "Maya", age: 20, location: "New York, NY", image: imageMap["cardimg3.png"], },
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], },
        { name: "Maya", age: 20, location: "New York, NY", image: imageMap["cardimg3.png"], },
        { name: "Tyler", age: 24, location: "New York, NY", image: imageMap["cardimg2.png"], },
        { name: "Emma", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"], },
        { name: "Maya", age: 20, location: "New York, NY", image: imageMap["cardimg3.png"], },
    ];

    const globalstyle = getGlobalStyles();
    const [winks, setWinks] = useState(null);
    console.log(winks,"profiles")
    const { mutate: fetchUser, isPending: loading, error } = useApi();
    useEffect(() => {
        fetchUser(
            {
                url: '/winks/received',
                method: 'GET',
                showToast: false,
            },
            {
                onSuccess: (response) => {
                    setWinks(response.data);
                    console.log(response, "new resonse");
                },
                onError: (err) => {
                    console.log('Error fetching profile:', err.message);
                },
            }
        );
    }, [])

    return (
        <View style={[styles.container, globalstyle.container]}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={[globalstyle.text_16_bold_90, styles.heading]}>People who wink at you</Text>
                {aroundMeData?.length === 0 ? (
                    <View style={styles.noWinksContainer}>
                        <Image source={require("../assets/images/noitem.png")} style={styles.noWinksImage} />
                        <Text style={[globalstyle.text_22_reg_40, { maxWidth: 205, textAlign: "center" }]}>No Winks Yet. Keep Exploring.</Text>
                    </View>
                ) : (
                    <View style={styles.cardContainer}>
                        {aroundMeData.map((person, index) => (
                            <AroundMeCard
                                key={index}
                                name={person.name}
                                age={person.age}
                                location={person.location}
                                image={person.image}
                            // wink={person.wink}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );

};


/**
 * @constant {Object} styles - Defines the styles for the Winks component
 */


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 16
    },
    cardContainer: {
        flexDirection: "column",
        gap: 16,
    },
    heading: {
        paddingBottom: 16,
    },
    noWinksContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    noWinksImage: {
        width: 60,
        height: 60,
        marginBottom: 16,
    },
});


export default Winks;



// import AroundMeCard from '@/component/AroundMeCard';
// import { useApi } from '@/hook/useApi';
// import color, { globalstyle } from '@/styles/global';
// import { getGlobalStyles } from '@/styles/globaltheme';
// import { AroundMeCardProps } from '@/types/type';
// import React, { useEffect, useState } from 'react';
// import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// // Image map for fallback if API doesn't provide images
// const imageMap: { [key: string]: any } = {
//     'cardimg1.png': require('../assets/images/cardimg1.png'),
//     'cardimg2.png': require('../assets/images/cardimg2.png'),
//     'cardimg3.png': require('../assets/images/cardimg3.png'),
//     'cardimg4.png': require('../assets/images/cardimg4.png'),
// };

// const Winks = () => {
//     const globalstyle = getGlobalStyles();
//     const [winks, setWinks] = useState<AroundMeCardProps[]>([]);
//     const { mutate: fetchUser, isPending: loading, error } = useApi();
// console.log(winks,"winks")
//     useEffect(() => {
//         // Fetch winks
//         fetchUser(
//             {
//                 url: '/winks/received',
//                 method: 'GET',
//                 showToast: true,
//             },
//             {
//                 onSuccess: async (response) => {
//                     // Ensure response.data is an array
//                     const winkData = Array.isArray(response.data) ? response.data : [];
//                     console.log(winkData, 'winkdata');

//                     // Fetch user details for each senderId
//                     const userPromises = winkData.map((wink: { senderId: string }) =>
//                         new Promise((resolve) => {
//                             fetchUser(
//                                 {
//                                     url: `/users/${wink.senderId}`, // Updated to correct endpoint
//                                     method: 'GET',
//                                     showToast: true,
//                                 },
//                                 {
//                                     onSuccess: (userResponse) => {
//                                         resolve(userResponse.data || null); // Resolve with data or null if undefined
//                                         setWinks([userResponse.data])
//                                     },
//                                     onError: (err) => {
//                                         console.log(`Error fetching user ${wink.senderId}:`, err.message);
//                                         resolve(null); // Resolve with null on error
//                                     },
//                                 }
//                             );
//                         })
//                     );
//                 },
//                 onError: (err) => {
//                     console.log('Error fetching winks:', err.message);
//                 },
//             }
//         );
//     }, [fetchUser]);

//     return (
//         <View style={[styles.container, globalstyle.container]}>
//             <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//                 <Text style={[globalstyle.text_16_bold_90, styles.heading]}>People who wink at you</Text>
//                 {winks.length === 0 ? (
//                     <View style={styles.noWinksContainer}>
//                         <Image source={require('../assets/images/noitem.png')} style={styles.noWinksImage} />
//                         <Text style={[globalstyle.text_22_reg_40, { maxWidth: 205, textAlign: 'center' }]}>
//                             No Winks Yet. Keep Exploring.
//                         </Text>
//                     </View>
//                 ) : (
//                     <View style={styles.cardContainer}>
//                         {winks.map((person, index) => (
//                             <AroundMeCard
//                                 key={index} // Use user.id if available for better performance
//                                 name={person.firstName} // For compatibility with your original code
//                                 firstName={person.firstName}
//                                 age={person.age}
//                                 location={person.location}
//                                 image={person.image}
//                             />
//                         ))}
//                     </View>
//                 )}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: color.white,
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         paddingVertical: 16,
//     },
//     cardContainer: {
//         flexDirection: 'column',
//         gap: 16,
//     },
//     heading: {
//         paddingBottom: 16,
//     },
//     noWinksContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100%',
//     },
//     noWinksImage: {
//         width: 60,
//         height: 60,
//         marginBottom: 16,
//     },
// });

// export default Winks;

// import AroundMeCard from '@/component/AroundMeCard';
// import { useApi } from '@/hook/useApi';
// import color, { globalstyle } from '@/styles/global';
// import { getGlobalStyles } from '@/styles/globaltheme';
// import { AroundMeCardProps } from '@/types/type';
// import React, { useEffect, useState } from 'react';
// import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// // Image map for fallback if API doesn't provide images
// const imageMap: { [key: string]: any } = {
//     'cardimg1.png': require('../assets/images/cardimg1.png'),
//     'cardimg2.png': require('../assets/images/cardimg2.png'),
//     'cardimg3.png': require('../assets/images/cardimg3.png'),
//     'cardimg4.png': require('../assets/images/cardimg4.png'),
// };

// const Winks = () => {
//     const globalstyle = getGlobalStyles();
//     const [winks, setWinks] = useState<AroundMeCardProps[]>([]);
//     const { mutate: fetchWink, } = useApi();
//     const { mutate: fetchUser,data } = useApi();
//     console.log(winks, "winks");
//     console.log(data,"=data");
    

//   useEffect(() => {
//         fetchWink(
//             {
//                 url: '/winks/received',
//                 method: 'GET',
//                 showToast: true,
//             },
//             {
//                 onSuccess: async (response) => {
//                     const winkData = Array.isArray(response.data) ? response.data : [];
//                     console.log(winkData, 'winkdata');

//                     // Step 1: wrap fetchUser in a Promise for each senderId
//                     const userPromises = winkData.map((wink: { senderId: string }) => {
//                         console.log(`Fetching user for senderId: ${wink.senderId}`); // Debug each senderId
//                         return new Promise((resolve) => {
//                             fetchUser(
//                                 {
//                                     url: `/users/${wink.senderId}`,
//                                     method: 'GET',
//                                     showToast: false,
//                                 },
//                                 {
//                                     onSuccess: (userResponse) => {
//                                         console.log('userResponse:', userResponse);
//                                         resolve(userResponse.data || null);
//                                     },
//                                     onError: (err) => {
//                                         console.log(`Error fetching user ${wink.senderId}:`, err.message);
//                                         resolve(null); // continue even on error
//                                     },
//                                 }
//                             );
//                         });
//                     });

//                     // Step 2: wait for all to complete
//                     console.log('userPromises created:', userPromises.length); // Debug number of promises
//                     const allUsers = await Promise.all(userPromises);
//                     console.log('allUsers:', allUsers);

//                     // Step 3: filter and map to AroundMeCardProps
//                     const userData: AroundMeCardProps[] = allUsers
//                         .filter((user) => user !== null) // remove nulls
//                         .map((user, index) => ({
//                             firstName: user.firstName || 'Unknown',
//                             age: user.age || 18,
//                             location: user.location || 'Unknown',
//                             image: user.profilePictureUrls?.length > 0
//                                 ? { uri: user.profilePictureUrls[0] }
//                                 : imageMap[`cardimg${(index % 4) + 1}.png`],
//                         }));

//                     // Step 4: update winks only once
//                     console.log('userData:', userData); // Debug final mapped data
//                     setWinks(userData);
//                 },
//                 onError: (err) => {
//                     console.log('Error fetching winks:', err.message);
//                 },
//             }
//         );
//     }, [fetchUser]);



//     return (
//         <View style={[styles.container, globalstyle.container]}>
//             <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//                 <Text style={[globalstyle.text_16_bold_90, styles.heading]}>People who wink at you</Text>
//                 {winks.length === 0 ? (
//                     <View style={styles.noWinksContainer}>
//                         <Image source={require('../assets/images/noitem.png')} style={styles.noWinksImage} />
//                         <Text style={[globalstyle.text_22_reg_40, { maxWidth: 205, textAlign: 'center' }]}>
//                             No Winks Yet. Keep Exploring.
//                         </Text>
//                     </View>
//                 ) : (
//                     <View style={styles.cardContainer}>
//                         {/* {winks.map((person, index) => (
//                             <AroundMeCard
//                                 key={index} // Use user.id if available for better performance
//                                 name={person.firstName} // For compatibility with your original code
//                                 firstName={person.firstName}
//                                 age={person.age}
//                                 location={person.location}
//                                 image={person.image}
//                             />
//                         ))} */}
//                         <Text>ssjhs</Text>
//                     </View>
//                 )}
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: color.white,
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         paddingVertical: 16,
//     },
//     cardContainer: {
//         flexDirection: 'column',
//         gap: 16,
//     },
//     heading: {
//         paddingBottom: 16,
//     },
//     noWinksContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100%',
//     },
//     noWinksImage: {
//         width: 60,
//         height: 60,
//         marginBottom: 16,
//     },
// });

// export default Winks;