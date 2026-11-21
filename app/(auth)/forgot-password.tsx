import Appbar from '@/components/Shared/Appbar';
import Button from '@/components/Shared/Button';
import FormInput from '@/components/Shared/FormInput';
// TODO(api): import { useForgotPasswordMutation } from '@/redux/apis/auth.api';
// TODO(api): import { getErrorMessage } from '@/utils/errorMessage';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormValues = { email: string };

export default function ForgotPasswordScreen() {
    const router = useRouter();
    // TODO(api): const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const { control, handleSubmit } = useForm<FormValues>();

    const onSubmit = ({ email }: FormValues) => {
        // TODO(api): restore the forgot-password request
        // try {
        //     const res = await forgotPassword({ email }).unwrap();
        //     router.push({ pathname: '/(auth)/verify-otp', params: { token: res.data.token, email, flow: 'reset' } });
        // } catch (err) {
        //     Alert.alert('Request failed', getErrorMessage(err));
        // }
        router.push({ pathname: '/(auth)/verify-otp', params: { token: 'mock-otp-token', email, flow: 'reset' } });
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 pt-2">
            <Appbar title="Forgot Password" />

            <Text className="text-2xl font-app-bold text-slate-900 mt-8">Reset your password</Text>
            <Text className="text-base font-app text-slate-500 mt-1 mb-8">
                Enter your email and we&apos;ll send you a verification code
            </Text>

            <FormInput control={control} name="email" label="Email" placeholder="you@example.com" keyboardType="email-address"
                rules={{ required: 'Email is required' }} />

            <Button title="Send Code" onPress={handleSubmit(onSubmit)} className="mt-2" />
        </SafeAreaView>
    );
}
