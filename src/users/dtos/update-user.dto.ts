import { IsNotEmpty } from "class-validator";
export class UpdateUserDto {

    @IsNotEmpty()
    readonly owner: string;

    readonly admin: string;
    count: number;
    readonly password: string;
    readonly photo: string;
    readonly phone: string;
    readonly autoType: number;
    readonly carMaker: string;
    readonly vehicleModel: string;
    readonly fabrication: string;
    readonly plate: string;
    transactions: string[];
}