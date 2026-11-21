import { Persistor, store } from '@/redux/store'
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SplashView from './SplashView'

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return <Provider store={store}>
        {/* Mounted only after fonts load (app/_layout.tsx), so this hides the native splash once
            fonts AND persisted state are ready. SplashView is just a fallback. */}
        <PersistGate loading={<SplashView />} onBeforeLift={() => SplashScreen.hide()} persistor={Persistor}>
            {children}
        </PersistGate>
    </Provider>
}
