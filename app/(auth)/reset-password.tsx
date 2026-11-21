import Appbar from '@/components/Shared/Appbar';
import Button from '@/components/Shared/Button';
import FormInput from '@/components/Shared/FormInput';
// TODO(api): import { useResetPasswordMutation } from '@/redux/apis/auth.api';
// TODO(api): import { getErrorMessage } from '@/utils/errorMessage';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormValues = { newPassword: string; confirmPassword: string };

export default function ResetPasswordScreen() {
    const router = useRouter();
    // TODO(api): const { token } = useLocalSearchParams<{ token: string }>();
    // TODO(api): const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const { control, handleSubmit, getValues } = useForm<FormValues>();

    const onSubmit = () => {
        // TODO(api): restore the reset-password request (signature was `async (values: FormValues)`)
        // try {
        //     await resetPassword({ token, ...values }).unwrap();
        //     Alert.alert('Password updated', 'You can now log in with your new password.');
        //     router.dismissTo('/(auth)/login');
        // } catch (err) {
        //     Alert.alert('Reset failed', getErrorMessage(err));
        // }
        Alert.alert('Password updated', 'You can now log in with your new password.');
        router.dismissTo('/(auth)/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-6 pt-2">
            <Appbar title="New Password" />

            <Text className="text-2xl font-app-bold text-slate-900 mt-8 mb-8">Choose a new password</Text>

            <FormInput control={control} name="newPassword" label="New password" placeholder="••••••••" secure
                rules={{ required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } }} />
            <FormInput control={control} name="confirmPassword" label="Confirm password" placeholder="••••••••" secure
                rules={{ required: 'Please confirm', validate: (v) => v === getValues('newPassword') || 'Passwords do not match' }} />

            <Button title="Update Password" onPress={handleSubmit(onSubmit)} className="mt-2" />
        </SafeAreaView>
    );
}
