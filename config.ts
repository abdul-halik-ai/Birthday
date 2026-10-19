// ✏️ Edit everything here.
const B = import.meta.env.BASE_URL
export const config = {
  recipient: 'Sariyath Beevi',
  sender: 'Your name here',
  audioPath: `${B}music/song.mp3`, // optional: drop a file here; site works without it
  theme: { pink: '#f48eae', violet: '#b6a6ed', gold: '#d4ad62', navy: '#fffaf5' },
  letter: [
    'Happy Birthday, Sariyath Beevi! 💗',
    'Hey Sariyath!',
    'I wanted to make something different for your birthday, something that might make you smile.',
    "Some people have a way of making ordinary conversations feel special without even trying. And honestly, you're one of those people.",
    'I hope this new year of your life brings you happiness, beautiful memories, unexpected blessings, and countless reasons to smile.',
    "I'm really glad we got to know each other, and I hope your birthday is as lovely as the person you are.",
    'Keep smiling, birthday girl. You deserve so many beautiful things in life. 🌷',
    'Happy Birthday! ❤️',
  ],
  blessing: 'May your days be filled with happiness, your heart with peace, and your future with beautiful surprises.',
  finalMessage: ['Some people make life a little more beautiful just by being in it.', 'I\u2019m really glad I got to know you, Sariyath. ❤️'],
  // Replace placeholders: put real photos in public/photos and update `src` + `caption`.
  photos: Array.from({ length: 6 }, (_, i) => ({ src: `${B}photos/placeholder-${i + 1}.svg`, caption: `Caption ${i + 1} — edit in src/config.ts`, placeholder: true })),
}
