// import React, { useState } from 'react';
// import { Modal, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
// import Button from '../Button';
// import { AroundMeFilterModalProps } from '@/types/type';
// import color, { globalstyle } from '@/styles/global';
// import { colors, getGlobalStyles } from '@/styles/globaltheme';
// import { useTheme } from '@/ThemeContext';



// /**
//  * @function AroundMeFilterModal
//  * @description A modal component for filtering house party categories with multiple selection capability.
//  * @param {AroundMeFilterModalProps} props - The props for the modal component.
//  * @returns {JSX.Element} The rendered modal component.
//  */
// const AroundMeFilterModal = ({ onClose, options }: AroundMeFilterModalProps) => {

//     // State to track the currently selected option (single selection).
//     const [selectedOption, setSelectedOption] = useState<string | null>(null); // Single selection state





//     // Handles the selection or deselection of a filter option. Toggles the selection state.
//     const handleSelect = (option: string) => {
//         setSelectedOption(prev => (prev === option ? null : option)); // Toggle selection
//     };

//     /**
//  * @function clearSelection
//  * @description Resets the selected option to null, clearing the current selection.
//  */
//     const clearSelection = () => {
//         setSelectedOption(null);
//     };
//  const globalstyle = getGlobalStyles();
// const { isDarkMode } = useTheme();
//     return (
//         <Modal transparent visible animationType="fade" onRequestClose={onClose}>
//             <TouchableOpacity
//                 style={styles.modalOverlay}
//                 activeOpacity={1}
//                 onPress={onClose} // Close only when clicking outside
//             >
//                 <TouchableOpacity
//                     activeOpacity={1} // Prevents closing when clicking inside modal content
//                              style={[styles.modalContent,globalstyle.container]}
//                     onPress={(e) => e.stopPropagation()} // Stop propagation to overlay
//                 >
//                     <View style={{
//                         flexDirection: "row", alignItems: "center", justifyContent: "space-between",
//                         marginBottom: 16,
//                     }}>

//                         <Text style={[styles.modalTitle, globalstyle.text_20_bold_90]}>Filter</Text>
//                         <TouchableOpacity onPress={onClose}>
//                    <Image source={require("@/assets/icons/close.png")} style={{ width: 20, height: 20,tintColor: isDarkMode ? colors.white : colors.black }} />
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.filterOptions}>
//                         {options?.map((option, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[
//                                     styles.optionButton,
//                                     selectedOption === option? isDarkMode? {backgroundColor:color.purple50}:{backgroundColor:colors.purple50}:isDarkMode?{backgroundColor:colors.charcol90}:{backgroundColor:colors.charcol05},
//                                 ]}
//                                 onPress={() => handleSelect(option)}
//                             >
//                                 <Text
//                                     style={[
//                                         globalstyle.text_16_med_90,
//                                         selectedOption === option && styles.selectedText,
//                                     ]}
//                                 >
//                                     {option}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                     <View style={{ flexDirection: "column", gap: 8 }}>
//                         <Button title='Apply' />
//                         <Button onPress={clearSelection} title="Clear All" variant="outlined" />
//                     </View>
//                 </TouchableOpacity>
//             </TouchableOpacity>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         width: '90%',
//         borderRadius: 20,
//         padding: 24,
//     },
//     modalTitle: {
//         textAlign: "left",
//     },
//     filterOptions: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'flex-start',
//         marginBottom: 36,
//     },
//     optionButton: {
//         paddingVertical: 8,
//         paddingHorizontal: 22,
//         borderRadius: 20,
//         margin: 5,
//     },
//     selectedButton: {
//         backgroundColor: color.purple50, // Purple for selection
//     },
//     selectedText: {
//         color: color.white, // White text for selected button
//     },
// });

// export default AroundMeFilterModal;

// import React, { useState } from 'react';
// import { Modal, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
// import Button from '../Button';
// import { colors, getGlobalStyles } from '@/styles/globaltheme';
// import { useTheme } from '@/ThemeContext';

// // Update props type to include onApply callback
// type AroundMeFilterModalProps = {
//   onClose: () => void;
//   onApply: (radius: number | null) => void; // Callback to pass selected radius
//   options: string[]; // e.g., ["500", "1000", "2000", "5000"]
// };

// const AroundMeFilterModal = ({ onClose, onApply, options }: AroundMeFilterModalProps) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const { isDarkMode } = useTheme();
//   const globalstyle = getGlobalStyles();

//   // Handle selection or deselection of a filter option
//   const handleSelect = (option: string) => {
//     setSelectedOption(prev => (prev === option ? null : option));
//   };

//   // Clear selection
//   const clearSelection = () => {
//     setSelectedOption(null);
//   };

//   // Handle Apply button press
//   const handleApply = () => {
//     onApply(selectedOption ? parseInt(selectedOption) : null); // Convert to number or pass null
//     onClose(); // Close modal
//   };

//   return (
//     <Modal transparent visible animationType="fade" onRequestClose={onClose}>
//       <TouchableOpacity
//         style={styles.modalOverlay}
//         activeOpacity={1}
//         onPress={onClose}
//       >
//         <TouchableOpacity
//           activeOpacity={1}
//           style={[styles.modalContent, globalstyle.container]}
//           onPress={(e) => e.stopPropagation()}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               marginBottom: 16,
//             }}
//           >
//             <Text style={[styles.modalTitle, globalstyle.text_20_bold_90]}>Filter Radius</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Image
//                 source={require('@/assets/icons/close.png')}
//                 style={{ width: 20, height: 20, tintColor: isDarkMode ? colors.white : colors.black }}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.filterOptions}>
//             {options.map((option, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.optionButton,
//                   selectedOption === option
//                     ? isDarkMode
//                       ? { backgroundColor: colors.purple50 }
//                       : { backgroundColor: colors.purple50 }
//                     : isDarkMode
//                     ? { backgroundColor: colors.charcol90 }
//                     : { backgroundColor: colors.charcol05 },
//                 ]}
//                 onPress={() => handleSelect(option)}
//               >
//                 <Text
//                   style={[
//                     globalstyle.text_16_med_90,
//                     selectedOption === option && styles.selectedText,
//                   ]}
//                 >
//                   {option} m
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View style={{ flexDirection: 'column', gap: 8 }}>
//             <Button title="Apply" onPress={handleApply} />
//             <Button onPress={clearSelection} title="Clear All" variant="outlined" />
//           </View>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '90%',
//     borderRadius: 20,
//     padding: 24,
//   },
//   modalTitle: {
//     textAlign: 'left',
//   },
//   filterOptions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start',
//     marginBottom: 36,
//   },
//   optionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 22,
//     borderRadius: 20,
//     margin: 5,
//   },
//   selectedText: {
//     color: colors.white,
//   },
// });

// export default AroundMeFilterModal;

import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Button from '../Button';
import { colors, getGlobalStyles } from '@/styles/globaltheme';
import { useTheme } from '@/ThemeContext';

// Update props type
type AroundMeFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (radius: number | null) => void;
  onClear: () => void; // New callback for clearing selection
  selectedRadius: number | null; // Current selected radius from parent
  options: string[];
};

const AroundMeFilterModal = ({
  visible,
  onClose,
  onApply,
  onClear,
  selectedRadius,
  options,
}: AroundMeFilterModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedRadius ? selectedRadius.toString() : null
  );
  const { isDarkMode } = useTheme();
  const globalstyle = getGlobalStyles();

  // Sync selectedOption with selectedRadius when modal opens
  useEffect(() => {
    setSelectedOption(selectedRadius ? selectedRadius.toString() : null);
  }, [selectedRadius, visible]);

  // Handle selection or deselection
  const handleSelect = (option: string) => {
    setSelectedOption(prev => (prev === option ? null : option));
  };

  // Handle Apply button
  const handleApply = () => {
    onApply(selectedOption ? parseInt(selectedOption) : null);
  };

  // Handle Clear All button
  const clearSelection = () => {
    setSelectedOption(null);
    onClear(); // Notify parent to clear radius
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalContent, globalstyle.container]}
          onPress={(e) => e.stopPropagation()}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <Text style={[styles.modalTitle, globalstyle.text_20_bold_90]}>Filter Radius</Text>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('@/assets/icons/close.png')}
                style={{ width: 20, height: 20, tintColor: isDarkMode ? colors.white : colors.black }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option
                    ? isDarkMode
                      ? { backgroundColor: colors.purple50 }
                      : { backgroundColor: colors.purple50 }
                    : isDarkMode
                    ? { backgroundColor: colors.charcol90 }
                    : { backgroundColor: colors.charcol05 },
                ]}
                onPress={() => handleSelect(option)}
              >
                <Text
                  style={[
                    globalstyle.text_16_med_90,
                    selectedOption === option && styles.selectedText,
                  ]}
                >
                  {option} m
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'column', gap: 8 }}>
            <Button title="Apply" onPress={handleApply} />
            <Button onPress={clearSelection} title="Clear All" variant="outlined" />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    textAlign: 'left',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 36,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    margin: 5,
  },
  selectedText: {
    color: colors.white,
  },
});

export default AroundMeFilterModal;