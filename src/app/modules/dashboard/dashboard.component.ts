import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ToolbarNavigationComponent } from "../../shared/components/toolbar-navigation/toolbar-navigation.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        ButtonModule,
        ToolbarModule,
        CardModule,
        ToastModule,
        ChartModule,
        ToolbarNavigationComponent,
    ]
})
export class DashboardComponent {

}
