import { GradientText } from './GradientText'

interface FooterProps {
  authorName?: string
  authorEmail?: string
  year?: number
}

export function Footer({
  authorName = 'Your Name',
  authorEmail = 'your.email@example.com',
  year = new Date().getFullYear()
}: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-bold">
              <GradientText>React Template</GradientText>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with React, TypeScript, Tailwind CSS, and modern web technologies.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Contact</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>{authorName}</p>
              <a
                href={`mailto:${authorEmail}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {authorEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {year} {authorName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
