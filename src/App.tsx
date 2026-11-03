import { FormEvent, useEffect, useMemo, useState } from "react"

type IconName = "arrow" | "bed" | "call" | "check" | "clock" | "close" | "food" | "leaf" | "map" | "menu" | "search" | "whatsapp" | "wifi"
type IconProps = {
  name: IconName
  size?: number
}

const phone = "+919579201147"
const displayPhone = "+91 95792 01147"
const address =
  "Hotel Natraj Annex, Pushpraj Chowk, Dr. Ambedkar Road, Nishant Colony, Sangli, Maharashtra 416416, India"
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
const whatsappUrl = (message: string) =>
  `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`

const categories = [
  "All",
  "North Indian",
  "Punjabi",
  "South Indian",
  "Chinese",
  "Maharashtrian",
  "Fast Food",
  "Tandoori",
  "Beverages",
  "Desserts",
]

const dishes = [
  {
    name: "Cheese Pav Bhaji",
    category: "Fast Food",
    image:
      "https://images.unsplash.com/photo-1619193100179-af4cc742ed3e?auto=format&fit=crop&w=900&q=82",
    credit: "Shree Iyer",
  },
  {
    name: "Paper Masala Dosa",
    category: "South Indian",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=82",
    credit: "Paul",
  },
  {
    name: "Kaju Masala",
    category: "North Indian",
    image:
      "https://images.unsplash.com/photo-1764315424143-f417a3ea50a9?auto=format&fit=crop&w=900&q=82",
    credit: "Kalindu Waranga",
  },
  {
    name: "Paneer Butter Masala",
    category: "Punjabi",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=82",
    credit: "Kalyani Akella",
  },
  {
    name: "Tawa Pulao",
    category: "Fast Food",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=82",
    credit: "Christopher Alvarenga",
  },
  {
    name: "Various Tandoori Items",
    category: "Tandoori",
    image:
      "https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&fit=crop&w=900&q=82",
    credit: "Esperanza Doronila",
  },
]

const propertyPhotos = {
  exterior:
    "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nLzJyQWtOQnlxUkV5d3ZUNnZtbzZZY2ciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
  room: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/c6/39/a7/club-premier-suite.jpg?w=1400&h=800&s=1",
  bedroom:
    "https://pix8.agoda.net/property/56112842/0/18fc0984d9025f5b3f6bf31e6b1820d6.jpeg?va=1&ce=0&s=1024x",
  common:
    "https://pix8.agoda.net/property/56112842/0/46b79bcec7542119d502c5015724e48b.jpeg?va=1&ce=0&s=1024x",
  exteriorWide:
    "https://pix8.agoda.net/property/56112842/0/bf3684a50502f72be92cfb4d1e4e732b.jpeg?va=1&ce=3&s=1024x",
  restaurant:
    "https://pix8.agoda.net/property/56112842/0/56d8f79d8fce593898bd651a3741a0e7.jpeg?va=1&ce=3&s=1024x",
  dining: "https://r1imghtlak.mmtcdn.com/ce873d5cc97011e8939a02163bffcb52.jpg",
  food: "https://b.zmtcdn.com/data/pictures/8/18835238/acff5fc7afce9ada442d5d3a12f6547f.jpg",
  family: "https://r1imghtlak.mmtcdn.com/26780f78c97111e89d9b0a7510c9dcdc.jpg",
}

const amenities = [
  ["wifi", "Free Wi-Fi"],
  ["food", "In-house pure veg restaurant"],
  ["bed", "Room service"],
  ["map", "Parking facilities"],
  ["check", "Laundry service"],
  ["check", "Power backup"],
  ["clock", "24/7 hot water"],
  ["check", "Air-conditioned rooms"],
] as [IconName, string][]

function Icon({ name, size = 20 }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    bed: (
      <path d="M3 19v-8m18 8v-5a3 3 0 0 0-3-3H9v8m-6-4h18M7 11V7h5a3 3 0 0 1 3 3v1" />
    ),
    call: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2a15 15 0 0 1-6.5-6.5l2-2L7 3Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="M5 5l14 14M19 5 5 19" />,
    food: (
      <path d="M7 3v8m-3-8v5a3 3 0 0 0 6 0V3M7 11v10m9-8V7a4 4 0 0 1 4-4v18" />
    ),
    leaf: (
      <path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16ZM4 21c2-6 6-9 12-12" />
    ),
    map: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.6Z" />
        <path d="M9 8c.5 3 2 4.5 5 5" />
      </>
    ),
    wifi: (
      <>
        <path d="M4 9a12 12 0 0 1 16 0M7 13a7 7 0 0 1 10 0m-7 4a3 3 0 0 1 4 0" />
        <circle cx="12" cy="20" r=".5" fill="currentColor" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ href = "#home" }: { href?: string }) {
  return (
    <a className="logo" href={href} aria-label="Hotel Natraj Annex home">
      <span className="logo-mark">NA</span>
      <span>
        <b>Hotel Natraj</b>
        <small>Annex · Sangli</small>
      </span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ["#home", "Home"],
    ["#about", "About"],
    ["#stay", "Stay"],
    ["#dine", "Dine"],
    ["?view=menu", "Menu"],
    ["#gallery", "Gallery"],
    ["#contact", "Contact"],
  ]
  return (
    <header>
      <div className="topline">
        <div className="shell">
          <span>3-Star Hotel</span>
          <span>100% Pure Vegetarian Restaurant</span>
          <span>Open daily · 7:30 AM–10:30 PM</span>
        </div>
      </div>
      <div className="nav-shell shell">
        <Logo />
        <nav className={open ? "open" : ""}>
          {links.map(([href, label]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="call-link" href={`tel:${phone}`}>
            <Icon name="call" size={17} /> <span>{displayPhone}</span>
          </a>
          <a
            className="button small"
            href={whatsappUrl(
              "Hello Hotel Natraj Annex, I would like to make an enquiry.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="whatsapp" size={17} /> Enquire
          </a>
          <button
            className="mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  )
}

function SectionTitle({
  kicker,
  title,
  copy,
  light = false,
}: {
  kicker: string
  title: string
  copy?: string
  light?: boolean
}) {
  return (
    <div className={`section-title ${light ? "light" : ""}`}>
      <span>{kicker}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function PropertyPhoto({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string
  alt: string
  className?: string
  loading?: "eager" | "lazy"
}) {
  return (
    <div className={`property-photo ${className}`}>
      <img src={src} alt={alt} loading={loading} decoding="async" />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-art">
        <div className="arch a1" />
        <div className="arch a2" />
        <div className="sun" />
      </div>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <Icon name="leaf" size={16} /> Stay well. Dine pure.
          </p>
          <h1>
            Comfortable stays.
            <br />
            <em>Wholesome flavours.</em>
          </h1>
          <p className="hero-lead">
            A 3-star hotel and pure vegetarian multi-cuisine restaurant in the
            heart of Sangli—bringing warm hospitality and family dining under
            one roof.
          </p>
          <div className="hero-actions">
            <a className="button" href="#stay">
              Explore your stay <Icon name="arrow" />
            </a>
            <a className="button outline" href="?view=menu">
              Browse food menu
            </a>
          </div>
          <div className="hero-notes">
            <span>
              <Icon name="map" size={18} /> Pushpraj Chowk, Sangli
            </span>
            <span>
              <Icon name="clock" size={18} /> Check-in & check-out · 12:00 PM
            </span>
          </div>
        </div>
        <div className="hero-card">
          <span className="hero-card-label">Hotel & restaurant</span>
          <div className="monogram">N</div>
          <h3>
            Two reasons to visit.
            <br />
            One warm welcome.
          </h3>
          <div className="hero-card-stats">
            <div>
              <b>3-Star</b>
              <small>Hotel</small>
            </div>
            <div>
              <b>100%</b>
              <small>Pure Veg</small>
            </div>
            <div>
              <b>Daily</b>
              <small>Dining</small>
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-note" href="#about">
        Discover Natraj Annex <span>↓</span>
      </a>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="shell about-grid">
        <div className="about-visual">
          <div className="badge">
            <Icon name="leaf" />
            <b>Pure vegetarian</b>
            <span>Always</span>
          </div>
          <PropertyPhoto
            src={propertyPhotos.exterior}
            alt="Hotel Natraj Annex exterior"
          />
        </div>
        <div>
          <SectionTitle
            kicker="Welcome to Natraj Annex"
            title="Hospitality and dining, thoughtfully together."
          />
          <p className="large-copy">
            Hotel Natraj Annex is a popular 3-star hotel and pure vegetarian
            multi-cuisine restaurant at Pushpraj Chowk, Sangli.
          </p>
          <p>
            Whether you are visiting the city, travelling for work, or gathering
            for a family meal, find comfortable Deluxe AC accommodation and
            freshly prepared vegetarian food in one convenient location.
          </p>
          <div className="about-points">
            <div>
              <span>01</span>
              <h3>Rest comfortably</h3>
              <p>
                Deluxe air-conditioned rooms with practical everyday amenities.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Dine together</h3>
              <p>Family dining across Indian and international cuisines.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stay() {
  return (
    <section className="section stay" id="stay">
      <div className="shell">
        <div className="split-head">
          <SectionTitle
            kicker="Hotel & accommodation"
            title="Settle into your stay."
            copy="Deluxe air-conditioned rooms designed for a comfortable visit to Sangli."
            light
          />
          <a
            className="text-link light"
            href={whatsappUrl(
              "Hello Hotel Natraj Annex, I would like to enquire about a Deluxe AC room.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            Room enquiry <Icon name="arrow" />
          </a>
        </div>
        <div className="room-grid">
          <PropertyPhoto
            src={propertyPhotos.room}
            alt="Deluxe air-conditioned room at Hotel Natraj Annex"
            className="room-photo"
          />
          <div className="room-card">
            <span className="room-no">01 / DELUXE</span>
            <h3>Deluxe Air-Conditioned Room</h3>
            <p>
              A comfortable room with city views and the essentials for a
              restful stay.
            </p>
            <dl>
              <div>
                <dt>Room size</dt>
                <dd>Approx. 140–144 sq. ft.</dd>
              </div>
              <div>
                <dt>Bed</dt>
                <dd>King-size bed</dd>
              </div>
              <div>
                <dt>View</dt>
                <dd>City view</dd>
              </div>
              <div>
                <dt>Climate</dt>
                <dd>Air conditioning</dd>
              </div>
            </dl>
            <a
              className="button cream"
              href={whatsappUrl(
                "Hello Hotel Natraj Annex, I would like to check room availability.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              Check room availability <Icon name="whatsapp" />
            </a>
          </div>
        </div>
        <div className="amenity-head">
          <h3>Everything you need, close at hand.</h3>
          <p>Hotel amenities and services</p>
        </div>
        <div className="amenity-grid">
          {amenities.map(([icon, label]) => (
            <div key={label}>
              <Icon name={icon} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="policy-grid">
          <div>
            <span>ARRIVAL & DEPARTURE</span>
            <h3>12:00 PM</h3>
            <p>Check-in and check-out time</p>
          </div>
          <div>
            <span>GUEST POLICIES</span>
            <ul>
              <li>Valid government-issued ID required</li>
              <li>Aadhaar Card and Driving Licence accepted</li>
              <li>Primary guest must be at least 18 years old</li>
              <li>Pets are not allowed</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Dine() {
  return (
    <section className="section dine" id="dine">
      <div className="shell">
        <div className="dine-grid">
          <div>
            <SectionTitle
              kicker="Pure vegetarian restaurant"
              title="A table full of choice. A meal made with care."
              copy="From familiar Indian favourites to international flavours, enjoy a relaxed multi-cuisine dining experience for the whole family."
            />
            <div className="cuisine-cloud">
              {[
                "North Indian",
                "Punjabi",
                "South Indian",
                "Chinese",
                "Maharashtrian",
                "Fast Food",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <div className="hours">
              <Icon name="clock" />
              <div>
                <small>OPEN EVERY DAY</small>
                <b>7:30 AM – 10:30 PM</b>
              </div>
            </div>
          </div>
          <div className="dine-art">
            <PropertyPhoto
              src={propertyPhotos.restaurant}
              alt="Restaurant interior at Hotel Natraj Annex"
            />
            <div className="leaf-seal">
              <Icon name="leaf" />
              <span>100%</span>
              <small>Pure Veg</small>
            </div>
          </div>
        </div>
        <div className="popular">
          <div>
            <span>POPULAR AT NATRAJ</span>
            <h3>Guest favourites</h3>
          </div>
          <div className="dish-list">
            {dishes.map((dish, i) => (
              <div key={dish.name}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b>{dish.name}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DigitalMenu({ standalone = false }: { standalone?: boolean }) {
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const menuUrl =
    typeof window === "undefined"
      ? "?view=menu"
      : `${window.location.origin}${window.location.pathname}?view=menu`
  const filtered = useMemo(
    () =>
      dishes.filter(
        (d) =>
          (category === "All" || d.category === category) &&
          d.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  )
  return (
    <section
      className={`section menu-section ${standalone ? "standalone" : ""}`}
      id="menu-card"
    >
      <div className="shell">
        <div className="menu-intro">
          <SectionTitle
            kicker="Digital menu card"
            title="Find your flavour."
            copy="Browse verified popular dishes or switch categories. More menu details and photographs can be added by management as they become available."
          />
          {!standalone && (
            <div className="qr-card">
              <img
                src={`https://quickchart.io/qr?size=160&text=${encodeURIComponent(menuUrl)}`}
                alt="QR code to open the digital menu"
              />
              <div>
                <b>Scan to browse</b>
                <span>Table-friendly digital menu</span>
              </div>
            </div>
          )}
        </div>
        <div className="menu-tools">
          <label>
            <Icon name="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes"
              aria-label="Search dishes"
            />
          </label>
          <div className="category-tabs" role="tablist">
            {categories.map((c) => (
              <button
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
                key={c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        {filtered.length ? (
          <div className="menu-grid">
            {filtered.map((d) => (
              <article key={d.name}>
                <div className="dish-photo">
                  <img
                    src={d.image}
                    alt={`Representative presentation of ${d.name}`}
                    loading="lazy"
                  />
                  <span>Representative photo · {d.credit} / Unsplash</span>
                </div>
                <div className="dish-copy">
                  <span className="veg-dot" aria-label="Vegetarian dish">
                    <i />
                  </span>
                  <small>{d.category}</small>
                  <h3>{d.name}</h3>
                  <p>Description to be provided by management.</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-menu">
            <Icon name="leaf" size={30} />
            <h3>No verified dishes added in this category yet.</h3>
            <p>
              Menu information can be added here when supplied by management.
            </p>
          </div>
        )}
        <p className="menu-note">
          <Icon name="leaf" size={16} /> All food served is 100% pure
          vegetarian. Menu availability is subject to management confirmation.
        </p>
      </div>
    </section>
  )
}

function StandaloneMenu() {
  const homeUrl = typeof window === "undefined" ? "/" : window.location.pathname
  return (
    <div className="menu-page">
      <div className="menu-page-header">
        <div className="shell">
          <Logo href={homeUrl} />
          <div className="menu-page-status">
            <Icon name="leaf" size={16} />
            100% Pure Vegetarian
          </div>
          <a className="menu-home-link" href={homeUrl}>
            Full website <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
      <DigitalMenu standalone />
      <div className="menu-page-footer">
        <div className="shell">
          <span>Daily · 7:30 AM–10:30 PM</span>
          <a href={`tel:${phone}`}>
            <Icon name="call" size={15} /> {displayPhone}
          </a>
        </div>
      </div>
    </div>
  )
}

function Gallery() {
  const [active, setActive] = useState<{
    label: string
    image: string
  } | null>(null)
  const items = [
    { label: "Deluxe room", image: propertyPhotos.room },
    { label: "Bedroom interior", image: propertyPhotos.bedroom },
    { label: "Hotel exterior", image: propertyPhotos.exteriorWide },
    { label: "Common area", image: propertyPhotos.common },
    { label: "Restaurant interior", image: propertyPhotos.restaurant },
    { label: "Dining arrangement", image: propertyPhotos.dining },
    { label: "Food photography", image: propertyPhotos.food },
    { label: "Family dining", image: propertyPhotos.family },
  ]
  return (
    <section className="section gallery" id="gallery">
      <div className="shell">
        <div className="split-head">
          <SectionTitle
            kicker="Hotel & restaurant gallery"
            title="A look inside Natraj Annex."
            copy="Verified business photographs will appear here when supplied."
          />
          <span className="photo-policy">No stock imagery used</span>
        </div>
        <div className="gallery-grid">
          {items.map((item, i) => (
            <button
              className={`gallery-tile g${i}`}
              onClick={() => setActive(item)}
              key={item.label}
            >
              <PropertyPhoto
                src={item.image}
                alt={`${item.label} at Hotel Natraj Annex`}
              />
              <span>
                {String(i + 1).padStart(2, "0")} / {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button aria-label="Close gallery preview">
            <Icon name="close" />
          </button>
          <div onClick={(e) => e.stopPropagation()}>
            <PropertyPhoto
              src={active.image}
              alt={`${active.label} at Hotel Natraj Annex`}
            />
            <p>{active.label} · Hotel Natraj Annex</p>
          </div>
        </div>
      )}
    </section>
  )
}

function EnquiryForm() {
  const [type, setType] = useState("Room enquiry")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  function submit(e: FormEvent) {
    e.preventDefault()
    window.open(
      whatsappUrl(
        `Hello Hotel Natraj Annex,\n\n${type}\nName: ${name}\n${message}`,
      ),
      "_blank",
      "noopener,noreferrer",
    )
  }
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </label>
        <label>
          Enquiry type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Room enquiry</option>
            <option>Restaurant enquiry</option>
            <option>General enquiry</option>
          </select>
        </label>
      </div>
      <label>
        How can we help?
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Share your dates, number of guests, or dining enquiry"
        />
      </label>
      <button className="button" type="submit">
        <Icon name="whatsapp" /> Continue on WhatsApp
      </button>
      <small>
        This opens WhatsApp with your enquiry. No information is stored on this
        website.
      </small>
    </form>
  )
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <SectionTitle
          kicker="Contact & directions"
          title="We look forward to welcoming you."
          copy="Reach us for room reservations, restaurant enquiries, or directions."
          light
        />
        <div className="contact-grid">
          <div className="contact-details">
            <div>
              <span>CALL US</span>
              <a href={`tel:${phone}`}>{displayPhone}</a>
            </div>
            <div>
              <span>FIND US</span>
              <p>
                Hotel Natraj Annex
                <br />
                Pushpraj Chowk, Dr. Ambedkar Road
                <br />
                Nishant Colony, Sangli
                <br />
                Maharashtra – 416416, India
              </p>
            </div>
            <div className="distance-row">
              <p>
                <b>1.5–2 km</b> from Sangli S.T. Bus Stand
              </p>
              <p>
                <b>1.6 km</b> from Sangli Railway Station
              </p>
            </div>
            <div className="contact-actions">
              <a className="button cream" href={`tel:${phone}`}>
                <Icon name="call" /> Call now
              </a>
              <a
                className="button outline"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="map" /> Get directions
              </a>
            </div>
          </div>
          <EnquiryForm />
        </div>
        <div className="map-frame">
          <iframe
            title="Hotel Natraj Annex location on Google Maps"
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p>
            A comfortable 3-star stay and pure vegetarian multi-cuisine
            restaurant in Sangli.
          </p>
        </div>
        <div>
          <span>EXPLORE</span>
          <a href="#stay">Hotel & rooms</a>
          <a href="#dine">Restaurant</a>
          <a href="?view=menu">Digital menu</a>
          <a href="#gallery">Gallery</a>
        </div>
        <div>
          <span>VISIT</span>
          <p>
            Pushpraj Chowk, Dr. Ambedkar Road,
            <br />
            Nishant Colony, Sangli – 416416
          </p>
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            Get directions
          </a>
        </div>
        <div>
          <span>CONTACT</span>
          <a href={`tel:${phone}`}>{displayPhone}</a>
          <a
            href={whatsappUrl(
              "Hello Hotel Natraj Annex, I would like to make an enquiry.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp enquiry
          </a>
          <p>Daily · 7:30 AM–10:30 PM</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Hotel Natraj Annex</span>
        <span>Hotel & pure vegetarian restaurant</span>
      </div>
    </footer>
  )
}

export default function App() {
  const isMenuPage =
    new URLSearchParams(window.location.search).get("view") === "menu"
  if (isMenuPage) return <StandaloneMenu />

  useEffect(() => {
    const ids = [
      "home",
      "about",
      "stay",
      "dine",
      "menu-card",
      "gallery",
      "contact",
    ]
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            document
              .querySelectorAll("nav a")
              .forEach((a) =>
                a.classList.toggle(
                  "active",
                  a.getAttribute("href") === `#${entry.target.id}`,
                ),
              )
        }),
      { rootMargin: "-25% 0px -65%" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Stay />
        <Dine />
        <DigitalMenu />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
