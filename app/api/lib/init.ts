import bcrypt from "bcryptjs";
import { connectMongoDB } from "../queries/mongo-connection";
import { User } from "../models/User";
import { Project } from "../models/Project";
import { Review } from "../models/Review";

let initialized = false;

export async function initDatabase() {
  if (initialized) return;
  initialized = true;

  // Connect to MongoDB
  await connectMongoDB();

  // Seed admin user if not exists
  const existingAdmin = await User.findOne({ email: "admin@admin.com" });
  if (!existingAdmin) {
    const hashedPw = await bcrypt.hash("admin123", 10);
    await User.create({
      email: "admin@admin.com",
      name: "Admin",
      password: hashedPw,
      role: "admin",
    });
    console.log("[init] Admin user created (admin@admin.com / admin123)");
  }

  // Seed projects if empty
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: "Villa Renovatie Hees",
        category: "Renovatie",
        description:
          "Complete renovatie van een jaren '30 woning in Nijmegen-Hees. Strak stucwerk, nieuwe vloeren en maatwerk timmerwerk.",
        image: "images/tier-01.jpg",
        amenities:
          "Volledige stucwerk wanden en plafonds,Eikenhouten vloer gelegd,Maatwerk keuken,Nieuwe elektra en sanitair,Buitenschilderwerk",
        status: "active",
      },
      {
        title: "Sierlijsten Goffert",
        category: "Stucwerk",
        description:
          "Ambachtelijk stucwerk met klassieke sierlijsten in een monumentaal pand in de Goffert.",
        image: "images/tier-02.jpg",
        amenities:
          "Restauratie sierlijsten,Ornamenten gereproduceerd,Traditioneel kalkstuc,Kleuradvies en uitvoering,Matte lak afwerking",
        status: "active",
      },
      {
        title: "Badkamer Centrum",
        category: "Renovatie",
        description:
          "Complete badkamerrenovatie in het centrum van Nijmegen met hoogwaardige tegelwerk en stucafwerking.",
        image: "images/tier-03.jpg",
        amenities:
          "Inloopdouche met regendouche,Marmerlook tegels,Vloerverwarming,Design wastafelmeubel,LED spiegelverlichting",
        status: "active",
      },
    ]);
    console.log("[init] Seeded 3 projects");
  }

  // Seed reviews if empty
  const reviewCount = await Review.countDocuments();
  if (reviewCount === 0) {
    await Review.insertMany([
      {
        name: "Familie Van Dijk",
        location: "Nijmegen-Hees",
        quote:
          "Top kwaliteit geleverd. Zeer nette afwerking en goede communicatie. Het team werkte snel en schoon. We zijn heel tevreden met het resultaat!",
        rating: 5,
        status: "active",
      },
      {
        name: "Peter Janssen",
        location: "Nijmegen-Centrum",
        quote:
          "Onze woning compleet gerenoveerd en perfect opgeleverd. Vanaf het eerste gesprek tot de oplevering was alles professioneel geregeld.",
        rating: 5,
        status: "active",
      },
      {
        name: "Maria Klaassen",
        location: "Nijmegen-Goffert",
        quote:
          "Betrouwbaar bedrijf met vakmensen. Zeker aan te raden voor iedereen die kwaliteit en netheid belangrijk vindt.",
        rating: 5,
        status: "active",
      },
    ]);
    console.log("[init] Seeded 3 reviews");
  }
}
