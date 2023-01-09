import { Injectable } from '@nestjs/common';
import { CreateJourneyDto } from '../dto/tier-journey/create-journey.dto';
import { CreateTierDto } from '../dto/tier/create-tier.dto';
import * as moment from 'moment';

@Injectable()
export class TierService {
    async trxThisMonth(data: any, repo) {
        //check if any trx in current month
        const trxMonthDate = moment(data.transaction.trxDate).subtract(1, 'months').format('YYYY-MM-DD')
        let trxMonthData = await repo.findOne({
            $and: [{ trxDate: { $gte: trxMonthDate, $lte: data.transaction.trxDate } }, { createdAt: { $ne: data.transaction.createdAt } }]
        })

        return trxMonthData
    }

    async firstTier(data: any, repo) {
        //set data
        const createTierDto = new CreateTierDto
        createTierDto.customerEmail = data.transaction.customerEmail
        createTierDto.customerMsisdn = data.transaction.customerMsisdn
        createTierDto.expDate = moment(new Date()).add(1, 'months').format('YYYY-MM-DD')

        const tierData = await repo.create(createTierDto)

        return tierData
    }

    async journeyTier(dataTrans: any, dataTier: any, repo) {
        //set data
        const createTierJourneyDto = new CreateJourneyDto
        createTierJourneyDto.trxID = dataTrans.transaction._id
        createTierJourneyDto.trxDate = dataTrans.transaction.trxDate
        createTierJourneyDto.customerEmail = dataTrans.transaction.customerEmail
        createTierJourneyDto.customerMsisdn = dataTrans.transaction.customerMsisdn
        createTierJourneyDto.tier = dataTier.tier

        await repo.create(createTierJourneyDto)
    }
    async getTierData(data: any, tierRepo) {
        //check if tier data exist if not create for first time
        let tierData = await tierRepo.findOne({
            $or: [
                { customerEmail: data.transaction.customerEmail },
                { customerMsisdn: data.transaction.customerMsisdn },
            ]
        })

        return tierData
    }

    async getCurrentTier(data: any, transRepo, tierRepo, journeyRepo) {
        const trxThisMonth = await this.trxThisMonth(data, transRepo)
        let currTierData
        if (trxThisMonth) {
            currTierData = this.upgradeTier(data, tierRepo, journeyRepo)
        } else {
            currTierData = this.downgradeTier(data, tierRepo, journeyRepo)
        }

        return currTierData
    }

    async upgradeTier(data: any, tierRepo, journeyRepo) {
        const tierData = await this.getTierData(data, tierRepo)
        let upgradeData = {
            tier: 'bronze',
            trxRecurring: 1,
        }
        if (tierData) {
            const currTier = this.upgradeTierCat(tierData.tier, tierData.lastTier, tierData.trxRecurring + 1)
            upgradeData = await tierRepo.upsert({ _id: tierData._id },
                {
                    tier: currTier.newTier,
                    trxRecurring: currTier.newRecurring,
                    lastTier: currTier.newLastTier,
                    expDate: moment(new Date()).add(1, 'months').format('YYYY-MM-DD')
                }
            )

            //add to journey tier
            if (tierData.tier != currTier.newTier)
                this.journeyTier(data, upgradeData, journeyRepo)
        }

        return upgradeData
    }

    async downgradeTier(data: any, tierRepo, journeyRepo) {
        const tierData = await this.getTierData(data, tierRepo)
        let downgradeData
        if (!tierData) {
            //first trx
            downgradeData = await this.firstTier(data, tierRepo)
        } else {
            //downgrade data
            downgradeData = await tierRepo.upsert({ _id: tierData._id },
                {
                    tier: this.downgradeTierCat(tierData.tier),
                    trxRecurring: 0,
                    lastTier: tierData.tier,
                    expDate: moment(new Date()).add(1, 'months').format('YYYY-MM-DD')
                }
            )
        }

        //add to journey tier
        this.journeyTier(data, downgradeData, journeyRepo)

        return downgradeData
    }

    downgradeTierCat(lastTier: string) {
        let newTier: string
        if (lastTier == 'gold') {
            newTier = 'silver'
        } else if (lastTier == 'silver') {
            newTier = 'bronze'
        } else {
            newTier = 'bronze'
        }

        return newTier
    }

    upgradeTierCat(tier: string, lastTier: string, trxRecurring: number) {
        let newTier: string
        let newLastTier: string
        let newRecurring: number
        if (tier == 'bronze' && trxRecurring > 7) {
            newTier = 'silver'
            newLastTier = 'bronze'
            newRecurring = 0
        } else if (tier == 'silver' && trxRecurring > 7) {
            newTier = 'gold'
            newLastTier = 'silver'
            newRecurring = 0
        } else if (tier == 'gold' && trxRecurring > 7) {
            newTier = 'gold'
            newLastTier = 'gold'
            newRecurring = trxRecurring
        } else {
            newTier = tier
            newLastTier = lastTier
            newRecurring = trxRecurring
        }

        const data = {
            newTier: newTier,
            newLastTier: newLastTier,
            newRecurring: newRecurring
        }

        return data
    }
}