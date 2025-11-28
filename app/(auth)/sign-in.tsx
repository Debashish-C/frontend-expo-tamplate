import { Link, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { apiService } from '../../src/services/api';
import CustomButton from '../../src/components/ui/CustomButton';
import InputField from '../../src/components/ui/InputField';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    const errors: Record<string, string> = {};
    if (!form.email) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLoading(true);
    try {
      const response = await apiService.signIn(form.email, form.password);
      if (response.access_token) {
        router.replace('/(root)/(tabs)/profile');
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    } catch (err: any) {
      console.log('Sign in error:', err);
      Alert.alert('Error', err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  }, [form]);

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-12 pb-20">
          <Text className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</Text>
          <Text className="text-gray-600 text-base mb-10 font-medium">
            Sign in to your account
          </Text>

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
          />

          <View className="mt-6">
            <CustomButton
              title={loading ? 'Signing in...' : 'Sign In'}
              onPress={onSignInPress}
              disabled={loading}
              size="lg"
              className="w-full"
            />
          </View>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600 font-medium">
              Don&apos;t have an account?{' '}
            </Text>
            <Link href="/(auth)/sign-up" className="font-semibold text-blue-600">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
