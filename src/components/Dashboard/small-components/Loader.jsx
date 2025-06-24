export default function Loader() {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen gap-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Multi-colored gradient spinner */}
            <div className="relative">
                {/* Outer ring with gradient */}
                <div className="w-24 h-24 rounded-full border-[6px] border-transparent border-t-[#4CACF0] border-r-blue-500 border-b-blue-200 border-l-[#4CACF0] animate-spin [animation-duration:2s]" />

                {/* Inner ring with delayed animation */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-[4px] border-transparent border-t-[#4CACF0] border-r-blue-200 border-b-cyan-500 border-l-[#4CACF0] animate-spin [animation-duration:3s] [animation-direction:reverse]" />
            </div>

            {/* Animated text with gradient */}
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4CACF0] via-blue-200 to-[#4CACF0] bg-clip-text text-transparent animate-gradient-x [animation-duration:3s]">
                    Loading Topify
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Preparing your experience...
                </p>
            </div>

            {/* Floating dots */}
            <div className="flex gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#4CACF0]  opacity-70 animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
            </div>

            {/* Custom animations */}
            <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
        </div>
    );
}