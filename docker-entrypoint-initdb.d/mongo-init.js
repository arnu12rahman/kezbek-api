print('END #################################################################');

print('#### Dev DB ####');
db = db.getSiblingDB('kezbek_dev_db');
db.createUser({
  user: 'root',
  pwd: 'superuser',
  roles: [{ role: 'readWrite', db: 'kezbek_dev_db' }],
});
db.createCollection('users');
try {
  db.cashbacks.insertMany(
    [
      {
        _id: ObjectId('63b7a7aefbafe63ce420fa71'),
        cashbackReferCode: 'kez01bek',
        minQty: NumberInt(1),
        maxQty: NumberInt(1),
        isSetMaxQty: NumberInt(1),
        minAmountTrans: NumberInt(0),
        maxAmountTrans: NumberInt(100000),
        isSetMaxAmountTrans: NumberInt(1),
        percentageCashback: 1.2,
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:46:38.738+0700'),
        updatedAt: ISODate('2023-01-06T11:46:38.738+0700'),
      },
      {
        _id: ObjectId('63b7a7dffbafe63ce420fa73'),
        cashbackReferCode: 'kez02bek',
        minQty: NumberInt(1),
        maxQty: NumberInt(1),
        isSetMaxQty: NumberInt(1),
        minAmountTrans: NumberInt(100000),
        maxAmountTrans: NumberInt(500000),
        isSetMaxAmountTrans: NumberInt(1),
        percentageCashback: 1.75,
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:47:27.408+0700'),
        updatedAt: ISODate('2023-01-06T11:47:27.408+0700'),
      },
      {
        _id: ObjectId('63b7a7f9fbafe63ce420fa75'),
        cashbackReferCode: 'kez03bek',
        minQty: NumberInt(1),
        maxQty: NumberInt(1),
        isSetMaxQty: NumberInt(1),
        minAmountTrans: NumberInt(500000),
        maxAmountTrans: NumberInt(1000000),
        isSetMaxAmountTrans: NumberInt(1),
        percentageCashback: 2.3,
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:47:53.890+0700'),
        updatedAt: ISODate('2023-01-06T11:47:53.890+0700'),
      },
      {
        _id: ObjectId('63b7a80efbafe63ce420fa77'),
        cashbackReferCode: 'kez04bek',
        minQty: NumberInt(2),
        maxQty: NumberInt(2),
        isSetMaxQty: NumberInt(1),
        minAmountTrans: NumberInt(500000),
        maxAmountTrans: NumberInt(1000000),
        isSetMaxAmountTrans: NumberInt(1),
        percentageCashback: 2.45,
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:48:14.760+0700'),
        updatedAt: ISODate('2023-01-06T11:48:14.760+0700'),
      },
      {
        _id: ObjectId('63b7a822fbafe63ce420fa79'),
        cashbackReferCode: 'kez05bek',
        minQty: NumberInt(2),
        maxQty: NumberInt(2),
        isSetMaxQty: NumberInt(1),
        minAmountTrans: NumberInt(1000000),
        maxAmountTrans: NumberInt(1500000),
        isSetMaxAmountTrans: NumberInt(1),
        percentageCashback: 2.75,
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:48:34.395+0700'),
        updatedAt: ISODate('2023-01-06T11:48:34.395+0700'),
      },
      {
        _id: ObjectId('63b7a840fbafe63ce420fa7b'),
        cashbackReferCode: 'kez06bek',
        minQty: NumberInt(2),
        maxQty: NumberInt(2),
        isSetMaxQty: NumberInt(1),
        minAmountTrans: NumberInt(1500000),
        maxAmountTrans: NumberInt(0),
        isSetMaxAmountTrans: NumberInt(0),
        percentageCashback: 2.95,
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:49:04.427+0700'),
        updatedAt: ISODate('2023-01-06T11:49:04.427+0700'),
      },
      {
        _id: ObjectId('63b7a858fbafe63ce420fa7d'),
        cashbackReferCode: 'kez07bek',
        minQty: NumberInt(3),
        maxQty: NumberInt(0),
        isSetMaxQty: NumberInt(0),
        minAmountTrans: NumberInt(1500000),
        maxAmountTrans: NumberInt(0),
        isSetMaxAmountTrans: NumberInt(0),
        percentageCashback: 3.35,
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:49:28.376+0700'),
        updatedAt: ISODate('2023-01-06T11:49:28.376+0700'),
      },
    ],
    { ordered: false },
  );
} catch (e) {
  print(e);
}

try {
  db.rewards.insertMany(
    [
      {
        _id: ObjectId('63b7a8c2f93b82963f2b2e31'),
        tier: 'bronze',
        recurring: NumberInt(3),
        rewardAmount: NumberInt(15000),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:51:14.500+0700'),
        updatedAt: ISODate('2023-01-06T11:51:14.500+0700'),
      },
      {
        _id: ObjectId('63b7a8caf93b82963f2b2e33'),
        tier: 'bronze',
        recurring: NumberInt(5),
        rewardAmount: NumberInt(25000),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:51:22.147+0700'),
        updatedAt: ISODate('2023-01-06T11:51:22.147+0700'),
      },
      {
        _id: ObjectId('63b7a8d2f93b82963f2b2e35'),
        tier: 'bronze',
        recurring: NumberInt(7),
        rewardAmount: NumberInt(35000),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:51:30.273+0700'),
        updatedAt: ISODate('2023-01-06T11:51:30.273+0700'),
      },
      {
        _id: ObjectId('63b7a8ddf93b82963f2b2e37'),
        tier: 'silver',
        recurring: NumberInt(3),
        rewardAmount: NumberInt(17500),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:51:41.581+0700'),
        updatedAt: ISODate('2023-01-06T11:51:41.581+0700'),
      },
      {
        _id: ObjectId('63b7a8e4f93b82963f2b2e39'),
        tier: 'silver',
        recurring: NumberInt(5),
        rewardAmount: NumberInt(28500),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:51:48.798+0700'),
        updatedAt: ISODate('2023-01-06T11:51:48.798+0700'),
      },
      {
        _id: ObjectId('63b7a8ebf93b82963f2b2e3b'),
        tier: 'silver',
        recurring: NumberInt(7),
        rewardAmount: NumberInt(37500),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:51:55.397+0700'),
        updatedAt: ISODate('2023-01-06T11:51:55.397+0700'),
      },
      {
        _id: ObjectId('63b7a8f6f93b82963f2b2e3d'),
        tier: 'gold',
        recurring: NumberInt(3),
        rewardAmount: NumberInt(18000),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:52:06.332+0700'),
        updatedAt: ISODate('2023-01-06T11:52:06.332+0700'),
      },
      {
        _id: ObjectId('63b7a8fef93b82963f2b2e3f'),
        tier: 'gold',
        recurring: NumberInt(5),
        rewardAmount: NumberInt(29000),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:52:14.672+0700'),
        updatedAt: ISODate('2023-01-06T11:52:14.672+0700'),
      },
      {
        _id: ObjectId('63b7a905f93b82963f2b2e41'),
        tier: 'gold',
        recurring: NumberInt(7),
        rewardAmount: NumberInt(38000),
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:52:21.977+0700'),
        updatedAt: ISODate('2023-01-06T11:52:21.977+0700'),
      },
    ],
    { ordered: false },
  );
} catch (e) {
  print(e);
}

try {
  db.partners.insertMany(
    [
      {
        _id: ObjectId('63b7a911eec084c5e79aab83'),
        partnerReferCode: 'shp_kzb',
        partnerName: 'Shopee',
        partnerEmail: 'Shopee@gmail.com',
        partnerMsisdn: '+628111379309',
        partnerAddress: 'Jakarta',
        status: NumberInt(1),
        isDeleted: NumberInt(0),
        createdAt: ISODate('2023-01-06T11:52:33.691+0700'),
        updatedAt: ISODate('2023-01-06T11:52:33.691+0700'),
      },
    ],
    { ordered: false },
  );
} catch (e) {
  print(e);
}
print('END #################################################################');
