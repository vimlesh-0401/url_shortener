
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: url_shortener
  username:
  password:

test:
  <<: *default
  database: url_shortener_test