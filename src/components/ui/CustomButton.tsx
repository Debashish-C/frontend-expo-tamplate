import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

function CustomButton({
  title,
  onPress,
  className = '',
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
}: CustomButtonProps) {
  const baseStyles = 'rounded-full items-center justify-center font-semibold transition-all active:scale-95';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg',
    secondary: 'bg-gray-100',
    outline: 'border-2 border-blue-600',
  };

  const sizeStyles = {
    sm: 'py-2 px-4',
    md: 'py-3 px-6',
    lg: 'py-4 px-8',
  };

  const textColorStyles = {
    primary: 'text-white',
    secondary: 'text-gray-800',
    outline: 'text-blue-600',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled || loading ? 'opacity-60' : ''
      } ${className}`}
      style={style}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#fff' : '#1f2937'} />
      ) : (
        <Text
          className={`${textColorStyles[variant]} ${textSizeStyles[size]} font-semibold`}
          style={textStyle}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default CustomButton;

