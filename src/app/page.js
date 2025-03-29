import { createClient } from "./utils/supabase/server";
import { AuthComponent } from "./components/AuthComponent";
import { handleSignOut } from "./services/auth";
import TaskModal from "./components/TaskModal"; // Import modal

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

  // const groupedTasks = data?.reduce((acc, task) => {
  //   const date = new Date(task.created_at).toLocaleDateString();
  //   if (!acc[date]) {
  //     acc[date] = [];
  //   }
  //   acc[date].push(task);
  //   return acc;
  // }, {});

  return (
    <div className="grid place-items-center min-h-screen p-8 sm:p-20 font-sans">
      {user ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-between">
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
          <div className="w-full space-y-4">
            {data?.length > 0 ? (
              data?.map((task, index) => {
                console.log(task);
                return (
                  <div
                    key={index}
                    className="w-full bg-white text-black rounded-lg shadow-md p-5 flex flex-col space-y-3 border border-gray-300"
                  >
                    {/* Task Header */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {task?.title}
                      </h3>
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {`${task?.hours} hrs`}
                      </span>
                    </div>

                    {/* Task Description */}
                    <p className="text-gray-600 text-sm">
                      {task?.activity_description}
                    </p>

                    {/* Tags Section */}
                    {task?.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
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
