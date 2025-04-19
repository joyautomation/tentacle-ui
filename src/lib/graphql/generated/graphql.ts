/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type MemoryUsage = {
  __typename?: 'MemoryUsage';
  external?: Maybe<Scalars['Float']['output']>;
  heapTotal?: Maybe<Scalars['Float']['output']>;
  heapUsed?: Maybe<Scalars['Float']['output']>;
  rss?: Maybe<Scalars['Float']['output']>;
};

export enum MemoryUsageUnits {
  Bytes = 'BYTES',
  Gb = 'GB',
  Kb = 'KB',
  Mb = 'MB'
}

export type Mutation = {
  __typename?: 'Mutation';
  enableSource?: Maybe<Plc>;
  setValue?: Maybe<Plc>;
};


export type MutationEnableSourceArgs = {
  sourceId: Scalars['String']['input'];
};


export type MutationSetValueArgs = {
  value: Scalars['String']['input'];
  variableId: Scalars['String']['input'];
};

export type Plc = {
  __typename?: 'Plc';
  config?: Maybe<PlcConfig>;
  runtime?: Maybe<PlcRuntime>;
};

export type PlcConfig = {
  __typename?: 'PlcConfig';
  mqtt?: Maybe<Array<PlcMqttConfig>>;
  sources?: Maybe<Array<PlcSourcesConfig>>;
  tasks?: Maybe<Array<PlcTask>>;
  variables?: Maybe<Array<PlcVariable>>;
};

export type PlcMqttConfig = {
  __typename?: 'PlcMqttConfig';
  clientId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  deviceId?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  groupId?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nodeId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  serverUrl?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type PlcMqttRuntime = {
  __typename?: 'PlcMqttRuntime';
  brokerUrl?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['String']['output']>;
  groupId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type PlcRuntime = {
  __typename?: 'PlcRuntime';
  mqtt?: Maybe<Array<PlcMqttRuntime>>;
  sources?: Maybe<Array<PlcSourceRuntime>>;
  tasks?: Maybe<Array<PlcTaskRuntime>>;
  variables?: Maybe<Array<PlcVariableRuntime>>;
};

export type PlcSourceRuntime = {
  __typename?: 'PlcSourceRuntime';
  description?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  error?: Maybe<PlcVariableError>;
  host?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  retryMaxDelay?: Maybe<Scalars['Int']['output']>;
  retryMinDelay?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PlcSourcesConfig = {
  __typename?: 'PlcSourcesConfig';
  description?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  port?: Maybe<Scalars['Int']['output']>;
  retryMaxDelay?: Maybe<Scalars['Int']['output']>;
  retryMinDelay?: Maybe<Scalars['Int']['output']>;
};

export type PlcTask = {
  __typename?: 'PlcTask';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  program?: Maybe<Scalars['String']['output']>;
  scanRate?: Maybe<Scalars['Int']['output']>;
};

export type PlcTaskError = {
  __typename?: 'PlcTaskError';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  stack?: Maybe<Scalars['String']['output']>;
};

export type PlcTaskMetrics = {
  __typename?: 'PlcTaskMetrics';
  executeTime?: Maybe<Scalars['Float']['output']>;
  waitTime?: Maybe<Scalars['Float']['output']>;
};

export type PlcTaskRuntime = {
  __typename?: 'PlcTaskRuntime';
  description?: Maybe<Scalars['String']['output']>;
  error?: Maybe<PlcTaskError>;
  id?: Maybe<Scalars['String']['output']>;
  interval?: Maybe<Scalars['Int']['output']>;
  metrics?: Maybe<PlcTaskMetrics>;
  name?: Maybe<Scalars['String']['output']>;
  program?: Maybe<Scalars['String']['output']>;
  scanRate?: Maybe<Scalars['Int']['output']>;
};

export type PlcVariable = {
  __typename?: 'PlcVariable';
  datatype?: Maybe<Scalars['String']['output']>;
  default?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type PlcVariableError = {
  __typename?: 'PlcVariableError';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  stack?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type PlcVariableModbusSourceRuntime = {
  __typename?: 'PlcVariableModbusSourceRuntime';
  error?: Maybe<PlcVariableError>;
  format?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  register?: Maybe<Scalars['Int']['output']>;
  registerType?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PlcVariableMqttSourceRuntime = {
  __typename?: 'PlcVariableMqttSourceRuntime';
  id?: Maybe<Scalars['String']['output']>;
  onResponse?: Maybe<PlcVariableError>;
  topic?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PlcVariableOpcuaSourceRuntime = {
  __typename?: 'PlcVariableOpcuaSourceRuntime';
  error?: Maybe<PlcVariableError>;
  id?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PlcVariableRestSourceRuntime = {
  __typename?: 'PlcVariableRestSourceRuntime';
  id?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  onResponse?: Maybe<PlcVariableError>;
  rate?: Maybe<Scalars['Int']['output']>;
  setFromResponse?: Maybe<Scalars['Boolean']['output']>;
  timeout?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type PlcVariableRuntime = {
  __typename?: 'PlcVariableRuntime';
  datatype?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  default?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  error?: Maybe<PlcVariableError>;
  id?: Maybe<Scalars['String']['output']>;
  source?: Maybe<PlcVariableSourceRuntime>;
  value?: Maybe<Scalars['String']['output']>;
};

export type PlcVariableSourceRuntime = PlcVariableModbusSourceRuntime | PlcVariableMqttSourceRuntime | PlcVariableOpcuaSourceRuntime | PlcVariableRestSourceRuntime;

export type Query = {
  __typename?: 'Query';
  info?: Maybe<Scalars['String']['output']>;
  memoryUsage?: Maybe<MemoryUsage>;
  plc?: Maybe<Plc>;
};


export type QueryMemoryUsageArgs = {
  units?: InputMaybe<MemoryUsageUnits>;
};

export type Subscription = {
  __typename?: 'Subscription';
  plc?: Maybe<Plc>;
};
