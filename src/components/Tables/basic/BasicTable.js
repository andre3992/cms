import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../../api/github";
import { deleteUser } from "actions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
import { newState } from "../../../helpers/deleteUser";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

function BasicTable(props) {
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "80vh",
    },
  });
  const classes = useStyles();
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    let usersPromises = users.map((user) => getUserInfo(user.login));
    Promise.all(usersPromises).then((userPromise) => {
      setAllUsers(userPromise);
    });
  }, [users]);

  const StyledTable = styled(Table)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      fontWeight: "bold",
      textTransform: "uppercase ",
    },
  }));

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <StyledTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Twitter</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((resp) => {
              return (
                <TableRow key={resp.id}>
                  <TableCell>{resp.name}</TableCell>
                  <TableCell align="right">{resp.twitter_username}</TableCell>
                  <TableCell align="right">{resp.company}</TableCell>
                  <TableCell align="right">{resp.location}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() =>
                        dispatch(deleteUser(newState(resp.login, users)))
                      }
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Paper>
  );
}
function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(BasicTable);
BasicTable.propTypes = {
  users: PropTypes.object,
};
