"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Download,
  Code,
  Briefcase,
  User,
  Layers,
  MessageSquare,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-lg animate-pulse"></div>
              <div className="absolute inset-0.5 bg-background rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Alex.dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === item.id ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-background border-b border-border"
          >
            <nav className="container mx-auto py-4 px-4 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 text-left rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id ? "bg-primary/10 text-primary" : "hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Full Stack Developer
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Creating digital experiences that{" "}
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    matter
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  I'm Alex, a passionate developer focused on building modern, accessible, and high-performance web
                  applications that solve real problems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                    onClick={() => scrollToSection("projects")}
                  >
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")}>
                    Get in Touch
                  </Button>
                </div>

                <div className="mt-12 flex items-center gap-6">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative hidden md:block"
              >
                <div className="relative h-[500px] w-[500px]">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[350px] h-[350px] rounded-full border-2 border-dashed border-border p-2 animate-slow-spin">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary"></div>
                    </div>
                    <div className="absolute w-[250px] h-[250px] rounded-full border border-border"></div>
                    <div className="absolute w-[400px] h-[400px] rounded-full border border-border"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-background shadow-2xl">
                        <Image
                          src="/placeholder.svg?height=200&width=200"
                          alt="Profile"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 scroll-mt-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square max-w-md mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-2xl transform rotate-3"></div>
                <div className="absolute inset-[3px] bg-background rounded-2xl overflow-hidden">
                  <Image src="/placeholder.svg?height=400&width=400" alt="About me" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-xl bg-background border border-border p-2 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-xs text-muted-foreground">Years Exp.</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-left"
              >
                <h3 className="text-2xl font-bold mb-4">A passionate developer with a creative mindset</h3>
                <p className="text-muted-foreground mb-6">
                  I'm a Full Stack Developer with over 5 years of experience building web applications. My journey in
                  tech started when I built my first website at 16, and I've been hooked ever since.
                </p>
                <p className="text-muted-foreground mb-6">
                  I specialize in creating responsive, accessible, and performant web applications using modern
                  technologies like React, Next.js, Node.js, and TypeScript. I'm passionate about clean code, user
                  experience, and solving complex problems with elegant solutions.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-primary" />
                    <span>Frontend Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-primary" />
                    <span>Backend Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-primary" />
                    <span>UI/UX Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-primary" />
                    <span>Database Design</span>
                  </div>
                </div>

                <Button
                  className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  onClick={() => scrollToSection("contact")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">My Skills</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "HTML & CSS", level: 90 },
                { name: "JavaScript", level: 85 },
                { name: "React", level: 80 },
                { name: "Next.js", level: 75 },
                { name: "Node.js", level: 70 },
                { name: "TypeScript", level: 75 },
                { name: "UI/UX Design", level: 65 },
                { name: "Database", level: 70 },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-muted/30 rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4">
                    <div className="text-lg font-medium mb-2">{skill.name}</div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-primary font-medium">{skill.level}%</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Frontend",
                  icon: <Code className="h-6 w-6 text-primary" />,
                  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "HTML/CSS"],
                },
                {
                  title: "Backend",
                  icon: <Layers className="h-6 w-6 text-primary" />,
                  skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL", "REST API"],
                },
                {
                  title: "Tools & Others",
                  icon: <Briefcase className="h-6 w-6 text-primary" />,
                  skills: ["Git", "GitHub", "VS Code", "Figma", "Jest", "CI/CD"],
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-muted/30 rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 scroll-mt-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce Platform",
                  description:
                    "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
                  tags: ["React", "Node.js", "MongoDB", "Stripe"],
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: "Task Management App",
                  description:
                    "A collaborative task management application with real-time updates and team collaboration features.",
                  tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: "Portfolio Website",
                  description:
                    "A responsive portfolio website with dark mode, animations, and contact form functionality.",
                  tags: ["React", "Framer Motion", "Styled Components"],
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: "Weather Dashboard",
                  description:
                    "A weather dashboard that displays current and forecasted weather data for multiple locations.",
                  tags: ["JavaScript", "Weather API", "Chart.js"],
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: "Recipe Finder",
                  description:
                    "A recipe finder application that allows users to search for recipes based on ingredients they have.",
                  tags: ["React", "Redux", "Food API"],
                  image: "/placeholder.svg?height=300&width=400",
                },
                {
                  title: "Social Media Dashboard",
                  description: "A dashboard that aggregates and displays social media metrics from multiple platforms.",
                  tags: ["Next.js", "GraphQL", "Social APIs"],
                  image: "/placeholder.svg?height=300&width=400",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-background rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="w-full">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">Let's Talk</h3>
                <p className="text-muted-foreground mb-8">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                  Feel free to reach out using the form or through my social media profiles.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <a href="mailto:hello@example.com" className="font-medium hover:text-primary transition-colors">
                        hello@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">GitHub</div>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        github.com/alex-dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">LinkedIn</div>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        linkedin.com/in/alex-dev
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-muted/30 rounded-xl p-6 border border-border"
              >
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full p-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full p-3 rounded-lg border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">Alex.dev</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Alex Developer. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
