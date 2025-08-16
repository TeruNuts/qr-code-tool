'use client';

import { useState, useCallback } from 'react';
import QRCode from 'qrcode';

// TypeScript interface with proper JSDoc
interface QRGeneratorProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * QR Code Generator Component
 * Generates QR codes from text input with error handling and loading states
 */
export default function QRGenerator({ className = '' }: QRGeneratorProps) {
  const [text, setText] = useState<string>('');
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Memoized QR generation function for performance
  const generateQR = useCallback(async (): Promise<void> => {
    if (!text.trim()) {
      setError('テキストを入力してください');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Optimized QR generation with better options
      const url = await QRCode.toDataURL(text, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
        type: 'image/png',
      });

      setQrDataURL(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('QRコードの生成に失敗しました');
      console.error('QR generation error:', errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, [text]);

  // Clear function with useCallback for performance
  const clearQR = useCallback((): void => {
    setText('');
    setQrDataURL('');
    setError('');
  }, []);

  // Download generated QR code
  const downloadQR = useCallback((): void => {
    if (!qrDataURL) {
      return;
    }

    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = qrDataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrDataURL]);

  return (
    <div
      className={`max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">QRコード生成</h2>
        <p className="text-sm text-gray-600">
          テキストやURLを入力してQRコードを生成
        </p>
      </div>

      <div className="space-y-4">
        {/* Input Section */}
        <div>
          <label
            htmlFor="qr-text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            テキストまたはURL
          </label>
          <input
            id="qr-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isGenerating && text.trim()) {
                generateQR();
              }
            }}
            placeholder="QRコードにしたいテキストを入力..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={isGenerating}
            maxLength={2000}
          />
          <div className="mt-1 text-xs text-gray-500">
            {text.length}/2000文字
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div
            className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={generateQR}
            disabled={isGenerating || !text.trim()}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none
focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
transition-colors font-medium"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0
12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                生成中...
              </span>
            ) : (
              'QRコード生成'
            )}
          </button>

          <button
            onClick={clearQR}
            className="px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50
focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            クリア
          </button>
        </div>

        {/* QR Code Display */}
        {qrDataURL && (
          <div className="mt-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <img
                src={qrDataURL}
                alt={`QRコード: ${text}`}
                className="mx-auto max-w-full h-auto rounded-lg shadow-sm"
                loading="lazy"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">生成されたQRコード</p>
                <button
                  onClick={downloadQR}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50
border border-blue-200 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500
focus:ring-offset-2 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3
3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  ダウンロード
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
