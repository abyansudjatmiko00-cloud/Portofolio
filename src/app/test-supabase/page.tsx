import { supabase } from "@/lib/supabase";

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("proyek")
    .select("*");

  console.log("Data dari Supabase:", data);
  console.log("Error (jika ada):", error);

  return (
    <main>
      <h1>Supabase Connection Test</h1>

      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
}