import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent as ListaOrdenadores} from './components/lista/lista.component';
import { OrdenadoresComponent } from './components/ordenadores/ordenadores.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

@NgModule ({
    declarations: [
        OrdenadoresComponent,
        ListaOrdenadores
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DataTablesModule
    ],
    providers: [provideHttpClient()],
    exports: [
        OrdenadoresComponent,
        ListaOrdenadores
    ],
})
export class OrdenadoresModule {}