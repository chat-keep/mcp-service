import * as grpc from "@grpc/grpc-js";
import { HealthServiceHandler } from "../../interfaces/handlers/health.handler";

/**
 * Registers all gRPC services to the server.
 * @param server The gRPC server instance.
 * @param protoDescriptor The loaded proto descriptor.
 */
export function registerServices(
  server: grpc.Server,
  protoDescriptor: any
): void {
  const healthService = new HealthServiceHandler();

  server.addService(protoDescriptor.HealthService.service, {
    Check: healthService.Check,
  });
}
