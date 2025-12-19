import Hero from '@/components/Hero';
import MarbleNav from '@/components/MarbleNav';
import About from '@/components/About';
import ArtifactGrid from '@/components/ArtifactGrid';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background transition-colors duration-500">
      {/* Navigation */}
      <MarbleNav />
      
      {/* Hero Section with 3D Scene */}
      <Hero />
      
      {/* About/Chronicle Section */}
      <About />
      
      {/* Projects/Artifacts Section */}
      <ArtifactGrid />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
