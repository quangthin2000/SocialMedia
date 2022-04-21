import ClearAllIcon from "@mui/icons-material/ClearAll";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { deleteAllNotify, deleteNotify, isRead } from "../../redux/action";

function Notify({ id, open, anchorEl, setAnchorEl, notifies }) {
  const dispatch = useDispatch();

  const handleDeleteNotify = (id) => {
    dispatch(deleteNotify(id));
  };

  const handleReadNotify = (id) => {
    dispatch(isRead(id));
  };

  const handleDeleteAllNotify = () => {
    dispatch(deleteAllNotify());
  };

  return (
    <Menu
      sx={{ marginTop: "50px", marginRight: "100px" }}
      id={id}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={() => setAnchorEl(null)}
      anchorEl={anchorEl}
    >
      <Box style={{ width: 300, maxHeight: 400, padding: "8px 0" }}>
        <Paper variant="outlined">
          <IconButton
            style={{ fontSize: 13, marginLeft: 10 }}
            onClick={handleDeleteAllNotify}
          >
            <ClearAllIcon style={{ marginRight: 6 }} />
            Delete All
          </IconButton>

          <List>
            {notifies.map((element, index) => (
              <Box key={index}>
                <Divider />
                <ListItem>
                  <ListItemButton
                    style={{ padding: "0 4px", margin: 0, borderRadius: 4 }}
                    onClick={() => handleReadNotify(element._id)}
                  >
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={element.fromUserId.fullName}
                      secondary={element.content}
                    />
                  </ListItemButton>
                  {!element.isRead && (
                    <Badge
                      color="primary"
                      variant="dot"
                      sx={{ marginLeft: 2 }}
                    />
                  )}

                  <IconButton onClick={() => handleDeleteNotify(element._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              </Box>
            ))}
          </List>
        </Paper>
      </Box>
    </Menu>
  );
}

export default memo(Notify);
