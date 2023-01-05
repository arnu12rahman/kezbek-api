import { HttpStatus } from "@nestjs/common";
import { CreatePartnerDto } from "../../dto/request/create-reward.dto";
import { CreatePartnerResponseDto } from "../../dto/response/create-partnerresponse.dto";
import { ResponsePartnerDto } from "../../dto/response/response-partner.dto";
import { Partner } from "../../schemas/partner.schema";

export const partnerStub = (): Partner => {
    return {
        _id: null,
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        apiKey: "randomAPi",
        status: 1,
        isDeleted: 0
    }
}

export const partnerStubArray = (): Partner[] => {
    return [{
        _id: null,
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        apiKey: "randomAPi",
        status: 1,
        isDeleted: 0
    }]
}

export const partnerCreateStub = (): CreatePartnerDto => {
    return {
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        status: 1,
        isDeleted: 0
    }
}

export const responsePartnerCreateStub = new CreatePartnerResponseDto(
    HttpStatus.OK,
    `Create new partner data successfully`,
    {
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        status: 1,
        isDeleted: 0
    }
)

export const partnerUpdateStub = (): CreatePartnerDto => {
    return {
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        status: 1,
        isDeleted: 0
    }
}

export const responsePartnerUpdateStub = new CreatePartnerResponseDto(
    HttpStatus.OK,
    `partner data success updated`,
    {
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        status: 1,
        isDeleted: 0
    }
)

export const partnerDeleteStub = (): CreatePartnerDto => {
    return {
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        status: 1,
        isDeleted: 0
    }
}

export const responsePartnerDeleteStub = new CreatePartnerResponseDto(
    HttpStatus.OK,
    `partner data success deleted`,
    {
        partnerReferCode: "shp_kzb_",
        partnerName: "Shopee",
        partnerEmail: "Shopee@gmail.com",
        partnerMsisdn: "+628111379309",
        partnerAddress: "Jakarta",
        status: 1,
        isDeleted: 0
    }
)

export const findPartnerStub = (): ResponsePartnerDto => {
    return {
        total: 1,
        page: 1,
        pages: 1,
        data: {
            "_id": "63b512c9b315e8427c643118",
            "partnerReferCode": "shp_kzb_",
            "partnerName": "ShopeeShop",
            "partnerEmail": "Shopee@gmail.com",
            "partnerMsisdn": "+628111379309",
            "partnerAddress": "Jakarta",
            "status": 1,
            "isDeleted": 0
        },
    }
}