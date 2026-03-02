import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

export interface PageHeaderProps {
  title: string
  subtitle?: ReactNode
  lastUpdated?: ReactNode
  className?: string
}

export default function PageHeader({
  title,
  subtitle,
  lastUpdated,
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`${styles.header} ${className}`}>
      <h1 className={styles.title}>{title}</h1>
      {lastUpdated && <div className={styles.lastUpdated}>{lastUpdated}</div>}
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  )
}
