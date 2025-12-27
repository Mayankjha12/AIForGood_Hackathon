import React, { useState } from "react";

const ToDoList = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [tasks, setTasks] = useState({
    today: [
      {
        title: "Apply Pest Control (Cotton Field C)",
        description: "Apply treatment before 10 AM for best results.",
        priority: "High",
        color: "red",
        label: "Pest Control",
      },
    ],
    week: [
      {
        title: "Fertilizer Planning (Rice)",
        description: "Prepare Nitrogen-based fertilization.",
        priority: "Medium",
        color: "orange",
        label: "Fertilizer",
      },
    ],
    all: [],
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    color: "orange",
    label: "General",
  });

  const [editIndex, setEditIndex] = useState(null);

  const priorityColor = (color) => {
    const colors = {
      red: "bg-red-100 text-red-700",
      orange: "bg-orange-100 text-orange-700",
      blue: "bg-blue-100 text-blue-700",
    };
    return colors[color] || "bg-gray-100 text-gray-700";
  };

  const handleAddOrEditTask = () => {
    if (!newTask.title.trim()) return;
    const copy = { ...tasks };
    if (editIndex !== null) {
      copy[activeTab][editIndex] = newTask;
      setEditIndex(null);
    } else {
      copy[activeTab].push(newTask);
    }
    setTasks(copy);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      color: "orange",
      label: "General",
    });
  };

  const handleDelete = (index) => {
    const copy = { ...tasks };
    copy[activeTab].splice(index, 1);
    setTasks(copy);
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE: Task Cards */}
        <div className="lg:col-span-2 space-y-6">

          {/* Tabs ABOVE task cards */}
          <div className="flex gap-3 mb-4">
            {["today", "week", "all"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white border text-gray-600 hover:border-green-500"
                }`}
              >
                {tab === "today" && "Today"}
                {tab === "week" && "This Week"}
                {tab === "all" && "All Tasks"}
              </button>
            ))}
          </div>

          {tasks[activeTab].length === 0 ? (
            <p className="text-gray-400 italic">No tasks available</p>
          ) : (
            tasks[activeTab].map((task, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${priorityColor(task.color)}`}>
                      {task.priority}
                    </span>
                    <h3 className="font-bold text-xl text-gray-900 mt-2">{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-xl text-sm font-medium text-gray-700 border">
                    {task.label}
                  </div>
                </div>

                <div className="mt-4 flex justify-end items-center gap-3">
                  {/* Edit Icon */}
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setNewTask(task);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.5 19.213l-4 1 1-4L16.862 3.487z" />
                    </svg>
                  </button>

                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE: Input Box */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md flex flex-col space-y-4">
            <h2 className="font-bold text-xl text-gray-800">{editIndex !== null ? "Edit Task" : "Add New Task"}</h2>
            
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            />

            <div className="flex gap-3 items-center">
              <select
                value={newTask.priority}
                onChange={(e) => {
                  const colorMap = { High: "red", Medium: "orange", Low: "blue" };
                  setNewTask({ ...newTask, priority: e.target.value, color: colorMap[e.target.value] });
                }}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <input
                type="text"
                placeholder="Label"
                value={newTask.label}
                onChange={(e) => setNewTask({ ...newTask, label: e.target.value })}
                className="border border-gray-300 p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              />
            </div>

            {/* Green Add / Save Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleAddOrEditTask}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 font-semibold transition-all"
              >
                {editIndex !== null ? "Save Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ToDoList;
