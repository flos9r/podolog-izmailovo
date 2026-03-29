import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-900">Подолог CMS</h1>
            <p className="text-sm text-gray-500 mt-1">Вход в панель управления</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
