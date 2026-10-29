import { useMemo, useState, type FormEvent } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Clock3, Menu, MessageCircle, Move3D, Ruler, ShieldCheck, Sofa, X, Wrench, Instagram, Phone, Send } from 'lucide-react'

const CONTACT_PHONE = '' // Добавьте номер в международном формате без +, например 79991234567
const WA_LINK = CONTACT_PHONE ? `https://wa.me/${CONTACT_PHONE}` : ''

const services = [
  { id: 'wardrobe', n: '01', title: 'Шкафы и гардеробные', desc: 'Распашные, угловые, модульные системы и шкафы-купе.', time: 'От 2 часов', icon: Sofa },
  { id: 'kitchen', n: '02', title: 'Кухни', desc: 'Сборка корпусов, установка фасадов, регулировка дверей и ящиков.', time: 'По объёму', icon: Wrench },
  { id: 'bed', n: '03', title: 'Кровати и спальни', desc: 'Каркасы, основания, изголовья, тумбы и комоды.', time: 'От 1 часа', icon: ShieldCheck },
  { id: 'work', n: '04', title: 'Столы и рабочие места', desc: 'Письменные, компьютерные столы, стеллажи и офисная мебель.', time: 'От 1 часа', icon: Ruler },
]
const portfolio = [
  { title: 'Система хранения', type: 'Шкафы', image: 'photo-1595428774223-ef52624120d2', note: 'Демонстрационный пример оформления' },
  { title: 'Кухонный гарнитур', type: 'Кухни', image: 'photo-1556911220-e15b29be8c8f', note: 'Демонстрационный пример оформления' },
  { title: 'Спальня', type: 'Спальни', image: 'photo-1616486338812-3dadae4b4ace', note: 'Демонстрационный пример оформления' },
  { title: 'Домашний кабинет', type: 'Рабочее место', image: 'photo-1497366754035-f200968a6e72', note: 'Демонстрационный пример оформления' },
]
function Cabinet({ exploded }: { exploded: boolean }) {
  const gap = exploded ? 0.38 : 0
  return <group>
    <mesh position={[0, 0.02, 0]} castShadow receiveShadow><boxGeometry args={[2.2, 0.12, 0.82]} /><meshStandardMaterial color="#d8d2c4" roughness={0.48} /></mesh>
    <mesh position={[0, 1.25 + gap, 0]} castShadow receiveShadow><boxGeometry args={[2.2, 2.35, 0.08]} /><meshStandardMaterial color="#c4bcae" roughness={0.62} /></mesh>
    <mesh position={[-1.06, 1.2, 0]} castShadow><boxGeometry args={[0.08, 2.35, 0.82]} /><meshStandardMaterial color="#e4dfd5" roughness={0.45} /></mesh>
    <mesh position={[1.06, 1.2, 0]} castShadow><boxGeometry args={[0.08, 2.35, 0.82]} /><meshStandardMaterial color="#e4dfd5" roughness={0.45} /></mesh>
    {[0.45, 1.1, 1.75].map((y, i) => <mesh key={i} position={[0, y + (exploded ? (i - 1) * 0.24 : 0), 0]} castShadow><boxGeometry args={[2.05, 0.055, 0.72]} /><meshStandardMaterial color="#b7ad9c" roughness={0.58} /></mesh>)}
    {[-0.52, 0.52].map((x, i) => <mesh key={i} position={[x, 1.2, 0.43 + (exploded ? 0.24 : 0)]} castShadow><boxGeometry args={[1.03, 2.3, 0.055]} /><meshStandardMaterial color={i === 0 ? '#e9e4d9' : '#cfc7b8'} roughness={0.34} metalness={0.03} /></mesh>)}
    {[-0.52, 0.52].map((x, i) => <mesh key={i} position={[x + (i === 0 ? 0.38 : -0.38), 1.2, 0.48 + (exploded ? 0.24 : 0)]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.16, 16]} /><meshStandardMaterial color="#77786c" metalness={0.7} roughness={0.28} /></mesh>)}
    <mesh position={[0, 2.42 + gap, 0]} castShadow><boxGeometry args={[2.28, 0.12, 0.9]} /><meshStandardMaterial color="#e5dfd4" roughness={0.4} /></mesh>
  </group>
}
function ModelStage() {
  const [exploded, setExploded] = useState(false)
  return <div className="model-stage">
    <div className="model-label"><span className="live-dot" /> ИНТЕРАКТИВНАЯ МОДЕЛЬ <span className="model-index">DP / 001</span></div>
    <Canvas camera={{ position: [4.2, 3.2, 5.2], fov: 38 }} shadows dpr={[1, 1.7]}>
      <color attach="background" args={['#e6e4dc']} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Environment preset="city" />
      <Cabinet exploded={exploded} />
      <ContactShadows position={[0, -0.06, 0]} opacity={0.26} scale={6} blur={2.5} far={4} />
      <OrbitControls makeDefault enablePan={false} minDistance={4} maxDistance={9} minPolarAngle={0.5} maxPolarAngle={1.55} />
    </Canvas>
    <div className="model-hint"><Move3D size={15} /> Зажмите и вращайте · Колесо — масштаб</div>
    <button className={`explode-toggle ${exploded ? 'active' : ''}`} onClick={() => setExploded(v => !v)}><span>{exploded ? 'Вернуть сборку' : 'Показать конструкцию'}</span><ArrowRight size={16} /></button>
    <div className="model-caption"><span>01 / КОРПУСНАЯ МЕБЕЛЬ</span><span>3D DEMO</span></div>
  </div>
}

function App() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', type: 'Шкаф или гардеробная', details: '' })
  const [formError, setFormError] = useState('')
  const filters = ['Все', 'Шкафы', 'Кухни', 'Спальни', 'Рабочее место']
  const filteredPortfolio = useMemo(() => activeFilter === 'Все' ? portfolio : portfolio.filter(p => p.type === activeFilter), [activeFilter])
  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) { setFormError('Укажите имя и телефон — это поможет связаться с вами.'); return }
    if (!CONTACT_PHONE) { setFormError('Форма подготовлена. Перед запуском сайта нужно добавить рабочий номер WhatsApp в настройках проекта.'); return }
    const message = `Здравствуйте! Меня зовут ${form.name}. Телефон: ${form.phone}. Мебель: ${form.type}. Детали: ${form.details || 'обсудим при общении'}.`
    window.open(`${WA_LINK}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setFormError('')
  }
  const closeMenu = () => setMenuOpen(false)
  return <main>
    <header className="header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Pulikov — главная"><span className="brand-mark">P<span>.</span></span><span className="brand-word">PULIKOV<small>СБОРКА МЕБЕЛИ</small></span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#services" onClick={closeMenu}>Услуги</a><a href="#portfolio" onClick={closeMenu}>Работы</a><a href="#about" onClick={closeMenu}>О мастере</a>
        <a className="nav-mobile-contact" href="#contact" onClick={closeMenu}>Обсудить задачу <ArrowRight size={15} /></a>
      </nav>
      <div className="header-right"><span className="availability"><i /> Москва и область</span><a href="#contact" className="header-cta">Обсудить задачу <ArrowDownRight size={16} /></a></div>
      <button className="menu-button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section className="hero section-wrap" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> ЧАСТНЫЙ МАСТЕР · МОСКВА</div>
        <h1>Мебель должна<br />стоять <em>идеально.</em></h1>
        <p className="hero-lead">Сборка мебели без спешки и лишних вопросов. Аккуратно, по инструкции и с вниманием к каждой детали.</p>
        <div className="hero-actions"><a href="#contact" className="button button-primary">Рассчитать сборку <ArrowRight size={17} /></a><a href="#portfolio" className="text-link">Посмотреть работы <ArrowDownRight size={17} /></a></div>
        <div className="hero-proof"><div className="proof-icon"><Check size={17} /></div><div><strong>Ровно. Надёжно. По делу.</strong><span>Согласуем задачу до начала работы</span></div></div>
      </div>
      <div className="hero-visual">
        <div className="hero-image" role="img" aria-label="Современная минималистичная мебель в интерьере" />
        <div className="image-index">PULIKOV / OBJECT 001</div>
        <div className="floating-note"><span className="note-symbol">↗</span><div><strong>Точность в деталях</strong><small>От крепежа до финальной регулировки</small></div></div>
        <div className="hero-number">01<span>—</span>04</div>
      </div>
      <div className="hero-bottom"><span>ПОДХОД, КОТОРЫЙ ВИДНО</span><a href="#services">Листайте, чтобы узнать больше <ChevronDown size={15} /></a><span>55°45' N · MOSCOW</span></div>
    </section>

    <section className="intro-strip"><div className="section-wrap intro-inner"><span className="strip-label">ПРИНЦИП РАБОТЫ</span><p>Не просто собрать мебель. <em>Сделать так, чтобы всё работало как должно.</em></p><span className="strip-mark">DP / 01</span></div></section>

    <section className="section-wrap services-section" id="services">
      <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> ЧТО Я СОБИРАЮ</div><h2>У каждой вещи<br />своё <em>место.</em></h2></div><p>От одной тумбы до целой квартиры с новой мебелью. Обсудим объём, комплектацию и удобное время.</p></div>
      <div className="service-list">{services.map(s => { const Icon = s.icon; return <a href="#contact" className="service-row" key={s.id} onClick={() => setForm(f => ({...f, type: s.title}))}><span className="service-number">{s.n}</span><span className="service-icon"><Icon size={21} strokeWidth={1.5} /></span><span className="service-main"><strong>{s.title}</strong><small>{s.desc}</small></span><span className="service-time"><Clock3 size={14} /> {s.time}</span><span className="service-arrow"><ArrowDownRight size={20} /></span></a>})}</div>
      <div className="service-footnote"><span>*</span> Срок зависит от модели мебели, объёма и состояния помещения. Точное время обсудим заранее.</div>
    </section>

    <section className="portfolio-section" id="portfolio"><div className="section-wrap">
      <div className="section-heading portfolio-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> ПОРТФОЛИО</div><h2>Результат —<br /><em>в деталях.</em></h2></div><p>Здесь будут реальные проекты: фотографии до и после, особенности задачи и итог. Пока это визуальные примеры стиля — они не выдаются за выполненные заказы.</p></div>
      <div className="filter-row">{filters.map(f => <button key={f} className={activeFilter === f ? 'filter active' : 'filter'} onClick={() => setActiveFilter(f)}>{f}</button>)}<span className="filter-count">{String(filteredPortfolio.length).padStart(2, '0')} ПРОЕКТА</span></div>
      <div className="portfolio-grid">{filteredPortfolio.map((p, i) => <article className="portfolio-card" key={p.title}><div className="portfolio-image-wrap"><img src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=1000&q=85`} alt={p.title} loading="lazy" /><span className="portfolio-tag">ВИЗУАЛЬНЫЙ ПРИМЕР</span><span className="portfolio-arrow"><ArrowUpRightIcon /></span></div><div className="portfolio-meta"><div><span>{p.type}</span><h3>{p.title}</h3></div><span className="portfolio-number">0{i + 1}</span></div><p className="portfolio-note">{p.note} — замените фото на реальные объекты.</p></article>)}</div>
      <div className="portfolio-disclaimer"><span className="disclaimer-dot" /> Демонстрационные изображения. Реальные фотографии выполненных работ добавляются после съёмки объектов.</div>
    </div></section>

    <section className="model-section section-wrap"><div className="model-copy"><div className="eyebrow"><span className="eyebrow-line" /> КАК УСТРОЕНА МЕБЕЛЬ</div><h2>Сборка начинается<br />с <em>понимания.</em></h2><p>Покрутите модель, рассмотрите конструкцию и попробуйте режим разборки. Так же внимательно я подхожу к реальной мебели: сначала разобраться, затем собирать.</p><div className="model-features"><div><span>01</span><strong>Проверка комплектации</strong></div><div><span>02</span><strong>Сборка по схеме</strong></div><div><span>03</span><strong>Финальная регулировка</strong></div></div><a href="#contact" className="text-link">Обсудить вашу мебель <ArrowRight size={16} /></a></div><ModelStage /></section>

    <section className="about-section" id="about"><div className="section-wrap about-grid"><div className="about-portrait"><div className="portrait-placeholder"><span>DP</span><small>ДМИТРИЙ ПУЛИКОВ</small></div><div className="portrait-caption">ЛИЧНЫЙ ПОДХОД <span>·</span> ОТВЕТСТВЕННОСТЬ ЗА РЕЗУЛЬТАТ</div></div><div className="about-copy"><div className="eyebrow"><span className="eyebrow-line" /> О МАСТЕРЕ</div><h2>Работаю так,<br />как хотел бы,<br /><em>чтобы сделали мне.</em></h2><p>Меня зовут Дмитрий Пуликов. Я собираю мебель в Москве и Московской области. Для меня важны аккуратность, понятная договорённость и чистый результат — без недосказанности и спешки.</p><p className="about-note">На сайте не публикую выдуманные цифры, отзывы или чужие проекты. По запросу можно обсудить вашу задачу, объём и условия до выезда.</p><a className="button button-dark" href="#contact">Связаться с Дмитрием <ArrowRight size={17} /></a></div></div></section>

    <section className="process-section section-wrap"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> ПРОСТОЙ ПРОЦЕСС</div><h2>От сообщения<br />до <em>готового результата.</em></h2></div><p>Без сложных согласований. Понимаем задачу, фиксируем договорённости и делаем работу.</p></div><div className="process-grid">{[{n:'01',t:'Вы описываете задачу',d:'Что нужно собрать, где находится мебель и есть ли инструкция.'},{n:'02',t:'Согласуем детали',d:'Уточняем объём, сроки, адрес и стоимость до начала работ.'},{n:'03',t:'Приезжаю и собираю',d:'Проверяю комплектность, собираю и регулирую механизмы.'},{n:'04',t:'Проверяем вместе',d:'Показываю результат, убираю упаковку в согласованных пределах.'}].map(x=><div className="process-item" key={x.n}><span>{x.n}</span><h3>{x.t}</h3><p>{x.d}</p><div className="process-line" /></div>)}</div></section>

    <section className="contact-section" id="contact"><div className="section-wrap contact-grid"><div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line" /> ОБСУДИМ ВАШУ ЗАДАЧУ</div><h2>Есть мебель.<br />Есть <em>решение.</em></h2><p>Расскажите, что нужно собрать. Я уточню детали и помогу понять следующий шаг.</p><div className="contact-detail"><span className="contact-detail-icon"><MessageCircle size={18} /></span><div><small>ГЕОГРАФИЯ</small><strong>Москва и Московская область</strong></div></div><div className="contact-detail"><span className="contact-detail-icon"><Clock3 size={18} /></span><div><small>СВЯЗЬ</small><strong>В удобное время по договорённости</strong></div></div><div className="contact-smallprint">Стоимость и время выезда подтверждаются до начала работ.</div></div>
      <form className="contact-form" onSubmit={submitForm}><div className="form-top"><span>ЗАПРОС НА СБОРКУ</span><span>DP / 04</span></div><label>Как к вам обращаться<input value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} placeholder="Ваше имя" autoComplete="name" /></label><label>Номер телефона<input value={form.phone} onChange={e => setForm(f => ({...f, phone:e.target.value}))} placeholder="+7 900 000-00-00" autoComplete="tel" type="tel" /></label><label>Что нужно собрать<select value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))}><option>Шкаф или гардеробная</option><option>Кухня</option><option>Кровать или спальня</option><option>Стол или рабочее место</option><option>Комод, тумба, стеллаж</option><option>Несколько предметов мебели</option><option>Другое</option></select></label><label>Дополнительные детали <span className="optional">(необязательно)</span><textarea value={form.details} onChange={e => setForm(f => ({...f, details:e.target.value}))} placeholder="Модель, адрес, желаемая дата..." rows={3} /></label>{formError && <p className="form-error" role="status">{formError}</p>}<button className="button button-primary form-submit" type="submit">Отправить запрос <ArrowRight size={17} /></button><p className="form-privacy">Нажимая кнопку, вы соглашаетесь на обработку данных для ответа на запрос.</p></form>
    </div></section>

    <footer className="footer"><div className="section-wrap footer-main"><a className="brand footer-brand" href="#top"><span className="brand-mark">P<span>.</span></span><span className="brand-word">PULIKOV<small>СБОРКА МЕБЕЛИ</small></span></a><p>Аккуратная сборка мебели<br />в Москве и Московской области.</p><div className="footer-links"><a href="#services">Услуги</a><a href="#portfolio">Портфолио</a><a href="#about">О мастере</a><a href="#contact">Контакты</a></div><a className="back-top" href="#top">НАВЕРХ ↑</a></div><div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} ДМИТРИЙ ПУЛИКОВ</span><span>СДЕЛАНО С ВНИМАНИЕМ К ДЕТАЛЯМ</span><a href="#top">PULIKOV / DP</a></div></footer>
  </main>
}
function ArrowUpRightIcon() { return <ArrowDownRight size={20} /> }
export default App
