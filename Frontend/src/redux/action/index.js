import axios from "axios";
import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  EMAIL_VERIFY,
  GET_LIST_POST,
  LOADING,
  LOGIN,
  GET_NOTIFIES,
} from "../../utils/constant";
import history from "../../utils/history";
import { toastError, toastSuccess } from "../../utils/toast";

const url = "http://192.168.68.51:3000/api";

export const loading = (params) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: params,
  });
};

export const login = (params) => async (dispatch) => {
  const { checkRemember } = params;

  try {
    dispatch(loading(true));

    const response = await axios.post(`${url}/auth/login`, { ...params });

    dispatch({
      type: LOGIN,
      payload: response.data.user,
    });

    localStorage.setItem("token", response.data.accessToken);
    localStorage.removeItem("prevEmail");

    if (checkRemember) {
      localStorage.setItem("prevEmail", response.data.user.email);
    }

    dispatch(loading(false));

    toastSuccess(response.data.msg);
    history.push("/post");
  } catch (error) {
    toastError(error.response.data.msg);
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch(loading(true));

    const res = await axios.post(`${url}/auth/register`, data);
    dispatch({
      type: EMAIL_VERIFY,
      payload: data.email,
    });

    dispatch(loading(false));

    toastSuccess(res.data.msg);
    history.push("/verify-email");
  } catch (error) {
    toastError(error.response.data.msg);

    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN,
      payload: {},
    });

    localStorage.removeItem("token");

    history.push("/");
  } catch (error) {
    toastError(error.response.data.msg);
  }
};

export const checkToken = (token) => async (dispatch) => {
  try {
    const headers = { authorization: `Bearer ${token}` };
    const res = await axios.get(`${url}/user/token/info`, { headers });

    dispatch({
      type: LOGIN,
      payload: res.data.user,
    });
  } catch (error) {
    // toastError("Please login now!");
  }
};

export const imageUpload = async (image) => {
  const formData = new FormData();

  formData.append("file", image);

  formData.append("upload_preset", "efxjficn");
  formData.append("cloud_name", "devat-channel");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/devat-channel/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.url;
};

export const getListPost = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${url}/post`, { headers });

    dispatch({
      type: GET_LIST_POST,
      payload: response.data.data,
    });
  } catch (error) {
    toastError(error.response.data.error);
    if (error.response.data.status === 456) dispatch(logout());
  }
};

export const createPost = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  const { photo } = params;

  try {
    dispatch(loading(true));

    const imageUpdated = await imageUpload(photo);

    const response = await axios.post(
      `${url}/post`,
      { ...params, photo: imageUpdated },
      { headers }
    );

    dispatch(loading(false));

    dispatch({
      type: CREATE_POST,
      payload: response.data.data,
    });

    if (response.data.success) toastSuccess(response.data.success);
  } catch (error) {
    toastError(error.response.data.error);
    if (error.response.data.status === 456) dispatch(logout());
  }
};

export const deletePost = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  const { id } = params;

  try {
    dispatch(loading(true));

    const response = await axios.delete(`${url}/post/${id}`, { headers });

    dispatch(loading(false));

    dispatch({
      type: DELETE_POST,
      payload: response.data,
    });

    if (response.data.success) toastSuccess(response.data.success);
  } catch (error) {
    toastError(error.response.data.error);
    if (error.response.data.status === 456) dispatch(logout());
  }
};

export const editPost = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  const { id, photo } = params;

  try {
    dispatch(loading(true));

    const imageUpdated = await imageUpload(photo);

    const response = await axios.put(
      `${url}/post/${id}`,
      { ...params, photo: imageUpdated },
      { headers }
    );

    dispatch(loading(false));

    dispatch({
      type: EDIT_POST,
      payload: response.data,
    });

    if (response.data.success) toastSuccess(response.data.success);
  } catch (error) {
    toastError(error.response.data.error);
    if (error.response.data.status === 456) dispatch(logout());
  }
};

export const createComment = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  try {
    await axios.post(`${url}/comment`, { ...params }, { headers });

    //create Notify
    const notify = {
      toUserId: params.toUserId,
      content: "commented your post",
      postId: params.postId,
    };

    dispatch(createNotify(notify, token));
  } catch (error) {
    toastError("Comment Fail");
  }
};

export const deleteComment = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };
  const { id } = params;

  try {
    await axios.delete(`${url}/comment/${id}`, { headers });
  } catch (error) {
    toastError("Delete Fail");
  }
};

export const createNotify = (data, token) => async (dispatch) => {
  const headers = { authorization: `Bearer ${token}` };

  try {
    await axios.post(`${url}/notification`, { ...data }, { headers });

    dispatch(getNotify());
  } catch (error) {
    console.log(error.response);
  }
};

export const getNotify = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  try {
    const res = await axios.get(`${url}/notification`, { headers });

    dispatch({
      type: GET_NOTIFIES,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteNotify = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  try {
    await axios.delete(`${url}/notification/${id}`, { headers });

    dispatch(getNotify());
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteAllNotify = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  try {
    await axios.delete(`${url}/notification`, { headers });

    dispatch(getNotify());
  } catch (error) {
    console.log(error.response);
  }
};

export const handleLike = (params) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  const { postId, toUserId } = params;

  try {
    const response = await axios.put(
      `${url}/post/like/${postId}`,
      { ...params },
      { headers }
    );

    if (response.status === 200) {
      const notify = {
        toUserId,
        content: "liked your post",
        postId,
      };
      dispatch(createNotify(notify, token));
    }
  } catch (error) {
    toastError("Like Fail");
  }
};

export const isRead = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  try {
    await axios.put(`${url}/notification/${id}`, {}, { headers });

    dispatch(getNotify());
  } catch (error) {
    console.log(error.response);
  }
};

export const editCommentAction = (idComment, content) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { authorization: `Bearer ${token}` };

  try {
    await axios.put(`${url}/comment/${idComment}`, { content }, { headers });
  } catch (error) {
    console.log(error.response);
  }
};
