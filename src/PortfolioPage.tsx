import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, X } from 'lucide-react'

const items = [
  { id: '01', title: 'Система хранения', category: 'Шкафы', type: 'Шкафы и гардеробные', image: 'photo-1595428774223-ef52624120d2', summary: 'Организация хранения с аккуратной геометрией фасадов.', details: ['Проверка комплектации и крепежа', 'Сборка корпуса и внутренних секций', 'Регулировка фасадов и зазоров'], tone: 'sand' },
  { id: '02', title: 'Кухня с характером', category: 'Кухни', type: 'Кухонный гарнитур', image: 'photo-1556911220-e15b29be8c8f', summary: 'Сложная композиция модулей и внимательная подгонка деталей.', details: ['Сборка модулей по инструкции', 'Установка фасадов и фурнитуры', 'Проверка выдвижных механизмов'], tone: 'olive' },
  { id: '03', title: 'Спокойная спальня', category: 'Спальни', type: 'Кровати и тумбы', image: 'photo-1616486338812-3dadae4b4ace', summary: 'Мебель для спальни, где важны устойчивость и точность.', details: ['Сборка каркаса и основания', 'Монтаж изголовья и тумб', 'Финальная проверка устойчивости'], tone: 'clay' },
  { id: '04', title: 'Домашний кабинет', category: 'Рабочее место', type: 'Стол и системы хранения', image: 'photo-1497366754035-f200968a6e72', summary: 'Функциональное рабочее место с продуманным размещением мебели.', details: ['Сборка стола и опор', 'Монтаж стеллажей и хранения', 'Проверка геометрии и соединений'], tone: 'slate' },
  { id: '05', title: 'Место для отдыха', category: 'Гостиная', type: 'Гостиная и мягкая мебель', image: 'photo-1600210492486-724fe5c67fb0', summary: 'Сочетание мебели и пространства без визуального шума.', details: ['Сборка отдельных предметов', 'Аккуратное размещение на месте', 'Проверка креплений и устойчивости'], tone: 'sand' },
  { id: '06', title: 'Модульная композиция', category: 'Шкафы', type: 'Модульное хранение', image: 'photo-1600607687939-ce8a6c25118c', summary: 'Модульная мебель, где каждый элемент должен точно совпасть.', details: ['Сборка модулей и полок', 'Выравнивание элементов', 'Контроль фасадных линий'], tone: 'olive' },
]
const filters = ['Все проекты', 'Шкафы', 'Кухни', 'Спальни', 'Рабочее место', 'Гостиная']
type PortfolioItem = typeof items[number]

export default function PortfolioPage() {
  const [filter, setFilter] = useState('Все проекты')
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
  const visibleItems = useMemo(() => filter === 'Все проекты' ? items : items.filter(item => item.category === filter), [filter])

  const handleTilt = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    event.currentTarget.style.setProperty('--tilt-x', ((0.5 - y) * 8).toFixed(2) + 'deg')
    event.currentTarget.style.setProperty('--tilt-y', ((x - 0.5) * 10).toFixed(2) + 'deg')
    event.currentTarget.style.setProperty('--spot-x', (x * 100).toFixed(1) + '%')
    event.currentTarget.style.setProperty('--spot-y', (y * 100).toFixed(1) + '%')
  }
  const resetTilt = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
    event.currentTarget.style.setProperty('--spot-x', '50%')
    event.currentTarget.style.setProperty('--spot-y', '50%')
  }

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown) }
  }, [selected])

  return <main className="portfolio-page">
    <header className="portfolio-page-header">
      <a className="brand" href="/" aria-label="Pulikov — главная"><span className="brand-mark">P<span>.</span></span><span className="brand-word">PULIKOV<small>СБОРКА МЕБЕЛИ</small></span></a>
      <div className="portfolio-page-nav"><span><i className="live-dot" /> МОСКВА И ОБЛАСТЬ</span><a href="/#contact">Обсудить задачу <ArrowUpRight size={16} /></a></div>
    </header>
    <section className="portfolio-page-hero">
      <div className="portfolio-page-kicker"><span>DP / ARCHIVE</span><span>ПОРТФОЛИО · 2026</span><span>01—06</span></div>
      <div className="portfolio-page-title-wrap">
        <p className="portfolio-page-overline"><span /> МЕБЕЛЬ · ФОРМА · ТОЧНОСТЬ</p>
        <h1>Собрано<br /><em>с вниманием.</em></h1>
        <p className="portfolio-page-intro">Каждая деталь имеет значение. Здесь собраны визуальные концепции, показывающие типы мебели и характер работы. Реальные объекты будут добавлены отдельно — без выдуманных кейсов.</p>
      </div>
      <div className="portfolio-page-hero-art" aria-hidden="true"><div className="portfolio-art-ring portfolio-art-ring-one" /><div className="portfolio-art-ring portfolio-art-ring-two" /><div className="portfolio-art-label">P / 001<br /><span>OBJECT STUDY</span></div><div className="portfolio-art-cross">＋</div><div className="portfolio-art-index">01<br />06</div></div>
      <div className="portfolio-page-stats"><div><strong>06</strong><span>ВИЗУАЛЬНЫХ КОНЦЕПЦИЙ</span></div><div><strong>3D</strong><span>ИНТЕРАКТИВНЫЕ КАРТОЧКИ</span></div><div><strong>100%</strong><span>ВНИМАНИЕ К ДЕТАЛЯМ</span></div><a href="#portfolio-gallery">Смотреть проекты <ArrowDownRight size={17} /></a></div>
    </section>
    <section className="portfolio-gallery" id="portfolio-gallery">
      <div className="portfolio-gallery-heading"><div><p className="portfolio-page-overline"><span /> ИЗБРАННЫЕ НАПРАВЛЕНИЯ</p><h2>Предметно.<br /><em>Без лишнего.</em></h2></div><p>Наведите курсор на карточку, чтобы почувствовать объём. Откройте проект — внутри краткая структура работ.</p></div>
      <div className="portfolio-page-filters" role="group" aria-label="Фильтр проектов">{filters.map(item => <button key={item} className={filter === item ? 'portfolio-page-filter active' : 'portfolio-page-filter'} onClick={() => setFilter(item)}>{item}<span>{item === 'Все проекты' ? String(items.length).padStart(2, '0') : String(items.filter(project => project.category === item).length).padStart(2, '0')}</span></button>)}</div>
      <div className="portfolio-3d-grid">
        {visibleItems.map((item, index) => <article key={item.id} className={'portfolio-3d-card tone-' + item.tone} style={{ animationDelay: (index * 70) + 'ms' }} onMouseMove={handleTilt} onMouseLeave={resetTilt} onClick={() => setSelected(item)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(item) } }} role="button" tabIndex={0} aria-label={'Открыть проект: ' + item.title}>
          <div className="portfolio-3d-visual"><img src={'https://images.unsplash.com/' + item.image + '?auto=format&fit=crop&w=1200&q=88'} alt="" loading="lazy" /><div className="portfolio-3d-vignette" /><span className="portfolio-3d-index">{item.id} / 06</span><span className="portfolio-3d-badge">ВИЗУАЛЬНЫЙ ПРИМЕР</span><span className="portfolio-3d-open"><ArrowUpRight size={20} /></span><span className="portfolio-3d-watermark">P.</span><span className="portfolio-3d-coordinates">55°45' N<br />37°37' E</span></div>
          <div className="portfolio-3d-info"><div><span className="portfolio-3d-category">{item.type}</span><h3>{item.title}</h3><p>{item.summary}</p></div><span className="portfolio-3d-number">{item.id}</span></div>
          <div className="portfolio-3d-bottom"><span>ОТКРЫТЬ ПРОЕКТ</span><span>↗</span></div>
        </article>)}
      </div>
      <div className="portfolio-page-note"><span className="portfolio-note-mark">i</span><p><strong>О прозрачности портфолио.</strong> Сейчас здесь используются демонстрационные интерьерные фотографии. Они не являются подтверждением выполненных заказов Дмитрия. После съёмки реальные объекты заменят эти концепции.</p></div>
    </section>
    <section className="portfolio-page-cta"><div><p className="portfolio-page-overline"><span /> ЕСТЬ КОНКРЕТНАЯ ЗАДАЧА?</p><h2>Давайте соберём<br /><em>это правильно.</em></h2></div><a href="/#contact">Обсудить мебель <ArrowRight size={18} /></a><span className="portfolio-cta-mark">DP.</span></section>
    <footer className="portfolio-page-footer"><a className="brand" href="/"><span className="brand-mark">P<span>.</span></span><span className="brand-word">PULIKOV<small>СБОРКА МЕБЕЛИ</small></span></a><span>© {new Date().getFullYear()} ДМИТРИЙ ПУЛИКОВ</span><a href="/">НА ГЛАВНУЮ ↑</a></footer>
    {selected && <div className="portfolio-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null) }}><section className="portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title"><button className="portfolio-modal-close" onClick={() => setSelected(null)} aria-label="Закрыть проект"><X size={21} /></button><div className="portfolio-modal-image"><img src={'https://images.unsplash.com/' + selected.image + '?auto=format&fit=crop&w=1400&q=90'} alt={selected.title} /><span>ВИЗУАЛЬНАЯ КОНЦЕПЦИЯ · НЕ ФОТО ОТЧЁТА</span></div><div className="portfolio-modal-copy"><p className="portfolio-page-overline"><span /> {selected.id} / {selected.type}</p><h2 id="portfolio-modal-title">{selected.title}</h2><p>{selected.summary}</p><h3>Структура работ</h3><ul>{selected.details.map(detail => <li key={detail}><Check size={16} />{detail}</li>)}</ul><a href="/#contact" className="portfolio-modal-cta">Обсудить похожую задачу <ArrowRight size={17} /></a></div></section></div>}
  </main>
}
