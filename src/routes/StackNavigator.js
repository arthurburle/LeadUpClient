import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './RootNavigation';

import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import CardCreateScreen from '../screens/CardCreateScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import CardListScreen from '../screens/CardListScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="CardList" component={CardListScreen} />
        <Stack.Screen name="CardCreate" component={CardCreateScreen} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
