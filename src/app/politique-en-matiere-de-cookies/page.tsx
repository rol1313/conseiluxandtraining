"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── TABLES DATA ──────────────────────────────────────────────────────────────

const necessaires = [
  { nom: "__cf_bm [x3]", fournisseur: "Hubspot", finalite: "Ce cookie est utilisé pour distinguer les humains des robots. Ceci est bénéfique pour le site web afin de créer des rapports valides sur l'utilisation de leur site.", duree: "1 jour", type: "Cookie HTTP" },
  { nom: "_cfuvid [x2]", fournisseur: "Hubspot", finalite: "Ce cookie fait partie des services fournis par Cloudflare – notamment l'équilibrage de la charge, la fourniture du contenu du site web et la connexion DNS au service des exploitants de sites web.", duree: "Session", type: "Cookie HTTP" },
  { nom: "_GRECAPTCHA", fournisseur: "Google", finalite: "Ce cookie est utilisé pour distinguer les humains des robots. Ceci est bénéfique pour le site web afin de créer des rapports valides sur l'utilisation de leur site.", duree: "180 jours", type: "Cookie HTTP" },
  { nom: "1.gif", fournisseur: "Cookiebot", finalite: "Utilisé pour compter le nombre de sessions sur le site web, nécessaire pour optimiser la livraison des produits CMP.", duree: "Session", type: "Pixel de suivi" },
  { nom: "ar_debug", fournisseur: "Google", finalite: "Vérifie si un cookie de débogage technique est présent.", duree: "3 mois", type: "Cookie HTTP" },
  { nom: "CookieConsent", fournisseur: "Cookiebot", finalite: "Stocke l'autorisation d'utilisation de cookies pour le domaine actuel par l'utilisateur.", duree: "1 année", type: "Cookie HTTP" },
  { nom: "csrftoken", fournisseur: "Prezi", finalite: "Aide à prévenir des attaques dangereuses du type Cross Site Request Forgery (CSRF).", duree: "1 année", type: "Cookie HTTP" },
  { nom: "elementor", fournisseur: "conseiluxtraining.com", finalite: "Utilisé dans le cadre du thème WordPress du site web. Le cookie permet au propriétaire du site web de mettre en œuvre ou modifier le contenu du site web en temps réel.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "li_gc", fournisseur: "LinkedIn", finalite: "Stocke l'autorisation d'utilisation de cookies pour le domaine actuel par l'utilisateur.", duree: "180 jours", type: "Cookie HTTP" },
  { nom: "PHPSESSID", fournisseur: "conseiluxtraining.com", finalite: "Conserve la configuration des paramètres des utilisateurs à travers les demandes de page.", duree: "Session", type: "Cookie HTTP" },
  { nom: "rc::a", fournisseur: "Hubspot", finalite: "Ce cookie est utilisé pour distinguer les humains des robots. Ceci est bénéfique pour le site web afin de créer des rapports valides sur l'utilisation de leur site.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "rc::b", fournisseur: "Hubspot", finalite: "Ce cookie est utilisé pour distinguer les humains des robots.", duree: "Session", type: "Stockage local HTML" },
  { nom: "rc::c", fournisseur: "Hubspot", finalite: "Ce cookie est utilisé pour distinguer les humains des robots.", duree: "Session", type: "Stockage local HTML" },
  { nom: "rc::d-15#", fournisseur: "Hubspot", finalite: "Ce cookie est utilisé pour distinguer les humains des robots.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "rc::f", fournisseur: "Hubspot", finalite: "Ce cookie est utilisé pour distinguer les humains des robots.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "test_cookie", fournisseur: "Google", finalite: "Utilisé pour vérifier si le navigateur de l'utilisateur accepte les cookies.", duree: "1 jour", type: "Cookie HTTP" },
];

const preferences = [
  { nom: "lidc", fournisseur: "LinkedIn", finalite: "Enregistre quel groupe de serveurs sert le visiteur. Ceci est utilisé dans le contexte de l'équilibrage de charge afin d'optimiser l'expérience utilisateur.", duree: "1 jour", type: "Cookie HTTP" },
];

const statistiques = [
  { nom: "_hssc", fournisseur: "Hubspot", finalite: "Identifie si les données du navigateur doivent être mises à jour.", duree: "1 jour", type: "Cookie HTTP" },
  { nom: "_hssrc", fournisseur: "Hubspot", finalite: "Utilisé pour reconnaître le navigateur de l'internaute lors de son retour sur le site.", duree: "Session", type: "Cookie HTTP" },
  { nom: "_hstc", fournisseur: "Hubspot", finalite: "Définit un identifiant unique pour la session. Cela permet au site Web d'obtenir des données sur le comportement des visiteurs à des fins statistiques.", duree: "180 jours", type: "Cookie HTTP" },
  { nom: "_ga", fournisseur: "Google", finalite: "Enregistre un identifiant unique utilisé pour générer des données statistiques sur la façon dont le visiteur utilise le site.", duree: "2 années", type: "Cookie HTTP" },
  { nom: "_ga_#", fournisseur: "Google", finalite: "Utilisé par Google Analytics pour recueillir des données sur le nombre de fois qu'un utilisateur a visité le site web ainsi que les dates de la première et de la plus récente visite.", duree: "2 années", type: "Cookie HTTP" },
  { nom: "_gat", fournisseur: "Google", finalite: "Utilisé par Google Analytics pour diminuer radicalement le taux de requêtes.", duree: "1 jour", type: "Cookie HTTP" },
  { nom: "_gid", fournisseur: "Google", finalite: "Enregistre un identifiant unique utilisé pour générer des données statistiques sur la façon dont le visiteur utilise le site.", duree: "1 jour", type: "Cookie HTTP" },
  { nom: "collect", fournisseur: "Google", finalite: "Utilisé pour envoyer des données à Google Analytics sur le périphérique et le comportement du visiteur. Suit l'internaute à travers les appareils et les canaux de marketing.", duree: "Session", type: "Pixel de suivi" },
  { nom: "hubspotutk", fournisseur: "Hubspot", finalite: "Définit un identifiant unique pour la session. Cela permet au site Web d'obtenir des données sur le comportement des visiteurs à des fins statistiques.", duree: "180 jours", type: "Cookie HTTP" },
  { nom: "last_pys_landing_page", fournisseur: "conseiluxtraining.com", finalite: "Enregistre des données statistiques sur le comportement des internautes sur le site web. Utilisé pour les analyses internes par l'opérateur du site web.", duree: "Session", type: "Cookie HTTP" },
  { nom: "last_pysTrafficSource", fournisseur: "conseiluxtraining.com", finalite: "Enregistre des données statistiques sur le comportement des internautes sur le site web. Utilisé pour les analyses internes par l'opérateur du site web.", duree: "Session", type: "Cookie HTTP" },
  { nom: "pys_first_visit", fournisseur: "conseiluxtraining.com", finalite: "Enregistre des données statistiques sur le comportement des internautes sur le site web. Utilisé pour les analyses internes par l'opérateur du site web.", duree: "Session", type: "Cookie HTTP" },
  { nom: "pys_landing_page", fournisseur: "conseiluxtraining.com", finalite: "Détecte et stocke quelle page de destination est présentée à l'utilisateur.", duree: "Session", type: "Cookie HTTP" },
  { nom: "pys_session_limit", fournisseur: "conseiluxtraining.com", finalite: "Enregistre des données statistiques sur le comportement des internautes sur le site web. Utilisé pour les analyses internes par l'opérateur du site web.", duree: "1 jour", type: "Cookie HTTP" },
  { nom: "pys_start_session", fournisseur: "conseiluxtraining.com", finalite: "Enregistre des données statistiques sur le comportement des internautes sur le site web. Utilisé pour les analyses internes par l'opérateur du site web.", duree: "Session", type: "Cookie HTTP" },
  { nom: "pysTrafficSource", fournisseur: "conseiluxtraining.com", finalite: "Enregistre des données statistiques sur le comportement des internautes sur le site web. Utilisé pour les analyses internes par l'opérateur du site web.", duree: "Session", type: "Cookie HTTP" },
  { nom: "sentryReplaySession", fournisseur: "embed-cdn.spotifycdn.com", finalite: "Enregistre des données sur le comportement des visiteurs sur le site Web. Ceci est utilisé pour l'analyse interne et l'optimisation du site.", duree: "Session", type: "Stockage local HTML" },
];

const marketing = [
  { nom: "#-#", fournisseur: "YouTube", finalite: "Utilisé pour suivre l'interaction de l'utilisateur avec le contenu intégré.", duree: "Session", type: "Stockage local HTML" },
  { nom: "_ptq.gif", fournisseur: "Hubspot", finalite: "Envoie des données à la plateforme marketing Hubspot concernant l'appareil et le comportement du visiteur. Suit le visiteur sur les appareils et les canaux marketing.", duree: "Session", type: "Pixel de suivi" },
  { nom: "_putma", fournisseur: "Prezi", finalite: "Cible des annonces basées sur le profil psychologique et l'emplacement géographique.", duree: "400 jours", type: "Cookie HTTP" },
  { nom: "_fbp [x2]", fournisseur: "Meta Platforms, Inc. / conseiluxtraining.com", finalite: "Utilisé par Facebook pour fournir une série de produits publicitaires tels que les offres en temps réel d'annonceurs tiers.", duree: "3 mois", type: "Cookie HTTP" },
  { nom: "_gcl_au", fournisseur: "Google", finalite: "Utilisé par Google AdSense pour expérimenter l'efficacité de la publicité sur de divers sites Web en utilisant leurs services.", duree: "3 mois", type: "Cookie HTTP" },
  { nom: "_ptref", fournisseur: "Prezi", finalite: "Cible des annonces basées sur le profil psychologique et l'emplacement géographique.", duree: "1 jour", type: "Cookie HTTP" },
  { nom: "bcookie", fournisseur: "LinkedIn", finalite: "Utilisé par le service de réseau social, LinkedIn, pour le suivi de l'utilisation des services intégrés.", duree: "1 année", type: "Cookie HTTP" },
  { nom: "IDE", fournisseur: "Google", finalite: "Utilisé par Google DoubleClick pour enregistrer et signaler les actions de l'utilisateur du site après qu'il ait vu ou cliqué sur une des pubs de l'annonceur dans le but de mesurer l'efficacité et de présenter des annonces publicitaires ciblées à l'utilisateur.", duree: "400 jours", type: "Cookie HTTP" },
  { nom: "iU5q-!O9@$", fournisseur: "YouTube", finalite: "Enregistre un identifiant unique pour conserver des statistiques sur les vidéos de YouTube vues par l'utilisateur.", duree: "Session", type: "Stockage local HTML" },
  { nom: "LAST_RESULT_ENTRY_KEY", fournisseur: "YouTube", finalite: "Utilisé pour suivre l'interaction de l'utilisateur avec le contenu intégré.", duree: "Session", type: "Cookie HTTP" },
  { nom: "lastExternalReferrer", fournisseur: "Meta Platforms, Inc.", finalite: "Détecte comment l'utilisateur a atteint le site web en enregistrant sa dernière adresse URL.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "lastExternalReferrerTime", fournisseur: "Meta Platforms, Inc.", finalite: "Détecte comment l'utilisateur a atteint le site web en enregistrant sa dernière adresse URL.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "LogsDatabaseV2:V#||LogsRequestsStore", fournisseur: "YouTube", finalite: "Utilisé pour suivre l'interaction de l'utilisateur avec le contenu intégré.", duree: "Persistant", type: "IndexedDB" },
  { nom: "nextId", fournisseur: "YouTube", finalite: "Utilisé pour suivre l'interaction de l'utilisateur avec le contenu intégré.", duree: "Session", type: "Cookie HTTP" },
  { nom: "NID", fournisseur: "Google", finalite: "Enregistre un identifiant qui identifie l'appareil de l'utilisateur récurrent. Cet identifiant est utilisé pour des annonces ciblées.", duree: "6 mois", type: "Cookie HTTP" },
  { nom: "pagead/1p-conversion/#/", fournisseur: "Google", finalite: "En attente.", duree: "Session", type: "Pixel de suivi" },
  { nom: "pagead/1p-user-list/#", fournisseur: "Google", finalite: "Repère si l'internaute a montré de l'intérêt pour des produits ou des événements spécifiques sur plusieurs sites web et détecte la façon dont l'internaute navigue entre les sites.", duree: "Session", type: "Pixel de suivi" },
  { nom: "YSC", fournisseur: "YouTube", finalite: "Enregistre un identifiant unique pour conserver des statistiques sur les vidéos de YouTube vues par l'utilisateur.", duree: "Session", type: "Cookie HTTP" },
  { nom: "yt.innertube::nextId", fournisseur: "YouTube", finalite: "Enregistre un identifiant unique pour conserver des statistiques sur les vidéos de YouTube vues par l'utilisateur.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "ytidb::LAST_RESULT_ENTRY_KEY", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "YtidbMeta#databases", fournisseur: "YouTube", finalite: "Utilisé pour suivre l'interaction de l'utilisateur avec le contenu intégré.", duree: "Persistant", type: "IndexedDB" },
  { nom: "yt-remote-cast-available", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Session", type: "Stockage local HTML" },
  { nom: "yt-remote-cast-installed", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Session", type: "Stockage local HTML" },
  { nom: "yt-remote-connected-devices", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "yt-remote-device-id", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Persistant", type: "Stockage local HTML" },
  { nom: "yt-remote-fast-check-period", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Session", type: "Stockage local HTML" },
  { nom: "yt-remote-session-app", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Session", type: "Stockage local HTML" },
  { nom: "yt-remote-session-name", fournisseur: "YouTube", finalite: "Stocke les préférences de lecture vidéo de l'utilisateur pour les vidéos YouTube incorporées.", duree: "Session", type: "Stockage local HTML" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function CookieTable({ rows }: { rows: { nom: string; fournisseur: string; finalite: string; duree: string; type: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left font-semibold text-[#1a1a6e] w-36">Nom</th>
            <th className="px-4 py-3 text-left font-semibold text-[#1a1a6e] w-32">Fournisseur</th>
            <th className="px-4 py-3 text-left font-semibold text-[#1a1a6e]">Finalité</th>
            <th className="px-4 py-3 text-left font-semibold text-[#1a1a6e] w-36">Durée maximale de conservation</th>
            <th className="px-4 py-3 text-left font-semibold text-[#1a1a6e] w-32">Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <td className="px-4 py-3 font-mono text-xs text-gray-700 align-top">{row.nom}</td>
              <td className="px-4 py-3 text-[#f97316] font-medium align-top text-xs">{row.fournisseur}</td>
              <td className="px-4 py-3 text-gray-600 align-top leading-relaxed">{row.finalite}</td>
              <td className="px-4 py-3 text-gray-600 align-top">{row.duree}</td>
              <td className="px-4 py-3 text-gray-600 align-top">{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <h2 className="text-2xl font-bold text-[#1a1a6e] font-montserrat mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PolitiqueCookiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a6e] to-[#2d2d9e] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden h-64 lg:h-72 bg-[#1a1a6e]/40 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-8xl mb-2">🍪</div>
                <p className="text-white/50 text-sm">Politique cookies</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-2 border-white/20 rounded-2xl p-8 bg-white/5 backdrop-blur"
            >
              <p className="text-white/60 text-sm mb-1">Accueil &rsaquo; Politique en matière de cookies</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-4 leading-tight">
                Politique en matière de cookies
              </h1>
              <p className="text-white/70 text-sm leading-relaxed">
                Transparence sur l'utilisation des cookies et technologies de traçage sur conseiluxtraining.com.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-16">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10 space-y-4"
        >
          <p className="text-gray-600 leading-relaxed">
            Conseilux Training utilise des cookies et des technologies analogues afin d'alimenter, de protéger et d'améliorer le site web conseiluxtraining.com. La présente politique explique comment et pourquoi nous utilisons ces technologies et les choix qui vous sont proposés.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Un cookie est un petit fichier de données qui est transféré vers votre appareil (par ex. : votre téléphone ou votre ordinateur). Par exemple, un cookie pourrait nous permettre de reconnaître votre navigateur, tandis qu'un autre pourrait conserver vos préférences. Deux types de cookies sont utilisés sur le site web conseiluxtraining.com : (1) les « cookies de session » et (2) les « cookies persistants ». Les cookies de session expirent normalement lorsque vous fermez votre navigateur tandis que les cookies persistants restent sur votre appareil une fois votre navigateur fermé et peuvent être de nouveau utilisés lors de votre prochaine visite sur le site web conseiluxtraining.com.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nous utilisons également d'autres technologies offrant des fonctionnalités similaires aux cookies, comme les balises web, pixels, identifiants d'équipement mobile, et URL de suivi, pour obtenir des données de connexion. À titre d'exemple, nos e-mails peuvent contenir des balises web et des URL de traçage afin de savoir si vous avez ouvert un message précis ou accédé à un lien en particulier.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nous sommes également susceptibles d'autoriser certains partenaires commerciaux à installer ces technologies sur le site web conseiluxtraining.com. Ces partenaires recourent à ces technologies pour nous aider à analyser la manière dont vous utilisez le site web conseiluxtraining.com, comme par exemple en notant les services tiers via lesquels vous êtes arrivés sur le site web conseiluxtraining.com, nous aider à détecter et prévenir les fraudes ou à mener des évaluations des risques, ou collecter des informations concernant vos activités sur le site Web conseiluxtraining.com, d'autres sites et/ou les pubs sur lesquelles vous avez cliquées. Par exemple, pour nous permettre de mieux comprendre comment le site web conseiluxtraining.com est utilisé, nous travaillons en collaboration avec différents partenaires en matière d'analyse, notamment Google Analytics.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Les tiers peuvent également utiliser ces technologies de traçage pour vous présenter des pubs dont ils estiment qu'elles ont le plus de chance de vous intéresser et évaluer l'efficacité de leurs publicités aussi bien sur le site web conseiluxtraining.com ainsi que sur d'autres sites web et services en ligne. Les cookies de ciblage et les cookies publicitaires que nous utilisons peuvent impliquer l'intervention de Google, ainsi que d'autres réseaux et services publicitaires que nous utilisons de temps à autre.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Le site web conseiluxtraining.com peut utiliser des plugins sociaux fournis et exploités par des sociétés tierces, tels que le bouton « J'aime » de Facebook. En conséquence, vous pouvez envoyer au tiers les informations que vous visualisez dans une rubrique en particulier de notre site web. Si vous n'êtes pas connecté à votre compte ouvert auprès du tiers, ce dernier ne pourra pas connaître votre identité. Si vous êtes connecté à votre compte ouvert auprès du tiers, alors ce dernier pourra relier les informations ou actions relatives à vos interactions avec le site web conseiluxtraining.com au compte que vous détenez auprès du tiers en question. Veuillez consulter les politiques de confidentialité du tiers pour en savoir plus sur ses pratiques en termes de données.
          </p>
          <p className="text-gray-600 leading-relaxed">
            La plupart des navigateurs acceptent automatiquement les cookies, mais vous pouvez modifier les paramètres de votre navigateur afin de les refuser en accédant à la rubrique aide de la barre d'outils de votre navigateur. Les « Cookies Flash » fonctionnent de manière différente que les cookies de navigateur et les outils de gestion des cookies disponibles sur un navigateur Web ne supprimeront pas ces « Cookies Flash ». Il est possible que vous puissiez contrôler les cookies via la fonction « Paramètres » de votre appareil mobile. Veuillez consulter les instructions du fabricant de votre appareil pour obtenir plus d'informations.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Si vous choisissez de refuser les cookies, certaines sections du site web conseiluxtraining.com peuvent ne pas fonctionner comme prévu, voire ne pas fonctionner du tout.
          </p>
        </motion.div>

        {/* Second block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10 space-y-4"
        >
          <p className="text-gray-600 leading-relaxed">
            Ce site web utilise des cookies. Les cookies nous permettent de personnaliser le contenu et les annonces, d'offrir des fonctionnalités relatives aux médias sociaux et d'analyser notre trafic. Nous partageons également des informations sur l'utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d'analyse, qui peuvent combiner celles-ci avec d'autres informations que vous leur avez fournies ou qu'ils ont collectées lors de votre utilisation de leurs services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Les cookies sont des petits fichiers textes qui peuvent être utilisés par les sites web pour rendre l'expérience utilisateur plus efficace.
          </p>
          <p className="text-gray-600 leading-relaxed">
            La loi stipule que nous ne pouvons stocker des cookies sur votre appareil que s'ils sont strictement nécessaires au fonctionnement de ce site. Pour tous les autres types de cookies, nous avons besoin de votre permission.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ce site utilise différents types de cookies. Certains cookies sont placés par les services tiers qui apparaissent sur nos pages.
          </p>
          <p className="text-gray-600 leading-relaxed">
            À tout moment, vous pouvez modifier ou retirer votre consentement dès la Déclaration relative aux cookies sur notre site web.
          </p>
          <p className="text-gray-600 leading-relaxed">
            En savoir plus sur qui nous sommes, comment vous pouvez nous contacter et comment nous traitons les données personnelles veuillez voir notre{" "}
            <a href="/politique-de-confidentialite" className="text-[#f97316] underline hover:text-[#ea6c0a]">
              Politique de confidentialité
            </a>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Votre consentement s'applique aux domaines suivants :{" "}
            <span className="font-semibold text-[#1a1a6e]">conseiluxtraining.com</span>
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#" className="text-[#f97316] underline hover:text-[#ea6c0a] text-sm font-medium">
              Modifiez consentement
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-[#f97316] underline hover:text-[#ea6c0a] text-sm font-medium">
              Retirez consentement
            </a>
          </div>
        </motion.div>

        {/* Tables */}
        <Section title={`Nécessaires (${necessaires.length})`}>
          <p className="text-gray-600 leading-relaxed mb-4">
            Les cookies nécessaires contribuent à rendre un site web utilisable en activant des fonctions de base comme la navigation de page et l'accès aux zones sécurisées du site web ainsi que les formulaires du site. Le site web ne peut pas fonctionner correctement sans ces cookies.
          </p>
          <CookieTable rows={necessaires} />
        </Section>

        <Section title={`Préférences (${preferences.length})`}>
          <p className="text-gray-600 leading-relaxed mb-4">
            Les cookies de préférences permettent à un site web de retenir des informations qui modifient la manière dont le site se comporte ou s'affiche, comme votre langue préférée ou la région dans laquelle vous vous situez.
          </p>
          <CookieTable rows={preferences} />
        </Section>

        <Section title={`Statistiques (${statistiques.length})`}>
          <p className="text-gray-600 leading-relaxed mb-4">
            Les cookies statistiques aident les propriétaires du site web, par la collecte et la communication d'informations de manière anonyme, à comprendre comment les visiteurs interagissent avec les sites web.
          </p>
          <CookieTable rows={statistiques} />
        </Section>

        <Section title={`Marketing (${marketing.length})`}>
          <p className="text-gray-600 leading-relaxed mb-4">
            Les cookies marketing sont utilisés pour effectuer le suivi des visiteurs au travers des sites web. Le but est d'afficher des publicités qui sont pertinentes et intéressantes pour l'utilisateur individuel et donc plus précieuses pour les éditeurs et annonceurs tiers.
          </p>
          <CookieTable rows={marketing} />
        </Section>

      </section>

      <Footer />
    </main>
  );
}