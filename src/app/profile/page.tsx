// import api from "../../utils/api";

// async function fetchUserData() {
//   try {
//     const response = await api.get("/auth/profile"); // Endpoint to get the user's profile
//     return response.data.data;
//   } catch (err) {
//     console.error("Error fetching user data", err);
//     return null;
//   }
// } 
const page = async () => {
  // const user = await fetchUserData();
  // if (!user) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-scree">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Dashboard</h1>
        <p className="text-xl">Welcome</p>
        <p className="text-lg text-gray-600">Email:</p>
      </div>
    </div>
  );
};
export default page;
