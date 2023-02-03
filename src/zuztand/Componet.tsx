import { Button, Text, View } from "react-native";
import React, { useCallback } from "react";
import { count, name, user } from "./store/selectors";
import {
  decrement,
  increment,
  setName,
  setUserId,
  setUserName,
} from "./store/actions";

const Component1: React.FC = () => {
  const currentCount = count();
  const currentName = name();
  const currentUser = user();

  const handleIncrement = useCallback(() => {
    increment();
  }, []);

  const handleDecrement = useCallback(() => {
    decrement();
  }, []);

  const handleSetName = useCallback((name: string) => {
    setName(name);
  }, []);

  const handleSetUserId = useCallback((id: number) => {
    setUserId(id);
  }, []);

  const handleSetUserName = useCallback((name: string) => {
    setUserName(name);
  }, []);

  return (
    <View>
      <Text>Count: {currentCount}</Text>
      <Button onPress={handleIncrement} title="Increment" />
      <Button onPress={handleDecrement} title="Decrement" />
      <Text>Name: {currentName}</Text>
      <Button onPress={() => handleSetName("John")} title="Change Name" />
      <View>
        <Text>User: {currentUser.name}</Text>
        <Button
          onPress={() => handleSetUserId(currentUser.id + 1)}
          title="Increment User Id"
        />
        <Button
          onPress={() => handleSetUserName("Jane")}
          title="Change User Name"
        />
      </View>
    </View>
  );
};

export default Component1;
