import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BuildService } from './services/build.service';
import { CommonService } from './services/common.service';
import { BuildModalComponent } from './component/build-modal/build-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  title = 'pc_build_app';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'motherboard',
    'processor',
    'ram',
    'graphics',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private buildService: BuildService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getBuild();
  }

  openAddBuildForm() {
    const dialogRef = this.dialog.open(BuildModalComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBuild();
        }
      },
    });
  }

  getBuild() {
    this.buildService.getBuild().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openEditBulidFrom(data: any) {
    const dialogRef = this.dialog.open(BuildModalComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBuild();
        }
      },
    });
  }

  deleteBuild(id: number) {
    this.buildService.deleteBuild(id).subscribe({
      next: (res) => {
        this.commonService.openSnackBar('Build deleted!', 'done');
        this.getBuild();
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
