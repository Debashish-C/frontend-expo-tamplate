import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { apiService } from '../../src/services/api';
import CustomButton from '../../src/components/ui/CustomButton';
import InputField from '../../src/components/ui/InputField';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSignUpPress = async () => {
    const errors: Record<string, string> = {};

    if (!form.name) errors.name = 'Name is required';
    if (!form.email) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    if (!form.confirmPassword) errors.confirmPassword = 'Please confirm password';
    if (form.password && form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLoading(true);
    try {
      await apiService.signUp(form.email, form.password, form.name);
      Alert.alert('Success', 'Account created successfully! Please sign in.');
      router.replace('/(auth)/sign-in');
    } catch (err: any) {
      console.error('Sign up error:', err);
      Alert.alert('Error', err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-8 pb-20">
          <Text className="text-4xl font-bold text-gray-900 mb-2">Create Account</Text>
          <Text className="text-gray-600 text-base mb-8 font-medium">
            Join us today and get started
          </Text>

          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={form.name}
            onChangeText={(text) => {
              setForm({ ...form, name: text });
              setFormErrors({ ...formErrors, name: '' });
            }}
            error={formErrors.name}
          />

          <InputField
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChangeText={(text) => {
              setForm({ ...form, email: text });
              setFormErrors({ ...formErrors, email: '' });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={formErrors.email}
          />

          <InputField
            label="Password"
            placeholder="••••••••"
            value={form.password}
            onChangeText={(text) => {
              setForm({ ...form, password: text });
              setFormErrors({ ...formErrors, password: '' });
            }}
            secureTextEntry
            error={formErrors.password}
            helperText="At least 6 characters"
          />

          <InputField
            label="Confirm Password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChangeText={(text) => {
              setForm({ ...form, confirmPassword: text });
              setFormErrors({ ...formErrors, confirmPassword: '' });
            }}
            secureTextEntry
            error={formErrors.confirmPassword}
          />

          <CustomButton
            title={loading ? 'Creating Account...' : 'Sign Up'}
            onPress={onSignUpPress}
            disabled={loading}
            size="lg"
            className="mt-6 w-full"
          />

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600 font-medium">
              Already have an account?{' '}
            </Text>
            <Link href="/(auth)/sign-in" className="font-semibold text-blue-600">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
