import NativeInput, {KeyboardType} from '../../components/input/NativeInput';
import {
  NativeText,
  NativeTouch,
  NativeView,
  NumberInput,
  RadioButton,
} from '../../components';
import React, {useCallback, useReducer, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {initialValues, reducer} from './FormReducer';

import Dropdown from '../../components/dropdown/DropDown';
import {feature} from '../../zustand/store/polygon/selectors';
import {useGeoJsonStore} from '../../zustand/store/polygon';
import {useTheme} from '../../hooks';

// const renderInput = (property: string, value: unknown) => {
//   switch (typeof value) {
//     case 'boolean':
//       return (
//         <View>
//           <RadioButton
//             label="Yes"
//             value={value}
//             onValueChange={(newValue) => handleChange(property)(newValue)}
//           />
//           <RadioButton
//             label="No"
//             value={!value}
//             onValueChange={(newValue) => handleChange(property)(!newValue)}
//           />
//         </View>
//       );
//     case 'string':
//     case 'number':
//       return (
//         <NativeInput
//           fontSize="xsm"
//           color="textPrimary"
//           keyboardType={determineKeyboardType(value)}
//           inputMode={determineKeyboardType(value) === 'default' ? 'text' : 'numeric'}
//           onChangeText={handleChange(property)}
//           defaultValue={`${value}`}
//           placeholder={`Feature ${property}`}
//           style={{
//             borderColor: theme.colors.primary,
//             borderWidth: theme.spacing.xsm / 2,
//             borderRadius: theme.spacing.xsm,
//             backgroundColor: `${theme.colors.primary}0D`,
//             margin: theme.spacing.xsm,
//           }}
//         />
//       );
//     case 'object':
//       return <Dropdown label={property} data={data} />;
//     default:
//       return null;
//   }
// };

// {Object.entries(selectedFeature.properties)
//   .filter(([key]) => key !== 'id')
//   .map(([property, value]) => (
//     <View key={property} style={{marginVertical: theme.spacing.sm}}>
//       {renderInput(property, value)}
//     </View>
//   ))}

const data = [
  {label: 'One', value: '1'},
  {label: 'Two', value: '2'},
  {label: 'Three', value: '3'},
  {label: 'Four', value: '4'},
  {label: 'Five', value: '5'},
];

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

  // radio
  const [isChecked, setIsChecked] = useState(false);

  const handleValueChange = (value: boolean) => {
    setIsChecked(value);
  };

  // radio

  // number
  const [value, setValue] = useState(0);

  const handleNumberChange = (newValue: number) => {
    setValue(newValue);
  };

  // number

  const [values, dispatch] = useReducer(
    reducer,
    initialValues(selectedFeature),
  );

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
      }}>
      <NativeText
        size="lg"
        color='primary'
        style={{
          textAlign: 'center',
          marginVertical: theme.spacing.md,
          color: theme.colors.textPrimary,
        }}>
        {selectedFeature.properties.id}
      </NativeText>
      {Object.keys(selectedFeature.properties)
        .filter(p => p !== 'id')
        .map(property => {
          const propertyValue = selectedFeature.properties[property];
          const propertyKey =
            property.charAt(0).toLocaleUpperCase() + property.slice(1);
          const keyboardType = determineKeyboardType(propertyValue);

          return (
            <View key={property} style={{marginVertical: theme.spacing.sm}}>
              <View>
                <NativeText color="background" size="sm">
                  Selected value: {JSON.stringify(value)}
                </NativeText>
                <NumberInput
                  value={value}
                  onValueChange={handleNumberChange}
                  min={0}
                  max={100}
                  step={1}
                />
              </View>
              <View>
                <RadioButton
                  label="Yes"
                  value={isChecked}
                  onValueChange={handleValueChange}
                />
                <RadioButton
                  label="No"
                  value={!isChecked}
                  onValueChange={value => handleValueChange(!value)}
                />
              </View>
              <Dropdown label={propertyKey} data={data} />
              <NativeInput
                fontSize="xsm"
                color="textPrimary"
                KeyboardType={keyboardType}
                inputMode={keyboardType === 'default' ? 'text' : 'numeric'}
                onChangeText={handleChange(property)}
                defaultValue={`${propertyValue}`}
                placeholder={`Feature ${propertyKey}`}
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
