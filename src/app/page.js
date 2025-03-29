import { createClient } from "./utils/supabase/server";
import { AuthComponent } from "./components/AuthComponent";
import { handleSignOut } from "./services/auth";
import TaskModal from "./components/TaskModal"; // Import modal
import { CollapsibleTaskSection } from "./components/CollapsibleTaskSection";
import { generateSummaryWithHF } from "./services/aiSummary";
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user?.id);
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("user_id", user?.id);
  console.log(error);

  console.log(data);
  // console.log(user);

  const groupedTasks = Object.fromEntries(
    Object.entries(
      data?.reduce((acc, task) => {
        const date = new Date(task.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        (acc[date] ||= []).push(task);
        return acc;
      }, {})
    ).sort(([a], [b]) => new Date(b) - new Date(a)) // Ensure correct sorting
  );

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayTasks = groupedTasks[todayDate] || [];

  // Generate summary
  const summary = await generateSummaryWithHF(data);
  return (
    <div className="grid place-items-center min-h-screen p-8 sm:p-20 font-sans">
      {user ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-row items-center justify-between w-full max-w-3xl">
            <p className="text-xl font-bold">{`Welcome, ${user?.email}`}</p>
            <form action={handleSignOut}>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </form>
          </div>

          <div className="w-full max-w-3xl space-y-4 rounded-md border-2 border-gray-400 p-4">
            <h2 className="text-lg font-semibold">Daily Summary</h2>
            <p className="text-gray-700">{summary}</p>
          </div>

          <div className="w-full max-w-3xl space-y-4">
            {groupedTasks && Object.keys(groupedTasks).length > 0 ? (
              Object.entries(groupedTasks).map(([date, tasks], index) => (
                <CollapsibleTaskSection
                  key={date}
                  date={date}
                  tasks={tasks}
                  index={index}
                />
              ))
            ) : (
              <p className="text-center text-gray-600">
                You currently have no tasks. Create one to start!
              </p>
            )}
          </div>

          <TaskModal />
        </div>
      ) : (
        <AuthComponent />
      )}
    </div>
  );
}
