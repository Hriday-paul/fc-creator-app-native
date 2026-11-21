import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Appbar({ title }: { title: string }) {
    const router = useRouter();

    return (
        <View className="flex-row items-center bg-white h-10">
            {/* Centered title (rendered first so the back button stays tappable on top) */}
            <View className="absolute left-0 right-0 items-center">
                <Text className="text-xl font-app-semibold text-gray-900">
                    {title}
                </Text>
            </View>

            {router.canGoBack() && (
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-md border border-gray-200 items-center justify-center"
                >
                    <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            )}
        </View>
    );
}
