export interface ParkingLot {
    id?: string; 
    name: string;
    adress: string;
    nit: string;
    telephone: number;
    normalPrice: number;
    disabilityPrice: number;
    info: string;
    cantSpacesMotorcycle: number;
    cantSpacesCar: number;
    cantSpacesDisability: number;
    disabilityservices: string;
    images: string;
    cityId: string; 
    cityName: string;
    propietaryParkId: string; 
}