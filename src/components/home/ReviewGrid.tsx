import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CustomerReview } from "@/types";

export function ReviewGrid({ reviews }: { reviews: CustomerReview[] }) {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="From the desk"
          title="Customer reviews"
          description="These are illustrative prototype reviews used to design the account and catalog surfaces."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {reviews.map((review) => (
            <figure key={review.id} className="rounded-md border border-ink-700 bg-ink-850 p-5">
              <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-3.5 ${index < review.rating ? "fill-lime text-lime" : "text-ink-700"}`}
                  />
                ))}
              </div>
              <blockquote className="mt-4">
                <p className="font-display text-xl text-ink-100">{review.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink-500">{review.body}</p>
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-ink-300">
                {review.author} · {review.city} · {review.motorcycle}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
