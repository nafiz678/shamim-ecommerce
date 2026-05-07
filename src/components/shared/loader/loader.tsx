
export function BestDealsSkeleton() {
  return (
    <section className="my-8">
      <div className="mb-4 h-7 w-40 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </section>
  );
}

export function FeaturedSectionSkeleton() {
  return (
    <section className="my-8">
      <div className="mb-4 h-7 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </section>
  );
}

export function ComputerAccessoriesSkeleton() {
  return (
    <section className="my-8">
      <div className="mb-4 h-7 w-56 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </section>
  );
}
