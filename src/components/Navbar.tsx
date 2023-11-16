import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="navbar border ">
        <div className="container">
          <div className="flex-1">
            <Link href='/' className="btn btn-ghost normal-case text-xl">Note</Link>
          </div>
          <div className="flex-none">
                <Link href='/create' className="btn btn-ghost">Create note</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
