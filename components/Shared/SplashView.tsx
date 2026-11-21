import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';

// Splash screen (Figma Auth 37327:483): white background, FC crest centred at 270×247.
// JS fallback for the native splash (app.json → assets/images/splash.png, generated from
// assets/source/logo-original.png). Normally the native splash covers boot and this never shows.
export default function SplashView() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            {/* Always white background, so force dark status bar icons (dark-mode phones would get light ones) */}
            <StatusBar style="dark" />
            <Image
                source={require('@/assets/images/logo.png')}
                className="w-[270px] h-[247px]"
                resizeMode="contain"
                accessibilityLabel="FC Creator"
            />
        </View>
    );
}
