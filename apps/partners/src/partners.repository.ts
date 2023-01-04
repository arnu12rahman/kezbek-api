import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Partner } from "./schemas/partner.schema";

@Injectable()
export class PartnersRepository extends AbstractRepository<Partner> {
    protected readonly logger = new Logger(PartnersRepository.name)

    constructor(
        @InjectModel(Partner.name) PartnerModel: Model<Partner>,
        @InjectConnection() connection: Connection
    ) {
        super(PartnerModel, connection)
    }
}