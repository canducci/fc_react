import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  email: string;
  role: "user" | "admin";
}

interface AuthContextState {
  user?: User;
}

export interface AuthContext extends AuthContextState {
  login(email: string, password: string): Promise<void>;
  logout(): void;
}

const authContext = createContext<AuthContext>(null!);

export const AuthProvider = (props: { children?: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthContextState>(null!);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthState({ user: JSON.parse(user) });
    }
  }, []);

  function login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (email) {
        const role =
          password === "a" ? "user" : password === "b" ? "admin" : null;

        if (role) {
          const usr: User = { email: email, role: role };
          localStorage.setItem("user", JSON.stringify(usr));
          setAuthState({ user: usr });
          resolve();
          return;
        }
      }

      reject("Invalid credential");
    });
  }

  function logout() {
    localStorage.removeItem("user");
    setAuthState(null!);
  }

  return (
    <authContext.Provider
      value={{ ...authState, login, logout }}
      children={props.children}
    />
  );
};

export function useAuth() {
  return useContext(authContext);
}