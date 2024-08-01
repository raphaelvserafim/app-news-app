export type RootStackParamList = {
  Home: undefined;
};

export interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onPress: () => void;
}

export interface ListRenderItemInfo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}