import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    id: "619ee2672b269b2633d5a311",
    name: "Javier Vasquez",
    email: "javierfelipevasquezroldan@gmail.com",
    wallet: {
      create: {},
    },
  },
  {
    id: "619ee2682b269b2633d5a313",
    name: "Test Name",
    email: "munchertestemail@mailinator.com",
    wallet: {
      create: {},
    },
  },
];

const productData: Prisma.ProductCreateInput[] = [
  {
    id: "619f2f6705a6a03cd0f7a9b3",
    name: "Happy Meal",
    price: 25500,
    description: "Enjoy an easy meal for kids when you order a Happy Meal",
    stock: 100,
  },
  {
    id: "619f2f6705a6a03cd0f7a9b4",
    name: "Big Mac",
    price: 13000,
    description: "The Big Mac consists of two 1.6 oz (45 g) beef patties, special sauce ",
    stock: 100,
  },
  {
    id: "619f2f6705a6a03cd0f7a9b5",
    name: "McFlurry",
    price: 5700,
    description: "McFlurry consists of whipped, soft-serve McDonald's vanilla-flavored ice cream in a cup",
    stock: 100,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
