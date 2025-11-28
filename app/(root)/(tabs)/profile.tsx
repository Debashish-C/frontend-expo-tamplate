import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { apiService } from '../../../src/services/api';
import CustomButton from '../../../src/components/ui/CustomButton';
import InputField from '../../../src/components/ui/InputField';
import ProfileStrengthMeter from '../../../src/components/ui/ProfileStrengthMeter';

interface User {
  _id: string;
  name: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await apiService.getUser();
      setUser(userData);
      setEditForm({
        name: userData.name || '',
        email: userData.email || '',
      });
    } catch (error: any) {
      console.error('Failed to load user profile:', error);
      Alert.alert('Error', 'Failed to load profile. Please sign in again.');
      router.replace('/(auth)/sign-in');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await apiService.logout();
            router.replace('/(auth)/sign-in');
          } catch (err: any) {
            console.error('Logout error:', err);
            Alert.alert('Error', 'Failed to sign out');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleUpdateProfile = async () => {
    if (!editForm.name) {
      Alert.alert('Error', 'Please fill in name field');
      return;
    }

    setLoading(true);
    try {
      const updateData: any = { name: editForm.name };
      if (editForm.email && editForm.email !== user?.email) {
        updateData.email = editForm.email;
      }

      const updatedUser = await apiService.updateUser(updateData);
      setUser(updatedUser);
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch (err: any) {
      console.error('Update profile error:', err);
      Alert.alert('Error', err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-gray-50 to-white items-center justify-center">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white items-center justify-center">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Not Signed In</Text>
        <CustomButton
          title="Sign In"
          onPress={() => router.replace('/(auth)/sign-in')}
          size="lg"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-gray-50 to-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-6 pt-6">
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-4xl font-bold text-gray-900">Profile</Text>
            <TouchableOpacity
              onPress={handleLogout}
              disabled={loading}
              className="rounded-full bg-red-100 p-3"
            >
              <Text className="text-red-600 text-sm font-semibold">Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Picture & Info */}
          <View className="flex items-center justify-center mb-8">
            <View className="relative mb-4">
              <View className="w-24 h-24 rounded-full border-4 border-blue-200 bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center">
                <Text className="text-3xl font-bold text-white">
                  {user.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
                </Text>
              </View>
            </View>
            <Text className="text-2xl font-bold text-gray-900">
              {user.name}
            </Text>
            <Text className="text-gray-500 font-medium mt-1">
              {user.email}
            </Text>
          </View>

          {/* Profile Strength Meter */}
          <View className="mb-8">
            <ProfileStrengthMeter
              name={user.name}
              email={user.email}
              bio={''}
            />
          </View>

          {/* Content Based on Edit State */}
          {!isEditing ? (
            <>
              {/* Display Mode */}
              <View className="space-y-4 mb-8">
                <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <Text className="text-lg font-bold text-gray-900 mb-1">Name</Text>
                  <Text className="text-gray-700">{user.name}</Text>
                </View>

                <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <Text className="text-lg font-bold text-gray-900 mb-1">Email</Text>
                  <Text className="text-gray-700">{user.email}</Text>
                </View>

                <View className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <Text className="text-lg font-bold text-gray-900 mb-4">Account Info</Text>
                  <View className="space-y-3">
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600 font-medium">Account Type</Text>
                      <Text className="font-semibold text-gray-900">Personal</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600 font-medium">User ID</Text>
                      <Text className="font-semibold text-gray-900">{user._id}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <CustomButton
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                size="lg"
                className="w-full"
              />
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <Text className="text-3xl font-bold text-gray-900 mb-6">Edit Profile</Text>

              <InputField
                label="Name"
                placeholder="John Doe"
                value={editForm.name}
                onChangeText={(value) =>
                  setEditForm({ ...editForm, name: value })
                }
              />

              <InputField
                label="Email"
                placeholder="you@example.com"
                value={editForm.email}
                onChangeText={(value) =>
                  setEditForm({ ...editForm, email: value })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Real-time Profile Strength Meter */}
              <View className="my-6">
                <ProfileStrengthMeter
                  name={editForm.name}
                  email={editForm.email}
                  bio={''}
                />
              </View>

              <View className="flex-row gap-3 mb-4">
                <CustomButton
                  title={loading ? 'Updating...' : 'Save Changes'}
                  onPress={handleUpdateProfile}
                  disabled={loading}
                  size="lg"
                  className="flex-1"
                />
                <CustomButton
                  title="Cancel"
                  onPress={() => {
                    setIsEditing(false);
                    setEditForm({
                      name: user.name || '',
                      email: user.email || '',
                    });
                  }}
                  disabled={loading}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
