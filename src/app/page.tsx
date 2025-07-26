import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getPublicArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return articles
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function Home() {
  const articles = await getPublicArticles()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Selamat Datang di Portal Artikel
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Temukan artikel-artikel menarik yang ditulis oleh para penulis terbaik. 
          Daftar sekarang untuk mulai menulis artikel Anda sendiri!
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt || article.content.substring(0, 150) + '...'}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Oleh: {article.author.name || article.author.email}</span>
                <span>{new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Belum Ada Artikel
            </h2>
            <p className="text-gray-600 mb-6">
              Belum ada artikel yang dipublikasikan. Jadilah yang pertama untuk menulis artikel!
            </p>
            <Link 
              href="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
