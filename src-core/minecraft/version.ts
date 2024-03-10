export interface MinecraftDownloadMirror {
    name: string,
    replacement: (origin: string) => string
}

export interface VersionIndex {
    id: string;
    type: "release" | "snapshot" | "old_beta" | "old_alpha";
    url: string;
    time: string;
    releaseTime: string;
    sha1: string;
    complianceLevel: number;
}

export interface VersionManifest {
    latest: {
        release: string;
        snapshot: string;
    };
    versions: VersionIndex[];
}

export interface AssetsIndex {
    id: string;
    sha1: string;
    size: number;
    totalSize: number;
    url: string;
}

export interface AssetsObject {
    objects: {
        [key: string]: {
            hash: string;
            size: number;
        }
    }
}

export type Features = "is_demo_user" |
    "has_custom_resolution" |
    "has_quick_plays_support" |
    "is_quick_play_singleplayer" |
    "is_quick_play_realms";

export interface GameArguments {
    rules: {
        action: "allow" | "disallow";
        features: {
            [key in Features]: boolean;
        }
    }[],
    value: string;
}

export interface JVMArguments {
    rules: {
        action: "allow" | "disallow";
        os: {
            name?: string,
            arch?: string
        }
    }[],
    value: string;
}

export interface MinecraftLibraryIndex {
    downloads: {
        artifact?: {
            path: string;
            sha1: string;
            size: number;
            url: string;
        };
        classifiers?: {
            [key: string]: {
                path: string;
                sha1: string;
                size: number;
                url: string;
            }
        };
    };
    extract?: {
        exclude?: string[];
    };
    name: string;
    natives?: {
        [key: string]: string;
    }
    rules?: {
        action: "allow" | "disallow";
        os?: {
            name?: string;
            version?: string;
            arch?: string;
        }
    }[];
}

export interface Version {
    arguments: {
        game: Array<GameArguments | string>;
        jvm: Array<JVMArguments | string>;
    };
    assetIndex: AssetsIndex;
    assets: string;
    complianceLevel: number;
    downloads: {
        client: {
            sha1: string;
            size: number;
            url: string;
        };
        client_mappings: {
            sha1: string;
            size: number;
            url: string;
        };
        server: {
            sha1: string;
            size: number;
            url: string;
        };
        server_mappings: {
            sha1: string;
            size: number;
            url: string;
        };
    };
    id: string;
    javaVersion: {
        component: string;
        majorVersion: number;
    };
    libraries: MinecraftLibraryIndex[];
}