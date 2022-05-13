import { StatusBar } from "expo-status-bar";
import { QueryClientProvider, QueryClient } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/global";
import RootStack from "./src/router/Rootstack";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/shared/Toast";
import VignetteContextProvider from "./src/global/vignetteContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AuthProvider>
          <VignetteContextProvider>
            <QueryClientProvider client={queryClient}>
              <RootStack />
            </QueryClientProvider>
          </VignetteContextProvider>
        </AuthProvider>
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" bottomOffset={20} />
    </>
  );
}
