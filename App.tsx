import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

// Import screens
import { TestConnectionScreen } from './screens/TestConnectionScreen';
import { ProgramsListScreen } from './screens/ProgramsListScreen';
import { MultiPageLessonScreen } from './screens/MultiPageLessonScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TestConnection"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#141b2d',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="TestConnection"
            component={TestConnectionScreen}
            options={{ title: 'API Test' }}
          />
          <Stack.Screen
            name="ProgramsList"
            component={ProgramsListScreen}
            options={{ title: 'Programs' }}
          />
          <Stack.Screen
            name="MultiPageLesson"
            component={MultiPageLessonScreen}
            options={{ title: 'Lesson' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
