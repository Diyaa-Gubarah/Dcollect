import {
  DEFAULT_DARK_THEME_ID,
  DEFAULT_LIGHT_THEME_ID,
  DarkTheme,
  LightTheme
} from "../constants/themes";
import { ITheme, IThemeProps, IThemeProvidedValue } from "../types/theme";
import { getData, saveData } from "../utils/utils";

import React from "react";

const Context = React.createContext<IThemeProvidedValue>({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = React.memo<IThemeProps>((props) => {
  const [theme, setTheme] = React.useState<ITheme>(props.initial);

  const setCurrentThemeId = React.useCallback(
    async (id: string) => {
      await saveData("themeId", id);
    },
    [theme.id]
  );

  const onLoad = React.useCallback(async () => {
    const themeId = await getData("themeId");

    if (themeId) {
      setTheme(themeId === DEFAULT_LIGHT_THEME_ID ? LightTheme : DarkTheme);
    }
  }, [theme.id]);

  const ToggleThemeCallback = React.useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme.id === DEFAULT_LIGHT_THEME_ID ? DarkTheme : LightTheme
    );
    setCurrentThemeId(
      theme.id === DEFAULT_LIGHT_THEME_ID
        ? DEFAULT_DARK_THEME_ID
        : DEFAULT_LIGHT_THEME_ID
    );
  }, [setTheme, theme.id]);

  const MemoizedValue = React.useMemo(() => {
    const value: IThemeProvidedValue = {
      theme,
      toggleTheme: ToggleThemeCallback,
    };
    return value;
  }, [theme.id, ToggleThemeCallback]);

  React.useEffect(() => {
    onLoad();
  }, []);

  return (
    <Context.Provider value={MemoizedValue}>{props.children}</Context.Provider>
  );
});
// Creating a custom context consumer hook for function components
const useTheme = () => React.useContext(Context);

export default useTheme;
