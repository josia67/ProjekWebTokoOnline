import React, { useState } from "react";
import { ShoppingCart, Search, Star, Trash2 } from "lucide-react";

// Data 5 produk elektronik
const PRODUCTS = [
  {
    id: 1,
    name: "Smartphone Pro Max 128GB",
    category: "HP",
    price: 12999000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
    description:
      "Layar OLED 120Hz dengan kamera kualitas tinggi dan performa tajam.",
  },
  {
    id: 2,
    name: "Laptop Ultra Slim Core i7",
    category: "Laptop",
    price: 15499000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60",
    description:
      "Desain tipis, ringan, daya tahan baterai hingga 15 jam kerja.",
  },
  {
    id: 3,
    name: "Wireless Headphone ANC",
    category: "Audio",
    price: 2499000,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    description: "Fitur peredam bising aktif (ANC) dengan suara bass mendalam.",
  },
  {
    id: 4,
    name: "Smartwatch Fitness Series",
    category: "Wearable",
    price: 1899000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    description:
      "Lacak detak jantung, pola tidur, dan aktivitas olahraga secara akurat.",
  },
  {
    id: 5,
    name: "Smart TV 4K Ultra HD 50 Inch",
    category: "TV",
    price: 6299000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60",
    description:
      "Pengalaman menonton sinematik dengan visual tajam dan Android TV.",
  },
];

export default function ElectronicStore() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  // Tambah produk ke keranjang
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Hapus produk dari keranjang
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Hitung total belanjaan
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Filter pencarian
  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">
              ElectroTech
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <input
              type="text"
              placeholder="Cari alat elektronik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* --- HERO BANNER --- */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Peralatan Elektronik Premium & Terpercaya
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto">
            Temukan smartphone, laptop, audio, dan perangkat pintar terbaik
            dengan garansi resmi.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Daftar Produk</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold uppercase bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-lg mt-2 text-gray-900 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price and Action Button */}
              <div className="p-4 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Harga</span>
                  <span className="text-base font-bold text-gray-900">
                    {formatRupiah(product.price)}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- SIDEBAR KERANJANG (SLIDE-OVER) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Keranjang Belanja</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* List Produk Keranjang */}
              <div className="p-6 overflow-y-auto flex-1 divide-y">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Keranjang Anda masih kosong.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="py-4 flex items-center justify-between gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.quantity} x {formatRupiah(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Keranjang */}
              {cart.length > 0 && (
                <div className="p-6 border-t bg-gray-50 space-y-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      {formatRupiah(totalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => alert("Lanjut ke pembayaran!")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Checkout Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
