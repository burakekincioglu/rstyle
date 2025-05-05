import { createNavigationContainerRef, NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createStackNavigator, type StackScreenProps } from '@react-navigation/stack';
import React, { useRef } from 'react';
import CircularCarousel from './Screens/CircularCarousel';
import DoubleTapLikeGesture from './Screens/DoubleTapLikeGesture';
import ExploreInterpolate from './Screens/ExploreInterpolate';
import HomeScreen from './Screens/Home';
import InfiniteScroll from './Screens/InfiniteScroll/InfiniteScroll';
import ProductDetails from './Screens/InfiniteScroll/ProductDetails';
import Leaderboard from './Screens/Leaderboard';
import NewRecording from './Screens/NewRecording';
import Pagination from './Screens/Pagination';
import PagingDotsScreen from './Screens/PagingDotsScreen';
import PangestureGame from './Screens/PangestureGame';
import Schedule from './Screens/Schedule';
import Skia from './Screens/Skia';
import SupaBase from './Screens/SupaBase';
import VoiceRecord from './Screens/VoiceRecord';
import WelcomeScreen from './Screens/WelcomeScreen';

export interface AppStackParamList extends ParamListBase {
  Home: undefined;
  PagingDots: undefined;
  ExploreInterpolate: undefined;
  DoubleTapLikeGesture: undefined;
  PangestureGame: undefined;
  Schedule: undefined;
  Leaderboard: undefined;
  Pagination: undefined;
  CircularCarousel: undefined;
  VoiceRecord: undefined;
  NewRecording: {uri: string};
  SupaBase: undefined;
  ProductDetails: { productId: string };
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<AppStackParamList, T>

const Stack = createStackNavigator<AppStackParamList>();

export const navigationRef = createNavigationContainerRef<AppStackParamList>()

const AppStack = React.memo(() => (
  <Stack.Navigator
    screenOptions={{headerShown: true}}
  >
          <Stack.Screen 
            name='Home' 
            component={HomeScreen} 
            options={{
              headerStyle: {backgroundColor: '#f4511e'},
              title: '📱',
            }}
          />
          <Stack.Screen 
            name='PagingDots' 
            component={PagingDotsScreen}
            options={{
              headerStyle: { backgroundColor: 'black'}
            }}
          />
          <Stack.Screen name='ExploreInterpolate' component={ExploreInterpolate} />
          <Stack.Screen name='DoubleTapLikeGesture' component={DoubleTapLikeGesture} />
          <Stack.Screen name='PangestureGame' component={PangestureGame} />
          <Stack.Screen name='Schedule' component={Schedule} />
          <Stack.Screen 
            name='Leaderboard' 
            component={Leaderboard}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: ''
            }}
          />
          <Stack.Screen name='Pagination' component={Pagination} />
          <Stack.Screen 
            name='CircularCarousel' 
            component={CircularCarousel}
            options={{
              headerTransparent: true,
              title: ''
            }}
          />
          <Stack.Screen name='VoiceRecord' component={VoiceRecord} />
          <Stack.Screen 
            name='NewRecording' 
            component={NewRecording}
            options={{
              presentation: 'modal',
              headerBackButtonDisplayMode: 'generic'
            }}
          />
          <Stack.Screen name='SupaBase' component={SupaBase} />
          <Stack.Screen name='Skia' component={Skia} />
          <Stack.Screen 
            name='InfiniteScroll' 
            options={{
              headerTitleAlign: 'left',
              headerMode: 'screen',
              headerTitle: 'Infinite Scroll',
              headerTransparent: true
            }} 
            component={InfiniteScroll} 
          />
          <Stack.Screen 
            name='ProductDetails' 
            component={ProductDetails} 
            options={{
              presentation: 'modal',
              headerBackButtonDisplayMode: 'generic'
            }}
          />
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        </Stack.Navigator>
))

const AppNavigator = () => {
  const routeNameRef = useRef<string>()

  return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name
        }}
      >
        <AppStack />
      </NavigationContainer>
  );
};

export default AppNavigator;
