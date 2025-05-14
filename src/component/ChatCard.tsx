import color, { globalstyle } from "@/styles/global";
import { ChatCardProps } from "@/types/type";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

/**
 * @typedef {Object} ChatCardProps
 * @property {Object} item - The chat item data.
 * @property {string} item.id - Unique identifier for the chat.
 * @property {ImageSourcePropType} item.profileImage - Source of the profile image.
 * @property {string} item.name - Name of the chat participant or group.
 * @property {string} item.message - Latest message in the chat.
 * @property {string} item.timestamp - Time of the latest message.
 * @property {number} [item.notificationCount] - Number of unread notifications (optional).
 * @property {boolean} [item.isGroup] - Indicates if the chat is a group chat (optional).
 * @property {number} [item.memberCount] - Number of members in a group chat (optional).
 * @property {(item: ChatCardProps['item']) => void} onPress - Callback function triggered on chat press.
 */


/**
 * A chat card component displaying a user's profile, message preview, and notification info.
 * @param {ChatCardProps} props - The properties for configuring the chat card.
 * @returns {JSX.Element} A touchable chat card with profile image, message, and timestamp.
 */

const ChatCard: React.FC<ChatCardProps> = ({ item, onPress }) => {

    return (
        <TouchableOpacity key={item.id} style={styles.chatItem} onPress={() => onPress(item)}>
            <View style={styles.profileImageWrapper}>
                <Image source={item.profileImage} style={styles.profileImage} />
                <View style={styles.onlineDot} />
            </View>
            <View style={styles.chatInfo}>
                <Text style={globalstyle.text_16_bold_90}>{item.name}</Text>
                <View style={styles.messageRow}>
                    <Text style={[styles.messageText,globalstyle.text_14_reg_40]} numberOfLines={1}>
                        {item.message}
                    </Text>
                </View>
            </View>
            <View style={styles.rightSection}>
                <Text style={[styles.timestamp,globalstyle.text_12_reg_90]}>{item.timestamp}</Text>
                {item.notificationCount && (
                    <View style={styles.notificationBadge}>
                        <Text style={[globalstyle.text_12_reg_white]}>{item.notificationCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

// style sheet for above component

const styles = StyleSheet.create({
    chatListContainer: {
        flex: 1,
    },
    chatItem: {
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    profileImageWrapper: {
        position: 'relative',
        marginRight: 19,
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: color.charcol10
    },
    onlineDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: color.green,
        borderWidth: 2,
        borderColor: color.charcol10,
    },
    chatInfo: {
        flex: 1,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageText: {
        flexShrink: 1,
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    timestamp: {
        marginBottom: 7,
    },
    notificationBadge: {
        backgroundColor: color.purple50, // Purple
        borderRadius: 8,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatCard;
