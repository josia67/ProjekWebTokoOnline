import React from "react";
import { useTokoOnline } from "./useTokoOnline";

export default function TokoOnline() {
  const {
    currentView,
    setCurrentView,
    selectedProduct,
    handleViewDetail,
    cartItems,
    searchTerm,
    setSearchTerm,
    notification,
    formData,
    formErrors,
    handleInputChange,
    handleFormSubmit,
    filteredProducts,
    totalPrice,
    handleAddToCart,
    handleRemoveFromCart,
    formatRupiah,
  } = useTokoOnline();

  return (
    <div>
      {/* ================= 1. BAR NAVIGASI ================= */}
      <header>
        <div className="nav-container">
          <div className="logo" onClick={() => setCurrentView("home")}>
            DiJotosTech
          </div>

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

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="cart-btn" onClick={() => setCurrentView("home")}>
              Beranda
            </button>
            <button className="cart-btn" onClick={() => setCurrentView("cart")}>
              🛒 <strong>{cartItems.length}</strong>
            </button>
          </div>
        </div>
      </header>

      {/* ================= 2. HALAMAN BERANDA ================= */}
      {currentView === "home" && (
        <main className="container">
          <section className="nmToko">
            <h1>Toko Produk Elektronik</h1>
            <p>
              Gadget dan peralatan elektronik terbaik dengan harga terjangkau
            </p>
          </section>

          <h2 className="section-title" style={{ marginTop: "1.5rem" }}>
            Produk Tersedia
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="empty-cart">Produk yang anda cari tidak ditemukan</p>
          ) : (
            <div className="grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card">
                  <div
                    onClick={() => handleViewDetail(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.image} alt={product.name} />
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                    <div className="rating-box">⭐ {product.rating}</div>
                  </div>

                  <div className="card-footer">
                    <div>
                      <span className="price-label">Harga</span>
                      <span className="price">
                        {formatRupiah(product.price)}
                      </span>
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
      )}

      {/* ================= 3. HALAMAN DETAIL PRODUK ================= */}
      {currentView === "detail" && selectedProduct && (
        <main className="container" style={{ marginTop: "1.5rem" }}>
          <button className="btn-back" onClick={() => setCurrentView("home")}>
            ← Kembali ke Beranda
          </button>
          <div className="detail-container">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="detail-img"
            />
            <div className="detail-info">
              <span className="product-category">
                {selectedProduct.category}
              </span>
              <h2>{selectedProduct.name}</h2>
              <div className="rating-box" style={{ margin: "0.5rem 0" }}>
                ⭐ {selectedProduct.rating} / 5.0
              </div>
              <h3 className="detail-price">
                {formatRupiah(selectedProduct.price)}
              </h3>
              <p className="detail-description">
                {selectedProduct.description}
              </p>
              <button
                className="btn-add-detail"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                + Tambah ke Keranjang
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ================= 4. HALAMAN KERANJANG ================= */}
      {currentView === "cart" && (
        <main className="container" style={{ marginTop: "1.5rem" }}>
          <h2 className="section-title">Keranjang Belanja</h2>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Keranjangmu masih kosong</p>
              <button onClick={() => setCurrentView("home")}>
                Belanja Sekarang
              </button>
            </div>
          ) : (
            <>
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
                        <span className="price">
                          {formatRupiah(item.price)}
                        </span>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-summary">
                <div>
                  <span className="checkout-summary-text">
                    Total ({cartItems.length} barang):
                  </span>
                  <div className="checkout-summary-price">
                    {formatRupiah(totalPrice)}
                  </div>
                </div>
                <button
                  className="btn-checkout"
                  onClick={() => setCurrentView("checkout")}
                >
                  Lanjut ke Pembayaran →
                </button>
              </div>
            </>
          )}
        </main>
      )}

      {/* ================= 5. HALAMAN CHECKOUT & FORMULIR ================= */}
      {currentView === "checkout" && (
        <main className="container" style={{ marginTop: "1.5rem" }}>
          <button className="btn-back" onClick={() => setCurrentView("cart")}>
            ← Kembali ke Keranjang
          </button>
          <h2 className="section-title">Formulir Pemesanan & Pengiriman</h2>

          <div className="checkout-grid">
            {/* Form Input Data */}
            <form onSubmit={handleFormSubmit} className="checkout-form">
              <div className="form-group">
                <label>Nama Lengkap *</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                  className={formErrors.nama ? "input-error" : ""}
                />
                {formErrors.nama && (
                  <span className="error-text">{formErrors.nama}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="contoh@email.com"
                  className={formErrors.email ? "input-error" : ""}
                />
                {formErrors.email && (
                  <span className="error-text">{formErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Nomor Telepon / WA *</label>
                <input
                  type="text"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleInputChange}
                  placeholder="08123456789"
                  className={formErrors.telepon ? "input-error" : ""}
                />
                {formErrors.telepon && (
                  <span className="error-text">{formErrors.telepon}</span>
                )}
              </div>

              <div className="form-group">
                <label>Alamat Pengiriman Lengkap *</label>
                <textarea
                  name="alamat"
                  rows="3"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  placeholder="Jalan, No. Rumah, Kecamatan, Kota"
                  className={formErrors.alamat ? "input-error" : ""}
                ></textarea>
                {formErrors.alamat && (
                  <span className="error-text">{formErrors.alamat}</span>
                )}
              </div>

              <div className="form-group">
                <label>Metode Pembayaran</label>
                <select
                  name="pembayaran"
                  value={formData.pembayaran}
                  onChange={handleInputChange}
                >
                  <option value="transfer">Transfer Bank (BCA/Mandiri)</option>
                  <option value="e-wallet">E-Wallet (Gopay/OVO/Dana)</option>
                  <option value="cod">Bayar di Tempat (COD)</option>
                </select>
              </div>

              <button type="submit" className="btn-submit-order">
                Konfirmasi & Bayar
              </button>
            </form>

            {/* Ringkasan Belanja */}
            <div className="order-summary-card">
              <h3>Ringkasan Pesanan</h3>
              <p style={{ margin: "0.5rem 0", color: "#64748b" }}>
                Total Barang: {cartItems.length}
              </p>
              <hr style={{ margin: "1rem 0", borderColor: "#e2e8f0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Total Tagihan:</strong>
                <span
                  className="checkout-summary-price"
                  style={{ fontSize: "1.2rem" }}
                >
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ================= 6. FOOTER ================= */}
      <footer className="footer">
        <div className="container footer-container">
          {/* Kolom 1: Profil Toko */}
          <div className="footer-col">
            <h3 className="footer-logo">DiJotosTech</h3>
            <p className="footer-desc">
              Pusat belanja gadget terpercaya dengan harga terbaik dan garansi
              resmi.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => setCurrentView("home")}>Beranda</button>
              </li>
              <li>
                <button onClick={() => setCurrentView("cart")}>
                  Keranjang Belanja
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Sosial Media */}
          <div className="footer-col">
            <h4>Ikuti Kami</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/dito.dito.dito.dito/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📸 Instagram Dito
              </a>
              <a
                href="https://www.instagram.com/josia_sianturi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📸 Instagram Josia
              </a>
            </div>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div className="footer-col">
            <h4>Hubungi Kami</h4>
            <p>📧 @dijotostech@gmail.com</p>
            <p>📞 +62 877 1474 8345</p>
            <p>📞 +62 878 1805 8942</p>
            <p>📍 Yogyakarta, Indonesia</p>
          </div>
        </div>

        {/* Hak Cipta / Copyright */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} DiJotosTech. All rights reserved.
          </p>
        </div>
      </footer>

      {/* TOAST NOTIFIKASI */}
      {notification && <div className="toast-notification">{notification}</div>}
    </div>
  );
}
