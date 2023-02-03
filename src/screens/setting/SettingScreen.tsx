import { getData, saveData } from "../../utils/utils";
import { useTheme, useTranslate } from "../../hooks/index";

import { Button } from "react-native";
import React from "react";
import { SettingsNavProps } from "../../navigations/types";
import i18n from "../../i18n/i18n";
import { withContainer } from "../../hoc";

type Props = {} & Partial<SettingsNavProps>;

const SettingScreen = ({}: Props) => {
  const { toggleTheme } = useTheme();

  const t = useTranslate();

  const changeLanguage = React.useCallback(async () => {
    const savedLanguage = await getData("language");
    const current = savedLanguage === "en" ? "ar" : "en";

    i18n.changeLanguage(current);
    await saveData("language", current);
  }, []);

  return (
    <>
      <Button title={t("language")} onPress={changeLanguage} />
      <Button title="Click" onPress={toggleTheme} />
    </>
  );
};

export default withContainer(SettingScreen);
