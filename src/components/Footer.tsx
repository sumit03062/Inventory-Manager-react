
import { Link } from "react-router-dom";
import { Package, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Company */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">AMRR TechSols</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-ocean-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-ocean-400 transition-colors">
              About
            </Link>
            <Link to="/view-items" className="hover:text-ocean-400 transition-colors">
              View Items
            </Link>
            <Link to="/add-items" className="hover:text-ocean-400 transition-colors">
              Add Items
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-1 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>© 2024 AMRR TechSols</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
