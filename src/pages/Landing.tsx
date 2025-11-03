import { BlobCursor } from '../components/BlobCursor'
import { CubesBackground } from '../components/CubesBackground'
import { DarkVeil } from '../components/DarkVeil'
import { FadeIn } from '../components/FadeIn'
import { GradientText } from '../components/GradientText'
import { GlareHover } from '../components/GlareHover'
import { InfiniteScroll } from '../components/InfiniteScroll'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function Landing() {
  const features = [
    { icon: '⚡', title: 'Fast', description: 'Built with Vite for lightning-fast development' },
    { icon: '🎨', title: 'Beautiful', description: 'Tailwind CSS for stunning designs' },
    { icon: '🔒', title: 'Secure', description: 'Supabase authentication out of the box' },
    { icon: '🚀', title: 'Modern', description: 'React 18 with TypeScript support' },
  ]

  const technologies = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Supabase', 'OpenAI', 'Pinecone', 'LangChain']

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BlobCursor />
      <CubesBackground />
      <Navbar />

      {/* Hero Section */}
      <DarkVeil className="relative min-h-screen pt-16">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2} className="text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Build Amazing Apps with{' '}
              <br className="hidden sm:block" />
              <GradientText>React Template</GradientText>
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl md:text-2xl">
              A modern, feature-rich starter template powered by React, TypeScript,
              Tailwind CSS, and cutting-edge APIs
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <GlareHover>
                <a
                  href="/login"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 px-10 py-4 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-primary-500/50"
                >
                  Get Started
                </a>
              </GlareHover>
              <GlareHover>
                <a
                  href="/contact"
                  className="group rounded-xl border-2 border-gray-300 bg-white/10 px-10 py-4 text-lg font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:border-primary-500 dark:border-gray-700 dark:bg-gray-900/50"
                >
                  Learn More
                </a>
              </GlareHover>
            </div>
          </FadeIn>
        </div>
      </DarkVeil>

      {/* Features Section */}
      <section className="bg-white py-24 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-4 text-center text-5xl font-bold">
              <GradientText>Features</GradientText>
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
              Everything you need to build modern web applications
            </p>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <FadeIn key={feature.title} delay={idx * 0.1}>
                <GlareHover className="group h-full cursor-pointer rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:scale-105 hover:border-primary-300 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-700">
                  <div className="mb-6 text-5xl transition-transform group-hover:scale-110">{feature.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </GlareHover>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 py-24 dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-4 text-center text-5xl font-bold">
              <GradientText>Built With</GradientText>
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
              Powered by the latest and greatest technologies
            </p>
          </FadeIn>
          <InfiniteScroll speed="normal" className="py-8">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="group flex h-28 w-56 cursor-pointer items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-8 shadow-lg transition-all hover:scale-110 hover:border-primary-400 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-600"
              >
                <span className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {tech}
                </span>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white py-32 dark:bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-6 text-5xl font-bold md:text-6xl">
              Ready to <GradientText>Get Started?</GradientText>
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-600 dark:text-gray-400 md:text-2xl">
              Join thousands of developers building amazing projects with our template
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <GlareHover className="inline-block">
                <a
                  href="/login"
                  className="rounded-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 px-12 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-primary-500/50"
                >
                  Sign Up Now
                </a>
              </GlareHover>
              <GlareHover className="inline-block">
                <a
                  href="https://github.com/pranavgupta55/ReactTemplate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-gray-300 bg-white/50 px-12 py-5 text-lg font-bold backdrop-blur-sm transition-all hover:scale-105 hover:border-primary-500 dark:border-gray-700 dark:bg-gray-900/50"
                >
                  View on GitHub
                </a>
              </GlareHover>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
