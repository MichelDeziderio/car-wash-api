/* eslint-disable prettier/prettier */
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class validationParamsPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        
        if(!value){
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado!`);
        }

        return value;

    }

}