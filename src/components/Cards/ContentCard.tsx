import Image from 'next/image'
import componentCardStyles from './ContentCard.module.css'
import { ContentCardProps } from '@/types/SelfStudy'

export default function ContentCard({
  title,
  description,
  category,
  createdBy,
  url,
  logoUrl,
  showBookmark = true,
}: ContentCardProps) {
  return (
    <a
      href={url}
      className={componentCardStyles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={componentCardStyles.inner}>
        <div className={componentCardStyles.header}>
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="logo"
              className={componentCardStyles.logo}
              width={40}
              height={40}
              unoptimized
            />
          )}
          {showBookmark && (
            <Image
              loading="lazy"
              src="/images/bookmark-light.svg"
              alt="Bookmark"
              width={24}
              height={24}
            />
          )}
        </div>
        <h3 className={componentCardStyles.title}>{title}</h3>
        <p className={componentCardStyles.description}>{description}</p>
        <div className={componentCardStyles.meta}>
          <div>
            <span className={componentCardStyles.metaLabel}>Category</span>
            <span className={componentCardStyles.metaValue}>{category}</span>
          </div>
          <div>
            <span className={componentCardStyles.metaLabel}>Created by</span>
            <span className={componentCardStyles.metaValue}>{createdBy}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
