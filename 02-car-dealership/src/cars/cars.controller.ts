import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  list() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    const car = this.carsService.findOne(id);
    return car;
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    if (!createCarDto.brand || !createCarDto.model)
      throw new BadRequestException('Brand and model are required');
    return createCarDto;
  }
  @Patch(':id')
  updateCar(
    @Body() payload: any,
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return {
      message: 'Car updated',
      id,
      payload,
    };
  }

  @Delete(':id')
  deleteCar(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return {
      message: 'Car deleted',
      id,
    };
  }
}
