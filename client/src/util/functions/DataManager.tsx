import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { setAllPost, setIsInProfile, setOwnerInfo, setPostArr } from '../../redux/Slice/PostSlice';
import { postService } from '../../services/PostService';
import { setUser } from '../../redux/Slice/UserSlice';

const useAllPostsData = () => {
  const dispatch = useDispatch();
  // const allPost = useSelector((state: any) => state.postReducer.allPost);
  // const userInfo = useSelector((state: any) => state.userReducer.userInfo);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['allPosts'],
    queryFn: async () => {
      dispatch(setIsInProfile(false));
      const { data } = await postService.getAllPost();
      return data;
    },
    onSuccess(data) {
      dispatch(setAllPost(data.content));
      dispatch(setUser(data.content));
    },
    onError(err) {
      console.log(err);
    },
  });

  return { isLoading, isError, allPost: data?.content?.allPostArr, userInfo: data?.content?.userInfo, isFetching };
};

const usePostsData = (userID: String) => {
  const dispatch = useDispatch();
  // const postArray = useSelector((state: any) => state.postReducer.postArr);
  // const userInfo = useSelector((state: any) => state.userReducer.userInfo);
  // const ownerInfo = useSelector((state: any) => state.postReducer.ownerInfo);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['posts', userID],
    queryFn: async () => {
      if (userID === 'me') {
        dispatch(setIsInProfile(true));
      } else {
        dispatch(setIsInProfile(false));
      }
      const { data } = await postService.getAllPostByUserID(userID);
      return data;
    },
    enabled: !!userID,
    onSuccess(data) {
      dispatch(setPostArr(data.content));
      dispatch(setUser(data.content));
      dispatch(setOwnerInfo(data.content));
    },
    onError(err) {
      console.log(err);
    },
  });

  return {
    isLoading,
    isError,
    postArray: data?.content?.postArr,
    userInfo: data?.content?.userInfo,
    ownerInfo: data?.content?.ownerInfo,
    isFetching,
  };
};

export { useAllPostsData, usePostsData };
