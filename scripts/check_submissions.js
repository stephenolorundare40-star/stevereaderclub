/* eslint-disable @typescript-eslint/no-require-imports */
// Helper script — run with: node scripts/check_submissions.js
// Lists the 3 most recent contact form submissions stored in the database.
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
db.submission.findMany({ orderBy: { createdAt: 'desc' }, take: 3, select: { name: true, email: true, bookTitle: true, message: true, delivered: true, error: true, createdAt: true }})
  .then(rows => { console.log(JSON.stringify(rows, null, 2)); return db.$disconnect(); })
  .catch(e => { console.error(e); process.exit(1); });
