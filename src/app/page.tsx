import { Suspense } from 'react';
import QRGenerator from '@/components/QRGenerator';

/**
 * Home Page Component
 * Main landing page featuring the QR Code Generator
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            QR Code Tool
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            テキストやURLを入力して、簡単にQRコードを生成できます。
            生成されたQRコードは高品質なPNG形式でダウンロードできます。
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">読み込み中...</span>
              </div>
            }
          >
            <QRGenerator className="mb-8" />
          </Suspense>
        </div>

        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">高速生成</h3>
            <p className="text-sm text-gray-600">
              最適化されたアルゴリズムで瞬時にQRコードを生成
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0
11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">高品質</h3>
            <p className="text-sm text-gray-600">
              エラー訂正レベルMで読み取り精度を保証
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2
 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              簡単ダウンロード
            </h3>
            <p className="text-sm text-gray-600">
              ワンクリックでPNG形式のQRコードをダウンロード
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-500 border-t border-gray-200 pt-8">
          <p className="text-sm">
            Built with{' '}
            <span className="font-medium text-gray-700">Next.js 15</span>
            {' • '}
            <span className="font-medium text-gray-700">TypeScript</span>
            {' • '}
            <span className="font-medium text-gray-700">Tailwind CSS</span>
          </p>
          <p className="text-xs mt-2">Enterprise-grade QR Code Generator</p>
        </footer>
      </div>
    </main>
  );
}
