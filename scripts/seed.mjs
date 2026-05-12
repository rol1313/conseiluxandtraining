import mysql from "mysql2/promise";
import "dotenv/config";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

async function main() {
  console.log("🌱 Début du seeding...");

  const data = [
    {
      name: "Technologies numériques et Cybersécurité",
      slug: "technologies-numeriques-&-cybersecurite",
      subcategories: [
        { name: "Informatique et technologies numériques", slug: "informatique-technologies-numeriques" },
        { name: "Télécom et mobile", slug: "telecom-mobile" },
        { name: "Big Data et IoT", slug: "big-data-iot" },
        { name: "Hacking éthique & Tests d'intrusion", slug: "hacking-ethique" },
        { name: "Bureautique", slug: "bureautique" },
        { name: "Gouvernance IT", slug: "gouvernance-it" },
        { name: "Cybersécurité", slug: "cybersecurite" },
        { name: "Gestion de la sécurité de l'information", slug: "gestion-securite-information" },
        { name: "Administration système et réseaux", slug: "administration-systeme-reseaux" },
        { name: "Intelligence Artificielle (IA)", slug: "intelligence-artificielle" },
        { name: "Sécurité du cloud computing", slug: "securite-cloud-computing" },
        { name: "Analyse & Réponse aux incidents", slug: "analyse-reponse-incidents" },
        { name: "Développement Web et logiciel", slug: "developpement-web-logiciel" },
        { name: "Cloud et virtualisation", slug: "cloud-virtualisation" },
        { name: "Sécurité système et réseaux", slug: "securite-systeme-reseaux" },
      ],
    },
    {
      name: "Normes ISO & conformité",
      slug: "normes-iso-&-conformite",
      subcategories: [
        { name: "Qualité et management", slug: "qualite-management" },
        { name: "Gouvernance, Risque et Conformité (GRC)", slug: "gouvernance-risque-conformite" },
        { name: "Sécurité de l'information", slug: "securite-information" },
        { name: "Protection de la vie privée et des données", slug: "protection-vie-privee-donnees" },
        { name: "Transformation numérique", slug: "transformation-numerique" },
        { name: "Continuité, résilience et reprise", slug: "continuite-resilience-reprise" },
        { name: "Santé et sécurité au travail", slug: "sante-securite-travail" },
        { name: "Durabilité économique et environnementale", slug: "durabilite-economique-environnementale" },
      ],
    },
    {
      name: "Gestion de projet, Management & RH",
      slug: "gestion-de-projet-management-&-rh",
      subcategories: [
        { name: "Gestion des Ressources Humaines", slug: "gestion-ressources-humaines" },
        { name: "Gestion des processus", slug: "gestion-processus" },
        { name: "Management de projet et services IT", slug: "management-projet-services-it" },
        { name: "Méthodes de projet et agilité", slug: "methodes-projet-agilite" },
        { name: "Entrepreneuriat & Business", slug: "entrepreneuriat-business" },
        { name: "Management et Leadership", slug: "management-leadership" },
        { name: "Coaching", slug: "coaching" },
        { name: "Soft Skills", slug: "soft-skills" },
        { name: "Efficacité professionnelle", slug: "efficacite-professionnelle" },
        { name: "Pédagogie et ingénierie de formation", slug: "pedagogie-ingenierie-formation" },
      ],
    },
    {
      name: "Filières métiers",
      slug: "filieres-metiers",
      subcategories: [
        { name: "Langues", slug: "langues" },
      ],
    },
    {
      name: "Performance Commerciale",
      slug: "performance-commerciale",
      subcategories: [],
    },
  ];

  for (const cat of data) {
    // Upsert catégorie
    await connection.execute(
      `INSERT INTO Category (slug, name, createdAt, updatedAt)
       VALUES (?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE name = VALUES(name), updatedAt = NOW()`,
      [cat.slug, cat.name]
    );

    const [rows] = await connection.execute(
      `SELECT id FROM Category WHERE slug = ?`,
      [cat.slug]
    );
    const categoryId = rows[0].id;
    console.log(`✅ Catégorie : ${cat.name}`);

    for (const sub of cat.subcategories) {
      await connection.execute(
        `INSERT INTO Subcategory (slug, name, categoryId, createdAt, updatedAt)
         VALUES (?, ?, ?, NOW(), NOW())
         ON DUPLICATE KEY UPDATE name = VALUES(name), updatedAt = NOW()`,
        [sub.slug, sub.name, categoryId]
      );
      console.log(`   └─ ${sub.name}`);
    }
  }

  console.log("✅ Seeding terminé !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur :", e);
    process.exit(1);
  })
  .finally(async () => {
    await connection.end();
  });