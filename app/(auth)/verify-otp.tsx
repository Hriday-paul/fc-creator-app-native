import Appbar from '@/components/Shared/Appbar';
import Button from '@/components/Shared/Button';
import FormInput from '@/components/Shared/FormInput';
// TODO(api): import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/apis/auth.api';
import { setCredentials } from '@/redux/slices/auth.slice';
// TODO(api): import { getErrorMessage } from '@/utils/errorMessage';
import { mockCredentials } from '@/utils/mockData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

type FormValues = { otp: string };

// Shared by sign-up (flow=signup) and forgot-password (flow=reset)
export default function VerifyOtpScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const params = useLocalSearchParams<{ token: string; email: string; flow: 'signup' | 'reset' }>();
    // TODO(api): const [token, setToken] = useState(params.token);

    // TODO(api): const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    // TODO(api): const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
    const { control, handleSubmit } = useForm<FormValues>();

    const onSubmit = () => {
        // TODO(api): restore the verify-otp request (signature was `async ({ otp }: FormValues)`)
        // try {
        //     const { data } = await verifyOtp({ otp, token }).unwrap();
        //
        //     if (data.resetToken) {
        //         router.replace({ pathname: '/(auth)/reset-password', params: { token: data.resetToken } });
        //     } else if (data.accessToken && data.refreshToken && data.user) {
        //         dispatch(setCredentials({ accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.user }));
        //         router.replace('/user/home');
        //     }
        // } catch (err) {
        //     Alert.alert('Verification failed', getErrorMessage(err));
        // }
        if (params.flow === 'reset') {
            router.replace({ pathname: '/(auth)/reset-password', params: { token: 'mock-reset-token' } });
        } else {
            dispatch(setCredentials({ ...mockCredentials, user: { ...mockCredentials.user, email: params.email } }));
            router.replace('/user/home');
        }
    };

    const onResend = () => {
        // TODO(api): restore the resend-otp request
        // try {
        //     const res = await resendOtp({ email: params.email }).unwrap();
        //     setToken(res.data.otpToken);
        //     Alert.alert('Code sent', `A new code was sent to ${params.email}`);
        // } catch (err) {
        //     Alert.alert('Could not resend', getErrorMessage(err));
        // }
        Alert.alert('Code sent', `A new code was sent to ${params.email}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 pt-2">
            <Appbar title="Verify" />

            <Text className="text-2xl font-app-bold text-slate-900 mt-8">Enter code</Text>
            <Text className="text-base font-app text-slate-500 mt-1 mb-8">
                We sent a verification code to {params.email}
            </Text>

            <FormInput
                control={control}
                name="otp"
                label="Verification code"
                placeholder="123456"
                keyboardType="number-pad"
                maxLength={6}
                rules={{ required: 'Code is required' }}
            />

            <Button title="Verify" onPress={handleSubmit(onSubmit)} className="mt-2" />

            <View className="flex-row justify-center mt-6">
                <Text className="font-app text-slate-500">Didn&apos;t get it? </Text>
                <TouchableOpacity onPress={onResend}>
                    <Text className="text-primary font-app-semibold">Resend code</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
