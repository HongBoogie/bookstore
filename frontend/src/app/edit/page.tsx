import EditContainer from "@components/EditContainer";
import { Suspense } from "react";

export default function BookEditPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditContainer />
      </Suspense>
    </div>
  );
}
