import { Test, TestingModule } from '@nestjs/testing';
import { MedicosController } from './medicos.controller';
import { MedicosService } from '../service/medicos.service';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { Medico } from '../medico.entity';

describe('MedicosController', () => {
  let controller: MedicosController;
  let service: MedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicosController],
      providers: [
        {
          provide: MedicosService,
          useValue: {
            create: jest.fn(),
            findAvailableByDate: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MedicosController>(MedicosController);
    service = module.get<MedicosService>(MedicosService);
  });

  it('debería buscar médicos disponibles por fecha', async () => {
    const fecha = '2023-01-01';
    jest.spyOn(service, 'findAvailableByDate').mockResolvedValue([]);

    const result = await controller.findAvailable(fecha);

    expect(result).toEqual([]);
    expect(service.findAvailableByDate).toHaveBeenCalledWith(fecha);
  });

  it('debería devolver una variedad de médicos', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);

    const result = await controller.findAll();

    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deberia devolver un solo medico', async () => {
    const id = '1';
    const expectedMedico = new Medico();
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedMedico);

    const result = await controller.findOne(id);

    expect(result).toEqual(expectedMedico);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('Debería actualizar una medico', async () => {
    const id = '1';
    const updateMedicoDto = new UpdateMedicoDto();
    const expectedMedico = new Medico();
    jest.spyOn(service, 'update').mockResolvedValue(expectedMedico);

    const result = await controller.update(id, updateMedicoDto);

    expect(result).toEqual(expectedMedico);
    expect(service.update).toHaveBeenCalledWith(id, updateMedicoDto);
  });

  it('Debería quitar una medico', async () => {
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    await controller.remove(id);

    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
