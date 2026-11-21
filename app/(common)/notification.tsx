import Appbar from '@/components/Shared/Appbar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white px-6 pt-2">
            <Appbar title="Notifications" />

            <View className="flex-1 items-center justify-center">
                <Ionicons name="notifications-off-outline" size={48} color="#9CA3AF" />
                <Text className="text-base font-app text-gray-500 mt-3">No notifications yet</Text>
            </View>
        </SafeAreaView>
    );
}
