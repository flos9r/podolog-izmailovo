import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Подолог CMS</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Система управления контентом сайта подолога.
          Публичная часть сайта и административная панель.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Панель управления
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}
