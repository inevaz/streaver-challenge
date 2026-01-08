import useSWR from "swr";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function usePosts(
  userId?: number,
  onSlowConnection?: () => void
) {
  const url = userId
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    : `https://jsonplaceholder.typicode.com/posts`;

  const { data, error, isLoading, isValidating } = useSWR<Post[]>(
    url,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      loadingTimeout: 500,
      dedupingInterval: 0, // Deshabilitar cache para testing
      revalidateIfStale: true,
      onLoadingSlow: () => {
        console.log("Slow connection detected"); // Para debug
        if (onSlowConnection) onSlowConnection();
      },
    }
  );

  return {
    posts: data,
    loading: isLoading,
    error,
    isValidating,
  };
}
