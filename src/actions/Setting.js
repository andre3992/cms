/**
 * @author Victor Andrade <victor.andrade@caixamagica.pt>,
 *
 * @description redux Actions - Setting
 *
 * @version 20200116
 * @since 20200116 Initial release
 *
 */

import {
  DARK_THEME,
  SWITCH_LANGUAGE,
  THEME_COLOR,
} from "../constants/Settings";

export function setThemeColor(color) {
  localStorage.setItem("user_theme", color);
  return { type: THEME_COLOR, color };
}

export function setDarkTheme(color) {
  return { type: DARK_THEME };
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale,
  };
}
