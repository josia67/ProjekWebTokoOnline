import React from "react";

// Data 5 Produk Elektronik
const PRODUCTS = [
  {
    id: 1,
    name: "Headphone JBL",
    category: "Audio",
    price: "Rp 750.000",
    rating: "4.8",
    image: "Headphone JBL.jpg",
    description: "Headphone berkualitas tinggi dengan suara yang jernih.",
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
    name: "Smartwatch Fitness Series",
    category: "Wearable",
    price: "Rp 1.899.000",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    description: "Lacak detak jantung, pola tidur, dan aktivitas olahraga.",
  },
  {
    id: 5,
    name: 'Smart TV 4K Ultra HD 50"',
    category: "TV",
    price: "Rp 6.299.000",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60",
    description: "Pengalaman menonton sinematik dengan visual tajam.",
  },
];

export default function App() {
  return (
    <div>
      {/* NAVBAR */}
      <header>
        <div className="nav-container">
          <div className="logo">DiJotosTech</div>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Cari produk elektronik..."
              className="search-input"
            />
          </div>
          <button className="cart-btn">🛒</button>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="hero">
        <h1>Produk Elektronik Pilihan</h1>
        <p>
          Temukan gadget dan peralatan elektronik terbaik dengan harga
          terjangkau.
        </p>
      </section>

      {/* DAFTAR PRODUK */}
      <main className="container">
        <h2 className="section-title">Produk Populer</h2>

        <div className="grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="card">
              <div>
                <img src={product.image} alt={product.name} />
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="rating-box">⭐ {product.rating}</div>
              </div>

              <div className="card-footer">
                <div>
                  <span className="price-label">Harga</span>
                  <span className="price">{product.price}</span>
                </div>
                <button>+ Keranjang</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
