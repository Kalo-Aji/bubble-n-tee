import business from '../../data/business.js'

export default function AnnouncementBar() {
  return (
    <div className="announcement">
      <span className="announcement__spark" aria-hidden="true">✦</span>
      <p>{business.announcement}</p>
    </div>
  )
}