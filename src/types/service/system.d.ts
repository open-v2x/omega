declare namespace System {
  type UpdateEdgeNameParams = {
    name: string;
    mode: string;
  };
  type UpdateEdgeConfigParams = {
    mqtt_config: {
      host: string;
      port: number;
      username: string;
      password: string;
    };
  };
  type SystemConfig = UpdateEdgeNameParams & UpdateEdgeConfigParams;
}
