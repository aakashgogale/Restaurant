// Full menu, prices in AED. `price` is a string so per-unit notes stay with it.
const i = (name, price, desc) => ({ name, price: price == null ? "" : String(price), desc });

export const MENU = [
  {
    id: "cold",
    label: "Cold",
    groups: [
      {
        title: "Cold appetizers",
        items: [
          i("Mutabal", 50, "Charcoal-roasted eggplant, tahini, chimichurri, pomegranate, Arabic flatbread"),
          i("Hummus", 45, "Chickpea and tahini dip, lemon zest, olive oil, warm flatbread"),
          i("Padron Peppers with Hummus", 65),
          i("Vegetable Platter", 125, "Uzbek tomatoes, cucumbers, radishes, chilli, baby carrots, herbs"),
          i("Uzbek Tomato Carpaccio", 70, "Cilantro pesto, pomegranate reduction, toasted pine nuts"),
          i("Pickled Delicacies Platter", 95, "Guria-style cabbage, garlic cherry tomatoes, kimchi, carrots"),
          i("Smoked Atlantic Mackerel with Potatoes", 110, "Baked potatoes, pickled red onion, Borodino bread"),
          i("Scallop Tartare with Raspberry and Avocado", 140, "Ponzu dressing, hint of truffle oil"),
        ],
      },
      {
        title: "Seafood & caviar",
        items: [
          i("Magadan Shrimps", 290),
          i("Oysters Gillardeau", "55 each"),
          i("Gorbusha Red Caviar", "Ask your server", "By weight, with pancakes and sour cream"),
          i("Premium Osetra Caviar", "Ask your server", "By weight, with pancakes and sour cream"),
          i("Persian Black Caviar", "Ask your server", "By weight, with pancakes and sour cream"),
        ],
      },
    ],
  },
  {
    id: "dry",
    label: "Dry-Aged",
    groups: [
      {
        title: "Sashimi",
        note: "With pickled ginger, fresh wasabi and soy",
        items: [
          i("Branzino Sashimi", 150),
          i("Salmon Sashimi", 130),
          i("Hamachi Sashimi", 160),
          i("Tuna Sashimi", 120),
          i("Scallop Sashimi", 155),
        ],
      },
      {
        title: "Carpaccio, tataki & ceviche",
        items: [
          i("Salmon Tataki with Avocado", 110, "Yuzu sauce, kimchi dressing, sesame"),
          i("Tuna Carpaccio with Fresh Truffle", 95),
          i("Salmon Mango Carpaccio", 110, "Mango chutney, coriander"),
          i("Branzino Ceviche with Tom Yum Sauce", 145, "Crispy corn, sweet potato, shallots"),
          i("Tuna Ceviche with Watermelon Sauce", 95),
          i("Hamachi Ceviche with Mango Sauce", 165),
          i("Salmon Ceviche with Citrus Sauce", 110),
          i("Chef's Signature Dry-Aged Salmon", 110, "Truffle oil, smoked sour cream, mini flatbreads"),
        ],
      },
      {
        title: "Whole fish by weight",
        note: "Per 100 g, fish of 1.5 – 3 kg. Charcoal-grilled, Asian-style or steamed. Choose a sauce and a side.",
        items: [i("Salmon", "60 / 100 g"), i("Branzino", "65 / 100 g"), i("Hamachi", "70 / 100 g")],
      },
    ],
  },
  {
    id: "salads",
    label: "Salads",
    groups: [
      {
        items: [
          i("Health & Wealth Salad", 85),
          i("Georgian Salad with Avocado", 70),
          i("Roast Beef Salad", 140),
          i("Garden Salad", 70),
          i("Crispy Aubergine with Goat Cheese Cream", 90),
          i("Smoked Salmon Salad", 110),
          i("Octopus Salad", 140),
          i("Achichuk", 50),
          i("Watermelon with Cheese", 80),
          i("Chicken Salad", 80),
        ],
      },
    ],
  },
  {
    id: "dough",
    label: "Dough",
    groups: [
      {
        title: "Dough as art",
        items: [
          i("Tandoor Bread", 15),
          i("Tandoor Chicken Samsa", 35),
          i("Tandoor Lamb Samsa", 40),
          i("Urama Samsa", 50),
          i("Mini Beef Samsa", 55),
          i("Lamb Cheburek", 60),
          i("Cheese Qutab", 50),
          i("Truffle & Potato Qutab", 40),
          i("Lamb Qutab", 50),
          i("Lamb Manti", 70),
        ],
      },
    ],
  },
  {
    id: "soups",
    label: "Soups",
    groups: [
      {
        items: [
          i("Okroshka", 65),
          i("Shurpa", 70),
          i("Tom Yum Kha", 120),
          i("Borsch", 70),
          i("Ukha Del Mar", 120),
          i("Lagman", 75),
        ],
      },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    groups: [
      {
        items: [
          i("Osh Prazdnichny", 90, "Festive Uzbek pilaf, lamb shoulder, carrot, chickpeas, red raisins, quail egg"),
          i("Osh Choyhana", 90, "Lamb shoulder, yellow carrot, barberry, garlic"),
          i("Veal Chop with Brussels Sprouts", 250),
          i("Veal Shank with Buckwheat", 145),
          i("Beef Stroganoff", 175),
          i("Lamb Shank with Roasted Vegetables", 190),
          i("Branzino with Tomato Ragu and Green Pepper Cream Sauce", 180),
          i("Sea Bream with Grilled Artichokes", 130),
          i("Salmon with Guacamole and Quinoa", 150),
          i("Scallops with Blood Orange Sauce", 165),
          i("Prawns with Chimichurri", 110),
          i("Chilean Sea Bass with Vegetables", 260),
          i("Tuna Tataki with Wasabi Mashed Potatoes", 130),
          i("Lagman with Seafood", 150),
          i("Dyl Dyl Lagman", 90),
        ],
      },
    ],
  },
  {
    id: "grill",
    label: "Grill",
    groups: [
      {
        items: [
          i("Beef Shashlik", 145),
          i("Lamb Shashlik", 155),
          i("Chicken Shashlik", 90),
          i("Chicken Cheddar", 130),
          i("Caucasus Lamb Chop", 220),
          i("Napoleon Beef Shashlik", 150),
          i("Chicken Tabaka", 170),
          i("Dry-Aged Branzino with Green Salsa", 185),
          i("Grilled Octopus", 220),
        ],
      },
    ],
  },
  {
    id: "sharing",
    label: "Sharing",
    groups: [
      {
        title: "For the table",
        items: [
          i("Whole Octopus", 540),
          i("Whole Veal Shank with Vegetables", 565),
          i("Kazan Volcano", 520, "Slow-cooked lamb shoulder, Uzbek tomatoes, garlic"),
        ],
      },
      {
        title: "Sides",
        note: "AED 35 – 55",
        items: [
          i("Truffle Mashed Potatoes"),
          i("Broccolini"),
          i("Cherry Potatoes"),
          i("Padron Peppers"),
          i("Hollandaise Asparagus"),
          i("Grilled Vegetables"),
          i("Lazar Rice"),
          i("Grilled Sweet Corn"),
          i("Buckwheat"),
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    groups: [
      {
        items: [
          i("Condensed Milk Waffle Rolls", 65),
          i("Napoleon", 70),
          i("Pearl Del Mar", 65),
          i("Honey Cake", 65),
          i("Truffle Collection", 50),
          i("Uzbek Tomato", 65),
          i("Apple Tarte Tatin", 65),
          i("Nota Plov", 70),
          i("Fruit Platter", 185),
          i("Ice Cream & Sorbet", "25 each"),
        ],
      },
    ],
  },
];
