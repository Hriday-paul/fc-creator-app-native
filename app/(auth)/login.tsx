import Appbar from '@/components/Shared/Appbar';
import Button from '@/components/Shared/Button';
import FormInput from '@/components/Shared/FormInput';
// TODO(api): import { useLoginMutation } from '@/redux/apis/auth.api';
import { setCredentials } from '@/redux/slices/auth.slice';
// TODO(api): import { getErrorMessage } from '@/utils/errorMessage';
import { mockCredentials } from '@/utils/mockData';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

type FormValues = { email: string; password: string };

export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    // TODO(api): const [login, { isLoading }] = useLoginMutation();
    const { control, handleSubmit } = useForm<FormValues>();

    const onSubmit = (values: FormValues) => {
        // TODO(api): restore the login request
        // try {
        //     const res = await login(values).unwrap();
        //     dispatch(setCredentials(res.data));
        //     router.replace('/user/home');
        // } catch (err) {
        //     Alert.alert('Login failed', getErrorMessage(err));
        // }
        dispatch(setCredentials({ ...mockCredentials, user: { ...mockCredentials.user, email: values.email } }));
        router.replace('/user/home');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerClassName="px-6 pt-2 pb-10" keyboardShouldPersistTaps="handled">
                    <Appbar title="Login" />

                    <Text className="text-2xl font-app-bold text-slate-900 mt-8">Welcome back</Text>
                    <Text className="text-base font-app text-slate-500 mt-1 mb-8">Sign in to continue</Text>

                    <FormInput
                        control={control}
                        name="email"
                        label="Email"
                        placeholder="you@example.com"
                        keyboardType="email-address"
                        rules={{ required: 'Email is required' }}
                    />
                    <FormInput
                        control={control}
                        name="password"
                        label="Password"
                        placeholder="••••••••"
                        secure
                        rules={{ required: 'Password is required' }}
                    />

                    <Link href="/(auth)/forgot-password" className="self-end mb-6">
                        <Text className="text-primary font-app-semibold">Forgot password?</Text>
                    </Link>

                    <Button title="Login" onPress={handleSubmit(onSubmit)} />

                    <View className="flex-row justify-center mt-6">
                        <Text className="font-app text-slate-500">Don&apos;t have an account? </Text>
                        <Link href="/(auth)/register" replace>
                            <Text className="text-primary font-app-semibold">Sign up</Text>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
