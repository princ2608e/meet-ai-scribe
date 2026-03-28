import { useState } from "react";
import axios from "axios";

function App() {
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");

  const handleStart = async () => {
  try {
    setStatus("🔗 Joining Google Meet...");
    await new Promise((res) => setTimeout(res, 1500));

    setStatus("🎧 Listening to conversation...");
    await new Promise((res) => setTimeout(res, 2000));

    setStatus("📝 Transcribing audio...");
    await new Promise((res) => setTimeout(res, 2000));

    setStatus("🧠 Generating AI summary...");

    const res = await axios.post("http://localhost:5000/start", {
      meetLink: link,
    });

    setSummary(res.data.summary);

    setStatus("✅ Meeting summarized successfully!");

  } catch (error) {
    setStatus("❌ Error connecting to server");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center p-6">
      
      <h1 className="text-4xl font-bold mb-6 text-blue-400">
        Meet AI Scribe
      </h1>
<p className="text-gray-400 mb-4">
  AI-powered meeting summarizer for Google Meet
</p>
      {/* Input Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Google Meet Link"
          className="p-3 w-full rounded text-black"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          onClick={handleStart}
          className="mt-4 w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Start Bot
        </button>

        <p className="mt-3 text-sm text-yellow-400 font-medium animate-pulse">
  {status}
</p>

<div className="w-full bg-gray-700 rounded-full h-2 mt-2">
  <div className="bg-blue-500 h-2 rounded-full animate-pulse w-3/4"></div>
</div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            📋 Meeting Summary
          </h2>

          <div className="space-y-4">
  {summary.split("\n").map((line, index) => (
    <div key={index} className="bg-gray-700 p-3 rounded">
      {line}
    </div>
  ))}
</div>
        </div>
      )}
    </div>
  );
}

export default App;