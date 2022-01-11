import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createNewPost, getPosts } from '../api/posts';

const KEY = 'posts';
export function useMutatePost(){
    const queryClient = useQueryClient();
    const {mutate,isLoading, error, isSuccess,reset} = useMutation(createNewPost,{
        onSuccess: ()=>{
          queryClient.invalidateQueries([KEY]);//cache invalidation action, if cache is invalid then reactQuery refresh the posts list.
        }
      });
      return {mutate,isLoading, error, isSuccess,reset}
}

export function usePosts(){
    const qc =  useQueryClient()
    //Queries
    const {data: posts,error, isLoading, isFetching/*, isIdle, refetch*/} = useQuery([KEY],getPosts,{
      //refetchOnWindowFocus:false, //this property refresh the data example if we move for other tabs and return react-query refresh our data.
      //staleTime: <time>|infinity// exist other properties to handle this kind of situation.
      //enabled:false, //this property is for no load the data automatically
   
    });
    return {data: posts,error, isLoading,qc, isFetching/*, isIdle, refetch*/};
}