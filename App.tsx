import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DoubleTapLikeGesture from './Screens/DoubleTapLikeGesture';
import ExploreInterpolate from './Screens/ExploreInterpolate';
import HomeScreen from './Screens/Home';
import Leaderboard from './Screens/Leaderboard';
import PagingDotsScreen from './Screens/PagingDotsScreen';
import PangestureGame from './Screens/PangestureGame';
import Schedule from './Screens/Schedule';

const App = () => {
  const RootStack = createStackNavigator({
    screens: {
      Home: {
        screen: HomeScreen,
        options: {
          headerStyle: {
            backgroundColor: '#f4511e',
          },
        },
      },
      PagingDots: {
        screen: PagingDotsScreen,
        options: {
          headerStyle: {
            backgroundColor: 'black',
          },
        },
        initialParams: { dotSize: 10 },
      },
      ExploreInterpolate: {
        screen: ExploreInterpolate,
      },
      DoubleTapLikeGesture: {
        screen: DoubleTapLikeGesture,
      },
      PangestureGame: {
        screen: PangestureGame,
      },
      Schedule: {
        screen: Schedule,
      },
      Leaderboard: {
        screen: Leaderboard,
        options: {
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
        },
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
