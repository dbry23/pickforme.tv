export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 md:py-4">
        <div className="flex justify-center items-center">
          <p className="text-slate-300 text-xs md:text-sm text-center">
            © {currentYear} Pick For Me TV. All rights reserved.
            <span className="mx-2 hidden md:inline">•</span>
            <span className="block md:inline"></span>
            Created by{' '}
            <a
              href="https://www.brytech.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-white transition-colors duration-300 underline underline-offset-2"
            >
              BryTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
