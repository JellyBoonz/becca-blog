export default function Footer() {
  return (
    <footer className="bg-charcoal text-parchment/80 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm font-serif">
          &copy; {new Date().getFullYear()} Field Notes Blog
        </p>
        <p className="text-xs mt-2 text-parchment/60 font-body">
          Crafted with care
        </p>
      </div>
    </footer>
  );
}

