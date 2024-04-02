import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesMedicasService } from './ordenes-medicas.service';
import { OrdenMedica } from '../ordenes-medicas.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdenMedicaDto } from '../dto/create-orden-medica.dto';
import { response } from 'express';

describe('OrdenesMedicasService', () => {
  let service: OrdenesMedicasService;
  let ordenMedicaRepository: Repository<OrdenMedica>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdenesMedicasService,
        {
          provide: getRepositoryToken(OrdenMedica),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            preload: jest.fn(),
            // Añade aquí otros métodos según sea necesario
          },
        },
      ],
    }).compile();

    service = module.get<OrdenesMedicasService>(OrdenesMedicasService);
    ordenMedicaRepository = module.get<Repository<OrdenMedica>>(getRepositoryToken(OrdenMedica));
  });

  it('debería crear una nueva OrdenMedica exitosamente', async () => {
    const createOrdenMedicaDto = new CreateOrdenMedicaDto();
    const expectedOrdenMedica = new OrdenMedica();

    jest.spyOn(ordenMedicaRepository, "create").mockReturnValue(expectedOrdenMedica);
    jest.spyOn(ordenMedicaRepository, "save").mockResolvedValue(expectedOrdenMedica);

    const result = await service.create(createOrdenMedicaDto);

    expect(result).toEqual(expectedOrdenMedica);
    expect(ordenMedicaRepository.create).toHaveBeenCalledWith(createOrdenMedicaDto);
    expect(ordenMedicaRepository.save).toHaveBeenCalledWith(expectedOrdenMedica);
  });

});
