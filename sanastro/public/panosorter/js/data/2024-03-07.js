dataSetVersion = "2024-03-07"; // Change this when creating a new data set version. YYYY-MM-DD format.
dataSet[dataSetVersion] = {};

dataSet[dataSetVersion].options = [
  {
    name: "Filter by Album",
    key: "album",
    tooltip: "Check this to restrict to certain albums.",
    checked: true,
    sub: [
      { name: "Let's Walk on the Path of a Blue Cat",
        key: "abluecat", tooltip: "released Jan 17, 2020" },
      { name: "To See the Next Part of the Dream",
        key: "tstnpotd", tooltip: "released Feb 23, 2021" },
      // Into the Endless Night has been skipped because it's not on Bandcamp. 24 Aug 2021.
      { name: "Downfall of the Neon Youth",
        key: "neonyuth", tooltip: "released Oct 22, 2021" }, // Collab
      { name: "Rough and Beautiful Place",
        key: "roughplc", tooltip: "released Jan 01, 2022" }, // mydreamfever
      { name: "White Ceiling / Black Dots Wandering Around",
        key: "wceiling", tooltip: "released Feb 23, 2022" },
      { name: "Paraglow",
        key: "paraglow", tooltip: "released Sep 21, 2022" }, // Collab
      { name: "After the Magic",
        key: "aftmagic", tooltip: "released Jan 28, 2023" },
      { name: "After the Night",
        key: "aftnight", tooltip: "released Mar 25, 2023" } // Live
    ]
  },
  // {
  //   name: "Remove Single exclusives",
  //   key: "single",
  //   tooltip: "Check this to remove songs *only* released as singles."
  // },
  {
    name: "Remove Collaboration albums",
    key: "collab",
    tooltip: "Check this to remove songs from collaboration albums.",
    checked: false
  },
  {
    name: "Remove live collections",
    key: "live",
    tooltip: "Check this to remove recordings of songs performed live.",
    checked: false
  },
  {
    name: "Remove mydreamfever songs",
    key: "mdf",
    tooltip: "Check this to remove songs released under mydreamfever.",
    checked: true
  }
];

dataSet[dataSetVersion].characterData = [
  {
    name: "오늘의 하늘은 맑음 (Today's Sky Is Clear)",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "꿈속의 이명 (Dream Hallucination)",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "Path of a Blue Cat",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "변해가는 의미 (Meaning of Change)",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "Bright Dark, Lost Shoelaces, One Year of Failure",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "혼자 걷는 숲 (Alone in the Forest)",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "Tone After Tone",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "Reincarnation",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "사라지는 의미 (Meaning of Disappear)",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  {
    name: "The Next Day",
    img: "WPMjE3t.jpeg",
    opts: {
      album: ["abluecat"]
    }
  },
  //////////////////////////////
  {
    name: "아름다운 세상 (Beautiful World)",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "변명 (Excuse)",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "아날로그 센티멘탈리즘 (Analog Sentimentalism)",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "흰​천​장 (White Ceiling)",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "To See the Next Part of the Dream",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "격변의 시대 (Age of Fluctuation)",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "청춘반란 (Youth Rebellion)",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "엑스트라 일대기 (Extra Story)",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "Chicken",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  {
    name: "I Can Feel My Heart Touching You",
    img: "tGhoTjp.png",
    opts: {
      album: ["tstnpotd"]
    }
  },
  //////////////////////////////
  {
    name: "Insomnia",
    img: "N9NZKSL.jpeg",
    opts: {
      album: ["neonyuth"],
      collab: true
    }
  },
  {
    name: "Colors",
    img: "N9NZKSL.jpeg",
    opts: {
      album: ["neonyuth"],
      collab: true
    }
  },
  {
    name: "70 Seconds Before Sunrise",
    img: "N9NZKSL.jpeg",
    opts: {
      album: ["neonyuth"],
      collab: true
    }
  },
  {
    name: "Love Migraine",
    img: "N9NZKSL.jpeg",
    opts: {
      album: ["neonyuth"],
      collab: true
    }
  },
  //////////////////////////////
  {
    name: "Sprout",
    img: "I9FLuN0.jpeg",
    opts: {
      album: ["roughplc"],
      mdf: true
    }
  },
  {
    name: "Moment Is Now",
    img: "I9FLuN0.jpeg",
    opts: {
      album: ["roughplc"],
      mdf: true
    }
  },
  {
    name: "Circulation",
    img: "I9FLuN0.jpeg",
    opts: {
      album: ["roughplc"],
      mdf: true
    }
  },
  {
    name: "Spirit of Love",
    img: "I9FLuN0.jpeg",
    opts: {
      album: ["roughplc"],
      mdf: true
    }
  },
  {
    name: "Ether",
    img: "I9FLuN0.jpeg",
    opts: {
      album: ["roughplc"],
      mdf: true
    }
  },
  {
    name: "Rough and Beautiful Place",
    img: "I9FLuN0.jpeg",
    opts: {
      album: ["roughplc"],
      mdf: true
    }
  },
  //////////////////////////////
  {
    name: "도피처 (Escape)",
    img: "1KiMvuQ.jpeg",
    opts: {
      album: ["wceiling"]
    }
  },
  {
    name: "언젠가 (Someday)",
    img: "1KiMvuQ.jpeg",
    opts: {
      album: ["wceiling"]
    }
  },
  {
    name: "그곳에는 낭만이 있다 (Soft Bruise)",
    img: "1KiMvuQ.jpeg",
    opts: {
      album: ["wceiling"]
    }
  },
  {
    name: "흰천장 (White Ceiling) (demo)",
    img: "1KiMvuQ.jpeg",
    opts: {
      album: ["wceiling"]
    }
  },
  {
    name: "성장통 (Growing Pain)",
    img: "1KiMvuQ.jpeg",
    opts: {
      album: ["wceiling"]
    }
  },
  {
    name: "Ending Credit",
    img: "1KiMvuQ.jpeg",
    opts: {
      album: ["wceiling"]
    }
  },
  //////////////////////////////
  {
    name: "손 (Hand)",
    img: "unPi9wv.jpeg",
    opts: {
      album: ["paraglow"],
      collab: true
    }
  },
  {
    name: "흰자 (The Light Side of the Eyes)",
    img: "unPi9wv.jpeg",
    opts: {
      album: ["paraglow"],
      collab: true
    }
  },
  {
    name: "늪 (Neoup)",
    img: "unPi9wv.jpeg",
    opts: {
      album: ["paraglow"],
      collab: true
    }
  },
  {
    name: "운전대 (Wheel)",
    img: "unPi9wv.jpeg",
    opts: {
      album: ["paraglow"],
      collab: true
    }
  },
  //////////////////////////////
  {
    name: "북극성 (Polaris) ",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "불면증 (Insomnia)",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "도착 (Arrival)",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "우리는 밤이 되면 빛난다 (We Shine at Night)",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "Parade",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "스케치북 (Sketchbook)",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "Imagination",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "Sound Inside Me, Waves Inside You",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "개화 (Blossom)",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  {
    name: "After the Magic",
    img: "TJCJBVD.jpeg",
    opts: {
      album: ["aftmagic"]
    }
  },
  //////////////////////////////
  {
    name: "북극성 (Polaris)",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  },
  {
    name: "아름다운 세상 (Beautiful World)",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  },
  {
    name: "아날로그 센티멘탈리즘 (Analog Sentimentalism)",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  },
  {
    name: "그곳에는 낭만이 있다 (Soft Bruise)",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  },
  {
    name: "Imagination",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  },
  {
    name: "I Can Feel My Heart Touching You",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  },
  {
    name: "흰천장 (White Ceiling)",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  },
  {
    name: "Into the Endless Night",
    img: "tTG0rp9.jpeg",
    opts: {
      album: ["aftnight"],
      live: true
    }
  }
  //////////////////////////////
];
