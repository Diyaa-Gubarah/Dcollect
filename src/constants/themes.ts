import { ITheme } from "../types/theme";
import { scale } from "../utils/responsive";

export const DEFAULT_LIGHT_THEME_ID = "default-light";

export const DEFAULT_DARK_THEME_ID = "default-dark";



export const DEFAULT_LIGHT_COLOR_THEME = {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#48cae4',
    background: '#fff',
}


export const DEFAULT_DARK_COLOR_THEME = {
    textPrimary: '#fff',
    textSecondary: '#d3d3d3',
    primary: '#48cae4',
    background: '#22223b',
}



const base: Omit<ITheme, 'colors' | 'id'> = {
    fontSizes: {
        lg: scale(14),
        md: scale(12),
        sm: scale(8),
        xsm: scale(4),
    },
    spacing: {
        lg: scale(16),
        md: scale(8),
        sm: scale(4),
        xsm: scale(2),
    },
    fonts: {
        header: 'System',
        body: 'System',
    },
    fontWeights: {
        normal: 'normal',
        bold: 'bold',
    },
};
export const DarkTheme: ITheme = {
    ...base,
    colors: DEFAULT_DARK_COLOR_THEME,
    id: DEFAULT_DARK_THEME_ID,

};
export const LightTheme: ITheme = {
    ...base,
    colors: DEFAULT_LIGHT_COLOR_THEME,
    id: DEFAULT_LIGHT_THEME_ID,

};


