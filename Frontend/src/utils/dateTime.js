import moment from "moment";

const formatDateTime = (time) => {
  return moment(time).format("LLL");
};

export default formatDateTime;
