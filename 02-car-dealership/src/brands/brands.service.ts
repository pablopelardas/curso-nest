import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: Date.now(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const newBrand = { id: uuid(), ...createBrandDto, createdAt: Date.now() };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id.toString());
    const updatedBrand = { ...brand, ...updateBrandDto };
    this.brands = this.brands.map((brand) =>
      brand.id === id ? updatedBrand : brand,
    );
    return updatedBrand;
  }

  remove(id: string) {
    const brand = this.findOne(id.toString());
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return brand;
  }

  populateBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
