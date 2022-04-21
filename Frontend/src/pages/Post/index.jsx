import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogAddOrEdit from "../../components/DialogAddOrEdit";
import PostStatus from "../../components/PostStatus";
import PostItem from "./../../components/PostItem";
import { deletePost, getListPost } from "./../../redux/action";
import "./style.scss";

function Post(props) {
  const [openAddOrEdit, setOpenAddOrEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [temp, setTemp] = useState({});

  const dispatch = useDispatch();
  const { postList, dataCreate, dataDelete, dataEdit } = useSelector(
    (state) => state.reducer
  );

  useEffect(() => {
    dispatch(getListPost());
  }, [dataCreate, dataDelete, dataEdit, dispatch]);

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setTemp({});
  };

  const handleDelete = () => {
    dispatch(
      deletePost({
        id: temp._id,
      })
    );
    setOpenDelete(false);
  };

  console.log("Post");

  return (
    <section>
      <PostStatus setOpen={setOpenAddOrEdit} />
      {postList.map((item, index) => (
        <PostItem
          key={index}
          post={item}
          setTemp={setTemp}
          setOpenDelete={setOpenDelete}
          setOpenAddOrEdit={setOpenAddOrEdit}
        />
      ))}
      {openAddOrEdit && (
        <DialogAddOrEdit
          open={openAddOrEdit}
          setOpen={setOpenAddOrEdit}
          temp={temp}
          setTemp={setTemp}
        />
      )}

      {/* Dialog Delete */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete the post #<b>{temp.content}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>OK</Button>
          <Button onClick={handleCloseDelete} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default Post;
