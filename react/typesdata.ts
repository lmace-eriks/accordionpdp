export interface DataPoints {
  // Snowboard
  ProductData_AllStyle_SB?: PointObject;
  ProductData_WinBaseTech_SB?: PointObject;
  ProductData_WinBaseType_SB?: PointObject;
  ProductData_WinCore_SB?: PointObject;
  ProductData_WinFlex_SB?: PointObject;
  ProductData_Gender_SB?: PointObject;
  ProductData_WinMounting_SB?: PointObject;
  ProductData_WinProfile_SB?: PointObject;
  ProductData_WinRiderLvl_SB?: PointObject;
  ProductData_WinStance_SB?: PointObject;
  ProductData_WinShape_SB?: PointObject;

  // Ski
  ProductData_AllStyle_SK?: PointObject;
  ProductData_WinBindings_SK?: PointObject;
  ProductData_WinCore_SK?: PointObject;
  ProductData_WinFlex_SK?: PointObject;
  ProductData_WinGeo_SK?: PointObject;
  ProductData_WinProfile_SK?: PointObject;
  ProductData_WinRiderLvl_SK?: PointObject;
  ProductData_WinTailType_SK?: PointObject;
  ProductData_WinTurnRadius_SK?: PointObject;
  ProductData_WinWaistWidth_SK?: PointObject;
  ProductData_Gender_SK?: PointObject;
}

export interface PointObject {
  label: string;
  sublabel?: string;
  sortPriority: number; // Sort order. Lower numbers are higher priority. Zero is a valid value.
  info?: MoreInfoObject;
  value?: string; // Loaded from VTEX server.
}

export interface MoreInfoObject {
  title?: string;
  text?: string;
  image?: string;
}

export interface VTEXProperty {
  name: string;
  values: Array<string>;
}

export const snowboardDataPoints: DataPoints = {
  ProductData_AllStyle_SB: {
    label: "All Style",
    sortPriority: 0,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>All Mountain</b> - Ride anywhere on the resort.</li><li data-lm-list-item><b>Freeride</b> - All about carving and speed from groomed runs to fresh powder on the natural terrain of a mountain.</li><li data-lm-list-item><b>Freestyle</b> - Designed for riding on features from handrails, jumps, and half pipe in the terrain park to natural features and side hits on theresort.</li><li data-lm-list-item><b>Backcountry</b> - Ride in untracked and natural mountain terrain.</li><li data-lm-list-item><b>Powder</b> - Specifically shaped and designed to float in deep, fresh snow conditions.</li><li data-lm-list-item><b>Splitboard</b> - Used with specific bindings and skins to convert the snowboard into skis for hiking uphill to reach inaccessible slopes.</li></ul>",
    },
  },
  ProductData_WinBaseTech_SB: {
    label: "Base Tech",
    sortPriority: 10,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Extruded Base</b> - Found on most beginner and freestyle snowboards. Durable and made to be easier to repair and maintain.</li> <li data-lm-list-item> <b> Sintered Base</b> - Absorbs and holds wax better for more custom tuning resulting in faster performance but does require more frequent wax application. </li> </ul>",
    },
  },
  ProductData_WinBaseType_SB: {
    label: "Base Type",
    sortPriority: 10,
  },
  ProductData_WinCore_SB: {
    label: "Core",
    sortPriority: 10,
    info: {
      text:
        "<p data-lm-text> The material in the core of a snowboard is typically made of wood or other materials that enhance how the board rides and behaves on snow. </p>",
    },
  },
  ProductData_WinFlex_SB: {
    label: "Flex",
    sortPriority: 3,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Soft Flex</b> - Forgiving and easier to apply pressure to while riding.</li> <li data-lm-list-item><b>Medium Flex</b> - Versatile and responsive in varying conditions and terrain.</li> <li data-lm-list-item><b>Stiff Flex</b> - Less forgiving allowing for pressure to transfer edge to edge for a quick responsive board at high speeds.</li> </ul>",
    },
  },
  ProductData_Gender_SB: {
    label: "Gender",
    sortPriority: 10,
  },
  ProductData_WinMounting_SB: {
    label: "Mounting",
    sortPriority: 10,
    info: {
      text:
        "<p data-lm-text>The insert formation on the snowboard determines if a binding is compatible, how it is mounted, and your range of stance options.</p>",
    },
  },
  ProductData_WinProfile_SB: {
    label: "Profile",
    sortPriority: 1,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Camber</b> - Best for carving and maintaining control and stability at speed on groomed runs or hard-pack with a lively responsive feel.</li><li data-lm-list-item><b>Rocker</b> - Designed for quick turn initiation with a loose, surfy feel ideal for freestyle riding and fresh powder runs.</li><li data-lm-list-item><b>Flat</b> - Versatile for various riding styles with balanced maneuverability and stability.</li><li data-lm-list-item><b>Hybrid</b> - Is a combination of bends in the profile of a snowboard that change the riding characteristics for different terrains and conditions.</li></ul>",
    },
  },
  ProductData_WinRiderLvl_SB: {
    label: "Rider Level",
    sortPriority: 4,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Beginner</b> - From a first-time rider to learning the foundations of carving and stopping.</li> <li data-lm-list-item><b>Intermmediate</b> - A rider that has mastered the basics wants to explore riding different terrain or increasing speed.</li> <li data-lm-list-item><b>Advanced/Expert</b> - An experienced rider that can ride difficult terrain in any conditions.</li> </ul>",
    },
  },
  ProductData_WinStance_SB: {
    label: "Stance",
    sortPriority: 10,
  },
  ProductData_WinShape_SB: {
    label: "Shape",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Twin</b> - The nose of the snowboard is the same shape and rise as the tail to ride the board in either direction and balanced freestyle riding.</li><li data-lm-list-item><b> Directional Twin</b> - The nose of the snowboard is the same shape and rise as the tail with the binding inserts set back for more surface area inthe nose and versatility when riding in different snow conditions and terrain.</li><li data-lm-list-item><b>Directional</b> - The nose is typically longer and/or wider than the tail for float in powder and downhill riding.</li></ul>",
    },
  },
};

export const skiDataPoints: DataPoints = {
  ProductData_AllStyle_SK: {
    label: "All Style",
    sortPriority: 0,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>All Mountain/On Piste</b> - Ride anywhere on the resort.</li><li data-lm-list-item><b>Freeride</b> - All about carving and speed from groomed runs to fresh powder on the natural terrain of a mountain.</li><li data-lm-list-item><b> Freestyle</b> - Designed for riding on features from handrails, jumps, and half pipe in the terrain park to natural features and side hits on theresort.</li><li data-lm-list-item><b>Backcountry</b> - Ride in untracked and natural mountain terrain.</li><li data-lm-list-item><b>Powder</b> - Specifically shaped and designed to carve and float in deep, fresh snow conditions.</li></ul>",
    },
  },
  ProductData_WinBindings_SK: {
    label: "Bindings",
    sortPriority: 10,
  },
  ProductData_WinCore_SK: {
    label: "Core",
    sortPriority: 10,
    info: {
      text:
        "<p data-lm-text>The materials in the cores of skis are typically made of wood or other materials that enhance how the skis ride and behave on snow.</p>",
    },
  },
  ProductData_WinFlex_SK: {
    label: "Flex",
    sortPriority: 10,
  },
  ProductData_Gender_SK: {
    label: "Gender",
    sortPriority: 10,
  },
  ProductData_WinGeo_SK: {
    label: "Dimensions",
    sublabel: "Tip / Waist / Tail",
    sortPriority: 10,
  },
  ProductData_WinProfile_SK: {
    label: "Profile",
    sortPriority: 1,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Camber</b> - Best for carving and maintaining control and stability at speed on groomed runs or hard-pack with a lively responsive feel.</li><li data-lm-list-item><b>Rocker</b> - Designed for quick turn initiation with a loose, surfy feel ideal for freestyle riding and fresh powder runs.</li><li data-lm-list-item><b>Flat</b> - Versatile for various riding styles with balanced maneuverability and stability.</li><li data-lm-list-item><b>Hybrid</b> - Is a combination of bends in the profile of skis that change the riding characteristics for different terrains and conditions.</li></ul>",
    },
  },
  ProductData_WinRiderLvl_SK: {
    label: "Rider Level",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Beginner</b> - From a first-time rider to learning the foundations of carving and stopping.</li> <li data-lm-list-item><b>Intermmediate</b> - A rider that has mastered the basics wants to explore riding different terrain on the resort.</li> <li data-lm-list-item><b>Advanced/Expert</b> - An experienced rider that can ride difficult terrain in any conditions.</li></ul>",
    },
  },
  ProductData_WinTailType_SK: {
    label: "Tail Type",
    sortPriority: 10,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item> <b>Twin Tip</b> - Rounded shape with an early rise in the tail of the ski adapted for in the terrain park, on features, and buttering down runs. </li> <li data-lm-list-item><b>Flared</b> - A more traditional flat shape with a slight rise in the tail for grip and stability on different terrain.</li> <li data-lm-list-item><b>Flat</b> - Shaped for more control on firm snow and quick turning versatility.</li> </ul>",
    },
  },
  ProductData_WinTurnRadius_SK: {
    label: "Turn Radius",
    sortPriority: 4,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Short</b> - A radius of 15 meters or less designed for quick maneuverability from edge to edge.</li> <li data-lm-list-item><b>Medium</b> - A versatile all mountain radius that falls between 15-20 meters ideal for most riders.</li> <li data-lm-list-item><b>Long</b>- A radius of 20 meters or more for aggressive, big mountain riding at high speeds.</li> </ul>",
    },
  },
  ProductData_WinWaistWidth_SK: {
    label: "Waist Width",
    sortPriority: 3,
    info: {
      text:
        "<p data-lm-text> Waist width refers to how wide the ski is at the narrowest section of the ski. A wider waist width is a larger platform for floating in deep powder conditions, and a narrow waist is more agile on hardpack. </p>",
    },
  },
};

export const categories: any = {
  snowboards: snowboardDataPoints,
  skis: skiDataPoints,
  // bicycles: bikeDataPoints,
};
