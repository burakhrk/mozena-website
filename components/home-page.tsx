"use client"

import { Button } from "@/components/ui/button"
import { Code, Database, Gamepad2, Laptop, Linkedin, Smartphone, Zap } from "lucide-react"
import Image from "next/image"
import { motion, useAnimation, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { ContactForm } from "@/components/contact-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { projectImages, defaultPlaceholder } from "@/lib/image-references"

// Floating particle component
const FloatingParticle = ({ size, color, delay, duration, xRange, yRange, isMobile }) => {
  const adjustedSize = isMobile ? size * 0.6 : size
  const adjustedXRange = isMobile ? xRange.map((v) => v * 0.5) : xRange
  const adjustedYRange = isMobile ? yRange.map((v) => v * 0.5) : yRange

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: adjustedSize,
        height: adjustedSize,
        backgroundColor: color,
        filter: "blur(8px)",
        opacity: 0.6,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1, 0.8, 1] }}
      transition={{ duration: 2, delay }}
      animate={{
        x: adjustedXRange,
        y: adjustedYRange,
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        duration,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

// Animated background gradient
const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0 opacity-30 z-0"
      style={{
        background: "linear-gradient(45deg, rgba(76, 0, 255, 0.5) 0%, rgba(0, 153, 255, 0.5) 100%)",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        duration: 15,
        ease: "linear",
      }}
    />
  )
}

export default function HomePage({ dictionary, lang }: { dictionary: any; lang: string }) {
  const isMobile = useMobile()
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Generate random particles
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 60 + 20
      const delay = Math.random() * 2
      const duration = Math.random() * 10 + 10
      const xRange = [Math.random() * 100 - 50, Math.random() * 100 - 50]
      const yRange = [Math.random() * 100 - 50, Math.random() * 100 - 50]
      const colors = ["rgba(147, 51, 234, 0.7)", "rgba(59, 130, 246, 0.7)", "rgba(99, 102, 241, 0.7)"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      return (
        <FloatingParticle
          key={i}
          size={size}
          color={color}
          delay={delay}
          duration={duration}
          xRange={xRange}
          yRange={yRange}
          isMobile={isMobile}
        />
      )
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <Zap className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-xl font-bold">Mozena</span>
          </motion.div>
          <motion.nav
            className="hidden md:flex items-center gap-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {dictionary.header.services}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {dictionary.header.projects}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {dictionary.header.contact}
            </button>
          </motion.nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLang={lang} />
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Button onClick={() => scrollToSection("contact")}>{dictionary.header.contactUs}</Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white relative overflow-hidden"
        >
          {/* Animated background elements */}
          <AnimatedGradient />

          <div className="absolute inset-0 overflow-hidden">
            {generateParticles(isMobile ? 10 : 20)}

            {/* Animated lines */}
            {!isMobile &&
              Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="absolute h-px bg-white/20"
                  style={{
                    width: `${Math.random() * 300 + 100}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    rotate: `${Math.random() * 360}deg`,
                  }}
                  animate={{
                    width: [0, `${Math.random() * 300 + 100}px`],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: Math.random() * 5 + 5,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    textShadow: "0 0 15px rgba(255,255,255,0.3)",
                  }}
                >
                  {dictionary.hero.title}
                </motion.h1>
                <motion.p
                  className="mx-auto max-w-[700px] text-gray-200 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {dictionary.hero.subtitle}
                </motion.p>
              </div>
              <motion.div
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="bg-white text-blue-900 hover:bg-gray-200"
                >
                  {dictionary.header.contactUs}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating tech symbols */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute text-white/20 text-6xl font-bold"
                style={{ top: "20%", left: "10%" }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 8,
                }}
              >
                {"</>"}
              </motion.div>
              <motion.div
                className="absolute text-white/20 text-6xl font-bold"
                style={{ bottom: "15%", right: "10%" }}
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 10,
                  delay: 1,
                }}
              >
                {"{}"}
              </motion.div>
            </>
          )}
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-purple-500/5"
              style={{ top: "-10%", left: "-10%" }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 15,
              }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-blue-500/5"
              style={{ bottom: "-10%", right: "-10%" }}
              animate={{
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 15,
              }}
            />
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dictionary.services.title}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dictionary.services.subtitle}
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <AnimatedServiceCard
                icon={<Laptop className="h-10 w-10 text-primary" />}
                title={dictionary.services.iot.title}
                description={dictionary.services.iot.description}
                delay={0}
                isMobile={isMobile}
              />
              <AnimatedServiceCard
                icon={<Database className="h-10 w-10 text-primary" />}
                title={dictionary.services.erp.title}
                description={dictionary.services.erp.description}
                delay={0.2}
                isMobile={isMobile}
              />
              <AnimatedServiceCard
                icon={<Gamepad2 className="h-10 w-10 text-primary" />}
                title={dictionary.services.game.title}
                description={dictionary.services.game.description}
                delay={0.4}
                isMobile={isMobile}
              />
              <AnimatedServiceCard
                icon={<Smartphone className="h-10 w-10 text-primary" />}
                title={dictionary.services.mobile.title}
                description={dictionary.services.mobile.description}
                delay={0.6}
                isMobile={isMobile}
              />
              <AnimatedServiceCard
                icon={<Code className="h-10 w-10 text-primary" />}
                title={dictionary.services.custom.title}
                description={dictionary.services.custom.description}
                delay={0.8}
                isMobile={isMobile}
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`grid-h-${i}`}
                  className="absolute h-px bg-primary w-full"
                  style={{ top: `${i * 10}%` }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleY: [1, 1.5, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5 + i,
                    delay: i * 0.2,
                  }}
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`grid-v-${i}`}
                  className="absolute w-px bg-primary h-full"
                  style={{ left: `${i * 10}%` }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleX: [1, 1.5, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5 + i,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dictionary.projects.title}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dictionary.projects.subtitle}
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <AnimatedProjectCard
                image={projectImages.smartHomeImage}
                title={dictionary.projects.smartHome.title}
                description={dictionary.projects.smartHome.description}
                tags={["IoT", "Mobile App"]}
                delay={0}
                isMobile={isMobile}
              />
              <AnimatedProjectCard
                image={projectImages.erpImage}
                title={dictionary.projects.erp.title}
                description={dictionary.projects.erp.description}
                tags={["ERP", "Web App"]}
                delay={0.2}
                isMobile={isMobile}
              />
              <AnimatedProjectCard
                image={projectImages.adventureGameImage}
                title={dictionary.projects.adventure.title}
                description={dictionary.projects.adventure.description}
                tags={["Game", "Mobile"]}
                delay={0.4}
                isMobile={isMobile}
              />
              <AnimatedProjectCard
                image={projectImages.healthcareImage}
                title={dictionary.projects.healthcare.title}
                description={dictionary.projects.healthcare.description}
                tags={["Custom Software", "Web App"]}
                delay={0.6}
                isMobile={isMobile}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-full h-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 20,
              }}
            />

            {!isMobile && (
              <>
                <motion.div
                  className="absolute w-64 h-64 rounded-full bg-purple-500/5"
                  style={{ top: "20%", left: "5%" }}
                  animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 15,
                  }}
                />
                <motion.div
                  className="absolute w-48 h-48 rounded-full bg-blue-500/5"
                  style={{ bottom: "10%", right: "10%" }}
                  animate={{
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 18,
                  }}
                />
              </>
            )}
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{dictionary.contact.title}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {dictionary.contact.subtitle}
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{dictionary.contact.companyName}</h3>
                  <p className="text-gray-500">{dictionary.contact.companyDescription}</p>
                </div>
                <div className="flex items-center">
                  <motion.a
                    href="https://www.linkedin.com/company/mozenasoftware/"
                    className="text-gray-500 hover:text-primary"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <ContactForm dictionary={dictionary} />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
            }}
          />
        </div>

        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row relative">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <Zap className="h-6 w-6 text-primary" />
            </motion.div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Mozena. {dictionary.footer.rights}
            </p>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {dictionary.header.services}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {dictionary.header.projects}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {dictionary.header.contact}
            </button>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function AnimatedServiceCard({ icon, title, description, delay = 0, isMobile }) {
  const controls = useAnimation()

  return (
    <motion.div
      className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: isMobile ? delay * 0.5 : delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </motion.div>
  )
}

function AnimatedProjectCard({ image, title, description, tags, delay = 0, isMobile }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: isMobile ? delay * 0.5 : delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : [1, 1.02, 1],
            rotate: isHovered ? 0 : [-0.5, 0.5, -0.5],
          }}
          transition={{
            repeat: isHovered ? 0 : Number.POSITIVE_INFINITY,
            duration: isHovered ? 0.3 : 8,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          <Image
            src={image || defaultPlaceholder}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={delay === 0}
          />

          {/* Animated overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
