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
  getApiSessionKey(): string;
  getFacebookAppId(): string;
  getFacebookAppSecretKey(): string;
  getFacebookCallbackUrl(): string;
  getSendgridAccessKey(): string;
  getSendgridFromEmail(): string;
  getSendgridSandboxMode(): boolean;
  getUrlClient(): string;
  getCloudinaryCloudName(): string;
  getCloudinaryApiKey(): string;
  getCloudinaryApiSecret(): string;
  getDbSynchronize(): boolean;
  getGoogleRedirectUrlClient(): string;
}
