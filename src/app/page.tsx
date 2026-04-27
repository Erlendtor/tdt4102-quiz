import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { questions } from "@/lib/questions";
import { getAllTopics } from "@/lib/questions";

export default async function Home() {
  const session = await auth();
  const topicCount = getAllTopics().length;

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-3xl font-bold text-white">TDT4102 Quiz</h1>
          <p className="text-gray-400 mt-2">
            Flervalgsoppgaver fra del 1 av eksamen
          </p>
          {session?.user && (
            <p className="text-indigo-400 text-sm mt-2">
              Innlogget som{" "}
              <span className="font-semibold">{session.user.name}</span>
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Link
            href="/learn"
            className="block w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-colors text-white rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <div className="font-bold text-lg">Læringsmodus</div>
                <div className="text-indigo-200 text-sm">
                  Umiddelbar tilbakemelding · Forklaringer · Spaced repetition
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/exam"
            className="block w-full bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 transition-colors text-white rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">📝</div>
              <div>
                <div className="font-bold text-lg">Eksamensmodus</div>
                <div className="text-emerald-200 text-sm">
                  12 spørsmål · Karakter på slutten · NTNU-skala
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-6 text-center">
          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Logg ut ({session.user.name})
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors inline-block"
            >
              Logg inn for å lagre progresjon →
            </Link>
          )}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-xl font-bold text-white">{questions.length}</div>
            <div className="text-xs text-gray-400">Spørsmål</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-xl font-bold text-white">5</div>
            <div className="text-xs text-gray-400">Eksamener</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-xl font-bold text-white">{topicCount}</div>
            <div className="text-xs text-gray-400">Emner</div>
          </div>
        </div>
      </div>
    </main>
  );
}
