export interface Reservation {
    id: string;
    startdate: Date;
    enddate: Date;
    totalPrice: number;  
    vehicleType: string;
    parkingLotId: string;    
    disability: string;  
}