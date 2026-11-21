import { Image, ImageSource } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

type Feature = {
    icon: ImageSource | number;
    /** Icon size as exported from Figma (keeps the SVG's own proportions) */
    iconSize: { width: number; height: number };
    tileClassName: string;
    text: string;
};

const FEATURES: Feature[] = [
    {
        icon: require('@/assets/icons/bus.svg'),
        iconSize: { width: 24, height: 24 },
        tileClassName: 'bg-primary-50',
        text: 'Real-time shuttle schedules & live tracking',
    },
    {
        icon: require('@/assets/icons/security-check.svg'),
        iconSize: { width: 19.5, height: 21.5 },
        tileClassName: 'bg-success/20',
        text: 'Personal certificate vault & member documents',
    },
];

// Feature card on Email / Member ID sign-in (Figma 37327:721): white, radius 12, p 14, gap 10,
// shadow "All". Each row: 36px tinted tile (p 6, radius 6, 24px icon) + Inter Medium 12/20 text.
export default function FeatureCard() {
    return (
        <View className="w-full gap-2.5 rounded-input bg-white p-3.5 shadow-sm" style={{ elevation: 2 }}>
            {FEATURES.map((f) => (
                <View key={f.text} className="flex-row items-center gap-1.5">
                    <View className={`rounded-md p-1.5 ${f.tileClassName}`}>
                        <View className="h-6 w-6 items-center justify-center">
                            <Image source={f.icon} style={f.iconSize} contentFit="contain" />
                        </View>
                    </View>
                    <Text className="shrink font-app-medium text-label leading-5 text-ink-500">{f.text}</Text>
                </View>
            ))}
        </View>
    );
}
