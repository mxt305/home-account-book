#!/usr/bin/env ts-node
import { PrismaClient } from "@prisma/client";
import { SHA256 } from "crypto-js";
const prisma = new PrismaClient();

async function main() {
  const defaultAdmainUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      name: "admin",
      username: "admin",
      type: 1,
      password: SHA256("123456").toString(),
    },
  });
  const defaultBankAccount = await prisma.bankAccount.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "公款帳戶",
    },
  });

  console.log(defaultAdmainUser, defaultBankAccount);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
