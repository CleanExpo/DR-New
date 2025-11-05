export default function Loading() {
  return (
    <div className="min-h-screen flex items-centre justify-centre bg-gray-100">
      <div className="text-centre">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading...</p>
      </div>
    </div>
  );
}