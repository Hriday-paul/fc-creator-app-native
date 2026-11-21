import { Text, View } from 'react-native';

// Gold "— GOD IS ONE —" divider under the Welcome subtitle (Figma 37327:435).
// 16px top padding, 32px rules at 50% opacity, 8px gap, text-micro (10 / 15), tracking 1.5.
export default function GodIsOneDivider() {
    return (
        <View className="flex-row items-center gap-2 pt-4" accessibilityRole="text" accessibilityLabel="God is one">
            <View className="h-px w-8 bg-secondary opacity-50" />
            <Text className="font-app-semibold text-micro uppercase tracking-[1.5px] text-secondary">
                God Is One
            </Text>
            <View className="h-px w-8 bg-secondary opacity-50" />
        </View>
    );
}
