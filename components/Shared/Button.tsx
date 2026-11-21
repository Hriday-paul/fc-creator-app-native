import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/utils/colors';

type Props = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'outline';
    className?: string;
};

export default function Button({ title, onPress, loading, disabled, variant = 'primary', className = '' }: Props) {
    const isPrimary = variant === 'primary';
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.85}
            className={`w-full rounded-2xl py-4 items-center ${isPrimary ? 'bg-primary' : 'border border-primary bg-white'} ${isDisabled ? 'opacity-60' : ''} ${className}`}
        >
            {loading
                ? <ActivityIndicator color={isPrimary ? '#fff' : colors.primary} />
                : <Text className={`text-base font-app-semibold ${isPrimary ? 'text-white' : 'text-primary'}`}>{title}</Text>}
        </TouchableOpacity>
    );
}
