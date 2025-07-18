export default function Home() {
  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <main className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
          🃏 MTGDailyCard
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-6">
          Hello World!
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Welcome to MTGDailyCard - your daily dose of Magic: The Gathering cards. 
          This is the initial setup and deployment validation page.
        </p>
        <div className="mt-8">
          <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
            Next.js + TypeScript + Tailwind CSS
          </span>
        </div>
      </main>
    </div>
  );
}
