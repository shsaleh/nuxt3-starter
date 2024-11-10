import { useNavigation, type Tnavigation } from '~/store/navigation'

export const useAddNavigation = (items: Tnavigation['state']['items']) => {
  const navigation = useNavigation()
  navigation.setItems([...navigation.items, ...items])
}
