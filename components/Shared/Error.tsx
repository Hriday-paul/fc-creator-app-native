import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ErrorState({
    title = 'Something went wrong',
    message = 'An unexpected error occurred. Please try again.',
    onRetry,
}: {
    title?: string;
    message?: string;
    onRetry?: () => void;
}) {
    return (
        <View className="flex-1 items-center justify-center px-6 py-10">
            <View className="w-16 h-16 rounded-full bg-red-100 items-center justify-center mb-4">
                <Feather name="alert-circle" size={32} color="#dc2626" />
            </View>

            <Text className="text-lg font-app-semibold text-gray-900 text-center mb-2">
                {title}
            </Text>

            <Text className="text-sm font-app text-gray-500 text-center mb-6">
                {message}
            </Text>

            {onRetry && (
                <Pressable
                    onPress={onRetry}
                    className="flex-row items-center gap-2 bg-red-600 px-5 py-3 rounded-xl active:opacity-80"
                >
                    <Feather name="refresh-cw" size={18} color="#fff" />
                    <Text className="text-white font-app-semibold">Try Again</Text>
                </Pressable>
            )}
        </View>
    );
}
