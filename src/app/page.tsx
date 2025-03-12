import DashBoard from "@/components/DashBoard/DashBoard";
import ProtectedRoute from "@/HOCs/protectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
        <DashBoard />
    </ProtectedRoute>
  )
}
