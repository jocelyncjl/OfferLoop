export function FinalCTASection() {
    return (
        <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-2xl border border-[#d8ecdc] bg-[#F3F8EC] text-center px-6 py-12 sm:px-12 sm:py-16">
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                    Ready to close your
                    <br/>
                    next loop?
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                    From JD to offer, one workspace for every application.
                </p>

                <div className="mt-8 flex justify-center">
                    <a
                        href="/dashboard"
                        className="inline-flex w-full items-center justify-center gap-4 rounded-xl bg-green-800 px-6 py-4 text-lg font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-md sm:w-auto sm:min-w-80"
                    >
                        Start your first loop

                        <span aria-hidden="true" className="text-xl leading-none">
                            ➜
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}