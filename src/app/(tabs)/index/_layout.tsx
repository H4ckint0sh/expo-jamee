import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="news" options={{ headerShown: false }} />
            <Stack.Screen name="details" options={{ headerShown: false }} />
        </Stack>
    );
}