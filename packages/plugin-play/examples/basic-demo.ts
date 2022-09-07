import { start, registerToHook, addMicroFrontend } from "../src";
import { getSdkForTenant } from "../src/sdk";

registerToHook({ source: "content", path: "my-hook" }, async (request) => {
  console.log('yay')
  console.log(request.body);
  const sdk = await getSdkForTenant(request.tenantPayload);

  console.log(await sdk.blocks.getList());

  return { message: "king" };
});

addMicroFrontend({
  name: "league",
  url: "https://www.monkeyleague.io/#team",
  description: "google it",
  route: {
    name: "custom-demo",
    path: "leage",
    navBarPosition: "top",
  },
});

addMicroFrontend({
  name: "youtube",
  url: "https://www.youtube.com/embed/T7cxXHSouqs",
  description: "tweet it",
  route: {
    name: "tweet",
    path: "tweet",
    navBarPosition: "bottom",
  },
});

start({
  config: {
    accessTokenSecret: "demo-secret",
    refreshTokenSecret: "refresh-token-secret",
    greenpressUrl: "http://localhost:3000",
    greenpressUsername: "test@test.com",
    greenpressPassword: "admin",
  },
});
