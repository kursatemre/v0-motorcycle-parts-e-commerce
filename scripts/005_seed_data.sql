-- Örnek veriler

-- Kategoriler
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Motor Parçaları', 'motor-parcalari', 'Motor yedek parçaları', 1),
('Fren Sistemi', 'fren-sistemi', 'Fren balataları, diskler ve hidrolik parçalar', 2),
('Elektrik & Aydınlatma', 'elektrik-aydinlatma', 'Far, sinyal, aküler ve elektrik aksamı', 3),
('Süspansiyon', 'suspansiyon', 'Amortisör, yay ve süspansiyon parçaları', 4),
('Şanzıman & Debriyaj', 'sanziman-debriyaj', 'Vites kutusu ve debriyaj parçaları', 5),
('Kaporta & Plastik', 'kaporta-plastik', 'Grenaj, sele, çamurluk ve plastik aksamlar', 6),
('Lastik & Jant', 'lastik-jant', 'Motosiklet lastikleri ve jantlar', 7),
('Yağ & Bakım', 'yag-bakim', 'Motor yağları, filtreler ve bakım ürünleri', 8)
ON CONFLICT (slug) DO NOTHING;

-- Markalar
INSERT INTO brands (name, slug, logo_url) VALUES
('NGK', 'ngk', '/placeholder.svg?height=60&width=120'),
('Bosch', 'bosch', '/placeholder.svg?height=60&width=120'),
('Brembo', 'brembo', '/placeholder.svg?height=60&width=120'),
('Motul', 'motul', '/placeholder.svg?height=60&width=120'),
('K&N', 'kn', '/placeholder.svg?height=60&width=120&N+logo='),
('Pirelli', 'pirelli', '/placeholder.svg?height=60&width=120'),
('Showa', 'showa', '/placeholder.svg?height=60&width=120'),
('Yuasa', 'yuasa', '/placeholder.svg?height=60&width=120')
ON CONFLICT (slug) DO NOTHING;

-- Araç Markaları
INSERT INTO vehicle_brands (name, slug, logo_url) VALUES
('Honda', 'honda', '/placeholder.svg?height=60&width=120'),
('Yamaha', 'yamaha', '/placeholder.svg?height=60&width=120'),
('Kawasaki', 'kawasaki', '/placeholder.svg?height=60&width=120'),
('Suzuki', 'suzuki', '/placeholder.svg?height=60&width=120'),
('BMW', 'bmw', '/placeholder.svg?height=60&width=120'),
('KTM', 'ktm', '/placeholder.svg?height=60&width=120'),
('Ducati', 'ducati', '/placeholder.svg?height=60&width=120'),
('Triumph', 'triumph', '/placeholder.svg?height=60&width=120')
ON CONFLICT (slug) DO NOTHING;

-- Araç Modelleri (Honda örneği)
INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'CBR 600RR', 'cbr-600rr', 2003, 2024 FROM vehicle_brands WHERE slug = 'honda'
ON CONFLICT (brand_id, slug) DO NOTHING;

INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'CBR 1000RR', 'cbr-1000rr', 2004, 2024 FROM vehicle_brands WHERE slug = 'honda'
ON CONFLICT (brand_id, slug) DO NOTHING;

INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'CB 650R', 'cb-650r', 2019, 2024 FROM vehicle_brands WHERE slug = 'honda'
ON CONFLICT (brand_id, slug) DO NOTHING;

-- Yamaha modelleri
INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'YZF-R1', 'yzf-r1', 1998, 2024 FROM vehicle_brands WHERE slug = 'yamaha'
ON CONFLICT (brand_id, slug) DO NOTHING;

INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'MT-07', 'mt-07', 2014, 2024 FROM vehicle_brands WHERE slug = 'yamaha'
ON CONFLICT (brand_id, slug) DO NOTHING;

INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'MT-09', 'mt-09', 2014, 2024 FROM vehicle_brands WHERE slug = 'yamaha'
ON CONFLICT (brand_id, slug) DO NOTHING;

-- Kawasaki modelleri
INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'Ninja ZX-6R', 'ninja-zx-6r', 1995, 2024 FROM vehicle_brands WHERE slug = 'kawasaki'
ON CONFLICT (brand_id, slug) DO NOTHING;

INSERT INTO vehicle_models (brand_id, name, slug, year_start, year_end)
SELECT id, 'Z900', 'z900', 2017, 2024 FROM vehicle_brands WHERE slug = 'kawasaki'
ON CONFLICT (brand_id, slug) DO NOTHING;

-- Site ayarları
INSERT INTO site_settings (key, value) VALUES
('general', '{"site_name": "MotoParça", "phone": "0850 123 45 67", "email": "info@motoparca.com", "address": "İstanbul, Türkiye"}'),
('shipping', '{"free_shipping_limit": 500, "default_shipping_cost": 29.90, "express_shipping_cost": 49.90}'),
('social', '{"instagram": "https://instagram.com/motoparca", "facebook": "https://facebook.com/motoparca", "youtube": "https://youtube.com/motoparca"}')
ON CONFLICT (key) DO NOTHING;
