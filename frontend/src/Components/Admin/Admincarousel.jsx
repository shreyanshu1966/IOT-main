import React, { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const Admincarousel = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSolution, setNewSolution] = useState({ name: "", image: null });

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/solutions`); // Update with actual API
      const data = await response.json();
      setSolutions(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load solutions.");
      setLoading(false);
    }
  };

  const handleDeleteSolution = async (id) => {
    try {
      await fetch(`${apiUrl}/api/solutions/${id}`, { method: "DELETE" });
      setSolutions(solutions.filter((solution) => solution._id !== id));
    } catch (err) {
      setError("Failed to delete solution.");
    }
  };

  const handleInputChange = (e) => {
    setNewSolution({ ...newSolution, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewSolution({ ...newSolution, image: e.target.files[0] });
  };

  const handleAddSolution = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newSolution.name);
      formData.append("image", newSolution.image);

      const response = await fetch(`${apiUrl}/api/solutions`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add solution.");

      const newSolutionData = await response.json();
      setSolutions([...solutions, newSolutionData]);
      setNewSolution({ name: "", image: null });
    } catch (err) {
      setError("Failed to add solution.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Manage Carousel Solutions</h2>

      {loading ? (
        <p className="text-gray-600">Loading solutions...</p>
      ) : (
        <ul className="mb-4">
          {solutions.map((solution) => (
            <li
              key={solution._id}
              className="mb-2 flex justify-between items-center border-b pb-2"
            >
              <span className="text-lg">{solution.name}</span>
              <button
                onClick={() => handleDeleteSolution(solution._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleAddSolution} className="space-y-4">
        <div>
          <label className="block text-gray-700">Solution Name</label>
          <input
            type="text"
            name="name"
            value={newSolution.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Solution
        </button>
      </form>
    </div>
  );
};

export default Admincarousel;
