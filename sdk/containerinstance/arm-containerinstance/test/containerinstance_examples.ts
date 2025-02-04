/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  record,
  RecorderEnvironmentSetup,
  Recorder,
  delay,
  isPlaybackMode
} from "@azure-tools/test-recorder";
import * as assert from "assert";
import { ClientSecretCredential } from "@azure/identity";
import { ContainerInstanceManagementClient } from "../src/containerInstanceManagementClient";

const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    SUBSCRIPTION_ID: "azure_subscription_id"
  },
  customizationsOnRecordings: [
    (recording: any): any =>
      recording.replace(
        /"access_token":"[^"]*"/g,
        `"access_token":"access_token"`
      )
  ],
  queryParametersToSkip: []
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};


describe("ContainerInstance test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: ContainerInstanceManagementClient;
  let location: string;
  let resourceGroup: string;
  let containerGroupName: string;
  let containerInstanceName: string;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    subscriptionId = env.SUBSCRIPTION_ID;
    // This is an example of how the environment variables are used
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
    client = new ContainerInstanceManagementClient(credential, subscriptionId);
    location = "eastus";
    resourceGroup = "myjstest";
    containerGroupName = "mycontainerGroupxxx";
    containerInstanceName = "my-containerinstancexx";
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("containerGroups create test", async function() {
    const res = await client.containerGroups.beginCreateOrUpdateAndWait(resourceGroup,containerGroupName,{
        location: location,
        identity: {
            type: "SystemAssigned"
        },
        containers: [
            {
                name: containerInstanceName,
                command: [],
                environmentVariables: [],
                image: "nginx",
                ports: [
                    {
                        port: 80
                    }
                ],
                resources: {
                    requests: {
                        cpu: 1,
                        memoryInGB: 1.5,
                        gpu: {
                            count: 1,
                            sku: "K80"
                        }
                    }
                },
                volumeMounts: [
                    {
                        name: "empty-volume",

                        mountPath: "mnt/mydir"
                    }
                ]
            }
        ],
        diagnostics: {
            logAnalytics: {
                workspaceId: "workspaceid",
                workspaceKey: "workspaceKey"
            }
        },
        osType: "Linux",
        restartPolicy: "OnFailure",
        volumes: [
            {
                name: "empty-volume",
                emptyDir: {}
            }
        ]
    },testPollingOptions)
    assert.equal(res.name,containerGroupName);
  });

  it("containerGroups get test", async function() {
    const res = await client.containerGroups.get(resourceGroup,containerGroupName);
    assert.equal(res.name,containerGroupName);
  });

  it("containerGroups list test", async function() {
    const resArray = new Array();
    for await (let item of client.containerGroups.listByResourceGroup(resourceGroup)){
        resArray.push(item);
    }
    assert.equal(resArray.length,1);
  });

  it("containerGroups delete test", async function() {
    const res = await client.containerGroups.beginDeleteAndWait(resourceGroup,containerGroupName);
    const resArray = new Array();
    for await (let item of client.containerGroups.listByResourceGroup(resourceGroup)){
        resArray.push(item);
    }
    assert.equal(resArray.length,0);
  });
});
