import { Test, TestingModule } from '@nestjs/testing';
import { MedicosService } from './medicos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medico } from '../medico.entity';
import { Repository } from 'typeorm';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { NotFoundException } from '@nestjs/common';
import { CitaMedica } from '../../citas-medicas/citas-medicas.entity';

describe('MedicosService', () => {
  let service: MedicosService;
  let medicoRepositoryMock: MockType<Repository<Medico>>;
  let citaMedicaRepositoryMock: MockType<Repository<CitaMedica>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicosService,
        {
          provide: getRepositoryToken(Medico),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(CitaMedica),
          useValue: mockRepository(),
        },
      ],
    }).compile()

    service = module.get<MedicosService>(MedicosService);
    medicoRepositoryMock = module.get(getRepositoryToken(Medico));
    citaMedicaRepositoryMock = module.get(getRepositoryToken(CitaMedica));
  });

  function mockRepository() {
    return {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un nuevo médico con éxito', async () => {
    const createMedicoDto: CreateMedicoDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'New York',
      professionalCard: 'ABC123',
      admissionDate: new Date(),
    };


    const expectedMedico: Medico = {
      id: 0,
      patientId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      citas: [],
      professionalCard: '',
      admissionDate: undefined
    };

    medicoRepositoryMock.create.mockReturnValue(expectedMedico);
    medicoRepositoryMock.save.mockResolvedValue(expectedMedico as never);

    const result = await service.create(createMedicoDto);

    expect(result).toEqual(expectedMedico);
    expect(medicoRepositoryMock.create).toHaveBeenCalledWith(createMedicoDto);
    expect(medicoRepositoryMock.save).toHaveBeenCalledWith(expectedMedico);
  });

  // Agregar tests para findAll
  it('debería encontrar todos los médicos', async () => {
    medicoRepositoryMock.find.mockResolvedValue([] as never);

    const result = await service.findAll();

    expect(result).toEqual([]);
    expect(medicoRepositoryMock.find).toHaveBeenCalled();
  });

  // Agregar tests para findOne
  it('debería encontrar un médico por su ID', async () => {
    const medico = new Medico(); // instancia esperada
    medicoRepositoryMock.findOne.mockResolvedValue(medico as never);

    const result = await service.findOne('1');

    expect(result).toEqual(medico);
    expect(medicoRepositoryMock.findOne).toHaveBeenCalledWith({ where: { professionalCard: '1' } });
  });

  it('debería lanzar un error si no encuentra un médico', async () => {
    medicoRepositoryMock.findOne.mockResolvedValue(undefined as never);

    await expect(service.findOne('invalid')).rejects.toThrow(NotFoundException);
  });

  // Agregar tests para update
  it('debería actualizar un médico existente', async () => {
    const medico = new Medico(); // instancia esperada después de la actualización
    medicoRepositoryMock.findOne.mockResolvedValue(medico as never);
    medicoRepositoryMock.save.mockResolvedValue(medico as never);

    const updateMedicoDto = new UpdateMedicoDto();
    const result = await service.update('1', updateMedicoDto);

    expect(result).toEqual(medico);
    expect(medicoRepositoryMock.save).toHaveBeenCalledWith(medico);
  });

  // Agregar tests para remove
  it('debería eliminar un médico', async () => {
    const medico = new Medico(); // instancia a eliminar
    medicoRepositoryMock.findOne.mockResolvedValue(medico as never);
    medicoRepositoryMock.remove.mockResolvedValue(medico as never);

    await service.remove('1');

    expect(medicoRepositoryMock.remove).toHaveBeenCalledWith(medico);
  });
});

// Ayudante para tipar el Mock del repositorio
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
