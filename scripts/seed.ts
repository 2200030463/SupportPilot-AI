import mongoose from "mongoose";
import { User } from "../src/models/User";
import { Order } from "../src/models/Order";
import { Product } from "../src/models/Product";
import { FAQ } from "../src/models/FAQ";
import { Ticket } from "../src/models/Ticket";
import {
  initialProducts,
  initialOrders,
  initialFAQs,
  initialCustomers,
  initialTickets,
} from "../src/lib/seedData";

async function seedDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/supportpilot";
  console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    // Clear existing
    await Promise.all([
      Product.deleteMany({}),
      Order.deleteMany({}),
      FAQ.deleteMany({}),
      User.deleteMany({}),
      Ticket.deleteMany({}),
    ]);

    console.log("Cleared existing collections.");

    // Insert Products
    const createdProducts = await Product.insertMany(initialProducts);
    console.log(`✅ Seeded ${createdProducts.length} Products`);

    // Insert Orders
    const createdOrders = await Order.insertMany(initialOrders);
    console.log(`✅ Seeded ${createdOrders.length} Orders`);

    // Insert FAQs
    const createdFAQs = await FAQ.insertMany(initialFAQs);
    console.log(`✅ Seeded ${createdFAQs.length} FAQs`);

    // Insert Users
    const createdUsers = await User.insertMany(initialCustomers);
    console.log(`✅ Seeded ${createdUsers.length} Customers`);

    // Insert Tickets
    const createdTickets = await Ticket.insertMany(initialTickets);
    console.log(`✅ Seeded ${createdTickets.length} Support Tickets`);

    console.log("\n🎉 SupportPilot AI Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
}

seedDatabase();
