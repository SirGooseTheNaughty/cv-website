import { ContactItem, Section, ExperienceItem, AwardItem, Skills } from "./components";

export default function Home() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <header className="p-4 py-8 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-4xl font-bold mb-4">Sergey Vorobyev</h1>
            <div className="flex flex-wrap justify-center gap-2 gap-y- sm:gap-4">
              <ContactItem href="mailto:syvorobyev@gmail.com">
                syvorobyev@gmail.com
              </ContactItem>
              <ContactItem href="https://www.linkedin.com/in/vorobyev-sergey/">
                LinkedIn
              </ContactItem>
              <ContactItem href="https://www.3200kelvin.com/">
                Studio Website
              </ContactItem>
              <ContactItem href="https://t.me/SirGooseTheNaughty">
                Telegram
              </ContactItem>
              <ContactItem href="https://wa.me/qr/PZ2EQYAVXJEVK1">
                WhatsApp
              </ContactItem>
            </div>
          </div>
          <div>
            <p className="leading-tight">
              Full-stack developer with 5+ years of experience building single-page applications (SPA) 
              and performant, accessible, and well-architected web interfaces using React and TypeScript. 
              Strong focus on clean UI, UX consistency, and smooth micro-interactions. 
              Experienced in cross-functional teams, design collaboration, and mentoring. 
              Passionate about accessibility (WCAG/ARIA), UX, and mentoring teams to deliver clean, scalable solutions.
            </p>
          </div>
        </header>

        <main className="p-4 sm:p-8">
          {/* Professional Experience */}
          <Section title="Professional Experience">
            <ExperienceItem
              title="Co-founder & Tech Lead"
              company="3200 Kelvin Studio — boutique web design and development studio"
              period="2024 - Present"
              description={[
                "Co-founded award-winning creative studio (Awwwards: Site of the Day x3, Developer Award x3, CSSDA: Site of the Day x3)",
                "Delivered motion-rich, high-impact websites using Webflow, GSAP, AWS and Next.js with a focus on performance, SEO, and accessibility",
                "Managed a 4–6 person remote team, set development workflows, and maintained client relationships",
                "Mentored junior developers in Webflow, JavaScript, and modern CSS practices",
                "Leveraged analytics and Lighthouse metrics to improve site performance, achieving 85+ scores across SEO and Performance for all projects"
              ]}
            />
            
            <ExperienceItem
              title="Software Engineer, Front-End Lead"
              company="EPAM Systems — outsource/outstaff software development company"
              period="2021 – 2024"
              description={[
                "Led front-end development for two distributed teams, aligning code standards and UX consistency",
                "Mentored junior developers, conducted code reviews, and championed accessibility standards",
                "Proposed and implemented UX improvements adopted by the client, improving usability and satisfaction",
                "Reduced CI time by 300% by leading migration of e2e tests from Robot Framework to Playwright",
                "Introduced atomic design practices and modular state management for maintainability",
                "Extended existing backend (Java) and cloud services (AWS, TypeScript) to support new features",
              ]}
            />
            
            <ExperienceItem
              title="Front-End Developer"
              company="Freelance / Contract Work"
              period="2019 – 2024"
              description={[
                "Extended low-code platform capabilities by developing custom HTML/CSS/JavaScript components, bridging design-development gaps for 15+ client projects",
                "Collaborated with UI/UX designers to implement pixel-perfect, responsive interfaces using vanilla JavaScript and modern CSS techniques",
                "Enhanced user experience through custom animations and interactions using GSAP, improving engagement metrics by 25-40% across projects",
                "Developed Vue.js components and integrations for no-code platforms, enabling advanced functionality beyond platform limitations",
                "Delivered rapid prototypes and proof-of-concepts, reducing client decision-making time and accelerating project timelines"
              ]}
            />
          </Section>

          {/* Awards & Recognition */}
          <Section title="Awards & Recognition">
            <div className="grid gap-4 md:grid-cols-2">
              <AwardItem
                title="Site of the Day"
                organization="Awwwards"
                year="2023"
                project="3200 Kelvin"
                url="https://www.awwwards.com/sites/3200-kelvin"
              />
              <AwardItem
                title="Site of the Day"
                organization="Awwwards"
                year="2023"
                project="Kultiveret"
                url="https://www.awwwards.com/sites/kultiveret"
              />
              <AwardItem
                title="Site of the Day"
                organization="Awwwards"
                year="2022"
                project="Darina CG Artist"
                url="https://www.awwwards.com/sites/darina-cg-artist"
              />
              <AwardItem
                title="Site of the Day"
                organization="CSS Design Awards"
                year="2023"
                project="3200 Kelvin"
                url="https://www.cssdesignawards.com/sites/3200-kelvin/46930/"
              />
              <AwardItem
                title="Site of the Day"
                organization="CSS Design Awards"
                year="2023"
                project="Kultiveret"
                url="https://www.cssdesignawards.com/sites/kultiveret/47305/"
              />
              <AwardItem
                title="Site of the Day"
                organization="CSS Design Awards"
                year="2024"
                project="Integrated Wealthcare"
                url="https://www.cssdesignawards.com/sites/integrated-wealthcare/48274/"
              />
            </div>
          </Section>

          {/* Technical Skills */}
          <Section title="Technical Skills">
            <div className="flex flex-col gap-4">
              <Skills
                title="Technologies & Tools"
                skills={
                  [
                    "JavaScript (ES6+)", "TypeScript", "React", "Redux",  
                    "Node.js", "HTML5", "CSS3", "Tailwind CSS", "SCSS/Sass", "styled-components"
                  ]
                }
              />

              <Skills
                title="Architecture & Practices"
                skills={
                  [
                    "Atomic design", "component-driven development", "state management", "SPA", 
                    "SSR", "SSG", "responsive design", "accessibility (WCAG, ARIA)", "internationalization (i18n)",
                    "REST", "WebSockets", "Code splitting"
                  ]
                }
              />

              <Skills
                title="Testing & CI/CD"
                skills={
                  [
                    "Jest", "Playwright", "Cypress", "Git", 
                    "Jenkins", "npm", "Webpack", "Vite", "Docker",
                  ]
                }
              />

              <Skills
                title="Design & UX"
                skills={
                  [
                    "Responsive Design", "UI/UX Principles", "Figma", 
                    "Adobe Creative Suite", "Accessibility (WCAG)", "Performance Optimization"
                  ]
                }
              />

              <Skills
                title="Other Tools & Experience"
                skills={
                  [
                    "Figma", "AWS (Lambda, S3, DynamoDB, CloudFront)", "Webflow,", "GSAP", 
                    "Three.js", "Vue", "Angular", "Python", "Java", "MySQL", "PostgreSQL", "MongoDB"
                  ]
                }
              />

              <Skills
                title="Soft Skills"
                skills={
                  [
                    "Leadership", "Mentoring", "Communication", "Collaboration", "Code reviews"
                  ]
                }
              />
            </div>
          </Section>

          {/* Education & Certifications */}
          <Section title="Education">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">M.Sc. in Automated Control Systems</h3>
                    <p className="text-blue-600 font-medium">St. Petersburg Electrotechnical University (ETU "LETI")</p>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 sm:mt-0 sm:text-right">
                    <div>2015-2021</div>
                    <div className="mt-1">St. Petersburg, Russia</div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Languages */}
          <Section title="Languages">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <div className="flex gap-3 justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Russian</span>
                <span className="text-sm text-gray-600">Native</span>
              </div>
              <div className="flex gap-3 justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">English</span>
                <span className="text-sm text-gray-600">Professional</span>
              </div>
              <div className="flex gap-3 justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Spanish</span>
                <span className="text-sm text-gray-600">Intermediate</span>
              </div>
            </div>
          </Section>
        </main>

        {/* Footer */}
        <footer className="flex justify-between items-center bg-gray-100 p-6 text-sm text-gray-600">
          <p>
            © Sergey Vorobyev, 2025
          </p>
          <div className="flex gap-3">
            <ContactItem href="mailto:syvorobyev@gmail.com">
              syvorobyev@gmail.com
            </ContactItem>
            <ContactItem href="https://www.linkedin.com/in/vorobyev-sergey/">
              LinkedIn
            </ContactItem>
          </div>
        </footer>
      </div>
    </div>
  );
}
