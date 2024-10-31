create table species (
    id bigserial not null primary key,
    "name" varchar not null,
    description varchar,
    icon varchar not null
);

create table habitats (
    id bigserial not null primary key,
    "name" varchar not null,
    description varchar,
    color varchar
);

create table skill_types (
    id bigserial not null primary key,
    "name" varchar not null,
    description varchar not null
);

create table use_types (
    id bigserial not null primary key,
    "name" varchar not null,
    description varchar not null
);

create table animals (
    id bigserial not null primary key,
    "name" varchar not null,
    scientific_name varchar not null,
    description varchar,
    species_id int not null,
    habitat_id int not null,
    attack int,
    life int,
    price int,
    created_at timestamp not null,
    updated_at timestamp,
    skill_name varchar,
    skill_description varchar,
    skill_type_id int,
    skill_use_type_id int,
    targeteable boolean,
    bleeding boolean,
    missing_chance int,
    FOREIGN KEY(habitat_id) 
        REFERENCES habitats(id),
    FOREIGN KEY(species_id) 
        REFERENCES species(id),
    FOREIGN KEY(skill_type_id) 
        REFERENCES skill_types(id),
    FOREIGN KEY(skill_use_type_id) 
        REFERENCES use_types(id)
);

create table plants (
    id bigserial not null primary key,
    "name" varchar not null,
    description varchar not null,
    use_type_id int,
    FOREIGN KEY(use_type_id) 
        REFERENCES use_types(id)
);

create table user_roles (
    id bigserial not null primary key,
    "name" varchar not null,
    description varchar
);

create table users (
    id uuid not null primary key,
    first_name varchar not null,
    last_name varchar not null,
    email varchar not null unique,
    profile_img varchar,
    google_id varchar,
    role_id int,
    created_at timestamp not null,
    deleted_at timestamp,
    FOREIGN KEY(role_id) 
        REFERENCES user_roles(id)
);

insert into user_roles (name, description) VALUES
    ('ADMIN', 'Has read and write DB permissions'),
    ('REGULAR', 'Has read and write (only for actions related to its own account) DB permissions');

insert into use_types (name, description) VALUES
    ('NONE', ''),
    ('TO_ANY', 'Card or skill might be used without any restriction'),
    ('TO_ENEMY', 'Card or skill takes an action when used against an enemy or in an offensive movement'),
    ('TO_ALLY', 'Card or skill takes an action when used with an ally or as a deffensive movement');

insert into species (name, description, icon) VALUES
    ('Mammal', 'Warm-blooded vertebrates with hair or fur and mammary glands that produce milk for their young', '🐺'),
    ('Bird', 'Warm-blooded vertebrates characterized by feathers, beaks, and the laying of hard-shelled eggs', '🦅'),
    ('Reptile', 'Cold-blooded vertebrates with scales, laying eggs on land or giving live birth', '🦎'),
    ('Amphibian', 'Cold-blooded vertebrates that typically undergo metamorphosis from a larval stage to an adult form, and they usually live both in water and on land', '🐸'),
    ('Fish', 'Cold-blooded vertebrates that live in water and have gills, fins, and scales', '🦈'),
    ('Insect', 'The largest group of animals on Earth, characterized by three main body parts (head, thorax, abdomen), six legs, and often wings', '🦂');

insert into habitats (name, description, color) VALUES
    ('Neutral', 'Neutral habitat', '#000000'),
    ('Sea', 'A vast body of saltwater teeming with diverse marine life, crucial for climate regulation and human resources.', '#87CEEB'),
    ('Jungle', 'Lush tropical forests with high humidity and rainfall, known for rich biodiversity and multi-layered plant structures', '#2E8B57'),
    ('Swamp', 'Wetlands saturated with water, featuring woody plants and serving as habitats for diverse wildlife while aiding in flood control', '#228B22'),
    ('Desert', 'Arid regions with low precipitation, home to specially adapted plants and animals, characterized by extreme temperatures', '#DEB887'),
    ('Mountain', 'Elevated landforms with steep slopes, hosting unique ecosystems and varying vegetation from forests to alpine tundra', '#C0C0C0'),
    ('Forest', 'Dense areas dominated by trees, rich in biodiversity, playing vital roles in carbon storage and soil conservation', '#446A2F');

insert into plants (name, description, use_type_id) VALUES
    ('Peyote', 'Its hallucinogen mescaline makes any enemy unable to use its skill for the next round', 3),
    ('Marigold', 'Contains lutein and zeaxanthin which regenerate eye cells: reduces missing chance by 20%', 4),
    ('Jewelweed', 'Its antidote properties can eliminate any poison effect', 4),
    ('Aloe', 'Very effective in treating wounds: restores 2 life points', 4),
    ('Withania', 'Its fruit has been always used as a natural energizer: increases an animal attack by 1', 4),
    ('Horsetail', 'Its leaves have properties that help cells to regenerate: stops bleedings', 4),
    ('Cactus', 'Its sharpen spines make an enemy animal bleed', 3),
    ('Ricinum', 'Highly venomous seeds: venoms an enemy making 1 damage per round, for 3 rounds', 3),
    ('Coffee', 'Contains coffeine: wakes an ally senses eliminating any paralyzing effect', 4);

insert into skill_types (name, description) VALUES
    ('Other', ''),
    ('Healing', 'Heals a damaged animal'),
    ('Poison', 'Inflicts certain damage for certain rounds'),
    ('Buff', 'Increases a quality like life or attack'),
    ('Paralyze', 'Makes an animal unable to use its skill for certain rounds'),
    ('Dodge', 'Partially or totally dodges a received attack'),
    ('Blind', 'Blinds an animal adding a percentage of missing chance for next attacks'),
    ('Reflex', 'Reflects received damage to the attacker'),
    ('Extra damage', 'Inflicts extra damage besides attack points'),
    ('Instant kill', 'Instantly kills the enemy'),
    ('Bleed', 'Makes enemy bleed for the rest of the game which makes 1 damage per round'),
    ('Untargeteable', 'Animal can''t be attacked when untargeteable');

insert into animals (name, scientific_name, description, species_id, habitat_id, attack, life, price, skill_name, skill_description, skill_type_id, skill_use_type_id, created_at, targeteable, bleeding, missing_chance) VALUES
    ('Alligator', 'Alligator mississippiensis', 'Large, primarily freshwater reptiles with a broad snout, known for their powerful bite.', 3, 4, 6, 7, 90, 'Nibble', 'Bites its enemy using its powerful jaws inflicting 1 extra damage', 9, 3, NOW(), true, false, 0),
    ('Axolotl', 'Ambystoma mexicanum', 'A unique aquatic salamander known for its regenerative abilities and perpetual juvenile state.', 4, 4, 3, 4, 45, 'Limb regrowth', 'Regrows its limbs after being attacked (if not lethal damage). Heals 2 life points', 2, 4, NOW(), true, false, 0),
    ('Ball Bug', 'Armadillidiidae', 'Also known as pill bugs, these crustaceans can roll into a ball for protection.', 6, 5, 1, 3, 45, 'Ball shape', 'Ball Bug has 50% chance of turning into a ball taking 1 less damage when it''s attacked', 6, 4, NOW(), true, false, 0),
    ('Basilisk Lizard', 'Basiliscus basiliscus', 'Known for its ability to "walk on water," it uses its agility to escape predators.', 4, 4, 3, 4, 90, 'Jesus Christ', 'Its agility gives it 30% chance of avoiding any attack', 6, 4, NOW(), true, false, 0),
    ('Bat', 'Chiroptera', 'Flying mammals known for echolocation, they play vital roles in pest control and pollination.', 1, 3, 2, 3, 90, 'Vamp', 'Bat sucks enemy''s blood earning 1 life point and leaving the enemy bleeding', 5, 3, NOW(), true, false, 0),
    ('Bear', 'Ursidae', 'Large omnivorous mammals with a thick coat of fur and a strong sense of smell.', 1, 6, 8, 9, 180, 'Sharp claws', 'Bear nails its claws making enemy bleed, inflicting 1 damage per round until it dies', 11, 3, NOW(), true, false, 0),
    ('Bee', 'Apidae', 'Essential pollinators known for their role in producing honey and their complex social structures', 6, 3, 4, 3, 90, 'Life or death', 'Stings its enemy making 3 extra damage but dies after doing it', 9, 3, NOW(), true, false, 0),
    ('Blowfish', 'Tetraodontidae', 'Known for its ability to puff up as a defense mechanism, some species are highly toxic.', 5, 2, 2, 5, 90, 'Puff up', 'Puffs up increasing its attack by 2 after attacking', 4, 3, NOW(), true, false, 0),
    ('Cassowary', 'Casuarius', 'A large, flightless bird with a helmet-like casque and powerful claws.', 2, 3, 6, 6, 135, 'Assault', 'Cassowary uses its casque and claws to knock enemy paralyzing it for 1 round', 5, 3, NOW(), true, false, 0),
    ('Caterpillar', 'Lepidoptera larvae', 'The larval stage of butterflies and moths, known for their rapid growth and transformation.', 6, 3, 1, 3, 45, 'Evolution', 'After getting killed it turns into a Butterfly', 1, 4, NOW(), true, false, 0),
    ('Chameleon', 'Chamaeleonidae', 'Lizards known for their color-changing skin, which aids in camouflage.', 3, 7, 3, 4, 45, 'Mimicry', 'Chameleon is untargeteable. Can''t be seen until it attacks.', 12, 1, NOW(), false, false, 0),
    ('Cheetah', 'Acinonyx jubatus', 'The fastest land animal, adapted for high-speed chases over short distances.', 1, 5, 7, 7, 135, 'Ambush', 'Hides behind bush. Can''t be targeted until it attacks first', 12, 1, NOW(), false, false, 0),
    ('Comb Star', 'Asteroidea', 'A starfish that uses its arms for locomotion and can regenerate lost limbs.', 5, 2, 1, 3, 45, 'Poisonous flesh', 'Poisons any enemy that attacks it taking 1 damage per round for 5 rounds', 8, 4, NOW(), true, false, 0),
    ('Crocodile', 'Crocodylinae', 'Large aquatic reptiles known for their powerful jaws and stealthy hunting methods', 3, 4, 10, 10, 180, 'Nibble', 'Bites its enemy using its strong jaws which inflicts 2 extra damage', 9, 3, NOW(), true, false, 0),
    ('Eagle', 'Aquila', 'Large birds of prey with excellent eyesight and powerful talons, known for their hunting skills', 2, 6, 6, 7, 135, 'Free fall', 'Falls from the sky pecking its enemy making 2 extra damage or killing it if it''s an insect', 9, 3, NOW(), true, false, 0),
    ('Electric Eel', 'Electrophorus electricus', 'A freshwater fish capable of generating powerful electric shocks to stun prey.', 5, 2, 3, 5, 45, 'Electric shock', 'Electric Eel can shock an enemy paralyzing it for 2 rounds', 5, 3, NOW(), true, false, 0),
    ('Elephant', 'Elephas maximus', 'The largest land mammals, known for their intelligence, social behavior, and strong family bonds', 1, 7, 6, 12, 180, 'Stomp', 'Stomps decreasing all enemies'' attack by 1 (if their attack is more than 1)', 1, 3, NOW(), true, false, 0),
    ('Frog', 'Anura', 'Known for their jumping abilities and vocalizations, frogs are often found near water sources', 4, 4, 2, 3, 45, 'Sticky tongue', 'Frog can use its large tongue to devorate any insect immediately', 10, 3, NOW(), true, false, 0),
    ('Gorilla', 'Gorilla gorilla', 'Large, intelligent primates known for their social structure and strength.', 1, 3, 8, 10, 180, 'Chest beating', 'Beats its chest after attacking to get motivation, which increases its attack by 1', 4, 3, NOW(), true, false, 0),
    ('Grasshopper', 'Caelifera', 'Insects known for their strong hind legs, which allow them to leap long distances.', 6, 7, 2, 2, 45, 'Legs power', 'Jumps before getting attacked having a 10% chance to dodge the attack', 6, 4, NOW(), true, false, 0),
    ('Hedgehog', 'Erinaceinae', 'Small mammals with spiny protection, they curl up to avoid predators.', 1, 7, 2, 4, 45, 'Spines cover', 'Returns its current attack points to the attacker', 8, 4, NOW(), true, false, 0),
    ('Horned Lizard', 'Phrynosoma', 'Lizards that can squirt blood from their eyes as a defense mechanism.', 3, 5, 3, 4, 45, 'Blood Shoot', 'Shoots blood from its eyes blinding an enemy adding it 25% chance of missing attacks', 7, 3, NOW(), true, true, 0),
    ('Hummingbird', 'Trochilidae', 'Tiny birds known for their rapid wing beats, hovering ability, and love of nectar.', 2, 7, 2, 3, 90, 'Nectar addiction', 'Disables an enemy random plant by absorbing all its nectar after attacking', 1, 3, NOW(), true, false, 0),
    ('Hyena', 'Hyaenidae', 'Carnivorous mammals known for their scavenging habits and powerful jaws.', 1, 5, 7, 7, 135, 'Bite the wound', 'Makes 2 extra damage if enemy attacked is already injuried', 9, 3, NOW(), true, false, 0),
    ('Komodo Dragon', 'Varanus komodoensis', 'The largest lizard species, known for its venomous bite.', 3, 5, 10, 10, 180, 'Poisonous saliva', 'Bites inflicting 1 extra damage and poisoning its enemy for 1 round', 3, 3, NOW(), true, false, 0),
    ('Leech', 'Hirudinea', 'Blood-sucking invertebrates often found in freshwater habitats.', 6, 4, 1, 3, 45, 'Blood thirst', 'Sucks enemy''s blood (if bleeding) earning 2 life points', 4, 3, NOW(), true, false, 0),
    ('Lion', 'Panthera leo', 'The "king of the jungle," known for its social structure and hunting skills.', 1, 3, 10, 10, 180, 'Roar', 'Roars before attacking which scares the enemy paralyzing it for 3 rounds', 5, 3, NOW(), true, false, 0),
    ('Lizard', 'Lacertilia', 'A diverse group of reptiles, some of which can shed their tails to escape predators.', 3, 7, 2, 4, 45, 'Tail cheat', 'Cheats its enemy leaving the tail when attacked so it receives 1 less damage', 6, 4, NOW(), true, false, 0),
    ('Llama', 'Lama glama', 'Domesticated South American animals known for their wool and ability to carry loads.', 1, 6, 4, 5, 90, 'Spittle', 'Spits on enemy''s face blinding it adding 15% of missing attacks', 7, 3, NOW(), true, false, 0),
    ('Mole', 'Talpidae', 'Burrowing mammals adapted to life underground with powerful forelimbs.', 1, 5, 2, 3, 45, 'Burrow', 'Digs a burrow so it can hide there. Has 50% chance of dodging the attack', 6, 4, NOW(), true, false, 50),
    ('Mosquito', 'Culicidae', 'Small flying insects known for their blood-sucking behavior and ability to spread diseases.', 6, 3, 2, 1, 45, 'Life drain', 'Drains enemy''s life points adding it to its life when attacking', 2, 3, NOW(), true, false, 0),
    ('Octopus', 'Octopoda', 'Marine animals with eight arms, known for their intelligence and ability to release ink to escape predators.', 5, 2, 4, 4, 45, 'Ink shot', 'Throws ink to its enemy blinding it which adds 10% chance of missing attacks', 7, 3, NOW(), true, false, 0),
    ('Orc', 'Orcinus orca', 'Large, powerful marine predators often referred to as killer whales, known for their coordinated hunting.', 1, 2, 7, 11, 180, 'Waterjet', 'Shoots water into enemy''s eyes which blinds it adding 15% chance of missing attacks', 7, 3, NOW(), true, false, 0),
    ('Ostrich', 'Struthio camelus', 'The largest living bird, known for its powerful legs and fast running speeds.', 2, 5, 6, 6, 135, 'Head bury', 'Buries its head when attacked hiding its vital points which dodges 1 damage point', 6, 4, NOW(), true, false, 0),
    ('Parrot', 'Psittaciformes', 'Colorful and intelligent birds, capable of mimicking sounds and words.', 2, 6, 3, 4, 45, 'Echo', 'When Parrot kills its first enemy automatically copies its skill', 1, 3, NOW(), true, false, 0),
    ('Peacock', 'Pavo cristatus', 'A large, colorful bird known for the male’s impressive plumage display to attract mates.', 2, 7, 3, 4, 45, 'Plumage display', 'Distracts its attacker with the plumage getting 30% chance to weaken the attack by 2 points', 6, 4, NOW(), true, false, 0),
    ('Pelican', 'Pelecanus', 'Large water birds with a distinctive pouch under their beak used for catching fish.', 2, 2, 4, 5, 90, 'Bag fishing', 'Makes 2 extra damage to fish', 9, 3, NOW(), true, false, 0),
    ('Salamander', 'Caudata', 'Moist-skinned amphibians with elongated bodies and tails', 4, 4, 2, 4, 45, 'Tissue regeneration', 'Body regenerates after attacking, healing 1 life (if damaged)', 2, 3, NOW(), true, false, 0),
    ('Scorpion', 'Scorpiones', 'Arachnids with pincers and a venomous stinger on the tail used for defense and hunting.', 6, 5, 9, 5, 135, 'Poison', 'Stings its enemy inflicting 1 damage per round for 3 rounds', 3, 3, NOW(), true, false, 0),
    ('Shark', 'Selachimorpha', 'Apex predators in marine ecosystems, known for their sharp teeth and keen sense of smell', 5, 2, 9, 9, 180, 'Bloodseeker', 'Inflicts 2 extra damage if enemy is bleeding', 4, 3, NOW(), true, false, 0),
    ('Snake', 'Serpentes', 'Legless reptiles with a flexible body, often venomous, and known for their slithering movement.', 3, 7, 8, 7, 135, 'Venom', 'Bites its enemy injecting venom which inflicts 1 damage per round (lasts 3 rounds)', 3, 3, NOW(), true, false, 0),
    ('Spider', 'Araneae', 'Arachnids with eight legs, known for their ability to spin webs to catch prey.', 6, 5, 6, 4, 90, 'Sticky wrapping', 'Wraps its enemy paralyzing it for 2 rounds', 4, 3, NOW(), true, false, 0),
    ('Stingray', 'Myliobatiformes', 'Flattened marine fish with venomous barbed tails, often found in shallow coastal waters.', 5, 2, 7, 6, 135, 'Barbed sting', 'Sting with venom glands venoms enemy which inflicts 1 damage for 1 round', 3, 3, NOW(), true, false, 0),
    ('Swordfish', 'Xiphias gladius', 'Large, predatory fish known for its long, flat bill resembling a sword.', 5, 2, 4, 5, 90, 'Penetrating sword', 'Penetrates any enemy making it bleed, inflicting 1 damage per round until death', 11, 3, NOW(), true, false, 0),
    ('Toad', 'Bufonidae', 'Amphibians with dry, bumpy skin and often toxic glands, found in a variety of habitats.', 4, 4, 3, 3, 45, 'Sticky tongue', 'Uses its large tongue to devorate any insect immediatly', 10, 3, NOW(), true, false, 0),
    ('Tortoise', 'Testudinidae', 'Land-dwelling reptiles with a protective shell and a slow-moving lifestyle', 3, 7, 2, 9, 90, 'Hibernate', 'Hibernates inside its shell after attacking which increases its total life by 2', 4, 3, NOW(), true, false, 0),
    ('Vulture', 'Cathartidae', 'Scavenging birds of prey known for their role in cleaning up animal carcasses.', 2, 6, 3, 5, 135, 'Carrion', 'After attacking Vulture''s attack will be increased by 4 if there''s any dead animal', 4, 3, NOW(), true, false, 0),
    ('Wolf', 'Canis lupus', 'Social canines known for their pack behavior and distinct howling.', 1, 6, 7, 7, 135, 'Loud howl', 'Howls after attacking encouraging its allies which increases their attack by 1', 4, 3, NOW(), true, false, 0);

create table campaign_levels (
    id bigserial not null primary key,
    habitat_id int not null,
    level_required int not null unique,
    animal_id_reward int,
    coins_reward int,
    pc_animal_ids int[10],
    FOREIGN KEY(habitat_id) 
        REFERENCES habitats(id),
    FOREIGN KEY(animal_id_reward) 
        REFERENCES animals(id)
);

insert into campaign_levels (habitat_id, level_required, animal_id_reward, coins_reward, pc_animal_ids) VALUES
    (1, 0, NULL, 5, '{31, 7, 35, 45, 38, 3, 13, 28, 18, 26}'),
    (1, 1, NULL, 5, '{31, 7, 35, 45, 21, 5, 28, 38, 11, 16}'),
    (1, 2, NULL, 5, '{46, 7, 35, 45, 44, 38, 8, 16, 37, 28}'),
    (2, 3, 18, 5, '{38, 7, 42, 45, 18, 4, 47, 44, 26, 46}'), 
    (3, 4, 7, 5, '{31, 7, 42, 39, 3, 26, 5, 45, 15, 18}'),
    (4, 5, 37, 5, '{15, 9, 35, 37, 38, 34, 5, 12, 42, 43}'),
    (5, 6, 33, 5, '{44, 40, 16, 43, 8, 13, 33, 32, 37, 4}'),
    (6, 7, 41, 5, '{11, 14, 41, 46, 28, 25, 1, 4, 33, 17}'),
    (7, 8, 27, 5, '{27, 17, 48, 12, 24, 19, 6, 33, 40, 1}');

create table campaigns (
    id uuid not null primary key,
    user_id uuid not null unique,
    level int,
    coins int,
    created_at timestamp not null,
    FOREIGN KEY(user_id) 
        REFERENCES users(id),
    FOREIGN KEY(level)
        REFERENCES campaign_levels(level_required)
);

create table campaign_animals (
    id bigserial not null primary key,
    campaign_id uuid not null,
    animal_id int not null,
    is_in_hand boolean,
    CONSTRAINT unique_campaign_animal_pair UNIQUE (campaign_id, animal_id),
    FOREIGN KEY(campaign_id) 
        REFERENCES campaigns(id),
    FOREIGN KEY(animal_id) 
        REFERENCES animals(id)
);