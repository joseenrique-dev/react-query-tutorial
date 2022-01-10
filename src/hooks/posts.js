import { useMutation, useQueryClient } from 'react-query';
import { createNewPost } from '../api/posts';

export function useMutatePost(){
    const queryClient = useQueryClient();
    const {mutate,isLoading, error, isSuccess,reset} = useMutation(createNewPost,{
        onSuccess: ()=>{
          queryClient.invalidateQueries(['posts']);//cache invalidation action, if cache is invalid then reactQuery refresh the posts list.
        }
      });
      return {mutate,isLoading, error, isSuccess,reset}
}