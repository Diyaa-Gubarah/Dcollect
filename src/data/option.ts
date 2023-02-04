import { TIcon } from "../components/icon/NativeIcon";

export interface IOption {
    id: number;
    icon: TIcon;
    onPress?: () => void
}
export const Option: IOption[] = [
    { id: 1, icon: "more-horiz" },
    { id: 2, icon: "layers" },
    { id: 3, icon: "add" },
    { id: 4, icon: "remove" },
    { id: 5, icon: "crop-free" },
    { id: 6, icon: "backup" },
    { id: 7, icon: "format-list-numbered" },
    { id: 8, icon: "palette" },
    { id: 9, icon: "translate" },
    { id: 10, icon: "power-settings-new" },
]