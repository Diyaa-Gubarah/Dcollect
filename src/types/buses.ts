export interface BusData {
    id: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    capacity: number;
}

export interface BookingData {
    id: string;
    busId: string;
    name: string;
    email: string;
    seat: number;
}
