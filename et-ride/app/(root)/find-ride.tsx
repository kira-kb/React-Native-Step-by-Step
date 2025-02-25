import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "../../store";
import RideLayout from "../../components/RideLayout";
import OSMTextInput from "../../components/OSMTextInput";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">Form</Text>
        <OSMTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <OSMTextInput
          icon={icons.target}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Find now"
        onPress={() => router.push("/(root)/confirm-ride")}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
