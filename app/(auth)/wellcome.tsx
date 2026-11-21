import Button from '@/components/Shared/Button';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white px-6">
            <View className="flex-1 items-center justify-center">
                <Image source={require('@/assets/images/logo.png')} style={{ width: 120, height: 120 }} contentFit="contain" />
                <Text className="text-3xl font-app-bold text-slate-900 text-center mt-8">
                    FC Creator
                </Text>
                <Text className="text-base font-app text-slate-500 text-center mt-3 px-4">
                    Create, manage and share — all in one place.
                </Text>
            </View>

            <View className="gap-3 pb-6">
                <Button title="Login" onPress={() => router.push('/(auth)/login')} />
                <Button title="Create Account" variant="outline" onPress={() => router.push('/(auth)/register')} />
            </View>
        </SafeAreaView>
    );
}
