const trustTags: string[] = [
    "Frontend",
    "Backend",
    "Full-stack",
    "Data & ML",
    "DevOps / Cloud",
    "Security",
    "New grads",
    "Career switchers"
];

export function TrustSection() {
    return (
        <section className="px-5 py-5 sm:px-8 sm:py-15 lg:px-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-12">
                <p className="text-base font-semibold text-slate-700 px-4 py-2 sm:text-lg">
                    Designed for tech job seekers at every stage
                </p>

                <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
                    {trustTags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-base font-semibold text-slate-700 shadow-sm sm:px-5 sm:py-3 sm:text-lg"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}