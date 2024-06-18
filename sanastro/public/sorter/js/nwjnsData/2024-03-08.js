dataSetVersion = "2024-03-07"; // Change this when creating a new data set version. YYYY-MM-DD format.
dataSet[dataSetVersion] = {};

dataSet[dataSetVersion].options = [
  {
    name: "Filter by Release Group",
    key: "album",
    tooltip: "Check this to restrict to certain albums.",
    checked: true,
    sub: [
      { name: "New Jeans",
        key: "nwjns", tooltip: "released Aug 01, 2022" },
      { name: "OMG",
        key: "omgod", tooltip: "released Jan 02, 2023" }, // Single
      { name: "Zero",
        key: "0coke", tooltip: "released Apr 03, 2023" }, // Collab, Single
      { name: "Get Up",
        key: "getup", tooltip: "released Jul 07, 2023" },
      { name: "아름다운 구속",
        key: "ost01", tooltip: "released Sep 01, 2023" }, // OST
      { name: "GODS",
        key: "ost02", tooltip: "released Oct 04, 2023" }, // OST
      { name: "우리의 밤은 당신의 낮보다 아름답다",
        key: "ost03", tooltip: "released Nov 24, 2023" }, // OST
      { name: "NJWMX",
        key: "njwmx", tooltip: "released Dec 19, 2023" }, // Remix
      { name: "How Sweet",
        key: "sweet", tooltip: "released May 24, 2024" }  // Single
    ]
  },

  {
    name: "Remove Collaboration albums",
    key: "collab",
    tooltip: "Check this to remove songs from collaboration albums.",
    checked: false
  },
  {
    name: "Remove Remixes",
    key: "remix",
    tooltip: "Check this to remove remixes.",
    checked: false
  },
  {
    name: "Remove OSTs",
    key: "ost",
    tooltip: "Check this to remove songs released as OSTs or Theme Songs (League of Legends).",
    checked: true
  },
  {
    name: "Remove Instrumentals",
    key: "inst",
    tooltip: "Check this to remove instrumental versions of songs.",
    checked: true
  }
];

dataSet[dataSetVersion].characterData = [
  {
    name: "Attention",
    img: "tlhexAp.png",
    opts: {
      album: ["nwjns"]
    }
  },
  {
    name: "Hype Boy",
    img: "tlhexAp.png",
    opts: {
      album: ["nwjns"]
    }
  },
  {
    name: "Cookie",
    img: "tlhexAp.png",
    opts: {
      album: ["nwjns"]
    }
  },
  {
    name: "Hurt",
    img: "tlhexAp.png",
    opts: {
      album: ["nwjns"]
    }
  },
  //////////////////////////////
  {
    name: "OMG",
    img: "rjVivJl.jpeg",
    opts: {
      album: ["omgod"]
    }
  },
  {
    name: "Ditto",
    img: "rjVivJl.jpeg",
    opts: {
      album: ["omgod"]
    }
  },
  //////////////////////////////
  {
    name: "Zero",
    img: "MLznEIf.png",
    opts: {
      album: ["0coke"],
      collab: true
    }
  },
  {
    name: "Zero (J.I.D Remix)",
    img: "HIcxl7g.png",
    opts: {
      album: ["0coke"],
      collab: true,
      remix: true
    }
  },
  {
    name: "Be Who You Are (Real Magic)",
    img: "eGgoQ3U.png",
    opts: {
      album: ["0coke"],
      collab: true
    }
  },
  //////////////////////////////
  {
    name: "New Jeans",
    img: "RWCFyCY.png",
    opts: {
      album: ["getup"]
    }
  },
  {
    name: "Super Shy",
    img: "RWCFyCY.png",
    opts: {
      album: ["getup"]
    }
  },
  {
    name: "ETA",
    img: "RWCFyCY.png",
    opts: {
      album: ["getup"]
    }
  },
  {
    name: "Cool With You",
    img: "RWCFyCY.png",
    opts: {
      album: ["getup"]
    }
  },
  {
    name: "Get Up",
    img: "RWCFyCY.png",
    opts: {
      album: ["getup"]
    }
  },
  {
    name: "ASAP",
    img: "RWCFyCY.png",
    opts: {
      album: ["getup"]
    }
  },
  //////////////////////////////
  {
    name: "아름다운 구속",
    img: "vUVcIPS.jpeg",
    opts: {
      album: ["ost01"],
      ost: true
    }
  },
  //////////////////////////////
  {
    name: "GODS",
    img: "IekzKPS.png",
    opts: {
      album: ["ost02"],
      ost: true
    }
  },
  //////////////////////////////
  {
    name: "우리의 밤은 당신의 낮보다 아름답다",
    img: "AkGorYT.png",
    opts: {
      album: ["ost03"],
      ost: true
    }
  },
  //////////////////////////////
  {
    name: "Ditto 250 Remix",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true
    }
  },
  {
    name: "OMG FRNK Remix",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true
    }
  },
  {
    name: "Attention 250 Remix",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true
    }
  },
  {
    name: "Hype Boy 250 Remix",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true
    }
  },
  {
    name: "Cookie FRNK Remix",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true
    }
  },
  {
    name: "Hurt 250 Remix",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true
    }
  },
  {
    name: "Ditto 250 Remix (Inst.)",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true,
      inst: true
    }
  },
  {
    name: "OMG FRNK Remix (Inst.)",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true,
      inst: true
    }
  },
  {
    name: "Attention 250 Remix (Inst.)",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true,
      inst: true
    }
  },
  {
    name: "Hype Boy 250 Remix (Inst.)",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true,
      inst: true
    }
  },
  {
    name: "Cookie FRNK Remix (Inst.)",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true,
      inst: true
    }
  },
  {
    name: "Hurt 250 Remix (Inst.)",
    img: "VkBVXZp.png",
    opts: {
      album: ["njwmx"],
      remix: true,
      inst: true
    }
  },
  //////////////////////////////
  {
    name: "How Sweet",
    img: "LB8QV0M.png",
    opts: {
      album: ["sweet"]
    }
  },
  {
    name: "Bubble Gum",
    img: "LB8QV0M.png",
    opts: {
      album: ["sweet"]
    }
  },
];