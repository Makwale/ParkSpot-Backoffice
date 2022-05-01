import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Image } from "src/app/models/image.model";
import { Auth, Storage } from 'aws-amplify';
import { Router } from '@angular/router';
import { AccountService } from "src/app/services/account.service";
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Property } from "src/app/models/property.model";
import { Apollo, gql } from "apollo-angular";
@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.scss"]
})
export class PresentationComponent implements OnInit {

  test: Date = new Date();

  isCollapsed = true;

  properties: Property[] = [];

  tempProperties: Property[] = [];

  defaultUrl;

  form = {
    keyboard: true,
    class: "modal-dialog-centered modal-md"
  };

  selectedProperty: Property;

  constructor(private dbs: DatabaseService, private modalService: BsModalService,
    public acs: AccountService) {

  }

  ngOnInit() {


  }

  viewMore(property: Property, propertyModal) {
    this.selectedProperty = property;
    this.modalService.show(propertyModal, this.form);

  }

  logout() {
    Auth.signOut().then(() => {
      this.acs.loginStatus = false;
      this.acs.user = null;
      this.acs.clientid = undefined;
    })
  }

}
