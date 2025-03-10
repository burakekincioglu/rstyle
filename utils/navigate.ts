import { NavigationState } from "@react-navigation/native"
import { AppStackParamList, navigationRef } from "../AppNavigator"


export function getActiveRouteName(state: ReturnType<typeof navigationRef.getRootState>) {
    const route = state.routes[state.index]
  
    if (!route.state) return route.name
  
    return getActiveRouteName(route.state as NavigationState<AppStackParamList>)
  }

export function navigate(...args: Parameters<typeof navigationRef.navigate>) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(...args)

    }
  }