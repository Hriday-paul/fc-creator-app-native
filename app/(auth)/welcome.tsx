import GodIsOneDivider from '@/components/Screens/Auth/Welcome/GodIsOneDivider';
import Button from '@/components/Shared/Button';
import TermsLine from '@/components/Shared/TermsLine';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Welcome (Figma Auth 37327:420). Designed at 393×852: content column 361 wide (16 gutter),
// hero and actions 100px apart, centred vertically; "Sign Up" pinned near the bottom.
// Responsive: the column caps at 480 on tablets, the hero/actions gap and crest shrink on
// short screens, and the whole screen scrolls if it still doesn't fit (landscape, large text).
const DESIGN_HEIGHT = 852;

export default function WelcomeScreen() {
    const router = useRouter();
    const { height } = useWindowDimensions();

    // 100px at the design height, never below 32 (iPhone SE ≈ 78, landscape → 32)
    const sectionGap = Math.round(Math.min(100, Math.max(32, (height / DESIGN_HEIGHT) * 100)));
    // Crest 164×150 in the design; scale down a little on short screens
    const logoScale = height < 700 ? 0.8 : 1;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom', 'left', 'right']}>
            <StatusBar style="dark" />
            <ScrollView
                contentContainerClassName="flex-grow px-4"
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View className="w-full max-w-[480px] flex-1 self-center">
                    <View className="flex-1 items-center justify-center py-8" style={{ gap: sectionGap }}>
                        {/* Hero: crest, title, subtitle, divider (240 wide, 20 gap) */}
                        <View className="w-[240px] items-center gap-5">
                            <Image
                                source={require('@/assets/images/logo.png')}
                                style={{ width: 164 * logoScale, height: 150 * logoScale }}
                                contentFit="contain"
                                accessibilityLabel="FC crest"
                            />
                            <View className="w-full items-center">
                                <Text
                                    accessibilityRole="header"
                                    className="font-app-bold text-heading tracking-[-0.6px] text-primary"
                                >
                                    Welcome
                                </Text>
                                <Text className="pt-2 text-center font-app text-body leading-[22.75px] text-primary">
                                    Your community, transportation, and services — all in one place.
                                </Text>
                                <GodIsOneDivider />
                            </View>
                        </View>

                        {/* Actions (12 gap) */}
                        <View className="w-full items-center gap-3">
                            <Button
                                title="Continue with Microsoft 365"
                                className="w-full"
                                icon={
                                    <Image
                                        source={require('@/assets/icons/microsoft.svg')}
                                        style={{ width: 18, height: 18 }}
                                        contentFit="contain"
                                    />
                                }
                                // TODO(api): Microsoft 365 sign-in (screen 3) — button only for now
                                onPress={() => { }}
                            />
                            <View className="w-full flex-row gap-3">
                                <Button
                                    title="Email / Member ID"
                                    variant="outline"
                                    className="flex-1"
                                    onPress={() => router.push('/(auth)/login')}
                                />
                                <Button
                                    title="Register Member"
                                    variant="outline"
                                    className="flex-1"
                                    textClassName="text-primary"
                                    icon={
                                        <Image
                                            source={require('@/assets/icons/user-add.svg')}
                                            style={{ width: 24, height: 24 }}
                                            contentFit="contain"
                                        />
                                    }
                                    onPress={() => router.push('/(auth)/register')}
                                />
                            </View>
                            <TermsLine className="pt-2" />
                        </View>
                    </View>

                    {/* Footer: "Don't Have An Account? Sign Up" */}
                    <View className="flex-row items-center justify-center gap-1.5 pb-4">
                        <Text className="font-app text-caption leading-4 text-muted">Don&apos;t Have An Account?</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/(auth)/register')}
                            accessibilityRole="link"
                            hitSlop={8}
                        >
                            <Text className="font-app-bold text-label text-primary underline">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
