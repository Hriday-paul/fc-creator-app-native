// TODO(api): import ErrorState from '@/components/Shared/Error';
// TODO(api): import { baseApi } from '@/redux/apis/base.api';
// TODO(api): import { useMyProfileQuery } from '@/redux/apis/user.api';
import { logout } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { mockUser } from '@/utils/mockData';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    // TODO(api): const { data, isLoading, isError, refetch } = useMyProfileQuery();
    // TODO(api): const user = data?.data;
    const user = useSelector((state: RootState) => state.auth.user) ?? mockUser;

    const handleLogout = () => {
        dispatch(logout());
        // TODO(api): dispatch(baseApi.util.resetApiState());
        router.replace('/(auth)/welcome');
    };

    // TODO(api): restore loading / error states
    // if (isLoading) {
    //     return <View className="flex-1 items-center justify-center bg-white"><ActivityIndicator color="#3A86FF" /></View>;
    // }
    //
    // if (isError || !user) return <ErrorState onRetry={refetch} />;

    return (
        <SafeAreaView className="flex-1 bg-white px-6" edges={['top']}>
            <Text className="text-xl font-app-semibold text-gray-900 text-center mt-2">Profile</Text>

            <View className="items-center mt-8">
                <Image
                    source={user.picture?.url ? { uri: user.picture.url } : require('@/assets/images/empty-user.png')}
                    style={{ width: 96, height: 96, borderRadius: 48 }}
                />
                <Text className="text-xl font-app-semibold text-gray-900 mt-4">{user.name}</Text>
                <Text className="text-sm font-app text-gray-500">{user.email}</Text>
                {user.phone && <Text className="text-sm font-app text-gray-500">{user.phone}</Text>}
            </View>

            <TouchableOpacity
                onPress={handleLogout}
                className="flex-row items-center gap-3 mt-10 p-4 rounded-xl bg-red-50"
            >
                <Ionicons name="log-out-outline" size={22} color="#dc2626" />
                <Text className="text-base font-app-semibold text-red-600">Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
