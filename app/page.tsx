import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ForceScroll from "@/components/ForceScroll";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <ForceScroll />
      <Navbar />
      <Hero />
      <TrustedBy />
      <Services />
      <About />
      <Portfolio />
      <Process />
      <Testimonials />
      <Blog />
      <Footer />
      <Chatbot />
    </main>
  );
}
