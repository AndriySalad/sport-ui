import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUserProfileDate } from "./Utils";

interface AuthContextType {
  user: IUserProfileDate | null;
  setUserProfileData: (user: IUserProfileDate | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUserProfileDate | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUserProfileData: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
