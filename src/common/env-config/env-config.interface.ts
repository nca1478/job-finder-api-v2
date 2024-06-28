export interface EnvConfig {
  getAppPort(): number;
  getNodeEnv(): string;
  getDbHost(): string;
  getDbPort(): number;
  getDbUsername(): string;
  getDbPassword(): string;
  getDbName(): string;
  getJwtSecret(): string;
  getJwtExpiration(): string;
  getJwtAlgorithm(): string;
  getGoogleClientId(): string;
  getGoogleClientSecret(): string;
  getGoogleCallbackUrl(): string;
}
