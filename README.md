# Animal Cardom API

## Endpoints

### Animals

- GET `/animals/` - Returns an array with all existing animals. Filters can apply using query params: `species_id`, `habitat_id`, `price`, `skill_use_type_id`, `sort_by`, `order`, `limit`

- GET `/animals/:id` - Returns a single animal by ID

- POST `/animals` - Creates a new animal

```
Receives an object with the structure of an animal as body
```

### Plants

- GET `/plants` - Returns an array with all existing plants. Filters can apply using query params: `use_type_id`, `sort_by`, `order`, `limit`

- GET `/plants/:id` - Returns a single plant by ID

- POST `/plants` - Creates a new plant

```
Receives an object with the structure of a plant as body
```

### Habitats

- GET `/habitats` - Returns an array with all existing habitats

- GET `/habitats/:id` - Returns a single habitat by ID

- POST `/habitats` - Creates a new habitat

```
Receives an array of objects with the structure of a habitat as body
```

### Games

- GET `/games` - Returns a random habitat and an object with user and pc properties, where each one has an array of random animals and an array of random plants

### Users

- POST `/users/me` - Returns user data

```
Receives an object with email property as body
```

- POST `/users` - Creates new user

```
Receives an object with google user structure as body
```

### Campaigns

- GET `/campaigns` - Returns an array with all existing campaigns. Filters can apply using query params: `user_id`, `sort_by`, `order`, `limit`

- GET `/campaigns/:id` - Returns a single campaign by ID

- POST `/campaigns` - Creates a new campaign

```
Receives user_id as body
```

### CampaignAnimals

- POST `/campaign_animals` -  Adds new card to user owned cards, and substract card price from coins

```
Receives an object with animal_id and campaign_id properties as body
```

- PUT `/campaign_animals` -  Updates user current hand

```
Receives an object with campaign_id, old_hand (animal_id list) and new_hand (animal_id list) as body
```

### Feedback

- POST `/feedback` - Creates a new feedback message

```
Receives an object with name (optional) and message properties as body
```