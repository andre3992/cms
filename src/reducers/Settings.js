/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>,
 *
 * @description redux Reducers - Setting
 *
 * @version 20200116
 * @since 20200116 Initial release
 *
 */

import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  DARK_THEME,
  DRAWER_TYPE,
  FIXED_DRAWER,
  SWITCH_LANGUAGE,
  THEME_COLOR,
  TOGGLE_COLLAPSED_NAV,
  HORIZONTAL_NAVIGATION,
  WINDOW_WIDTH,
} from "../constants/Settings";

const rltLocale = ["ar"];
const initialSettings = {
  navCollapsed: false,
  drawerType: FIXED_DRAWER,
  themeColor: "cms",
  darkTheme: false,
  width: window.innerWidth,
  isDirectionRTL: false,
  navigationStyle: HORIZONTAL_NAVIGATION,
  locale: {
    languageId: "portuguese",
    locale: "pt",
    name: "Portuguese",
    icon: "pt",
  },
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      return {
        ...state,
        navCollapsed: false,
      };
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.isNavCollapsed,
      };
    case DRAWER_TYPE:
      return {
        ...state,
        drawerType: action.drawerType,
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case THEME_COLOR:
      return {
        ...state,
        darkTheme: false,
        themeColor: action.color,
      };
    case DARK_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
        isDirectionRTL: rltLocale.includes(action.payload.locale),
      };
    case CHANGE_DIRECTION:
      return {
        ...state,
        isDirectionRTL: !state.isDirectionRTL,
      };

    case CHANGE_NAVIGATION_STYLE:
      return {
        ...state,
        navigationStyle: "HORIZONTAL_NAVIGATION",
      };

    default:
      return state;
  }
};

export default settings;
