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
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'secureTextEntry'>;

export default function FormInput<T extends FieldValues>({ control, name, label, rules, secure, ...inputProps }: Props<T>) {
    const [hidden, setHidden] = useState(true);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className="mb-4">
                    <Text className="text-sm font-app-semibold text-gray-700 mb-1.5">{label}</Text>
                    <View className={`flex-row items-center border rounded-xl px-4 bg-gray-50 ${error ? 'border-red-500' : 'border-gray-200'}`}>
                        <TextInput
                            className="flex-1 py-3.5 font-app text-gray-900"
                            placeholderTextColor="#9CA3AF"
                            value={value ?? ''}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            secureTextEntry={secure && hidden}
                            autoCapitalize="none"
                            {...inputProps}
                        />
                        {secure && (
                            <TouchableOpacity onPress={() => setHidden((h) => !h)} hitSlop={8}>
                                <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        )}
                    </View>
                    {error?.message && <Text className="text-xs text-red-500 mt-1 font-app">{error.message}</Text>}
                </View>
            )}
        />
    );
}
