// import color, { globalstyle } from '@/styles/global';
// import React, { useRef, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

// // Define the type for the date state
// interface DateOfBirth {
//     day: string;
//     month: string;
//     year: string;
// }
// interface ValidityState {
//     day: boolean;
//     month: boolean;
//     year: boolean;
// }
// const DateOfBirthInput: React.FC = () => {
//      // State to store the date values
//       const [date, setDate] = useState<DateOfBirth>({
//           day: '',
//           month: '',
//           year: '',
//       });

//       // State to track the validity of each field
//       const [isValid, setIsValid] = useState<ValidityState>({
//           day: true,
//           month: true,
//           year: true,
//       });

//       // Refs for the TextInput components, explicitly allowing null
//       const dayInputRef = useRef<TextInput | null>(null);
//       const monthInputRef = useRef<TextInput | null>(null);
//       const yearInputRef = useRef<TextInput | null>(null);

//       // Log the date state for debugging
//       console.log(date);

//       // Regex patterns for validation
//       const dayRegex = /^(0?[1-9]|[12][0-9]|3[01])$/; // 1-31
//       const monthRegex = /^(0?[1-9]|1[0-2])$/; // 1-12
//       const yearRegex = /^(19[0-9]{2}|20[0-1][0-9]|202[0-5])$/; // 1900-2025

//       // Handle input change for each field with validation and auto-focus forward
//       const handleInputChange = (
//           field: keyof DateOfBirth,
//           value: string,
//           nextFieldRef?: React.RefObject<TextInput | null>
//       ) => {
//           // Allow only numeric input
//           if (/^\d*$/.test(value)) {
//               // Update the state with the input value, even if invalid
//               setDate((prev) => ({
//                   ...prev,
//                   [field]: value,
//               }));

//               // Validate the input based on the field
//               let isFieldValid = true;

//               if (value.length > 0) { // Only validate if there's a value
//                   if (field === 'day' && value.length === 2) {
//                       isFieldValid = dayRegex.test(value);
//                   } else if (field === 'month' && value.length === 2) {
//                       isFieldValid = monthRegex.test(value);
//                   } else if (field === 'year' && value.length === 4) {
//                       isFieldValid = yearRegex.test(value);
//                   } else {
//                       // If the field is not fully filled, consider it valid (no red color yet)
//                       isFieldValid = true;
//                   }
//               }

//               // Update the validity state for the field
//               setIsValid((prev) => ({
//                   ...prev,
//                   [field]: isFieldValid,
//               }));

//               // Auto-focus the next field only if the current field is valid and reaches its max length
//               if (nextFieldRef && value.length === (field === 'year' ? 4 : 2) && isFieldValid) {
//                   nextFieldRef.current?.focus();
//               }
//           }
//       };

//       // Handle backspace key press for backward navigation
//       const handleKeyPress = (
//           e: NativeSyntheticEvent<TextInputKeyPressEventData>,
//           field: keyof DateOfBirth,
//           prevFieldRef?: React.RefObject<TextInput | null>
//       ) => {
//           // Check if the backspace key is pressed and the field is empty
//           if (e.nativeEvent.key === 'Backspace' && date[field].length === 0) {
//               // Move focus to the previous field if it exists
//               prevFieldRef?.current?.focus();
//           }
//       };

//   return (
//     <View>
//       <Text style={[styles.label, globalstyle.text_16_reg_100]}>Date of Birth</Text>
//             <View style={styles.dateContainer}>
//                 <TextInput
//                     ref={dayInputRef}
//                     style={[styles.input, globalstyle.border, { maxWidth: 66, borderColor: isValid.day ? '#E7E7E7' : 'red' }]}
//                     placeholder="Day"
//                     placeholderTextColor={color.charcol50}
//                     value={date.day}
//                     onChangeText={(value) => handleInputChange('day', value, monthInputRef)}
//                     onKeyPress={(e) => handleKeyPress(e, 'day')} 
//                     keyboardType="numeric"
//                     maxLength={2} 
//                 />
//                 <TextInput
//                     ref={monthInputRef}
//                     style={[styles.input, globalstyle.border, { maxWidth: 85, borderColor: isValid.month ? '#E7E7E7' : 'red' }]}
//                     placeholder="Month"
//                     placeholderTextColor={color.charcol50}
//                     value={date.month}
//                     onChangeText={(value) => handleInputChange('month', value, yearInputRef)}
//                     onKeyPress={(e) => handleKeyPress(e, 'month', dayInputRef)}
//                     keyboardType="numeric"
//                     maxLength={2} 

//                 />

//                 <TextInput
//                     ref={yearInputRef}
//                     style={[styles.input, globalstyle.border, { maxWidth: 140, borderColor: isValid.year ? '#E7E7E7' : 'red' }]}
//                     placeholder="Year"
//                     placeholderTextColor={color.charcol50}
//                     value={date.year}
//                     onChangeText={(value) => handleInputChange('year', value)}
//                     onKeyPress={(e) => handleKeyPress(e, 'year', monthInputRef)} 
//                     keyboardType="numeric"
//                     maxLength={4} 

//                 />
//             </View>
//     </View>
//   );
// };

// // Styles for the component
// const styles = StyleSheet.create({
//     dateContainer: {
//         flexDirection: 'row',
//         gap: 12,
//         marginBottom: 24,
//     },
//     input: {
//         borderRadius: 8,
//         padding: 18,
//         textAlign: 'center',
//         width: "100%"
//     },
//     label: {
//         marginBottom: 8.5,
//     },
// });

// export default DateOfBirthInput;

import color, { globalstyle } from '@/styles/global';
import { colors } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard } from 'react-native';

// Define the type for the date state
interface DateOfBirth {
    day: string;
    month: string;
    year: string;
}
interface ValidityState {
    day: boolean;
    month: boolean;
    year: boolean;
}

const DateOfBirthInput: React.FC = () => {

    // State to store the date values
    const [date, setDate] = useState<DateOfBirth>({
        day: '',
        month: '',
        year: '',
    });

    // State to track the validity of each field
    const [isValid, setIsValid] = useState<ValidityState>({
        day: true,
        month: true,
        year: true,
    });

    // Refs for the TextInput components, explicitly allowing null
    const dayInputRef = useRef<TextInput | null>(null);
    const monthInputRef = useRef<TextInput | null>(null);
    const yearInputRef = useRef<TextInput | null>(null);

    // Regex patterns for validation
    const dayRegex = /^(0?[1-9]|[12][0-9]|3[01])$/; // 1-31
    const monthRegex = /^(0?[1-9]|1[0-2])$/; // 1-12
    const yearRegex = /^(19[0-9]{2}|20[0-1][0-9]|202[0-5])$/; // 1900-2025

    // Handle input change for each field with validation and auto-focus forward
    const handleInputChange = (
        field: keyof DateOfBirth,
        value: string,
        nextFieldRef?: React.RefObject<TextInput | null>
    ) => {
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            // Update the state with the input value, even if invalid
            setDate((prev) => ({
                ...prev,
                [field]: value,
            }));

            // Validate the input based on the field
            let isFieldValid = true;

            if (value.length > 0) { // Only validate if there's a value
                if (field === 'day' && value.length === 2) {
                    isFieldValid = dayRegex.test(value);
                } else if (field === 'month' && value.length === 2) {
                    isFieldValid = monthRegex.test(value);
                } else if (field === 'year' && value.length === 4) {
                    isFieldValid = yearRegex.test(value);
                } else {
                    // If the field is not fully filled, consider it valid (no red color yet)
                    isFieldValid = true;
                }
            }

            // Update the validity state for the field
            setIsValid((prev) => ({
                ...prev,
                [field]: isFieldValid,
            }));

            // Auto-focus the next field only if the current field is valid and reaches its max length
            if (nextFieldRef && value.length === (field === 'year' ? 4 : 2) && isFieldValid) {
                nextFieldRef.current?.focus();
            }

            // Hide keyboard if all fields are filled and valid
            if (
                field === 'year' &&
                value.length === 4 &&
                isFieldValid &&
                date.day.length === 2 &&
                isValid.day &&
                date.month.length === 2 &&
                isValid.month
            ) {
                Keyboard.dismiss();
            }
        }
    };

    // Handle backspace key press for backward navigation
    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        field: keyof DateOfBirth,
        prevFieldRef?: React.RefObject<TextInput | null>
    ) => {
        // Check if the backspace key is pressed and the field is empty
        if (e.nativeEvent.key === 'Backspace' && date[field].length === 0) {
            // Move focus to the previous field if it exists
            prevFieldRef?.current?.focus();
        }
    };

    const { isDarkMode } = useTheme();
    const InputTextColor = isDarkMode ? colors.white : colors.charcol50
    return (
        <View>
            <Text style={[styles.label, globalstyle.text_16_reg_100]}>Date of Birth</Text>
            <View style={styles.dateContainer}>
                <TextInput
                    ref={dayInputRef}
                    style={[styles.input, globalstyle.border, { maxWidth: 66, borderColor: isValid.day ? '#E7E7E7' : 'red', color: InputTextColor }]}
                    placeholder="Day"
                    placeholderTextColor={InputTextColor}
                    value={date.day}
                    onChangeText={(value) => handleInputChange('day', value, monthInputRef)}
                    onKeyPress={(e) => handleKeyPress(e, 'day')}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    ref={monthInputRef}
                    style={[styles.input, globalstyle.border, { maxWidth: 85, borderColor: isValid.month ? '#E7E7E7' : 'red', color: InputTextColor }]}
                    placeholder="Month"
                    placeholderTextColor={InputTextColor}
                    value={date.month}
                    onChangeText={(value) => handleInputChange('month', value, yearInputRef)}
                    onKeyPress={(e) => handleKeyPress(e, 'month', dayInputRef)}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    ref={yearInputRef}
                    style={[styles.input, globalstyle.border, { maxWidth: 140, borderColor: isValid.year ? '#E7E7E7' : 'red', color: InputTextColor }]}
                    placeholder="Year"
                    placeholderTextColor={InputTextColor}
                    value={date.year}
                    onChangeText={(value) => handleInputChange('year', value)}
                    onKeyPress={(e) => handleKeyPress(e, 'year', monthInputRef)}
                    keyboardType="numeric"
                    maxLength={4}
                />
            </View>
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    input: {
        borderRadius: 8,
        padding: 18,
        textAlign: 'center',
        width: '100%',
    },
    label: {
        marginBottom: 8.5,
    },
});

export default DateOfBirthInput;
