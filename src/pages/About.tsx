
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Target, Lightbulb, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-ocean-50 to-slate-100 font-poppins">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">About AMRR TechSols</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Empowering businesses with modern inventory management solutions
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-12">
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-slate-800">
                  <div className="p-3 bg-gradient-to-br from-ocean-100 to-ocean-200 rounded-xl">
                    <Target className="h-6 w-6 text-ocean-600" />
                  </div>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-lg leading-relaxed">
                  At AMRR TechSols, we believe that effective inventory management should be simple, efficient, and accessible to businesses of all sizes. Our mission is to provide cutting-edge technology solutions that streamline operations and empower organizations to focus on what matters most - growing their business.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  User-Centric Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Built with the end-user in mind, our interface is intuitive and easy to navigate, ensuring a smooth experience for all team members.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-green-600" />
                  </div>
                  Innovation First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We leverage the latest web technologies including React, TypeScript, and modern design patterns to deliver exceptional performance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  Secure & Reliable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Your data security is our priority. Built with enterprise-grade security measures and reliable cloud infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
                  <div className="p-2 bg-gradient-to-br from-ocean-100 to-ocean-200 rounded-lg">
                    <Target className="h-5 w-5 text-ocean-600" />
                  </div>
                  Scalable Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Whether you're a small business or a large enterprise, our system scales with your needs and grows alongside your business.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="border-0 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Get Started Today</CardTitle>
              <CardDescription className="text-ocean-100 text-lg">
                Ready to transform your inventory management? Let's get you started with our modern solution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/add-items" className="flex-1">
                  <Button className="w-full bg-white text-ocean-600 hover:bg-gray-100 font-semibold">
                    Start Adding Items
                  </Button>
                </Link>
                <Link to="/view-items" className="flex-1">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10 font-semibold">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div> <Footer /></div>
    </div>
    
  );
};

export default About;
