import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import useCartHook from '../Hooks/Cart/useCartHook';
import colors from '../Constant/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

const ProductDetailsScreen: React.FC<Props> = ({ route }) => {
  const { product } = route.params;
  const { addToCart, removeFromCart, getQuantity } = useCartHook();

  // Get quantity for this product
  const quantity = getQuantity(product.productId ?? product.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Basic info */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{product.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{product.title}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{product.shortDescription}</Text>
        </View>

        {/* Variants */}
        {product.variants && product.variants.length > 0 ? (
          product.variants.map((variant: any, index: number) => (
            <View key={index} style={styles.variantCard}>
              <Text style={styles.variantTitle}>Variant {index + 1}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Barcodes:</Text>
                <Text style={styles.value}>{variant.barcodes?.join(', ') || 'N/A'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Calories:</Text>
                <Text style={styles.value}>{variant.calories ?? 'N/A'}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.value}>No variants available</Text>
        )}

        {/* Add to Cart / Counter */}
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(product)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => removeFromCart(product.productId ?? product.id)}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.countText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => addToCart(product)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
    marginRight: 6,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  variantCard: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
  },
  variantTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  },
  addToCartButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  // Counter styles
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  counterButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  counterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;
