/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>, Paulo Pinho <paulo.pinho@caixamagica.pt>,
 *
 * @description Container to Home
 *
 * @version 20200116
 * @since 20200116 Initial release
 *
 */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import BasicTable from "../../../../components/Tables/basic";
//actions
import { requestGetUsers } from "../../../../actions/Users";

//Selectors
import { getUsers } from "../../../../selectors/Users";

/**
 * @context Container to Home
 * @returns {*}
 * @constructor
 */
const Home = (props) => {
  const { users } = props;
  //request get list user
  useEffect(() => {
    //willMountComponentWithUseEffect
    if (!users) props.requestGetUsers();
  }, [users]); //eslint-disable-line

  return (
    <div className="app-body">
      <div className="app-wrapper">{users ? <BasicTable /> : ""}</div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: getUsers(users),
  };
};

export default connect(mapStateToProps, {
  requestGetUsers,
})(Home);
