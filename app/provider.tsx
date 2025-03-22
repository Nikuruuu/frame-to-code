"use client";
import { auth } from "@/configs/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Define a more complete user type that includes database fields
interface DbUser {
  id: number;
  name: string;
  email: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  dbUser: DbUser | null;
  loading: boolean;
}

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to sync user data with our database using axios
  const syncUserWithDatabase = async (user: User) => {
    try {
      const response = await axios.post("/api/user", {
        userEmail: user.email,
        userName: user.displayName || user.email?.split("@")[0] || "User",
      });

      setDbUser(response.data);
    } catch (error) {
      console.error("Error syncing user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // User is signed in, sync with our database
        syncUserWithDatabase(firebaseUser);
      } else {
        // User is signed out
        setDbUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <AuthContext.Provider value={{ user, dbUser, loading }}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
}

// Custom hook to use auth
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default Provider;
