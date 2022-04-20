import { StatusBar } from "expo-status-bar";
import { QueryClientProvider, QueryClient } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/global";
import RootStack from "./src/router/Rootstack";

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RootStack />
        </QueryClientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
