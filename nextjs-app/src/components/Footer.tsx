export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 md:px-16 bg-stone-100 dark:bg-stone-950">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-screen-2xl mx-auto">
        <p className="text-stone-600 dark:text-stone-400 font-label text-xs uppercase tracking-widest font-semibold">
          © 2024 The Digital Curator. Built with Intent.
        </p>
        <div className="flex items-center gap-10">
          <a
            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-opacity"
            href="#"
          >
            <span className="material-symbols-outlined text-2xl">hub</span>
          </a>
          <a
            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-opacity"
            href="#"
          >
            <span className="material-symbols-outlined text-2xl">
              contact_mail
            </span>
          </a>
          <a
            className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-opacity"
            href="#"
          >
            <span className="material-symbols-outlined text-2xl">
              terminal
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
