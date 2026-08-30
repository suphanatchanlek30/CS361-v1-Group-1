import { BackToFacultyDirectory } from '@/components/faculty/faculty-profile-sections';

interface ProfileStateProps {
  title: string;
  description: string;
  /** The "retry" button only renders when the caller passes a handler (error boundary only) */
  onRetry?: () => void;
}

/** Centered status card, shared by the not-found / invalid-id / error states */
export function ProfileState({ title, description, onRetry }: ProfileStateProps) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:py-24">
      <div className="rounded-xl border border-line bg-surface-alt p-8">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-line"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"
          />
        </svg>

        <h1 className="text-xl font-bold text-ink">{title}</h1>
        <p className="mt-3 text-sm text-ink-muted">{description}</p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              ลองใหม่อีกครั้ง
            </button>
          ) : null}
          <BackToFacultyDirectory />
        </div>
      </div>
    </div>
  );
}
