import express from "express";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.json());

const PORT = 8000;
const MONGO_URL = "mongodb://127.0.0.1:27017";

const products = [
  {
    _id: {
      $oid: "651b19827860a28abea5f904",
    },
    name: "Apple iPhone 14 Pro Max (1 TB) - Gold",
    price: "₹ 1,79,999",
    image: "https://m.media-amazon.com/images/I/71T5NVOgbpL._SL1500_.jpg",
    rating: 4.5,
    category: "Electronics",
    description:
      "17.00 cm (6.7-inch) Super Retina XDR display featuring Always-On and ProMotion. Dynamic Island, a magical new way to interact with iPhone. 48MP Main camera for up to 4x greater resolution.",
    id: "1",
  },
  {
    _id: {
      $oid: "651b19827860a28abea5f905",
    },
    name: "Vivo Z1Pro (Sonic Blue, 128 GB)  (6 GB RAM)",
    price: "₹ 20,990",
    image:
      "https://rukminim2.flixcart.com/image/416/416/k51cpe80pkrrdj/mobile/f/w/t/vivo-z1pro-vivo-1951-pd1911f-ex-original-imafhmyayxdjghhm.jpeg?q=70",
    rating: 4.6,
    category: "Electronics",
    description:
      "Watch high-quality movies seamlessly, play graphics-rich games and do a lot more on the Vivo Z1Pro. Its 16.59 cm (6.53) FHD+ Display delivers vibrant visuals.",
    id: "2",
  },
  {
    _id: {
      $oid: "651b19827860a28abea5f906",
    },
    name: "HP Pavilion Gaming Core i5 11th Gen",
    price: "₹ 67,999",
    image: "https://m.media-amazon.com/images/I/611VHOvjkES._SX679_.jpg",
    rating: 4.3,
    category: "Laptop",
    description:
      "Processor: 11th Gen Intel Core i5-11300H (up to 4.4 GHz with Intel Turbo Boost Technology, 8 MB L3 cache, 4 cores)| Memory: 8 GB DDR4-3200 MHz RAM (1 x 8 GB) upgradable to 32GB | Storage: 512 GB PCIe NVMe M.2 SSD.",
    id: "3",
  },
];

function createConnection() {
  const client = new MongoClient(MONGO_URL);
  client.connect();
  console.log("MongoDB Connected");
  return client;
}

const client = createConnection();

// landing page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// get all products
app.get("/products", (req, res) => {
  res.send(products);
});

// get products by id
app.get("/products/:id", (req, res) => {
  const { id } = req.query;
  console.log(id);
  const product = products.filter((pd) => pd.id == id);
  res.send(product);
});

// get products by category
app.get("/products/find", (req, res) => {
  const { category } = req.params;
  console.log(category);
  const product = products.filter((pd) => pd.category == category);
  res.send(product);
});

// get products by category and rating
app.get("/products/findMany", (req, res) => {
  const { category, rating } = req.query;
  console.log(category, rating);
  const product = products.filter(
    (pd) => pd.category == category && pd.rating == rating
  );
  res.send(product);
});

// post method

app.listen(PORT, () => console.log("Server is running on PORT =>", PORT));
