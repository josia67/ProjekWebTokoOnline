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
  return (
    <div>
      {/* NAVBAR */}
      <header>
        <div className="nav-container">
          <div className="logo">DiJotosTech</div>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Cari produk"
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
