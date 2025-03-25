import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-dark-400 text-2xl font-semibold">{session?.user?.name}</h2>
        <p className="text-base text-slate-500">Monitor all you users and books herr</p>
      </div>
      {/* <p>Search</p> */}
    </header>
  );
};

export default Header;
