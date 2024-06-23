type AbiType = "function" | "constructor" | "event" | "fallback" | "receive";

interface AbiInput {
  internalType: string;
  name: string;
  type: string;
}

interface AbiOutput {
  internalType: string;
  name: string;
  type: string;
}

interface AbiFunction {
  type: "function";
  name: string;
  inputs: AbiInput[];
  outputs: AbiOutput[];
  stateMutability: string;
}

interface AbiConstructor {
  type: "constructor";
  inputs: AbiInput[];
  stateMutability: string;
}

interface AbiEvent {
  type: "event";
  name: string;
  inputs: AbiInput[];
  anonymous: boolean;
}

interface AbiFallback {
  type: "fallback";
  stateMutability: string;
}

interface AbiReceive {
  type: "receive";
  stateMutability: string;
}

export type Abi =
  | AbiFunction
  | AbiConstructor
  | AbiEvent
  | AbiFallback
  | AbiReceive;
