import { StatusBar } from "expo-status-bar";
import { QueryClientProvider, QueryClient } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/global";
import { TransfertProvider } from "./src/global/transfertContext";
import RootStack from "./src/router/Rootstack";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/shared/Toast";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <TransfertProvider>
              <RootStack />
            </TransfertProvider>
          </QueryClientProvider>
        </AuthProvider>
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" bottomOffset={20} />
    </>
  );
}
