import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

import { tokenCache } from "../src/lib/auth";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await tokenCache.getToken();
      setIsAuthenticated(!!token);
    } catch {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return null; // Loading
  }

  if (isAuthenticated) {
    return <Redirect href="/(root)/(tabs)/profile" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
};

export default Page;