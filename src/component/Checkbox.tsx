import { colors } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import { CheckboxProps } from "@/types/type";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

/**
 * @typedef {Object} CheckboxProps
 * @property {boolean} checked - Indicates whether the checkbox is checked.
 * @property {() => void} onPress - Callback function triggered when the checkbox is pressed.
 * @property {number} [size=24] - Size of the checkbox in pixels (optional, defaults to 24).
 * @property {string} [color="#9b51e0"] - Color of the checkbox when checked (optional, defaults to "#9b51e0").
 */



/**
 * A customizable checkbox component with a checkmark icon when selected.
 * @param {CheckboxProps} props - The properties for configuring the checkbox.
 * @returns {JSX.Element} A touchable checkbox with a dynamic background color and optional checkmark.
 */

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onPress,
    size = 20,
    color = "#9b51e0",
    bordercolor = "C6AEFF",
}) => {

    const { isDarkMode } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: bordercolor,
                    backgroundColor: checked ? color : isDarkMode ? colors.charcol60 : colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {checked && <Image style={{ width: 12, height: 12, tintColor: colors.white }} source={require("../assets/icons/tick.png")} />}
            </View>
        </TouchableOpacity>
    );
};

export default Checkbox;
