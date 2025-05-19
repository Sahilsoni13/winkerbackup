import color, { globalstyle } from '@/styles/global';
import { colors } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    Keyboard,
} from 'react-native';

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

interface DateOfBirthInputProps {
    value: DateOfBirth;
    onChange: (value: DateOfBirth) => void;
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({ value, onChange }) => {
    const [isValid, setIsValid] = useState<ValidityState>({
        day: true,
        month: true,
        year: true,
    });

    const dayInputRef = useRef<TextInput | null>(null);
    const monthInputRef = useRef<TextInput | null>(null);
    const yearInputRef = useRef<TextInput | null>(null);

    const dayRegex = /^(0?[1-9]|[12][0-9]|3[01])$/;
    const monthRegex = /^(0?[1-9]|1[0-2])$/;
    const yearRegex = /^(19[0-9]{2}|20[0-1][0-9]|202[0-5])$/;

    const handleInputChange = (
        field: keyof DateOfBirth,
        fieldValue: string,
        nextFieldRef?: React.RefObject<TextInput | null>
    ) => {
        if (/^\d*$/.test(fieldValue)) {
            onChange({ ...value, [field]: fieldValue });

            let isFieldValid = true;

            if (fieldValue.length > 0) {
                if (field === 'day' && fieldValue.length === 2) {
                    isFieldValid = dayRegex.test(fieldValue);
                } else if (field === 'month' && fieldValue.length === 2) {
                    isFieldValid = monthRegex.test(fieldValue);
                } else if (field === 'year' && fieldValue.length === 4) {
                    isFieldValid = yearRegex.test(fieldValue);
                }
            }

            setIsValid((prev) => ({
                ...prev,
                [field]: isFieldValid,
            }));

            if (nextFieldRef && fieldValue.length === (field === 'year' ? 4 : 2) && isFieldValid) {
                nextFieldRef.current?.focus();
            }

            if (
                field === 'year' &&
                fieldValue.length === 4 &&
                isFieldValid &&
                value.day.length === 2 &&
                isValid.day &&
                value.month.length === 2 &&
                isValid.month
            ) {
                Keyboard.dismiss();
            }
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        field: keyof DateOfBirth,
        prevFieldRef?: React.RefObject<TextInput | null>
    ) => {
        if (e.nativeEvent.key === 'Backspace' && value[field].length === 0) {
            prevFieldRef?.current?.focus();
        }
    };

    const { isDarkMode } = useTheme();
    const InputTextColor = isDarkMode ? colors.white : colors.charcol50;

    return (
        <View>
            <Text style={[styles.label, globalstyle.text_16_reg_100, { color: isDarkMode ? colors.white : colors.black }]}>Date of Birth</Text>
            <View style={styles.dateContainer}>
                <TextInput
                    ref={dayInputRef}
                    style={[
                        styles.input,
                        globalstyle.border,
                        {
                            maxWidth: 66,
                            borderColor: isValid.day ? '#E7E7E7' : 'red',
                            color: InputTextColor,
                        },
                    ]}
                    placeholder="Day"
                    placeholderTextColor={InputTextColor}
                    value={value.day}
                    onChangeText={(val) => handleInputChange('day', val, monthInputRef)}
                    onKeyPress={(e) => handleKeyPress(e, 'day')}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    ref={monthInputRef}
                    style={[
                        styles.input,
                        globalstyle.border,
                        {
                            maxWidth: 85,
                            borderColor: isValid.month ? '#E7E7E7' : 'red',
                            color: InputTextColor,
                        },
                    ]}
                    placeholder="Month"
                    placeholderTextColor={InputTextColor}
                    value={value.month}
                    onChangeText={(val) => handleInputChange('month', val, yearInputRef)}
                    onKeyPress={(e) => handleKeyPress(e, 'month', dayInputRef)}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    ref={yearInputRef}
                    style={[
                        styles.input,
                        globalstyle.border,
                        {
                            maxWidth: 140,
                            borderColor: isValid.year ? '#E7E7E7' : 'red',
                            color: InputTextColor,
                        },
                    ]}
                    placeholder="Year"
                    placeholderTextColor={InputTextColor}
                    value={value.year}
                    onChangeText={(val) => handleInputChange('year', val)}
                    onKeyPress={(e) => handleKeyPress(e, 'year', monthInputRef)}
                    keyboardType="numeric"
                    maxLength={4}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        gap: 12,
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
