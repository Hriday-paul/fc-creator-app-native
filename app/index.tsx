import { RootState } from '@/redux/store';
import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';

// Entry point: logged-in users go to the app, everyone else to the welcome screen
export default function Index() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return <Redirect href={accessToken ? '/user/home' : '/(auth)/welcome'} />;
}
