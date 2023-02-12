import { Feature } from "../../types/geojon";

interface Values {
    [key: string]: unknown;
}

interface UpdatePropertyAction {
    type: "UPDATE_PROPERTY";
    property: string;
    value: unknown;
}

type Actions = UpdatePropertyAction;


const initialValues = (feature?: Feature): Values => {
    if (!feature) return {}
    return Object.keys(feature.properties).filter(p => p !== 'id').reduce((acc, property) => {
        return { ...acc, [property]: "" };
    }, {});
};

const reducer = (state: Values, action: Actions): Values => {
    switch (action.type) {
        case "UPDATE_PROPERTY":
            return { ...state, [action.property]: action.value };
        default:
            return state;
    }
};

export { reducer, initialValues, };

