export interface ProductDataCardProps {
  validSpecs: DataPoints;
  blockClass?: string;
}

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
      text: "All Style is so cool ya gotta try it.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinBaseTech_SB: {
    label: "Base Tech",
    info: {
      text: "Base Tech is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinBaseType_SB: {
    label: "Base Type",
    info: {
      text: "Base Type is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinCore_SB: {
    label: "Core",
    info: {
      text: "Core is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinFlex_SB: {
    label: "Flex",
    info: {
      text: "Flex is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_Gender_SB: {
    label: "Gender",
    info: {
      text: "Gender is a social construct.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinMounting_SB: {
    label: "Mounting",
    info: {
      text: "Mounting is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinProfile_SB: {
    label: "Profile",
    info: {
      text: "Profile is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinRiderLvl_SB: {
    label: "Rider Level",
    info: {
      text: "Rider Level is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinStance_SB: {
    label: "Stance",
    info: {
      text: "Stance is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  ProductData_WinShape_SB: {
    label: "Shape",
    info: {
      text: "Shape is the ipsum lorum dolor sit amet.",
      image: "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
};

export const skiDataPoints: DataPoints = {
  ProductData_AllStyle_SK: {
    label: "All Style",
    info: {
      text: "This is the info for a ski All Style",
    },
  },
  ProductData_WinBindings_SK: {
    label: "Bindings",
    info: {
      text: "This is the info for a ski All Style",
    },
  },
  ProductData_WinCore_SK: {
    label: "Core",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_WinFlex_SK: {
    label: "Flex",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_Gender_SK: {
    label: "Gender",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_WinGeo_SK: {
    label: "Geometry",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_WinProfile_SK: {
    label: "Profile",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_WinRiderLvl_SK: {
    label: "Rider Level",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_WinTailType_SK: {
    label: "Tail Type",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_WinTurnRadius_SK: {
    label: "Turn Radius",
    info: {
      text: "This is the info for a ski Core",
    },
  },
  ProductData_WinWaistWidth_SK: {
    label: "Waist Width",
    info: {
      text: "This is the info for a ski Core",
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
