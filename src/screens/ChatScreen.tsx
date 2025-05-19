// import ChatHeader from '@/component/ChatHeader';
// import React, { useState, useCallback, useEffect } from 'react';
// import {
//     View,
//     StyleSheet,
//     Keyboard,
//     Image,
//     TouchableOpacity,
//     Text,
// } from 'react-native';
// import {
//     GiftedChat,
//     IMessage,
//     Bubble,
//     Send,
//     InputToolbar,
//     Message,
// } from 'react-native-gifted-chat';
// import { GiftedChatProps } from 'react-native-gifted-chat/lib/GiftedChat/types';
// import uuid from 'react-native-uuid';

// const ChatScreen: React.FC = () => {


//     const [messages, setMessages] = useState<IMessage[]>([]);
//     const [keyboardHeight, setKeyboardHeight] = useState(0);
//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
//             setKeyboardHeight(e.endCoordinates.height);
//         });
//         const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
//             setKeyboardHeight(0);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);
//     useEffect(() => {
//         setMessages([
//             {
//                 _id: uuid.v4() as string,
//                 text: 'Hello! How can I help you today?',
//                 createdAt: new Date(),
//                 user: {
//                     _id: 2,
//                     name: 'Support',
//                     avatar: 'https://i.pravatar.cc/150?img=68',
//                 },
//             },
//         ]);
//     }, []);

//     const onSend = useCallback((newMessages: IMessage[] = []) => {
//         setMessages(prev => GiftedChat.append(prev, newMessages));
//     }, []);

//     const renderBubble = (props: any) => (
//         <Bubble
//             {...props}

//             wrapperStyle={{
//                 right: { backgroundColor: color.purple40, padding: 8, borderRadius: 20, borderBottomRightRadius: 0 },
//                 left: { backgroundColor: color.charcol05, padding: 8, borderRadius: 20, borderBottomLeftRadius: 0 },
//             }}
//             textStyle={{
//                 right: { color: color.white, fontSize: 14, fontWeight: "400", },
//                 left: { color: color.charcol40, fontSize: 14, fontWeight: "400", },
//             }}
//             renderTime={renderTime}
//         />
//     );

//     const renderSend = (props: any) => (
//         <View style={{ flexDirection: "row", alignItems: 'center', gap: 10 }}>
//             <TouchableOpacity
//                 onPress={() => {
//                     console.log('Emoji icon pressed');
//                 }}>
//                 <Image
//                     source={require('@/assets/icons/emoji.png')} // Replace with your emoji icon path
//                     style={{ width: 24, height: 24 }}
//                 />
//             </TouchableOpacity>
//             <Send {...props}>
//                 <View>
//                     <Image source={require('@/assets/icons/sendmessage.png')} style={[{ width: 24, height: 24 }]} />
//                 </View>
//             </Send>
//         </View>
//     );

//     const renderInputToolbar = (props: any) => (
//         <InputToolbar
//             {...props}
//             containerStyle={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 0, gap: 10 }}
//             primaryStyle={{
//                 alignItems: 'center',
//                 borderRadius: 44,
//                 borderWidth: 1,
//                 borderColor: color.charcol10,
//                 flexDirection: "row",
//                 padding: 10,
//                 justifyContent: "space-between",
//                 marginBottom: 10
//             }}
//         />
//     );

//     const renderActions = (props: any) => (
//         <TouchableOpacity
//             onPress={() => {
//                 console.log('Attachment icon pressed');
//             }}
//         >
//             <Image
//                 source={require('@/assets/icons/add.png')} // Replace with your icon path
//                 style={{ width: 24, height: 24 }}
//             />
//         </TouchableOpacity>
//     );

//     const renderAvatar = (props: any) => {
//         // Sirf dusre user ka avatar dikhana ho to yeh use karo
//         if (props.currentMessage.user._id === 1) {
//             return null; // agar apna avatar nahi dikhana chahte
//         }
//         return (
//             <Image
//                 source={{ uri: props.currentMessage.user.avatar }}
//                 style={{
//                     width: 52,
//                     height: 52,
//                     borderRadius: 100,
//                     borderWidth: 2,
//                     borderColor: color.charcol10, // Custom border color
//                 }}
//             />
//         );
//     };

//     const renderMessage = (props: any) => {
//         return (
//             <View style={{ marginVertical: 12 }}> {/* Customize the vertical gap here */}
//                 <Message {...props} />
//             </View>
//         );
//     };


//     const renderTime = (props: any) => {
//         return (
//             <View style={{ alignSelf: props.position === 'right' ? 'flex-end' : 'flex-start' }}>
//                 <Text style={{
//                     fontSize: 10,
//                     color: props.position === 'right' ? color.white : color.charcol40, // your custom color
//                     fontWeight: '400',
//                 }}>
//                     {props.currentMessage.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })}
//                 </Text>
//             </View>
//         );
//     };


//     return (
//         <View style={[styles.container]}>
//             <ChatHeader
//                 title="Emma"
//                 isGroup={false}
//                 status="Online • 10 Minutes ago"
//                 onOptions={() => console.log('More Options')}
//             />
//             <GiftedChat
//                 {...({
//                     messages,
//                     onSend,
//                     user: { _id: 1, name: 'You' },
//                     placeholder: 'Search',
//                     renderBubble,
//                     renderActions,
//                     renderSend,
//                     renderInputToolbar,
//                     renderMessage,
//                     renderTime,
//                     alwaysShowSend: true,
//                     scrollToBottom: true,
//                     renderAvatar,
//                     textInputProps: {
//                         multiline: true,
//                         scrollEnabled: true,
//                         numberOfLines: 3,
//                         style: {
//                             maxHeight: 80,
//                             flex: 1,
//                             fontSize: 16, // Customize font size
//                             color: color.charcol50, // Customize font color
//                             fontWeight: '400', // Optional: Set font weight
//                         },
//                     },
//                     listViewProps: {
//                         contentContainerStyle: {
//                             paddingBottom: keyboardHeight, // 👈 Yeh messages ke "top" mein dikhega due to inverted list
//                         },
//                     }
//                 } as unknown) as GiftedChatProps<IMessage>}
//             />
//             {/* <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             >
//             </KeyboardAvoidingView> */}
//         </View>
//     );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 20,
//         width: "100%"
//     },
// });

import React from 'react'
import { Text } from 'react-native'

const ChatScreen = () => {
  return (
    <>
      <Text>ChatScreen</Text>
    </>
  )
}

export default ChatScreen
