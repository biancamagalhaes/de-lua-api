const pgp = require('pg-promise')();
const cn = {
    host: 'ec2-44-198-223-154.compute-1.amazonaws.com', // server name or IP address;
    port: 5432,
    database: 'daa3sd4s3t6rnh',
    user: 'kwnfprkjxqpmmi',
    password: '6d2d9670fc15dd99d233a0bb007dae891dcd2962cd523faf36d76d8b297b3354',
    ssl: { rejectUnauthorized: false }
};
const db = pgp(cn);

module.exports = db;
