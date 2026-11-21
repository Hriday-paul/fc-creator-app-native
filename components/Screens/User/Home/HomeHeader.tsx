import { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeHeader() {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
                <Image
                    source={user?.picture?.url ? { uri: user.picture.url } : require('@/assets/images/empty-user.png')}
                    style={{ width: 44, height: 44, borderRadius: 22 }}
                />
                <View>
                    <Text className="text-sm text-gray-500 font-app">Welcome back</Text>
                    <Text className="text-lg text-gray-900 font-app-semibold">{user?.name ?? 'Guest'}</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.push('/(common)/notification')}
                className="w-11 h-11 rounded-full bg-gray-100 items-center justify-center"
            >
                <Ionicons name="notifications-outline" size={22} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    );
}
