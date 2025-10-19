import { Test, TestingModule } from '@nestjs/testing';
import { EducacionController } from './educacion.controller';

describe('EducacionController', () => {
  let controller: EducacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducacionController],
    }).compile();

    controller = module.get<EducacionController>(EducacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
