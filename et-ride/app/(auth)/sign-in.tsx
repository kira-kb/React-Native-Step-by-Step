import InputField from "../../components/inputField";
import CustomButton from "../../components/CustomButton";
import { icons, images } from "../../constants";
import { Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import OAuth from "../../components/OAuth";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[150px]" />
          <Text className="text-2xl text-black font-semibold absolute bottom-5 top-50">
            welcome 👋
          </Text>
        </View>

        <View className="p-4">
          <InputField
            label="email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />

          <CustomButton
            title="Sign In"
            className="mt-6"
            onPress={onSignInPress}
          />

          <OAuth />

          <Link
            href="/(auth)/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
