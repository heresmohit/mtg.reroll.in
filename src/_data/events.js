// Next upcoming Saturday at 5pm IST. Recomputed at build time so the backup
// event never looks stale. Returns the date label (e.g. "13 Jun") in IST.
function nextSaturdayLabel() {
  // Work in IST (UTC+5:30) so "Saturday" and the date are correct for Bangalore.
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(Date.now() + IST_OFFSET_MS);
  const day = nowIST.getUTCDay(); // 0=Sun … 6=Sat, in IST
  let add = (6 - day + 7) % 7; // days until Saturday
  if (add === 0) add = 7; // if today is Saturday, use next Saturday
  const sat = new Date(nowIST);
  sat.setUTCDate(sat.getUTCDate() + add);
  return sat.toLocaleDateString("en-IN", {
    timeZone: "UTC", // sat is already shifted into IST wall-clock
    month: "short",
    day: "numeric",
  });
}

// Backup event rendered when the upstream feed returns nothing (empty or error).
// Keeps the page from going eventless. Shape matches the UC-ingest events.json,
// plus a `dateLine` override so it always reads "Saturday, <date>, 5pm".
const FALLBACK_EVENTS = [
  {
    title: "Magic: The Gathering with ReRoll Board Games",
    excerpt:
      "Join the only (as far as we know) MTG group in Bangalore for a day of Magic. Beginners and veterans welcome — bring a deck or borrow one!",
    full_content: null,
    image_url:
      "https://underline.center/uploads/default/original/1X/648ccd6cad9b66fb9632156ffc8ee2c320af975c.jpeg",
    thumbnails: [
      {
        max_width: null,
        max_height: null,
        width: 690,
        height: 388,
        url: "https://underline.center/uploads/default/original/1X/648ccd6cad9b66fb9632156ffc8ee2c320af975c.jpeg",
      },
      {
        max_width: 600,
        max_height: 600,
        width: 600,
        height: 337,
        url: "https://underline.center/uploads/default/optimized/1X/648ccd6cad9b66fb9632156ffc8ee2c320af975c_2_600x337.jpeg",
      },
    ],
    dateLine: `Saturday, ${nextSaturdayLabel()}, 5pm`,
    slug: "magic-the-gathering-with-reroll-board-games",
    url: "https://www.district.in/events/magic-the-gathering-with-reroll-board-games-buy-tickets",
    learn_more:
      "https://underline.center/t/magic-the-gathering-with-reroll-board-games/130",
    venue: "Underline Center, Indiranagar",
    tags: ["UC"],
  },
];

export default async function () {
  // Project deprecated: the live UC-ingest feed is no longer polled at build
  // time. Always serve the static fallback so any rebuild stays self-contained
  // and makes no external network calls.
  return FALLBACK_EVENTS;
}
