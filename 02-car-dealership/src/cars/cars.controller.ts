import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  list() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const car = this.carsService.findOne(+id);

    if (!car) {
      throw new Error('Car not found');
    }
    return car;
  }
}
