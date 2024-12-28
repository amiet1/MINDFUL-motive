import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Define categories and their associated affirmations
  const categoriesWithAffirmations = [
    {
      name: 'Focus',
      affirmations: [
        'Keep working hard.',
        'Get off your ass.',
        'Stay focused and productive.',
      ],
    },
    {
      name: 'Health',
      affirmations: [
        'I am strong and capable.',
        'My body is healthy and full of energy.',
        'Every day is a new opportunity for growth.',
      ],
    },
    {
      name: 'Motivation',
      affirmations: [
        'You are your only limit.',
        'Push past your comfort zone.',
        'Success starts with the decision to try.',
      ],
    },
    {
      name: 'Gratitude',
      affirmations: [
        'I am grateful for all the abundance in my life.',
        'I appreciate the small things that make life special.',
        'Gratitude brings me peace and joy.',
      ],
    },
  ];

  // Create Categories and Affirmations
  for (const categoryData of categoriesWithAffirmations) {
    // Create the category
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
      },
    });

    // Create affirmations for each category
    for (const affirmationText of categoryData.affirmations) {
      await prisma.affirmation.create({
        data: {
          text: affirmationText,
          categoryId: category.id,
        },
      });
    }
  }

  console.log('Seed data has been successfully added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
