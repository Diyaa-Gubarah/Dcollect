import SensitiveInfo from 'react-native-sensitive-info';

export const getData = async (key: string): Promise<string | null> => {
    const data = await SensitiveInfo.getItem(key, {});
    return data;
};

export const saveData = async (key: string, value: string) => {
    await SensitiveInfo.setItem(key, value, {});
};
