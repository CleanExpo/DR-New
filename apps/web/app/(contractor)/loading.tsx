export default function ContractorLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Teal/Blue spinning loader */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#00BFA6] rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-white">
            Loading
          </p>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-[#00BFA6] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-[#0047FF] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-[#00BFA6] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  )
}
