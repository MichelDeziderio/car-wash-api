import { IsNotEmpty } from "class-validator";
export class CreateUserDto {

    @IsNotEmpty()
    readonly owner: string;

    readonly admin: string;
    readonly count: number;
    readonly password: string;
    readonly photo: string;
    readonly phone: string;
    readonly autoType: number;
    readonly carMaker: string;
    readonly vehicleModel: string;
    readonly fabrication: string;
    readonly plate: string;
}