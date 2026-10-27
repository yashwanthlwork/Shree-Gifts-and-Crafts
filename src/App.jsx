import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { MessageCircle, Loader2, Sparkles, ShieldCheck, PhoneCall, Gift, Layers } from 'lucide-react';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZVeZ2rqmS4fSOiIS9p3NT9cz7aAHICymEMJVL0zROcbNnf57R5Khcrh8Bd30eCYJUWTqTyKKsmvqR/pub?output=csv';

const SHOP_DETAILS = {
  name: 'Shree Gifts & Crafts',
  tagline: 'Handcrafted Festive Curations & Custom Hampers',
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
    { label: 'Individual Gifts', value: 'Individual Gift Items', icon: Gift },
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
      `Hello ${SHOP_DETAILS.name}! 👋\n\nI want to place an order for:\n🎁 *${item.name}*\n💰 *Price:* ₹${item.price}\n\nPlease share customization options and delivery details.`
    );
    window.open(`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleGeneralInquiry = () => {
    const text = encodeURIComponent(
      `Hello ${SHOP_DETAILS.name}! 👋\n\nI am browsing your catalog and would like to inquire about customized hampers/return gifts.`
    );
    window.open(`https://wa.me/${SHOP_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C241E] font-sans antialiased pb-20 sm:pb-12">
      {/* Top Banner Ribbon */}
      <div className="bg-[#5B121E] text-[#F7E7DC] text-[11px] sm:text-xs py-1.5 px-3 text-center font-medium tracking-wide flex items-center justify-center gap-1.5">
        <Sparkles size={12} className="text-[#D4AF37] shrink-0" />
        <span className="truncate">Handcrafted in Bengaluru • Bulk Return Gifts Available</span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#EDE4D8] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          {/* Logo + Brand Name */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#D5C2A5] bg-[#FAF6F0] p-0.5 shadow-xs shrink-0">
              <img
                src="/logo.png"
                alt={SHOP_DETAILS.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-2xl font-serif font-bold text-[#1C1612] tracking-tight leading-none">
                {SHOP_DETAILS.name}
              </h1>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#965A40] block mt-0.5">
                Artisan Boutique • Bengaluru
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href={SHOP_DETAILS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-full border border-[#D5C2A5] bg-[#FAF7F2] text-[#5B121E] flex items-center justify-center gap-1.5 text-xs font-medium active:scale-90 transition"
              title="Instagram"
            >
              <InstagramIcon size={16} />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href={`https://wa.me/${SHOP_DETAILS.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-[#177245] hover:bg-[#125B37] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full shadow-xs active:scale-95 transition"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Intro with Centered Category Bar */}
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FBF9F5] pt-8 sm:pt-10 pb-6 px-4 text-center border-b border-[#EDE4D8]">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-semibold text-[#5B121E] uppercase tracking-widest bg-[#EFE3D3] px-3 py-1 rounded-full border border-[#E3D3C0] inline-block mb-3">
            Curated Traditional Gifting
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#231A14] leading-tight tracking-tight">
            Thoughtful Gifts for Weddings & Festive Celebrations
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5E53] mt-2.5 max-w-xl leading-relaxed">
            Handcrafted trays, Pichwai art & custom celebration hampers crafted in Bengaluru. Tap any item to order directly.
          </p>

          {/* Centered Category Pills Bar (Horizontal Scroll on Mobile) */}
          <div className="mt-6 w-full flex justify-center">
            <div className="flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar max-w-full px-2 py-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`flex items-center gap-1.5 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium transition active:scale-95 cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
                      isSelected
                        ? 'bg-[#5B121E] text-white shadow-sm ring-2 ring-[#5B121E]/20'
                        : 'bg-white text-[#574B40] border border-[#E3D7C9] hover:bg-[#F3ECE1]'
                    }`}
                  >
                    <Icon size={13} className={isSelected ? 'text-[#D4AF37]' : 'text-[#87786B]'} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#8C7D73] gap-2.5">
            <Loader2 className="animate-spin text-[#5B121E]" size={32} />
            <p className="text-xs font-medium">Curating gifts...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 text-[#8C7D73] text-xs bg-white rounded-2xl border border-[#EDE4D8] p-6 max-w-sm mx-auto">
            No items currently found in this category.
          </div>
        ) : (
          <div
            className={`grid gap-5 sm:gap-6 ${
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
                className="group bg-white rounded-2xl border border-[#E9DFD2] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#D5C4B0] transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Frame */}
                  <div className="p-2.5 sm:p-3 bg-[#FAF7F2] border-b border-[#F0E6D9]">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner">
                      <img
                        src={item.image || 'https://placehold.co/600x600?text=No+Photo'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#FAF7F2]/95 backdrop-blur-xs text-[#5B121E] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs border border-[#E4D7C8]">
                        {item.category?.toLowerCase().includes('combo')
                          ? 'Combo Hamper'
                          : 'Individual Gift'}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4 sm:p-5 flex flex-col">
                    <div className="flex items-baseline gap-1 text-[#5B121E] mb-1">
                      <span className="text-xs font-semibold">₹</span>
                      <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                        {item.price}
                      </span>
                    </div>

                    <h3 className="font-serif font-semibold text-[#201813] text-base leading-snug min-h-[2.5rem] line-clamp-2">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#73665A] mt-1.5 leading-relaxed min-h-[3rem] line-clamp-3">
                      {item.note && item.note.toLowerCase() !== 'nothing'
                        ? item.note
                        : 'Handcrafted curation. Contact us for custom packaging and bulk inquiries.'}
                    </p>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => handleOrder(item)}
                    className="w-full bg-[#177245] hover:bg-[#125B37] text-white font-medium py-2.5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-[0.98] transition shadow-xs cursor-pointer"
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

      {/* Trust Highlights */}
      <section className="border-t border-[#EDE4D8] bg-[#F7F2E9] py-10 px-4 mt-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-xl bg-white border border-[#E5DACD] flex items-center justify-center text-[#5B121E] shrink-0 shadow-xs">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2A201A] uppercase tracking-wide">
                Handcrafted Artistry
              </h4>
              <p className="text-[11px] text-[#73665A] mt-0.5">Direct from Bengaluru artisans</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-xl bg-white border border-[#E5DACD] flex items-center justify-center text-[#5B121E] shrink-0 shadow-xs">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2A201A] uppercase tracking-wide">
                Protective Packaging
              </h4>
              <p className="text-[11px] text-[#73665A] mt-0.5">Ready-to-gift celebratory presentation</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-xl bg-white border border-[#E5DACD] flex items-center justify-center text-[#5B121E] shrink-0 shadow-xs">
              <PhoneCall size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2A201A] uppercase tracking-wide">
                Custom & Bulk Orders
              </h4>
              <p className="text-[11px] text-[#73665A] mt-0.5">Flexible designs to match your budget</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-[#85766A] py-8 border-t border-[#EDE4D8] bg-[#EFE8DD] flex flex-col items-center gap-2.5">
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

      {/* Mobile Floating Quick WhatsApp Button */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden">
        <button
          onClick={handleGeneralInquiry}
          className="bg-[#177245] active:bg-[#125B37] text-white flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-medium text-xs tracking-wide active:scale-95 transition"
        >
          <MessageCircle size={18} />
          <span>Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}