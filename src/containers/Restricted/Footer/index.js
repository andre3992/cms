/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>, Paulo Pinho <paulo.pinho@caixamagica.pt>,
 *
 * @description Container to Footer
 *
 * @version 20200116
 * @since 20200116 Initial release
 *
 */

import React from "react";
import IntlMessages from "util/IntlMessages";

/**
 * @context Container to Footer
 *
 * @returns {*}
 * @constructor
 */
const Footer = () => (
  <footer className="app-footer">
    <span className="d-inline-block">
      &copy;
      <IntlMessages id="footer.copyright" />
    </span>
  </footer>
);

export default Footer;
