/**
 * @fileoverview ErrorBoundary — catches React rendering errors gracefully.
 * @module components/Common/ErrorBoundary
 */
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; message: string; }

/** React error boundary — wraps async subtrees to prevent full-page crashes. */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="content-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <AlertTriangle size={40} color="var(--error)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Something went wrong</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{this.state.message}</p>
          <button className="button" onClick={() => this.setState({ hasError: false, message: '' })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
