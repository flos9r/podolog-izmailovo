import { prisma } from "@/lib/prisma";

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Медиа-файлы</h1>
        <p className="text-sm text-gray-500">
          {media.length} файл(ов)
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Загрузить изображение</h2>
        <p className="text-xs text-gray-500 mb-4">
          Загрузка изображений будет доступна в следующей итерации.
          Изображения будут сохраняться в <code>/public/uploads/</code>.
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-sm text-gray-400">
            📁 Перетащите файл сюда или нажмите для выбора
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG до 5MB</p>
        </div>
      </div>

      {media.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={item.path}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-700 truncate">{item.filename}</p>
                <p className="text-xs text-gray-400">{item.alt || "Без alt"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-sm text-gray-500">
          Нет загруженных медиа-файлов.
        </div>
      )}
    </div>
  );
}
