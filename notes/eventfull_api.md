# Eventful React/Rails project

## Day 1

[Devise JWT Tutorial](https://github.com/dakotalmartinez/rails-devise-jwt-tutorial) up to and including the Create User Model section.

Uncomment rack-cors in gemfile

copy this into cors.rb config

```rb
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource(
     '*',
     headers: :any,
     expose: ["Authorization"],
     methods: [:get, :patch, :put, :delete, :post, :options, :show]
    )
  end
end
```

Add to Gemfile:
```rb
gem 'devise'
gem 'devise-jwt'
gem 'jsonapi-serializer'
```

[JSON API Serializer](https://github.com/jsonapi-serializer/jsonapi-serializer)

Run 
```bash
bundle install
```

Configure devise

```bash
rails g devise:install
```

Find this line in devise.rb initializer:
 
```
# config.navigational_formats = ['*/*', :html]
```
and replace it with this:

```rb
config.navigational_formats = []
```


Also, add the following line to config/environments/development.rb

```rb
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```

## Create a Devise User

You can create a devise model to represent a user. It can be named as anything. So, I’m gonna be going ahead with User. Run the following command to create User model.

$ rails generate devise User
Then run migrations using,

$ rails db:create
$ rails db:migrate

## Adding Groups

```bash
rails g scaffold Group name
```

For our app, we don't need update and destroy for groups so we'll remove the udpate and destroy actions from the GroupsController and update the routes.rb file like so:

```rb
resources :groups, except: [:update, :destroy]
```

WE can test out our routes by running 

```bash
rails routes | grep groups
```

We get something like this: 

```bash
 groups GET    /groups(.:format)          groups#index
        POST   /groups(.:format)          groups#create
  group GET    /groups/:id(.:format)      groups#show
```

We can run the migration to add the table 

```bash
rails db:migrate
```

## Add Events

At this point, we'll take a look at [another tutorial](https://github.com/DakotaLMartinez/active_storage_with_api_tutorial/tree/main)

We'll start by adding active_storage migrations:

```bash
rails active_storage:install
```

This adds a migration that looks like this::

```rb
# This migration comes from active_storage (originally 20170806125915)
class CreateActiveStorageTables < ActiveRecord::Migration[5.2]
  def change
    create_table :active_storage_blobs do |t|
      t.string   :key,          null: false
      t.string   :filename,     null: false
      t.string   :content_type
      t.text     :metadata
      t.string   :service_name, null: false
      t.bigint   :byte_size,    null: false
      t.string   :checksum,     null: false
      t.datetime :created_at,   null: false

      t.index [ :key ], unique: true
    end

    create_table :active_storage_attachments do |t|
      t.string     :name,     null: false
      t.references :record,   null: false, polymorphic: true, index: false
      t.references :blob,     null: false

      t.datetime :created_at, null: false

      t.index [ :record_type, :record_id, :name, :blob_id ], name: "index_active_storage_attachments_uniqueness", unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end

    create_table :active_storage_variant_records do |t|
      t.belongs_to :blob, null: false, index: false
      t.string :variation_digest, null: false

      t.index %i[ blob_id variation_digest ], name: "index_active_storage_variant_records_uniqueness", unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end
  end
end

```

We can run `rails db:migrate` to add these tables to our database and enable support for file uploads.

## Creating a model for attaching uploads
In order to test this out, we're going to need a model we can attach uploads to. For this example, we'll be creating an Event resource that can have a poster attached.

```bash
rails g scaffold Event name start_time:datetime end_time:datetime location
```
Now, we'll need to make a couple of changes to allow uploading a poster. First, we'll add a macro to the Event model:
```rb
class Event < ApplicationRecord
  has_one_attached :poster
end
```
Next, we'll need to permit a poster through the params in the EventsController
```rb
def event_params
  params.require(:event).permit(:name, :start_time, :end_time, :location, :poster)
end
```
Before we move on, let's check the migration to create our events table.
Add these two lines to the bottom
```rb
t.references :group, null: false, foreign_key: true
t.references :users, null: false, foreign_key: true
```
So we'll have this:

```rb
class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :start_time
      t.datetime :end_time
      t.string :location
      t.references :group, null: false, foreign_key: true
      t.references :users, null: false, foreign_key: true

      t.timestamps
    end
  end
end

```
now let's run it
```bash
rails db:migrate
```
Now we can make a commit.

## Add Relationships

```rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :events
end
```

```rb
class Group < ApplicationRecord
  has_many :events
end
```

```rb
class Event < ApplicationRecord
  has_one_attached :poster
  belongs_to :user
  belongs_to :group
end
```

## Resources

- [Domain Model Spreadsheet](https://docs.google.com/spreadsheets/d/1PHFT9h7G_f735wu_FplfiZcQXXxMj4fyPCkSkp6kDOY/edit#gid=0)
- [Postico](https://eggerapps.at/postico/)
- [ActiveStorage Rails API File Uploads Tutorial](https://github.com/DakotaLMartinez/active_storage_with_api_tutorial/tree/main)
- [Devise JWT Tutorial](https://github.com/dakotalmartinez/rails-devise-jwt-tutorial)
- [JSONAPI-Serializer gem (replacement for fast-jsonapi)](https://github.com/jsonapi-serializer/jsonapi-serializer)

## Links to Code for Study Groups


Part | Starter Code | Ending Code
---------|----------|---------
 1 | [Starter Code](https://github.com/DakotaLMartinez/eventfull-api/tree/01_start) | [Ending code](https://github.com/DakotaLMartinez/eventfull-api/tree/01_end)
 A2 | B2 | C2
 A3 | B3 | C3