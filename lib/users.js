const bcrypt = require('bcryptjs')

// NOUVEAUX HASHS BCRYPT - MIS À JOUR $(date)
const hashedPasswords = {
  'fifamè': '$2a$10$/JL0zmTqz6LED4HtgrOg.uViU6Apx3MXK3SGNedRNBnrk1uy6ER3u',
  'emmanuel': '$2a$10$cGlyRFiV0l9XAkUQWylY/uIhyVYUXN49PsT4EL/NVRJXQSg4rsJZ.',
  'yinki': '$2a$10$yIQ8O6.Q6AgTO4ShkK1oQuDBlPFNjOu0imR.jtfnGh1ISDrgKvLW6',
  'rahama': '$2a$10$qYNpDLNxExn51jWh0JTuA.6wcJ.2Q5rpBQIHy0t5iXC6QQ89d6L7K',
  'noham': '$2a$10$Ks65.0u3C6b0qhRg3/I61.rle8hA62Zr8paqqZei33cXkv7MuGJoW',
  'queen': '$2a$10$eh6I1F/OSlq28s6I60HHW.FNS4OCzFg8GhOvyZzTxowpoI7EHQa26',
  'mékaddishem': '$2a$10$svJjEPw1O4wCtfiFufxm/u6UMB0Nw71fk3oEC6h/JpD6jEnsjOA8G',
  'faith': '$2a$10$dIS3TnPj/bfZqshYLnfYwOVqpDlPsMohmK2i8q.DB/QzZef7sJfCK',
  'péniel': '$2a$10$HDMHmBNoAASY1/iTD5ZHSOtI0uk80RylKRqIgziwp.CSlZaNOAuoi',
  'naelle': '$2a$10$4caC4HPbQfNsDvgGDuEzwuvmEoP/oOW1YP58kRwgRDgQB.8kcmt0G'
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash)
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}

const users = [
  {
    matricule: "CE1-1",
    passwordHash: '$2a$10$/JL0zmTqz6LED4HtgrOg.uViU6Apx3MXK3SGNedRNBnrk1uy6ER3u',
    nomEleve: "AGBLO AGONDJIHOSSOU Fifamè",
    nomParent: "Parent de Fifamè",
    fichierPDF: "bulletin_fifame.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-2",
    passwordHash: '$2a$10$cGlyRFiV0l9XAkUQWylY/uIhyVYUXN49PsT4EL/NVRJXQSg4rsJZ.',
    nomEleve: "AKYOH Emmanuel",
    nomParent: "Parent d'Emmanuel",
    fichierPDF: "bulletin_emmanuel.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-3",
    passwordHash: '$2a$10$yIQ8O6.Q6AgTO4ShkK1oQuDBlPFNjOu0imR.jtfnGh1ISDrgKvLW6',
    nomEleve: "AMADOU Yinki",
    nomParent: "Parent de Yinki",
    fichierPDF: "bulletin_yinki.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-4",
    passwordHash: '$2a$10$qYNpDLNxExn51jWh0JTuA.6wcJ.2Q5rpBQIHy0t5iXC6QQ89d6L7K',
    nomEleve: "BANI Rahama",
    nomParent: "Parent de Rahama",
    fichierPDF: "bulletin_rahama.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-5",
    passwordHash: '$2a$10$Ks65.0u3C6b0qhRg3/I61.rle8hA62Zr8paqqZei33cXkv7MuGJoW',
    nomEleve: "DAHOUGOU Noham",
    nomParent: "Parent de Noham",
    fichierPDF: "bulletin_noham.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-6",
    passwordHash: '$2a$10$eh6I1F/OSlq28s6I60HHW.FNS4OCzFg8GhOvyZzTxowpoI7EHQa26',
    nomEleve: "EDAH Queen",
    nomParent: "Parent de Queen",
    fichierPDF: "bulletin_queen.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-7",
    passwordHash: '$2a$10$svJjEPw1O4wCtfiFufxm/u6UMB0Nw71fk3oEC6h/JpD6jEnsjOA8G',
    nomEleve: "HOUEHOU Mékaddishem",
    nomParent: "Parent de Mékaddishem",
    fichierPDF: "bulletin_mekaddishem.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-8",
    passwordHash: '$2a$10$dIS3TnPj/bfZqshYLnfYwOVqpDlPsMohmK2i8q.DB/QzZef7sJfCK',
    nomEleve: "PADONOU Faith",
    nomParent: "Parent de Faith",
    fichierPDF: "bulletin_faith.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-9",
    passwordHash: '$2a$10$HDMHmBNoAASY1/iTD5ZHSOtI0uk80RylKRqIgziwp.CSlZaNOAuoi',
    nomEleve: "SOVI Péniel",
    nomParent: "Parent de Péniel",
    fichierPDF: "bulletin_peniel.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  },
  {
    matricule: "CE1-10",
    passwordHash: '$2a$10$4caC4HPbQfNsDvgGDuEzwuvmEoP/oOW1YP58kRwgRDgQB.8kcmt0G',
    nomEleve: "TOSSAVI Naelle",
    nomParent: "Parent de Naelle",
    fichierPDF: "bulletin_naelle.pdf",
    classe: "CE1",
    ecole: "Les Bulles de joie"
  }
]

module.exports = {
  users,
  verifyPassword,
  hashPassword
}
