import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuildService } from '../../services/build.service';
import { CommonService } from '../../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-build-modal',
  templateUrl: './build-modal.component.html',
  styleUrl: './build-modal.component.sass',
})
export class BuildModalComponent {
  buildForm: FormGroup;

  motherboard: string[] = ['Micro', 'ATX', 'BTX', 'LPX', 'Mini ITX'];
  processor: string[] = ['intel', 'AMD'];
  ram: string[] = ['DDR 3', 'DDR 4', 'DDR 5'];
  graphics: string[] = ['NVIDIA', 'GeForce', 'AMD Radeon'];

  constructor(
    private fb: FormBuilder,
    private buildService: BuildService,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<BuildModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      motherboard: '',
      processor: '',
      ram: '',
      graphics: '',
    });
  }
  ngOnInit(): void {
    this.buildForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.buildForm.valid) {
      if (this.data) {
        this.buildService
          .updateBuild(this.data.id, this.buildForm.value)
          .subscribe({
            next: (val: any) => {
              this.commonService.openSnackBar('Build detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.buildService.addBuild(this.buildForm.value).subscribe({
          next: (val: any) => {
            this.commonService.openSnackBar('Build added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
