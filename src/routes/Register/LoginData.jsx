export default function LoginData() {
  return (
    <aside className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="username">Username</label>
          <input
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
            type="text"
            placeholder="Username"
            name="username"
            id="username"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password</label>
          <input
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
            type="text"
            placeholder="Password"
            name="password"
            id="password"
          />
        </div>
      </div>
    </aside>
  );
}
