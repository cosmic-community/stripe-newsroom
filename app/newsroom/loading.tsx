export default function NewsroomLoading() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 sm:pt-40 pb-24 animate-pulse">
      <div className="h-10 w-64 bg-lightbg rounded mb-4" />
      <div className="h-5 w-96 max-w-full bg-lightbg rounded mb-12" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-stripe"
          >
            <div className="aspect-[16/10] bg-lightbg" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-24 bg-lightbg rounded" />
              <div className="h-5 w-full bg-lightbg rounded" />
              <div className="h-4 w-3/4 bg-lightbg rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}