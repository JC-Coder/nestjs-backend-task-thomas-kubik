import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {IsNotEmpty, IsString, MaxLength} from 'class-validator'

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    @ApiProperty()
    content: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    author: string;
}