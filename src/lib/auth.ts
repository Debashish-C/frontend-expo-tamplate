import * as SecureStore from "expo-secure-store";

export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';

export const tokenCache = {
  async getToken() {
    try {
      const item = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (item) {
        console.log("Auth token retrieved 🔐");
      } else {
        console.log("No auth token found");
      }
      return item;
    } catch (error) {
      console.error("SecureStore get token error: ", error);
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      return null;
    }
  },
  async saveToken(value: string) {
    try {
      return SecureStore.setItemAsync(AUTH_TOKEN_KEY, value);
    } catch (err) {
      console.error("SecureStore save token error: ", err);
      return;
    }
  },
  async deleteToken() {
    try {
      return SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    } catch (err) {
      console.error("SecureStore delete token error: ", err);
      return;
    }
  },
};

export const userDataCache = {
  async getUserData() {
    try {
      const item = await SecureStore.getItemAsync(USER_DATA_KEY);
      if (item) {
        return JSON.parse(item);
      }
      return null;
    } catch (error) {
      console.error("SecureStore get user data error: ", error);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
      return null;
    }
  },
  async saveUserData(userData: any) {
    try {
      return SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
    } catch (err) {
      console.error("SecureStore save user data error: ", err);
      return;
    }
  },
  async deleteUserData() {
    try {
      return SecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (err) {
      console.error("SecureStore delete user data error: ", err);
      return;
    }
  },
};

export const isAuthenticated = async () => {
  const token = await tokenCache.getToken();
  return !!token;
};