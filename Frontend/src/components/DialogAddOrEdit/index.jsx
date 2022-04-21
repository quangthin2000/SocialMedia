import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createPost, editPost } from "../../redux/action";
import CustomField from "../CustomField";
import "./style.scss";

function DialogAddOrEdit({ open, setOpen, temp, setTemp }) {
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const { infoUser } = useSelector((state) => state.reducer);

  const handleClose = () => {
    setOpen(false);
    setImage("");
    setTemp({});
  };

  const initialValues = {
    content: temp._id ? temp.content : "",
  };

  const validateSchema = Yup.object().shape({
    content: Yup.string().required("Required!"),
  });

  const handleSubmitForm = (values) => {
    if (temp._id) {
      dispatch(
        editPost({
          ...values,
          id: temp._id,
          photo: image ? image : temp.photo,
        })
      );
    } else {
      dispatch(
        createPost({
          ...values,
          photo: image ? image : "",
          userId: infoUser.userId,
        })
      );
    }
    setOpen(false);
    setImage("");
    setTemp({});
  };

  return (
    <section className="dialog">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {temp._id ? "Edit Post" : "Create Post"}
        </DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values) => handleSubmitForm(values)}
          >
            <Form>
              <CustomField
                name="content"
                label="Content"
                placeholder="Enter your content..."
                type="text"
              />
              <Box className="dialog__wrapper">
                <input
                  type="file"
                  name=""
                  id="upload-image"
                  style={{ display: "none" }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="upload-image" className="dialog__upload">
                  Chọn ảnh
                </label>
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="dialog__image"
                  />
                ) : temp._id ? (
                  <img src={temp.photo} alt="" className="dialog__image" />
                ) : null}
              </Box>
              <Box className="dialog__btn">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  autoFocus
                  sx={{ marginLeft: 2 }}
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default DialogAddOrEdit;
