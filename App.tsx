import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CircularCarousel from './Screens/CircularCarousel';
import DoubleTapLikeGesture from './Screens/DoubleTapLikeGesture';
import ExploreInterpolate from './Screens/ExploreInterpolate';
import HomeScreen from './Screens/Home';
import Leaderboard from './Screens/Leaderboard';
import Pagination from './Screens/Pagination';
import PagingDotsScreen from './Screens/PagingDotsScreen';
import PangestureGame from './Screens/PangestureGame';
import Schedule from './Screens/Schedule';
import VoiceRecord from './Screens/VoiceRecord';

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
          headerBackTitleVisible: false
        },
      },
      Pagination: {
        screen: Pagination
      },
      CircularCarousel: {
        screen: CircularCarousel,
        options: {
          headerTransparent: true,
          title: ''
        }
      },
      VoiceRecord: {
        screen: VoiceRecord
      }
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
