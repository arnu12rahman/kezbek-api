import { partnerCreateStub, partnerDeleteStub, partnerUpdateStub, findPartnerStub, partnerStub } from "../test/stubs/partner.stub";

export const PartnersService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(partnerCreateStub()),
    update: jest.fn().mockResolvedValue(partnerUpdateStub()),
    remove: jest.fn().mockResolvedValue(partnerDeleteStub()),
    getPartners: jest.fn().mockResolvedValue(findPartnerStub()),
    getPartnerDetail: jest.fn().mockResolvedValue(partnerStub()),
})