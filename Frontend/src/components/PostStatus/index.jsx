import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PhotoIcon from "@mui/icons-material/Photo";
import {
  Avatar,
  Box,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { memo } from "react";
import "./style.scss";

function PostStatus({ setOpen }) {
  return (
    <Card className="status" onClick={() => setOpen(true)}>
      <Box className="status__wrapper">
        <Avatar
          sx={{ bgcolor: red[500], marginRight: 2, cursor: "pointer" }}
          aria-label="recipe"
        >
          R
        </Avatar>
        <TextField
          id="outlined-basic"
          label="Bạn đang nghĩ gì?"
          variant="outlined"
          className="status__input"
          disabled
        />
      </Box>
      <Divider />
      <Box className="status__wrapper">
        <Box className="status__wrapper--icon">
          <PhotoIcon className="status__icon status__icon--photo" />
          <Typography
            variant="body2"
            color="text.primary"
            gutterBottom
            sx={{ marginBottom: 0 }}
          >
            Photo/Video
          </Typography>
        </Box>
        <Box className="status__wrapper--icon">
          <GroupAddIcon className="status__icon status__icon--friend" />
          <Typography
            variant="body2"
            color="text.primary"
            gutterBottom
            sx={{ marginBottom: 0 }}
          >
            Tag Friends
          </Typography>
        </Box>
        <Box className="status__wrapper--icon">
          <EmojiEmotionsIcon className="status__icon status__icon--felling" />
          <Typography
            variant="body2"
            color="text.primary"
            gutterBottom
            sx={{ marginBottom: 0 }}
          >
            Feeling/Activity
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

// export default PostStatus;
export default memo(PostStatus);
