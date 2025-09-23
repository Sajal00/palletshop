import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';
import useProductFetchHook from '../Hooks/ProductList/useProductFetchHook';
import useCartHook from '../Hooks/Cart/useCartHook';
import colors from '../Constant/colors';
import CustomButton from '../Components/CustomButton/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = () => {
  const { data, loading, error, page, totalPages, nextPage, prevPage, handleItemPress, handlenavigateToCart } =
    useProductFetchHook(1, 10);
  const { addToCart, removeFromCart, getQuantity } = useCartHook();

  const renderProductItem = ({ item }: { item: any }) => {
    const count = getQuantity(item.productId);

    return (
      <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemWrapper}>
        <View style={styles.cardContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={[styles.stockText, { color: item.inStock ? 'green' : 'red' }]}>
            {item.inStock ? 'Available' : 'Not in Stock'}
          </Text>

          {count === 0 ? (
            <CustomButton
              title="Add to Cart"
              onPress={() => addToCart(item)}
              textStyle={styles.addToCartText}
            />
          ) : (
            <View style={styles.counterContainer}>
              <CustomButton
                title="-"
                onPress={() => removeFromCart(item.productId)}
                style={styles.counterButton}
                textStyle={styles.counterButtonText}
              />
              <Text style={styles.countText}>{count}</Text>
              <CustomButton
                title="+"
                onPress={() => addToCart(item)}
                style={styles.counterButton}
                textStyle={styles.counterButtonText}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item) => item.productId ?? item.id ?? Math.random().toString()}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          !loading && <Text style={{ textAlign: 'center', marginTop: 20 }}>No Data</Text>
        )}
      />

      <View style={styles.paginationContainer}>
        <CustomButton title="Prev" onPress={prevPage} disabled={page <= 1} />
        <Text style={styles.pageText}>
          Page {page} / {totalPages}
        </Text>
        <CustomButton title="Next" onPress={nextPage} disabled={page >= totalPages} />
      </View>

      <CustomButton title="Go To Cart" onPress={handlenavigateToCart} style={{ marginTop: 12 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  errorText: { color: 'red', marginBottom: 16 },

  itemWrapper: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardContainer: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 150,
  },

  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },

  stockText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },

  addToCartButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  counterButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  counterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  pageText: { fontSize: 16 },
});

export default HomeScreen;
