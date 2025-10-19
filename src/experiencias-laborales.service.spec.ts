import { Test, TestingModule } from '@nestjs/testing';
import { ExperienciasLaboralesService } from './experiencias-laborales.service';

describe('ExperienciasLaboralesService', () => {
  let service: ExperienciasLaboralesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperienciasLaboralesService],
    }).compile();

    service = module.get<ExperienciasLaboralesService>(ExperienciasLaboralesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
