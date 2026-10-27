import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { MessageCircle, Loader2, Sparkles, ShieldCheck, PhoneCall, Gift, Layers } from 'lucide-react';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZVeZ2rqmS4fSOiIS9p3NT9cz7aAHICymEMJVL0zROcbNnf57R5Khcrh8Bd30eCYJUWTqTyKKsmvqR/pub?output=csv';

const SHOP_DETAILS = {
  name: 'Shree Gifts & Crafts',
  tagline: 'Handcrafted Festive Curations, Return Gifts & Custom Hampers',
  whatsappNumber: '918050561354',
  instagramUrl: 'https://www.instagram.com/shree_gifts_and_crafts/',
  location: 'Bengaluru, India',
};

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { label: 'All Curations', value: 'All', icon: Sparkles },
    { label: 'Individual Gift Items', value: 'Individual Gift Items', icon: Gift },
    { label: 'Combos & Hampers', value: 'Combos', icon: Layers },
  ];

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const cleanedData = results.data
              .map((row) => {
                const cleaned = {};
                Object.keys(row).forEach((key) => {
                  cleaned[key.trim().toLowerCase()] = row[key]?.trim();
                });
                return cleaned;
              })
              .filter((row) => row.name);
            setItems(cleanedData);
            setLoading(false);
          },
          error: () => setLoading(false),
        });
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => {
          const cat = (item.category || '').toLowerCase();
          if (activeCategory === 'Individual Gift Items') return cat.includes('individual');
          if (activeCategory === 'Combos') return cat.includes('combo');
          return false;
        });

  const handleOrder = (item) => {
    const text = encodeURIComponent(
      `Hello ${SHOP_DETAILS.name}! 👋\n\nI am interested in ordering:\n🎁 *${item.name}*\n💰 *Price:* ₹${item.price}\n\nPlease share availability, bulk customization options, and delivery timeline.`
    );
    window.open(`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C241E] font-sans antialiased flex flex-col justify-between">
      <div>
        {/* Top Gold & Maroon Ribbon */}
        <div className="bg-[#5B121E] text-[#F7E7DC] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#4A0E18]">
          <Sparkles size={14} className="text-[#D4AF37]" />
          <span>Handcrafted in Bengaluru • Bulk Festive & Wedding Return Gifts Available</span>
        </div>

        {/* Primary Navbar */}
        <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EDE4D8] shadow-xs">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D5C2A5] bg-[#FAF6F0] p-0.5 shadow-xs shrink-0">
                <img
                  src="/logo.png"
                  alt={SHOP_DETAILS.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1612] tracking-tight leading-none">
                  {SHOP_DETAILS.name}
                </h1>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#965A40] block mt-1">
                  Artisan Boutique • Bengaluru
                </span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href={SHOP_DETAILS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-[#FAF7F2] hover:bg-[#F2E8DC] text-[#5B121E] border border-[#D5C2A5] text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-full shadow-2xs hover:shadow-xs transition active:scale-95 cursor-pointer"
                title="Follow us on Instagram"
              >
                <InstagramIcon size={16} />
                <span className="hidden sm:inline">Instagram</span>
              </a>

              <a
                href={`https://wa.me/${SHOP_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#177245] hover:bg-[#125B37] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:shadow transition active:scale-95 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b border-[#EDE4D8] bg-linear-to-b from-[#F6EFE6] to-[#FBF9F5] pt-12 pb-10 px-6">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs font-semibold text-[#5B121E] uppercase tracking-widest bg-[#EFE3D3] px-3.5 py-1 rounded-full border border-[#E3D3C0] inline-block mb-3.5">
              Curated Traditional Handicrafts
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#231A14] tracking-tight leading-tight">
              Thoughtful Gifting for Every Celebration
            </h2>

            <p className="text-sm sm:text-base text-[#6B5E53] mt-3.5 max-w-xl mx-auto leading-relaxed">
              From hand-painted Pichwai & Tanjore trays to bespoke festive hampers, explore our made-to-order collections designed for return gifts, pujas, and milestone events.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`flex items-center gap-2 text-xs sm:text-sm px-5 py-2.5 rounded-full font-medium transition cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-[#5B121E] text-white shadow-sm ring-2 ring-[#5B121E]/20'
                        : 'bg-white text-[#574B40] border border-[#E3D7C9] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    <Icon size={14} className={isSelected ? 'text-[#D4AF37]' : 'text-[#87786B]'} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Products Grid */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-28 text-[#8C7D73] gap-3">
              <Loader2 className="animate-spin text-[#5B121E]" size={36} />
              <p className="text-sm font-medium">Connecting live catalog...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 text-[#8C7D73] text-sm bg-white rounded-3xl border border-[#EDE4D8] p-8 max-w-md mx-auto shadow-xs">
              No items currently listed in this category.
            </div>
          ) : (
            <div
              className={`grid gap-8 ${
                filteredItems.length === 1
                  ? 'max-w-sm mx-auto'
                  : filteredItems.length === 2
                  ? 'max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl border border-[#E9DFD2] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D5C4B0] transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area with Inner Frame */}
                    <div className="p-3.5 bg-[#FAF7F2] border-b border-[#F0E6D9]">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner">
                        <img
                          src={item.image || 'https://placehold.co/600x600?text=No+Photo'}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs text-[#5B121E] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs border border-[#E4D7C8]">
                          {item.category?.toLowerCase().includes('combo')
                            ? 'Combo Hamper'
                            : 'Individual Gift'}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col">
                      <div className="flex items-baseline gap-1 text-[#5B121E] mb-1.5">
                        <span className="text-xs font-semibold">₹</span>
                        <span className="text-2xl font-serif font-bold tracking-tight">
                          {item.price}
                        </span>
                      </div>

                      <h3 className="font-serif font-semibold text-[#201813] text-base sm:text-lg leading-snug group-hover:text-[#5B121E] transition min-h-[3rem] line-clamp-2">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#73665A] mt-2 leading-relaxed min-h-[3.25rem] line-clamp-3">
                        {item.note && item.note.toLowerCase() !== 'nothing'
                          ? item.note
                          : 'Handcrafted curation. Contact us for custom packaging and bulk inquiries.'}
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleOrder(item)}
                      className="w-full bg-[#177245] hover:bg-[#125B37] text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm transition duration-200 shadow-xs hover:shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <MessageCircle size={16} />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Brand Value Pillars */}
        <section className="border-t border-[#EDE4D8] bg-[#F7F2E9] py-12 px-6 mt-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5DACD] flex items-center justify-center text-[#5B121E] shrink-0 shadow-xs">
                <Sparkles size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2A201A] uppercase tracking-wider">
                  Handcrafted Artistry
                </h4>
                <p className="text-xs text-[#73665A] mt-0.5">Custom created by skilled artisans</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5DACD] flex items-center justify-center text-[#5B121E] shrink-0 shadow-xs">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2A201A] uppercase tracking-wider">
                  Bespoke Packaging
                </h4>
                <p className="text-xs text-[#73665A] mt-0.5">Secure, decorative, ready-to-gift boxes</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5DACD] flex items-center justify-center text-[#5B121E] shrink-0 shadow-xs">
                <PhoneCall size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2A201A] uppercase tracking-wider">
                  Direct Inquiries
                </h4>
                <p className="text-xs text-[#73665A] mt-0.5">Instant quotes for custom & bulk orders</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-[#85766A] py-8 border-t border-[#EDE4D8] bg-[#EFE8DD] flex flex-col items-center gap-3">
        <img
          src="/logo.png"
          alt="Shree Gifts"
          className="w-10 h-10 rounded-full object-cover border border-[#D5C2A5] opacity-90 shadow-2xs"
        />
        <div>
          <p className="font-serif font-bold text-[#2A201A] text-sm">
            {SHOP_DETAILS.name}
          </p>
          <p className="text-[11px] mt-0.5">
            {SHOP_DETAILS.location} • Handcrafted Gifting Catalog
          </p>
        </div>

        <a
          href={SHOP_DETAILS.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B121E] hover:underline mt-1"
        >
          <InstagramIcon size={14} />
          <span>Follow @shree_gifts_and_crafts on Instagram</span>
        </a>
      </footer>
    </div>
  );
}