# URL SHORTENER
 This application is build for creating shorten url for given links and urls
 **URL Shortener** takes just one input i.e. target url and generates a dilute(slug) for that url.

 ### What you need
  * ruby 2.3.3
  * rails 5.1.4
  * postgresql  0.18

  ### Additional GEMS
 ```
  gem 'angularjs-rails', '~> 1.5', '>= 1.5.6'
  gem 'angularjs-rails-resource', '~> 2.0'
  gem 'angular_rails_csrf'
  gem 'jquery-rails'
  gem 'bootstrap-sass', '~> 3.3.6'
  ```
  ### SETUP AND CONFIGURATIONS
  1. clone form command prompt
     ```
       git clone git@github.com:vimlesh-0401/url_shortener.git
     ```
  2. goto project directory

  3. rename config/database.yml.ex to config/database.yml
     ```
      mv config/datababse.yml.ex config/database.yml
     ```
  4. add your database configuration
    * username
    * password
  5. install bundle
     ```
      bundle install
     ```
   6. Run migration
      ```
        rails db:create db:migrate
      ```
      if you already have database created then you can simply run
        ```
          rails db:migrate
        ```
   7. Now start server
      ```
        rails s
      ```

   8. Visit [http://localhost:3000](http://localhost:3000/)

