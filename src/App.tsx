import { useState, useEffect, useRef } from 'react'
import bottleImg from '@/imports/bottlebiovco.png'
import logoImg from '@/imports/logo.png'

// ─── Tokens ───────────────────────────────────────────────────────────────
const C = {
  // Brand orange — kept for decorative use only (overlines, dots, social hover, etc.)
  orange: '#E8650A',
  orangeDim: 'rgba(232,101,10,0.08)',
  orangeBorder: 'rgba(232,101,10,0.16)',
  // CTA green — replaces orange on all interactive buttons
  green: '#27AE60',
  greenHov: '#1E8449',
  greenDim: 'rgba(39,174,96,0.09)',
  greenBorder: 'rgba(39,174,96,0.2)',
  greenShadow: 'rgba(39,174,96,0.28)',
  // Neutrals
  black: '#1A1A1A',
  ink: '#2C2C2C',
  body: '#4A4745',
  muted: '#8C8885',
  rule: 'rgba(26,26,26,0.08)',
  white: '#FFFFFF',
  offWhite: '#FAF9F7',
  surface: '#F3F1EE',
}

const F = {
  serif: "'DM Serif Display', serif",
  sans: "'Outfit', sans-serif",
}

// ─── Hooks ────────────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return w
}

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const fn = () => setY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return y
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible: v }
}

// ─── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const scrollY = useScrollY()
  const w = useWindowWidth()
  const mobile = w < 640
  const scrolled = scrollY > 48

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(250,249,247,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.rule}` : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: mobile ? '0 24px' : '0 48px',
        height: mobile ? 64 : 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="https://www.biovco.com/sihat_tanpa_ubat.php?i=2" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <img
            src={logoImg}
            alt="BioVCO"
            style={{ height: mobile ? 34 : 38, width: mobile ? 34 : 38, objectFit: 'contain' }}
          />
          <span style={{
            fontFamily: F.serif,
            fontSize: mobile ? 17 : 19,
            letterSpacing: '0.04em',
            color: C.black,
          }}>
            BioVCO
          </span>
        </a>
        <NavCta mobile={mobile} />
      </div>
    </nav>
  )
}

function NavCta({ mobile }: { mobile: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href="#Order"
      style={{
        fontFamily: F.sans,
        fontSize: mobile ? 12 : 13,
        fontWeight: 600,
        letterSpacing: '0.02em',
        padding: mobile ? '9px 18px' : '10px 22px',
        borderRadius: 100,
        background: hov ? C.green : 'transparent',
        color: hov ? C.white : C.green,
        border: `1.5px solid ${C.green}`,
        textDecoration: 'none',
        transition: 'all 0.22s ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {mobile ? 'Dapatkan Sekarang' : 'Dapatkan Sekarang'}
    </a>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  const w = useWindowWidth()
  const mobile = w < 640
  const tablet = w < 1024
  const { ref, visible } = useInView(0.05)

  return (
    <section style={{
      background: C.offWhite,
      paddingTop: mobile ? 88 : 96,
      paddingBottom: mobile ? 64 : 96,
      paddingLeft: mobile ? 24 : tablet ? 40 : 48,
      paddingRight: mobile ? 24 : tablet ? 40 : 48,
      overflow: 'hidden',
    }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: tablet ? '1fr' : '1fr 1fr',
          gap: tablet ? 48 : 72,
          alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Copy */}
        <div style={{ order: tablet ? 2 : 1 }}>
          <p style={{
            fontFamily: F.sans,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: C.orange,
            textTransform: 'uppercase',
            margin: '0 0 20px',
          }}>
            Virgin Coconut Oil · 100% Organik
          </p>

          <h1 style={{
            fontFamily: F.serif,
            fontSize: mobile ? 32 : tablet ? 40 : 50,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: C.black,
            margin: '0 0 28px',
          }}>
            BioVCO: Penyelesaian Kesihatan Tanpa Ubat yang Semulajadi dan Selamat
          </h1>

          <p style={{
            fontFamily: F.sans,
            fontSize: mobile ? 15 : 16,
            lineHeight: 1.8,
            color: C.body,
            margin: '0 0 16px',
          }}>
            BioVCO adalah produk premium yang dihasilkan melalui proses semula jadi tanpa haba tinggi. Kaya dengan asid laurik, antioksidan dan nutrien penting — BioVCO memberi anda manfaat menyeluruh untuk tubuh kekal sihat.
          </p>
          <p style={{
            fontFamily: F.sans,
            fontSize: mobile ? 15 : 16,
            lineHeight: 1.8,
            color: C.body,
            margin: '0 0 36px',
          }}>
            Sesuai untuk mereka yang menghadapi masalah tiroid, resdung, tonsil, kolesterol, psoriasis, kencing manis, sembelit, tekanan darah tinggi, migrain dan berat badan berlebihan — kerana kesihatan adalah harta yang paling berharga.
          </p>

          <HeroCta />
        </div>

        {/* Product image */}
        <div style={{
          order: tablet ? 1 : 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            width: '70%',
            height: '70%',
            background: C.orangeDim,
            borderRadius: '50%',
            filter: 'blur(48px)',
          }} />
          <img
            src={bottleImg}
            alt="BioVCO Virgin Coconut Oil 150ml — botol dan kotak produk"
            style={{
              width: '100%',
              maxWidth: mobile ? 280 : tablet ? 360 : 440,
              objectFit: 'contain',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 24px 40px rgba(26,26,26,0.12))',
            }}
          />
        </div>
      </div>
    </section>
  )
}

function HeroCta() {
  const [hov, setHov] = useState(false)
  return (
    <a
      id="Order"
      href="https://api.whatsapp.com/send?phone=601158881639&text=Saya%20berminat%20nak%20beli%20BioVCO.%20Boleh%20saya%20tahu%20pakej%20dan%20cara%20untuk%20buat%20pembelian%3F"
      style={{
        display: 'inline-block',
        fontFamily: F.sans,
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '0.01em',
        padding: '15px 36px',
        borderRadius: 100,
        background: hov ? C.greenHov : C.green,
        color: C.white,
        textDecoration: 'none',
        boxShadow: hov
          ? `0 8px 28px ${C.greenShadow}`
          : `0 4px 16px rgba(39,174,96,0.22)`,
        transform: hov ? 'translateY(-1px)' : 'none',
        transition: 'all 0.22s ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      Dapatkan Sekarang
    </a>
  )
}


// ─── Thyroid Section ──────────────────────────────────────────────────────
const THYROID_SYMPTOMS = [
  { icon: ' ', label: 'Cepat penat walaupun cukup rehat' },
  { icon: ' ', label: 'Berat badan berubah tanpa sebab' },
  { icon: ' ', label: 'Rambut gugur berlebihan' },
  { icon: ' ', label: 'Degupan jantung tidak teratur' },
  { icon: ' ', label: 'Mudah resah atau tertekan' },
  { icon: ' ', label: 'Sensitif terhadap panas atau sejuk' },
]

const THYROID_COMPARE = [
  {
    type: 'Hypothyroidism',
    subtitle: 'Tiroid Kurang Aktif',
    color: '#2A6AB8',
    bg: 'rgba(42,106,184,0.07)',
    border: 'rgba(42,106,184,0.18)',
    icon: ' ',
    points: [
      'Mudah penat sepanjang masa',
      'Berat badan naik tanpa sebab',
      'Kulit kering dan rambut gugur',
      'Rasa sejuk walaupun di tempat panas',
      'Mood tertekan dan ingatan lemah',
    ],
  },
  {
    type: 'Hyperthyroidism',
    subtitle: 'Tiroid Terlalu Aktif',
    color: '#B84D0A',
    bg: 'rgba(184,77,10,0.07)',
    border: 'rgba(184,77,10,0.18)',
    icon: ' ',
    points: [
      'Jantung berdegup terlalu laju',
      'Berat badan turun mendadak',
      'Mudah berpeluh dan rasa panas',
      'Tangan menggeletar dan gelisah',
      'Sukar tidur dan mudah marah',
    ],
  },
]

function ThyroidSection() {
  const w = useWindowWidth()
  const mobile = w < 640
  const tablet = w < 1024
  const { ref, visible } = useInView()

  return (
    <section style={{
      background: C.white,
      padding: mobile ? '72px 24px' : tablet ? '88px 40px' : '104px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            marginBottom: mobile ? 48 : 72,
            maxWidth: 680,
          }}
        >
          <p style={{
            fontFamily: F.sans,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: C.orange,
            textTransform: 'uppercase',
            margin: '0 0 14px',
          }}>
            Maklumat Kesihatan
          </p>
          <h2 style={{
            fontFamily: F.serif,
            fontSize: mobile ? 28 : 38,
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: C.black,
            margin: '0 0 18px',
          }}>
            Kenali Masalah Thyroid Anda
          </h2>
          <p style={{
            fontFamily: F.sans,
            fontSize: mobile ? 15 : 16,
            lineHeight: 1.8,
            color: C.body,
            margin: 0,
          }}>
            Masalah thyroid boleh mempengaruhi tenaga, berat badan, emosi dan pelbagai fungsi badan. Kenali simptom dan fahami keadaan thyroid anda dengan lebih baik.
          </p>
        </div>

        {/* What is thyroid */}
        <div style={{
          background: C.offWhite,
          borderRadius: 24,
          padding: mobile ? '32px 24px' : '40px 48px',
          marginBottom: mobile ? 32 : 40,
          display: 'grid',
          gridTemplateColumns: tablet ? '1fr' : '1fr 2fr',
          gap: tablet ? 24 : 48,
          alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          <div>
            
            <h3 style={{
              fontFamily: F.serif,
              fontSize: mobile ? 22 : 26,
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: C.black,
              margin: 0,
            }}>
              Apa Itu Masalah Thyroid?
            </h3>
          </div>
          <div>
            <p style={{
              fontFamily: F.sans,
              fontSize: mobile ? 15 : 16,
              lineHeight: 1.85,
              color: C.body,
              margin: '0 0 16px',
            }}>
              Kelenjar tiroid adalah organ kecil berbentuk rama-rama yang terletak di bahagian hadapan leher. Ia memainkan peranan penting dalam mengawal metabolisme badan, tahap tenaga, suhu badan dan fungsi organ-organ utama.
            </p>
            <p style={{
              fontFamily: F.sans,
              fontSize: mobile ? 15 : 16,
              lineHeight: 1.85,
              color: C.body,
              margin: 0,
            }}>
              Apabila kelenjar tiroid tidak berfungsi dengan baik — sama ada terlalu aktif atau kurang aktif — ia boleh mengganggu keseimbangan hormon dalam badan dan memberi kesan kepada kesihatan secara menyeluruh.
            </p>
          </div>
        </div>

        {/* Symptoms grid */}
        <div style={{
          marginBottom: mobile ? 32 : 40,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}>
          <p style={{
            fontFamily: F.sans,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: C.muted,
            textTransform: 'uppercase',
            margin: '0 0 20px',
          }}>
            Simptom Yang Biasa Dialami
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr 1fr' : tablet ? '1fr 1fr 1fr' : 'repeat(6,1fr)',
            gap: mobile ? 10 : 12,
          }}>
            {THYROID_SYMPTOMS.map((s, i) => (
              <ThyroidSymptomPill key={i} icon={s.icon} label={s.label} delay={i * 60} visible={visible} />
            ))}
          </div>
        </div>

        {/* Hypo vs Hyper comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: tablet ? '1fr' : '1fr 1fr',
          gap: mobile ? 16 : 20,
          marginBottom: mobile ? 40 : 56,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}>
          {THYROID_COMPARE.map((item) => (
            <div
              key={item.type}
              style={{
                background: item.bg,
                border: `1px solid ${item.border}`,
                borderRadius: 20,
                padding: mobile ? '24px 20px' : '32px 28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <p style={{
                    fontFamily: F.sans,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: item.color,
                    textTransform: 'uppercase',
                    margin: '0 0 2px',
                  }}>
                    {item.type}
                  </p>
                  <p style={{
                    fontFamily: F.serif,
                    fontSize: mobile ? 17 : 19,
                    fontWeight: 400,
                    color: C.black,
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {item.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: item.color, flexShrink: 0, marginTop: 7,
                    }} />
                    <span style={{
                      fontFamily: F.sans,
                      fontSize: mobile ? 13 : 14,
                      lineHeight: 1.65,
                      color: C.body,
                    }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Doctor advice + WhatsApp CTA */}
        <div style={{
          background: C.offWhite,
          border: `1px solid ${C.rule}`,
          borderRadius: 20,
          padding: mobile ? '28px 24px' : '36px 40px',
          display: 'flex',
          flexDirection: tablet ? 'column' : 'row',
          alignItems: tablet ? 'flex-start' : 'center',
          gap: 28,
          justifyContent: 'space-between',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
        }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}> </span>
            <div>
              <h4 style={{
                fontFamily: F.serif,
                fontSize: mobile ? 18 : 21,
                fontWeight: 400,
                color: C.black,
                margin: '0 0 8px',
                letterSpacing: '-0.01em',
              }}>
                Kepentingan Pemeriksaan Awal Doktor
              </h4>
              <p style={{
                fontFamily: F.sans,
                fontSize: mobile ? 14 : 15,
                lineHeight: 1.75,
                color: C.body,
                margin: 0,
                maxWidth: 520,
              }}>
                Masalah tiroid sering tidak disedari kerana simptomnya menyerupai keletihan biasa. Dapatkan nasihat doktor dan pemeriksaan segera jika anda mengalami simptom-simptom di atas. Pengesanan awal adalah kunci kepada pemulihan yang lebih cepat.
              </p>
            </div>
          </div>
          <ThyroidCta mobile={mobile} />
        </div>
      </div>
    </section>
  )
}

function ThyroidSymptomPill({ icon, label, delay, visible }: {
  icon: string; label: string; delay: number; visible: boolean
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.white : C.offWhite,
        border: `1px solid ${hov ? C.orangeBorder : C.rule}`,
        borderRadius: 14,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        cursor: 'default',
        transition: 'all 0.22s ease',
        boxShadow: hov ? '0 4px 16px rgba(26,26,26,0.06)' : 'none',
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      <span style={{ fontSize: 22 }}>{icon}</span>
      <span style={{
        fontFamily: F.sans,
        fontSize: 12,
        lineHeight: 1.5,
        color: C.body,
        fontWeight: 500,
      }}>
        {label}
      </span>
    </div>
  )
}

function ThyroidCta({ mobile }: { mobile: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href="https://api.whatsapp.com/send?phone=601158881639&text=Saya%20ada%20soalan%20tentang%20masalah%20tiroid%20dan%20BioVCO.%20Boleh%20bantu%3F"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: F.sans,
        fontSize: 14,
        fontWeight: 600,
        padding: '13px 28px',
        borderRadius: 100,
        background: hov ? C.greenHov : C.green,
        color: C.white,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        width: mobile ? '100%' : 'auto',
        justifyContent: 'center',
        boxShadow: hov ? `0 8px 24px ${C.greenShadow}` : `0 4px 14px rgba(39,174,96,0.2)`,
        transform: hov ? 'translateY(-1px)' : 'none',
        transition: 'all 0.22s ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <WhatsAppIcon size={16} />
      Tanya di WhatsApp
    </a>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Puan Azizah M.',
    location: 'Kuala Lumpur',
    rating: 5,
    text: 'Selepas 2 bulan guna BioVCO, saya rasa lebih bertenaga dan rambut dah berkurang gugur. Sangat berpuas hati dengan produk ni.',
  },
  {
    name: 'Encik Roslan A.',
    location: 'Selangor',
    rating: 5,
    text: 'Kolesterol saya dah lebih terkawal. Doktor pun terkejut tengok improvement. Dah rekemen kepada keluarga dan kawan-kawan.',
  },
  {
    name: 'Puan Siti H.',
    location: 'Johor Bahru',
    rating: 5,
    text: 'Tidur lebih lena, mood lebih stabil dan kulit nampak lebih berseri. Memang berbaloi untuk dicuba!',
  },
  {
    name: 'Puan Haslinda K.',
    location: 'Penang',
    rating: 5,
    text: 'Saya guna untuk masalah tiroid. Simptom penat dan rambut gugur dah berkurangan. Alhamdulillah, sangat berterima kasih.',
  },
  {
    name: 'Encik Faizal Z.',
    location: 'Sabah',
    rating: 4,
    text: 'Produk organik berkualiti tinggi. Senang digunakan dan rasanya neutral. Berat badan pun dah mula stabil.',
  },
]

function TestimonialsSection() {
  const w = useWindowWidth()
  const mobile = w < 640
  const tablet = w < 1024
  const { ref, visible } = useInView()

  return (
    <section style={{
      background: C.offWhite,
      padding: mobile ? '72px 24px' : tablet ? '88px 40px' : '104px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            marginBottom: mobile ? 40 : 60,
          }}
        >
          <p style={{
            fontFamily: F.sans,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: C.orange,
            textTransform: 'uppercase',
            margin: '0 0 14px',
          }}>
            Testimoni Pelanggan
          </p>
          <div style={{
            display: 'flex',
            flexDirection: tablet ? 'column' : 'row',
            alignItems: tablet ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: tablet ? 12 : 0,
          }}>
            <h2 style={{
              fontFamily: F.serif,
              fontSize: mobile ? 28 : 38,
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: C.black,
              margin: 0,
            }}>
              Apa Kata Mereka?
            </h2>
            <p style={{
              fontFamily: F.sans,
              fontSize: 15,
              lineHeight: 1.75,
              color: C.muted,
              margin: 0,
              maxWidth: 340,
            }}>
              Antara perkongsian dan pengalaman pelanggan kami.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : tablet ? '1fr 1fr' : 'repeat(3,1fr)',
          gap: mobile ? 16 : 20,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={i}
              testimonial={t}
              delay={i * 80}
              visible={visible}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial, delay, visible, featured,
}: {
  testimonial: typeof TESTIMONIALS[0]; delay: number; visible: boolean; featured: boolean
}) {
  const [hov, setHov] = useState(false)
  const initials = testimonial.name.split(' ').slice(0, 2).map(n => n[0]).join('')

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.white : C.white,
        border: `1px solid ${hov ? C.greenBorder : C.rule}`,
        borderRadius: 20,
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        cursor: 'default',
        transition: 'all 0.28s ease',
        boxShadow: hov ? '0 8px 32px rgba(26,26,26,0.07)' : '0 1px 4px rgba(26,26,26,0.04)',
        transform: hov ? 'translateY(-2px)' : 'none',
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{
            fontSize: 14,
            color: i < testimonial.rating ? '#F59E0B' : C.rule,
          }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: F.sans,
        fontSize: 14,
        lineHeight: 1.78,
        color: C.body,
        margin: '0 0 24px',
        flex: 1,
        fontStyle: 'italic',
      }}>
        "{testimonial.text}"
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: C.rule, marginBottom: 20 }} />

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: featured ? C.black : C.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: F.serif,
          fontSize: 14,
          color: featured ? C.white : C.muted,
          letterSpacing: '0.04em',
        }}>
          {initials}
        </div>
        <div>
          <p style={{
            fontFamily: F.sans,
            fontSize: 14,
            fontWeight: 600,
            color: C.black,
            margin: '0 0 2px',
            letterSpacing: '0.01em',
          }}>
            {testimonial.name}
          </p>
          <p style={{
            fontFamily: F.sans,
            fontSize: 12,
            color: C.muted,
            margin: 0,
          }}>
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────
function CtaBanner() {
  const w = useWindowWidth()
  const mobile = w < 640
  const tablet = w < 1024
  const { ref, visible } = useInView()

  return (
    <section style={{
      background: C.white,
      padding: mobile ? '64px 24px' : tablet ? '80px 40px' : '80px 48px',
    }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          background: C.black,
          borderRadius: mobile ? 24 : 32,
          padding: mobile ? '48px 28px' : tablet ? '60px 48px' : '64px 72px',
          display: 'grid',
          gridTemplateColumns: tablet ? '1fr' : '1fr auto',
          gap: tablet ? 36 : 48,
          alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft glow */}
        <div style={{
          position: 'absolute', right: -80, top: -80,
          width: 360, height: 360,
          background: 'radial-gradient(circle, rgba(39,174,96,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: F.sans,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: C.orange,
            textTransform: 'uppercase',
            margin: '0 0 16px',
          }}>
            BioVCO 
          </p>
          <h2 style={{
            fontFamily: F.serif,
            fontSize: mobile ? 26 : 36,
            fontWeight: 400,
            lineHeight: 1.18,
            letterSpacing: '-0.02em',
            color: C.white,
            margin: '0 0 16px',
          }}>
            Mengekalkan Dan Mengatasi Masalah Kesihatan Dengan BioVCO
          </h2>
          <p style={{
            fontFamily: F.sans,
            fontSize: 15,
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
            maxWidth: 480,
          }}>
            Kesihatan adalah harta yang paling berharga. Mulakan perjalanan kesihatan anda hari ini bersama BioVCO.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <BannerCta mobile={mobile} />
        </div>
      </div>
    </section>
  )
}

function BannerCta({ mobile }: { mobile: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href="https://api.whatsapp.com/send?phone=601158881639&text=Saya%20berminat%20nak%20beli%20BioVCO.%20Boleh%20saya%20tahu%20pakej%20dan%20cara%20untuk%20buat%20pembelian%3F"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontFamily: F.sans,
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
        padding: '15px 40px',
        borderRadius: 100,
        background: hov ? C.greenHov : C.green,
        color: C.white,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        boxShadow: hov
          ? `0 10px 32px ${C.greenShadow}`
          : `0 4px 20px rgba(39,174,96,0.22)`,
        transform: hov ? 'translateY(-1px)' : 'none',
        transition: 'all 0.22s ease',
        width: mobile ? '100%' : 'auto',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <WhatsAppIcon size={18} />
      Hubungi Kami
    </a>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  const w = useWindowWidth()
  const mobile = w < 640

  

  return (
    <footer style={{
      background: C.black,
      padding: mobile ? '48px 24px 32px' : '56px 48px 36px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          alignItems: mobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 28,
          paddingBottom: 36,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <img src={logoImg} alt="BioVCO" style={{ height: 36, width: 36, objectFit: 'contain' }} />
            <span style={{ fontFamily: F.serif, fontSize: 18, letterSpacing: '0.04em', color: C.white }}>
              BioVCO
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          alignItems: mobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <p style={{ fontFamily: F.sans, fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
             
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Tiktok · biovco', 'Shopee · samebiovco',].map(s => (
              <span key={s} style={{ fontFamily: F.sans, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialBtn({ social }: { social: { name: string; href: string; icon: React.ReactNode } }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      title={social.name}
      style={{
        width: 38, height: 38,
        borderRadius: 10,
        background: hov ? C.green : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hov ? C.green : 'rgba(255,255,255,0.1)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? C.white : 'rgba(255,255,255,0.45)',
        textDecoration: 'none',
        transition: 'all 0.22s ease',
        flexShrink: 0,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {social.icon}
    </a>
  )
}

// ─── Shared icon ──────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: F.sans, color: C.black, minWidth: 320 }}>
      <Nav />
      <Hero />
      <ThyroidSection />
      <TestimonialsSection />
      <CtaBanner />
      <Footer />
    </div>
  )
}
