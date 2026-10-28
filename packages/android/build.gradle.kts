plugins {
    id("com.android.library") version "8.14.0"
    kotlin("android") version "2.3.10"
    id("org.jetbrains.kotlin.plugin.compose") version "2.3.10"
    id("org.jlleitschuh.gradle.ktlint") version "13.1.0"
    id("maven-publish")
}

group = "com.jvdm"
version = "0.1.0"

android {
    namespace = "com.jvdm.ui"
    compileSdk = 36

    defaultConfig {
        minSdk = 24
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        compose = true
    }

    sourceSets {
        getByName("main") {
            kotlin.srcDirs("src/main/kotlin")
        }
        getByName("test") {
            kotlin.srcDirs("src/test/kotlin")
        }
    }

    publishing {
        singleVariant("release") {
            withSourcesJar()
        }
    }
}

kotlin {
    explicitApi()
    jvmToolchain(17)
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2026.09.00"))
    implementation("androidx.compose.foundation:foundation")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    testImplementation(kotlin("test"))
}

ktlint {
    version.set("1.5.0")
    filter {
        exclude { it.file.path.contains("tokens/Tokens.kt") }
    }
}

publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "com.jvdm"
            artifactId = "jvdm-ui"

            afterEvaluate {
                from(components["release"])
            }

            pom {
                name.set("jvdm-ui")
                description.set("jvdm-ui for Android: the same tokens and the same component contract, in Compose.")
                url.set("https://joaoduartemariucio.github.io/jvdm-ui")
                licenses {
                    license {
                        name.set("MIT")
                        url.set("https://opensource.org/licenses/MIT")
                    }
                }
            }
        }
    }
}
