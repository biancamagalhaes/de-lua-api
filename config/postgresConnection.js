const pgp = require('pg-promise')();
const db = pgp('postgres://6d2d9670fc15dd99d233a0bb007dae891dcd2962cd523faf36d76d8b297b3354@ec2-44-198-223-154.compute-1.amazonaws.com:5432/daa3sd4s3t6rnh?ssl=true');

module.exports = db;