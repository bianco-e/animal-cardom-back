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

- POST `/users/create` - Creates new user

```
Receives an object with user structure as body
```

- POST `/users/me` - Returns all user data

```
Receives an object with auth_id property as body
```

- POST `/users/profile` - Returns user profile related to the game without personal data

```
Receives an object with auth_id property as body
```

- POST `/users/hand/update` - Updates user current hand

```
Receives an object with auth_id and hand (array of strings) properties as body
```

- POST `/users/owned_cards/add` - Adds new card to user owned cards

```
Receives an object with auth_id and new_card (string) properties as body
```

- POST `/users/animal_purchase` - Adds new card to user owned cards, and substract card price from user coins

```
Receives an object with auth_id, price and new_card (string) properties as body
```

### Feedback

- POST `/feedback/give` - Creates a new feedback message

```
Receives an object with name (optional) and message properties as body
```