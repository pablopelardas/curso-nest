import {
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
import { CreateCarDto, PatchCarDto } from './dtos';

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
    return this.carsService.createCar(createCarDto);
  }
  @Patch(':id')
  updateCar(
    @Body() patchCarDto: PatchCarDto,
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.carsService.patchCar(id, patchCarDto);
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
    return this.carsService.deleteCar(id);
  }
}
