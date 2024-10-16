"use client"
export default function ProfilePage() {
  const handleClick = () => {
    alert("Will available soon!")
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md bg-gray-800">
        <h1 className="text-3xl font-bold text-center mb-6">Profile Page</h1>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-orange-500 rounded-full mb-4"></div>

          <button onClick={handleClick} className="w-full py-2 font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md focus:outline-none">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
