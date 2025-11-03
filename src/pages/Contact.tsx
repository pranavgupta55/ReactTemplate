import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { FadeIn } from '../components/FadeIn'
import { GradientText } from '../components/GradientText'
import { GlareHover } from '../components/GlareHover'
import { BlobCursor } from '../components/BlobCursor'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BlobCursor />
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="mb-4 text-center text-5xl font-bold">
            <GradientText>Get In Touch</GradientText>
          </h1>
          <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-400">
            Have a question or want to work together? Drop us a message!
          </p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <GlareHover>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Send Message
                  </button>
                </GlareHover>

                {submitted && (
                  <div className="rounded-lg bg-green-50 p-4 text-center text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Thank you! Your message has been sent.
                  </div>
                )}
              </form>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.4}>
            <div className="space-y-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 text-4xl">📧</div>
                <h3 className="mb-2 text-xl font-semibold">Email</h3>
                <a
                  href="mailto:your.email@example.com"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  your.email@example.com
                </a>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 text-4xl">🌐</div>
                <h3 className="mb-2 text-xl font-semibold">Social Media</h3>
                <div className="space-y-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 text-4xl">⏰</div>
                <h3 className="mb-2 text-xl font-semibold">Response Time</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </div>
  )
}
