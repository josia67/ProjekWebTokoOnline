import React, { useState } from "react";

// Data Produk
const PRODUCTS = [
  {
    id: 1,
    name: "Headphone JBL",
    category: "Audio",
    price: "Rp 750.000",
    rating: "4.8",
    image: "Headphone JBL.jpg",
    description: "Headphone berkualitas tinggi dengan suara yang jernih",
  },
  {
    id: 2,
    name: "Keyboard Noir",
    category: "Computer",
    price: "Rp 950.000",
    rating: "4.9",
    image: "Keyboard Noir.jpg",
    description: "Keyboard dengan pencahayaan RGB dan tampilan gagah",
  },
  {
    id: 3,
    name: "Laptop Asus ROG Strix",
    category: "Computer",
    price: "Rp 37.000.000",
    rating: "4.7",
    image: "Laptop Asus ROG Strix.jpg",
    description: "Laptop gaming dengan performa tinggi",
  },
  {
    id: 4,
    name: "Mouse Razer Viper V3 Pro",
    category: "Computer",
    price: "Rp 3.200.000",
    rating: "4.6",
    image: "MouseRazerViper.jpg",
    description: "Mouse gaming dengan sensor presisi tinggi",
  },
  {
    id: 5,
    name: "ASUS ROG Astral GeForce RTX 5090",
    category: "Computer",
    price: "Rp 122.600.000",
    rating: "4.8",
    image: "RTX5090.jpg",
    description: "Kartu grafis dengan performa gaming 4K dan rendering berat",
  },
  {
    id: 6,
    name: "Speaker JBL",
    category: "Audio",
    price: "Rp 600.000",
    rating: "4.8",
    image: "Speaker JBL.jpg",
    description: "Speaker dengan kualitas suara yang luar biasa",
  },
];

export default function App() {
  // STATE UNTUK PENCARIAN
  const [searchTerm, setSearchTerm] = useState("");

  // STATE UNTUK MENYIMPAN DAFTAR PRODUK DI KERANJANG
  const [cartItems, setCartItems] = useState([]);

  // STATE UNTUK HALAMAN AKTIF ("home" atau "cart")
  const [currentView, setCurrentView] = useState("home");

  // Fungsi saat tombol "+ Keranjang" diklik
  const handleAddToCart = (product) => {
    // Menambahkan produk yang dipilih ke dalam array cartItems
    setCartItems([...cartItems, product]);
  };

  // LOGIKA FILTER PENCARIAN
  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      {/*BAR NAVIGASI*/}
      <header>
        <div className="nav-container">
          <div
            className="logo"
            style={{ cursor: "pointer" }}
            onClick={() => setCurrentView("home")}
          >
            DiJotosTech
          </div>

          {/* KOTAK PENCARIAN (Hanya tampil di halaman Beranda) */}
          {currentView === "home" && (
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Cari produk atau kategori"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {/* TOMBOL NAVIGASI DI KANAN ATAS */}
          {currentView === "home" ? (
            <button className="cart-btn" onClick={() => setCurrentView("cart")}>
              🛒{" "}
              <span style={{ marginLeft: "4px", fontWeight: "bold" }}>
                {cartItems.length}
              </span>
            </button>
          ) : (
            <button className="cart-btn" onClick={() => setCurrentView("home")}>
              Kembali ke Beranda
            </button>
          )}
        </div>
      </header>

      {/* KONDISI TAMPILAN HALAMAN (BERANDA VS KERANJANG) */}
      {currentView === "home" ? (
        // === TAMPILAN BERANDA ===
        <>
          <section className="nmToko">
            <h1>Toko Produk Elektronik</h1>
            <p>
              Gadget dan peralatan elektronik terbaik dengan harga terjangkau
            </p>
          </section>

          <main className="container">
            <h2 className="section-title">Produk Populer</h2>

            {filteredProducts.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#64748b",
                  padding: "2rem",
                }}
              >
                Produk yang anda cari tidak ada
              </p>
            ) : (
              <div className="grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card">
                    <div>
                      <img src={product.image} alt={product.name} />
                      <span className="product-category">
                        {product.category}
                      </span>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-desc">{product.description}</p>
                      <div className="rating-box">⭐ {product.rating}</div>
                    </div>

                    <div className="card-footer">
                      <div>
                        <span className="price-label">Harga</span>
                        <span className="price">{product.price}</span>
                      </div>
                      <button onClick={() => handleAddToCart(product)}>
                        + Keranjang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      ) : (
        // === TAMPILAN HALAMAN KERANJANG ===
        <main className="container" style={{ marginTop: "2rem" }}>
          <h2 className="section-title">Keranjang Belanja</h2>

          {cartItems.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}
            >
              <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                Keranjangmu masih kosong
              </p>
              <button
                onClick={() => setCurrentView("home")}
                style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              >
                Belanja Sekarang
              </button>
            </div>
          ) : (
            <div className="grid">
              {cartItems.map((item, index) => (
                <div key={index} className="card">
                  <div>
                    <img src={item.image} alt={item.name} />
                    <span className="product-category">{item.category}</span>
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-desc">{item.description}</p>
                    <div className="rating-box">⭐ {item.rating}</div>
                  </div>

                  <div className="card-footer">
                    <div>
                      <span className="price-label">Harga</span>
                      <span className="price">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
