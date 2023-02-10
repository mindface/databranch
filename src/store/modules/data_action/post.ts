import { Action, Dispatch, AnyAction } from "redux";
import { Posts, SendPosts } from "../../../models/Posts";
import { FetchApi } from "../../../lib/fetch-api";

export const FETCH_POST_DATA_REQUEST = "FETCH_POST_DATA_REQUEST";
export const FETCH_POST_DATA_SUCCESS = "FETCH_POST_DATA_SUCCESS";
export const FETCH_POST_DATA_FAILURE = "FETCH_POST_DATA_FAILURE";

interface PostState {
  isFetching: boolean;
  postItems: Posts[];
}

const fetchApi = new FetchApi();

export function initalPostsState(): PostState {
  return {
    isFetching: true,
    postItems: [],
  };
}

export interface PostAction extends Action {
  type: string;
  postItems: Posts[];
}

export interface PostActionFailure extends Action {
  type: string;
  err: string;
}

export function postReducer(
  state: PostState = initalPostsState(),
  action: PostAction
) {
  switch (action.type) {
    case FETCH_POST_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
        postItems: [],
      };
    case FETCH_POST_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        postItems: action["postItems"],
      };
    case FETCH_POST_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        postItems: [],
      };
    default:
      return state;
  }
}

export const postFetchDataRequest = (): PostAction => {
  return {
    type: FETCH_POST_DATA_REQUEST,
    postItems: [],
  };
};

export const postFetchDataSuccess = (data: Posts[]): PostAction => {
  return {
    type: FETCH_POST_DATA_SUCCESS,
    postItems: data,
  };
};

export const postFetchDataFailure = (err: string): PostActionFailure => {
  return {
    type: FETCH_POST_DATA_FAILURE,
    err: err,
  };
};

export const AddPostData = (sendData: SendPosts) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(postFetchDataRequest());
    try {
      fetchApi
        .PostFetch<{
          post: SendPosts;
        }>(`http://localhost:3001/api/v1/posts`, { post: sendData })
        .then((data) => {
          console.log(data);
          dispatch<any>(getPostData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const UpdatePostData = (sendData: Posts) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(postFetchDataRequest());
    try {
      fetchApi
        .PutFetch<{ post: Posts; id?: number }>(
          `http://localhost:3001/api/v1/posts`,
          { post: sendData, id: sendData.id }
        )
        .then((data) => {
          console.log(data);
          dispatch<any>(getPostData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const deletePostData = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(postFetchDataRequest());
    try {
      fetchApi
        .DeleteFetch(`http://localhost:3001/api/v1/posts`, id)
        .then((data) => {
          dispatch<any>(getPostData());
        });
    } catch (err) {
      console.log(err);
      //  return dispatch(postFetchDataFailure(err))
    }
  };
};

export const getPostData = () => {
  return (dispatch: Dispatch) => {
    dispatch(postFetchDataRequest());
    fetchApi
      .GetFetch<Posts[]>(`http://localhost:3001/api/v1/posts/index`)
      .then((data) => {
        dispatch(postFetchDataSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        // dispatch(postFetchDataFailure(err))
      });
  };
};
