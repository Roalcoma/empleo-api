import { Test, TestingModule } from '@nestjs/testing';
import { ExperienciasLaboralesController } from './experiencias-laborales.controller';

describe('ExperienciasLaboralesController', () => {
  let controller: ExperienciasLaboralesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienciasLaboralesController],
    }).compile();

    controller = module.get<ExperienciasLaboralesController>(ExperienciasLaboralesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
