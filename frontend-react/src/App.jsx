import { useEffect, useState } from "react"
import {
  Check,
  Circle,
  Trash2,
  Plus,
  Zap,
  Activity,
  Target,
  Terminal,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"

const API_URL = "http://127.0.0.1:8000"

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  async function loadTasks() {
    try {
      const response = await fetch(`${API_URL}/tasks`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Failed to load tasks:", error)
    }
  }

  async function addTask() {
    if (!newTask.trim()) return

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    }

    try {
      await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })

      setNewTask("")
      loadTasks()
    } catch (error) {
      console.error("Failed to add task:", error)
    }
  }

  async function toggleTask(task) {
    try {
      await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      })

      loadTasks()
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      })

      loadTasks()
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const activeTasks = tasks.length - completedTasks

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100)

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow effects */}
      <div className="fixed top-[-200px] left-[20%] w-[500px] h-[500px] bg-cyan-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="fixed bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative flex min-h-screen">

        {/* ================================================== */}
        {/* SIDEBAR */}
        {/* ================================================== */}

        <aside className="hidden md:flex w-64 border-r border-cyan-400/20 bg-[#08080d]/90 backdrop-blur-xl p-6 flex-col">

          {/* Logo */}

          <div className="mb-10">

            <div className="flex items-center gap-3">

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(0,255,255,0.2)",
                    "0 0 30px rgba(0,255,255,0.5)",
                    "0 0 10px rgba(0,255,255,0.2)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-10 h-10 border border-cyan-400 flex items-center justify-center"
              >
                <Zap
                  className="text-cyan-400"
                  size={20}
                />
              </motion.div>

              <div>

                <p className="font-mono text-cyan-400 font-bold">
                  TASK//CORE
                </p>

                <p className="text-[10px] text-gray-500 font-mono">
                  SYSTEM ONLINE
                </p>

              </div>

            </div>

          </div>

          {/* Navigation */}

          <nav className="space-y-2 font-mono text-sm">

            <div className="px-4 py-3 border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">

              ◈ MISSION CONTROL

            </div>

            <div className="px-4 py-3 text-gray-500 hover:text-cyan-400 transition cursor-pointer">

              ◇ ACTIVE TASKS

            </div>

            <div className="px-4 py-3 text-gray-500 hover:text-cyan-400 transition cursor-pointer">

              ◇ COMPLETED

            </div>

            <div className="px-4 py-3 text-gray-500 hover:text-cyan-400 transition cursor-pointer">

              ◇ ACTIVITY LOG

            </div>

          </nav>

          {/* System status */}

          <div className="mt-auto border-t border-cyan-400/10 pt-5 font-mono text-xs text-gray-600">

            <p>CORE_STATUS</p>

            <p className="text-green-400 mt-1">
              ● OPERATIONAL
            </p>

            <p className="text-gray-700 mt-2">
              CONNECTION // STABLE
            </p>

          </div>

        </aside>

        {/* ================================================== */}
        {/* MAIN CONTENT */}
        {/* ================================================== */}

        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">

          {/* HEADER */}

          <header className="mb-10">

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

              <div>

                <p className="font-mono text-xs text-cyan-400 mb-3 tracking-[0.3em]">

                  SYSTEM / PRODUCTIVITY / 01

                </p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-black tracking-tight"
                >

                  MISSION
                  <span className="text-cyan-400">
                    _CONTROL
                  </span>

                </motion.h1>

                <p className="font-mono text-sm text-gray-500 mt-3">

                  TASK MANAGER // COMMAND CENTER

                </p>

              </div>

              <div className="font-mono text-xs text-right">

                <p className="text-gray-600">
                  SYSTEM STATUS
                </p>

                <div className="flex items-center gap-2 justify-end mt-1">

                  <motion.span
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="text-green-400"
                  >
                    ●
                  </motion.span>

                  <p className="text-cyan-400">
                    READY // ONLINE
                  </p>

                </div>

              </div>

            </div>

          </header>

          {/* ================================================== */}
          {/* STAT CARDS */}
          {/* ================================================== */}

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            {/* Total */}

            <motion.div
              whileHover={{ y: -3 }}
              className="border border-cyan-400/20 bg-[#0a0a10]/80 backdrop-blur-xl p-5 relative overflow-hidden"
            >

              <div className="absolute top-0 left-0 w-full h-px bg-cyan-400/40" />

              <div className="flex items-center justify-between">

                <p className="font-mono text-xs text-gray-500">
                  TOTAL TASKS
                </p>

                <Target
                  size={16}
                  className="text-cyan-400"
                />

              </div>

              <p className="text-4xl font-bold text-cyan-400 mt-2">
                {tasks.length}
              </p>

              <p className="font-mono text-[10px] text-gray-700 mt-2">
                ALL DIRECTIVES
              </p>

            </motion.div>

            {/* Active */}

            <motion.div
              whileHover={{ y: -3 }}
              className="border border-violet-400/20 bg-[#0a0a10]/80 backdrop-blur-xl p-5 relative overflow-hidden"
            >

              <div className="absolute top-0 left-0 w-full h-px bg-violet-400/40" />

              <div className="flex items-center justify-between">

                <p className="font-mono text-xs text-gray-500">
                  ACTIVE
                </p>

                <Activity
                  size={16}
                  className="text-violet-400"
                />

              </div>

              <p className="text-4xl font-bold text-violet-400 mt-2">
                {activeTasks}
              </p>

              <p className="font-mono text-[10px] text-gray-700 mt-2">
                PENDING EXECUTION
              </p>

            </motion.div>

            {/* Completed */}

            <motion.div
              whileHover={{ y: -3 }}
              className="border border-green-400/20 bg-[#0a0a10]/80 backdrop-blur-xl p-5 relative overflow-hidden"
            >

              <div className="absolute top-0 left-0 w-full h-px bg-green-400/40" />

              <div className="flex items-center justify-between">

                <p className="font-mono text-xs text-gray-500">
                  COMPLETED
                </p>

                <Check
                  size={16}
                  className="text-green-400"
                />

              </div>

              <p className="text-4xl font-bold text-green-400 mt-2">
                {completedTasks}
              </p>

              <p className="font-mono text-[10px] text-gray-700 mt-2">
                {completionRate}% COMPLETION RATE
              </p>

            </motion.div>

          </section>

          {/* ================================================== */}
          {/* ADD TASK */}
          {/* ================================================== */}

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-cyan-400/20 bg-[#08080d]/90 backdrop-blur-xl p-5 mb-8 relative"
          >

            <div className="absolute top-0 left-0 w-24 h-px bg-cyan-400" />

            <div className="flex items-center gap-2 mb-4">

              <Terminal
                size={16}
                className="text-cyan-400"
              />

              <p className="font-mono text-xs text-cyan-400 tracking-widest">

                DEPLOY NEW DIRECTIVE

              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                value={newTask}
                onChange={(event) =>
                  setNewTask(event.target.value)
                }
                onKeyDown={(event) => {

                  if (event.key === "Enter") {
                    addTask()
                  }

                }}
                placeholder="ENTER TASK DIRECTIVE..."
                className="flex-1 bg-black/80 border border-cyan-400/20 px-4 py-3 font-mono text-sm text-cyan-300 outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.1)] placeholder:text-gray-700 transition"
              />

              {/* shadcn Button */}

              <Button
                onClick={addTask}
                className="h-auto px-6 py-3 rounded-none border border-cyan-400 bg-cyan-400/10 text-cyan-300 font-mono text-sm hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition"
              >

                <Plus size={16} />

                EXECUTE

              </Button>

            </div>

          </motion.section>

          {/* ================================================== */}
          {/* TASK QUEUE */}
          {/* ================================================== */}

          <section>

            <div className="flex items-center justify-between mb-4">

              <div>

                <div className="flex items-center gap-2">

                  <p className="font-mono text-xs text-cyan-400">
                    ACTIVE_MISSIONS
                  </p>

                  <motion.span
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="text-cyan-400 text-xs"
                  >
                    ●
                  </motion.span>

                </div>

                <h2 className="text-2xl font-bold mt-1">
                  Task Queue
                </h2>

              </div>

              <p className="font-mono text-xs text-gray-600">
                {tasks.length} RECORDS
              </p>

            </div>

            {/* Task list */}

            <div className="space-y-3">

              <AnimatePresence mode="popLayout">

                {tasks.map((task) => (

                  <motion.div
                    key={task.id}
                    layout
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: 30,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="group flex items-center gap-4 border border-white/10 bg-[#09090e]/90 backdrop-blur-xl p-4 hover:border-cyan-400/30 hover:bg-cyan-400/[0.02] transition"
                  >

                    {/* Complete button */}

                    <button
                      onClick={() => toggleTask(task)}
                      className="shrink-0"
                      aria-label={
                        task.completed
                          ? "Mark task incomplete"
                          : "Mark task complete"
                      }
                    >

                      {task.completed ? (

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >

                          <Check
                            size={22}
                            className="text-green-400"
                          />

                        </motion.div>

                      ) : (

                        <Circle
                          size={22}
                          className="text-gray-600 hover:text-cyan-400 transition"
                        />

                      )}

                    </button>

                    {/* Task information */}

                    <div className="flex-1 min-w-0">

                      <p
                        className={`font-mono text-sm ${
                          task.completed
                            ? "line-through text-gray-600"
                            : "text-gray-200"
                        }`}
                      >

                        {task.title}

                      </p>

                      <p className="font-mono text-[10px] text-gray-700 mt-1">

                        ID // {task.id}

                      </p>

                    </div>

                    {/* Delete */}

                    <button
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                      className="opacity-40 group-hover:opacity-100 text-gray-600 hover:text-red-400 hover:scale-110 transition"
                    >

                      <Trash2 size={18} />

                    </button>

                  </motion.div>

                ))}

              </AnimatePresence>

              {/* Empty state */}

              {tasks.length === 0 && (

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-dashed border-cyan-400/20 p-10 text-center"
                >

                  <Target
                    size={30}
                    className="mx-auto text-gray-700 mb-3"
                  />

                  <p className="font-mono text-sm text-gray-600">

                    NO ACTIVE DIRECTIVES

                  </p>

                  <p className="font-mono text-[10px] text-gray-800 mt-2">

                    DEPLOY A NEW TASK TO BEGIN

                  </p>

                </motion.div>

              )}

            </div>

          </section>

          {/* Footer */}

          <footer className="mt-12 pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] text-gray-700">

            <p>
              TASK//CORE v1.0
            </p>

            <p>
              FASTAPI // SQLITE // REACT
            </p>

            <p>
              CONNECTION // 127.0.0.1:8000
            </p>

          </footer>

        </main>

      </div>

    </div>
  )
}

export default App