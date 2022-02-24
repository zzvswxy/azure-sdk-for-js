// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createClientLogger, AzureLogger } from "@azure/logger";
import { Console } from "console";
import { ResourceType } from "..";

/**
 * The \@azure/logger configuration for this package.
 */
export const defaultLogger: AzureLogger = createClientLogger("cosmosdb");
export declare function cosmosDiagnosticTrace(label: string): Console;

export function getCosmosDiagnosticClientElapsedTime(): number {
  return performance.now();
}

export class CosmosDiagnosticTrace implements ClientSideRequestStatistics {
  contactedReplicas: [string];
  failedReplicas: Set<string>;
  regionsContacted: Set<string>;
  recordRequest(request: Request) {
    throw new Error("Method not implemented.");
  }
  recordResponse(
    documentServiceRequest: Request,
    storeResult: string,
    startTimeUtc: string,
    endTimeUtc: string
  ) {
    throw new Error("Method not implemented.");
  }
  recordException(
    documentServiceRequest: Request,
    exception: string,
    error: TypeError,
    startTimeUtc: string,
    endTimeUtc: string
  ) {
    throw new Error("Method not implemented.");
  }
  recordAddressResolutionStart(targetEndpoint: string): string {
    throw new Error("Method not implemented.");
  }
  recordAddressResolutionEnd(identifier: string) {
    throw new Error("Method not implemented.");
  }
  requestLatency: string;
  recordHttpResponse(
    httpRequestMessage: Request,
    httpResponseMessage: Response,
    resourceType: string,
    requestStartTimeUtc: string
  ) {
    throw new Error("Method not implemented.");
  }
  recordHttpException(
    httpRequestMessage: Request,
    exception: string,
    error: TypeError,
    resourceType: ResourceType,
    requestStartTimeUtc: string
  ) {
    throw new Error("Method not implemented.");
  }
}
export function getClientElapsedTime(): number {
  return performance.now();
}
export interface ClientSideRequestStatistics {
  contactedReplicas: [string];
  failedReplicas: Set<string>;
  regionsContacted: Set<string>; // = new Set<string>();
  //isCpuHigh: bool;
  recordRequest(request: Request): any;

  recordResponse(
    documentServiceRequest: Request,
    storeResult: string,
    startTimeUtc: string,
    endTimeUtc: string
  ): any;

  recordException(
    documentServiceRequest: Request,
    exception: string,
    error: TypeError,
    startTimeUtc: string,
    endTimeUtc: string
  ): any;

  recordAddressResolutionStart(targetEndpoint: string): string;

  recordAddressResolutionEnd(identifier: string): any;

  requestLatency: string;

  // appendToBuilder(StringBuilder stringBuilder): any;

  recordHttpResponse(
    httpRequestMessage: Request,
    httpResponseMessage: Response,
    resourceType: string,
    requestStartTimeUtc: string
  ): any;

  recordHttpException(
    httpRequestMessage: Request,
    exception: string,
    error: TypeError,
    resourceType: ResourceType,
    requestStartTimeUtc: string
  ): any;
}
