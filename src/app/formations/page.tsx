import { Suspense } from "react";
import FormationsPage from "./FormationsPage";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <FormationsPage />
    </Suspense>
  );
}