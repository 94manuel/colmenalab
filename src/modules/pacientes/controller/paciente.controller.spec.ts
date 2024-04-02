import { Test, TestingModule } from '@nestjs/testing';
import { PacientesController } from './paciente.controller';
import { PacientesService } from '../service/pacientes.service';
import { CreatePacienteDto } from '../dto/create-paciente.dto';
import { Paciente } from '../paciente.entity';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';

describe('PacientesController', () => {
  let pacientesController: PacientesController;
  let controller: PacientesController;
  let service: PacientesService;
  let pacientesServiceMock: Partial<PacientesService>;

  beforeEach(() => {
    pacientesServiceMock = {
      create: jest.fn().mockResolvedValue(new Paciente()), // Asume que tienes una entidad Paciente
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(new Paciente()),
      update: jest.fn().mockResolvedValue(new Paciente()),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    pacientesController = new PacientesController(pacientesServiceMock as PacientesService);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [
        {
          provide: PacientesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PacientesController>(PacientesController);
    service = module.get<PacientesService>(PacientesService);
  });

  it('debe crear un nuevo paciente con datos de entrada válidos', async () => {
    const createPacienteDto: CreatePacienteDto = {
      patientId: "12347",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St",
      city: "Anytown"
    };
    const expectedPatient: Paciente = {
      id: 1,
      patientId: "12347",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St",
      city: "Anytown",
      citas: []
    };

    jest.spyOn(service, 'create').mockResolvedValue(expectedPatient as any);

    const result = await controller.create(createPacienteDto);

    expect(result).toEqual(expectedPatient);
    expect(service.create).toHaveBeenCalledWith(createPacienteDto);
  });

  it('debería generar un error al intentar crear un paciente con datos de entrada faltantes o no válidos', async () => {
    const createPacienteDto = {};
    jest.spyOn(service, 'create').mockRejectedValue(new Error('Invalid input data'));

    await expect(controller.create(createPacienteDto as CreatePacienteDto)).rejects.toThrowError('Invalid input data');
  });

  it('debería generar un error cuando se proporciona una identificación de paciente no válida', async () => {
    jest.spyOn(pacientesServiceMock, 'update').mockRejectedValue(new Error('Invalid patient ID'));

    const id = 'invalidId';
    const updatePacienteDto = new UpdatePacienteDto();

    await expect(pacientesController.update(id, updatePacienteDto)).rejects.toThrowError('Invalid patient ID');
    expect(pacientesServiceMock.update).toHaveBeenCalledWith(id, updatePacienteDto);
  });

  it('debe eliminar con éxito a un paciente cuando se le proporciona una identificación válida', async () => {
    const id = 'validId';

    await pacientesController.remove(id);

    expect(pacientesServiceMock.remove).toHaveBeenCalledWith(id);
  });

  it('debería arrojar un error cuando se le proporciona una identificación no válida', async () => {
    jest.spyOn(pacientesServiceMock, 'remove').mockRejectedValue(new Error('Invalid id'));

    const id = 'invalidId';

    await expect(pacientesController.remove(id)).rejects.toThrowError('Invalid id');
    expect(pacientesServiceMock.remove).toHaveBeenCalledWith(id);
  });
});
