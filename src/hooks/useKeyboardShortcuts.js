import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Ctrl/Cmd + K - Search (future feature)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toast.info('Search feature coming soon!');
      }

      // Ctrl/Cmd + H - Go Home/Dashboard
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        navigate('/dashboard');
        toast.success('Navigated to Dashboard');
      }

      // Ctrl/Cmd + P - Go to Profile
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        navigate('/profile');
        toast.success('Navigated to Profile');
      }

      // Ctrl/Cmd + R - Go to Recommendations
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        navigate('/recommendations');
        toast.success('Navigated to Recommendations');
      }

      // Ctrl/Cmd + C - Go to Counsellors
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        navigate('/counsellor-profile');
        toast.success('Navigated to Counsellors');
      }

      // Ctrl/Cmd + S - Save (context-aware, future feature)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        toast.info('Save functionality context-aware');
      }

      // Escape - Close modals (handled by modal components)
      if (e.key === 'Escape') {
        // Modal close logic would go here
      }

      // ? - Show keyboard shortcuts help
      if (e.key === '?' && !e.shiftKey) {
        // Could open a help modal
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, toast]);
};

export default useKeyboardShortcuts;
