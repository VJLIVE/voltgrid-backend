import { db } from "./config/db";
import { chargingStations } from "./db/schema";

// 35 real Indian city locations covering all states
const stations = [
  // Mumbai
  { name: "VoltGrid Mumbai BKC Hub", address: "Bandra Kurla Complex, Mumbai, Maharashtra", latitude: 19.0596, longitude: 72.8656, status: "active", powerOutput: 150, connectorType: "CCS" },
  { name: "VoltGrid Andheri West", address: "Andheri West, Mumbai, Maharashtra", latitude: 19.1313, longitude: 72.8264, status: "active", powerOutput: 22, connectorType: "Type 2" },
  { name: "VoltGrid Navi Mumbai", address: "Vashi, Navi Mumbai, Maharashtra", latitude: 19.0771, longitude: 72.9989, status: "maintenance", powerOutput: 50, connectorType: "CHAdeMO" },

  // Delhi / NCR
  { name: "VoltGrid Connaught Place", address: "Connaught Place, New Delhi", latitude: 28.6315, longitude: 77.2167, status: "active", powerOutput: 350, connectorType: "CCS" },
  { name: "VoltGrid Gurugram Cyber City", address: "DLF Cyber City, Gurugram, Haryana", latitude: 28.4950, longitude: 77.0890, status: "active", powerOutput: 150, connectorType: "Tesla" },
  { name: "VoltGrid Noida Sector 18", address: "Sector 18, Noida, Uttar Pradesh", latitude: 28.5706, longitude: 77.3219, status: "inactive", powerOutput: 7, connectorType: "Type 2" },
  { name: "VoltGrid Dwarka Express", address: "Dwarka Expressway, Delhi", latitude: 28.5921, longitude: 77.0460, status: "active", powerOutput: 100, connectorType: "CCS" },

  // Bengaluru
  { name: "VoltGrid Koramangala", address: "Koramangala, Bengaluru, Karnataka", latitude: 12.9352, longitude: 77.6245, status: "active", powerOutput: 150, connectorType: "CCS" },
  { name: "VoltGrid Whitefield Tech Park", address: "Whitefield, Bengaluru, Karnataka", latitude: 12.9698, longitude: 77.7499, status: "active", powerOutput: 50, connectorType: "Type 2" },
  { name: "VoltGrid Electronic City", address: "Electronic City, Bengaluru, Karnataka", latitude: 12.8458, longitude: 77.6608, status: "maintenance", powerOutput: 22, connectorType: "CHAdeMO" },

  // Hyderabad
  { name: "VoltGrid HITEC City", address: "HITEC City, Hyderabad, Telangana", latitude: 17.4474, longitude: 78.3762, status: "active", powerOutput: 250, connectorType: "CCS" },
  { name: "VoltGrid Gachibowli", address: "Gachibowli, Hyderabad, Telangana", latitude: 17.4401, longitude: 78.3489, status: "active", powerOutput: 50, connectorType: "Tesla" },

  // Chennai
  { name: "VoltGrid Anna Nagar", address: "Anna Nagar, Chennai, Tamil Nadu", latitude: 13.0878, longitude: 80.2100, status: "active", powerOutput: 100, connectorType: "CCS" },
  { name: "VoltGrid OMR IT Corridor", address: "Old Mahabalipuram Road, Chennai, Tamil Nadu", latitude: 12.9236, longitude: 80.2290, status: "inactive", powerOutput: 22, connectorType: "Type 2" },

  // Pune
  { name: "VoltGrid Hinjewadi Phase 1", address: "Hinjewadi IT Park, Pune, Maharashtra", latitude: 18.5912, longitude: 73.7380, status: "active", powerOutput: 150, connectorType: "CCS" },
  { name: "VoltGrid Kothrud", address: "Kothrud, Pune, Maharashtra", latitude: 18.5074, longitude: 73.8077, status: "active", powerOutput: 7, connectorType: "Type 2" },

  // Ahmedabad
  { name: "VoltGrid SG Highway", address: "SG Highway, Ahmedabad, Gujarat", latitude: 23.0395, longitude: 72.5090, status: "active", powerOutput: 100, connectorType: "CHAdeMO" },
  { name: "VoltGrid GIFT City", address: "GIFT City, Gandhinagar, Gujarat", latitude: 23.1627, longitude: 72.6806, status: "active", powerOutput: 350, connectorType: "CCS" },

  // Kolkata
  { name: "VoltGrid Salt Lake Sector V", address: "Salt Lake Sector V, Kolkata, West Bengal", latitude: 22.5788, longitude: 88.4295, status: "active", powerOutput: 50, connectorType: "CHAdeMO" },
  { name: "VoltGrid New Town Rajarhat", address: "New Town, Rajarhat, Kolkata, West Bengal", latitude: 22.6217, longitude: 88.4793, status: "maintenance", powerOutput: 22, connectorType: "Type 2" },

  // Jaipur
  { name: "VoltGrid Jaipur Vaishali Nagar", address: "Vaishali Nagar, Jaipur, Rajasthan", latitude: 26.9344, longitude: 75.7381, status: "active", powerOutput: 50, connectorType: "CCS" },

  // Chandigarh
  { name: "VoltGrid Chandigarh Sector 17", address: "Sector 17, Chandigarh", latitude: 30.7388, longitude: 76.7885, status: "active", powerOutput: 100, connectorType: "Type 2" },

  // Kochi
  { name: "VoltGrid Kakkanad InfoPark", address: "Infopark, Kakkanad, Kochi, Kerala", latitude: 10.0159, longitude: 76.3419, status: "active", powerOutput: 150, connectorType: "CCS" },
  { name: "VoltGrid Marine Drive Kochi", address: "Marine Drive, Kochi, Kerala", latitude: 9.9667, longitude: 76.2802, status: "inactive", powerOutput: 7, connectorType: "Type 2" },

  // Coimbatore
  { name: "VoltGrid Coimbatore TIDEL", address: "TIDEL Park, Coimbatore, Tamil Nadu", latitude: 11.0238, longitude: 76.9629, status: "active", powerOutput: 50, connectorType: "CHAdeMO" },

  // Bhopal
  { name: "VoltGrid Bhopal MP Nagar", address: "MP Nagar, Bhopal, Madhya Pradesh", latitude: 23.2323, longitude: 77.4345, status: "active", powerOutput: 22, connectorType: "Type 2" },

  // Lucknow
  { name: "VoltGrid Lucknow Gomti Nagar", address: "Gomti Nagar, Lucknow, Uttar Pradesh", latitude: 26.8574, longitude: 81.0112, status: "active", powerOutput: 100, connectorType: "CCS" },

  // Goa
  { name: "VoltGrid Panaji City Centre", address: "Panaji, Goa", latitude: 15.4989, longitude: 73.8278, status: "active", powerOutput: 22, connectorType: "Type 2" },
  { name: "VoltGrid Calangute Beach Road", address: "Calangute, North Goa", latitude: 15.5439, longitude: 73.7548, status: "inactive", powerOutput: 7, connectorType: "CHAdeMO" },

  // Visakhapatnam
  { name: "VoltGrid Vizag Steel City", address: "Steel Plant Road, Visakhapatnam, Andhra Pradesh", latitude: 17.6868, longitude: 83.2185, status: "active", powerOutput: 150, connectorType: "Tesla" },

  // Nashik
  { name: "VoltGrid Nashik Road Hub", address: "Nashik Road, Nashik, Maharashtra", latitude: 19.9975, longitude: 73.7898, status: "maintenance", powerOutput: 50, connectorType: "CCS" },

  // Surat
  { name: "VoltGrid Surat Diamond Nagar", address: "Diamond Nagar, Surat, Gujarat", latitude: 21.2104, longitude: 72.8567, status: "active", powerOutput: 100, connectorType: "CCS" },

  // Amritsar
  { name: "VoltGrid Amritsar GT Road", address: "GT Road, Amritsar, Punjab", latitude: 31.6340, longitude: 74.8723, status: "active", powerOutput: 50, connectorType: "CHAdeMO" },

  // Dehradun
  { name: "VoltGrid Dehradun Rajpur Road", address: "Rajpur Road, Dehradun, Uttarakhand", latitude: 30.3440, longitude: 78.0352, status: "active", powerOutput: 22, connectorType: "Type 2" },

  // Guwahati
  { name: "VoltGrid Guwahati GS Road", address: "GS Road, Guwahati, Assam", latitude: 26.1445, longitude: 91.7362, status: "inactive", powerOutput: 50, connectorType: "CHAdeMO" },

  // Thiruvananthapuram
  { name: "VoltGrid Trivandrum Technopark", address: "Technopark, Thiruvananthapuram, Kerala", latitude: 8.5490, longitude: 76.8816, status: "active", powerOutput: 100, connectorType: "CCS" },
];

async function seed() {
  console.log("🌱 Seeding charging stations...");
  try {
    await db.insert(chargingStations).values(
      stations.map((s) => ({
        name: s.name,
        latitude: s.latitude,
        longitude: s.longitude,
        address: s.address,
        status: s.status,
        powerOutput: s.powerOutput,
        connectorType: s.connectorType,
        createdBy: null,
      }))
    );
    console.log(`✅ Inserted ${stations.length} stations successfully.`);
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    process.exit(0);
  }
}

seed();
