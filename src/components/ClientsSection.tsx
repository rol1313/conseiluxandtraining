"use client";

const clients = [
  { name: "L'Oréal", color: "#1A1A1A" },
  { name: "LVMH", color: "#1A1A1A" },
  { name: "Hermès", color: "#F37021" },
  { name: "Microsoft", color: "#00A4EF" },
  { name: "MAIF", color: "#00A651" },
  { name: "Nestlé", color: "#1A1A1A" },
  { name: "SNCF", color: "#9E2A2B" },
  { name: "BNP", color: "#00965E" },
];

const ClientsSection = () => {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="max-w-10xl mx-auto px-4">
        <p className="text-center text-text-gray mb-8">
          Nous avons formé plus de <span className="font-bold text-primary">1000</span> entreprises.
        </p>
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex-shrink-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <span
                  className="text-xl font-bold font-montserrat"
                  style={{ color: client.color }}
                >
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
