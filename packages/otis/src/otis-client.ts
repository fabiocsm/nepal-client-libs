/**
 * A client for interacting with the Alert Logic OTIS Public API.
 */
import { ALClient, AlLocation } from '@al/core';

export interface TuningOption {
  id: string;
  name: string;
  scope?: {
    deployment_id?: string;
    region_key?: string;
    vpc_key?: string;
  };
  value: string|number|{[key:string]: unknown};
}

export interface OptionRequestParams {
  name: string;
  scope?: {
    deployment_id?: string;
    region_key?: string;
    vpc_key?: string;
  };
  value: string|number|{[key:string]: unknown};
}

export interface ResolveOptionsRequestParams {
  scope: {
    deployment_id?: string;
    region_key?: string;
    vpc_key?: string;
  };
  names: string[];
}

class OTISClient {

  private client = ALClient;
  private serviceName = 'otis';
  private version = 'v3';
  /**
   * Create Option
   */
  async createOption(accountId: string, optionRequest: OptionRequestParams) {
    return this.client.post<any>({
      service_stack: AlLocation.InsightAPI,
      service_name: this.serviceName,
      account_id: accountId,
      path: '/options',
      version: this.version,
      data: optionRequest,
    });
  }
  /**
   * Get Option
   */
  async getOption(accountId: string, optionId: string) {
    return this.client.get<TuningOption>({
      service_stack: AlLocation.InsightAPI,
      service_name: this.serviceName,
      account_id: accountId,
      path: `/options/${optionId}`,
      version: this.version,
    });

  }
  /**
   * List Options
   */
  async listOptions(accountId: string, params?: {[key:string]: string|string[]}) {
    return this.client.get<TuningOption[]>({
      service_stack: AlLocation.InsightAPI,
      service_name: this.serviceName,
      account_id: accountId,
      path: `/options/`,
      version: this.version,
      params: params
    });

  }
  /**
   * Delete Option
   */
  async deleteOption(accountId: string, optionId: string) {
    return this.client.delete<any>({
      service_stack: AlLocation.InsightAPI,
      service_name: this.serviceName,
      account_id: accountId,
      path: `/options/${optionId}`,
      version: this.version,
    });
  }
  /**
   * Update Option Value
   *
   * value: set as any because of the API flexibility, from docs: value - arbitrary JSON data
   */
  async updateOptionValue(accountId: string, optionId: string, value: any) {
    return this.client.put<any>({
      service_stack: AlLocation.InsightAPI,
      service_name: this.serviceName,
      account_id: accountId,
      path: `/options/${optionId}`,
      version: this.version,
      data: {
        value,
      },
    });
  }
  /**
   * Resolve Option Values
   */
  async resolveOptionValues(accountId: string, resolveOptionsRequestParams: ResolveOptionsRequestParams) {
    return this.client.post<any>({
      service_stack: AlLocation.InsightAPI,
      service_name: this.serviceName,
      account_id: accountId,
      path: '/options/resolve',
      version: this.version,
      data: resolveOptionsRequestParams,
    });
  }
}

export const otisClient =  new OTISClient();
