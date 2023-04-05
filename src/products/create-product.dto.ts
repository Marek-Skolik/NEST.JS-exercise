import { Transform } from "class-transformer";
import { Length, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;
  
  @IsNotEmpty()
  @Length(10, 200)
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  description: string;
};