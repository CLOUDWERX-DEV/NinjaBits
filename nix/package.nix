{
  lib,
  buildNpmPackage,
  fetchFromGitHub,
  # dependencies
  fetchurl,
  nodejs_22,
  wl-clipboard,
  xclip,
}:

buildNpmPackage (finalAttrs: {
  pname = "ninjabits";
  version = (builtins.fromJSON (builtins.readFile ../package.json)).version;
  __structuredAttrs = true;
  strictDeps = true;

  src = fetchFromGitHub {
    owner = "CLOUDWERX-DEV";
    repo = "NinjaBits";
    tag = "v${finalAttrs.version}";
    hash = "sha256-KeszeV9atSvaA9s7iDCl+Q1eDMSx7flnQuBE8t49IPY=";
  };

  nodejs = nodejs_22;
  npmDepsHash = "sha256-nSHunmjZfr9oCygaLnHQxrXv7wuSa5ze7cQL7BrqfwQ=";
  # ignore-scripts for ip-set broken preinstall
  npmFlags = [ "--ignore-scripts" ];

  # node-datachannel binary tarball
  nodeDatachannelPrebuilt = fetchurl {
    url = "https://github.com/murat-dogan/node-datachannel/releases/download/v0.32.3/node-datachannel-v0.32.3-napi-v8-linux-x64.tar.gz";
    sha256 = "4092afc9cd594a3326eb1bd823da452b227b742ea8222689b2cea6f7344cf67a";
  };

  # replicate postbuild from package.json
  postBuild = ''
    node scripts/postbuild.cjs
  '';

  # extract node-datachannel tarball
  # add wl-copy and xclip to nix readeable path
  postInstall = ''
    tar -xzf ${finalAttrs.nodeDatachannelPrebuilt} \
      -C $out/lib/node_modules/ninjabits/node_modules/node-datachannel
      wrapProgram $out/bin/ninjabits \
        --prefix PATH : ${
          lib.makeBinPath [
            wl-clipboard
            xclip
          ]
        }
  '';

  meta = {
    description = "Search & download torrents in total stealth—like a Ninja.";
    homepage = "https://github.com/CLOUDWERX-DEV/NinjaBits";
    changelog = "https://github.com/CLOUDWERX-DEV/NinjaBits/releases/tag/v${finalAttrs.src.tag}";
    license = lib.licenses.mit;
    maintainers = with lib.maintainers; [ ghastrum ];
    mainProgram = "ninjabits";
    platforms = lib.platforms.linux;
  };
})
