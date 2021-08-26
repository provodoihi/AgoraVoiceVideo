import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AppRoutes = {
  Video: undefined;
  Voice: {token: string};
  Home: undefined;
  InCall: { channel: string | number[]; token:string };
  Detail: {item: any};
};

export interface AppNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: StackNavigationProp<AppRoutes, RouteName>;
  route: RouteProp<AppRoutes, RouteName>;
}
