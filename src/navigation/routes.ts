import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AppRoutes = {
  Video: undefined;
  Home: undefined;
  InCall: { channel: string | number[]; token: string };
  EndCall: undefined;
  Detail: { name: string; callerToken: string; calleeToken: string };
};

export interface AppNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: StackNavigationProp<AppRoutes, RouteName>;
  route: RouteProp<AppRoutes, RouteName>;
}
