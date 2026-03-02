import type { ReactNode } from 'react'
import styles from './PageLayout.module.css'

export interface PageLayoutProps {
  header?: ReactNode
  hero?: ReactNode
  main: ReactNode
  sidebar?: ReactNode
  lastUpdated?: ReactNode
  className?: string
}

export default function PageLayout({
  header,
  hero,
  main,
  sidebar,
  lastUpdated,
  className = '',
}: PageLayoutProps) {
  return (
    <div className={`${styles.page} ${className}`}>
      <div className="container-default">
        {header && (
          <div className={styles.headerRow}>
            <div className={styles.headerContent}>{header}</div>
            {lastUpdated && (
              <div className={styles.lastUpdated}>{lastUpdated}</div>
            )}
          </div>
        )}

        {hero && <div className={styles.hero}>{hero}</div>}

        <div className={styles.contentGrid}>
          <main className={styles.main}>{main}</main>
          {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
        </div>
      </div>
    </div>
  )
}
