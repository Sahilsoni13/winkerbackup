
import React from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { StyleSheet, View } from 'react-native';
import color from '@/styles/global';

const OTP = () => {
    
    return (
        <View style={{ flexDirection: 'column' }}>
            <OtpInput
                numberOfDigits={4}
                focusColor={color.charcol100}
                onTextChange={(text) => console.log(text)}
                autoFocus={false}
                placeholder="------"
                type="numeric"
                theme={{
                    pinCodeTextStyle: {
                        color: color.black,
                        fontSize: 16,
                        fontWeight: '400',
                        lineHeight: 20,
                    },
                    pinCodeContainerStyle: {
                        backgroundColor: color.red,
                        borderWidth: 0.5,
                        borderColor: color.green,
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