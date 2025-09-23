import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';
import useProductFetchHook from '../Hooks/ProductList/useProductFetchHook';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = () => {
  const { data, loading, error, page, totalPages, nextPage, prevPage, refetch, handleItemPress } =
    useProductFetchHook(1, 10);

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>


      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item) => item.productId ?? item.id ?? Math.random().toString()}
        renderItem={renderProductItem}
        ListEmptyComponent={() => (
          !loading && <Text style={{ textAlign: 'center', marginTop: 20 }}>No Data</Text>
        )}
      />

      <View style={styles.paginationContainer}>
        <Button title="Prev" onPress={prevPage} disabled={page <= 1} />
        <Text style={styles.pageText}>
          Page {page} / {totalPages}
        </Text>
        <Button title="Next" onPress={nextPage} disabled={page >= totalPages} />
      </View>

      <Button title="Refetch" onPress={refetch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'pink' },
  title: { fontSize: 20, marginBottom: 16, fontWeight: 'bold' },
  errorText: { color: 'red', marginBottom: 16 },
  itemContainer: {
    padding: 16, 
    backgroundColor: 'white',
    marginBottom: 12, 
    borderRadius: 12, 
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
   
    elevation: 5,
  
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
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
