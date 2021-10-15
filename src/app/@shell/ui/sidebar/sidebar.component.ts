import { Component, OnInit } from '@angular/core';
import { ROUTER_UTILS } from '@app/@core/utils/router.utils';
import { TechnologyService } from '@core/services/route';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideBarComponent implements OnInit {
  isSidebarOpen = true;
  technologies!: {
    Python: string;
    Java: string;
    'Dot NET': string;
  };

  technologyPath$!: Observable<any>;

  constructor(private technologyService: TechnologyService) {}

  ngOnInit(): void {
    this.technologies = this.technologyService.technologies;

    this.technologyPath$ = this.technologyService.selectedTechnology$.pipe(
      map(
        (selectedTechnology) =>
          ROUTER_UTILS.config.technology[selectedTechnology],
      ),
    );
  }
}
