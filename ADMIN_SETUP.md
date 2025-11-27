# Admin Kullanıcı Kurulumu

## 🚀 Hızlı Başlangıç

### Adım 1: Normal Kullanıcı Oluştur
1. Sitenize gidin: https://motorcycle-parts-e-commerce.vercel.app/kayit
2. Normal bir kullanıcı hesabı oluşturun
3. E-posta adresinizi onaylayın (Supabase email confirmation)

### Adım 2: Admin Yetkisi Ver

#### Yöntem 1: SQL Script ile (Önerilen)
1. Supabase Dashboard → **SQL Editor**'a gidin
2. `scripts/create_admin_user.sql` dosyasını açın
3. Script'teki e-posta adresini kendi e-postanızla değiştirin:
   ```sql
   UPDATE profiles
   SET role = 'admin'
   WHERE email = 'sizin-email@ornek.com';
   ```
4. **Run** butonuna basın

#### Yöntem 2: Table Editor ile
1. Supabase Dashboard → **Table Editor**
2. **profiles** tablosunu seçin
3. Kullanıcınızı bulun (email'e göre arayın)
4. `role` kolonuna tıklayın
5. `admin` yazın ve kaydedin

### Adım 3: Admin Paneline Giriş Yap
1. https://motorcycle-parts-e-commerce.vercel.app/giris
2. Admin kullanıcı bilgilerinizle giriş yapın
3. Admin paneline gidin: https://motorcycle-parts-e-commerce.vercel.app/admin

## 🔐 Kullanıcı Rolleri

- **customer** - Normal müşteri (varsayılan)
- **dealer** - B2B Bayi
- **admin** - Yönetici (tam yetki)

## ⚠️ Güvenlik Notları

**ÖNEMLİ:** Şu anda admin sayfaları korumalı değil. Herkes `/admin` URL'sine gidebilir.

Güvenlik için admin layout'a authentication middleware eklenmelidir. Bu özellik yakında eklenecek.

## 🛠️ Sorun Giderme

### "Role güncellenmiyor"
- Tarayıcı önbelleğini temizleyin
- Çıkış yapıp tekrar giriş yapın
- Supabase'de RLS (Row Level Security) policy'lerini kontrol edin

### "Admin paneline erişemiyorum"
- `profiles` tablosunda role'un `admin` olduğunu kontrol edin:
  ```sql
  SELECT * FROM profiles WHERE email = 'sizin-email@ornek.com';
  ```
- Kullanıcı oturumunun aktif olduğunu kontrol edin

## 📝 Ek Bilgiler

Admin kullanıcı oluşturulduktan sonra şu özelliklere erişebilirsiniz:
- Dashboard (istatistikler)
- Ürün yönetimi
- Sipariş yönetimi
- Stok takibi
- Kategori yönetimi
- Müşteri yönetimi
- Blog yönetimi
- B2B bayi yönetimi
- Kupon yönetimi
- Kargo ayarları
- Site ayarları
