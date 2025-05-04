import * as grpc from "@grpc/grpc-js";
import { logger } from "../logger/logger";

/**
 * Wraps a gRPC method with centralized logging and error handling.
 * @param method The original gRPC method to wrap.
 * @returns The wrapped gRPC method.
 */
export function withGlobalInterceptor<T, U>(
  method: grpc.handleUnaryCall<T, U>
): grpc.handleUnaryCall<T, U> {
  return (call, callback) => {
    try {
      logger.info(
        `[gRPC Interceptor] Request received: ${JSON.stringify(call.request)}`
      );

      method(call, (error, response) => {
        if (error) {
          logger.error(`[gRPC Interceptor] Error: ${error}`);
        } else {
          logger.info(
            `[gRPC Interceptor] Response sent: ${JSON.stringify(response)}`
          );
        }
        callback(error, response);
      });
    } catch (error) {
      logger.error(`[gRPC Interceptor] Unexpected error: ${error}`);

      callback(
        {
          code: grpc.status.INTERNAL,
          message: "Internal server error",
        },
        null
      );
    }
  };
}
