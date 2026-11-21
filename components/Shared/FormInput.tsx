import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type Props<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    rules?: RegisterOptions<T, Path<T>>;
    secure?: boolean;
    /** Shows a red `*` after the label */
    required?: boolean;
    className?: string;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'secureTextEntry'>;

// Figma "Input" (Auth): label Inter Medium 14/20, 6px below it a white box 52 tall,
// 1px `line` border, radius 12, 16px side padding, shadow "All"; text 12, placeholder slate-400.
export default function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    rules,
    secure,
    required,
    className = 'mb-4',
    ...inputProps
}: Props<T>) {
    const [hidden, setHidden] = useState(true);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className={`w-full ${className}`}>
                    <Text className="pb-1.5 font-app-medium text-body text-ink-700">
                        {label}
                        {required ? <Text className="text-red-500"> *</Text> : null}
                    </Text>
                    <View
                        className={`h-[52px] flex-row items-center rounded-input border bg-white px-4 shadow-sm ${error ? 'border-red-500' : 'border-line'
                            }`}
                        style={{ elevation: 2 }}
                    >
                        <TextInput
                            className="flex-1 font-app text-label text-ink"
                            placeholderTextColor={colors.placeholder}
                            value={value ?? ''}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry={secure && hidden}
                            autoCapitalize="none"
                            accessibilityLabel={label}
                            {...inputProps}
                        />
                        {secure && (
                            <TouchableOpacity onPress={() => setHidden((h) => !h)} hitSlop={8}>
                                <Ionicons
                                    name={hidden ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color={colors.placeholder}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    {error?.message ? (
                        <Text className="mt-1 font-app text-label text-red-500">{error.message}</Text>
                    ) : null}
                </View>
            )}
        />
    );
}
