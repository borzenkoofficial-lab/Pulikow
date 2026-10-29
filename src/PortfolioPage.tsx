import { useMemo, useState, type MouseEvent } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check } from 'lucide-react'

const items = [
  { id: '01', title: 'Система хранения', category: 'Шкафы', type: 'Шкафы и гардеробные', image: 'photo-1595428774223-ef52624120d2', summary: 'Организация хранения с аккуратной геометрией фасадов.', details: ['Проверка комплектации и крепежа', 'Сборка корпуса и внутренних секций', 'Регулировка фасадов и зазоров'], tone: 'sand' },
  { id: '02', title: 'Кухня с характером', category: 'Кухни', type: 'Кухонный гарнитур', image: 'photo-1556911220-e15b29be8c8f', summary: 'Сложная композиция модулей и внимательная подгонка деталей.', details: ['Сборка модулей по инструкции', 'Установка фасадов и фурнитуры', 'Проверка выдвижных механизмов'], tone: 'olive' },
  { id: '03', title: 'Спокойная спальня', category: 'Спальни', type: 'Кровати и тумбы', image: 'photo-1616486338812-3dadae4b4ace', summary: 'Мебель для спальни, где важны устойчивость и точность.', details: ['Сборка каркаса и основания', 'Монтаж изголовья и тумб', 'Финальная проверка устойчивости'], tone: 'clay' },
  { id: '04', title: 'Домашний кабинет', category: 'Рабочее место', type: 'Стол и системы хранения', image: 'photo-1497366754035-f200968a6e72', summary: 'Функциональное рабочее место с продуманным размещением мебели.', details: ['Сборка стола и опор', 'Монтаж стеллажей и хранения', 'Проверка геометрии и соединений'], tone: 'slate' },
  { id: '05', title: 'Место для отдыха', category: 'Гостиная', type: 'Гостиная и мягкая мебель', image: 'photo-1600210492486-724fe5c67fb0', summary: 'Сочетание мебели и пространства без визуального шума.', details: ['Сборка отдельных предметов', 'Аккуратное размещение на месте', 'Проверка креплений и устойчивости'], tone: 'sand' },
  { id: '06', title: 'Модульная композиция', category: 'Шкафы', type: 'Модульное хранение', image: 'photo-1600607687939-ce8a6c25118c', summary: 'Модульная мебель, где каждый элемент должен точно совпасть.', details: ['Сборка модулей и полок', 'Выравнивание элементов', 'Контроль фасадных линий'], tone: 'olive' },
]
const filters = ['Все направления', 'Шкафы', 'Кухни', 'Спальни', 'Рабочее место', 'Гостиная']

export default function PortfolioPage() {
  const [filter, setFilter] = useState('Все направления')
  const visibleItems = useMemo(() => filter === 'Все направления' ? items : items.filter(item => item.category === filter), [filter])

  const handleTilt = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 700) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    event.currentTarget.style.setProperty('--tilt-x', ((0.5 - y) * 2.5).toFixed(2) + 'deg')
    event.currentTarget.style.setProperty('--tilt-y', ((x - 0.5) * 3.5).toFixed(2) + 'deg')
    event.currentTarget.style.setProperty('--spot-x', (x * 100).toFixed(1) + '%')
    event.currentTarget.style.setProperty('--spot-y', (y * 100).toFixed(1) + '%')
  }
  const resetTilt = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
    event.currentTarget.style.setProperty('--spot-x', '50%')
    event.currentTarget.style.setProperty('--spot-y', '50%')
  }

  return <main className="portfolio-page portfolio-feed-page">
    <header className="portfolio-page-header">
      <a className="brand" href="/" aria-label="Pulikov — главная"><span className="brand-mark">P<span>.</span></span><span className="brand-word">PULIKOV<small>СБОРКА МЕБЕЛИ</small></span></a>
      <div className="portfolio-page-nav"><span><i className="live-dot" /> МОСКВА И ОБЛАСТЬ</span><a href="/#contact">Обсудить задачу <ArrowUpRight size={16} /></a></div>
    </header>
    <section className="portfolio-page-hero">
      <div className="portfolio-page-kicker"><span>DP / ARCHIVE</span><span>ПОРТФОЛИО · 2026</span><span>01—06</span></div>
      <div className="portfolio-page-title-wrap">
        <p className="portfolio-page-overline"><span /> МЕБЕЛЬ · ФОРМА · ТОЧНОСТЬ</p>
        <h1>Собрано<br /><em>с вниманием.</em></h1>
        <p className="portfolio-page-intro">Лента мебельных направлений: что собираем, на что обращаем внимание и какие этапы входят в работу. Вся информация сразу на странице — без всплывающих окон и лишних переходов.</p>
      </div>
      <div className="portfolio-page-hero-art portfolio-folder-scene" aria-label="Папка с примерами мебельных работ — наведите курсор">
        <div className="folder-orbit folder-orbit-a" /><div className="folder-orbit folder-orbit-b" />
        <div className="folder-file folder-file-back"><span>DP / ARCHIVE</span><i>01—06</i><div className="folder-file-lines"><b /><b /><b /></div></div>
        <div className="folder-file folder-file-photo folder-file-photo-a"><img src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=380&q=80" alt="" /></div>
        <div className="folder-file folder-file-photo folder-file-photo-b"><img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=380&q=80" alt="" /></div>
        <div className="portfolio-folder"><div className="portfolio-folder-tab" /><div className="portfolio-folder-face"><span className="folder-brand">P<span>.</span></span><span className="folder-title">ПАПКА<br />РАБОТ</span><span className="folder-caption">МЕБЕЛЬ · СБОРКА · ДЕТАЛИ</span><span className="folder-index">PORTFOLIO — 2026</span><span className="folder-emboss">DP</span></div></div>
        <div className="folder-hover-hint"><span>НАВЕДИТЕ</span><span className="folder-hint-line" /><span>ОТКРОЙТЕ АРХИВ</span></div>
      </div>
      <div className="portfolio-page-stats"><div><strong>06</strong><span>НАПРАВЛЕНИЙ В ЛЕНТЕ</span></div><div><strong>3D</strong><span>МЯГКАЯ ГЛУБИНА И ДВИЖЕНИЕ</span></div><div><strong>01</strong><span>СТРАНИЦА БЕЗ ЛИШНИХ ШАГОВ</span></div><a href="#portfolio-gallery">Перейти к ленте <ArrowDownRight size={17} /></a></div>
    </section>
    <section className="portfolio-gallery portfolio-feed-gallery" id="portfolio-gallery">
      <div className="portfolio-gallery-heading"><div><p className="portfolio-page-overline"><span /> НАПРАВЛЕНИЯ РАБОТ</p><h2>По порядку.<br /><em>Всё на виду.</em></h2></div><p>Каждый блок — как отдельная полоса в редакционной ленте: изображение, описание и список работ раскрыты сразу.</p></div>
      <div className="portfolio-page-filters" role="group" aria-label="Фильтр направлений">{filters.map(item => <button key={item} className={filter === item ? 'portfolio-page-filter active' : 'portfolio-page-filter'} onClick={() => setFilter(item)}>{item}<span>{item === 'Все направления' ? String(items.length).padStart(2, '0') : String(items.filter(project => project.category === item).length).padStart(2, '0')}</span></button>)}</div>
      <div className="portfolio-feed-list">
        {visibleItems.map((item, index) => <article key={item.id} className={'portfolio-feed-item tone-' + item.tone + (index % 2 ? ' feed-reverse' : '')} onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{ animationDelay: (index * 80) + 'ms' }}>
          <div className="portfolio-feed-image"><img src={'https://images.unsplash.com/' + item.image + '?auto=format&fit=crop&w=1400&q=88'} alt={'Пример интерьера: ' + item.title} loading="lazy" /><span className="portfolio-feed-index">{item.id} <i>/ 06</i></span><span className="portfolio-feed-image-label">ВИЗУАЛЬНЫЙ ПРИМЕР</span><span className="portfolio-feed-watermark">P.</span></div>
          <div className="portfolio-feed-content"><div className="portfolio-feed-meta"><span>{item.type}</span><span>НАПРАВЛЕНИЕ {item.id}</span></div><h3>{item.title}</h3><p className="portfolio-feed-summary">{item.summary}</p><div className="portfolio-feed-rule" /><p className="portfolio-feed-list-label">ЧТО ВХОДИТ В РАБОТУ</p><ul>{item.details.map(detail => <li key={detail}><Check size={15} />{detail}</li>)}</ul><a href="/#contact" className="portfolio-feed-contact">Обсудить похожую задачу <ArrowRight size={16} /></a><span className="portfolio-feed-big-number">{item.id}</span></div>
        </article>)}
      </div>
      <div className="portfolio-page-note"><span className="portfolio-note-mark">i</span><p><strong>Важно:</strong> фотографии здесь демонстрационные и показывают типы мебели, а не подтверждённые заказы Дмитрия. По мере появления собственных фото реальные объекты будут размещены в этой ленте с описанием выполненных работ.</p></div>
    </section>
    <section className="portfolio-page-cta"><div><p className="portfolio-page-overline"><span /> ЕСТЬ КОНКРЕТНАЯ ЗАДАЧА?</p><h2>Давайте соберём<br /><em>это правильно.</em></h2></div><a href="/#contact">Обсудить мебель <ArrowRight size={18} /></a><span className="portfolio-cta-mark">DP.</span></section>
    <footer className="portfolio-page-footer"><a className="brand" href="/"><span className="brand-mark">P<span>.</span></span><span className="brand-word">PULIKOV<small>СБОРКА МЕБЕЛИ</small></span></a><span>© {new Date().getFullYear()} ДМИТРИЙ ПУЛИКОВ</span><a href="/">НА ГЛАВНУЮ ↑</a></footer>
  </main>
}
