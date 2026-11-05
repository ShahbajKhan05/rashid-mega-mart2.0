import AdminWorkspace from "../AdminWorkspace";

export default async function AdminSectionPage({ params }: { params: Promise<{ section?: string[] }> }) {
  const { section } = await params;
  return <AdminWorkspace section={section?.[0] ?? "overview"} />;
}
