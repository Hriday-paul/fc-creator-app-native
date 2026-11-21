import { colors } from '@/utils/colors';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    title: string;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;
    /** primary = navy fill; outline = white with a light border (Figma "Btn") */
    variant?: 'primary' | 'outline';
    /** Optional element left of the title, e.g. an icon */
    icon?: React.ReactNode;
    className?: string;
    /** Overrides the title color/weight, e.g. `text-primary` on an outline button */
    textClassName?: string;
};

// Figma "Btn": 50px tall, radius 12, 8px gap between icon and title, Inter SemiBold 15.
export default function Button({
    title,
    onPress,
    loading,
    disabled,
    variant = 'primary',
    icon,
    className = '',
    textClassName,
}: Props) {
    const isPrimary = variant === 'primary';
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={title}
            className={`h-[50px] flex-row items-center justify-center gap-2 rounded-input px-3 ${isPrimary ? 'bg-primary shadow-sm' : 'border border-line bg-white'
                } ${isDisabled ? 'opacity-60' : ''} ${className}`}
            style={isPrimary ? { elevation: 2 } : undefined}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
            ) : (
                <>
                    {icon ? <View>{icon}</View> : null}
                    <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        className={`shrink text-center font-app-semibold text-button ${textClassName ?? (isPrimary ? 'text-white' : 'text-ink')
                            }`}
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}
