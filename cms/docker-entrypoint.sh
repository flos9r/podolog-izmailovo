#!/bin/sh
set -e

PRISMA="node ./node_modules/prisma/build/index.js"

echo "🔄 Running database migrations..."
$PRISMA migrate deploy 2>&1 || {
  echo "⚠️  migrate deploy failed — pushing schema directly..."
  $PRISMA db push --accept-data-loss 2>&1
}

echo "🌱 Checking if seed is needed..."
NEEDS_SEED=$(node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.count().then(c => {
  console.log(c === 0 ? 'yes' : 'no');
  process.exit(0);
}).catch(() => {
  console.log('yes');
  process.exit(0);
});
" 2>/dev/null || echo "yes")

if [ "$NEEDS_SEED" = "yes" ]; then
  echo "🌱 Seeding database..."
  node -e "
    const { PrismaClient } = require('@prisma/client');
    const bcrypt = require('bcryptjs');
    const prisma = new PrismaClient();
    (async () => {
      const email = process.env.ADMIN_EMAIL || 'admin@podolog.ru';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const hash = bcrypt.hashSync(password, 10);
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, passwordHash: hash, name: 'Admin' }
      });
      await prisma.siteSettings.upsert({
        where: { id: 'default' },
        update: {},
        create: { id: 'default' }
      });
      console.log('✅ Admin user created: ' + email);
      console.log('✅ Default site settings created');
      await prisma.\$disconnect();
    })().catch(e => { console.error('Seed error:', e.message); process.exit(1); });
  " 2>&1
else
  echo "✅ Database already has data — skipping seed."
fi

echo "🚀 Starting server..."
exec "$@"
