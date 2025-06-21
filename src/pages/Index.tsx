
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, Eye, Plus, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-ocean-50 to-slate-100 font-poppins flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 flex-1">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-3xl mb-8 shadow-2xl">
              <Package className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-ocean-500 to-ocean-600 bg-clip-text text-transparent">
                AMRR TechSols
              </span>{" "}
              Item Manager
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Modern inventory management system designed to streamline your item tracking process with style, efficiency, and simplicity.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your inventory efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-6 relative">
                <CardTitle className="flex items-center gap-4 text-2xl text-slate-800">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  View & Manage Items
                </CardTitle>
                <CardDescription className="text-slate-600 text-lg leading-relaxed">
                  Browse your complete inventory with advanced search, filtering, and sorting capabilities. Get detailed insights into your items at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Link to="/view-items">
                  <Button className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Eye className="h-5 w-5 mr-2" />
                    Explore Items
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/5 to-ocean-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-6 relative">
                <CardTitle className="flex items-center gap-4 text-2xl text-slate-800">
                  <div className="p-3 bg-gradient-to-br from-ocean-100 to-ocean-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-8 w-8 text-ocean-600" />
                  </div>
                  Add New Items
                </CardTitle>
                <CardDescription className="text-slate-600 text-lg leading-relaxed">
                  Easily add new items to your inventory with detailed information, multiple images, and comprehensive categorization options.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Link to="/add-items">
                  <Button className="w-full h-14 bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Item
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

       
      </div>

      <Footer />
    </div>
  );
};

export default Index;
