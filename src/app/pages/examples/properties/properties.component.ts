import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/property.model';
import { DatabaseService } from 'src/app/services/database.service';
import { Image } from "src/app/models/image.model";
import { Storage } from 'aws-amplify';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];

  tempProperties: Property[] = [];

  defaultUrl;

  form = {
    keyboard: true,
    class: "modal-dialog-centered modal-md"
  };

  selectedProperty: Property;
  constructor(private dbs: DatabaseService, private modalService: BsModalService) { }

  ngOnInit() {
  
    this.dbs.getPropertiesCustomers().subscribe( res => {
      this.tempProperties = res.data["properties"] as Property[]
      
      let index =  0;
      for(let property of this.tempProperties) {
        let url = Storage.get(property.images[0].key)
        url.then(url => {
          let image: Image = {url: url.toString(),key: property.images[0].key};
          this.properties.push(new Property(property.id, property.type, property.desc, property.price, property.address, [image]))
          index++;
        });

      }
    })
  }

  viewMore(property: Property, propertyModal){
    this.selectedProperty = property;
    this.modalService.show(propertyModal, this.form);
  
  }


}
