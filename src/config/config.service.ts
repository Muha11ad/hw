import "reflect-metadata"
import { TYPES } from '../types';
import { ILogger } from '../logger';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Cannot read env file');
		} else {
			this.logger.log('[ConfigService] Env has uploaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
