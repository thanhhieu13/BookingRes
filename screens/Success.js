import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from 'react-native';

const Success = () => {
    const navigation = useNavigation();
    const navigateToHome = () => {
        
        navigation.navigate('Home');
      };
  return (
    <View>
      <Text>Order thành công</Text>
      <Text>turn back to home</Text>
      <Button title="Quay về trang chủ" onPress={navigateToHome} />
    </View>
  )
}

export default Success
