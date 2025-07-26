import { prisma } from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding database...')

  // Create sample user
  const hashedPassword = await bcrypt.hash('password123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    },
  })

  // Create sample articles
  await prisma.article.createMany({
    data: [
      {
        title: 'Mengenal Next.js: Framework React Modern',
        content: 'Next.js adalah framework React yang sangat populer untuk pengembangan aplikasi web modern. Framework ini menyediakan berbagai fitur canggih seperti Server-Side Rendering (SSR), Static Site Generation (SSG), dan API Routes yang memungkinkan developer untuk membangun aplikasi web yang performa tinggi. Dalam artikel ini, kita akan membahas berbagai fitur unggulan Next.js dan bagaimana cara menggunakannya untuk membangun aplikasi web yang lebih baik.',
        excerpt: 'Next.js adalah framework React yang sangat populer untuk pengembangan aplikasi web modern dengan fitur SSR dan SSG.',
        published: true,
        authorId: user.id,
      },
      {
        title: 'Tips Optimasi Performa Web untuk Developer',
        content: 'Performa website adalah salah satu faktor terpenting yang mempengaruhi user experience dan SEO. Dalam artikel ini, kita akan membahas berbagai teknik optimasi performa web yang dapat diterapkan oleh developer. Mulai dari optimasi gambar, lazy loading, code splitting, hingga penggunaan CDN. Semua teknik ini dapat membantu meningkatkan kecepatan loading website secara signifikan.',
        excerpt: 'Pelajari berbagai teknik optimasi performa web untuk meningkatkan user experience dan SEO website Anda.',
        published: true,
        authorId: user.id,
      },
      {
        title: 'Draft: Panduan Lengkap TypeScript',
        content: 'TypeScript telah menjadi bahasa pemrograman yang sangat populer di kalangan developer JavaScript. Dengan sistem type yang kuat, TypeScript membantu developer menulis kode yang lebih aman dan mudah dimaintain. Artikel ini akan membahas dasar-dasar TypeScript, advanced features, dan best practices dalam penggunaannya.',
        excerpt: 'Panduan lengkap untuk mempelajari TypeScript dari dasar hingga advanced.',
        published: false,
        authorId: user.id,
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
