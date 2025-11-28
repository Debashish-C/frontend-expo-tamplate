import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

interface ProfileStrengthMeterProps {
  name?: string;
  bio?: string;
  email?: string;
}

interface StrengthScore {
  score: number;
  level: 'weak' | 'good' | 'excellent';
  color: string;
  label: string;
}

export const useProfileStrength = ({
  name = '',
  bio = '',
  email = '',
}: ProfileStrengthMeterProps): StrengthScore => {
  return useMemo(() => {
    let score = 0;

    // Name scoring (0-30 points)
    if (name && name.length > 0) {
      score += 10;
    }
    if (name && name.length >= 3) {
      score += 10;
    }
    if (name && name.split(' ').length >= 2) {
      score += 10;
    }

    // Email scoring (0-30 points)
    if (email && email.includes('@')) {
      score += 15;
    }
    if (email && email.length > 5) {
      score += 15;
    }

    // Bio scoring (0-40 points)
    if (bio && bio.trim().length > 0) {
      score += 10;
    }
    if (bio && bio.trim().length >= 20) {
      score += 10;
    }
    if (bio && bio.trim().length >= 50) {
      score += 10;
    }
    if (bio && bio.trim().length >= 100) {
      score += 10;
    }

    // Determine level and color
    let level: 'weak' | 'good' | 'excellent' = 'weak';
    let color = '#EF4444'; // Red for weak
    let label = 'Weak';

    if (score >= 60 && score < 80) {
      level = 'good';
      color = '#FBBF24'; // Amber for good
      label = 'Good';
    } else if (score >= 80) {
      level = 'excellent';
      color = '#10B981'; // Green for excellent
      label = 'Excellent';
    }

    return {
      score: Math.min(score, 100),
      level,
      color,
      label,
    };
  }, [name, bio, email]);
};

interface ProfileStrengthBarProps extends ProfileStrengthMeterProps {
  name?: string;
  bio?: string;
  email?: string;
}

const ProfileStrengthMeter: React.FC<ProfileStrengthBarProps> = ({
  name,
  bio,
  email,
}) => {
  const strength = useProfileStrength({ name, bio, email });

  return (
    <View className="w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-gray-900">
          Profile Strength
        </Text>
        <Text className="text-lg font-bold" style={{ color: strength.color }}>
          {strength.score}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full bg-gray-300 rounded-full h-2.5 mb-3 overflow-hidden shadow-sm">
        <View
          className="h-full rounded-full transition-all"
          style={{
            width: `${strength.score}%`,
            backgroundColor: strength.color,
          }}
        />
      </View>

      {/* Level Label */}
      <Text
        className="text-sm font-semibold"
        style={{ color: strength.color }}
      >
        {strength.label}
      </Text>

      {/* Tips */}
      {strength.score < 100 && (
        <View className="mt-4 pt-4 border-t border-gray-300">
          <Text className="text-sm text-gray-600 font-medium mb-3">
            {strength.score < 60
              ? '💡 Complete your profile to improve strength'
              : '✨ Add more details to reach excellent'}
          </Text>
          {!name && (
            <Text className="text-sm text-gray-600 mb-2">
              • Add your name
            </Text>
          )}
          {(!bio || bio.trim().length < 50) && (
            <Text className="text-sm text-gray-600">
              • Write a detailed bio (50+ characters)
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileStrengthMeter;
