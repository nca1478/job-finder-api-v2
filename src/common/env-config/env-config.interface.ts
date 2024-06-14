export interface EnvConfig {
  getAppPort(): number;
  getNodeEnv(): string;
  getDbHost(): string;
  getDbPort(): number;
  getDbUsername(): string;
  getDbPassword(): string;
  getDbName(): string;
}
