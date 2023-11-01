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
  info?: MoreInfoObject;
  value?: string; // Loaded from VTEX server.
}

export interface MoreInfoObject {
  title?: string;
  text?: string;
  image?: string;
}

export const snowboardDataPoints: DataPoints = {
  ProductData_AllStyle_SB: {
    label: "All Style",
    info: {
      text: "All Style represents different riding styles.",
    },
  },
  ProductData_WinBaseTech_SB: {
    label: "Base Tech",
    info: {
      text: "The technology that goes into the base material.",
    },
  },
  ProductData_WinBaseType_SB: {
    label: "Base Type",
    info: {
      text: "The way the base material is processed determines the type of base.",
    },
  },
  ProductData_WinCore_SB: {
    label: "Core",
    info: {
      text: "The materials used inside the snowboard make up it's core.",
    },
  },
  ProductData_WinFlex_SB: {
    label: "Flex",
    info: {
      text: "How easily the snowboard flexes determines how stiff or soft the snowboard is.",
    },
  },
  ProductData_Gender_SB: {
    label: "Gender",
    info: {
      text: "Snowboard technology is adapted to the type of rider.",
    },
  },
  ProductData_WinMounting_SB: {
    label: "Mounting",
    info: {
      text: "The insert formation on the snowboard determines the way the binding is mounted.",
    },
  },
  ProductData_WinProfile_SB: {
    label: "Profile",
    info: {
      text: "The profile represent the lateral shape of the snowboard.",
    },
  },
  ProductData_WinRiderLvl_SB: {
    label: "Rider Level",
    info: {
      text: "Rider level is determined by the skill level of the rider.",
    },
  },
  ProductData_WinStance_SB: {
    label: "Stance",
    info: {
      text: "The stance on a snowboard refers to how the bindings will be mounted.",
    },
  },
  ProductData_WinShape_SB: {
    label: "Shape",
    info: {
      text: "The shape of the nose and tail.",
    },
  },
};

export const skiDataPoints: DataPoints = {
  ProductData_AllStyle_SK: {
    label: "All Style",
    info: {
      text: "All Style represents different riding styles.",
    },
  },
  ProductData_WinBindings_SK: {
    label: "Bindings",
    info: {
      text: "The type of binding and how it's mounted on the ski.",
    },
  },
  ProductData_WinCore_SK: {
    label: "Core",
    info: {
      text: "The materials used inside the ski make up it's core.",
    },
  },
  ProductData_WinFlex_SK: {
    label: "Flex",
    info: {
      text: "How easily the ski flexes determines how stiff or soft the ski is.",
    },
  },
  ProductData_Gender_SK: {
    label: "Gender",
    info: {
      text: "Ski technology is adapted to the type of rider.",
    },
  },
  ProductData_WinGeo_SK: {
    label: "Geometry",
    info: {
      text: "The geography of the ski is based on which type of terrain it's best suited for.",
    },
  },
  ProductData_WinProfile_SK: {
    label: "Profile",
    info: {
      text: "The profile represent the lateral shape of the ski.",
    },
  },
  ProductData_WinRiderLvl_SK: {
    label: "Rider Level",
    info: {
      text: "Rider level is determined by the skill level of the rider.",
    },
  },
  ProductData_WinTailType_SK: {
    label: "Tail Type",
    info: {
      text: "Tail type refers to the overall shape and rise of the tail of the ski.",
    },
  },
  ProductData_WinTurnRadius_SK: {
    label: "Turn Radius",
    info: {
      text: "The turn radius calculates how wide or tight the ski can turn.",
    },
  },
  ProductData_WinWaistWidth_SK: {
    label: "Waist Width",
    info: {
      text: "Waist width refers to how wide the ski is under the bindings.",
    },
  },
};

// export const bikeDataPoints: DataPoints = {
//   bestUse: "ProductData_BikeBestUse",
//   material: "ProductData_BikeMaterial",
//   wheelSize: "ProductData_BikeWhlSize",
//   cassetteGears: "ProductData_BikeCasGears",
//   chainrings: "ProductData_BikeChainrings",
//   handlebar: "ProductData_BikeHandlebar",
// };

export const categories: any = {
  snowboards: snowboardDataPoints,
  skis: skiDataPoints,
  // bicycles: bikeDataPoints,
};
