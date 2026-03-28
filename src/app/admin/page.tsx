"use client";
import { AuthGate } from "@/components/admin/AuthGate";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <AuthGate>
      {(apiKey) => <AdminDashboard apiKey={apiKey} />}
    </AuthGate>
  );
}
