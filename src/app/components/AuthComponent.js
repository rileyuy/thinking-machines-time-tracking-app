import { handleSignIn, handleSignUp } from "../services/auth";

export const AuthComponent = async () => {
  return (
    <div className="w-full max-w-sm p-6 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-black">Sign In / Sign Up</h2>
      <form action={handleSignIn} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
      </form>
      <form action={handleSignUp} className="mt-3">
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
