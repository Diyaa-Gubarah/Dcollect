import NativeInput, {KeyboardType} from '../../components/input/NativeInput';
import {NativeText, NativeTouch, NativeView} from '../../components';
import React, {useCallback, useReducer} from 'react';
import {ScrollView, View} from 'react-native';
import {initialValues, reducer} from './FormReducer';

import {feature} from '../../zustand/store/polygon/selectors';
import {useGeoJsonStore} from '../../zustand/store/polygon';
import {useTheme} from '../../hooks';

const determineKeyboardType = (propertyValue: unknown): KeyboardType => {
  switch (typeof propertyValue) {
    case 'number':
      return 'numeric';
    case 'string':
      return 'default';
    default:
      return 'default';
  }
};

interface IForm {
  onFormCloseButtonPress: () => void;
  feature?: unknown;
}

const Form: React.FC<IForm> = ({onFormCloseButtonPress}) => {
  const {theme} = useTheme();
  const selectedFeature = feature();
  const {updateFeatureProperties} = useGeoJsonStore();

  const [values, dispatch] = useReducer(
    reducer,
    initialValues(selectedFeature),
  );

  console.log(values);

  const handleChange = (property: string) => (text: unknown) => {
    dispatch({type: 'UPDATE_PROPERTY', property, value: text});
  };

  const save = useCallback(() => {
    // update current feature properties
    updateFeatureProperties(selectedFeature.properties.id, values);
    onFormCloseButtonPress();
  }, [selectedFeature.properties.id, values]);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{
        width: '50%',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
      }}
      contentContainerStyle={{
        width: '100%',
      }}
      StickyHeaderComponent={() => (
        <NativeText color="primary" size="sm">
          kjhkhkj
        </NativeText>
      )}>
      {Object.keys(selectedFeature.properties)
        .filter(p => p !== 'id')
        .map(property => {
          const propertyValue = selectedFeature.properties[property];
          const keyboardType = determineKeyboardType(propertyValue);

          return (
            <View key={property}>
              <NativeInput
                fontSize="xsm"
                color="textPrimary"
                KeyboardType={keyboardType}
                inputMode={keyboardType === 'default' ? 'text' : 'numeric'}
                onChangeText={handleChange(property)}
                defaultValue={`${propertyValue}`}
                placeholder={`Feature ${
                  property.charAt(0).toLocaleUpperCase() + property.slice(1)
                }`}
                style={{
                  borderColor: theme.colors.primary,
                  borderWidth: theme.spacing.xsm / 2,
                  borderRadius: theme.spacing.xsm,
                  backgroundColor: `${theme.colors.primary}0D`,
                  margin: theme.spacing.xsm,
                }}
              />
            </View>
          );
        })}

      <NativeView direction="row">
        <NativeTouch onPress={onFormCloseButtonPress} padding="xsm">
          <NativeText color="primary" size="xsm">
            close
          </NativeText>
        </NativeTouch>
        <NativeTouch onPress={save} padding="xsm">
          <NativeText color="primary" size="xsm">
            save
          </NativeText>
        </NativeTouch>
      </NativeView>
    </ScrollView>
  );
};

export default Form;
