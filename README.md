# Animal Cardom API

## Routes

### Animals

- GET  `/animals/all` - Returns an array with all existing animals

- GET  `/animals/newest` - Returns an array with the newest 3 animals

- GET  `/animals/filter` - Returns an array with all existing animals filtered by `species`, `skill_type` and `owned` params

- POST `/animals/create` - Creates a new animal card
```
Receives an object with the structure of an animal as body
```

- POST `/animals/create-many` - Creates many new animals cards
```
Receives an array of objects with the structure of an animal as body
```

### Feedback

- POST `/give_feedback` - Creates a new feedback message
```
Receives an object with name (optional) and message properties as body
```

### Games

- GET  `/games/new-random` - Returns an object with user and pc properties, where each one has an array of random animals and an array of random plants

- GET  `/games/new-campaign` - Returns an object with user and pc properties, where each one has an array of animals and an array of plants according to `xp` (which identifies the current level) and `user_cards` (which makes not to return a repeated animal) params

- POST `/games/save-game` - Saves last campaign game
```
Receives an object with auth_id and game (contains last game data) properties as body
```

- POST `/games/last-games` - Returns last 10 games for specified user
```
Receives an object with auth_id property as body
```

### Plants

- GET  `/plants/all` - Returns an array with all existing plants

- POST `/plants/create` - Creates a new plant card
```
Receives an object with the structure of an plant as body
```

- POST `/plants/create-many` - Creates many new plants cards
```
Receives an array of objects with the structure of an plant as body
```

### Terrains

- GET  `/terrains/all` - Returns an array with all existing terrains

- GET  `/terrains/new` - Returns a random terrain

- POST `/terrains/create-many` - Creates many new terrains
```
Receives an array of objects with the structure of a terrain as body
```

### Tracking

- POST  `/track_action` - Saves action to track
```
Receives an object with auth_id (optional), utm (optional), guest_name (optional), and action properties as body
```

### Users

- POST  `/users/create` - Creates new user
```
Receives an object with user structure as body
```

- POST  `/users/me` - Returns all user data
```
Receives an object with auth_id property as body
```

- POST  `/users/profile` - Returns user profile related to the game without personal data
```
Receives an object with auth_id property as body
```

- POST  `/users/hand/update` - Updates user current hand
```
Receives an object with auth_id and hand (array of strings) properties as body
```

- POST  `/users/owned_cards/add` - Adds new card to user owned cards
```
Receives an object with auth_id and new_card (string) properties as body
```

