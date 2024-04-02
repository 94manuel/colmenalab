import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosService } from './medicamentos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicamento } from '../medicamentos.entity';
import { Repository } from 'typeorm';
import { UpdateMedicamentoDto } from '../dto/update-medicamento.dto';
import { CreateMedicamentoDto } from '../dto/create-medicamento.dto';

describe('MedicamentosService', () => {
  let service: MedicamentosService;
  let medicamentoRepository: MockType<Repository<Medicamento>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicamentosService,
        {
          provide: getRepositoryToken(Medicamento),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<MedicamentosService>(MedicamentosService);
    medicamentoRepository = module.get(getRepositoryToken(Medicamento));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test para crear un nuevo medicamento exitosamente
  it('should create a new medicamento successfully', async () => {
    const createMedicamentoDto:CreateMedicamentoDto = {
      nombre: 'Medicamento 1',
      descripcion: 'Descripción del medicamento 1',
      enfermedades: 'Enfermedades relacionadas al medicamento 1',
      medicamentoIds: []
    };

    const expectedMedicamento = {
      ...createMedicamentoDto,
      id: 1,
    };

    medicamentoRepository.create.mockReturnValue(expectedMedicamento);
    medicamentoRepository.save.mockResolvedValue(expectedMedicamento);

    const result = await service.create(createMedicamentoDto);

    expect(result).toEqual(expectedMedicamento);
    expect(medicamentoRepository.create).toHaveBeenCalledWith(createMedicamentoDto);
    expect(medicamentoRepository.save).toHaveBeenCalledWith(expectedMedicamento);
  });

  // Test para lanzar un error al crear un medicamento con campos faltantes
  it('should throw an error when creating a medicamento with missing fields', async () => {
    const createMedicamentoDto:CreateMedicamentoDto = {
      nombre: 'Medicamento 1',
      descripcion: '', // Campo faltante
      enfermedades: 'Enfermedades relacionadas al medicamento 1',
      medicamentoIds: []
    };

    medicamentoRepository.create.mockImplementation(() => {
      throw new Error('Missing fields');
    });

    await expect(service.create(createMedicamentoDto)).rejects.toThrow('Missing fields');
  });

  // Test para encontrar todos los medicamentos
  it('should find all medicamentos', async () => {
    medicamentoRepository.find.mockResolvedValue([]);

    const result = await service.findAll();

    expect(result).toEqual([]);
    expect(medicamentoRepository.find).toHaveBeenCalled();
  });

  // Test para encontrar un medicamento por ID
  it('should find a medicamento by ID', async () => {
    const expectedMedicamento = new Medicamento();
    medicamentoRepository.findOne.mockResolvedValue(expectedMedicamento);

    const result = await service.findOne(1);

    expect(result).toEqual(expectedMedicamento);
    expect(medicamentoRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  // Test para actualizar un medicamento
  it('should update a medicamento', async () => {
    const updateMedicamentoDto = new UpdateMedicamentoDto();
    const expectedMedicamento = new Medicamento();
    medicamentoRepository.findOne.mockResolvedValue(expectedMedicamento);
    medicamentoRepository.save.mockResolvedValue(expectedMedicamento);

    const result = await service.update(1, updateMedicamentoDto);

    expect(result).toEqual(expectedMedicamento);
    expect(medicamentoRepository.save).toHaveBeenCalledWith(expectedMedicamento);
  });

  // Test para eliminar un medicamento
  it('should remove a medicamento', async () => {
    const expectedMedicamento = new Medicamento();
    medicamentoRepository.findOne.mockResolvedValue(expectedMedicamento);
    medicamentoRepository.remove.mockResolvedValue(expectedMedicamento);

    await service.remove(1);

    expect(medicamentoRepository.remove).toHaveBeenCalledWith(expectedMedicamento);
  });


});

// Función auxiliar para mockear el repositorio
function mockRepository() {
  return {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };
}

// Tipo auxiliar para los mocks
type MockType<T> = {
  [P in keyof T]: jest.Mock;
};
