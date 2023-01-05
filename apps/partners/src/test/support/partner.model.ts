import { Partner } from "../../schemas/partner.schema";
import { partnerStub } from "../stubs/partner.stub";
import { MockModel } from "./mock.model";

export class PartnerModel extends MockModel<Partner>{
    protected entityStub = partnerStub(); 
}