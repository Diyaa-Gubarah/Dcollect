import { NativeText, NativeTouch, NativeView } from '../../components';
import React, { useCallback } from 'react';

import { ScrollView } from 'react-native';
import { feature } from '../../zustand/store/polygon/selectors';
import { useGeoJsonStore } from '../../zustand/store/polygon';

interface IFormModal {
  onFormCloseButtonPress: () => void;
  feature?: unknown;
}

const FormModal: React.FC<IFormModal> = ({onFormCloseButtonPress}) => {
  const { updateFeatureProperties} = useGeoJsonStore();
  const selectedFeature = feature();

  const save = useCallback(() => {
    // update current feature properties
    updateFeatureProperties(selectedFeature.properties.id, {
      name: 'My new name',
    });
    // updateProperties('name', 'updated name');
  }, [selectedFeature.properties.id]);

  return (
    <NativeView>
      <ScrollView>
        <NativeText color="primary" size="lg">
          {JSON.stringify(selectedFeature)}
        </NativeText>
        <NativeTouch onPress={onFormCloseButtonPress}>
          <NativeText color="primary" size="lg">
            close
          </NativeText>
        </NativeTouch>
        <NativeTouch onPress={save}>
          <NativeText color="primary" size="lg">
            save
          </NativeText>
        </NativeTouch>
      </ScrollView>
    </NativeView>
  );
};

export default FormModal;
