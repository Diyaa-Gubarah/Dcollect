import React from "react";

export type ColorValues = "primary" | "background" | "textPrimary" | "textSecondary" | 'transparent'
export type SpaceValues = "sm" | "md" | "lg" | "xsm"

export interface IColorTheme {
    primary: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
    transparent: string;
}

export interface ISizeTheme {
    lg: number;
    md: number;
    sm: number;
    xsm: number;
}
export interface IFontTheme {
    header: string;
    body: string;

}
export interface IWeightTheme {
    bold: string;
    normal: string;

}

export interface ITheme {
    id: string;
    colors: IColorTheme;
    fontSizes: ISizeTheme;
    spacing: ISizeTheme;
    fonts: IFontTheme;
    fontWeights: IWeightTheme;
}

export interface IThemeProvidedValue {
    theme: ITheme;
    toggleTheme: () => void;
}



export interface IThemeProps {
    initial: ITheme;
    children?: React.ReactNode;
}