
import React from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/styles/globaltheme';

const OTP = () => {
    
    return (
        <View style={{ flexDirection: 'column' }}>
            <OtpInput
                numberOfDigits={4}
                focusColor={colors.charcol100}
                onTextChange={(text) => console.log(text)}
                autoFocus={false}
                placeholder="------"
                type="numeric"
                theme={{
                    pinCodeTextStyle: {
                        color: colors.black,
                        fontSize: 16,
                        fontWeight: '400',
                        lineHeight: 20,
                    },
                    pinCodeContainerStyle: {
                        backgroundColor: colors.red,
                        borderWidth: 0.5,
                        borderColor: colors.green,
                        width: 40,
                        height: 40,
                    },
                    containerStyle: { gap: 10, flexDirection: 'row', justifyContent: 'center' },
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default OTP;