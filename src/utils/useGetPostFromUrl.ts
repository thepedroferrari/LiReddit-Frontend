import { usePostQuery } from '../generated/graphql';
import { useGetPostId } from './useGetPostId';

export const useGetPostFromUrl = () => {
  const postId = useGetPostId()
  const shouldPause = postId === -1;

  return usePostQuery({
    pause: shouldPause,
    variables: {
      id: postId
    }
  });
}
