import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {
    async generatePage(data, repo) {
        let { page, limit, ...where } = data
        const totalDoc = await repo.countDocuments(where)
        const pages = Math.ceil(totalDoc / limit)
        const result = await repo.getByCondition(where, {
            sort: {
                updatedAt: -1,
            },
            skip: (page - 1) * limit,
            limit: Number(limit),
            lean: true
        })

        let finalData = {
            total: totalDoc,
            page: page,
            pages: pages,
            data: result
        }

        return finalData
    }
}
