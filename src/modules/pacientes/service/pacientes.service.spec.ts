import { Test, TestingModule } from '@nestjs/testing';
import { PacientesService } from './pacientes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from '../paciente.entity'; // Asegúrate de que la ruta de importación sea correcta
import { Repository } from 'typeorm';
import { CreatePacienteDto } from '../dto/create-paciente.dto';

describe('PacientesService', () => {
  let service: PacientesService;
  let mockRepository: Repository<Paciente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacientesService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PacientesService>(PacientesService);
    mockRepository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new patient when valid data is provided', async () => {
    const createPacienteDto: CreatePacienteDto = {
      patientId: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'New York'
    };

    const expectedPaciente = new Paciente();

    jest.spyOn(mockRepository, 'create').mockReturnValue(expectedPaciente);
    jest.spyOn(mockRepository, 'save').mockResolvedValue(expectedPaciente);

    const result = await service.create(createPacienteDto);

    expect(result).toEqual(expectedPaciente);
    expect(mockRepository.create).toHaveBeenCalledWith(createPacienteDto);
    expect(mockRepository.save).toHaveBeenCalledWith(expectedPaciente);
  });

  it('should throw an error when create method is called with invalid data', async () => {
    const createPacienteDto = {};

    jest.spyOn(mockRepository, 'create').mockImplementation(() => {
      throw new Error('Invalid data');
    });

    await expect(service.create(createPacienteDto as CreatePacienteDto)).rejects.toThrow('Invalid data');
  });
});
