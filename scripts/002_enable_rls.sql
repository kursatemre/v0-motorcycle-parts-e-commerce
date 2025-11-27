-- Row Level Security politikaları

-- Profiles RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Addresses RLS
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own addresses" ON addresses
  FOR ALL USING (auth.uid() = user_id);

-- Orders RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- Carts RLS
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own cart" ON carts
  FOR ALL USING (auth.uid() = user_id OR session_id IS NOT NULL);

-- Cart items RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own cart items" ON cart_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND (carts.user_id = auth.uid() OR carts.session_id IS NOT NULL))
  );

-- Favorites RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- Public read access for products, categories, brands etc.
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active brands" ON brands
  FOR SELECT USING (is_active = true);

ALTER TABLE vehicle_brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active vehicle brands" ON vehicle_brands
  FOR SELECT USING (is_active = true);

ALTER TABLE vehicle_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active vehicle models" ON vehicle_models
  FOR SELECT USING (is_active = true);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view product images" ON product_images
  FOR SELECT USING (true);

ALTER TABLE product_vehicle_compatibility ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view compatibility" ON product_vehicle_compatibility
  FOR SELECT USING (true);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active coupons" ON coupons
  FOR SELECT USING (is_active = true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site settings" ON site_settings
  FOR SELECT USING (true);

-- Stock movements - only admins
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage stock movements" ON stock_movements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
