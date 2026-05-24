/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from './types';

export const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/57ec75eb579fb363a5baebca/1476819604077-C5Z3K9KW0QC4CIPGB4Q3/Colleens_Logo_white.png?format=1500w";
export const MOCKUP_GIFT_CARD_BG = "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1000&auto=format&fit=crop&q=80";

export const BUSINESS_INFO = {
  name: "Colleen's Kitchen",
  tagline: "Every Day Deserves Celebration",
  description: "Colleen's Kitchen is a southern-inspired restaurant delivering refined, yet uncomplicated fare. Dishes reminiscent of your favorite family recipes served in a down-home Austin environment. We keep our approach and offerings simple, but well executed.",
  address: "1911 Aldrich Street, Suite 100, Austin, TX — 78723",
  phone: "512.580.2413",
  phoneRaw: "5125802413",
  emails: {
    general: "hello@colleensaustin.com",
    events: "events@colleensaustin.com"
  },
  socials: {
    facebook: "https://www.facebook.com/colleensaustin/",
    instagram: "https://www.instagram.com/ColleensAustin"
  },
  hours: {
    walkUp: "Monday - Thursday: 11am to close | Friday - Sunday: 8am to close",
    lunch: "Monday - Friday: 11am to 4pm",
    brunch: "Saturday + Sunday: 10am to 2:30pm",
    dinner: "Sunday - Thursday: 4pm to 9pm | Friday - Saturday: 4pm to 10pm",
    happyHour: "Daily: 2:30pm to 6pm"
  }
};export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'supper-1',
    name: "Colleen's Signature Southern Fried Chicken",
    price: 24.00,
    description: "Crispy golden buttermilk boneless chicken thighs, hand-dredged in signature seasoned flour, served over rich Yukon Gold mashed potatoes and country green beans, with a subtle hot honey glaze.",
    category: 'supper',
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80",
    tags: ["Signature", "Southern Classic"]
  },
  {
    id: 'supper-2',
    name: "Gulf Shrimp & Creamy Stone-Ground Grits",
    price: 26.00,
    description: "Pan-seared Gulf shrimp, smoked andouille sausage, sweet peppers, and standard rich low-country gravy smothered over creamy white cheddar stone-ground grits.",
    category: 'supper',
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
    tags: ["Seafood", "Award-Winning"]
  },
  {
    id: 'supper-3',
    name: "Texas Slow-Smoked Beef Brisket Platter",
    price: 28.00,
    description: "Slow-smoked Texas beef brisket, custom dry-rubbed, served with house-made peach BBQ sauce, creamy vinegar apple slaw, and a side of jalapeño-cheddar cornbread.",
    category: 'supper',
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    tags: ["Texas Smokehouse"]
  },
  {
    id: 'supper-4',
    name: "Skillet Cast-Iron Buttermilk Biscuits",
    price: 10.00,
    description: "A basket of three hot, scratch-baked high-rise biscuits served straight out of the oven with fluffy whipped honey butter and homemade seasonal strawberry-rhubarb jam.",
    category: 'supper',
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80",
    tags: ["Vegetarian", "Bread Basket", "Must Try"]
  },
  {
    id: 'supper-5',
    name: "Crispy Cornmeal Fried Green Tomatoes",
    price: 12.00,
    description: "Slices of heirloom green tomatoes breaded with coarse cornmeal, fried golden crispy, dolloped with a creamy house pimento cheese mousse and fresh green onion coulis.",
    category: 'supper',
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&auto=format&fit=crop&q=80",
    tags: ["Vegetarian", "Starter"]
  },

  // Lunch Items
  {
    id: 'lunch-1',
    name: "Mueller Nashville Hot Chicken Sandwich",
    price: 16.00,
    description: "Crispy fried chicken breast dipped in a fiery cayenne-glaze, layered with dills, vinegar slaw, and standard pimento spread on toasted brioche. Served with french fries.",
    category: 'lunch',
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop&q=80",
    tags: ["Spicy Favorite", "Lunch Highlight"]
  },
  {
    id: 'lunch-2',
    name: "Classic Melted Pimento Cheeseburger",
    price: 17.00,
    description: "Premium double ground beef patty, smothered with house pimento cheese spread, applewood bacon jam, butter lettuce, and ripe tomatoes on a toasted buttered bun. Served with fries.",
    category: 'lunch',
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    tags: ["Premium Beef", "Comfort Food"]
  },
  {
    id: 'lunch-3',
    name: "Harvest Southern Cobb Salad",
    price: 15.00,
    description: "Crispy garden greens tossed with sliced fried chicken tenders, perfectly boiled farm egg, heirloom cherry tomatoes, pickled red onion, avocado cubes, blue cheese crumbles, and house buttermilk-ranch.",
    category: 'lunch',
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    tags: ["Gluten-Free Option", "Fresh & Light"]
  },

  // Brunch Items
  {
    id: 'brunch-1',
    name: "Golden Waffles & Buttermilk Fried Chicken",
    price: 21.00,
    description: "Our signature crispy fried chicken breast served over a light and airy Belgian waffle, dusted with powdered sugar, served with pure maple syrup and rum-infused butter.",
    category: 'brunch',
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
    tags: ["Signature Brunch", "Crowd-Pleaser"]
  },
  {
    id: 'brunch-2',
    name: "Southern Biscuits & Sawmill Sausage Gravy",
    price: 14.00,
    description: "Two freshly-baked split buttermilk biscuits fully smothered in savory rich country sausage pepper gravy, paired with two farm eggs cooked to order.",
    category: 'brunch',
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80",
    tags: ["Hearty", "Brunch Classic"]
  },
  {
    id: 'brunch-3',
    name: "Vanilla Pecan Praline French Toast",
    price: 16.00,
    description: "Thick-cut brioche bread soaked in vanilla-bean sweet custard, pan-griddled golden, topped with caramelized Texas praline pecans, fresh banana slices, and cinnamon maple drizzle.",
    category: 'brunch',
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=80",
    tags: ["Sweet", "Decadent"]
  },

  // Sweets
  {
    id: 'sweets-1',
    name: "Cast-Iron Peach Cobbler with Vanilla Gelato",
    price: 9.00,
    description: "Warm Texas freestone peaches baked under a crispy brown sugar-cinnamon cookie crust, served on cast iron with a generous scoop of pure vanilla bean cream.",
    category: 'sweets',
    image: "https://images.unsplash.com/photo-1513267048331-5611cad21981?w=800&auto=format&fit=crop&q=80",
    tags: ["Dessert", "Local Peaches", "Iconic"]
  },
  {
    id: 'sweets-2',
    name: "Old-Fashioned Southern Banana Pudding",
    price: 8.00,
    description: "Scratch-made rich vanilla custard layered with sweet wafers, fresh sliced banana medallions, topped with a torched cloud of light fluffy meringue.",
    category: 'sweets',
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80",
    tags: ["Dessert", "Scratch-Made"]
  },
  {
    id: 'sweets-3',
    name: "Fudge Chocolate Pecan Pie Slice",
    price: 9.00,
    description: "Chunky dark chocolate chips folded with toasted Texas pecans in a gooey sweet filling, baked in a perfectly flaky lard crust. Served with bourbon whipped cream.",
    category: 'sweets',
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80",
    tags: ["Dessert", "Contains Nuts"]
  },

  // Beverages
  {
    id: 'beverage-1',
    name: "House Sweet Peach Iced Tea",
    price: 4.00,
    description: "Classic southern black tea brewed fresh daily, sweetened to perfection with hints of natural ripe peach oil and garnished with lemon wheels.",
    category: 'beverage',
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=80",
    tags: ["Refreshing", "Non-Alcoholic"]
  },
  {
    id: 'beverage-2',
    name: "Mueller Prosecco Mimosa Flight",
    price: 18.00,
    description: "A bottle of vintage dry Italian prosecco served on a wooden board with a selection of three fresh juices: classic orange, Texas ruby red grapefruit, and white peach nectar.",
    category: 'beverage',
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    tags: ["Cocktail", "Popular"]
  },
  {
    id: 'beverage-3',
    name: "Colleen's House Old Fashioned",
    price: 14.00,
    description: "Straight Texas Bourbon whiskey stir-muddled with house peach bitters, raw sugarcane, orange rind oils, and a rich dark Luxardo cherry.",
    category: 'beverage',
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=80",
    tags: ["Cocktail", "Strong"]
  },

  // Happy Hour
  {
    id: 'happyhour-1',
    name: "Crispy Sticky Pork Belly Sliders",
    price: 10.00,
    description: "Gently-braised pork belly caramelized with a sweet peach bourbon-glaze, green apple vinegar slaw, on 2 fluffy honey-glazed slider rolls.",
    category: 'happy hour',
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=800&auto=format&fit=crop&q=80",
    tags: ["Happy Hour Highlight"]
  },
  {
    id: 'happyhour-2',
    name: "Local Austin Craft Draft Beer Selection",
    price: 5.00,
    description: "Rotating selection of cold local craft beers imported fresh from Austin's premier local microbreweries.",
    category: 'happy hour',
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop&q=80",
    tags: ["Happy Hour Drafts"]
  },

  // Kiddos
  {
    id: 'kiddos-1',
    name: "Lil' Southern Chicken Tenders",
    price: 8.00,
    description: "Hand-breaded premium chicken breast tenders with side honey-mustard dipping sauce, accompanied by sliced crisp apples or premium French fries.",
    category: 'kiddos',
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
    tags: ["Kid-Friendly"]
  },
  {
    id: 'kiddos-2',
    name: "Golden Skillet Mac & Cheese",
    price: 7.00,
    description: "Gooey, extra-creamy three-cheese elbow macaroni topped with buttery ritz-cracker crumbs and baked golden.",
    category: 'kiddos',
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&auto=format&fit=crop&q=80",
    tags: ["Kid-Friendly", "Cheese Lovers"]
  }
];
