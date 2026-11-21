import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

import ReduxProvider from '@/components/Shared/ReduxProvider';
import SplashView from '@/components/Shared/SplashView';
import { fontFamily } from '@/constants/fonts';
import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 400, fade: true }); // fade-out is iOS only

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Registered under the token names from constants/fonts.js
  const [loaded] = useFonts({
    [fontFamily.regular]: Inter_400Regular,
    [fontFamily.medium]: Inter_500Medium,
    [fontFamily.semibold]: Inter_600SemiBold,
    [fontFamily.bold]: Inter_700Bold,
    [fontFamily.extrabold]: Inter_800ExtraBold,
  });

  // The native splash is hidden in ReduxProvider (PersistGate onBeforeLift), once state is restored too.
  if (!loaded) return <SplashView />;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ReduxProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(common)" />
            <Stack.Screen name="user" />
          </Stack>
        </SafeAreaProvider>
      </ReduxProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
