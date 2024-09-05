import Logo from "../Logo";
import Nav from "../Nav";

const Header = () => {
  return (
    <div className="sticky top-0 z-[20] mx-auto flex w-full flex-wrap items-center justify-between border-b-2 bg-zinc-50">
      <div className="mx-auto flex w-full max-w-screen-lg flex-wrap items-center justify-between px-4 py-2">
        <Logo />
        <Nav />
      </div>
    </div>
  );
};

export default Header;
