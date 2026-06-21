export interface Memory {
  id: number;
  image: string;
  caption: string;
}

export interface Note {
  id: number;
  icon: string;
  label: string;
  note: string;
}

export interface ContentConfig {
  recipient: {
    name: string;
    fullName: string;
    relationship: string;
    eyebrowEnvelope: string;
    eyebrowHero: string;
    eyebrowNotes: string;
    envelopeLetterLogo: string;
  };
  envelope: {
    eyebrow: string;
    heading: string;
    subheading: string;
    caption: string;
  };
  hero: {
    heading: string;
    subheading: string;
    body: string;
    audioTitle: string;
    audioSubtitle: string;
    audioSrc: string;
    audioCaption: string;
  };
  gallery: {
    eyebrowEmoji: string;
    subtitle: string;
    memories: Memory[];
  };
  notesSection: {
    heading: string;
    caption: string;
    notes: Note[];
  };
  closing: {
    heading: string;
    body: string;
  };
  finalLetter: {
    eyebrow: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
    sender: string;
    footer: string;
  };
}

export const contentConfig: ContentConfig = {
  recipient: {
    name: "Dad",
    fullName: "Papa",
    relationship: "dad",
    eyebrowEnvelope: "♥ FOR MY PYARE PAPA",
    eyebrowHero: "♥ FOR MY FIRST HERO",
    eyebrowNotes: "♥ THREE NOTES FOR DAD",
    envelopeLetterLogo: "D",
  },
  envelope: {
    eyebrow: "♥ FOR MY PYARE PAPA",
    heading: "a little something for you",
    subheading: "happy father's day ✦",
    caption: "tap to open ✦",
  },
  hero: {
    heading: "Happy Father's Day",
    subheading: "for my dad ✦",
    body: "thank you for being the quiet force that holds everything together. in a world that is always changing, you are my steadiest anchor, my advisory counsel, and my favorite storyteller. this is a tiny space built just to say thank you.",
    audioTitle: "Papa Meri Jaan",
    audioSubtitle: "SONU NIGAM",
    audioSrc: "/Papa Meri Jaan Animal 128 Kbps.mp3",
    audioCaption: "A song for my superhero",
  },
  gallery: {
    eyebrowEmoji: "our little album",
    subtitle: "a few moments i never want to forget ♡",
    memories: [
      {
        id: 1,
        image: "/photos/pic1.jpeg",
        caption: "the way you make everything feel steady — hope you always know it.",
      },
      {
        id: 2,
        image: "/photos/pic2.jpeg",
        caption: "every lesson and every dad-joke turned out to be the best memory.",
      },
      {
        id: 3,
        image: "/photos/pic3.jpeg",
        caption: "thank you for being my first hero, and my steadiest one.",
      },
    ],
  },
  notesSection: {
    heading: "three things i never said out loud",
    caption: "tap each card — there's a note inside ✦",
    notes: [
      {
        id: 1,
        icon: "⭐",
        label: "✦ YOU HAD MY BACK ✦",
        note: "whenever i failed, you did scolded me but also when I felt bad you calmly stood beside me and corrected me.",
      },
      {
        id: 2,
        icon: "🏅",
        label: "✦ THOSE SPORTS TIME ✦",
        note: "i actually remember the way we used to play football cricket and obv wwe, really miss those moments.",
      },
      {
        id: 3,
        icon: "🎗️",
        label: "✦ HOW MUCH I ADMIRE YOU ✦",
        note: "i don't say it, but i secretly hope to have even a fraction of your resilience and kindness one day. you did so well.",
      },
    ],
  },
  closing: {
    heading: "thank you, Dad.",
    body: "for the quiet sacrifices, the silly jokes, the unconditional reassurance, and for simply being who you are. here's a letter for you.",
  },
  finalLetter: {
    eyebrow: "✦ a letter, just for you ✦",
    salutation: "Dear Dad,",
    paragraphs: [
      "i was thinking about how we rarely take the time to put our gratitude into words. life moves so quickly, and we get caught up in the rhythm of our daily routines. but today, i wanted to write this just for you.",
      "thank you for showing me what genuine strength looks like. it's not in shouting or demanding attention; it's in the quiet, consistent ways you show up, support our family, and make everyone feel entirely safe. i've watched you handle challenges with absolute grace, and it inspires me more than you know.i still remember the janoar and the way you used to scold me, when i sit and think about it i realize how deeply you loved me and cared for me. really miss those moments.",
      "this little digital scrapbook is just a tiny token of my love. no matter how old i get, or where life's adventures take me, you will always be my first hero, my teacher, and my deepest inspiration. forver even in next lives i want to be your son and you my dad.",
    ],
    signOff: "with all my love,",
    sender: "★ your baban",
    footer: "with love · your captain",
  },
};
