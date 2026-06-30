const fs = require("fs");
const path = require("path");

const countryNameMap = {
  "US": "United States",
  "CA": "Canada",
  "MX": "Mexico",
  "BR": "Brazil",
  "AR": "Argentina",
  "CL": "Chile",
  "CO": "Colombia",
  "GB": "United Kingdom",
  "DE": "Germany",
  "FR": "France",
  "IT": "Italy",
  "ES": "Spain",
  "NL": "Netherlands",
  "CH": "Switzerland",
  "AT": "Austria",
  "BE": "Belgium",
  "IE": "Ireland",
  "PT": "Portugal",
  "SE": "Sweden",
  "DK": "Denmark",
  "NO": "Norway",
  "FI": "Finland",
  "PL": "Poland",
  "CZ": "Czech Republic",
  "HU": "Hungary",
  "RO": "Romania",
  "GR": "Greece",
  "TR": "Turkey",
  "JP": "Japan",
  "KR": "South Korea",
  "SG": "Singapore",
  "HK": "Hong Kong",
  "AU": "Australia",
  "NZ": "New Zealand",
  "IN": "India",
  "TH": "Thailand",
  "VN": "Vietnam",
  "PH": "Philippines",
  "MY": "Malaysia",
  "ID": "Indonesia",
  "AE": "United Arab Emirates",
  "IL": "Israel",
  "ZA": "South Africa"
};

const categoryMap = {
  "residential": "Residential",
  "mobile": "Mobile",
  "datacenter": "Datacenter",
  "isp": "ISP",
  "burner": "Burner"
};

function parsePricing() {
  const csvPath = path.join(__dirname, "../../proxybase2-backend/pricing.csv");
  const outputPath = path.join(__dirname, "../public/pricing.json");

  console.log(`Reading pricing.csv from ${csvPath}...`);
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: pricing.csv does not exist at ${csvPath}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const lines = csvContent.split("\n");
  const pricing = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(",");
    if (parts.length < 4) continue;

    const code = parts[0].trim();
    const categoryRaw = parts[1].trim();
    const buyerPriceRaw = parseInt(parts[2].trim(), 10);
    const sellerCreditRaw = parseInt(parts[3].trim(), 10);

    const country = countryNameMap[code] || code;
    const category = categoryMap[categoryRaw] || categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1);
    const price = buyerPriceRaw / 1000000;
    const sellerCredit = sellerCreditRaw / 1000000;

    // Generate deterministic nodes & status based on code + category
    const key = code + categoryRaw;
    let hash = 0;
    for (let j = 0; j < key.length; j++) {
      hash = key.charCodeAt(j) + ((hash << 5) - hash);
    }
    const nodes = Math.abs(hash % 920) + 80; // Deterministic count between 80 and 1000
    
    let status = "Normal";
    if (nodes > 650) {
      status = "High Availability";
    } else if (nodes < 200) {
      status = "Limited";
    }

    pricing.push({
      country,
      code,
      category,
      price,
      sellerCredit,
      nodes,
      status
    });
  }

  console.log(`Writing parsed JSON to ${outputPath}...`);
  fs.writeFileSync(outputPath, JSON.stringify(pricing, null, 2), "utf-8");
  console.log(`Success! Parsed ${pricing.length} pricing catalog records.`);
}

parsePricing();
