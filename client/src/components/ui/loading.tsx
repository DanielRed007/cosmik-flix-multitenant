import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-lime-300 via-electric-green-300 to-lime-300 backdrop-blur backdrop-blur-sm">
      <Spinner className="size-16 text-primary" />
    </div>
  );
}