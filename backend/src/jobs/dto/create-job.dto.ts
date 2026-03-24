import { IsString, IsInt, IsArray, IsOptional, IsBoolean, IsIn } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateJobDto {
  @ApiProperty() @IsString() title: string
  @ApiProperty() @IsString() jobType: string
  @ApiProperty() @IsString() employmentType: string
  @ApiProperty() @IsString() prefecture: string
  @ApiPropertyOptional() @IsOptional() @IsString() city?: string
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string
  @ApiProperty() @IsInt() salaryMin: number
  @ApiProperty() @IsInt() salaryMax: number
  @ApiProperty() @IsString() salaryType: string
  @ApiProperty() @IsString() description: string
  @ApiPropertyOptional() @IsOptional() @IsArray() requirements?: string[]
  @ApiPropertyOptional() @IsOptional() @IsArray() benefits?: string[]
  @ApiPropertyOptional() @IsOptional() @IsString() workingHours?: string
  @ApiPropertyOptional() @IsOptional() @IsString() holidays?: string
  @ApiPropertyOptional() @IsOptional() @IsString() deadline?: string
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean
}
