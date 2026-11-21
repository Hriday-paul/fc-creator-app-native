import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Auth header (Figma Auth screens 4–5): crest 40×36 + "Community Companion" on the left,
// language pill (globe + "EN") on the right.
export default function AuthHeader({ className = '' }: { className?: string }) {
    return (
        <View className={`w-full flex-row items-center justify-between ${className}`}>
            <View className="shrink flex-row items-center gap-1.5">
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={{ width: 40, height: 36 }}
                    contentFit="contain"
                    accessibilityLabel="FC crest"
                />
                <Text numberOfLines={1} className="shrink font-app-semibold text-body text-ink">
                    Community Companion
                </Text>
            </View>

            {/* TODO: language switcher — the pill is display-only for now */}
            <TouchableOpacity
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Language: English"
                className="flex-row items-center gap-1 rounded-full bg-white px-2.5 py-1.5 shadow-sm"
                style={{ elevation: 2 }}
            >
                <View className="h-[18px] w-[18px] items-center justify-center">
                    <Image
                        source={require('@/assets/icons/language.svg')}
                        style={{ width: 16, height: 16 }}
                        contentFit="contain"
                    />
                </View>
                <Text className="font-app-semibold text-body text-ink">EN</Text>
            </TouchableOpacity>
        </View>
    );
}
