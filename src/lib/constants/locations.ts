export const bangladeshLocations: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Kishoreganj"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Cumilla", "Feni"],
  Rajshahi: ["Rajshahi", "Bogura", "Pabna", "Natore"],
  Khulna: ["Khulna", "Jessore", "Kushtia", "Satkhira"],
  Barishal: ["Barishal", "Patuakhali", "Bhola"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Kurigram"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona"],
};

export const deliveryPreferences = [
  "Standard desk delivery",
  "Workshop drop-off",
  "Express once quoted",
] as const;
