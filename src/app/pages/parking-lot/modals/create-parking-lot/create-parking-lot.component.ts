import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingLotService } from '../../services/parking-lot.service';
import swal from "sweetalert2";
@Component({
  selector: 'app-create-parking-lot',
  templateUrl: './create-parking-lot.component.html',
  styleUrls: ['./create-parking-lot.component.scss']
})
export class CreateParkingLotComponent implements OnInit {
  isLoading: boolean;
  parkingForm: FormGroup;
  constructor(
    private ps: ParkingLotService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.parkingForm = this.fb.group({
      name: [null, [Validators.required]],
      numberOfSpots: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      lon: [null, [Validators.required]]
    })
  }

  createParkingLot(){
    this.parkingForm.markAllAsTouched();
    this.parkingForm.markAsDirty();
    const data = {
      name: this.parkingForm.value.name,
      number_parking_spot: this.parkingForm.value.numberOfSpots,
      number_available_spot: this.parkingForm.value.numberOfSpots,
      geo: {
        lat: this.parkingForm.value.lat,
        lon: this.parkingForm.value.lon
      }
    }
    if(this.parkingForm.valid){
      this.isLoading = true;
      this.ps.createParkingLot(data).subscribe(response => {
        this.isLoading = false;
        this.parkingForm.reset();
        swal.fire({
          title: "Successfully created",
          icon: "success",
        });
        this.ps.parkingsQueryRef.refetch();
      })
    }
  }

}
