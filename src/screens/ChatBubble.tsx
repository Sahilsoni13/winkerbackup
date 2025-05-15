import ChatHeader from "@/component/ChatHeader";
import HeaderBack from "@/component/HeaderBack";
import color, { globalstyle } from "@/styles/global";
import { colors, getGlobalStyles } from "@/styles/globaltheme";
import { useTheme } from "@/ThemeContext";
import { ChatBubbleProps, Message } from "@/types/type";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";


/**
 * @constant {Array} messages - Sample chat messages data
 * @type {Array<{ id: string, text: string, sender: string, time: string, status?: string }>}
 */
const messages: Message[] = [
  { id: "1", text: "Hey! How are you?", sender: "other", time: "10:00 AM" },
  { id: "2", text: "Hey! I'm good, what about you? Hey! I'm good, what about you?", sender: "me", time: "10:01 AM", status: "seen" },
  { id: "3", text: "Great! Any plans for today?", sender: "other", time: "10:02 AM" },
  { id: "4", text: "Nothing much, Heading to Eiffel Tower soon!", sender: "me", time: "10:03 AM", status: "delivered" },
  { id: "5", text: "Great! Any plans for today?", sender: "other", time: "10:04 AM" },
  { id: "6", text: "Nothing much, Heading to Eiffel Tower soon!", sender: "me", time: "10:05 AM", status: "seen" },
  { id: "7", text: "Great! Any plans for today?", sender: "other", time: "10:02 AM" },
  { id: "8", text: "Nothing much, Heading to Eiffel Tower soon!", sender: "me", time: "10:03 AM", status: "delivered" },
  { id: "9", text: "Great! Any plans for today?", sender: "other", time: "10:04 AM" },
  { id: "10", text: "Nothing much, Heading to Eiffel Tower soon!", sender: "me", time: "10:05 AM", status: "seen" },
];


/**
 * @function ChatBubble
 * @description A React component that renders a single chat message bubble with text, time, and status indicators.
 * @param {Object} props - The props for the ChatBubble component
 * @param {string} props.text - The message text
 * @param {string} props.sender - The sender of the message ("me" or "other")
 * @param {string} props.status - The status of the message ("seen", "delivered", etc.)
 * @param {string} props.time - The timestamp of the message
 * @returns {JSX.Element} The chat bubble component
 */


const ChatBubble = ({ text, sender, status, time, onPress }: ChatBubbleProps) => {



  const getTickColor = () => {
    if (status === "seen") return "green";
    if (status === "delivered") return "gray";
    return "gray";
  };


  return (
    <View
      style={{
        flexDirection: sender === "me" ? "row-reverse" : "row",
        alignItems: "center",
        // justifyContent:sender==="me"?"flex-end":"flex-start",
        gap: 8,
      }}
    >
      <TouchableOpacity style={{ display: sender === "me" ? "none" : "flex" }} onPress={onPress}>
        <Image
          style={{ width: 52, height: 52, }}
          source={require("@/assets/images/userimage.png")}
        />
      </TouchableOpacity>
      <View>
        <View
          style={{
            alignSelf: sender === "me" ? "flex-end" : "flex-start",
            backgroundColor: sender === "me" ? "#9B51E0" : "#F2F2F2",
            padding: 16,
            borderRadius: 20,
            borderBottomLeftRadius: sender === "me" ? 20 : 0,
            borderBottomRightRadius: sender === "me" ? 0 : 20,
          }}
        >
          <Text
            style={[sender === "me" ? globalstyle.text_14_reg_white : globalstyle.text_14_reg_40]}
          >
            {text}
          </Text>
        </View>
        <View
          style={{
            alignSelf: sender === "me" ? "flex-start" : "flex-end",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text style={[globalstyle.text_10_reg_40]}>{time}</Text>
          {sender === "me" && (
            <Image
              style={{
                width: 16,
                height: 16,
                resizeMode: "contain",
                tintColor: getTickColor(),
              }}
              source={require("@/assets/icons/seenmessage.png")}
            />
          )}
        </View>
      </View>
    </View>
  );
};

/**
 * @function ChatScreen
 * @description A React component that renders a chat screen with a header, message list, and input field for sending messages.
 * @returns {JSX.Element} The chat screen component
 */
const ChatScreen = () => {

  /**
   * @constant {string} messageText - State to store the text of the new message being typed
   */
  const [messageText, setMessageText] = useState<string>("");

  /**
   * @constant {Array} chatMessages - State to store the list of chat messages
   * @type {Array<{ id: string, text: string, sender: string, time: string, status?: string }>}
   */
  const [chatMessages, setChatMessages] = useState(messages);

  /**
   * @constant {number} keyboardHeight - State to track the height of the keyboard
   */
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  /**
   * @constant {boolean} isInputFocused - State to track whether the input field is focused
   */
  const [isInputFocused, setIsInputFocused] = useState(false);

  /**
   * @constant {React.RefObject<ScrollView>} scrollViewRef - Ref to the ScrollView for auto-scrolling to the bottom
   */
  const scrollViewRef = useRef<ScrollView>(null);

  /**
     * Effect hook to auto-scroll to the bottom of the chat when messages change
     */
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [chatMessages]);


  /**
   * Effect hook to handle keyboard show/hide events and adjust the layout
   */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsInputFocused(true)
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
      setIsInputFocused(false)
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  /**
   * Handles sending a new message and adding it to the chat
   */
  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const newMessage: Message = {
      id: (chatMessages.length + 1).toString(),
      text: messageText.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessageText("");
    Keyboard.dismiss(); // Dismiss keyboard after sending
  };

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
 const globalstyle = getGlobalStyles();
const { isDarkMode } = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Proper behavior for both platforms
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjusted offset for iOS
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{
          backgroundColor:isDarkMode ? colors.charcol100 : colors.white,
          flexGrow: 1,
          paddingBottom: keyboardHeight > 0 ? (isInputFocused ? 45 : 0) : (isInputFocused ? insets.bottom + 30 : 0), paddingHorizontal: 20
        }]}>
          {/* Header */}
          <ChatHeader
            title="Emma"
            isGroup={false}
            status="Online • 10 Minutes ago"
            onOptions={() => console.log('More Options')}
          />
          {/* Chat Messages */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            ref={scrollViewRef}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingTop: 24,
              // paddingBottom: 20,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {chatMessages?.map((item) => (
                <ChatBubble
                  onPress={() => navigation.navigate("UserDetails")}
                  key={item.id}
                  text={item.text}
                  sender={item.sender}
                  time={item.time}
                  status={item.status}
                />
              ))}
            </View>
          </ScrollView>
          <View style={{ paddingVertical: 10 }}>
            {/* Bottom Input Section */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 9,
                paddingHorizontal: 16,
                borderColor: color.charcol10,
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 44,
                justifyContent: "space-between",
                marginBottom: keyboardHeight > 0 ? 0 : (isInputFocused ? -40 : 0),
                backgroundColor: color.white
              }}
            >
              <TouchableOpacity>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/icons/add.png")}
                />
              </TouchableOpacity>

              <TextInput
                placeholder="Search"
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  // globalstyle.text_16_reg_50,
                }}
                placeholderTextColor={color.charcol50}
                value={messageText}
                onChangeText={(text) => setMessageText(text)}
                onSubmitEditing={handleSendMessage}
                multiline={true}
                numberOfLines={4}
                scrollEnabled
                textAlignVertical="center"
                onFocus={() => setIsInputFocused(true)} // Set focus true
                onBlur={() => setIsInputFocused(false)} // Set focus false
              />

              <TouchableOpacity>
                <Image
                  style={{ width: 24, height: 24, marginHorizontal: 10 }}
                  source={require("../assets/icons/emoji.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSendMessage}>
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/icons/sendmessage.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;