
ALTER TABLE user_actions DROP CONSTRAINT IF EXISTS user_actions_user_id_fkey;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE wishlist DROP CONSTRAINT IF EXISTS wishlist_user_id_fkey;

ALTER TABLE users ALTER COLUMN id TYPE VARCHAR(255);
ALTER TABLE user_actions ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE orders ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE reviews ALTER COLUMN user_id TYPE VARCHAR(255);
ALTER TABLE wishlist ALTER COLUMN user_id TYPE VARCHAR(255);

ALTER TABLE user_actions ADD CONSTRAINT user_actions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE orders ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE wishlist ADD CONSTRAINT wishlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
