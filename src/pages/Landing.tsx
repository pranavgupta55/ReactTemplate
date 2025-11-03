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
      <DarkVeil className="relative min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2} className="text-center">
            <h1 className="mb-6 text-5xl font-bold sm:text-6xl md:text-7xl">
              Build Amazing Apps with{' '}
              <GradientText>React Template</GradientText>
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400 sm:text-2xl">
              A modern, feature-rich starter template for your next project
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlareHover>
                <a
                  href="/login"
                  className="rounded-lg bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Get Started
                </a>
              </GlareHover>
              <GlareHover>
                <a
                  href="/contact"
                  className="rounded-lg border border-gray-300 px-8 py-3 font-semibold transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Learn More
                </a>
              </GlareHover>
            </div>
          </FadeIn>
        </div>
      </DarkVeil>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-12 text-center text-4xl font-bold">
              <GradientText>Features</GradientText>
            </h2>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <FadeIn key={feature.title} delay={idx * 0.1}>
                <GlareHover className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </GlareHover>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-12 text-center text-4xl font-bold">
              <GradientText>Built With</GradientText>
            </h2>
          </FadeIn>
          <InfiniteScroll speed="normal" className="py-8">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="flex h-24 w-48 items-center justify-center rounded-lg border border-gray-200 bg-white px-6 shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="text-xl font-semibold">{tech}</span>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-6 text-4xl font-bold">
              Ready to <GradientText>Get Started?</GradientText>
            </h2>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
              Start building your next amazing project today
            </p>
            <GlareHover className="inline-block">
              <a
                href="/login"
                className="rounded-lg bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Sign Up Now
              </a>
            </GlareHover>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
