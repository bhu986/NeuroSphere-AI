import UploadDataset from "@/pages/UploadDataset";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <UploadDataset />
    </ProtectedRoute>
  );
}
