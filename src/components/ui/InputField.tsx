import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TextInputProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: ImageSourcePropType | null;
  containerStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  secureTextEntry?: boolean;
  error?: string;
  helperText?: string;
}

function InputField({
  label,
  icon,
  containerStyle = '',
  inputStyle = '',
  labelStyle = '',
  secureTextEntry = false,
  error,
  helperText,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View className={`my-3 w-full ${containerStyle}`}>
      {label && (
        <Text className={`text-sm font-semibold mb-2 text-gray-700 ${labelStyle}`}>
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center px-4 py-3 rounded-xl border-2 transition-all ${
          error ? 'border-red-500 bg-red-50' : isFocused
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        {icon && (
          <Image
            source={icon}
            className="w-5 h-5 mr-3"
            resizeMode="contain"
            tintColor={isFocused ? '#3b82f6' : '#6b7280'}
          />
        )}
        <TextInput
          secureTextEntry={secureTextEntry && !showPassword}
          className={`flex-1 text-base text-gray-900 font-medium ${inputStyle}`}
          placeholderTextColor="#9ca3af"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="ml-2 p-1"
          >
            <Text className="text-blue-600 font-semibold text-sm">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-red-600 text-xs font-medium mt-1">{error}</Text>
      )}
      {helperText && !error && (
        <Text className="text-gray-500 text-xs font-medium mt-1">{helperText}</Text>
      )}
    </View>
  );
}

export default InputField;

