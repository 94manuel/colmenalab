import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosController } from './medicamentos.controller';
import { MedicamentosService } from '../service/medicamentos.service';
import { UpdateMedicamentoDto } from '../dto/update-medicamento.dto';
import { CreateMedicamentoDto } from '../dto/create-medicamento.dto';

describe('MedicamentosController', () => {
    let controller: MedicamentosController;
    let medicamentosServiceMock: Partial<MedicamentosService>;

    beforeEach(async () => {
        medicamentosServiceMock = {
            create: jest.fn().mockImplementation((dto) => ({ ...dto, id: Date.now() })),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockImplementation((id) => ({ id, nombre: 'Mock Name' })),
            update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
            remove: jest.fn().mockResolvedValue(undefined),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [MedicamentosController],
            providers: [
                {
                    provide: MedicamentosService,
                    useValue: medicamentosServiceMock,
                },
            ],
        }).compile();

        controller = module.get<MedicamentosController>(MedicamentosController);
    });

    // The 'create' method should successfully create a new Medicamento when given valid input.
    it('should create a new Medicamento when given valid input', async () => {
        // Arrange
        const createMedicamentoDto: CreateMedicamentoDto = {
            nombre: 'Medicamento 1',
            descripcion: 'Description 1',
            enfermedades: 'Enfermedades 1',
            medicamentoIds: []
        };

        // Act
        const result = await controller.create(createMedicamentoDto);

        // Assert
        expect(result).toBeDefined();
        expect(result.nombre).toEqual(createMedicamentoDto.nombre);
        expect(result.descripcion).toEqual(createMedicamentoDto.descripcion);
        expect(result.enfermedades).toEqual(createMedicamentoDto.enfermedades);
    });

    it('debería devolver una variedad de medicamentos', async () => {
        const result = await controller.findAll();
        expect(result).toEqual([]);
        expect(medicamentosServiceMock.findAll).toHaveBeenCalled();
    });

    it('debería devolver un solo medicamento', async () => {
        const id = 1;
        const expectedMedicamento = await medicamentosServiceMock.findOne(id);
        const result = await controller.findOne(id);
        expect(result).toEqual(expectedMedicamento);
        expect(medicamentosServiceMock.findOne).toHaveBeenCalledWith(id);
    });

    it('debería actualizar un medicamento', async () => {
        const id = 1;
        const updateMedicamentoDto: UpdateMedicamentoDto = {
            nombre: 'Updated Name',
            descripcion: 'Updated Description',
            enfermedades: 'Updated Enfermedades',
        };
        const updatedMedicamento = await medicamentosServiceMock.update(id, updateMedicamentoDto);
        const result = await controller.update(id, updateMedicamentoDto);
        expect(result).toEqual(updatedMedicamento);
        expect(medicamentosServiceMock.update).toHaveBeenCalledWith(id, updateMedicamentoDto);
    });

    it('deberia quitar un medicamento', async () => {
        const id = 1;
        await controller.remove(id);
        expect(medicamentosServiceMock.remove).toHaveBeenCalledWith(id);
    });

});
