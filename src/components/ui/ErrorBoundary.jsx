import React from 'react';
import { AlertCircle, RotateCcw, RefreshCw, HardHat } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    if (window.confirm("This will reset all your customized text, projects, and images back to defaults. Do you want to continue?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-150 p-6 md:p-8 text-center">
            {/* Header Icon */}
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <AlertCircle className="w-8 h-8" />
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Unexpected Application Error</h1>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Zeta Construction encountered a rendering error. This could be due to invalid/corrupted browser storage data or a temporary page failure.
            </p>

            {/* Error Message Details */}
            {this.state.error && (
              <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100 mb-6 overflow-auto max-h-32 text-xs font-mono text-red-700">
                <span className="font-bold text-gray-700 block mb-1">Error Reference:</span>
                {this.state.error.toString()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 border border-red-200 text-red-650 hover:bg-red-50 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Site Data
              </button>
            </div>

            {/* branding footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
              <HardHat className="w-3.5 h-3.5" />
              <span>Zeta Construction Pokhara</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
