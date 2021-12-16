import React, { useEffect, useRef } from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import URLSearchParams from "url-search-params";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import "assets/vendors/style";
import cyanTheme from "./themes/cyanTheme";
import AppLocale from "../lngProvider";
import Home from "./Restricted/Contents/Home";
import MainApp from "../app/index";
import asyncComponent from "util/asyncComponent";
import { setDarkTheme, setThemeColor } from "../actions/Setting";
import { BASENAME_URL } from "../constants/Settings";

const App = (props) => {
  const { locale, isDirectionRTL } = props;
  const prevProps = useRef(props);
  const isDarkTheme = props.isDarkTheme;

  useEffect(() => {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    const params = new URLSearchParams(prevProps.current.location.search);
    if (params.has("theme-name")) {
      prevProps.current.setThemeColor();
    }
    if (params.has("dark-theme")) {
      prevProps.current.setDarkTheme();
    }
  }, []);

  let applyTheme = isDarkTheme
    ? createTheme({
        palette: {
          type: "dark",
        },
      })
    : createTheme(cyanTheme);

  if (isDirectionRTL) {
    applyTheme.direction = "rtl";
    document.body.classList.add("rtl");
  } else {
    document.body.classList.remove("rtl");
    applyTheme.direction = "ltr";
  }

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ThemeProvider theme={applyTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <div className={`app-main ${isDarkTheme ? "dark-theme" : ""}`}>
            <Switch>
              <Route path={`${BASENAME_URL}`} component={MainApp} />
              <Route path={`${BASENAME_URL}/home`} component={Home} />
              <Route
                component={asyncComponent(() =>
                  import("../components/Error404")
                )}
              />
            </Switch>
          </div>
        </IntlProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ settings }) => {
  const { themeColor, sideNavColor, darkTheme, locale, isDirectionRTL } =
    settings;
  return {
    themeColor,
    sideNavColor,
    isDarkTheme: darkTheme,
    locale,
    isDirectionRTL,
  };
};

export default connect(mapStateToProps, { setThemeColor, setDarkTheme })(App);
