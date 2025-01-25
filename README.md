# Gem [next_rails_scaffold](https://github.com/raphox/next_rails_scaffold) sample app

## Setup

Create the Rails app:

```
rails new my_api --api
```

Install dependencies:

```
# Uncomment the `gem "rack-cors"` line in the Gemfile.
bundle add foreman --group "development"
bundle add next_rails_scaffold
```

Allow to local environment to access the Rails app from any resource.:

```ruby
# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins Rails.env.local? ? "*" : "example.com" # Change `example.com` as you need.

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

Create your `Procfile.local`:

```
# Procfile.local

api: bundle exec rails server -p $PORT -b 0.0.0.0
next: cd ./frontend && NEXT_PUBLIC_API_URL=http://0.0.0.0:$(( PORT - 100 ))/api yarn dev -p $PORT -H 0.0.0.0
```

## Running

After to [setup](#setup), run to following command to start the Rails and Next.js applications:

```
foreman start -f Procfile.local --port=8000
```

> **TIP:** Use `foreman start -f Procfile.github --port=8000` on Github.
