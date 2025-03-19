"use client"; // Required for Next.js when using useState

import { useState } from "react";

const AddScheduleForm = () => {
  const [semester, setSemester] = useState<string>("Spring 2025");
  const [eventName, setEventName] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eventName || !eventDate) {
      setError("All fields are required.");
      return;
    }

    const newEvent = {
      semester,
      event: eventName,
      date: eventDate,
    };

    fetch("http://127.0.0.1:5000/api/schedule/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setMessage(result.message);
          setError(null);
          setEventName("");
          setEventDate("");
        }
      })
      .catch(() => setError("An error occurred while adding the event."));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-blue-900 dark:text-white font-playfair-display mb-6">
        Add a New Schedule Event
      </h2>

      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Select Semester:
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="Spring 2025">Spring 2025</option>
            <option value="Summer 2025">Summer 2025</option>
            <option value="Fall 2025">Fall 2025</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Event Name:
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Enter event name"
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
            Event Date:
          </label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-900 text-white font-semibold rounded-md text-lg transition-transform hover:scale-105"
        >
          Add Schedule
        </button>
      </form>
    </div>
  );
};

export default AddScheduleForm;
