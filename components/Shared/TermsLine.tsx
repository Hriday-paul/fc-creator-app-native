import { Text } from 'react-native';

// "By continuing, you agree to…" line (Figma Auth: Welcome, Verify Email, Pending Approval).
// Inter Regular 11 / 17.875, muted, max 281px wide so it wraps onto two lines.
// TODO: link Terms of Service / Privacy Policy once the pages exist.
export default function TermsLine({ className = '' }: { className?: string }) {
    return (
        <Text className={`w-full max-w-[281px] text-center font-app text-caption leading-[17.875px] text-muted ${className}`}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
    );
}
