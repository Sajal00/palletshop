import { BASE_URL } from '@env';

export interface FetchProductsParams {
  page: number | string;
  pageSize?: number | string;
  sort?: {
    creationDateSortOption: 'ASC' | 'DESC';
  };
}

export interface FetchProductsResponse {
  // adjust if you know the exact structure
  data?: {
    currentPage?: number;
    pageSize?: number;
    totalPages?: number;
    totalRecords?: number;
    data?: any[];
  };
  message?: string;
  statusCode?: number;
  [key: string]: any;
}

export const fetchProducts = async (
  params: FetchProductsParams
): Promise<FetchProductsResponse> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page: params.page.toString(),
      pageSize: (params.pageSize ?? 10).toString(),
      sort: params.sort ?? { creationDateSortOption: 'DESC' },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('data from FetchProduct function', data);
  return data;
};
