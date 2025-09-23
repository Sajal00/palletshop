import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, FetchProductsParams } from '../../API/FetchProducts';
import { useNavigation } from '@react-navigation/native';


const useProductFetchHook = (initialPage = 1, pageSize = 10) => {
    const navigation = useNavigation();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(initialPage);
    const [totalPages, setTotalPages] = useState<number>(1);

    const getProducts = useCallback(
        async (pageToFetch: number = page) => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetchProducts({ page: pageToFetch, pageSize });
                const fetchedData = res.data?.data ?? [];
                setData(fetchedData);

                setPage(res.data?.currentPage ?? pageToFetch);
                setTotalPages(res.data?.totalPages ?? 1);
            } catch (err: any) {
                setError(err.message ?? 'Something went wrong');
            } finally {
                setLoading(false);
            }
        },
        [page, pageSize]
    );


    useEffect(() => {
        getProducts(page);
    }, [getProducts, page]);


    const nextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };


    const handleItemPress = (item: any) => {
        console.log('Clicked item:', item);
        navigation.navigate('Product',{ product: item });
    };

    const handlenavigateToCart: () => void = () => {
        navigation.navigate('Cart', { product: undefined });
    };

    return { data, loading, error, page, totalPages, nextPage, prevPage, handleItemPress,handlenavigateToCart };
};

export default useProductFetchHook;
