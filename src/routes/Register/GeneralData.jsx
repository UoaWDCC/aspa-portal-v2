export default function GeneralData() {
  return (
    <aside className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="firstName">First Name</label>
          <input
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
            type="text"
            placeholder="John"
            name="firstName"
            id="firstName"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="firstName">Last Name</label>
          <input
            className="bg-transparent px-3 py-2 border-2 rounded-lg"
            type="text"
            placeholder="Doe"
            name="lastName"
            id="lastName"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="firstName">Email</label>
        <input
          className="bg-transparent px-3 py-2 border-2 rounded-lg"
          type="text"
          placeholder="johndoe@gmail.com"
          name="email"
          id="email"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="firstName">UPI</label>
        <input
          className="bg-transparent px-3 py-2 border-2 rounded-lg"
          type="text"
          placeholder="jdoe727"
          name="upi"
          id="upi"
        />
      </div>
    </aside>
  );
}
