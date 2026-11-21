import { RootState } from "@/redux/store";
import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const ACTIVE_COLOR = colors.primary;
const INACTIVE_COLOR = colors.muted;

type IoniconName = keyof typeof Ionicons.glyphMap;

const TabIcon = ({ focused, icon }: { focused: boolean; icon: IoniconName }) => (
  <View className="items-center justify-center">
    <Ionicons
      name={focused ? icon : (`${icon}-outline` as IoniconName)}
      color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
      size={25}
    />
    {focused && <View className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />}
  </View>
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Guard: logged-out users (e.g. after a failed token refresh) go back to auth
  if (!accessToken) return <Redirect href="/(auth)/wellcome" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70 + insets.bottom,
          paddingTop: 12,
          // Push content above the system nav bar / home indicator
          paddingBottom: insets.bottom,
          elevation: 12,
          backgroundColor: "white",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="home" /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="person" /> }}
      />
    </Tabs>
  );
}
