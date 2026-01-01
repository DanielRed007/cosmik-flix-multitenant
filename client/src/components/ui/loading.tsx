import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 rounded-lg bg-background p-10 shadow-2xl">
        <Spinner className="size-16 text-primary" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-semibold text-foreground">Loading</p>
          <p className="text-sm text-muted-foreground">Please wait a moment...</p>
        </div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full animate-pulse bg-primary/20" />
        </div>
      </div>
    </div>
  );
}