print('Start #################################################################');

db = db.getSiblingDB('kezbek_prod_db');
db.createUser(
  {
    user: 'root',
    pwd: 'superuser',
    roles: [{ role: 'readWrite', db: 'kezbek_prod_db' }],
  },
);
db.createCollection('users');

db = db.getSiblingDB('kezbek_dev_db');
db.createUser(
  {
    user: 'root',
    pwd: 'superuser',
    roles: [{ role: 'readWrite', db: 'kezbek_dev_db' }],
  },
);
db.createCollection('users');

db = db.getSiblingDB('kezbek_test_db');
db.createUser(
  {
    user: 'root',
    pwd: 'superuser',
    roles: [{ role: 'readWrite', db: 'kezbek_test_db' }],
  },
);
db.createCollection('users');

print('END #################################################################');