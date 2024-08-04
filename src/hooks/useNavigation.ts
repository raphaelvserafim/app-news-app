import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/model';

export function useNavigationHook() {
  const navigation = useNavigation<NavigationProp>();
  const navigateToHome = () => navigation.navigate('Home');
  
  const navigateToNews = (id: number) => {
    navigation.navigate('NewsDetail', { id });
  };
  return {
    navigateToHome,
    navigateToNews
  };
};

