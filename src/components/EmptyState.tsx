import Link from "next/link";
import { Compass } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ title, message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <section className="mx-5 rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50 p-8 text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-blue-800 shadow-sm">
        <Compass size={36} />
      </div>
      <h2 className="mt-6 text-2xl font-black text-slate-950">{title}</h2>
      <p className="mt-3 text-slate-600">{message}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-blue-700 px-6 font-bold text-white shadow-lg shadow-blue-700/25"
        >
          {actionLabel}
        </Link>
      )}
    </section>
  );
}
