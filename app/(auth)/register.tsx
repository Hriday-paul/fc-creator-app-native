import Appbar from '@/components/Shared/Appbar';
import Button from '@/components/Shared/Button';
import FormInput from '@/components/Shared/FormInput';
// TODO(api): import { useRegisterMutation } from '@/redux/apis/auth.api';
// TODO(api): import { getErrorMessage } from '@/utils/errorMessage';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormValues = { name: string; email: string; phone?: string; password: string };

export default function RegisterScreen() {
    const router = useRouter();
    // TODO(api): const [register, { isLoading }] = useRegisterMutation();
    const { control, handleSubmit } = useForm<FormValues>();

    const onSubmit = (values: FormValues) => {
        // TODO(api): restore the register request (signature was `async ({ phone, ...values }: FormValues)`)
        // try {
        //     const res = await register({ ...values, ...(phone ? { phone } : {}) }).unwrap();
        //     router.push({
        //         pathname: '/(auth)/verify-otp',
        //         params: { token: res.data.otpToken, email: values.email, flow: 'signup' },
        //     });
        // } catch (err) {
        //     Alert.alert('Sign up failed', getErrorMessage(err));
        // }
        router.push({
            pathname: '/(auth)/verify-otp',
            params: { token: 'mock-otp-token', email: values.email, flow: 'signup' },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerClassName="px-6 pt-2 pb-10" keyboardShouldPersistTaps="handled">
                    <Appbar title="Sign Up" />

                    <Text className="text-2xl font-app-bold text-slate-900 mt-8">Create account</Text>
                    <Text className="text-base font-app text-slate-500 mt-1 mb-8">We&apos;ll email you a code to verify</Text>

                    <FormInput control={control} name="name" label="Full name" placeholder="John Doe" autoCapitalize="words"
                        rules={{ required: 'Name is required' }} />
                    <FormInput control={control} name="email" label="Email" placeholder="you@example.com" keyboardType="email-address"
                        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } }} />
                    <FormInput control={control} name="phone" label="Phone (optional)" placeholder="+8801..." keyboardType="phone-pad" />
                    <FormInput control={control} name="password" label="Password" placeholder="••••••••" secure
                        rules={{ required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } }} />

                    <Button title="Sign Up" onPress={handleSubmit(onSubmit)} className="mt-2" />

                    <View className="flex-row justify-center mt-6">
                        <Text className="font-app text-slate-500">Already have an account? </Text>
                        <Link href="/(auth)/login" replace>
                            <Text className="text-primary font-app-semibold">Login</Text>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
