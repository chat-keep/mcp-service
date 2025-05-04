import * as grpc from "@grpc/grpc-js";
import { withGlobalInterceptor } from "../../infrastructure/interceptor/interceptor";
import { IHealthServiceHandler } from "../../domain/interfaces/health-service.handler.interface";

/**
 * HealthService Handler Class
 * Implements the HealthService gRPC methods.
 */
export class HealthServiceHandler implements IHealthServiceHandler {
  /**
   * Handles the health check request.
   * @param call The gRPC call object.
   * @param callback The callback to send the response.
   */
  public Check = withGlobalInterceptor(
    (
      call: grpc.ServerUnaryCall<any, any>,
      callback: grpc.sendUnaryData<any>
    ) => {
      callback(null, { status: "SERVING" });
    }
  );
}
