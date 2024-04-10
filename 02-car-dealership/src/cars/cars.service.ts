import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { PatchCarDto } from './dtos/patch-car-dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Yaris',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Camry',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Land Cruiser',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Fortuner',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const newCar = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);
    return newCar;
  }

  patchCar(id: string, patchCarDto: PatchCarDto) {
    const carDB = this.findOne(id);
    if (patchCarDto.id && patchCarDto.id !== id)
      throw new BadRequestException('Cannot change car id');
    const updatedCar = { ...carDB, ...patchCarDto };
    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));
    return updatedCar;
  }

  deleteCar(id: string) {
    this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return { message: 'Car deleted', id };
  }
}
