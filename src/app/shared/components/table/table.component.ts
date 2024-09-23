import {Component, Input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {IRow} from "../../../features/pokemon/models/IRow";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<TItem> {
  @Input() caption!: string;
  @Input() rows: IRow[] = [];
  @Input() items: TItem[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
}
