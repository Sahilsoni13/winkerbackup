import AroundMeCard from "@/component/AroundMeCard";
import HousePartyCard from "@/component/HousePartyCard";
import Input from "@/component/Input";
import AroundMeFilterModal from "@/component/models/AroundMeFilterModal";
import HousePartyFilterModal from "@/component/models/HousePartyFilterModal";
import WelcomePopup from "@/component/models/WelcomePopup";
import { colors, getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import { AroundMeCardProps, HousePartyCardProps } from "@/types/type";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import color from "./import { StyleSheet } from 'react-native";


/**
 * Mapping of image filenames to their respective required images.
 * @type {Object.<string, ImageSourcePropType>}
 */

const imageMap: { [key: string]: any } = {
    "cardimg1.png": require("../assets/images/cardimg1.png"),
    "cardimg2.png": require("../assets/images/cardimg2.png"),
    "cardimg3.png": require("../assets/images/cardimg3.png"),
    "cardimg4.png": require("../assets/images/cardimg4.png"),
    "cardimg5.png": require("../assets/images/cardimg5.png"),
    "cardimg6.png": require("../assets/images/cardimg6.png"),
    "cardimg7.png": require("../assets/images/cardimg7.png"),
};

/**
 * List of house party groups.
 * @type {HousePartyCardProps[]}
 */

const housePartyData: HousePartyCardProps[] = [
    { name: "McDonald's Group", location: "25 Members 50m", image: imageMap["cardimg7.png"] },
    { name: "Tech Group", location: "25 Members 50m", image: imageMap["cardimg6.png"] },
    { name: "Anime Group", location: "25 Members 50m", image: imageMap["cardimg5.png"] }
];

/**
 * List of people around the user.
 * @type {AroundMeCardProps[]}
 */

const aroundMeData: AroundMeCardProps[] = [
    { name: "Emma, 27", age: 27, location: "New York, NY", image: imageMap["cardimg1.png"] },
    { name: "Tyler, 24", age: 27, location: "New York, NY", image: imageMap["cardimg2.png"] },
    { name: "Maya, 20", age: 27, location: "New York, NY", image: imageMap["cardimg3.png"] },
    { name: "Emma, 27", age: 27, location: "New York, NY", image: imageMap["cardimg4.png"] },
    { name: "Emma, 27", age: 24, location: "New York, NY", image: imageMap["cardimg1.png"] },
    { name: "Tyler, 24", age: 20, location: "New York, NY", image: imageMap["cardimg2.png"] },
    { name: "Maya, 20", age: 20, location: "New York, NY", image: imageMap["cardimg3.png"] },
    { name: "Maya", age: 20, location: "New York, NY", image: imageMap["cardimg4.png"] },
];

/**
 * @typedef {"houseParty" | "aroundMe"} TabType - The type of tab selected.
 */

type TabType = "houseParty" | "aroundMe";

/**
 * PartyScreen Component - Displays tabs for House Parties and People Around.
 * @returns {JSX.Element}
 */

const PartyScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("houseParty");
    // Define the data and renderItem for FlatList
    const data = activeTab === "houseParty" ? housePartyData : aroundMeData;

    /**
   * Renders individual card items based on the active tab.
   * @param {{ item: HousePartyCardProps | AroundMeCardProps, index: number }} 
   * @returns {JSX.Element}
   */


    /**
       * @constant {NavigationProp} navigation - Navigation object to handle screen transitions.
       */
    const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
    const [showPopup, setShowPopup] = useState(false);
    const [success, setSuccess] = useState(false)

    const renderItem = ({ item, index }: { item: HousePartyCardProps | AroundMeCardProps; index: number }) => {
        if (activeTab === "houseParty") {
            return <HousePartyCard onPress={() => setShowPopup(true)}  {...(item as HousePartyCardProps)} />;
        } else {
            return <AroundMeCard {...(item as AroundMeCardProps)} />;
        }
    };


    const [isFilterVisible, setFilterVisible] = useState<boolean>(false);
    // animated tabs 

    // Array of available filter options representing distances in meters.
    const Aroundmeoptions = ["20m", "30m", "40m", "50m", "60m", "70m", "80m", "90m", "100m"];



    const HousePartyoptions = ["Social", "Collage", "Tea", "Tech", "Anime", "Gaming", "Manga", "Space", "Theories"];

    const globalstyle = getGlobalStyles();
    const { isDarkMode } = useTheme();
    return (
        <View style={[globalstyle.container, { flex: 1, }]}>
            <View style={{ paddingTop: 16 }}>
                <Input
                    placeholder="Search"
                    rightIcon={require("../assets/icons/searchicon.png")}
                    onChangeText={(text) => console.log(text)}
                />
                <View style={styles.tabContainer} >
                    <View style={[styles.tabbox, globalstyle.border]} >
                        <TouchableOpacity
                            onPress={() => setActiveTab("houseParty")}
                            style={[styles.tabButton, activeTab === "houseParty" && { backgroundColor: isDarkMode ? color.white : color.charcol100 }]}
                        >
                            <Text style={[globalstyle.text_16_med_90, activeTab === "houseParty" && {color:isDarkMode?color.black:color.white}]}>House Party</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab("aroundMe")}
                            style={[styles.tabButton, activeTab === "aroundMe" && { backgroundColor: isDarkMode ? color.white : color.charcol100 }]}
                        >
                            <Text style={[globalstyle.text_16_med_90, activeTab === "aroundMe"&& {color:isDarkMode?color.black:color.white}]}>Around Me</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setFilterVisible(true)}>
                        <View style={[globalstyle.border, { borderRadius: 50, width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }]} >
                            <Image source={require("../assets/icons/filter.png")} style={{ width: 20, height: 20, tintColor: isDarkMode ? colors.white : colors.black }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View  >
                    {/* Modal Rendering */}
                    {isFilterVisible && (
                        activeTab === "houseParty" ? (
                            <HousePartyFilterModal options={HousePartyoptions} onClose={() => setFilterVisible(false)} />
                        ) : (
                            <AroundMeFilterModal options={Aroundmeoptions} onClose={() => setFilterVisible(false)} />
                        )
                    )}


                    <View style={{ flexDirection: "column", gap: 32 }}>
                        <View>
                            {
                                activeTab === "houseParty" &&
                                < View style={styles.activehousetab} >
                                    <Text style={globalstyle.text_16_bold_90} >Trending Parties</Text>
                                    <Image style={{ width: 24, height: 22 }} source={require("../assets/icons/fire.png")} />
                                </View>
                            }
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()} // Use a unique ID if available
                                contentContainerStyle={styles.cardList}
                                ListEmptyComponent={<Text style={{ textAlign: "center" }}>No data available</Text>}
                            />
                        </View>
                        <View>

                            {
                                activeTab === "houseParty" &&
                                < View style={styles.activehousetab} >
                                    <Text style={globalstyle.text_16_bold_90} >Nearby Parties</Text>
                                    <Image style={{ width: 24, height: 22 }} source={require("../assets/icons/focus.png")} />
                                </View>
                            }
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()} // Use a unique ID if available
                                contentContainerStyle={styles.cardList}
                                ListEmptyComponent={<Text style={{ textAlign: "center" }}>No data available</Text>}
                            />
                        </View>
                    </View>

                </View>
            </ScrollView>
            <WelcomePopup
                callback={() => {
                    setSuccess(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        setSuccess(false);
                    }, 4000); // Adjust timeout based on animation duration
                }}
                visible={showPopup} success={success} onClose={() => { setShowPopup(false), setSuccess(false) }} />
        </View >
    );
};

const styles = StyleSheet.create({
    tabContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    tabbox: { flexDirection: "row", marginBottom: 20, marginTop: 16, width: 'auto', borderRadius: 28, padding: 8, gap: 8 },
    tabButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignItems: "center" },
    activeTab: { backgroundColor: colors.charcol100 },
    tabText: {
        fontSize: 16,
        color: colors.black,
    },
    cardList: { gap: 16, flexGrow: 1 },
    activehousetab: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingBottom: 17.5
    },
    lightactiveTab: {
        backgroundColor: colors.white,
    },
    lightactivetext: {
        color: colors.black
    },
    activetext: {
        color: colors.white
    }
});


export default PartyScreen;
