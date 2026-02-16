import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = "admin@sajilosathi.com";
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "securepassword123";

    console.log('Seeding admin user...');

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: "Sajilo Sathi Admin",
            role: "ADMIN",
        },
    });

    console.log(`Admin user created/updated: ${admin.email}`);
    console.log('Prisma Seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
