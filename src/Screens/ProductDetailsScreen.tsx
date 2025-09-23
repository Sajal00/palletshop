import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';
import { Text, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
    const { product } = route.params;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.name}</Text>
            <Text>ID: {product.id}</Text>
            <Text>Title: {product.title}</Text>
            <Text>Description: {product.shortDescription}</Text>
        </View>
    );
};

export default ProductDetailsScreen;
