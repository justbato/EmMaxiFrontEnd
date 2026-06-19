import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md'
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const iconSize = size === 'sm' ? 14 : 18

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={size === 'sm' ? { width: 32, height: 32 } : undefined}
    >
      {theme === 'dark' ? (
        <Sun size={iconSize} strokeWidth={2.2} />
      ) : (
        <Moon size={iconSize} strokeWidth={2.2} />
      )}
    </button>
  )
}
