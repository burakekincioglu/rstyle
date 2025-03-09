import { createNavigationContainerRef, NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createStackNavigator, type StackScreenProps } from '@react-navigation/stack';
import { SidebarClose } from 'lucide-react-native';
import React, { useRef } from 'react';
import CircularCarousel from './Screens/CircularCarousel';
import DoubleTapLikeGesture from './Screens/DoubleTapLikeGesture';
import ExploreInterpolate from './Screens/ExploreInterpolate';
import HomeScreen from './Screens/Home';
import Leaderboard from './Screens/Leaderboard';
import NewRecording from './Screens/NewRecording';
import Pagination from './Screens/Pagination';
import PagingDotsScreen from './Screens/PagingDotsScreen';
import PangestureGame from './Screens/PangestureGame';
import Schedule from './Screens/Schedule';
import VoiceRecord from './Screens/VoiceRecord';

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
  NewRecording: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<AppStackParamList, T>

const Stack = createStackNavigator<AppStackParamList>();

export const navigationRef = createNavigationContainerRef<AppStackParamList>()

const AppStack = React.memo(() => (
  <Stack.Navigator>
          <Stack.Screen 
            name='Home' 
            component={HomeScreen} 
            options={{
              headerStyle: {backgroundColor: '#f4511e'}
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
              headerLeft: () => {
                return <SidebarClose />
              }
            }}
          />
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
