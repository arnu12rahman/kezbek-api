import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
@Injectable()
export class PageService {
    async generatePage(data, repo) {
        let { page, limit, ...where } = data
        const totalDoc = await repo.countDocuments(where)
        const pages = Math.ceil(totalDoc / limit)
        const result = await repo.getByCondition(where, {
            sort: {
                createdAt: -1,
            },
            skip: (page - 1) * limit,
            limit: Number(limit),
            lean: true
        })

        let finalData = {
            total: totalDoc,
            page: page,
            pages: pages,
            data: result.map(val => {
                let trxDate = val.trxDate
                let expDate = val.expDate

                if (val.trxDate)
                    trxDate = moment(val.trxDate).format('YYYY-MM-DD')

                if (val.expDate)
                    expDate = moment(val.expDate).format('YYYY-MM-DD')

                return {
                    ...val,
                    trxDate,
                    expDate,
                    createdAt: moment(val.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                    updatedAt: moment(val.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
                }

            })
        }

        return finalData
    }
}
