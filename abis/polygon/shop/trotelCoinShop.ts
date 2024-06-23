const trotelCoinShopABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "AdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address"
      }
    ],
    name: "BeaconUpgraded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "categoryId",
        type: "uint256"
      },
      { indexed: false, internalType: "string", name: "name", type: "string" }
    ],
    name: "CategoryAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "categoryId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "newName",
        type: "string"
      }
    ],
    name: "CategoryChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "categoryId",
        type: "uint256"
      }
    ],
    name: "CategoryEnabled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "categoryId",
        type: "uint256"
      }
    ],
    name: "CategoryRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFeePercentage",
        type: "uint256"
      }
    ],
    name: "FeePercentageChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "discount",
        type: "uint256"
      },
      { indexed: false, internalType: "string", name: "emoji", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string"
      }
    ],
    name: "ItemAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "categoryId",
        type: "uint256"
      }
    ],
    name: "ItemAddedToCategory",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256"
      }
    ],
    name: "ItemBuyed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "newName",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDiscount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "newEmoji",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "newDescription",
        type: "string"
      }
    ],
    name: "ItemChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      }
    ],
    name: "ItemEnabled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      }
    ],
    name: "ItemRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "categoryId",
        type: "uint256"
      }
    ],
    name: "ItemRemovedFromCategory",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      { indexed: true, internalType: "address", name: "user", type: "address" }
    ],
    name: "ItemUsed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnerChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleGranted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleRevoked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAddress",
        type: "address"
      }
    ],
    name: "TokenChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "UPGRADER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "string", name: "_name", type: "string" }],
    name: "addCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_discount", type: "uint256" },
      { internalType: "string", name: "_emoji", type: "string" },
      { internalType: "string", name: "_description", type: "string" }
    ],
    name: "addItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_itemId", type: "uint256" },
      { internalType: "uint256", name: "_categoryId", type: "uint256" }
    ],
    name: "addItemToCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_itemId", type: "uint256" },
      { internalType: "uint256", name: "_quantity", type: "uint256" }
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newFeePercentage", type: "uint256" }
    ],
    name: "changeFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_newAddress", type: "address" }],
    name: "changeTokenFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "daoAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_categoryId", type: "uint256" }],
    name: "enableCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "enableItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "feePercentage",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllCategories",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "uint256[]",
            name: "categoryItems",
            type: "uint256[]"
          },
          { internalType: "bool", name: "disabled", type: "bool" }
        ],
        internalType: "struct TrotelCoinShop.Category[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllItems",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint256", name: "discount", type: "uint256" },
          { internalType: "string", name: "emoji", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "bool", name: "disabled", type: "bool" }
        ],
        internalType: "struct TrotelCoinShop.Item[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_categoryId", type: "uint256" }],
    name: "getCategoryInformations",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "uint256[]",
            name: "categoryItems",
            type: "uint256[]"
          },
          { internalType: "bool", name: "disabled", type: "bool" }
        ],
        internalType: "struct TrotelCoinShop.Category",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "getItemInformations",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint256", name: "discount", type: "uint256" },
          { internalType: "string", name: "emoji", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "bool", name: "disabled", type: "bool" }
        ],
        internalType: "struct TrotelCoinShop.Item",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_address", type: "address" },
      { internalType: "uint256", name: "_itemId", type: "uint256" }
    ],
    name: "getItemQuantity",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_categoryId", type: "uint256" }],
    name: "getItemsInCategory",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint256", name: "discount", type: "uint256" },
          { internalType: "string", name: "emoji", type: "string" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "bool", name: "disabled", type: "bool" }
        ],
        internalType: "struct TrotelCoinShop.Item[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalCategories",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalItems",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_daoAddress", type: "address" },
      { internalType: "uint256", name: "_feePercentage", type: "uint256" },
      { internalType: "address", name: "_tokenFeeAddress", type: "address" },
      { internalType: "address", name: "_upgrader", type: "address" }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_categoryId", type: "uint256" },
      { internalType: "string", name: "_newName", type: "string" }
    ],
    name: "modifyCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_itemId", type: "uint256" },
      { internalType: "string", name: "_newName", type: "string" },
      { internalType: "uint256", name: "_newPrice", type: "uint256" },
      { internalType: "uint256", name: "_newDiscount", type: "uint256" },
      { internalType: "string", name: "_newEmoji", type: "string" },
      { internalType: "string", name: "_newDescription", type: "string" }
    ],
    name: "modifyItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_categoryId", type: "uint256" }],
    name: "removeCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "removeItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_itemId", type: "uint256" },
      { internalType: "uint256", name: "_categoryId", type: "uint256" }
    ],
    name: "removeItemFromCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" }
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "tokenFee",
    outputs: [
      { internalType: "contract TrotelCoinV2", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" }
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "useItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export default trotelCoinShopABI;
