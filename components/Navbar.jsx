import Link from "next/link";

const Navbar = ({ isLandingPage = false, showSideMenu = true }) => {
  return (
    <nav
      className={`w-full flex items-center justify-between py-4 ${isLandingPage ? "text-gray-100" : "text-gray-800"}`}
    >
      <Link href="/" className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-10 h-10"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6A28" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#FF6A28" />
            </linearGradient>
          </defs>
          <path fill="url(#logoGrad)" d="M3 10.5L21 3l-7.5 18L10.5 14 3 10.5z" />
        </svg>
        <span className="text-2xl font-semibold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6A28] via-amber-500 to-[#FF6A28]">
            Voyago
          </span>
        </span>
      </Link>

      <div className="flex items-center gap-6">
        {showSideMenu && (
          <ul className="flex items-center gap-6">
            <li>
              <Link href="#">Recommended Places</Link>
            </li>

            <li>
              <Link href="#">About Us</Link>
            </li>

            <li>
              <Link href="#">Contact us</Link>
            </li>

            <li>
              <Link href="/bookings">Bookings</Link>
            </li>

            <li>
              <Link href="/login" className="login">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
