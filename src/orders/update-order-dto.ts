import { Length, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  client: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  address: string;

  @IsString()
  @IsUUID()
  clientId: string;
}