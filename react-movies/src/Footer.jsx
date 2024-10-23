import LiveTvIcon from "@mui/icons-material/LiveTv";

export function Footer() {
  return (
    <footer className="bg-gray-900 mt-10 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
        {/* Logo or brand name */}
        <div className="text-lg font-bold mb-4 md:mb-0">
          <LiveTvIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <a href="#">Movies</a>
        </div>

        {/* Navigation links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <li>
              <a href="#navbar" className="hover:text-gray-400">
                Inicio
              </a>
            </li>
            <li>
              <a href="#popular" className="hover:text-gray-400">
                Popular
              </a>
            </li>
            <li>
              <a href="#top" className="hover:text-gray-400">
                Top Ranking
              </a>
            </li>
            <li>
              <a href="#tendencias" className="hover:text-gray-400">
                Tendencias
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-sm">
          <a href="#" className="hover:text-gray-400" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.099 4.388 23.11 10.125 24v-8.45H7.078v-3.477h3.047V9.845c0-3.021 1.791-4.68 4.533-4.68 1.312 0 2.686.235 2.686.235v2.953h-1.512c-1.49 0-1.953.928-1.953 1.878v2.235h3.328l-.532 3.477h-2.796V24C19.612 23.11 24 18.099 24 12.073z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.604 1.794-1.558 2.163-2.695-.949.555-2.004.959-3.127 1.184-.897-.957-2.178-1.554-3.594-1.554-2.717 0-4.916 2.21-4.916 4.917 0 .39.045.765.127 1.124C7.728 8.087 4.1 6.128 1.671 3.149c-.427.733-.666 1.583-.666 2.491 0 1.72.87 3.233 2.188 4.12-.807-.026-1.566-.248-2.229-.616v.061c0 2.404 1.708 4.407 3.976 4.863-.416.111-.855.171-1.307.171-.321 0-.633-.03-.935-.087.635 1.982 2.476 3.424 4.66 3.465-1.71 1.338-3.863 2.133-6.209 2.133-.403 0-.8-.023-1.191-.069 2.213 1.42 4.843 2.25 7.67 2.25 9.206 0 14.236-7.629 14.236-14.236 0-.217-.005-.433-.015-.648.978-.707 1.83-1.594 2.502-2.606z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400" aria-label="Instagram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.315 3.608 1.29.975.975 1.229 2.241 1.29 3.608.059 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.315 2.633-1.29 3.608-.975.975-2.241 1.229-3.608 1.29-1.265.059-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.315-3.608-1.29-.975-.975-1.229-2.241-1.29-3.608-.059-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.315-2.633 1.29-3.608.975-.975 2.241-1.229 3.608-1.29 1.265-.059 1.645-.07 4.849-.07zm0-2.163C8.756 0 8.332.014 7.052.073 5.773.131 4.513.366 3.6 1.28 2.687 2.193 2.452 3.453 2.393 4.732c-.059 1.28-.073 1.704-.073 4.849s.014 3.569.073 4.849c.059 1.28.366 2.54 1.28 3.453.913.913 2.173 1.22 3.452 1.28 1.28.059 1.704.073 4.849.073s3.569-.014 4.849-.073c1.28-.059 2.54-.366 3.453-1.28.913-.913 1.22-2.173 1.28-3.453.059-1.28.073-1.704.073-4.849s-.014-3.569-.073-4.849c-.059-1.28-.366-2.54-1.28-3.453-.913-.913-2.173-1.22-3.453-1.28C15.569.014 15.144 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.137c-2.19 0-3.975-1.785-3.975-3.975S9.81 8.025 12 8.025s3.975 1.785 3.975 3.975-1.785 3.975-3.975 3.975zm6.406-10.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center mt-4 text-gray-400 text-xs">
        &copy; 2024 Movies. All rights reserved.
      </div>
    </footer>
  );
}
