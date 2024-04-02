import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdenesMedicasService } from '../service/ordenes-medicas.service';
import { CreateOrdenMedicaDto } from '../dto/create-orden-medica.dto';
import { UpdateOrdenMedicaDto } from '../dto/update-orden-medica.dto';

@Controller('ordenes-medicas')
export class OrdenesMedicasController {
    constructor(private readonly ordenesMedicasService: OrdenesMedicasService) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    create(@Body() createOrdenMedicaDto: CreateOrdenMedicaDto) {
        return this.ordenesMedicasService.create(createOrdenMedicaDto);
    }

    @Get()
    findAll() {
        return this.ordenesMedicasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordenesMedicasService.findOne(+id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    update(@Param('id') id: string, @Body() updateOrdenMedicaDto: UpdateOrdenMedicaDto) {
        return this.ordenesMedicasService.update(+id, updateOrdenMedicaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordenesMedicasService.remove(+id);
    }
    
}
