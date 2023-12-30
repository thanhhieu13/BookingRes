import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import PopUp from "../components/PopUp";

const BottomSheetTest = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "55%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const status = [
    "Tất cả",
    "Chờ xác nhận",
    " Đã tiếp nhận",
    "Hoàn thành",
    "Đã hủy",
  ];

  return (
    <View style={styles.container}>
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.5} />
        )}
      >
        <View className="flex-row">
          <View className="w-2/3 flex-row items-center justify-between">
            <View className="p-4">
              <Feather name="x" size={24} color="black" />
            </View>
            <Text className="text-lg">Chọn trạng thái</Text>
          </View>
          <View className="w-2/4"></View>
        </View>
        <BottomSheetScrollView style={styles.contentContainer}>
          {status.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <Text>{item}</Text>
            </View>
          ))}
        </BottomSheetScrollView>
        <PopUp buttonText="Xác nhận" />
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: 'grey',
  },
  contentContainer: {
    // flex: 1,
    backgroundColor: "#ffffff",
    // alignItems: "center",
  },
});

export default BottomSheetTest;
