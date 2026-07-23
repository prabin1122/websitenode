import prisma from '../src/config/prisma.js';

async function main() {
  await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Compute, audio, phones, accessories',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@shop.example.com' },
    update: {},
    create: {
      email: 'admin@shop.example.com',
      password: '$2b$12$examplehashedpassword123456789012345678901234567890',
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      verified: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
