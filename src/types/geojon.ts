type Properties = Record<string, unknown>

type Coordinate = [number, number]

interface Geometry {
    type: "Polygon";
    coordinates: Coordinate[][];
}

export interface Feature {
    type: "Feature";
    properties: Properties;
    geometry: Geometry;
}

export interface GeoJson {
    type: "FeatureCollection";
    features: Feature[];
}
