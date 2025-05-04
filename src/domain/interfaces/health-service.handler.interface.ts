import * as grpc from "@grpc/grpc-js";

/**
 * Interface for the HealthService Handler.
 * This interface defines the methods that the HealthService handler should implement.
 */
export interface IHealthServiceHandler {
  /**
   * Handles the health check request.
   * @param call The gRPC call object.
   * @param callback The callback to send the response.
   */
  Check: grpc.handleUnaryCall<any, any>;
}
