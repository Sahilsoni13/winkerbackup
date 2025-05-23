import { Ref } from "react";
import { ImageSourcePropType, KeyboardTypeOptions, StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface ChatItem {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  profileImage: ImageSourcePropType;
  notificationCount?: number;
  isGroup?: boolean;
  memberCount?: number;
}

export interface ChatCardProps {
  item: ChatItem;
  onPress: (chat: ChatItem) => void;
}


// ============================================================

type Variant = "primary" | "outlined" | "ghost";

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: object;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  isLoading?: boolean;
  variant?: Variant;
  leftIconStyle?: object;
  titleStyle?: object
}
// ============================================================




export interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
  color?: string;
  bordercolor?: string
}



export interface HeaderProps {
  title?: string;
  rightIcon?: ImageSourcePropType;
  onRightPress?: () => void;
  customback?: () => void
}




export interface CustomInputProps extends TextInputProps {
  label?: string;
  leftIcon?: ImageSourcePropType;  // Left-side image (optional)
  rightIcon?: ImageSourcePropType; // Right-side image (optional)
  secureTextEntry?: boolean;
  labelStyle?: TextStyle; // Custom label styles
  inputStyle?: TextStyle; // Custom input field styles
  containerStyle?: ViewStyle; // Custom container styles
  type?: KeyboardTypeOptions | undefined,
  ref?: Ref<TextInput>;
  error?: string;
}



export interface ToggleProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}


/**
 * @typedef {Object} HousePartyCardProps
 * @property {string} name - The name of the house party group.
 * @property {string} location - The location details of the house party.
 * @property {ImageSourcePropType} image - The image associated with the house party.
 */

export interface HousePartyCardProps {
  name: string;
  location: string;
  image: ImageSourcePropType;
}

/**
* @typedef {Object} AroundMeCardProps
* @property {string} name - The name of the person.
* @property {number} age - The age of the person.
* @property {string} location - The location details.
* @property {ImageSourcePropType} image - The profile image of the person.
*/

export interface AroundMeCardProps {
  name?: string;
  age: number;
  location: string;
  image?: ImageSourcePropType;
  firstName?:string;
  receiverId?:string
};
export interface WinkReceiveCardProps {
  id:string,
  name?: string;
  age: number;
  location: string;
  image?: ImageSourcePropType;
  firstName?:string;
  senderId?:string;
  isAccepted?:boolean;
  status?:string
};


// Define types for props (TypeScript)  
export interface OnboardingStepProps {
  onNext: () => void;
}


// Define the props interface for the AnimatedCircle component
export interface AnimatedCircleProps {
  number: string; // The number to display inside the circle (e.g., "9" or "8")
}



export interface PulseViewProps {
  style: StyleProp<ViewStyle>; // Style prop for the view
}






export interface ChatHeaderProps {
  title: string;
  isGroup: boolean;
  status: string;
  peopleCount?: number;
  onOptions: () => void;
}


// =========


export type IconName = 'Explore' | 'Chats' | 'Winks' | 'Games' | 'Settings';


/**
 * @typedef {Object} CustomIconProps
 * @property {IconName} name - The name of the icon to display.
 * @property {number} size - The size of the icon.
 * @property {boolean} focused - Determines if the dark or light icon should be displayed.
 */

export interface CustomIconProps {
  name: IconName;
  size: number;
  focused: boolean;
}


// ========




export interface DropdownProps {
  options: string[];
  defaultValue?: string;
  onSelect: (value: string) => void;
}



export interface DropdownFeatureProps {
  iconSource: ImageSourcePropType;
  title: string;
  description: string;
  option: string[],
  defaultvalue: string
}


/**
 * @typedef {Object} Feature
 * @property {string} name - The name of the feature.
 * @property {string} free - Indicates if the feature is available for free users (typically "—" if not available).
 * @property {boolean} premium - Indicates if the feature is available for premium users.
 */

export interface Feature {
  name: string;
  free: string | boolean;
  premium: boolean;
}




export interface GameCardProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  screenName: string;
}




export interface NotificationToggleProps {
  iconSource: ImageSourcePropType;
  title: string;
  description: string;
  onToggle?: (enabled: boolean) => void; // 👈 Optional callback
  isEnabled: boolean;        // 👈 state from parent
}



export interface SecurityToggleProps {
  iconSource: ImageSourcePropType;
  title: string;
  description: string;
  buttonText: string,
  onPress: () => void;
}





/**
 * Interface for CircularProgressAnimation component props.
 */
export interface CircularProgressProps {
  /**
   * Width of the background stroke.
   * @default 8
   */
  strokeWidth?: number;

  /**
   * Width of the animated progress stroke.
   * @default 8
   */
  progressWidth?: number;

  /**
   * Progress value (percentage) to animate to.
   * @default 80
   */
  progressValue?: number;

  /**
   * Duration of the progress animation in milliseconds.
   * @default 2000
   */
  duration?: number;

  /**
   * Determines the direction of the progress animation.
   * If true, the progress moves clockwise; otherwise, it moves counterclockwise.
   * @default true
   */
  clockwise?: boolean;
}




export interface PopupProps {
  visible: boolean;
  onClose: () => void;
  callback: () => void;
  success?: boolean
}

// Define the type for the images object
export interface GameImages {
  ROCK: ImageSourcePropType;
  PAPER: ImageSourcePropType;
  SCISSORS: ImageSourcePropType;
}

export interface HousePartyFilterModalProps {
  onClose: () => void;
  options?: string[];
}

export interface AroundMeFilterModalProps {
  onClose: () => void;
  options?: string[];
}





export interface Message {
  id: string;
  text: string;
  sender: "me" | "other"; // Union type for sender
  time: string;
  status?: "seen" | "delivered"; // Optional status field with union type
}

export interface ChatBubbleProps {
  text: string;
  sender: string;
  status?: string;
  time: string;
  onPress: () => void
}




export type RootParamList = {
  AuthCheck: undefined;
  Login: undefined;
  Explore: undefined;
  CreateAccount: { email: string; password: string };
  // aur bhi jo screens hain wo add karo
};