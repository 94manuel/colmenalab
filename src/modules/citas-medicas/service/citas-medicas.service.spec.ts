import { Test, TestingModule } from '@nestjs/testing';
import { CitasMedicasService } from './citas-medicas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medico } from '../../medicos/medico.entity';
import { Paciente } from '../../pacientes/paciente.entity';
import { CitaMedica } from '../citas-medicas.entity';
import { Repository } from 'typeorm';
import { CreateCitaMedicaDto } from '../dto/create-cita-medica.dto';
import { UpdateCitaMedicaDto } from '../dto/update-cita-medica.dto';

describe('CitasMedicasService', () => {
  let service: CitasMedicasService;
  let medicoRepositoryMock: MockType<Repository<Medico>>;
  let pacienteRepositoryMock: MockType<Repository<Paciente>>;
  let citaMedicaRepositoryMock: MockType<Repository<CitaMedica>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitasMedicasService,
        {
          provide: getRepositoryToken(Medico),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Paciente),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(CitaMedica),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CitasMedicasService>(CitasMedicasService);
    medicoRepositoryMock = module.get(getRepositoryToken(Medico));
    pacienteRepositoryMock = module.get(getRepositoryToken(Paciente));
    citaMedicaRepositoryMock = module.get(getRepositoryToken(CitaMedica));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all citas medicas', async () => {
    citaMedicaRepositoryMock.find.mockResolvedValue([]);

    const result = await service.findAll();

    expect(result).toEqual([]);
    expect(citaMedicaRepositoryMock.find).toHaveBeenCalled();
  });

  it('should return a single cita medica', async () => {
    const id = 1;
    const expectedCitaMedica = new CitaMedica();

    citaMedicaRepositoryMock.findOne.mockResolvedValue(expectedCitaMedica);

    const result = await service.findOne(id);

    expect(result).toEqual(expectedCitaMedica);
    expect(citaMedicaRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update a cita medica', async () => {
    const id = 1;
    const updateCitaMedicaDto: UpdateCitaMedicaDto = {
      
    };

    const expectedCitaMedica = new CitaMedica();

    citaMedicaRepositoryMock.findOne.mockResolvedValue(expectedCitaMedica);
    citaMedicaRepositoryMock.save.mockResolvedValue(expectedCitaMedica);

    const result = await service.update(id, updateCitaMedicaDto);

    expect(result).toEqual(expectedCitaMedica);
    expect(citaMedicaRepositoryMock.save).toHaveBeenCalledWith(expectedCitaMedica);
  });

  it('should remove a cita medica', async () => {
    const id = 1;
    const expectedCitaMedica = new CitaMedica();

    citaMedicaRepositoryMock.findOne.mockResolvedValue(expectedCitaMedica);

    await service.remove(id);

    expect(citaMedicaRepositoryMock.remove).toHaveBeenCalledWith(expectedCitaMedica);
  });

});

function mockRepository() {
  return {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    // Añade más métodos mockeados según sea necesario
  };
}

// Tipo auxiliar para los mocks
type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};
