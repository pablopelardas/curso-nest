import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2019,
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Yaris',
      year: 2018,
    },
    {
      id: 3,
      brand: 'Toyota',
      model: 'Camry',
      year: 2017,
    },
    {
      id: 4,
      brand: 'Toyota',
      model: 'Land Cruiser',
      year: 2016,
    },
    {
      id: 5,
      brand: 'Toyota',
      model: 'Fortuner',
      year: 2015,
    },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    return this.cars.find((car) => car.id === id);
  }
}
