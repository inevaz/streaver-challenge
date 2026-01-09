import useSWR from "swr";

//defining Post type
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

//fetcher function to get data from the API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

//custom hook to fetch posts
export default function usePosts(
  userId?: number,
  onSlowConnection?: () => void
) {
//depending on whether userId is provided, set the URL accordingly
  const url = userId
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    : `https://jsonplaceholder.typicode.com/posts`;

//using SWR to fetch data (1- fetching, 2- caching, 3- revalidation)
  const { data, error, isLoading, isValidating } = useSWR<Post[]>(
    url, //url to fetch data from
    fetcher, //fetcher function
    {
      //config
      revalidateOnFocus: true, //update data when window gets focused
      revalidateOnReconnect: true, //update data when reconnecting internet
      shouldRetryOnError: true, //retry on error
      errorRetryCount: 3, //number of retry attempts
      errorRetryInterval: 5000, //time in ms between retries
      loadingTimeout: 3000, //time in ms to consider connection slow (3s)
      dedupingInterval: 0, //disable cache for testing
      revalidateIfStale: true, 
      onLoadingSlow: () => { 
        console.log("Slow connection detected"); //log message if connection is slow 
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
