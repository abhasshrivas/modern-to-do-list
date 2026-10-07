import React, { useRef, useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const nextTaskId = useRef(0);

    function addTask(event) {
        event.preventDefault();
        const title = taskText.trim();

        if (!title) {
            return;
        }

        setTasks((currentTasks) => [
            ...currentTasks,
            { id: nextTaskId.current++, title, completed: false },
        ]);
        setTaskText("");
    }

    function toggleTask(taskId) {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    function removeTask(taskId) {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== taskId)
        );
    }

    const completedCount = tasks.filter((task) => task.completed).length;

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10 sm:px-6 sm:py-14">
            <section className="w-full max-w-xl">
                <header className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                        <svg
                            aria-hidden="true"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8 12 2.5 2.5L16 9m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                        A little more focus
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        My To-Do List
                    </h1>
                    <p className="mt-3 text-base text-slate-500">
                        Make space for what matters today.
                    </p>
                </header>

                <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-xl shadow-indigo-100/70">
                    <form
                        className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:p-6"
                        onSubmit={addTask}
                    >
                        <label className="sr-only" htmlFor="new-task">
                            Add a task
                        </label>
                        <input
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                            id="new-task"
                            onChange={(event) => setTaskText(event.target.value)}
                            placeholder="What would you like to do?"
                            type="text"
                            value={taskText}
                        />
                        <button
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 active:scale-[0.98] sm:shrink-0"
                            type="submit"
                        >
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    d="M12 5v14m7-7H5"
                                />
                            </svg>
                            Add task
                        </button>
                    </form>

                    <div className="flex items-center justify-between px-5 pb-3 pt-5 sm:px-6">
                        <h2 className="font-semibold text-slate-800">
                            Your tasks
                        </h2>
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
                            {completedCount} of {tasks.length} done
                        </span>
                    </div>

                    {tasks.length > 0 ? (
                        <ul className="space-y-2 px-4 pb-5 sm:px-6 sm:pb-6">
                            {tasks.map((task) => (
                                <li
                                    className="group flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3 transition hover:border-violet-100 hover:bg-violet-50/50 sm:px-4"
                                    key={task.id}
                                >
                                    <button
                                        aria-checked={task.completed}
                                        aria-label={
                                            task.completed
                                                ? `Mark ${task.title} as incomplete`
                                                : `Mark ${task.title} as complete`
                                        }
                                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus:ring-4 focus:ring-violet-100 ${
                                            task.completed
                                                ? "border-violet-600 bg-violet-600 text-white"
                                                : "border-slate-300 bg-white hover:border-violet-500"
                                        }`}
                                        onClick={() => toggleTask(task.id)}
                                        role="checkbox"
                                        type="button"
                                    >
                                        {task.completed && (
                                            <svg
                                                aria-hidden="true"
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m5 12 4 4L19 6"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                    <span
                                        className={`min-w-0 flex-1 break-words text-sm sm:text-base ${
                                            task.completed
                                                ? "text-slate-400 line-through"
                                                : "text-slate-700"
                                        }`}
                                    >
                                        {task.title}
                                    </span>
                                    <button
                                        aria-label={`Remove ${task.title}`}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                                        onClick={() => removeTask(task.id)}
                                        type="button"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 7h12m-10 0 .7 12h6.6L16 7M9 7V4h6v3m-4 4v5m2-5v5"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-6 pb-8 pt-5 text-center sm:pb-10">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                                    />
                                </svg>
                            </div>
                            <p className="font-medium text-slate-700">
                                Your list is clear
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Add a task above to get started.
                            </p>
                        </div>
                    )}
                </div>
                <p className="mt-5 text-center text-xs text-slate-400">
                    One step at a time.
                </p>
            </section>
        </main>
    );
}

export default App;
