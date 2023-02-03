import { Button, Text } from "react-native";
import { NativeInput, NativeList, NativeText } from "../../components";

import { HomeScreenProps } from "../../navigations/types";
// Import vector icons
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { getData } from "../../utils/utils";
import i18n from "../../i18n/i18n";
import { useTranslate } from "../../hooks";
import { withContainer } from "../../hoc";

const setInitialLanguage = async () => {
  const savedLanguage = await getData("language");
  i18n.changeLanguage(savedLanguage || "en");
};

type Props = {} & Partial<HomeScreenProps>;

interface Item {
  id: number;
  title: string;
}

const data: Item[] = [
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
  { id: 4, title: "Item 3" },
  { id: 5, title: "Item 3" },
  { id: 6, title: "Item 3" },
  { id: 7, title: "Item 3" },
  { id: 8, title: "Item 3" },
  { id: 9, title: "Item 3" },
  { id: 10, title: "Item 3" },
];

const ItemComponent = (item: Item) => <Text>{item.title}</Text>;

const HomeScreen = ({ navigation }: Props) => {
  const t = useTranslate();

  React.useEffect(() => {
    setInitialLanguage();

    return () => {};
  }, []);

  return (
    <>
      <NativeText color="textSecondary" size="lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed enim
        reprehenderit accusamus quaerat, nobis temporibus possimus amet vitae
        ipsum itaque doloremque qui dolorum libero a doloribus vero ut odio
        sequi?
      </NativeText>
      <NativeInput onChangeText={() => {}} KeyboardType="default" style={{
        
      }}/>
      <NativeText color="primary" size="lg">
        {t("greeting")}
      </NativeText>
      <Icon name="ios-checkmark-circle" size={32} color="green" />

      <NativeList
        data={data}
        renderItem={ItemComponent}
        keyExtractor={(item) => item.id.toString()}
        direction="horizontal"
      />

      <Button
        title="Go To Setting"
        onPress={() => navigation?.navigate("BusDetails", { busId: "test Id" })}
      />
    </>
  );
};

export default withContainer(HomeScreen);
