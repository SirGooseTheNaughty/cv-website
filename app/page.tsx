import { Header } from "./main/Header";
import { Hero } from "./main/hero/Hero";
import { Projects } from "./main/projects/Projects";
import { Skills } from "./main/skills/Skills";
import { Process } from "./main/process/Process";
import { About } from "./main/about/About";
import { Footer } from "./main/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Process />
        <About />
        <Footer />
      </main>
    </>
  )
}
