import FeatureCard from '@/components/Screens/Auth/Login/FeatureCard';
import AuthFooter from '@/components/Shared/AuthFooter';
import AuthHeader from '@/components/Shared/AuthHeader';
import Button from '@/components/Shared/Button';
import FormInput from '@/components/Shared/FormInput';
// TODO(api): import { useLoginMutation } from '@/redux/apis/auth.api';
import { setCredentials } from '@/redux/slices/auth.slice';
// TODO(api): import { getErrorMessage } from '@/utils/errorMessage';
import { mockCredentials, mockMemberId } from '@/utils/mockData';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

type FormValues = { identifier: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MEMBER_ID_RE = /^MEM-\d{3,}$/i;
const DESIGN_HEIGHT = 852;

// Email / Member ID sign-in (Figma Auth 37327:704). Designed at 393×852: 361 column (16 gutter),
// header, then ~78px down the intro, feature card, field and buttons; footer pinned at the bottom.
export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { height } = useWindowDimensions();
    // TODO(api): const [login, { isLoading }] = useLoginMutation();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { identifier: '' } });

    // 78px below the header at the design height, never below 32 on short screens
    const introGap = Math.round(Math.min(78, Math.max(32, (height / DESIGN_HEIGHT) * 78)));

    const goBack = () => (router.canGoBack() ? router.back() : router.replace('/(auth)/welcome'));

    const onSubmit = async ({ identifier }: FormValues) => {
        const value = identifier.trim();
        // TODO(api): restore the login request
        // try {
        //     const res = await login({ identifier: value }).unwrap();
        //     dispatch(setCredentials(res.data));
        //     router.replace('/user/home');
        // } catch (err) {
        //     Alert.alert('Sign-in failed', getErrorMessage(err));
        // }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        const email = EMAIL_RE.test(value) ? value : mockCredentials.user.email;
        dispatch(setCredentials({ ...mockCredentials, user: { ...mockCredentials.user, email } }));
        setLoading(false);
        router.replace('/user/home');
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom', 'left', 'right']}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerClassName="flex-grow px-4"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View className="w-full max-w-[480px] flex-1 self-center">
                        <AuthHeader className="pt-4" />

                        <View className="w-full gap-5" style={{ marginTop: introGap }}>
                            {/* Intro */}
                            <View className="w-full">
                                <Text className="pt-1 font-app-semibold text-body uppercase text-muted">
                                    Member Companion
                                </Text>
                                <Text
                                    accessibilityRole="header"
                                    className="pt-2 font-app-bold text-heading tracking-[-0.6px] text-ink"
                                >
                                    Welcome
                                </Text>
                                <Text className="pt-1 font-app text-micro leading-5 text-muted">
                                    Your community, transportation, and services — all in one place.
                                </Text>
                            </View>

                            <FeatureCard />

                            <View className="w-full">
                                <FormInput
                                    control={control}
                                    name="identifier"
                                    label="Email Address or Member ID"
                                    placeholder={`you@example.com or ${mockMemberId}`}
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    autoComplete="email"
                                    returnKeyType="go"
                                    onSubmitEditing={handleSubmit(onSubmit)}
                                    rules={{
                                        required: 'Enter your email or member ID',
                                        validate: (v: string) =>
                                            EMAIL_RE.test(v.trim()) ||
                                            MEMBER_ID_RE.test(v.trim()) ||
                                            `Enter a valid email or member ID (e.g. ${mockMemberId})`,
                                    }}
                                />

                                <View className="w-full flex-row gap-3">
                                    <Button title="Back" variant="outline" className="px-4" onPress={goBack} />
                                    <Button
                                        title="Authenticate"
                                        className="flex-1"
                                        loading={loading}
                                        onPress={handleSubmit(onSubmit)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View className="min-h-8 flex-1" />
                        <AuthFooter className="pb-4" />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
