-- Admin kullanıcı oluşturma scripti
--
-- KULLANIM:
-- 1. Supabase Dashboard -> SQL Editor'a gidin
-- 2. Bu scripti kopyalayıp yapıştırın
-- 3. E-posta adresini kendinizinkiyle değiştirin
-- 4. Run (Çalıştır) butonuna basın
--
-- NOT: Önce Supabase Auth'tan normal kullanıcı oluşturmalısınız!
-- Siteye kayıt olun: https://motorcycle-parts-e-commerce.vercel.app/kayit
-- Sonra aşağıdaki script ile role'u admin yapın.

-- Mevcut kullanıcıyı admin yap
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@example.com'; -- BU E-POSTA ADRESİNİ DEĞİŞTİRİN!

-- Kontrol et
SELECT id, email, role, created_at
FROM profiles
WHERE email = 'admin@example.com'; -- BU E-POSTA ADRESİNİ DEĞİŞTİRİN!
