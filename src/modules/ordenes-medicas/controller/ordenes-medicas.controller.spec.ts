import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesMedicasController } from './ordenes-medicas.controller';
import { OrdenesMedicasService } from '../service/ordenes-medicas.service';
import { CreateOrdenMedicaDto } from '../dto/create-orden-medica.dto';
import { NotFoundException } from '@nestjs/common';

describe('OrdenesMedicasController', () => {
  let controller: OrdenesMedicasController;
  let service: jest.Mocked<OrdenesMedicasService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenesMedicasController],
      providers: [
        {
          provide: OrdenesMedicasService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            // Agrega aquí los mocks para otros métodos si es necesario
          },
        },
      ],
    }).compile();

    controller = module.get<OrdenesMedicasController>(OrdenesMedicasController);
    service = module.get<OrdenesMedicasService>(OrdenesMedicasService) as jest.Mocked<OrdenesMedicasService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new orden medica with valid input data', async () => {
    const createOrdenMedicaDto = new CreateOrdenMedicaDto();

    const expectedOrdenMedica = { id: 1, ...createOrdenMedicaDto };

    service.create.mockResolvedValue(expectedOrdenMedica as never);

    const result = await controller.create(createOrdenMedicaDto);

    expect(result).toEqual(expectedOrdenMedica);
    expect(service.create).toHaveBeenCalledWith(createOrdenMedicaDto);
  });

  it('should return all ordenes medicas', async () => {
    service.findAll.mockResolvedValue([]);

    const result = await controller.findAll();

    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should update an orden medica', async () => {
    const id = 1;
    const updateOrdenMedicaDto = { descripcion: 'Updated Description' };
    const updatedOrdenMedica = { id, ...updateOrdenMedicaDto };

    service.update.mockResolvedValue(updatedOrdenMedica as never);

    const result = await controller.update(String(id), updateOrdenMedicaDto);

    expect(result).toEqual(updatedOrdenMedica);
    expect(service.update).toHaveBeenCalledWith(id, updateOrdenMedicaDto);
  });


});
