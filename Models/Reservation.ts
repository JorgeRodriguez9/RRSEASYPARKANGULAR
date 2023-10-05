export interface Reservation {
    id: string;
    date: Date;
    totalPrice: number;
    disabled: string;
    clientId: string; 
    clientName: string;
    telephone: string;
    typeVehicleId: string;
    parkingLotId: string;
}