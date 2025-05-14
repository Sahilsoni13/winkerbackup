import color, { globalstyle } from "@/styles/global";
import { getGlobalStyles } from "@/styles/globaltheme";
import { Feature } from "@/types/type";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";


/**
 * Props for the FeatureTable component
 */
interface FeatureTableProps {
    /** Array of features to display in the table */
    data: Feature[];
}

/**
 * Component that renders a table-like structure displaying features for free and premium users
 * @param {FeatureTableProps} props - The props for the component
 * @returns {JSX.Element} A table of features with a premium indicator
 */
const FeatureTable: React.FC<FeatureTableProps> = ({ data }) => {
    const globalstyle = getGlobalStyles();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.flex2, globalstyle.text_14_med_90]}>Features Info</Text>
                <Text style={[styles.cell, globalstyle.text_14_med_90]}>Free</Text>
                <Text style={[styles.cell, globalstyle.text_14_med_90]}>Premium</Text>
            </View>

            {/* Feature Rows */}
            <FlatList
                data={data} // Use dynamic data from props
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.flex2, globalstyle.text_12_reg_50]}>{item.name}</Text>
                        <Text style={styles.cell}>{item.free}</Text>
                        <View style={styles.cell}>
                            {item.premium && <Image source={require("../assets/icons/purpletick.png")} style={styles.checkIcon} />}
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

/**
 * Styles for the FeatureTable component
 * @type {Object}
 */
const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: color.charcol20
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    header: {
        paddingVertical: 0,
        paddingBottom: 8
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
    flex2: {
        flex: 2, // Give more space to the first column
        textAlign: "left",
    },
    checkIcon: {
        width: 20,
        height: 20,
        tintColor: "#A35CF3",
        alignSelf: "center",
    },
});

export default FeatureTable;