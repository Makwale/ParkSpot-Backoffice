import Chart from "chart.js";
import { Component, OnInit, TemplateRef, DoCheck } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from "src/app/services/account.service";
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Property } from "src/app/models/property.model";
import { Apollo, gql } from "apollo-angular";
// core components


const DELETE_PROPERTY = gql`mutation DeleteProperty($id: Int) {
  delete_PROPERTY(where: {id: {_eq: $id}}) {
    returning {
      id
      type
      desc
      price
    }
  }
}
`

@Component({
  selector: 'app-clientproperties',
  templateUrl: './clientproperties.component.html',
  styleUrls: ['./clientproperties.component.scss']
})
export class ClientpropertiesComponent implements OnInit, DoCheck {
  
  formModal: BsModalRef;

  form = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg"
  };

  propertyForm: FormGroup;

  editPropertyForm: FormGroup;

  event;

  addressid: number;
 
  clproperties: Property[] = [];

  property: Property;

  isAddProperty: boolean = false;

  isCreated: boolean = false;

  constructor( private modalService: BsModalService, public dbs: DatabaseService,
    private acs: AccountService, private apollo: Apollo) {
    
    }

  ngOnInit() {

    this.propertyForm = new FormBuilder().group({
      propertyType: [''],
      desc: [''],
      price: [''],
      file: [''],
      propertyAddress: [''],
      city: [''],
      postalCode: [''],
    });

    this.editPropertyForm = new FormBuilder().group({ 
      propertyType: [''],
      desc: [''],
      price: [''],
      file: [''],
      propertyAddress: [''],
      city: [''],
      postalCode: [''],
    });

    this.dbs.clproperties = this.acs.user.client.properties
  
  }

  ngDoCheck(){
    this.dbs.clproperties = this.acs.user.client.properties
  }

  public updateOptions() {
    
  }

  openFormModal(modalForm: TemplateRef<any>) {
    this.formModal = this.modalService.show(modalForm, this.form);
  }


  addAddress(){
    
    this.isAddProperty = true;
    this.dbs.addAddress(this.propertyForm.controls["propertyAddress"].value,
      this.propertyForm.controls["city"].value, this.propertyForm.controls["postalCode"].value,
      ).subscribe( res => {
        this.addressid =  res.data["address"]["returning"][0]["id"];
        console.log(this.addressid)
        this.addProperty();
      })
  }

  addProperty(){
    
    this.isCreated = true;

    this.dbs.addProperty(this.propertyForm.controls["propertyType"].value,
    this.propertyForm.controls["price"].value,
     this.propertyForm.controls["desc"].value, this.addressid).subscribe(res => {

      let propertyid = res.data["property"]["returning"][0]["id"]
      
      this.dbs.uploadImage(this.event, propertyid)

      this.isCreated = false
     })
  }

  uploadImage(event){
    this.event = event
  }

  edit(property: Property, modalForm: TemplateRef<any>){
    this.property = property
    console.log(this.editPropertyForm)
 
    this.editPropertyForm.controls["propertyType"].setValue(property.type),
    this.editPropertyForm.controls["price"].setValue(property.price),
     this.editPropertyForm.controls["desc"].setValue(property.desc)
     this.editPropertyForm.controls["propertyAddress"].setValue(property.address.homeAddress)
     this.editPropertyForm.controls["city"].setValue(property.address.city)
     this.editPropertyForm.controls["postalCode"].setValue(property.address.postalCode)
    this.formModal = this.modalService.show(modalForm, this.form);
  }

  updateProperty(){
   
    this.isCreated = true;
    this.dbs.updateProperty(this.property, this.editPropertyForm).subscribe(res => {
      swal.fire({
        title: "Success",
        icon: "success",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success"
        }
      });

      this.dbs.clpropertiesQuery.refetch().then((res) => {
        this.dbs.clproperties = this.acs.user.client.properties;
        this.isCreated = false;
        this.formModal.hide()
      });

     
  
    })
  }


  delete(property: Property){
    swal.fire({
      title: "Are you sure?",
      icon: "question",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-default",
        
      },
      preConfirm: () => {
        this.dbs.clproperties = this.dbs.clproperties.filter(pty => pty.id != property.id)
        this.dbs.clproperties = this.dbs.clproperties.filter( pty => pty.id != property.id);
          this.dbs.deleteImage(property.id).subscribe( res => {
            this.deleteProperty(property.id)
            
        })
      }
    })
  
    
    
  }

  deleteProperty(id: number){
    this.apollo.mutate({
      mutation: DELETE_PROPERTY,
      variables:{
        id
      }
    }).subscribe(res => {
      this.dbs.clpropertiesQuery.refetch().then(() => {
        this.dbs.clproperties = this.acs.user.client.properties;
      })
      swal.fire({
        title: "Success",
        icon: "success",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success"
        }
      });

    })
  }
}
