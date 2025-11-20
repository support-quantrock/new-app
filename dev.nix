{ pkgs, ... }: {
  # Enable preview configuration
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = ["npm" "run" "dev" "--" "--web"];
        manager = "web";
        env = {
          PORT = "$PORT";
          EXPO_NO_TELEMETRY = "1";
        };
      };
    };
  };

  # Install necessary packages
  packages = [
    pkgs.nodejs_20
    pkgs.watchman
  ];
}
