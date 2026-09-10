// app/newsroom/[slug]/loading.tsx
export default function ArticleLoading() {
  return (
    <div className="pt-32 sm:pt-40 pb-24 animate-pulse">
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div className="h-4 w-32 bg-lightbg rounded mb-8" />
        <div className="h-4 w-24 bg-lightbg rounded mb-4" />
        <div className="h-10 w-full bg-lightbg rounded mb-3" />
        <div className="h-10 w-2/3 bg-lightbg rounded" />
      </div>
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="aspect-[16/9] rounded-2xl bg-lightbg" />
      </div>
    </div>
  )
}