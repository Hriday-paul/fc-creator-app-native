import HomeHeader from '@/components/Screens/User/Home/HomeHeader';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <ScrollView contentContainerClassName="px-6 pt-4 pb-28">
                <HomeHeader />

                <View className="mt-8 rounded-2xl bg-primary/10 p-6">
                    <Text className="text-lg font-app-semibold text-slate-900">Get started</Text>
                    <Text className="text-sm font-app text-slate-500 mt-1">
                        Your FC Creator content will appear here.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
