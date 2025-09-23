import React from 'react';
import { View, Text, Alert,FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import useCartHook from '../Hooks/Cart/useCartHook';
import colors from '../Constant/colors';
import CustomButton from '../Components/CustomButton/CustomButton';

const CartScreen = () => {
    const { cart, addToCart, removeFromCart, clearCart, getQuantity } = useCartHook();

    const renderItem = ({ item }: { item: any }) => {
        const quantity = getQuantity(item.productId);

        return (
            <View style={styles.card}>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price ?? 0}</Text>
                </View>

                <View style={styles.counter}>
                    <TouchableOpacity
                        style={[styles.button, styles.minusButton]}
                        onPress={() => removeFromCart(item.productId)}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{quantity}</Text>

                    <TouchableOpacity
                        style={[styles.button, styles.plusButton]}
                        onPress={() => addToCart(item)}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <View style={styles.container}>
            {cart.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.productId}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />

                </>
            )}
            <CustomButton
                title={'Proceed'}
                onPress={() => Alert.alert('Under Development')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#555',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    price: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    minusButton: {
        backgroundColor: colors.primary
    },
    plusButton: {
        backgroundColor: colors.primary,
        marginLeft: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    quantity: {
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 4,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
    },
    clearButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default CartScreen;
