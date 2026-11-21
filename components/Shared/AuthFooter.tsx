import { Text } from 'react-native';

// Footer line on the auth forms (Figma Auth screens 4–5): Inter Regular 12 / 17.875, muted, centred.
export default function AuthFooter({ className = '' }: { className?: string }) {
    return (
        <Text className={`w-full text-center font-app text-label leading-[17.875px] text-muted ${className}`}>
            Community Member Platform · Secure 256-bit Member Privacy
        </Text>
    );
}
